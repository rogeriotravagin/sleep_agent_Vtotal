#!/bin/bash
# Stack Sync Script
# Synchronizes states between AIOS, Auto-Claude, and Ralph

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

sync_aios_stories() {
  print_step "Scanning AIOS stories..."

  local stories_dir="$PROJECT_ROOT/aios-core"
  local count=0
  local approved=0

  while IFS= read -r story; do
    if [[ -n "$story" ]]; then
      count=$((count + 1))

      # Check status
      if grep -q "status: Approved" "$story" 2>/dev/null; then
        approved=$((approved + 1))
        echo "    📋 $(basename "$story") [Approved]"
      elif grep -q "status: Ready" "$story" 2>/dev/null; then
        echo "    📝 $(basename "$story") [Ready]"
      elif grep -q "status: Done" "$story" 2>/dev/null; then
        echo "    ✅ $(basename "$story") [Done]"
      fi
    fi
  done < <(find "$stories_dir" -name "*.story.md" -type f 2>/dev/null)

  print_success "Found $count stories ($approved approved for execution)"
}

sync_autoclaude_specs() {
  print_step "Scanning Auto-Claude specs..."

  local specs_dir="$PROJECT_ROOT/.auto-claude/specs"

  if [[ ! -d "$specs_dir" ]]; then
    print_warn "Specs directory not found"
    return
  fi

  local count=0
  local completed=0

  for spec_dir in "$specs_dir"/*/; do
    if [[ -d "$spec_dir" ]]; then
      count=$((count + 1))
      local name=$(basename "$spec_dir")

      # Check for completion markers
      if [[ -f "$spec_dir/qa_report.md" ]]; then
        completed=$((completed + 1))
        echo "    ✅ $name [QA Complete]"
      elif [[ -f "$spec_dir/implementation_plan.json" ]]; then
        echo "    🔨 $name [In Progress]"
      else
        echo "    📋 $name [Pending]"
      fi
    fi
  done

  print_success "Found $count specs ($completed completed)"
}

sync_ralph_projects() {
  print_step "Scanning Ralph projects..."

  local projects_dir="$PROJECT_ROOT/ralph/tasks"

  if [[ ! -d "$projects_dir" ]]; then
    projects_dir="$PROJECT_ROOT/.auto-claude/worktrees"
  fi

  if [[ ! -d "$projects_dir" ]]; then
    print_warn "No Ralph projects found"
    return
  fi

  local count=0
  local completed=0

  while IFS= read -r prd; do
    if [[ -n "$prd" ]]; then
      count=$((count + 1))
      local dir=$(dirname "$prd")
      local name=$(jq -r '.project // "Unknown"' "$prd" 2>/dev/null)
      local total=$(jq -r '.userStories | length' "$prd" 2>/dev/null)
      local passed=$(jq -r '[.userStories[] | select(.passes == true)] | length' "$prd" 2>/dev/null)

      if [[ "$total" == "$passed" && "$total" -gt 0 ]]; then
        completed=$((completed + 1))
        echo "    ✅ $name [$passed/$total]"
      else
        echo "    🔄 $name [$passed/$total]"
      fi
    fi
  done < <(find "$projects_dir" -name "prd.json" -type f 2>/dev/null)

  print_success "Found $count projects ($completed completed)"
}

sync_worktrees() {
  print_step "Syncing Git worktrees..."

  cd "$PROJECT_ROOT"

  # List worktrees
  local wt_list=$(git worktree list 2>/dev/null)
  local count=$(echo "$wt_list" | wc -l)

  echo "$wt_list" | while read -r line; do
    if [[ -n "$line" ]]; then
      local path=$(echo "$line" | awk '{print $1}')
      local branch=$(echo "$line" | awk '{print $3}' | tr -d '[]')

      if [[ "$path" == *"auto-claude"* || "$path" == *"worktree"* ]]; then
        echo "    📁 $branch → $(basename "$path")"
      fi
    fi
  done

  print_success "Active worktrees: $count"

  # Prune stale worktrees
  git worktree prune 2>/dev/null || true
}

create_sync_report() {
  print_step "Creating sync report..."

  local report_file="$STACK_DIR/logs/sync-$(date +%Y%m%d-%H%M%S).log"

  mkdir -p "$(dirname "$report_file")"

  {
    echo "Stack Sync Report"
    echo "Generated: $(date)"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    echo "AIOS Stories:"
    find "$PROJECT_ROOT/aios-core" -name "*.story.md" -type f 2>/dev/null | while read -r f; do
      local status=$(grep -m1 "^status:" "$f" 2>/dev/null | cut -d: -f2 | xargs)
      echo "  - $(basename "$f"): $status"
    done
    echo ""
    echo "Auto-Claude Specs:"
    ls -1 "$PROJECT_ROOT/.auto-claude/specs" 2>/dev/null || echo "  (none)"
    echo ""
    echo "Git Worktrees:"
    git -C "$PROJECT_ROOT" worktree list 2>/dev/null
    echo ""
  } > "$report_file"

  print_success "Report saved: $report_file"
}

show_usage() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --aios         Sync only AIOS stories"
  echo "  --autoclaude   Sync only Auto-Claude specs"
  echo "  --ralph        Sync only Ralph projects"
  echo "  --worktrees    Sync only Git worktrees"
  echo "  --report       Generate sync report"
  echo "  --all          Sync everything (default)"
  echo "  --help         Show this help"
}

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

SYNC_AIOS=false
SYNC_AC=false
SYNC_RALPH=false
SYNC_WT=false
REPORT=false
ALL=true

while [[ $# -gt 0 ]]; do
  case $1 in
    --aios)
      SYNC_AIOS=true
      ALL=false
      shift
      ;;
    --autoclaude)
      SYNC_AC=true
      ALL=false
      shift
      ;;
    --ralph)
      SYNC_RALPH=true
      ALL=false
      shift
      ;;
    --worktrees)
      SYNC_WT=true
      ALL=false
      shift
      ;;
    --report)
      REPORT=true
      shift
      ;;
    --all)
      ALL=true
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
echo -e "${BLUE}║${NC}     🔄 Stack Synchronization                                 ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [[ "$ALL" == true ]]; then
  SYNC_AIOS=true
  SYNC_AC=true
  SYNC_RALPH=true
  SYNC_WT=true
fi

[[ "$SYNC_AIOS" == true ]] && sync_aios_stories
[[ "$SYNC_AC" == true ]] && sync_autoclaude_specs
[[ "$SYNC_RALPH" == true ]] && sync_ralph_projects
[[ "$SYNC_WT" == true ]] && sync_worktrees
[[ "$REPORT" == true ]] && create_sync_report

echo ""
print_success "Synchronization complete"
echo ""
