#!/bin/bash
# Ralph Batch Execution Script
# Runs multiple PRD projects in parallel
# Usage: ./ralph-batch.sh [max-concurrent] [--offset N] [--limit N] [--dry-run]

set -e

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_SCRIPT="$SCRIPT_DIR/ralph.sh"
MMOS_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
RALPH_DOCS="$MMOS_DIR/docs/ralph"
LOG_DIR="$MMOS_DIR/logs/ralph-batch"

MAX_CONCURRENT=4
DRY_RUN=false
OFFSET=0
LIMIT=999

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --offset)
      OFFSET="$2"
      shift 2
      ;;
    --limit)
      LIMIT="$2"
      shift 2
      ;;
    *)
      # First positional arg is max-concurrent
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_CONCURRENT="$1"
      fi
      shift
      ;;
  esac
done

mkdir -p "$LOG_DIR"

# ═══════════════════════════════════════════════════════════════
# FIND PENDING PRDS
# ═══════════════════════════════════════════════════════════════

echo ""
echo "🚀 Ralph Batch Execution"
echo "═══════════════════════════════════════════════════════════"
echo "   Max Concurrent: $MAX_CONCURRENT"
echo "   Offset:         $OFFSET"
echo "   Limit:          $LIMIT"
echo "   Dry Run:        $DRY_RUN"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Find all PRDs with pending stories (passes == false)
ALL_PENDING_PRDS=()

for prd_dir in "$RALPH_DOCS"/*/; do
  prd_file="$prd_dir/prd.json"
  [[ -f "$prd_file" ]] || continue

  # Count pending stories
  pending=$(jq '[.userStories[] | select(.passes == false)] | length' "$prd_file" 2>/dev/null || echo "0")

  if [[ "$pending" -gt 0 ]]; then
    ALL_PENDING_PRDS+=("$prd_dir")
  fi
done

TOTAL_ALL=${#ALL_PENDING_PRDS[@]}
echo "📋 Total PRDs pendentes: $TOTAL_ALL"
echo ""

# Apply offset and limit
PENDING_PRDS=()
idx=0
for prd_dir in "${ALL_PENDING_PRDS[@]}"; do
  if [[ $idx -ge $OFFSET && ${#PENDING_PRDS[@]} -lt $LIMIT ]]; then
    PENDING_PRDS+=("$prd_dir")
    prd_file="$prd_dir/prd.json"
    name=$(basename "$prd_dir")
    pending=$(jq '[.userStories[] | select(.passes == false)] | length' "$prd_file" 2>/dev/null || echo "0")
    total=$(jq '.userStories | length' "$prd_file" 2>/dev/null || echo "0")
    project=$(jq -r '.project // "Unknown"' "$prd_file" 2>/dev/null)
    echo "   📁 [$idx] $name: $pending/$total pending"
  fi
  ((idx++))
done

TOTAL_PRDS=${#PENDING_PRDS[@]}

if [[ $TOTAL_PRDS -eq 0 ]]; then
  echo ""
  echo "✅ No pending PRDs in range [$OFFSET-$((OFFSET+LIMIT-1))]. All complete!"
  exit 0
fi

END_IDX=$((OFFSET + TOTAL_PRDS - 1))
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "   Processing: $TOTAL_PRDS PRDs (index $OFFSET to $END_IDX)"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [[ "$DRY_RUN" == "true" ]]; then
  echo "🔍 Dry run mode - would execute these:"
  for i in "${!PENDING_PRDS[@]}"; do
    prd_dir="${PENDING_PRDS[$i]}"
    echo "   $RALPH_SCRIPT $prd_dir"
  done
  exit 0
fi

# ═══════════════════════════════════════════════════════════════
# PARALLEL EXECUTION
# ═══════════════════════════════════════════════════════════════

echo "🔄 Starting batch execution..."
echo ""

PID_DIR="$LOG_DIR/_pids"
mkdir -p "$PID_DIR"

START_TIME=$(date +%s)

# Launch jobs
for i in "${!PENDING_PRDS[@]}"; do
  prd_dir="${PENDING_PRDS[$i]}"
  name=$(basename "$prd_dir")

  # Wait if at max concurrent
  while [[ $(ls "$PID_DIR" 2>/dev/null | wc -l) -ge $MAX_CONCURRENT ]]; do
    sleep 5
    # Clean up finished jobs
    for pid_file in "$PID_DIR"/*; do
      [[ -f "$pid_file" ]] || continue
      pid=$(cat "$pid_file")
      if ! kill -0 "$pid" 2>/dev/null; then
        finished_name=$(basename "$pid_file")
        echo "   ✅ Completed: $finished_name"
        rm -f "$pid_file"
      fi
    done
  done

  log_file="$LOG_DIR/${name}.log"
  echo "   ▶ Starting: $name"

  # Launch ralph.sh in background
  "$RALPH_SCRIPT" "$prd_dir" 100 > "$log_file" 2>&1 &
  echo $! > "$PID_DIR/$name"
done

# Wait for all to complete
echo ""
echo "⏳ Waiting for all jobs to complete..."
echo "   (Check logs in: $LOG_DIR)"
echo ""

while [[ $(ls "$PID_DIR" 2>/dev/null | wc -l) -gt 0 ]]; do
  sleep 10
  running=$(ls "$PID_DIR" 2>/dev/null | wc -l | tr -d ' ')
  echo "   ⏳ Running: $running jobs..."

  # Clean up finished jobs
  for pid_file in "$PID_DIR"/*; do
    [[ -f "$pid_file" ]] || continue
    pid=$(cat "$pid_file")
    if ! kill -0 "$pid" 2>/dev/null; then
      finished_name=$(basename "$pid_file")
      echo "   ✅ Completed: $finished_name"
      rm -f "$pid_file"
    fi
  done
done

# ═══════════════════════════════════════════════════════════════
# FINAL REPORT
# ═══════════════════════════════════════════════════════════════

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 Batch Execution Complete"
echo "═══════════════════════════════════════════════════════════"
echo "   Duration: ${MINUTES}m ${SECONDS}s"
echo ""

# Check final status
COMPLETED=0
PARTIAL=0
FAILED=0

for prd_dir in "${PENDING_PRDS[@]}"; do
  prd_file="$prd_dir/prd.json"
  name=$(basename "$prd_dir")

  pending=$(jq '[.userStories[] | select(.passes == false)] | length' "$prd_file" 2>/dev/null || echo "0")
  total=$(jq '.userStories | length' "$prd_file" 2>/dev/null || echo "0")
  complete=$((total - pending))

  if [[ "$pending" -eq 0 ]]; then
    echo "   ✅ $name: $total/$total complete"
    ((COMPLETED++))
  elif [[ "$complete" -gt 0 ]]; then
    echo "   🟡 $name: $complete/$total complete ($pending remaining)"
    ((PARTIAL++))
  else
    echo "   ❌ $name: 0/$total complete"
    ((FAILED++))
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "   ✅ Completed: $COMPLETED"
echo "   🟡 Partial:   $PARTIAL"
echo "   ❌ Failed:    $FAILED"
echo "═══════════════════════════════════════════════════════════"

# Cleanup
rm -rf "$PID_DIR" 2>/dev/null || true

if [[ $PARTIAL -gt 0 || $FAILED -gt 0 ]]; then
  echo ""
  echo "💡 Re-run to continue incomplete PRDs:"
  echo "   $0 $MAX_CONCURRENT"
  exit 1
fi

echo ""
echo "🎉 All PRDs complete!"
