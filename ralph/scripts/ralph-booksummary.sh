#!/bin/bash
# Ralph BookSummary Execution Script v1.0
# Fixes from ralph-parallel.sh:
#   1. Respects dependencies (topological sort)
#   2. Uses outputFiles[0] instead of outputFile
#   3. Detects type: "script" vs "llm"
#   4. Uses focused prompt template for BookSummary
#   5. Updates prd.json with passes/completedAt/notes
#
# Usage: ./ralph-booksummary.sh <project-dir>

set -e

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$RALPH_DIR/templates"
ROOT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
export ROOT_DIR  # Export for subshells

# Load file strategy module (versioning, enrichment, accumulation)
BOOK_SUMMARY_LIB="$ROOT_DIR/expansion-packs/book-summary/lib/file-strategy.sh"
if [[ -f "$BOOK_SUMMARY_LIB" ]]; then
  source "$BOOK_SUMMARY_LIB"
  FILE_STRATEGY_LOADED=true
else
  FILE_STRATEGY_LOADED=false
  echo "⚠️  Warning: file-strategy.sh not found. Versioning disabled."
fi

# Load .env file early (makes vars available to all subprocesses)
if [[ -f "$ROOT_DIR/.env" ]]; then
  set -a
  source "$ROOT_DIR/.env" 2>/dev/null || true
  set +a
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

log_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
  echo -e "${GREEN}✅${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}⚠️${NC} $1"
}

log_error() {
  echo -e "${RED}❌${NC} $1"
}

log_step() {
  echo -e "${CYAN}▶${NC} $1"
}

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

if [[ -z "$1" ]]; then
  echo ""
  echo "🚀 Ralph BookSummary Runner v1.0"
  echo ""
  echo "Usage: $0 <project-dir>"
  echo ""
  echo "Example:"
  echo "  $0 docs/ralph/the-lean-startup"
  echo ""
  exit 0
fi

PROJECT_DIR="$1"

# Resolve to absolute path
if [[ ! "$PROJECT_DIR" = /* ]]; then
  PROJECT_DIR="$(pwd)/$PROJECT_DIR"
fi
PROJECT_DIR="${PROJECT_DIR%/}"

if [[ ! -d "$PROJECT_DIR" ]]; then
  log_error "Project directory not found: $PROJECT_DIR"
  exit 1
fi

PRD_FILE="$PROJECT_DIR/prd.json"
if [[ ! -f "$PRD_FILE" ]]; then
  log_error "No prd.json in: $PROJECT_DIR"
  exit 1
fi

LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

# Get project info
PROJECT_NAME=$(jq -r '.project // "Unknown"' "$PRD_FILE")
OUTPUT_DIR=$(jq -r '.outputDir // ""' "$PRD_FILE")

# Get book info
BOOK_SLUG=$(jq -r '.books[0].slug // ""' "$PRD_FILE")
BOOK_TITLE=$(jq -r '.books[0].title // ""' "$PRD_FILE")
BOOK_AUTHOR=$(jq -r '.books[0].author // ""' "$PRD_FILE")

# ═══════════════════════════════════════════════════════════════
# SHOW HEADER
# ═══════════════════════════════════════════════════════════════

echo ""
echo "🚀 Ralph BookSummary Runner v1.0"
echo "═══════════════════════════════════════════════════════════"
echo "   Project:     $PROJECT_NAME"
echo "   Book:        $BOOK_TITLE by $BOOK_AUTHOR"
echo "   Book Slug:   $BOOK_SLUG"
echo "   Output Dir:  $OUTPUT_DIR"
echo "   Directory:   $PROJECT_DIR"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════
# DEPENDENCY CHECKING FUNCTIONS
# ═══════════════════════════════════════════════════════════════

# Check if a story's dependencies are all satisfied (passes=true)
check_dependencies() {
  local story_id="$1"
  local deps=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .dependencies // [] | .[]" "$PRD_FILE" 2>/dev/null)

  if [[ -z "$deps" ]]; then
    # No dependencies
    return 0
  fi

  for dep in $deps; do
    local dep_passes=$(jq -r ".userStories[] | select(.id == \"$dep\") | .passes" "$PRD_FILE")
    if [[ "$dep_passes" != "true" ]]; then
      return 1
    fi
  done

  return 0
}

# Get story type (llm or script)
get_story_type() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .type // \"llm\"" "$PRD_FILE"
}

# Get story command (for script type)
get_story_command() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .command // \"\"" "$PRD_FILE"
}

# Get first output file (uses outputFiles[0] instead of outputFile)
get_output_file() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .outputFiles[0] // \"\"" "$PRD_FILE"
}

# Get all output files
get_output_files() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .outputFiles // [] | .[]" "$PRD_FILE"
}

# Get story title
get_story_title() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .title" "$PRD_FILE"
}

# Get acceptance criteria
get_acceptance_criteria() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .acceptanceCriteria // [] | .[]" "$PRD_FILE"
}

# Get story description
get_story_description() {
  local story_id="$1"
  jq -r ".userStories[] | select(.id == \"$story_id\") | .description // \"\"" "$PRD_FILE"
}

# Update story status in prd.json
update_story_status() {
  local story_id="$1"
  local passes="$2"
  local notes="$3"
  local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  local tmp=$(mktemp)

  if [[ "$passes" == "true" ]]; then
    jq "(.userStories[] | select(.id == \"$story_id\")) |= . + {passes: true, completedAt: \"$timestamp\", notes: \"$notes\"} | del(.userStories[] | select(.id == \"$story_id\") | .blocked, .blockedReason, .blockedAt)" "$PRD_FILE" > "$tmp" && mv "$tmp" "$PRD_FILE"
  else
    jq "(.userStories[] | select(.id == \"$story_id\")) |= . + {passes: false, notes: \"$notes\"}" "$PRD_FILE" > "$tmp" && mv "$tmp" "$PRD_FILE"
  fi
}

# Mark story as blocked
mark_story_blocked() {
  local story_id="$1"
  local reason="$2"
  local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  local tmp=$(mktemp)
  jq "(.userStories[] | select(.id == \"$story_id\")) |= . + {blocked: true, blockedReason: \"$reason\", blockedAt: \"$timestamp\"}" "$PRD_FILE" > "$tmp" && mv "$tmp" "$PRD_FILE"
}

# ═══════════════════════════════════════════════════════════════
# EXECUTION FUNCTIONS
# ═══════════════════════════════════════════════════════════════

# Script timeout in seconds (5 minutes)
SCRIPT_TIMEOUT=${SCRIPT_TIMEOUT:-300}

# Load .env file at script start (makes vars available to all subprocesses)
if [[ -f "$ROOT_DIR/.env" ]]; then
  set -a
  source "$ROOT_DIR/.env" 2>/dev/null || true
  set +a
fi

# Run command with timeout (macOS compatible)
run_with_timeout() {
  local timeout_secs=$1
  local log_file=$2
  shift 2
  local cmd="$@"

  # Run command in subshell with .env loaded (ensures env vars are available)
  (
    if [[ -f "$ROOT_DIR/.env" ]]; then
      set -a
      source "$ROOT_DIR/.env" 2>/dev/null
      set +a
    fi
    eval "$cmd"
  ) >> "$log_file" 2>&1 &
  local pid=$!

  # Start timeout watcher in background
  (
    sleep $timeout_secs
    if kill -0 $pid 2>/dev/null; then
      echo "" >> "$log_file"
      echo "⏰ TIMEOUT: Command exceeded ${timeout_secs}s limit" >> "$log_file"
      kill -TERM $pid 2>/dev/null
      sleep 2
      kill -KILL $pid 2>/dev/null
    fi
  ) &
  local watcher=$!

  # Wait for command to finish
  wait $pid
  local status=$?

  # Kill the watcher if command finished before timeout
  kill $watcher 2>/dev/null
  wait $watcher 2>/dev/null

  return $status
}

# Execute a script-type story
execute_script_story() {
  local story_id="$1"
  local command="$2"
  local log_file="$LOG_DIR/${story_id}.log"

  log_step "Executing script: $command"
  log_info "Timeout: ${SCRIPT_TIMEOUT}s"

  echo "═══════════════════════════════════════" > "$log_file"
  echo "Story: $story_id" >> "$log_file"
  echo "Type: script" >> "$log_file"
  echo "Command: $command" >> "$log_file"
  echo "Timeout: ${SCRIPT_TIMEOUT}s" >> "$log_file"
  echo "Started: $(date)" >> "$log_file"
  echo "═══════════════════════════════════════" >> "$log_file"

  # Execute from root directory
  cd "$ROOT_DIR"

  if run_with_timeout "$SCRIPT_TIMEOUT" "$log_file" "$command"; then
    echo "═══════════════════════════════════════" >> "$log_file"
    echo "Completed: $(date)" >> "$log_file"
    echo "Status: SUCCESS" >> "$log_file"
    return 0
  else
    echo "═══════════════════════════════════════" >> "$log_file"
    echo "Completed: $(date)" >> "$log_file"
    echo "Status: FAILED (timeout or error)" >> "$log_file"
    return 1
  fi
}

# Execute an LLM-type story
execute_llm_story() {
  local story_id="$1"
  local log_file="$LOG_DIR/${story_id}.log"

  local title=$(get_story_title "$story_id")
  local description=$(get_story_description "$story_id")
  local output_file=$(get_output_file "$story_id")
  local criteria=$(get_acceptance_criteria "$story_id")

  log_step "Generating LLM prompt for: $title"

  # Build focused prompt
  local prompt="# Ralph BookSummary Agent - Story: $story_id

## Context

- **PROJECT_DIR:** $PROJECT_DIR
- **PRD_FILE:** $PRD_FILE
- **BOOK_SLUG:** $BOOK_SLUG
- **BOOK_TITLE:** $BOOK_TITLE
- **OUTPUT_BASE:** $ROOT_DIR/$OUTPUT_DIR/$BOOK_SLUG

## Current Story

**ID:** $story_id
**Title:** $title
**Description:** $description

## Acceptance Criteria

Execute ONLY this story. Follow these criteria EXACTLY:

$criteria

## Output Files Expected

$(get_output_files "$story_id" | while read f; do echo "- $ROOT_DIR/$f"; done)

## Task Files to Read

Read and follow the task files mentioned in acceptance criteria from:
- expansion-packs/book-summary/tasks/

## ⛔ CRITICAL RULES

1. **NO GIT OPERATIONS** - Do NOT use git add, git commit, git push
2. **ONLY this story** - Do NOT execute other stories
3. **Follow task files** - Read the .md task files mentioned in acceptance criteria
4. **Create output files** - Files listed in Output Files Expected must be created
5. **Use absolute paths** - All file paths should be absolute

## Stop Condition

When this story is complete, output:
\`\`\`
<promise>STORY_COMPLETE:$story_id</promise>
\`\`\`

Now execute story $story_id: $title"

  echo "═══════════════════════════════════════" > "$log_file"
  echo "Story: $story_id" >> "$log_file"
  echo "Type: llm" >> "$log_file"
  echo "Title: $title" >> "$log_file"
  echo "Started: $(date)" >> "$log_file"
  echo "═══════════════════════════════════════" >> "$log_file"
  echo "" >> "$log_file"
  echo "PROMPT:" >> "$log_file"
  echo "$prompt" >> "$log_file"
  echo "" >> "$log_file"
  echo "═══════════════════════════════════════" >> "$log_file"
  echo "EXECUTION OUTPUT:" >> "$log_file"
  echo "" >> "$log_file"

  # Execute Claude with the prompt
  cd "$ROOT_DIR"

  if claude -p --dangerously-skip-permissions "$prompt" >> "$log_file" 2>&1; then
    echo "" >> "$log_file"
    echo "═══════════════════════════════════════" >> "$log_file"
    echo "Completed: $(date)" >> "$log_file"
    echo "Status: SUCCESS" >> "$log_file"
    return 0
  else
    echo "" >> "$log_file"
    echo "═══════════════════════════════════════" >> "$log_file"
    echo "Completed: $(date)" >> "$log_file"
    echo "Status: FAILED" >> "$log_file"
    return 1
  fi
}

# Validate story outputs
validate_outputs() {
  local story_id="$1"
  local output_file=$(get_output_file "$story_id")

  # If no output file expected, consider valid
  if [[ -z "$output_file" ]]; then
    return 0
  fi

  local full_path="$ROOT_DIR/$output_file"

  # Check if output file or directory exists
  if [[ -f "$full_path" ]]; then
    local lines=$(wc -l < "$full_path" 2>/dev/null || echo "0")
    log_success "Output verified: $output_file ($lines lines)"
    return 0
  elif [[ -d "$full_path" ]]; then
    local count=$(ls -1 "$full_path" 2>/dev/null | wc -l || echo "0")
    log_success "Output directory verified: $output_file ($count files)"
    return 0
  else
    log_error "Output NOT found: $full_path"
    return 1
  fi
}

# ═══════════════════════════════════════════════════════════════
# MAIN EXECUTION LOOP
# ═══════════════════════════════════════════════════════════════

# Get stories sorted by priority
STORIES=$(jq -r '.userStories | sort_by(.priority) | .[].id' "$PRD_FILE")

# Count totals
TOTAL_STORIES=$(echo "$STORIES" | grep -c . 2>/dev/null || echo 0)
COMPLETED_BEFORE=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE")

echo "📋 Stories Overview:"
echo ""

# Show status of all stories
for story_id in $STORIES; do
  title=$(get_story_title "$story_id")
  passes=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .passes" "$PRD_FILE")
  story_type=$(get_story_type "$story_id")
  deps=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .dependencies // [] | join(\", \")" "$PRD_FILE")

  if [[ "$passes" == "true" ]]; then
    echo -e "   ${GREEN}✅${NC} $story_id: $title [$story_type]"
  else
    if check_dependencies "$story_id"; then
      echo -e "   ${YELLOW}⬚${NC} $story_id: $title [$story_type]"
    else
      echo -e "   ${RED}🔒${NC} $story_id: $title [$story_type] (deps: $deps)"
    fi
  fi
done

echo ""

# Check if all complete
if [[ "$COMPLETED_BEFORE" == "$TOTAL_STORIES" ]]; then
  log_success "All $TOTAL_STORIES stories already complete!"
  exit 0
fi

echo "🔄 Starting sequential execution with dependency checking..."
echo ""

# Process stories in order
EXECUTED=0
FAILED=0

for story_id in $STORIES; do
  # Skip if already passes
  passes=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .passes" "$PRD_FILE")
  if [[ "$passes" == "true" ]]; then
    continue
  fi

  title=$(get_story_title "$story_id")
  story_type=$(get_story_type "$story_id")

  echo "───────────────────────────────────────────────────────────"
  echo ""
  log_info "Processing $story_id: $title"

  # Check dependencies
  if ! check_dependencies "$story_id"; then
    deps=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .dependencies // [] | join(\", \")" "$PRD_FILE")
    log_warning "Dependencies not met: $deps - skipping"
    mark_story_blocked "$story_id" "Dependencies not satisfied: $deps"
    echo ""
    continue
  fi

  log_info "Type: $story_type"

  # Execute based on type
  if [[ "$story_type" == "script" ]]; then
    command=$(get_story_command "$story_id")
    if [[ -z "$command" ]]; then
      log_error "No command specified for script story"
      update_story_status "$story_id" "false" "No command specified"
      ((FAILED++))
      continue
    fi

    if execute_script_story "$story_id" "$command"; then
      if validate_outputs "$story_id"; then
        update_story_status "$story_id" "true" "Script executed successfully"
        ((EXECUTED++))
      else
        update_story_status "$story_id" "false" "Script completed but output not found"
        ((FAILED++))
      fi
    else
      update_story_status "$story_id" "false" "Script execution failed"
      ((FAILED++))
    fi
  else
    # LLM type
    if execute_llm_story "$story_id"; then
      if validate_outputs "$story_id"; then
        update_story_status "$story_id" "true" "LLM execution completed and output verified"
        ((EXECUTED++))
      else
        update_story_status "$story_id" "false" "LLM completed but output not found"
        ((FAILED++))
      fi
    else
      update_story_status "$story_id" "false" "LLM execution failed"
      ((FAILED++))
    fi
  fi

  echo ""
done

# ═══════════════════════════════════════════════════════════════
# FINAL SUMMARY
# ═══════════════════════════════════════════════════════════════

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 Execution Summary"
echo "═══════════════════════════════════════════════════════════"
echo ""

FINAL_COMPLETE=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE")
FINAL_PENDING=$(jq '[.userStories[] | select(.passes == false)] | length' "$PRD_FILE")

echo "   Total Stories:    $TOTAL_STORIES"
echo "   Completed:        $FINAL_COMPLETE"
echo "   Pending:          $FINAL_PENDING"
echo "   Executed Now:     $EXECUTED"
echo "   Failed:           $FAILED"
echo ""

# Show final status
echo "📋 Final Status:"
echo ""

for story_id in $STORIES; do
  title=$(get_story_title "$story_id")
  passes=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .passes" "$PRD_FILE")
  story_type=$(get_story_type "$story_id")

  if [[ "$passes" == "true" ]]; then
    echo -e "   ${GREEN}✅${NC} $story_id: $title"
  else
    blocked=$(jq -r ".userStories[] | select(.id == \"$story_id\") | .blocked // false" "$PRD_FILE")
    if [[ "$blocked" == "true" ]]; then
      echo -e "   ${RED}🔒${NC} $story_id: $title (blocked)"
    else
      echo -e "   ${YELLOW}⬚${NC} $story_id: $title (pending)"
    fi
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"

if [[ "$FINAL_COMPLETE" == "$TOTAL_STORIES" ]]; then
  log_success "All stories complete! 🎉"
  exit 0
elif [[ "$FAILED" -gt 0 ]]; then
  log_warning "Some stories failed. Check logs in: $LOG_DIR"
  exit 1
else
  log_info "Run again to continue with remaining stories"
  exit 0
fi
