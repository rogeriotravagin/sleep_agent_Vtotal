#!/bin/bash
# Stack Status Script
# Shows status of all stack components

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$STACK_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ═══════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════

print_header() {
  echo ""
  echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}     📊 Stack Status Dashboard                                ${BLUE}║${NC}"
  echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

print_section() {
  echo -e "${CYAN}┌─────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${CYAN}│${NC} $1"
  echo -e "${CYAN}└─────────────────────────────────────────────────────────────┘${NC}"
}

status_ok() {
  echo -e "  ${GREEN}●${NC} $1"
}

status_warn() {
  echo -e "  ${YELLOW}●${NC} $1"
}

status_error() {
  echo -e "  ${RED}●${NC} $1"
}

check_aios() {
  print_section "AIOS Core"

  if [[ -d "$PROJECT_ROOT/aios-core" ]]; then
    status_ok "Directory exists: aios-core/"

    # Check for stories
    local story_count=$(find "$PROJECT_ROOT/aios-core" -name "*.story.md" 2>/dev/null | wc -l)
    if [[ $story_count -gt 0 ]]; then
      status_ok "Stories found: $story_count"
    else
      status_warn "No story files found"
    fi

    # Check core-config
    if [[ -f "$PROJECT_ROOT/aios-core/core-config.yaml" ]]; then
      status_ok "core-config.yaml present"
    else
      status_warn "core-config.yaml not found"
    fi
  else
    status_error "Directory not found"
  fi

  echo ""
}

check_autoclaude() {
  print_section "Auto-Claude"

  if [[ -d "$PROJECT_ROOT/.auto-claude" ]]; then
    status_ok "Directory exists: .auto-claude/"

    # Check backend
    if [[ -f "$PROJECT_ROOT/.auto-claude/apps/backend/run.py" ]]; then
      status_ok "Backend script present"
    else
      status_error "Backend script not found"
    fi

    # Check specs
    local spec_count=$(ls -1 "$PROJECT_ROOT/.auto-claude/specs" 2>/dev/null | wc -l)
    status_ok "Specs: $spec_count"

    # Check worktrees
    if [[ -d "$PROJECT_ROOT/.auto-claude/worktrees" ]]; then
      local wt_count=$(ls -1 "$PROJECT_ROOT/.auto-claude/worktrees" 2>/dev/null | wc -l)
      status_ok "Active worktrees: $wt_count"
    else
      status_warn "Worktrees directory not created"
    fi
  else
    status_error "Directory not found"
  fi

  echo ""
}

check_ralph() {
  print_section "Ralph"

  if [[ -d "$PROJECT_ROOT/ralph" ]]; then
    status_ok "Directory exists: ralph/"

    # Check main script
    if [[ -f "$PROJECT_ROOT/ralph/scripts/ralph.sh" ]]; then
      status_ok "ralph.sh script present"

      if [[ -x "$PROJECT_ROOT/ralph/scripts/ralph.sh" ]]; then
        status_ok "Script is executable"
      else
        status_warn "Script not executable (chmod +x needed)"
      fi
    else
      status_error "ralph.sh not found"
    fi

    # Check templates
    if [[ -f "$PROJECT_ROOT/ralph/templates/prd.json" ]]; then
      status_ok "PRD template present"
    else
      status_warn "PRD template not found"
    fi
  else
    status_error "Directory not found"
  fi

  echo ""
}

check_stack() {
  print_section "Stack Integration"

  if [[ -d "$STACK_DIR" ]]; then
    status_ok "Stack directory exists: .stack/"

    # Check config
    if [[ -f "$STACK_DIR/config/stack-config.yaml" ]]; then
      status_ok "Configuration file present"
    else
      status_error "Configuration file missing"
    fi

    # Check node_modules
    if [[ -d "$STACK_DIR/node_modules" ]]; then
      status_ok "Dependencies installed"
    else
      status_warn "Dependencies not installed (run npm install)"
    fi

    # Check TypeScript compilation
    if [[ -d "$STACK_DIR/dist" ]]; then
      status_ok "TypeScript compiled"
    else
      status_warn "Not compiled (run npm run build)"
    fi
  else
    status_error "Stack directory not found"
  fi

  echo ""
}

check_git() {
  print_section "Git Status"

  cd "$PROJECT_ROOT"

  # Current branch
  local branch=$(git branch --show-current 2>/dev/null)
  status_ok "Current branch: $branch"

  # Worktrees
  local wt_count=$(git worktree list 2>/dev/null | wc -l)
  status_ok "Git worktrees: $wt_count"

  # Uncommitted changes
  local changes=$(git status --porcelain 2>/dev/null | wc -l)
  if [[ $changes -eq 0 ]]; then
    status_ok "Working tree clean"
  else
    status_warn "Uncommitted changes: $changes files"
  fi

  echo ""
}

check_claude() {
  print_section "Claude CLI"

  if command -v claude &> /dev/null; then
    status_ok "Claude CLI installed"

    # Try to get version (may fail if not authenticated)
    local version=$(claude --version 2>/dev/null | head -1)
    if [[ -n "$version" ]]; then
      status_ok "Version: $version"
    fi
  else
    status_error "Claude CLI not found"
    echo "    Install: npm install -g @anthropic-ai/claude-cli"
  fi

  echo ""
}

show_summary() {
  print_section "Summary"

  local all_ok=true

  # Check each component
  [[ -d "$PROJECT_ROOT/aios-core" ]] && status_ok "AIOS Core: Ready" || { status_error "AIOS Core: Missing"; all_ok=false; }
  [[ -d "$PROJECT_ROOT/.auto-claude" ]] && status_ok "Auto-Claude: Ready" || { status_error "Auto-Claude: Missing"; all_ok=false; }
  [[ -d "$PROJECT_ROOT/ralph" ]] && status_ok "Ralph: Ready" || { status_error "Ralph: Missing"; all_ok=false; }
  [[ -f "$STACK_DIR/config/stack-config.yaml" ]] && status_ok "Stack Config: Ready" || { status_error "Stack Config: Missing"; all_ok=false; }
  command -v claude &> /dev/null && status_ok "Claude CLI: Ready" || { status_error "Claude CLI: Missing"; all_ok=false; }

  echo ""

  if [[ "$all_ok" == true ]]; then
    echo -e "  ${GREEN}✓ All systems operational${NC}"
    echo ""
    echo "  Run: ./stack-start.sh --story <path> to begin"
  else
    echo -e "  ${RED}✗ Some components need attention${NC}"
    echo ""
    echo "  Check the sections above for details"
  fi

  echo ""
}

# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

print_header

check_aios
check_autoclaude
check_ralph
check_stack
check_git
check_claude
show_summary
