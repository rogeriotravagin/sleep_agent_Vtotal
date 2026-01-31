# Task: Capture Session Learnings

```yaml
metadata:
  name: capture-learnings
  description: Capture patterns, decisions, and lessons from the current session
  version: 1.0
  author: Ralph Expansion Pack
  tags: [learning, compound, patterns, retrospective]
  estimated_duration: 5-10 min
  mandatory: true  # MUST run at end of every session

triggers:
  - "*capture-learnings"
  - "end of *start-loop"
  - "session complete"

inputs:
  required:
    - progress_path: Path to progress.md/txt file
    - prd_path: Path to prd.json file
  optional:
    - learnings_dir: Directory for learnings (default: expansion-packs/ralph/data/)
```

## Purpose

Ralph MUST capture learnings at the end of every session to compound knowledge over time. This is NOT optional - it's a core principle of the Ralph methodology.

## What to Capture

### 1. Patterns (Reusable approaches)
```yaml
pattern_template:
  name: "Pattern Name"
  context: "When this applies"
  pattern: "What to do"
  rationale: "Why it works"
  example: "Real example from this session"
```

### 2. Decisions (Choices made)
```yaml
decision_template:
  title: "Decision Title"
  context: "What situation required decision"
  decision: "What was decided"
  consequences: "Positive and negative outcomes"
  alternatives: "What else was considered"
```

### 3. Lessons (Things learned)
```yaml
lesson_template:
  title: "Lesson Title"
  situation: "What happened"
  action: "What was done"
  result: "What was the outcome"
  learning: "What to do differently"
  prevention: "How to avoid in future"
```

### 4. Improvements (Process enhancements)
```yaml
improvement_template:
  title: "Improvement Title"
  problem: "What inefficiency was noticed"
  proposal: "Suggested improvement"
  implementation: "How to implement"
  priority: "high | medium | low"
```

## Workflow Steps

### Step 1: Review Session
```yaml
action: review_session
tasks:
  - Read progress.md/txt Session Log
  - Read prd.json notes fields
  - Identify any git commits made
  - Note any blockers or workarounds
```

### Step 2: Identify Patterns
```yaml
action: extract_patterns
questions:
  - "Did I reuse an approach that worked well?"
  - "Did I discover a technique worth documenting?"
  - "Did I find a codebase convention to follow?"
  - "Did I batch related stories? Why?"
minimum: 1  # At least 1 pattern per session
```

### Step 3: Document Decisions
```yaml
action: extract_decisions
questions:
  - "What architectural choices were made?"
  - "What trade-offs were considered?"
  - "What alternatives were rejected and why?"
minimum: 0  # Optional but encouraged
```

### Step 4: Capture Lessons
```yaml
action: extract_lessons
questions:
  - "What didn't work as expected?"
  - "What would I do differently?"
  - "What gotchas did I encounter?"
  - "What took longer than expected? Why?"
minimum: 1  # At least 1 lesson per session
```

### Step 5: Propose Improvements
```yaml
action: identify_improvements
questions:
  - "What could make Ralph more efficient?"
  - "What manual steps should be automated?"
  - "What validations are missing?"
  - "What would help the next session?"
minimum: 0  # Optional but encouraged
```

### Step 6: Write Learnings File
```yaml
action: write_learnings
location: expansion-packs/ralph/data/learnings-{date}-{project}.md
format: |
  # Ralph Learnings - {project} ({date})

  > Auto-captured at end of Ralph session

  ## Session Summary
  - Stories completed: X/Y
  - Commits: N
  - Duration: ~Xmin

  ## Patterns Discovered
  [Pattern entries...]

  ## Decisions Made
  [Decision entries...]

  ## Lessons Learned
  [Lesson entries...]

  ## Improvement Proposals
  [Improvement entries...]

  ---
  *Captured by: Ralph Autonomous Agent*
  *Session: {project}*
```

### Step 7: Update Progress File
```yaml
action: update_progress
location: progress.md → Codebase Patterns section
mode: APPEND
tasks:
  - Add new patterns to Codebase Patterns
  - Keep format consistent with existing entries
```

### Step 8: Commit Learnings
```yaml
action: commit_learnings
format: "docs: capture learnings from {project} session"
include:
  - learnings file
  - updated progress file
```

## Output

```markdown
## 📚 Session Learnings Captured

| Type | Count |
|------|-------|
| Patterns | N |
| Decisions | N |
| Lessons | N |
| Improvements | N |

**File:** `expansion-packs/ralph/data/learnings-{date}-{project}.md`

**Next steps:**
- [ ] Review improvement proposals
- [ ] Consider implementing high-priority improvements
- [ ] Share patterns with team if applicable
```

## Why This Matters

1. **Knowledge Compounds** - Each session builds on previous learnings
2. **Patterns Spread** - Good approaches get documented and reused
3. **Mistakes Don't Repeat** - Lessons prevent recurring issues
4. **Process Improves** - Ralph gets better over time
5. **Audit Trail** - History of decisions and rationale

---

**CRITICAL:** This task is NOT optional. Ralph MUST run this at the end of every `*start-loop` execution.
