#!/bin/bash
# =============================================================================
# Ralph Worker - v3.0 (Fresh Session per Story)
# =============================================================================
# Processes stories ONE AT A TIME, each in a FRESH Claude session.
# This is the correct Ralph architecture - no context accumulation.
#
# Usage:
#   ./ralph-worker.sh <project-dir> <story-ids-comma-separated> [worker-id]
#
# Example:
#   ./ralph-worker.sh expansion-packs/copy/projects/copy-v2-upgrade "US-001,US-002,US-003" 1
# =============================================================================

set -e

# =============================================================================
# CONFIGURATION
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Timing
MAX_STORY_TIME=900  # 15 minutes max per story
CLAUDE_INIT_WAIT=5  # Wait for Claude to initialize

# =============================================================================
# ARGUMENTS
# =============================================================================

PRD_PROJECT_DIR="$1"
STORY_IDS_CSV="$2"
WORKER_ID="${3:-1}"

if [[ -z "$PRD_PROJECT_DIR" ]] || [[ -z "$STORY_IDS_CSV" ]]; then
    echo "Usage: $0 <project-dir> <story-ids-csv> [worker-id]"
    exit 1
fi

# Resolve to absolute path
if [[ ! "$PRD_PROJECT_DIR" = /* ]]; then
    PRD_PROJECT_DIR="$PROJECT_ROOT/$PRD_PROJECT_DIR"
fi

PRD_FILE="$PRD_PROJECT_DIR/prd.json"
PROMPT_FILE="$PRD_PROJECT_DIR/prompt.md"

if [[ ! -f "$PRD_FILE" ]]; then
    echo -e "${RED}[Worker $WORKER_ID] PRD not found: $PRD_FILE${NC}"
    exit 1
fi

# Parse story IDs
IFS=',' read -ra STORIES <<< "$STORY_IDS_CSV"
TOTAL_STORIES=${#STORIES[@]}

echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Ralph Worker $WORKER_ID - Fresh Session Architecture      ║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════╣${NC}"
LAST_STORY="${STORIES[${#STORIES[@]}-1]}"
echo -e "${CYAN}║${NC}  Stories: ${GREEN}$TOTAL_STORIES${NC} (${STORIES[0]}...$LAST_STORY)                        ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  PRD: $(basename "$PRD_PROJECT_DIR")                                      ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# =============================================================================
# WORKER LOOP - Process each story in a FRESH session
# =============================================================================

COMPLETED=0
FAILED=0

for STORY_ID in "${STORIES[@]}"; do
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}[Worker $WORKER_ID]${NC} Processing: ${GREEN}$STORY_ID${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    # Check if already completed
    ALREADY_DONE=$(jq -r --arg id "$STORY_ID" '.userStories[] | select(.id == $id) | .passes' "$PRD_FILE")
    if [[ "$ALREADY_DONE" == "true" ]]; then
        echo -e "${GREEN}[Worker $WORKER_ID] $STORY_ID already completed, skipping${NC}"
        ((COMPLETED++))
        continue
    fi

    # Get story details
    STORY_TITLE=$(jq -r --arg id "$STORY_ID" '.userStories[] | select(.id == $id) | .title' "$PRD_FILE")
    echo -e "${CYAN}[Worker $WORKER_ID]${NC} Title: $STORY_TITLE"

    # Create prompt for this specific story
    STORY_PROMPT="Execute story $STORY_ID from the PRD.

PROJECT_DIR: $PRD_PROJECT_DIR
PRD_FILE: $PRD_FILE
STORY_ID: $STORY_ID
STORY_TITLE: $STORY_TITLE

Instructions:
1. Read the story from prd.json
2. Follow prompt.md instructions if it exists
3. Execute ALL acceptance criteria
4. When COMPLETE, update prd.json: set passes=true for $STORY_ID
5. Exit when done

IMPORTANT: This is a fresh session. Read the PRD first to understand context.
Start now with $STORY_ID."

    # Set environment variables for Monitor integration
    # Use relative path for monitor compatibility
    RELATIVE_PRD_PATH="${PRD_PROJECT_DIR#$PROJECT_ROOT/}"
    export RALPH_PRD_PATH="$RELATIVE_PRD_PATH"
    export RALPH_STORY_ID="$STORY_ID"
    export RALPH_ITERATION="$WORKER_ID"
    export RALPH_MODE="research"
    export RALPH_WORKER_ID="$WORKER_ID"

    # Run Claude in a fresh session with timeout
    START_TIME=$(date +%s)
    echo -e "${YELLOW}[Worker $WORKER_ID]${NC} Starting fresh Claude session for $STORY_ID..."
    echo -e "${CYAN}[Worker $WORKER_ID]${NC} Monitor vars: PRD=$RELATIVE_PRD_PATH STORY=$STORY_ID"

    # Create temp file for prompt (avoids escaping issues)
    PROMPT_FILE_TMP="/tmp/ralph-prompt-${WORKER_ID}-${STORY_ID}.txt"
    echo "$STORY_PROMPT" > "$PROMPT_FILE_TMP"

    # Run Claude with environment variables passed explicitly
    # Note: No timeout on macOS - use Ctrl+C to interrupt if needed
    (
        export RALPH_PRD_PATH="$RELATIVE_PRD_PATH"
        export RALPH_STORY_ID="$STORY_ID"
        export RALPH_ITERATION="$WORKER_ID"
        export RALPH_MODE="research"
        cd "$PROJECT_ROOT" && cat "$PROMPT_FILE_TMP" | claude --dangerously-skip-permissions --print
    ) 2>&1 | tee "/tmp/ralph-worker-${WORKER_ID}-${STORY_ID}.log" || true

    # Cleanup temp file
    rm -f "$PROMPT_FILE_TMP"

    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    # Check if story was completed
    STORY_PASSED=$(jq -r --arg id "$STORY_ID" '.userStories[] | select(.id == $id) | .passes' "$PRD_FILE")

    if [[ "$STORY_PASSED" == "true" ]]; then
        echo -e "${GREEN}[Worker $WORKER_ID] ✓ $STORY_ID COMPLETED in ${DURATION}s${NC}"
        ((COMPLETED++))
    else
        echo -e "${RED}[Worker $WORKER_ID] ✗ $STORY_ID FAILED (not marked as passed)${NC}"
        ((FAILED++))

        # Log failure for retry
        echo "$STORY_ID" >> "/tmp/ralph-worker-${WORKER_ID}-failed.txt"
    fi

    echo -e "${CYAN}[Worker $WORKER_ID]${NC} Progress: $COMPLETED completed, $FAILED failed, $((TOTAL_STORIES - COMPLETED - FAILED)) remaining"

    # Small delay between stories
    sleep 2
done

# =============================================================================
# SUMMARY
# =============================================================================

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Worker $WORKER_ID Complete                                ║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC}  ✓ Completed: ${GREEN}$COMPLETED${NC}                                       ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  ✗ Failed:    ${RED}$FAILED${NC}                                          ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  Total:       $TOTAL_STORIES                                         ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"

# Exit with error if any failed
if [[ $FAILED -gt 0 ]]; then
    exit 1
fi
