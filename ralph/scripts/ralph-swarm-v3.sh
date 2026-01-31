#!/bin/bash
# =============================================================================
# Ralph TMUX Swarm - v3.0 (Fresh Session Architecture)
# =============================================================================
# Launches N workers in tmux, each processing stories with FRESH Claude sessions.
#
# Architecture:
#   - Each worker runs ralph-worker.sh
#   - Each STORY gets a FRESH Claude session (no context accumulation)
#   - Parallel workers, sequential stories per worker
#
# Usage:
#   ./ralph-swarm-v3.sh <project-dir> [num-workers]
#
# Example:
#   ./ralph-swarm-v3.sh expansion-packs/copy/projects/copy-v2-upgrade 8
# =============================================================================

set -e

# =============================================================================
# CONFIGURATION
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SESSION_NAME="ralph-swarm-v3"
WORKER_SCRIPT="$SCRIPT_DIR/ralph-worker.sh"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# =============================================================================
# ARGUMENT PARSING
# =============================================================================

if [[ -z "$1" ]]; then
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║     Ralph TMUX Swarm v3.0 - Fresh Session Architecture    ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Each story runs in a FRESH Claude session (no context accumulation)"
    echo ""
    echo "Usage:"
    echo "  $0 <project-dir> [num-workers]"
    echo ""
    echo "Examples:"
    echo "  $0 expansion-packs/copy/projects/copy-v2-upgrade 8"
    echo "  $0 docs/ralph/books 6"
    echo ""
    exit 0
fi

PRD_PROJECT_DIR="$1"
NUM_WORKERS=${2:-8}

# Resolve to absolute path
if [[ ! "$PRD_PROJECT_DIR" = /* ]]; then
    PRD_PROJECT_DIR="$PROJECT_ROOT/$PRD_PROJECT_DIR"
fi

PRD_FILE="$PRD_PROJECT_DIR/prd.json"

if [[ ! -f "$PRD_FILE" ]]; then
    echo -e "${RED}❌ PRD not found: $PRD_FILE${NC}"
    exit 1
fi

# =============================================================================
# CHECK DEPENDENCIES
# =============================================================================

if ! command -v tmux &> /dev/null; then
    echo -e "${YELLOW}tmux not found. Installing...${NC}"
    brew install tmux
fi

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}jq not found. Installing...${NC}"
    brew install jq
fi

if [[ ! -x "$WORKER_SCRIPT" ]]; then
    chmod +x "$WORKER_SCRIPT"
fi

# =============================================================================
# GET PENDING STORIES AND DISTRIBUTE
# =============================================================================

# Get all pending stories
PENDING_IDS=$(jq -r '.userStories[] | select(.passes == false or .passes == null) | .id' "$PRD_FILE")
PENDING_COUNT=$(echo "$PENDING_IDS" | grep -c . 2>/dev/null || echo 0)

if [[ "$PENDING_COUNT" == "0" ]]; then
    echo -e "${GREEN}✅ All stories already complete!${NC}"
    exit 0
fi

# Calculate stories per worker
STORIES_PER_WORKER=$(( (PENDING_COUNT + NUM_WORKERS - 1) / NUM_WORKERS ))

# Distribute stories into batches
declare -a BATCHES=()
idx=0
batch=""

for sid in $PENDING_IDS; do
    if [[ -n "$batch" ]]; then
        batch="$batch,$sid"
    else
        batch="$sid"
    fi
    ((idx++))

    if [[ $((idx % STORIES_PER_WORKER)) -eq 0 ]] || [[ $idx -eq $PENDING_COUNT ]]; then
        BATCHES+=("$batch")
        batch=""
    fi
done

ACTUAL_WORKERS=${#BATCHES[@]}

# =============================================================================
# KILL EXISTING SESSION
# =============================================================================

tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

# =============================================================================
# DISPLAY STATUS
# =============================================================================

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     ${YELLOW}Ralph TMUX Swarm v3.0${NC}                                 ${CYAN}║${NC}"
echo -e "${CYAN}║     ${GREEN}Fresh Session Architecture${NC}                            ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC}  Project:     $(basename "$PRD_PROJECT_DIR")                              ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Workers:     ${GREEN}$ACTUAL_WORKERS${NC}                                          ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Stories:     ${YELLOW}$PENDING_COUNT pending${NC}                                  ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Per worker:  ~$STORIES_PER_WORKER stories                                ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC}  ${GREEN}✓ Each story = Fresh Claude session${NC}                      ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  ${GREEN}✓ No context accumulation${NC}                                ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  ${GREEN}✓ Parallel workers, sequential stories${NC}                  ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# =============================================================================
# CREATE TMUX SESSION WITH WORKERS
# =============================================================================

echo -e "${YELLOW}Creating tmux session with $ACTUAL_WORKERS workers...${NC}"

# Create first pane
FIRST_BATCH="${BATCHES[0]}"
tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_ROOT" \
    "$WORKER_SCRIPT '$PRD_PROJECT_DIR' '$FIRST_BATCH' 1; echo 'Worker 1 finished. Press Enter to close.'; read"

# Create remaining panes
for ((i=1; i<ACTUAL_WORKERS; i++)); do
    batch="${BATCHES[$i]}"
    worker_id=$((i+1))

    tmux split-window -t "$SESSION_NAME" -c "$PROJECT_ROOT" \
        "$WORKER_SCRIPT '$PRD_PROJECT_DIR' '$batch' $worker_id; echo 'Worker $worker_id finished. Press Enter to close.'; read"

    tmux select-layout -t "$SESSION_NAME" tiled
done

tmux select-layout -t "$SESSION_NAME" tiled

# =============================================================================
# SUMMARY
# =============================================================================

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ SWARM LAUNCHED!                                        ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}Worker Distribution:${NC}"
for ((i=0; i<ACTUAL_WORKERS; i++)); do
    batch="${BATCHES[$i]}"
    count=$(echo "$batch" | tr ',' '\n' | wc -l | tr -d ' ')
    first=$(echo "$batch" | cut -d',' -f1)
    last=$(echo "$batch" | tr ',' '\n' | tail -1)
    echo -e "  ${BLUE}Worker $((i+1)):${NC} $count stories ($first → $last)"
done

echo ""
echo -e "${CYAN}Commands:${NC}"
echo "  tmux attach -t $SESSION_NAME     - View workers"
echo "  tmux kill-session -t $SESSION_NAME - Stop all workers"
echo ""
echo -e "${CYAN}Monitor progress:${NC}"
echo "  watch -n 5 'jq \"[.userStories[] | select(.passes == true)] | length\" $PRD_FILE'"
echo "  http://localhost:4000 (Ralph Loop tab)"
echo ""

# Auto-attach
tmux attach -t "$SESSION_NAME"
