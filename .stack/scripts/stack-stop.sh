#!/bin/bash
# Stack Stop Script
# Stops all running stack processes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$STACK_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ═══════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════

print_step() {
  echo -e "${BLUE}→${NC} $1"
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_warn() {
  echo -e "${YELLOW}!${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

stop_ralph_processes() {
  print_step "Stopping Ralph processes..."

  local count=0

  # Find and kill ralph.sh processes
  if command -v pkill &> /dev/null; then
    pkill -f "ralph.sh" 2>/dev/null && count=$((count + 1)) || true
  fi

  # Find and kill claude processes started by ralph
  if command -v pkill &> /dev/null; then
    pkill -f "claude -p" 2>/dev/null && count=$((count + 1)) || true
  fi

  if [[ $count -gt 0 ]]; then
    print_success "Stopped $count Ralph-related processes"
  else
    print_success "No Ralph processes running"
  fi
}

stop_node_processes() {
  print_step "Stopping Node.js stack processes..."

  local count=0

  # Find tsx processes running stack code
  if command -v pkill &> /dev/null; then
    pkill -f "tsx.*\.stack" 2>/dev/null && count=$((count + 1)) || true
    pkill -f "node.*\.stack" 2>/dev/null && count=$((count + 1)) || true
  fi

  if [[ $count -gt 0 ]]; then
    print_success "Stopped $count Node.js processes"
  else
    print_success "No Node.js stack processes running"
  fi
}

cleanup_worktrees() {
  print_step "Cleaning up stale worktrees..."

  cd "$PROJECT_ROOT"

  # Prune stale worktree entries
  git worktree prune 2>/dev/null || true

  print_success "Worktree cleanup complete"
}

cleanup_temp_files() {
  print_step "Cleaning up temporary files..."

  local temp_dir="$STACK_DIR/temp"
  local count=0

  if [[ -d "$temp_dir" ]]; then
    count=$(find "$temp_dir" -type f 2>/dev/null | wc -l)
    rm -rf "$temp_dir"/* 2>/dev/null || true
  fi

  print_success "Removed $count temporary files"
}

show_running_processes() {
  print_step "Checking for remaining processes..."

  local found=false

  # Check for ralph processes
  if pgrep -f "ralph.sh" &>/dev/null; then
    print_warn "Ralph processes still running:"
    pgrep -af "ralph.sh" 2>/dev/null | head -5
    found=true
  fi

  # Check for claude processes
  if pgrep -f "claude -p" &>/dev/null; then
    print_warn "Claude processes still running:"
    pgrep -af "claude -p" 2>/dev/null | head -5
    found=true
  fi

  if [[ "$found" == false ]]; then
    print_success "No stack processes running"
  fi
}

force_stop() {
  print_step "Force stopping all related processes..."

  # More aggressive kill
  if command -v pkill &> /dev/null; then
    pkill -9 -f "ralph.sh" 2>/dev/null || true
    pkill -9 -f "claude -p" 2>/dev/null || true
    pkill -9 -f "tsx.*\.stack" 2>/dev/null || true
  fi

  print_success "Force stop complete"
}

show_usage() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --force        Force kill all processes (SIGKILL)"
  echo "  --cleanup      Also cleanup worktrees and temp files"
  echo "  --all          Stop everything and cleanup (default)"
  echo "  --help         Show this help"
}

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

FORCE=false
CLEANUP=false
ALL=true

while [[ $# -gt 0 ]]; do
  case $1 in
    --force)
      FORCE=true
      shift
      ;;
    --cleanup)
      CLEANUP=true
      shift
      ;;
    --all)
      ALL=true
      CLEANUP=true
      shift
      ;;
    --help)
      show_usage
      exit 0
      ;;
    *)
      shift
      ;;
  esac
done

# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}     🛑 Stack Shutdown                                        ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [[ "$FORCE" == true ]]; then
  force_stop
else
  stop_ralph_processes
  stop_node_processes
fi

if [[ "$CLEANUP" == true || "$ALL" == true ]]; then
  cleanup_worktrees
  cleanup_temp_files
fi

show_running_processes

echo ""
print_success "Stack shutdown complete"
echo ""
