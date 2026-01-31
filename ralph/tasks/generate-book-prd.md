---
name: generate-book-prd
description: Generate PRD for parallel book summary processing using Ralph + BookSummary integration
version: 1.0
author: AIOS Ralph-BookSummary Integration
mode: content
tags: [ralph, booksummary, prd, parallel, content]

arguments:
  - name: books
    description: List of books to process (title, author pairs)
    required: true
  - name: project_name
    description: Name for the PRD project
    required: false
    default: "Book Summaries"
  - name: audience
    description: Target audience for the summaries
    required: false
    default: "empreendedores"
  - name: max_concurrent
    description: Maximum parallel books
    required: false
    default: 3

pre_conditions:
  - BookSummary expansion pack is available
  - Book list is provided with title and author
  - outputs/books/ directory exists

post_conditions:
  - prd.json created in docs/ralph/{project-slug}/
  - progress.txt created with codebase patterns
  - Ready for ralph-parallel.sh execution

outputs:
  - docs/ralph/{project-slug}/prd.json
  - docs/ralph/{project-slug}/progress.txt

template_reference: expansion-packs/ralph/templates/prd-booksummary.json
---

# Task: Generate Book Summary PRD

## Goal

Generate a structured prd.json for processing multiple books in parallel using Ralph's content mode integrated with BookSummary's 12-phase pipeline.

---

## Input Format

User provides books as a list:

```
Livro 1: [Título] - [Autor]
Livro 2: [Título] - [Autor]
...
```

Or as comma-separated:
```
[Título 1], [Título 2], [Título 3]
```

---

## Process

### Step 1: Parse Book List

Extract from user input:
- Book title
- Author (if provided)
- Generate slug (lowercase, underscores, no accents)

### Step 2: Generate Slug

```python
def generate_slug(title):
    import unicodedata
    # Normalize and remove accents
    normalized = unicodedata.normalize('NFD', title)
    ascii_text = normalized.encode('ascii', 'ignore').decode('utf-8')
    # Lowercase, replace spaces with underscores
    slug = ascii_text.lower().replace(' ', '_')
    # Remove special characters except underscore
    slug = ''.join(c for c in slug if c.isalnum() or c == '_')
    # Truncate if needed
    return slug[:50]
```

### Step 3: Determine Concurrency

| Books | maxConcurrent | batchSize |
|-------|---------------|-----------|
| 1-3   | 3             | 3         |
| 4-6   | 4             | 4         |
| 7-10  | 5             | 5         |
| 11+   | 6             | 6         |

### Step 4: Generate Stories

For each book, create 3 stories:

1. **Research Story** (priority 1, no dependencies)
   - Phases: 0-2 (web-research, context-critic, data-enricher)
   - Can run in parallel with other books' Research

2. **Processing Story** (priority 2, depends on Research)
   - Phases: 3-8 (brutal-extractor through action-designer)
   - Waits for same book's Research to complete

3. **Final Story** (priority 3, depends on Processing)
   - Phases: 9-11 (final-writer, quality-gate, scoring)
   - Generates final FREE and PREMIUM summaries

### Step 5: Create Directory Structure

```bash
mkdir -p docs/ralph/{project-slug}
```

### Step 6: Write prd.json

Use the template from `expansion-packs/ralph/templates/prd-booksummary.json`

### Step 7: Write progress.txt

Include:
- Project overview
- Codebase patterns (BookSummary task locations)
- Output structure pattern
- Quality requirements
- Empty session log ready for updates

---

## Output: prd.json Structure

```json
{
  "project": "{{project_name}}",
  "mode": "content",
  "branchName": "",
  "outputDir": "outputs/books",

  "parallelization": {
    "enabled": true,
    "maxConcurrent": {{max_concurrent}},
    "batchSize": {{batch_size}}
  },

  "context": {
    "pipeline": "expansion-packs/book-summary/",
    "sevenLaws": "expansion-packs/book-summary/data/seven-laws.md",
    "language": "pt-br",
    "audience": "{{audience}}"
  },

  "books": [
    {
      "id": "book-01",
      "title": "{{title}}",
      "author": "{{author}}",
      "slug": "{{slug}}"
    }
  ],

  "userStories": [
    // 3 stories per book (Research, Processing, Final)
  ]
}
```

---

## Story Templates

### Research Story

```json
{
  "id": "US-{{index}}",
  "title": "Research: {{book_title}}",
  "book": "{{book_id}}",
  "phases": ["0-web-research", "1-context-critic", "2-data-enricher"],
  "description": "Execute phases 0-2 for {{book_title}} by {{author}}",
  "acceptanceCriteria": [
    "Read and follow tasks/web-research.md - collect 10+ URLs",
    "Read and follow tasks/context-critic.md - generate critical context",
    "Read and follow tasks/data-enricher.md - enrich with external data",
    "Save outputs to outputs/books/{{slug}}/intermediate/"
  ],
  "outputFiles": [
    "outputs/books/{{slug}}/research/urls-to-fetch.json",
    "outputs/books/{{slug}}/intermediate/01-critical-context.md",
    "outputs/books/{{slug}}/intermediate/02-enrichment-data.md"
  ],
  "priority": 1,
  "passes": false,
  "dependencies": []
}
```

### Processing Story

```json
{
  "id": "US-{{index}}",
  "title": "Processing: {{book_title}}",
  "book": "{{book_id}}",
  "phases": ["3-brutal-extractor", "4-gap-analyzer", "5-surprise-curator", "6-logical-architect", "7-critical-editor", "8-action-designer"],
  "description": "Execute phases 3-8 for {{book_title}}",
  "acceptanceCriteria": [
    "Read outputs from Research story as context",
    "Read and follow tasks/brutal-extractor.md - extract 21 categories",
    "Read and follow tasks/gap-analyzer.md - 7-phase analysis",
    "Read and follow tasks/surprise-curator.md - curate insights",
    "Read and follow tasks/logical-architect.md - 8 sections",
    "Read and follow tasks/critical-editor.md - 5 commentary types",
    "Read and follow tasks/action-designer.md - OUTPUT + INSIGHT balance"
  ],
  "outputFiles": [
    "outputs/books/{{slug}}/intermediate/03-raw-extraction.md",
    "outputs/books/{{slug}}/intermediate/04-gap-analysis.md",
    "outputs/books/{{slug}}/intermediate/05-curated-insights.md",
    "outputs/books/{{slug}}/intermediate/06-architecture.md",
    "outputs/books/{{slug}}/intermediate/07-editorial-commentary.md",
    "outputs/books/{{slug}}/intermediate/08-action-design.md"
  ],
  "priority": 2,
  "passes": false,
  "dependencies": ["{{research_story_id}}"]
}
```

### Final Story

```json
{
  "id": "US-{{index}}",
  "title": "Final: {{book_title}}",
  "book": "{{book_id}}",
  "phases": ["9-final-writer", "10-quality-gate", "11-scoring"],
  "description": "Execute phases 9-11 - generate final summaries",
  "acceptanceCriteria": [
    "Read all intermediate outputs",
    "Read and follow tasks/final-writer.md - generate FREE and PREMIUM",
    "Include 10 viral quotes section",
    "Read and follow tasks/quality-gate.md - pass all 9 gates",
    "Read and follow tasks/scoring.md - target >= 95"
  ],
  "outputFiles": [
    "outputs/books/{{slug}}/{{slug}}-free.md",
    "outputs/books/{{slug}}/{{slug}}-premium.md",
    "outputs/books/{{slug}}/scoring-report.md"
  ],
  "priority": 3,
  "passes": false,
  "dependencies": ["{{processing_story_id}}"]
}
```

---

## Execution Command

After PRD is generated:

```bash
./expansion-packs/ralph/scripts/ralph-parallel.sh docs/ralph/{project-slug} {max_concurrent}
```

---

## Example

**Input:**
```
Atomic Habits - James Clear
Deep Work - Cal Newport
The 4-Hour Workweek - Tim Ferriss
```

**Generated:**
- `docs/ralph/productivity-books/prd.json` (9 stories)
- `docs/ralph/productivity-books/progress.txt`

**Execution:**
```bash
./expansion-packs/ralph/scripts/ralph-parallel.sh docs/ralph/productivity-books 3
```

**Result:**
- 3 books processed in parallel
- Each book: Research → Processing → Final (sequential within book)
- All outputs in `outputs/books/{slug}/`

---

## Quality Requirements

From BookSummary pipeline:

- **Score Target:** >= 95
- **Quality Gates:** 9 gates must pass
- **Viral Quotes:** 10 per book
- **Auto-Correction:** Max 2 iterations if score < 95
- **Language:** Portuguese (PT-BR)

---

## Related Files

- Template: `expansion-packs/ralph/templates/prd-booksummary.json`
- BookSummary tasks: `expansion-packs/book-summary/tasks/`
- Seven Laws: `expansion-packs/book-summary/data/seven-laws.md`
- Ralph parallel script: `expansion-packs/ralph/scripts/ralph-parallel.sh`

---

*Created: 2026-01-17*
*Integration: Ralph v2.7 + BookSummary v2.4*
