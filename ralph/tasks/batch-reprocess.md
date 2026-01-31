---
name: batch-reprocess
description: Reprocess books from batch-to-reprocess.yaml - generates 1 PRD per book
version: 1.0
author: AIOS Ralph
mode: content
tags: [ralph, booksummary, batch, reprocess, automated]

trigger: "*batch-reprocess"

input_file: outputs/books/batch-to-reprocess.yaml
output_dir: docs/ralph/books/

elicit: false
---

# Task: Batch Reprocess Books

## Overview

This task reads `outputs/books/batch-to-reprocess.yaml` and generates **1 PRD per book** with 8 stories each, following the BookSummary pipeline.

**NO QUESTIONS ASKED.** Just execute.

---

## Execution Steps

### Step 1: Read Batch File

```bash
# File location
outputs/books/batch-to-reprocess.yaml
```

Read the `queue` section which contains all slugs to reprocess.

### Step 2: For Each Slug, Generate PRD

For each slug in the queue:

1. **Create directory:** `docs/ralph/books/{slug}/`
2. **Generate prd.json** with 8 stories (template below)
3. **Generate progress.txt** (template below)

### Step 3: Report Summary

After generating all PRDs, output:
- Total PRDs generated
- Location: `docs/ralph/books/`
- Command to execute

---

## PRD Template (prd.json)

```json
{
  "project": "Book Summary: {TITLE}",
  "mode": "content",
  "branchName": "",
  "outputDir": "outputs/books",
  "description": "Reprocess {SLUG} through 8-story BookSummary pipeline",

  "context": {
    "pipeline": "expansion-packs/book-summary/",
    "sevenLaws": "expansion-packs/book-summary/data/seven-laws.md",
    "language": "pt-br",
    "audience": "empreendedores"
  },

  "books": [
    {
      "id": "book-01",
      "title": "{TITLE}",
      "slug": "{SLUG}"
    }
  ],

  "userStories": [
    {
      "id": "US-01",
      "title": "Web Research: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["0.1-search-urls", "0.2-validate-urls", "0.3-compile-urls"],
      "description": "Collect URLs for {TITLE}",
      "acceptanceCriteria": [
        "Read and follow expansion-packs/book-summary/tasks/web-research.md",
        "Use WebSearch to find 10+ relevant URLs",
        "Generate outputs/books/{SLUG}/research/urls-to-fetch.json"
      ],
      "outputFiles": ["outputs/books/{SLUG}/research/urls-to-fetch.json"],
      "priority": 1,
      "passes": false,
      "dependencies": []
    },
    {
      "id": "US-02",
      "title": "ETL Fetch: {TITLE}",
      "book": "book-01",
      "type": "script",
      "command": "node expansion-packs/book-summary/scripts/fetch-research.js {SLUG}",
      "description": "Fetch content from collected URLs",
      "acceptanceCriteria": [
        "Execute fetch-research.js script",
        "Download content to research/sources/"
      ],
      "outputFiles": ["outputs/books/{SLUG}/research/fetch-results.json"],
      "priority": 2,
      "passes": false,
      "dependencies": ["US-01"]
    },
    {
      "id": "US-03",
      "title": "Context & Enrichment: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["1-context-critic", "2-data-enricher"],
      "description": "Generate critical context and enrich data",
      "acceptanceCriteria": [
        "Read all sources from research/sources/",
        "Read and follow expansion-packs/book-summary/tasks/context-critic.md",
        "Read and follow expansion-packs/book-summary/tasks/data-enricher.md",
        "Generate intermediate/01-critical-context.md",
        "Generate intermediate/02-enrichment-data.md"
      ],
      "outputFiles": [
        "outputs/books/{SLUG}/intermediate/01-critical-context.md",
        "outputs/books/{SLUG}/intermediate/02-enrichment-data.md"
      ],
      "priority": 3,
      "passes": false,
      "dependencies": ["US-02"]
    },
    {
      "id": "US-04",
      "title": "Brutal Extraction: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["3-brutal-extractor"],
      "description": "Extract 22 categories of content",
      "acceptanceCriteria": [
        "Read intermediate outputs from phases 1-2",
        "Read and follow expansion-packs/book-summary/tasks/brutal-extractor.md",
        "Extract all 22 categories including viral quotes",
        "Generate intermediate/03-raw-extraction.md"
      ],
      "outputFiles": ["outputs/books/{SLUG}/intermediate/03-raw-extraction.md"],
      "priority": 4,
      "passes": false,
      "dependencies": ["US-03"]
    },
    {
      "id": "US-05",
      "title": "DB Sync: {TITLE}",
      "book": "book-01",
      "type": "script",
      "command": "python3 expansion-packs/book-summary/scripts/populate-content-tools.py --book-slug {SLUG}",
      "description": "Sync extracted content to database",
      "acceptanceCriteria": [
        "Execute populate-content-tools.py script",
        "Populate content_tools table with artifacts"
      ],
      "outputFiles": [],
      "priority": 5,
      "passes": false,
      "dependencies": ["US-04"],
      "parallel": true,
      "note": "Runs in parallel, does not block US-06"
    },
    {
      "id": "US-06",
      "title": "Analysis Pipeline: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["3.5-multi-lens", "4-gap-analyzer", "5-surprise-curator", "6-logical-architect", "7-critical-editor", "8-action-designer"],
      "description": "Execute analysis pipeline phases 3.5-8",
      "acceptanceCriteria": [
        "Read intermediate/03-raw-extraction.md",
        "Read and follow expansion-packs/book-summary/tasks/multi-lens-analyzer.md",
        "Read and follow expansion-packs/book-summary/tasks/gap-analyzer.md",
        "Read and follow expansion-packs/book-summary/tasks/surprise-curator.md",
        "Read and follow expansion-packs/book-summary/tasks/logical-architect.md",
        "Read and follow expansion-packs/book-summary/tasks/critical-editor.md",
        "Read and follow expansion-packs/book-summary/tasks/action-designer.md",
        "Generate all 6 intermediate outputs"
      ],
      "outputFiles": [
        "outputs/books/{SLUG}/intermediate/03.5-multi-lens-analysis.md",
        "outputs/books/{SLUG}/intermediate/04-gap-analysis.md",
        "outputs/books/{SLUG}/intermediate/05-curated-insights.md",
        "outputs/books/{SLUG}/intermediate/06-architecture.md",
        "outputs/books/{SLUG}/intermediate/07-editorial-commentary.md",
        "outputs/books/{SLUG}/intermediate/08-action-design.md"
      ],
      "priority": 6,
      "passes": false,
      "dependencies": ["US-04"],
      "note": "Does NOT depend on US-05"
    },
    {
      "id": "US-07",
      "title": "Final Writer: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["9-final-writer"],
      "description": "Generate premium summary",
      "acceptanceCriteria": [
        "Read all intermediate outputs from phases 1-8",
        "Read and follow expansion-packs/book-summary/tasks/final-writer.md",
        "Include PARTE VII.10: 10 Viral Quotes",
        "Save to outputs/books/{SLUG}/{SLUG}.md"
      ],
      "outputFiles": ["outputs/books/{SLUG}/{SLUG}.md"],
      "priority": 7,
      "passes": false,
      "dependencies": ["US-06"]
    },
    {
      "id": "US-08",
      "title": "Quality & Scoring: {TITLE}",
      "book": "book-01",
      "type": "llm",
      "phases": ["10-quality-gate", "11-scoring"],
      "description": "Validate quality and score summary",
      "acceptanceCriteria": [
        "Read final summary {SLUG}.md",
        "Read and follow expansion-packs/book-summary/tasks/quality-gate.md",
        "Read and follow expansion-packs/book-summary/tasks/scoring.md",
        "Target score >= 95 (max 2 iterations if lower)",
        "Generate scoring-report.md"
      ],
      "outputFiles": [
        "outputs/books/{SLUG}/intermediate/10-quality-gate.md",
        "outputs/books/{SLUG}/scoring-report.md"
      ],
      "priority": 8,
      "passes": false,
      "dependencies": ["US-07"]
    }
  ]
}
```

---

## Progress Template (progress.txt)

```markdown
# Ralph Progress Log - BookSummary Reprocess

**Project:** Book Summary: {TITLE}
**Slug:** {SLUG}
**Started:** {DATE}
**Status:** Pending

---

## Pipeline Reference

| Story | Phases | Type | Task Files |
|-------|--------|------|------------|
| US-01 | 0.1-0.3 | LLM | web-research.md |
| US-02 | 0.4-0.5 | SCRIPT | fetch-research.js |
| US-03 | 1-2 | LLM | context-critic.md, data-enricher.md |
| US-04 | 3 | LLM | brutal-extractor.md |
| US-05 | 3.post | SCRIPT | populate-content-tools.py |
| US-06 | 3.5-8 | LLM | multi-lens → action-designer |
| US-07 | 9 | LLM | final-writer.md |
| US-08 | 10-11 | LLM | quality-gate.md, scoring.md |

---

## Output Structure

```
outputs/books/{SLUG}/
├── {SLUG}.md                    # Final summary
├── scoring-report.md            # Quality score
├── research/
│   ├── urls-to-fetch.json
│   ├── fetch-results.json
│   └── sources/*.md
└── intermediate/
    ├── 01-critical-context.md
    ├── 02-enrichment-data.md
    ├── 03-raw-extraction.md
    ├── 03.5-multi-lens-analysis.md
    ├── 04-gap-analysis.md
    ├── 05-curated-insights.md
    ├── 06-architecture.md
    ├── 07-editorial-commentary.md
    ├── 08-action-design.md
    └── 10-quality-gate.md
```

---

## Quality Requirements

- **Score Target:** >= 95
- **Quality Gates:** 9 must pass
- **Viral Quotes:** 10 required
- **Auto-correction:** Max 2 iterations

---

## Session Log

> Append entries here after each story.

---
```

---

## Execution Command (After PRDs Generated)

```bash
# Process all books sequentially
for dir in docs/ralph/books/*/; do
  ./expansion-packs/ralph/scripts/ralph.sh "$dir"
done

# Or process specific book
./expansion-packs/ralph/scripts/ralph.sh docs/ralph/books/{SLUG}
```

---

## Title Resolution

For slugs without explicit title, derive from slug:
- `atomic_habits` → "Atomic Habits"
- `deep_work` → "Deep Work"
- `o_poder_do_habito` → "O Poder do Hábito"

Pattern: Replace underscores with spaces, title case.

---

## Batch Categories (from batch-to-reprocess.yaml)

| Category | Count | Priority |
|----------|-------|----------|
| score_baixo (<50) | 7 | High |
| sem_score | 16 | Medium |
| sem_report | 93 | Normal |
| **Total** | **116** | |

---

*Task: batch-reprocess v1.0*
*Integration: Ralph v2.8 + BookSummary v2.4*
