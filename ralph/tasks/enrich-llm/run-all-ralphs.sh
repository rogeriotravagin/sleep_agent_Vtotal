#!/bin/bash
# run-all-ralphs.sh - Launch 6 parallel Ralph agents for frontmatter enrichment
# Usage: ./tasks/enrich-llm/run-all-ralphs.sh

set -e

TASK_DIR="tasks/enrich-llm"
LOG_DIR="$TASK_DIR/logs"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🔄 Launching 6 Ralph agents in parallel..."
echo "   Logs will be in: $LOG_DIR/"
echo ""

# Function to run a Ralph
run_ralph() {
    local ralph_num=$1
    local ralph_file=$2
    local log_file="$LOG_DIR/ralph-${ralph_num}_${TIMESTAMP}.log"

    echo "🚀 Starting Ralph-$ralph_num: $ralph_file"

    # Run Claude Code with the Ralph prompt
    claude --print "$(cat $TASK_DIR/$ralph_file)" \
        > "$log_file" 2>&1 &

    echo "   PID: $! → $log_file"
}

# Launch all 6 Ralphs in parallel
run_ralph 1 "ralph-1-developmental.md"
run_ralph 2 "ralph-2-enneagram.md"
run_ralph 3 "ralph-3-traits.md"
run_ralph 4 "ralph-4-parts.md"
run_ralph 5 "ralph-5-behavioral.md"
run_ralph 6 "ralph-6-consciousness.md"

echo ""
echo "✅ All 6 Ralphs launched!"
echo ""
echo "Monitor progress:"
echo "  tail -f $LOG_DIR/ralph-*_${TIMESTAMP}.log"
echo ""
echo "Check completion:"
echo "  ls $TASK_DIR/ralph-*-complete.md"
echo ""
echo "Wait for all to finish:"
echo "  wait"

# Wait for all background jobs
wait

echo ""
echo "🎉 All Ralphs completed!"
