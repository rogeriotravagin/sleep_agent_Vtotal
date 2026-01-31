#!/bin/bash
# Stack Start Script
# Starts the AIOS + Auto-Claude + Ralph pipeline

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$STACK_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════

print_header() {
  echo ""
  echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}     🚀 AIOS + Auto-Claude + Ralph Stack                      ${BLUE}║${NC}"
  echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

print_step() {
  echo -e "${YELLOW}→${NC} $1"
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

check_prerequisites() {
  print_step "Checking prerequisites..."

  local missing=0

  # Check Node.js
  if ! command -v node &> /dev/null; then
    print_error "Node.js not found"
    missing=1
  else
    print_success "Node.js $(node --version)"
  fi

  # Check Python
  if ! command -v python &> /dev/null; then
    print_error "Python not found"
    missing=1
  else
    print_success "Python $(python --version 2>&1 | cut -d' ' -f2)"
  fi

  # Check Claude CLI
  if ! command -v claude &> /dev/null; then
    print_error "Claude CLI not found"
    missing=1
  else
    print_success "Claude CLI available"
  fi

  # Check Git
  if ! command -v git &> /dev/null; then
    print_error "Git not found"
    missing=1
  else
    print_success "Git $(git --version | cut -d' ' -f3)"
  fi

  if [[ $missing -eq 1 ]]; then
    echo ""
    print_error "Missing prerequisites. Please install them first."
    exit 1
  fi

  echo ""
}

check_components() {
  print_step "Checking stack components..."

  local ready=0

  # Check AIOS Core
  if [[ -d "$PROJECT_ROOT/aios-core" ]]; then
    print_success "AIOS Core found"
  else
    print_error "AIOS Core not found at $PROJECT_ROOT/aios-core"
    ready=1
  fi

  # Check Auto-Claude
  if [[ -d "$PROJECT_ROOT/.auto-claude" ]]; then
    print_success "Auto-Claude found"
  else
    print_error "Auto-Claude not found at $PROJECT_ROOT/.auto-claude"
    ready=1
  fi

  # Check Ralph
  if [[ -d "$PROJECT_ROOT/ralph" ]]; then
    print_success "Ralph found"
  else
    print_error "Ralph not found at $PROJECT_ROOT/ralph"
    ready=1
  fi

  # Check stack config
  if [[ -f "$STACK_DIR/config/stack-config.yaml" ]]; then
    print_success "Stack config found"
  else
    print_error "Stack config not found"
    ready=1
  fi

  if [[ $ready -eq 1 ]]; then
    echo ""
    print_error "Some components are missing. Run installation first."
    exit 1
  fi

  echo ""
}

show_usage() {
  echo "Usage: $0 [OPTIONS] [STORY_PATH]"
  echo ""
  echo "Options:"
  echo "  --dry-run        Simulate execution without running Ralph"
  echo "  --story PATH     Path to AIOS story file to process"
  echo "  --batch DIR      Process all stories in directory"
  echo "  --parallel N     Run N stories in parallel (default: 1)"
  echo "  --max-iter N     Maximum Ralph iterations (default: 30)"
  echo "  --help           Show this help message"
  echo ""
  echo "Examples:"
  echo "  $0 --story docs/stories/1.1.story.md"
  echo "  $0 --batch docs/stories/ --parallel 3"
  echo "  $0 --dry-run --story docs/stories/1.1.story.md"
}

run_pipeline() {
  local story_path="$1"
  local dry_run="$2"
  local max_iter="$3"

  print_step "Processing story: $story_path"

  # Run the TypeScript pipeline
  cd "$STACK_DIR"

  local args="--story \"$story_path\" --max-iter $max_iter"

  if [[ "$dry_run" == "true" ]]; then
    args="$args --dry-run"
  fi

  # Execute pipeline via tsx
  npx tsx cli/run-pipeline.ts $args

  local exit_code=$?

  if [[ $exit_code -eq 0 ]]; then
    print_success "Story processed successfully"
  else
    print_error "Story processing failed (exit code: $exit_code)"
  fi

  return $exit_code
}

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

DRY_RUN="false"
STORY_PATH=""
BATCH_DIR=""
PARALLEL=1
MAX_ITER=30

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN="true"
      shift
      ;;
    --story)
      STORY_PATH="$2"
      shift 2
      ;;
    --batch)
      BATCH_DIR="$2"
      shift 2
      ;;
    --parallel)
      PARALLEL="$2"
      shift 2
      ;;
    --max-iter)
      MAX_ITER="$2"
      shift 2
      ;;
    --help)
      show_usage
      exit 0
      ;;
    *)
      if [[ -z "$STORY_PATH" && -f "$1" ]]; then
        STORY_PATH="$1"
      fi
      shift
      ;;
  esac
done

# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

print_header
check_prerequisites
check_components

if [[ -n "$BATCH_DIR" ]]; then
  print_step "Batch mode: Processing stories in $BATCH_DIR"

  stories=$(find "$BATCH_DIR" -name "*.story.md" -type f 2>/dev/null)
  count=$(echo "$stories" | wc -l)

  echo "Found $count stories to process"
  echo ""

  for story in $stories; do
    run_pipeline "$story" "$DRY_RUN" "$MAX_ITER"
  done

elif [[ -n "$STORY_PATH" ]]; then
  run_pipeline "$STORY_PATH" "$DRY_RUN" "$MAX_ITER"

else
  echo "No story specified. Enter interactive mode."
  echo ""

  # Show available stories
  print_step "Available stories:"
  find "$PROJECT_ROOT" -name "*.story.md" -not -path "*/node_modules/*" 2>/dev/null | head -10

  echo ""
  echo "Run with --story PATH to process a specific story"
  echo "Run with --help for more options"
fi

echo ""
print_success "Stack operation complete"
