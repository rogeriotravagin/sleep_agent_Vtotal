#!/bin/bash
#
# Ralph Category 22 Reprocessor
# Reprocess 68 books to extract cognitive artifacts (Category 22)
#
# Usage:
#   ./expansion-packs/ralph/scripts/ralph-category22-reprocess.sh [--dry-run] [--max N] [--concurrency N]
#

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PRD_FILE="docs/ralph/reprocess-category22/prd.json"
SCRIPT="expansion-packs/book-summary/scripts/batch-reprocess-extraction.py"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🔄 Ralph Category 22 Reprocessor                            ║"
echo "║  Reprocess books missing cognitive artifacts                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if PRD exists
if [ ! -f "$PRD_FILE" ]; then
    echo -e "${RED}❌ PRD file not found: $PRD_FILE${NC}"
    exit 1
fi

# Check if script exists
if [ ! -f "$SCRIPT" ]; then
    echo -e "${RED}❌ Script not found: $SCRIPT${NC}"
    exit 1
fi

# Load environment
if [ -f ".env" ]; then
    source .env
fi

# Check Gemini API key
if [ -z "$GEMINI_API_KEY" ] && [ -z "$GOOGLE_API_KEY" ]; then
    echo -e "${RED}❌ GEMINI_API_KEY or GOOGLE_API_KEY not set${NC}"
    echo "   Set in .env or export before running"
    exit 1
fi

# Count books
BOOK_COUNT=$(jq '.books | length' "$PRD_FILE")
echo -e "${GREEN}📚 Books to process: $BOOK_COUNT${NC}"

# Pass all arguments to Python script
echo -e "${YELLOW}🚀 Starting batch processing...${NC}"
echo ""

python3 "$SCRIPT" --prd "$PRD_FILE" "$@"

# After processing, run populate-content-tools
if [[ ! "$*" == *"--dry-run"* ]]; then
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}📊 Running populate-content-tools --all --auto-create${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    python3 expansion-packs/book-summary/scripts/populate-content-tools.py --all --auto-create
fi

echo ""
echo -e "${GREEN}✅ Complete!${NC}"
