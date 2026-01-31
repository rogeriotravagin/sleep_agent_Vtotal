#!/bin/bash
# Ralph Parallel Execution Script v4
# With dependency checking and script story support
# Usage: ./ralph-parallel.sh <project-dir> [max-concurrent]

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$RALPH_DIR/templates"

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

if [[ -z "$1" ]]; then
  echo "🚀 Ralph Parallel Runner v4"
  echo ""
  echo "Usage: $0 <project-dir> [max-concurrent]"
  echo ""
  echo "Features:"
  echo "  - Dependency checking before story launch"
  echo "  - Script story direct execution (type: script)"
  echo "  - Auto-mark stories as passed on completion"
  exit 0
fi

PROJECT_DIR="$1"
MAX_CONCURRENT=${2:-10}

# Resolve to absolute path
if [[ ! "$PROJECT_DIR" = /* ]]; then
  PROJECT_DIR="$(pwd)/$PROJECT_DIR"
fi
PROJECT_DIR="${PROJECT_DIR%/}"

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "❌ Project directory not found: $PROJECT_DIR"
  exit 1
fi

PRD_FILE="$PROJECT_DIR/prd.json"
if [[ ! -f "$PRD_FILE" ]]; then
  echo "❌ No prd.json in: $PROJECT_DIR"
  exit 1
fi

LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

# Get project info
PROJECT_NAME=$(jq -r '.project // "Unknown"' "$PRD_FILE")
OUTPUT_DIR=$(jq -r '.outputDir // ""' "$PRD_FILE")

# Use project prompt.md, content template, or booksummary template
if [[ -f "$PROJECT_DIR/prompt.md" ]]; then
  PROMPT_FILE="$PROJECT_DIR/prompt.md"
elif [[ -f "$TEMPLATES_DIR/prompt-booksummary.md" ]]; then
  PROMPT_FILE="$TEMPLATES_DIR/prompt-booksummary.md"
elif [[ -f "$TEMPLATES_DIR/prompt-content.md" ]]; then
  PROMPT_FILE="$TEMPLATES_DIR/prompt-content.md"
else
  echo "❌ No prompt file found"
  exit 1
fi

# ═══════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

# Check if all dependencies for a story are completed
check_dependencies() {
  local story_id="$1"
  local deps=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .dependencies[]?" "$PRD_FILE" 2>/dev/null)

  if [[ -z "$deps" ]]; then
    # No dependencies
    return 0
  fi

  for dep in $deps; do
    local dep_passed=$(jq -r ".userStories[] | select(.id == \"$dep\") | .passes" "$PRD_FILE")
    if [[ "$dep_passed" != "true" ]]; then
      return 1
    fi
  done

  return 0
}

# Mark a story as passed in prd.json
mark_story_passed() {
  local story_id="$1"
  local tmp=$(mktemp)
  jq "(.userStories[] | select(.id == \"$story_id\") | .passes) = true" "$PRD_FILE" > "$tmp" && mv "$tmp" "$PRD_FILE"
}

# Get stories ready to run (dependencies met, not yet passed)
get_ready_stories() {
  local ready=()
  local all_stories=$(jq -r '.userStories[] | select(.passes == false) | .id' "$PRD_FILE")

  for story_id in $all_stories; do
    if check_dependencies "$story_id"; then
      ready+=("$story_id")
    fi
  done

  echo "${ready[@]}"
}

# ═══════════════════════════════════════════════════════════════
# SHOW STATUS
# ═══════════════════════════════════════════════════════════════

echo ""
echo "🚀 Ralph Parallel Execution v4"
echo "═══════════════════════════════════════════════════════════"
echo "   Project:        $PROJECT_NAME"
echo "   Max Concurrent: $MAX_CONCURRENT"
echo "   Directory:      $PROJECT_DIR"
echo "   Prompt:         $(basename "$PROMPT_FILE")"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Get pending stories
PENDING_STORIES=$(jq -r '.userStories[] | select(.passes == false) | .id' "$PRD_FILE")
TOTAL_PENDING=$(echo "$PENDING_STORIES" | grep -c . 2>/dev/null || echo 0)

if [[ "$TOTAL_PENDING" == "0" ]]; then
  echo "✅ All stories already complete!"
  exit 0
fi

echo "📋 Pending Stories: $TOTAL_PENDING"
echo "$PENDING_STORIES" | while read sid; do
  [[ -z "$sid" ]] && continue
  title=$(jq -r ".userStories[] | select(.id == \"$sid\") | .title" "$PRD_FILE")
  stype=$(jq -r ".userStories[] | select(.id == \"$sid\") | .type // \"llm\"" "$PRD_FILE")
  deps=$(jq -r ".userStories[] | select(.id == \"$sid\") | .dependencies | length" "$PRD_FILE")

  if [[ "$stype" == "script" ]]; then
    echo "   ⬚ $sid: $title [SCRIPT] (deps: $deps)"
  else
    echo "   ⬚ $sid: $title (deps: $deps)"
  fi
done
echo ""

# ═══════════════════════════════════════════════════════════════
# CREATE RUNNER SCRIPT
# ═══════════════════════════════════════════════════════════════

RUNNER_SCRIPT="$LOG_DIR/_runner.sh"
cat > "$RUNNER_SCRIPT" << 'RUNNER_EOF'
#!/bin/bash
story_id="$1"
prd_file="$2"
project_dir="$3"
output_dir="$4"
prompt_file="$5"
log_file="$6"

title=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .title" "$prd_file")
output_files=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .outputFiles[]?" "$prd_file" 2>/dev/null)

# Detect story type: "script" or "llm" (default)
story_type=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .type // \"llm\"" "$prd_file")

# Mark as in_progress immediately
tmp=$(mktemp)
jq "(.userStories[] | select(.id == \"$story_id\") | .status) = \"in_progress\"" "$prd_file" > "$tmp" && mv "$tmp" "$prd_file"

echo "▶ Starting $story_id: $title" > "$log_file"
echo "▶ Type: $story_type" >> "$log_file"
echo "▶ Output files: $output_files" >> "$log_file"
echo "▶ Status: in_progress" >> "$log_file"
echo "═══════════════════════════════════════" >> "$log_file"

success=false

if [[ "$story_type" == "script" ]]; then
  # SCRIPT type: Execute command directly without Claude
  command=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .command // \"\"" "$prd_file")

  if [[ -n "$command" && "$command" != "null" ]]; then
    echo "▶ Executing script command: $command" >> "$log_file"
    echo "═══════════════════════════════════════" >> "$log_file"

    # Change to project root directory for script execution
    cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

    # Execute the command
    eval "$command" >> "$log_file" 2>&1
    exit_code=$?

    echo "═══════════════════════════════════════" >> "$log_file"
    if [[ $exit_code -eq 0 ]]; then
      echo "◀ Script completed successfully (exit code: $exit_code)" >> "$log_file"
      success=true
    else
      echo "◀ Script failed (exit code: $exit_code)" >> "$log_file"
    fi
  else
    echo "◀ ERROR: Script story missing 'command' field" >> "$log_file"
  fi
else
  # LLM type: Execute via Claude (default behavior)
  full_prompt="PROJECT_DIR=$project_dir
PRD_FILE=$prd_file
OUTPUT_DIR=$output_dir
CURRENT_STORY_ID=$story_id
CURRENT_STORY_TITLE=$title

Execute ONLY story $story_id: $title

$(cat "$prompt_file")"

  claude -p --dangerously-skip-permissions "$full_prompt" >> "$log_file" 2>&1
  exit_code=$?

  echo "═══════════════════════════════════════" >> "$log_file"
  if [[ $exit_code -eq 0 ]]; then
    echo "◀ Claude finished $story_id" >> "$log_file"
    success=true
  else
    echo "◀ Claude failed $story_id (exit code: $exit_code)" >> "$log_file"
  fi
fi

# Mark story as passed if successful
if [[ "$success" == "true" ]]; then
  # For script stories without output files, always mark as passed
  # For LLM stories, check if output files exist
  should_mark=false

  if [[ "$story_type" == "script" ]]; then
    should_mark=true
  elif [[ -z "$output_files" ]]; then
    # No output files defined, mark as passed
    should_mark=true
  else
    # Check if at least one output file exists
    for of in $output_files; do
      if [[ -f "$of" ]] || [[ -d "$of" ]]; then
        should_mark=true
        break
      fi
    done
  fi

  if [[ "$should_mark" == "true" ]]; then
    # Try to extract score from scoring-report.md
    score=""
    for of in $output_files; do
      if [[ "$of" == *"scoring-report.md" ]] && [[ -f "$of" ]]; then
        score=$(grep -oiE 'SCORE FINAL[:\s]*[0-9]+' "$of" 2>/dev/null | grep -oE '[0-9]+' | head -1)
        if [[ -z "$score" ]]; then
          score=$(grep -oE '[0-9]+/100' "$of" 2>/dev/null | grep -oE '^[0-9]+' | head -1)
        fi
        break
      fi
    done

    # Update PRD with passes, status, and optionally score
    tmp=$(mktemp)
    if [[ -n "$score" ]]; then
      jq "(.userStories[] | select(.id == \"$story_id\") | .passes) = true | (.userStories[] | select(.id == \"$story_id\") | .status) = \"done\" | (.userStories[] | select(.id == \"$story_id\") | .score) = $score" "$prd_file" > "$tmp" && mv "$tmp" "$prd_file"
      echo "✅ Marked $story_id as passed (status: done, score: $score)" >> "$log_file"
    else
      jq "(.userStories[] | select(.id == \"$story_id\") | .passes) = true | (.userStories[] | select(.id == \"$story_id\") | .status) = \"done\"" "$prd_file" > "$tmp" && mv "$tmp" "$prd_file"
      echo "✅ Marked $story_id as passed (status: done)" >> "$log_file"
    fi
  else
    # Revert to pending if output files not found
    tmp=$(mktemp)
    jq "(.userStories[] | select(.id == \"$story_id\") | .status) = \"pending\"" "$prd_file" > "$tmp" && mv "$tmp" "$prd_file"
    echo "⚠️ Output files not found, reverting to pending" >> "$log_file"
  fi
else
  # Failed - revert to pending
  tmp=$(mktemp)
  jq "(.userStories[] | select(.id == \"$story_id\") | .status) = \"pending\"" "$prd_file" > "$tmp" && mv "$tmp" "$prd_file"
  echo "❌ Failed, reverting to pending" >> "$log_file"
fi
RUNNER_EOF
chmod +x "$RUNNER_SCRIPT"

# ═══════════════════════════════════════════════════════════════
# PARALLEL EXECUTION WITH DEPENDENCY CHECKING
# ═══════════════════════════════════════════════════════════════

echo "🔄 Starting parallel execution with dependency checking..."
echo ""

# Track jobs: PID files and launched stories
PID_DIR="$LOG_DIR/_pids"
LAUNCHED_DIR="$LOG_DIR/_launched"
mkdir -p "$PID_DIR" "$LAUNCHED_DIR"

# Main execution loop - runs until all stories complete
while true; do
  # Clean up finished jobs
  for pid_file in "$PID_DIR"/*; do
    [[ -f "$pid_file" ]] || continue
    pid=$(cat "$pid_file")
    if ! kill -0 "$pid" 2>/dev/null; then
      rm -f "$pid_file"
    fi
  done

  # Check if all stories are complete
  remaining=$(jq '[.userStories[] | select(.passes == false)] | length' "$PRD_FILE")
  if [[ "$remaining" == "0" ]]; then
    break
  fi

  # Get currently running count
  running=$(ls "$PID_DIR" 2>/dev/null | wc -l | tr -d ' ')

  # Find stories ready to run (dependencies met)
  ready_stories=$(get_ready_stories)

  # Launch new jobs if we have capacity
  for story_id in $ready_stories; do
    # Check if already running OR already launched (prevents race condition)
    if [[ -f "$PID_DIR/$story_id" ]] || [[ -f "$LAUNCHED_DIR/$story_id" ]]; then
      continue
    fi

    # Check capacity
    running=$(ls "$PID_DIR" 2>/dev/null | wc -l | tr -d ' ')
    if [[ $running -ge $MAX_CONCURRENT ]]; then
      break
    fi

    # Mark as launched BEFORE launching (prevents race condition)
    touch "$LAUNCHED_DIR/$story_id"

    # Launch story
    log_file="$LOG_DIR/${story_id}.log"
    title=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .title" "$PRD_FILE")
    stype=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .type // \"llm\"" "$PRD_FILE")

    if [[ "$stype" == "script" ]]; then
      echo "   ▶ $story_id: $title [SCRIPT]"
    else
      echo "   ▶ $story_id: $title"
    fi

    # Launch in background
    "$RUNNER_SCRIPT" "$story_id" "$PRD_FILE" "$PROJECT_DIR" "$OUTPUT_DIR" "$PROMPT_FILE" "$log_file" &
    echo $! > "$PID_DIR/$story_id"
  done

  # Wait a bit before next iteration
  sleep 3
done

echo ""
echo "⏳ Waiting for remaining jobs to complete..."

# Wait for any remaining jobs
while [[ $(ls "$PID_DIR" 2>/dev/null | wc -l) -gt 0 ]]; do
  sleep 2
  echo -n "."
  for pid_file in "$PID_DIR"/*; do
    [[ -f "$pid_file" ]] || continue
    pid=$(cat "$pid_file")
    if ! kill -0 "$pid" 2>/dev/null; then
      rm -f "$pid_file"
    fi
  done
done
echo ""

# ═══════════════════════════════════════════════════════════════
# CHECK RESULTS
# ═══════════════════════════════════════════════════════════════

echo ""
echo "📊 Final Results"
echo "═══════════════════════════════════════════════════════════"

# Show results per story
jq -r '.userStories[] | "\(.id)|\(.title)|\(.passes)|\(.type // "llm")"' "$PRD_FILE" | while IFS='|' read -r sid title passed stype; do
  if [[ "$passed" == "true" ]]; then
    if [[ "$stype" == "script" ]]; then
      echo "   ✅ $sid: $title [SCRIPT]"
    else
      echo "   ✅ $sid: $title"
    fi
  else
    if [[ "$stype" == "script" ]]; then
      echo "   ❌ $sid: $title [SCRIPT]"
    else
      echo "   ❌ $sid: $title"
    fi
  fi
done

echo ""
FINAL_COMPLETE=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE")
FINAL_TOTAL=$(jq '.userStories | length' "$PRD_FILE")
SCRIPT_COUNT=$(jq '[.userStories[] | select(.type == "script")] | length' "$PRD_FILE")
LLM_COUNT=$(jq '[.userStories[] | select(.type != "script" or .type == null)] | length' "$PRD_FILE")

echo "═══════════════════════════════════════════════════════════"
echo "   Complete: $FINAL_COMPLETE/$FINAL_TOTAL stories"
echo "   Script:   $SCRIPT_COUNT | LLM: $LLM_COUNT"
echo "═══════════════════════════════════════════════════════════"

# Cleanup
rm -rf "$PID_DIR" "$LAUNCHED_DIR" "$RUNNER_SCRIPT" 2>/dev/null || true

# Exit with appropriate code
if [[ "$FINAL_COMPLETE" == "$FINAL_TOTAL" ]]; then
  echo ""
  echo "🎉 All stories completed successfully!"
  exit 0
else
  echo ""
  echo "⚠️ Some stories failed. Check logs in: $LOG_DIR"
  exit 1
fi
