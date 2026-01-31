#!/bin/bash
# =============================================================================
# Ralph TMUX Swarm - v2.0
# =============================================================================
# Abre N painéis tmux, cada um rodando Ralph em um projeto/batch
# Padrão: Fases sequenciais com delay para evitar race conditions
# =============================================================================

# USAGE:
#   ./ralph-tmux-swarm.sh <project-dir> [num-workers]
#   ./ralph-tmux-swarm.sh expansion-packs/copy/projects/copy-v2-upgrade 8
#
# OR with explicit batches:
#   ./ralph-tmux-swarm.sh --batches "US-001,US-002" "US-003,US-004" ...

set -e

# =============================================================================
# CONFIGURATION
# =============================================================================

# Resolve project root from script location or current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SESSION_NAME="ralph-swarm"

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
    echo -e "${CYAN}║     Ralph TMUX Swarm v2.0                                 ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
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
    PRD_PROJECT_DIR="$PROJECT_DIR/$PRD_PROJECT_DIR"
fi

PRD_FILE="$PRD_PROJECT_DIR/prd.json"
PROMPT_FILE="$PRD_PROJECT_DIR/prompt.md"

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

# =============================================================================
# GET STORIES AND DISTRIBUTE
# =============================================================================

# Get all pending stories
PENDING_IDS=$(jq -r '.userStories[] | select(.passes == false) | .id' "$PRD_FILE")
PENDING_COUNT=$(echo "$PENDING_IDS" | grep -c . 2>/dev/null || echo 0)

if [[ "$PENDING_COUNT" == "0" ]]; then
    echo -e "${GREEN}✅ All stories already complete!${NC}"
    exit 0
fi

# Distribute stories across workers
declare -a BATCHES=()
STORIES_PER_WORKER=$(( (PENDING_COUNT + NUM_WORKERS - 1) / NUM_WORKERS ))

idx=0
batch=""
for sid in $PENDING_IDS; do
    if [[ -n "$batch" ]]; then
        batch="$batch,$sid"
    else
        batch="$sid"
    fi
    idx=$((idx + 1))

    if [[ $((idx % STORIES_PER_WORKER)) -eq 0 ]] || [[ $idx -eq $PENDING_COUNT ]]; then
        BATCHES+=("$batch")
        batch=""
    fi
done

# Adjust num workers to actual batches
ACTUAL_WORKERS=${#BATCHES[@]}

# =============================================================================
# DISPLAY STATUS
# =============================================================================

tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     ${YELLOW}Ralph TMUX Swarm v2.0${NC}                                 ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC}  Project:     $(basename "$PRD_PROJECT_DIR")                              ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Workers:     ${GREEN}$ACTUAL_WORKERS${NC}                                          ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Stories:     ${YELLOW}$PENDING_COUNT pending${NC}                                  ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Per worker:  ~$STORIES_PER_WORKER stories                                ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# =============================================================================
# PHASE 0: CREATE PANES
# =============================================================================

echo -e "${YELLOW}[0/4]${NC} Creating $ACTUAL_WORKERS panes..."
tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR"
for ((i=1; i<ACTUAL_WORKERS; i++)); do
    tmux split-window -t "$SESSION_NAME" -c "$PROJECT_DIR"
    tmux select-layout -t "$SESSION_NAME" tiled
done
tmux select-layout -t "$SESSION_NAME" tiled
echo -e "   ${GREEN}✓${NC} $ACTUAL_WORKERS panes created"

# =============================================================================
# PHASE 1: START CLAUDE IN ALL PANES (with RALPH env vars for Monitor)
# =============================================================================

echo -e "${YELLOW}[1/3]${NC} Starting Claude Code in all panes..."
for ((i=0; i<ACTUAL_WORKERS; i++)); do
    batch="${BATCHES[$i]}"
    IFS=',' read -ra WORKER_STORIES <<< "$batch"
    FIRST_STORY="${WORKER_STORIES[0]}"

    # Set RALPH environment variables for Monitor integration
    RALPH_ENV="export RALPH_PRD_PATH='$PRD_PROJECT_DIR' && export RALPH_ITERATION=$((i+1)) && export RALPH_STORY_ID='$FIRST_STORY' && export RALPH_MODE='research'"

    tmux send-keys -t "$SESSION_NAME:0.$i" "cd $PROJECT_DIR && $RALPH_ENV && claude --dangerously-skip-permissions" Enter
    sleep 1  # Stagger launches to avoid overwhelming system
done
echo -e "   ${GREEN}✓${NC} Claude launched in $ACTUAL_WORKERS panes"
echo -e "   ${YELLOW}⏳${NC} Waiting for Claude to initialize (15s)..."
sleep 15

# =============================================================================
# PHASE 2: ACTIVATE RALPH AGENT
# =============================================================================

echo -e "${YELLOW}[2/3]${NC} Activating Ralph agent in all panes..."
for ((i=0; i<ACTUAL_WORKERS; i++)); do
    tmux send-keys -t "$SESSION_NAME:0.$i" "/Ralph:agents:ralph" Enter
    sleep 1
done
echo -e "   ${GREEN}✓${NC} Ralph activation sent"
echo -e "   ${YELLOW}⏳${NC} Waiting for skill to load (20s)..."
sleep 20

# =============================================================================
# PHASE 3: SEND EXECUTE COMMANDS
# =============================================================================

echo -e "${YELLOW}[3/3]${NC} Sending execute commands..."

# Create worker prompt files
mkdir -p "$PRD_PROJECT_DIR/workers"

for ((i=0; i<ACTUAL_WORKERS; i++)); do
    batch="${BATCHES[$i]}"
    IFS=',' read -ra STORY_IDS <<< "$batch"

    # Create worker-specific command
    # Worker will execute stories sequentially
    WORKER_CMD="Execute these stories from prd.json in order: ${STORY_IDS[*]}

PROJECT_DIR=$PRD_PROJECT_DIR
PRD_FILE=$PRD_FILE

For each story:
1. Read story from prd.json
2. Execute following prompt.md instructions
3. Mark passes=true when done
4. Move to next story

Start with: ${STORY_IDS[0]}"

    # Send the command to this pane
    tmux send-keys -t "$SESSION_NAME:0.$i" "$WORKER_CMD" Enter

    echo -e "   ${BLUE}Worker $((i+1)):${NC} ${#STORY_IDS[@]} stories (${STORY_IDS[0]}...)"
    sleep 1
done
echo -e "   ${GREEN}✓${NC} All workers started!"

# =============================================================================
# FINAL STATUS
# =============================================================================

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ SWARM LAUNCHED! $ACTUAL_WORKERS workers processing $PENDING_COUNT stories      ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}Story distribution:${NC}"
for ((i=0; i<ACTUAL_WORKERS; i++)); do
    batch="${BATCHES[$i]}"
    count=$(echo "$batch" | tr ',' '\n' | wc -l | tr -d ' ')
    echo -e "  ${BLUE}Worker $((i+1)):${NC} $count stories"
done

echo ""
echo -e "${CYAN}Commands:${NC}"
echo "  tmux attach -t $SESSION_NAME     - Connect to session"
echo "  tmux kill-session -t $SESSION_NAME - Stop all workers"
echo ""
echo -e "${CYAN}Navigation (inside tmux):${NC}"
echo "  Ctrl+B → arrow   Change pane"
echo "  Ctrl+B → z       Zoom pane (toggle)"
echo "  Ctrl+B → d       Detach (workers continue)"
echo ""
echo -e "${CYAN}Monitor progress:${NC}"
echo "  jq '[.userStories[] | select(.passes == true)] | length' $PRD_FILE"
echo ""

# Create timestamp for monitoring
touch /tmp/ralph-swarm-start

# Auto-connect to session
tmux attach -t "$SESSION_NAME"
