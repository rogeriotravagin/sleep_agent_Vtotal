#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# Ralph Swarm - Generic Parallel Runner for Multiple Projects
# ═══════════════════════════════════════════════════════════════════════════
#
# Modular script that auto-detects prd.json in subdirectories and runs
# Ralph in parallel using tmux.
#
# Usage:
#   ./ralph-swarm.sh <base-dir> [options]
#
# Examples:
#   ./ralph-swarm.sh docs/ralph/projetos/books-rescore/
#   ./ralph-swarm.sh docs/ralph/projetos/books-rescore/ --max 6
#   ./ralph-swarm.sh docs/ralph/projetos/books-rescore/ --filter "mindset|antifragil"
#   ./ralph-swarm.sh docs/ralph/projetos/books-rescore/ --list
#   ./ralph-swarm.sh docs/ralph/projetos/books-rescore/ --dry-run
#
# ═══════════════════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_SCRIPT="$SCRIPT_DIR/ralph.sh"

# ═══════════════════════════════════════════════════════════════════════════
# DEFAULT CONFIG
# ═══════════════════════════════════════════════════════════════════════════

MAX_PARALLEL=10          # Max simultaneous workers
DELAY_BETWEEN=3          # Seconds between spawning workers
SESSION_PREFIX="ralph"   # tmux session name prefix
DRY_RUN=false
LIST_ONLY=false
FILTER_PATTERN=""
EXCLUDE_PATTERN=""

# ═══════════════════════════════════════════════════════════════════════════
# COLORS
# ═══════════════════════════════════════════════════════════════════════════

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════════════════
# HELP
# ═══════════════════════════════════════════════════════════════════════════

show_help() {
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  🐝 Ralph Swarm - Parallel Project Runner${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Usage: $0 <base-dir> [options]"
    echo ""
    echo "Arguments:"
    echo "  base-dir              Directory containing project subdirectories"
    echo ""
    echo "Options:"
    echo "  --max N               Max parallel workers (default: 10)"
    echo "  --delay N             Seconds between spawning (default: 3)"
    echo "  --filter PATTERN      Only include dirs matching regex pattern"
    echo "  --exclude PATTERN     Exclude dirs matching regex pattern"
    echo "  --session NAME        tmux session name (default: ralph-swarm)"
    echo "  --list                List detected projects without running"
    echo "  --dry-run             Show what would run without executing"
    echo "  --help                Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 docs/ralph/projetos/books-rescore/"
    echo "  $0 docs/ralph/projetos/books-rescore/ --max 6"
    echo "  $0 docs/ralph/projetos/books-rescore/ --filter 'mindset|antifragil'"
    echo "  $0 docs/ralph/projetos/books-rescore/ --exclude 'worker-'"
    echo "  $0 docs/ralph/projetos/books-rescore/ --list"
    echo ""
    exit 0
}

# ═══════════════════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════════════════

if [[ -z "$1" || "$1" == "--help" || "$1" == "-h" ]]; then
    show_help
fi

BASE_DIR="$1"
shift

while [[ $# -gt 0 ]]; do
    case $1 in
        --max)
            MAX_PARALLEL="$2"
            shift 2
            ;;
        --delay)
            DELAY_BETWEEN="$2"
            shift 2
            ;;
        --filter)
            FILTER_PATTERN="$2"
            shift 2
            ;;
        --exclude)
            EXCLUDE_PATTERN="$2"
            shift 2
            ;;
        --session)
            SESSION_PREFIX="$2"
            shift 2
            ;;
        --list)
            LIST_ONLY=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# ═══════════════════════════════════════════════════════════════════════════
# VALIDATION
# ═══════════════════════════════════════════════════════════════════════════

# Resolve to absolute path
if [[ ! "$BASE_DIR" = /* ]]; then
    BASE_DIR="$(pwd)/$BASE_DIR"
fi

# Remove trailing slash
BASE_DIR="${BASE_DIR%/}"

# Check directory exists
if [[ ! -d "$BASE_DIR" ]]; then
    echo -e "${RED}❌ Directory not found: $BASE_DIR${NC}"
    exit 1
fi

# Check ralph.sh exists
if [[ ! -f "$RALPH_SCRIPT" ]]; then
    echo -e "${RED}❌ ralph.sh not found: $RALPH_SCRIPT${NC}"
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════════
# DETECT PROJECTS
# ═══════════════════════════════════════════════════════════════════════════

echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🐝 Ralph Swarm - Scanning Projects${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "  Base: ${BLUE}$BASE_DIR${NC}"
echo ""

# Find all subdirectories with prd.json
PROJECTS=()
while IFS= read -r prd_file; do
    dir=$(dirname "$prd_file")
    dir_name=$(basename "$dir")

    # Apply filter if specified
    if [[ -n "$FILTER_PATTERN" ]]; then
        if ! echo "$dir_name" | grep -qE "$FILTER_PATTERN"; then
            continue
        fi
    fi

    # Apply exclude if specified
    if [[ -n "$EXCLUDE_PATTERN" ]]; then
        if echo "$dir_name" | grep -qE "$EXCLUDE_PATTERN"; then
            continue
        fi
    fi

    PROJECTS+=("$dir")
done < <(find "$BASE_DIR" -maxdepth 2 -name "prd.json" -type f 2>/dev/null | sort)

NUM_PROJECTS=${#PROJECTS[@]}

if [[ $NUM_PROJECTS -eq 0 ]]; then
    echo -e "${YELLOW}⚠️  No projects found with prd.json in: $BASE_DIR${NC}"
    echo ""
    echo "Looking for prd.json in:"
    find "$BASE_DIR" -maxdepth 3 -type d 2>/dev/null | head -20
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════════
# LIST PROJECTS
# ═══════════════════════════════════════════════════════════════════════════

echo -e "${GREEN}Found $NUM_PROJECTS projects:${NC}"
echo ""

for project_dir in "${PROJECTS[@]}"; do
    prd_file="$project_dir/prd.json"
    project_name=$(jq -r '.project // "Unknown"' "$prd_file" 2>/dev/null)
    total=$(jq -r '.userStories | length' "$prd_file" 2>/dev/null)
    done_count=$(jq -r '[.userStories[] | select(.passes == true)] | length' "$prd_file" 2>/dev/null)
    method=$(jq -r '.context.method // "unknown"' "$prd_file" 2>/dev/null)

    dir_name=$(basename "$project_dir")

    if [[ "$done_count" == "$total" ]]; then
        status="${GREEN}✅${NC}"
    else
        status="${YELLOW}⬚${NC}"
    fi

    echo -e "  $status ${BLUE}$dir_name${NC} ($method) [$done_count/$total]"
done

echo ""

if [[ "$LIST_ONLY" == true ]]; then
    echo -e "${CYAN}Total: $NUM_PROJECTS projects${NC}"
    exit 0
fi

# ═══════════════════════════════════════════════════════════════════════════
# LIMIT PARALLEL WORKERS
# ═══════════════════════════════════════════════════════════════════════════

if [[ $NUM_PROJECTS -gt $MAX_PARALLEL ]]; then
    echo -e "${YELLOW}⚠️  Limiting to $MAX_PARALLEL parallel workers (found $NUM_PROJECTS projects)${NC}"
    NUM_WORKERS=$MAX_PARALLEL
else
    NUM_WORKERS=$NUM_PROJECTS
fi

# ═══════════════════════════════════════════════════════════════════════════
# DRY RUN
# ═══════════════════════════════════════════════════════════════════════════

if [[ "$DRY_RUN" == true ]]; then
    echo -e "${YELLOW}DRY RUN - Commands that would be executed:${NC}"
    echo ""
    for i in $(seq 0 $((NUM_WORKERS - 1))); do
        project_dir="${PROJECTS[$i]}"
        echo "  tmux pane $i: $RALPH_SCRIPT $project_dir"
    done
    echo ""
    echo -e "${CYAN}Would create tmux session with $NUM_WORKERS panes${NC}"
    exit 0
fi

# ═══════════════════════════════════════════════════════════════════════════
# CREATE TMUX SESSION
# ═══════════════════════════════════════════════════════════════════════════

SESSION="${SESSION_PREFIX}-swarm"

echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🚀 Launching $NUM_WORKERS parallel workers${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "  Session:  ${BLUE}$SESSION${NC}"
echo -e "  Workers:  ${BLUE}$NUM_WORKERS${NC}"
echo -e "  Delay:    ${BLUE}${DELAY_BETWEEN}s${NC}"
echo ""

# Kill existing session if exists
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Get working directory
WORK_DIR=$(dirname "$BASE_DIR")
if [[ "$WORK_DIR" == "." ]]; then
    WORK_DIR=$(pwd)
fi

# Go to repo root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "/Users/alan/Code/mmos")

# Create new session
tmux new-session -d -s "$SESSION" -c "$REPO_ROOT"

# Create additional panes
for i in $(seq 1 $((NUM_WORKERS - 1))); do
    tmux split-window -t "$SESSION" -c "$REPO_ROOT"
    tmux select-layout -t "$SESSION" tiled
done

# ═══════════════════════════════════════════════════════════════════════════
# LAUNCH WORKERS
# ═══════════════════════════════════════════════════════════════════════════

PANE_INDEX=0
for i in $(seq 0 $((NUM_WORKERS - 1))); do
    project_dir="${PROJECTS[$i]}"
    dir_name=$(basename "$project_dir")

    # Make path relative if within repo
    if [[ "$project_dir" == "$REPO_ROOT"* ]]; then
        rel_path="${project_dir#$REPO_ROOT/}"
    else
        rel_path="$project_dir"
    fi

    CMD="$RALPH_SCRIPT $rel_path"

    echo -e "  ${GREEN}[Pane $PANE_INDEX]${NC} Starting: ${BLUE}$dir_name${NC}"
    tmux send-keys -t "$SESSION:0.$PANE_INDEX" "$CMD" C-m

    PANE_INDEX=$((PANE_INDEX + 1))

    # Stagger starts to avoid API rate limits
    if [[ $i -lt $((NUM_WORKERS - 1)) ]]; then
        sleep "$DELAY_BETWEEN"
    fi
done

# ═══════════════════════════════════════════════════════════════════════════
# ATTACH TO SESSION
# ═══════════════════════════════════════════════════════════════════════════

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ All workers launched!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "  Attaching to tmux session: $SESSION"
echo ""
echo "  Shortcuts:"
echo "    Ctrl+B D     - Detach (workers continue in background)"
echo "    Ctrl+B [     - Scroll mode (q to exit)"
echo "    Ctrl+B o     - Cycle between panes"
echo "    Ctrl+B z     - Zoom current pane"
echo ""
echo "  Reattach later: tmux attach -t $SESSION"
echo ""

tmux attach -t "$SESSION"
