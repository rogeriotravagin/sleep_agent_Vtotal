#!/bin/bash
# Ralph Loop Script for Claude Code
# Multi-project support - runs as external bash loop
# Usage: ./ralph.sh <project-dir> [max-iterations]

set -e

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$RALPH_DIR/templates"

# Detect unbuffered output command (platform-agnostic)
# macOS doesn't have stdbuf by default, try alternatives
if command -v stdbuf &> /dev/null; then
  UNBUFFER_CMD="stdbuf -oL"
elif command -v unbuffer &> /dev/null; then
  # unbuffer from expect package (brew install expect)
  UNBUFFER_CMD="unbuffer"
else
  # Fallback: no unbuffering (output may be delayed)
  UNBUFFER_CMD=""
fi

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

# First argument: project directory (required)
# Second argument: max iterations (optional, default 10)

if [[ -z "$1" ]]; then
  echo "🔄 Ralph Multi-Project Runner"
  echo ""
  echo "Usage: $0 <project-dir> [max-iterations]"
  echo ""
  echo "Examples:"
  echo "  $0 docs/ralph/projetos/prd-studio/      # PRD Studio project"
  echo "  $0 docs/ralph/projetos/copywriter-os/   # CopywriterOS project"
  echo "  $0 docs/ralph/projetos/meu-projeto/ 30  # Custom project, 30 iters"
  echo ""
  echo "Project directory must contain:"
  echo "  - prd.json     (required)"
  echo "  - progress.txt (created if missing)"
  echo "  - prompt.md    (uses default if missing)"
  echo ""
  echo "Active projects:"
  # List projects with prd.json
  find . -name "prd.json" -not -path "./archive/*" -not -path "./node_modules/*" 2>/dev/null | while read f; do
    dir=$(dirname "$f")
    name=$(cat "$f" | jq -r '.project // "Unknown"' 2>/dev/null)
    # Count stories
    total=$(cat "$f" | jq -r '.userStories | length' 2>/dev/null)
    done_count=$(cat "$f" | jq -r '[.userStories[] | select(.passes == true)] | length' 2>/dev/null)
    echo "  📁 $dir ($name) [$done_count/$total done]"
  done
  exit 0
fi

PROJECT_DIR="$1"
MAX_ITERATIONS=${2:-30}

# ═══════════════════════════════════════════════════════════════
# VALIDATION
# ═══════════════════════════════════════════════════════════════

# Resolve to absolute path
if [[ ! "$PROJECT_DIR" = /* ]]; then
  PROJECT_DIR="$(pwd)/$PROJECT_DIR"
fi

# Remove trailing slash
PROJECT_DIR="${PROJECT_DIR%/}"

# Check project directory exists
if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "❌ Project directory not found: $PROJECT_DIR"
  echo "   Create it first with prd.json inside."
  exit 1
fi

# Check prd.json exists
if [[ ! -f "$PROJECT_DIR/prd.json" ]]; then
  echo "❌ No prd.json in: $PROJECT_DIR"
  echo "   Create prd.json first using @ralph *convert or *create-prd"
  exit 1
fi

# ═══════════════════════════════════════════════════════════════
# SETUP FILES
# ═══════════════════════════════════════════════════════════════

PRD_FILE="$PROJECT_DIR/prd.json"
PROGRESS_FILE="$PROJECT_DIR/progress.txt"
HANDOFF_FILE="$PROJECT_DIR/handoff.md"
BRANCH_FILE="$PROJECT_DIR/.ralph-branch"
ARCHIVE_DIR="$PROJECT_DIR/archive"

# Get project info
PROJECT_NAME=$(cat "$PRD_FILE" | jq -r '.project // "Unknown Project"' 2>/dev/null)
CURRENT_BRANCH=$(cat "$PRD_FILE" | jq -r '.branchName // empty' 2>/dev/null)
PROJECT_MODE=$(cat "$PRD_FILE" | jq -r '.mode // "code"' 2>/dev/null)
PARALLEL_ENABLED=$(cat "$PRD_FILE" | jq -r '.parallelization.enabled // false' 2>/dev/null)

# Check if should use parallel execution
if [[ "$PROJECT_MODE" == "content" || "$PROJECT_MODE" == "refactor" || "$PARALLEL_ENABLED" == "true" ]]; then
  echo "📊 Detected parallel-capable project (mode: $PROJECT_MODE)"
  echo "   Redirecting to ralph-parallel.sh..."
  echo ""
  exec "$SCRIPT_DIR/ralph-parallel.sh" "$PROJECT_DIR" "$MAX_ITERATIONS"
fi

# Create progress.txt if missing
if [[ ! -f "$PROGRESS_FILE" ]]; then
  if [[ -f "$TEMPLATES_DIR/progress.txt" ]]; then
    cp "$TEMPLATES_DIR/progress.txt" "$PROGRESS_FILE"
    sed -i '' "s/YYYY-MM-DD/$(date +%Y-%m-%d)/g" "$PROGRESS_FILE" 2>/dev/null || true
    sed -i '' "s/PROJECT_NAME/$PROJECT_NAME/g" "$PROGRESS_FILE" 2>/dev/null || true
    echo "📝 Created progress.txt from template"
  else
    # Create minimal progress.txt
    cat > "$PROGRESS_FILE" << EOF
# Progress: $PROJECT_NAME
Started: $(date +%Y-%m-%d)

## Session Log
EOF
    echo "📝 Created minimal progress.txt"
  fi
fi

# Use project prompt.md or default
if [[ -f "$PROJECT_DIR/prompt.md" ]]; then
  PROMPT_FILE="$PROJECT_DIR/prompt.md"
elif [[ -f "$TEMPLATES_DIR/prompt.md" ]]; then
  PROMPT_FILE="$TEMPLATES_DIR/prompt.md"
else
  echo "❌ No prompt.md found in project or templates"
  exit 1
fi

# ═══════════════════════════════════════════════════════════════
# ARCHIVING (on branch change)
# ═══════════════════════════════════════════════════════════════

if [[ -f "$BRANCH_FILE" ]]; then
  PREVIOUS_BRANCH=$(cat "$BRANCH_FILE")
  if [[ -n "$CURRENT_BRANCH" && "$PREVIOUS_BRANCH" != "$CURRENT_BRANCH" ]]; then
    echo "🗄️  Branch changed: $PREVIOUS_BRANCH → $CURRENT_BRANCH"
    ARCHIVE_NAME=$(date +%Y-%m-%d)-${PREVIOUS_BRANCH#ralph/}
    mkdir -p "$ARCHIVE_DIR/$ARCHIVE_NAME"
    [[ -f "$PRD_FILE.bak" ]] && mv "$PRD_FILE.bak" "$ARCHIVE_DIR/$ARCHIVE_NAME/prd.json"
    [[ -f "$PROGRESS_FILE.bak" ]] && mv "$PROGRESS_FILE.bak" "$ARCHIVE_DIR/$ARCHIVE_NAME/progress.txt"
    echo "   ✅ Archived to: $ARCHIVE_DIR/$ARCHIVE_NAME"
  fi
fi

[[ -n "$CURRENT_BRANCH" ]] && echo "$CURRENT_BRANCH" > "$BRANCH_FILE"

# ═══════════════════════════════════════════════════════════════
# SHOW STATUS
# ═══════════════════════════════════════════════════════════════

echo ""
echo "🔄 Ralph Autonomous Loop"
echo "═══════════════════════════════════════════════════════════"
echo "   Project:    $PROJECT_NAME"
echo "   Directory:  $PROJECT_DIR"
echo "   PRD:        $PRD_FILE"
echo "   Progress:   $PROGRESS_FILE"
echo "   Handoff:    $HANDOFF_FILE"
echo "   Prompt:     $PROMPT_FILE"
echo "   Max iters:  $MAX_ITERATIONS"
if [[ -n "$UNBUFFER_CMD" ]]; then
  echo "   Streaming:  ✅ Real-time ($UNBUFFER_CMD)"
else
  echo "   Streaming:  ⚠️  Buffered (install 'expect' for real-time)"
fi
echo "═══════════════════════════════════════════════════════════"
echo ""

# Show stories status
echo "📋 Stories Status:"
cat "$PRD_FILE" | jq -r '.userStories[] | "   \(if .passes then "✅" else "⬚" end) \(.id): \(.title)"' 2>/dev/null || true
echo ""

# ═══════════════════════════════════════════════════════════════
# MAIN LOOP
# ═══════════════════════════════════════════════════════════════

for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "═══════════════════════════════════════"
  echo "═══ Iteration $i of $MAX_ITERATIONS ═══"
  echo "═══════════════════════════════════════"

  # Show which story is being worked on next
  NEXT_STORY=$(cat "$PRD_FILE" | jq -r '.userStories[] | select(.passes == false) | "\(.id): \(.title)"' 2>/dev/null | head -1)
  NEXT_STORY_ID=$(cat "$PRD_FILE" | jq -r '.userStories[] | select(.passes == false) | .id' 2>/dev/null | head -1)
  if [[ -n "$NEXT_STORY" ]]; then
    echo "🎯 Working on: $NEXT_STORY"
  else
    echo "🎯 All stories appear complete, verifying..."
  fi

  # Timestamp start
  ITER_START=$(date +%s)
  echo "⏱️  Started: $(date +%H:%M:%S)"
  echo ""

  # Export environment variables for Monitor hooks
  export RALPH_ITERATION=$i
  export RALPH_STORY_ID="$NEXT_STORY_ID"
  export RALPH_PRD_PATH="${PROJECT_DIR#$(pwd)/}"
  export RALPH_MODE="${PROJECT_MODE:-code}"

  # Build the prompt with project context
  FULL_PROMPT="PROJECT_DIR=$PROJECT_DIR
PRD_FILE=$PRD_FILE
PROGRESS_FILE=$PROGRESS_FILE
HANDOFF_FILE=$HANDOFF_FILE

$(cat $PROMPT_FILE)"

  # Run Claude Code with the prompt
  # -p = print mode (non-interactive, exits after completion)
  # --dangerously-skip-permissions = bypass permission prompts
  # UNBUFFER_CMD = line-buffered output (forces real-time streaming if available)
  echo "─────────────────────────────────────"
  if [[ -n "$UNBUFFER_CMD" ]]; then
    OUTPUT=$($UNBUFFER_CMD claude -p --dangerously-skip-permissions "$FULL_PROMPT" 2>&1 | tee /dev/stderr) || true
  else
    OUTPUT=$(claude -p --dangerously-skip-permissions "$FULL_PROMPT" 2>&1 | tee /dev/stderr) || true
  fi
  echo "─────────────────────────────────────"

  # Calculate iteration duration
  ITER_END=$(date +%s)
  ITER_DURATION=$((ITER_END - ITER_START))
  ITER_MINS=$((ITER_DURATION / 60))
  ITER_SECS=$((ITER_DURATION % 60))

  echo ""
  echo "⏱️  Completed: $(date +%H:%M:%S) (${ITER_MINS}m ${ITER_SECS}s)"

  # AUTO-FIX: Mark stories as complete if output_file exists
  # This fixes the bug where Claude completes work but doesn't update the PRD
  STORIES_UPDATED=0
  while IFS= read -r line; do
    STORY_ID=$(echo "$line" | jq -r '.id')
    PASSES=$(echo "$line" | jq -r '.passes')
    OUTPUT_FILE=$(echo "$line" | jq -r '.output_file // empty')

    if [[ "$PASSES" == "false" && -n "$OUTPUT_FILE" ]]; then
      # Resolve path
      if [[ ! "$OUTPUT_FILE" = /* ]]; then
        FULL_OUTPUT_PATH="$(pwd)/$OUTPUT_FILE"
      else
        FULL_OUTPUT_PATH="$OUTPUT_FILE"
      fi

      # Check if output file exists and is valid
      if [[ -f "$FULL_OUTPUT_PATH" ]]; then
        # For JSON files, validate it's proper JSON
        if [[ "$FULL_OUTPUT_PATH" == *.json ]]; then
          if jq empty "$FULL_OUTPUT_PATH" 2>/dev/null; then
            # Update PRD to mark as complete
            jq --arg id "$STORY_ID" '(.userStories[] | select(.id == $id)) |= (.passes = true | .status = "done")' "$PRD_FILE" > /tmp/prd_autofix.json
            mv /tmp/prd_autofix.json "$PRD_FILE"
            echo "🔧 Auto-fixed: $STORY_ID (output exists: $(basename $OUTPUT_FILE))"
            STORIES_UPDATED=$((STORIES_UPDATED + 1))
          fi
        # For MD files, just check it exists and has content
        elif [[ "$FULL_OUTPUT_PATH" == *.md ]]; then
          if [[ -s "$FULL_OUTPUT_PATH" ]]; then
            jq --arg id "$STORY_ID" '(.userStories[] | select(.id == $id)) |= (.passes = true | .status = "done")' "$PRD_FILE" > /tmp/prd_autofix.json
            mv /tmp/prd_autofix.json "$PRD_FILE"
            echo "🔧 Auto-fixed: $STORY_ID (output exists: $(basename $OUTPUT_FILE))"
            STORIES_UPDATED=$((STORIES_UPDATED + 1))
          fi
        fi
      fi
    fi
  done < <(cat "$PRD_FILE" | jq -c '.userStories[]' 2>/dev/null)

  if [[ $STORIES_UPDATED -gt 0 ]]; then
    echo "✅ Auto-fixed $STORIES_UPDATED stories based on existing outputs"
  fi

  # Show updated story status
  echo ""
  echo "📋 Stories Status:"
  cat "$PRD_FILE" | jq -r '.userStories[] | "   \(if .passes then "✅" else "⬚" end) \(.id): \(.title)"' 2>/dev/null || true

  # Count progress
  TOTAL_STORIES=$(cat "$PRD_FILE" | jq -r '.userStories | length' 2>/dev/null)
  DONE_STORIES=$(cat "$PRD_FILE" | jq -r '[.userStories[] | select(.passes == true)] | length' 2>/dev/null)
  echo ""
  echo "📊 Progress: $DONE_STORIES/$TOTAL_STORIES stories complete"

  # Check if ALL stories are complete (after auto-fix)
  if [[ "$DONE_STORIES" == "$TOTAL_STORIES" && "$TOTAL_STORIES" -gt 0 ]]; then
    echo ""
    echo "═══════════════════════════════════════"
    echo "✅ All stories complete! (auto-detected)"
    echo "═══════════════════════════════════════"
    echo "   Project: $PROJECT_NAME"
    echo "   Total iterations: $i"
    echo "   Finished: $(date +%H:%M:%S)"

    # Mark completion in progress file
    echo "" >> "$PROGRESS_FILE"
    echo "## COMPLETED: $(date +%Y-%m-%d)" >> "$PROGRESS_FILE"

    exit 0
  fi

  # Check for completion signal
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "═══════════════════════════════════════"
    echo "✅ All stories complete!"
    echo "═══════════════════════════════════════"
    echo "   Project: $PROJECT_NAME"
    echo "   Total iterations: $i"
    echo "   Finished: $(date +%H:%M:%S)"

    # Mark completion in progress file
    echo "" >> "$PROGRESS_FILE"
    echo "## COMPLETED: $(date +%Y-%m-%d)" >> "$PROGRESS_FILE"

    exit 0
  fi

  # Brief pause between iterations
  echo ""
  echo "⏳ Waiting 2 seconds before next iteration..."
  sleep 2
done

echo ""
echo "⚠️  Max iterations ($MAX_ITERATIONS) reached"
echo "   Project: $PROJECT_NAME"
echo "   Some stories may still be incomplete."
echo ""
echo "   Check status:"
echo "   cat $PRD_FILE | jq '.userStories[] | {id, passes}'"
exit 1
