# Ralph Agent Instructions - BookSummary Pipeline

> **Modo:** Book Summary Generation
> **Pipeline:** BookSummary 12-phase (0-11)
> **Version:** v2.4 + Ralph v2.8

## ⛔ CRITICAL RULES

1. **NO GIT OPERATIONS** - Do NOT use git add, git commit, git push
2. **READ TASK FILES** - Always read the task file before executing
3. **FOLLOW ACCEPTANCE CRITERIA** - Each story has specific criteria
4. **OUTPUT TO CORRECT PATHS** - All outputs go to outputs/books/{slug}/
5. **USE WEBSEARCH** - Use native WebSearch tool, NOT mcp__exa__*

## Project Context

- **PRD_FILE**: Contains all stories and their acceptance criteria
- **OUTPUT_DIR**: outputs/books
- **TASKS_DIR**: expansion-packs/book-summary/tasks/

---

## Your Current Assignment

You are executing **story ${CURRENT_STORY_ID}: ${CURRENT_STORY_TITLE}**

### Step 1: Read the PRD
```bash
cat ${PRD_FILE}
```

Find your story by ID and read:
- `acceptanceCriteria` - What you must accomplish
- `outputFiles` - Files you must create
- `dependencies` - Previous outputs to read first

### Step 2: Read Required Task Files

Each acceptance criterion references a task file. Read them:
```
expansion-packs/book-summary/tasks/{task-name}.md
```

**IMPORTANT:** The task file contains the FULL instructions. Follow them exactly.

### Step 3: Read Previous Outputs (if any)

Check your story's dependencies and read their outputs:
- `outputs/books/{slug}/research/` - Web research results
- `outputs/books/{slug}/intermediate/` - Pipeline phase outputs

### Step 4: Execute the Story

Follow the task file instructions exactly. Create all required outputs.

### Step 5: Validate

Before finishing, verify:
- [ ] All outputFiles exist
- [ ] Files have substantial content (not empty)
- [ ] Format matches expected structure

---

## BookSummary Pipeline Reference

### 8-Story Structure

| Story | Phases | Description |
|-------|--------|-------------|
| S1 | 0.1-0.3 | Web Research - Collect URLs |
| S2 | 0.4-0.5 | ETL Fetch (SCRIPT - skipped by Claude) |
| S3 | 1-2 | Context Critic + Data Enricher |
| S4 | 3 | Brutal Extraction (22 categories) |
| S5 | 3.post | DB Sync (SCRIPT - skipped by Claude) |
| S6 | 3.5-8 | Multi-Lens + Gap + Surprise + Architect + Editor + Action |
| S7 | 9 | Final Writer (premium summary) |
| S8 | 10-11 | Quality Gate + Scoring |

### Output Structure

```
outputs/books/{slug}/
├── {slug}.md               # Final summary (S7)
├── metadata.yaml           # Book metadata
├── scoring-report.md       # Quality report (S8)
├── research/
│   ├── urls-to-fetch.json  # S1 output
│   ├── fetch-results.json  # S2 output (script)
│   └── sources/            # S2 output (script)
└── intermediate/
    ├── 01-critical-context.md      # S3
    ├── 02-enrichment-data.md       # S3
    ├── 03-raw-extraction.md        # S4
    ├── 03.5-multi-lens-analysis.md # S6
    ├── 04-gap-analysis.md          # S6
    ├── 05-curated-insights.md      # S6
    ├── 06-architecture.md          # S6
    ├── 07-editorial-commentary.md  # S6
    ├── 08-action-design.md         # S6
    └── 10-quality-gate.md          # S8
```

---

## Quality Requirements

### Score Target
- **Minimum:** 95/100
- **Auto-correction:** Max 2 iterations if < 95

### Quality Gates (9 total)
1. Structure Gate - All mandatory sections present
2. Content Gate - Meets minimum requirements per section
3. Insight Gate - Non-obvious insights included
4. Mechanism Gate - Cognitive mechanisms explained (≥2)
5. Personalization Gate - Profile selection included (≥1)
6. Comparison Gate - Practical comparisons (≥2)
7. Action Gate - Exercises have OUTPUT + INSIGHT balance
8. Editorial Gate - Commentary adds value beyond author
9. Viral Quotes Gate - 10 quotes meeting quality tests

### Seven Laws of Book Summaries

```yaml
1: "Reorganização > Fidelidade — Estrutura otimizada para aprendizado"
2: "Insight ≠ Informação — Só o que surpreende sobrevive"
3: "Todo Conceito Precisa de Fricção — Limitações explícitas"
4: "Aplicação Não É 'Dica' — Exercícios específicos e mensuráveis"
5: "Comentário Editorial É Obrigatório — Valor além do autor"
6: "Densidade > Extensão — Cada frase justifica existência"
7: "Leitura em Camadas — Funciona em 3 modos de consumo"
```

---

## Task File Locations

All task files are in `expansion-packs/book-summary/tasks/`:

| Task | File |
|------|------|
| Web Research | `web-research.md` |
| Context Critic | `context-critic.md` |
| Data Enricher | `data-enricher.md` |
| Brutal Extractor | `brutal-extractor.md` |
| Multi-Lens Analyzer | `multi-lens-analyzer.md` |
| Gap Analyzer | `gap-analyzer.md` |
| Surprise Curator | `surprise-curator.md` |
| Logical Architect | `logical-architect.md` |
| Critical Editor | `critical-editor.md` |
| Action Designer | `action-designer.md` |
| Final Writer | `final-writer.md` |
| Quote Curator | `quote-curator.md` (reference) |
| Quality Gate | `quality-gate.md` |
| Scoring | `scoring.md` |

---

## Common Gotchas

### Web Research (S1)
- Use WebSearch native tool, NOT mcp__exa__*
- Collect 10+ URLs minimum
- Include YouTube videos, blogs, articles, interviews

### Context & Enrichment (S3)
- Read ALL sources from research/sources/
- Don't skip sources based on filename
- Context-critic: 5 phases
- Data-enricher: 7 phases

### Brutal Extraction (S4)
- 22 categories (including viral quotes)
- Apply protection markers to valuable content
- Don't skip categories even if seemingly empty

### Analysis Pipeline (S6)
- Largest story - 6 tasks in sequence
- Multi-lens analysis is MANDATORY
- Read previous outputs before each task
- Generate all 6 intermediate outputs

### Final Writer (S7)
- Include ALL mandatory sections
- Viral quotes section is PARTE VII.10 (10 quotes)
- Follow Seven Laws strictly
- Reference quote-curator.md for quote format

### Quality & Scoring (S8)
- All 9 gates must pass
- If score < 95, iterate (max 2x)
- Document issues clearly for iteration
- Generate both quality-gate.md and scoring-report.md

---

## Stop Condition

When your story is complete and all outputFiles exist:

```
<promise>STORY_COMPLETE:${CURRENT_STORY_ID}</promise>
```

---

## If Blocked

1. Document the blocker in the log
2. Check if required inputs exist
3. If missing inputs, story cannot complete
4. NEVER fake outputs or skip validation

---

## Language

- **Prompts/Queries:** English (better LLM performance)
- **Search Queries:** English (90% quality content)
- **Final Outputs:** Portuguese (PT-BR)
- **Technical Terms:** English with Portuguese explanation

---

*BookSummary Pipeline v2.4 + Ralph v2.8*
*8-Story Structure with Script Execution*
