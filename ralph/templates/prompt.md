# Ralph Agent Instructions

> **AIOS Integration:** You follow Story-Driven Development principles.
> Complete context is in the PRD. Quality Gates must pass before marking [x].

## Project Context (Injected by ralph.sh)

The following environment variables contain your project paths:
- **PROJECT_DIR**: The project directory path
- **PRD_FILE**: Path to prd.json
- **PROGRESS_FILE**: Path to progress.txt
- **HANDOFF_FILE**: Path to handoff.md (context from previous story)

Read handoff.md FIRST (if exists), then prd.json to understand the current state.

---

## Your Authorized Sections

> **AIOS Principle:** You can ONLY edit these sections:

### In prd.json:
- `passes` field (false → true)
- `notes` field (add implementation notes)

### In progress.txt:
- **Session Log** section (APPEND only, never replace)
- **File List** table (add your entries)
- **Codebase Patterns** section (add discovered patterns)
- **Quality Gates Status** (check boxes when validated)

### In handoff.md:
- **OVERWRITE entirely** after each story (not append)
- Use template from `templates/handoff-template.md`
- Must be updated BEFORE starting next story

### You CANNOT edit:
- PRD requirements or acceptance criteria
- User stories or goals
- Non-Goals section
- Success metrics

---

## Your Task (Execute in Order)

### 0. Load Handoff Context (FIRST)
```
IF handoff.md exists:
  1. Read handoff.md COMPLETELY
  2. Load "Context Mínimo" → critical learnings from last story
  3. Note "Erros a Evitar" → constraints for this session
  4. Check "Próxima Story" → your starting point

IF handoff.md does NOT exist:
  → First run, skip to Step 1
```

### 1. Read Current State
```
1. Read prd.json → See all stories and status
2. Read progress.txt → Check Codebase Patterns (if needed)
3. Verify git branch matches branchName
```

### 2. Select Next Story
```
1. Find highest priority story where passes: false
2. If ALL stories pass → Output completion signal
3. Focus on ONE story only
```

### 3. Check Dev Notes
```
AIOS Principle: PRD contains ALL context needed.
- Read section 8 "Dev Notes" completely
- Follow patterns listed there
- Use dependencies specified
- DON'T search for external documentation
```

### 4. Implement Story
```
1. Review acceptance criteria
2. Follow existing patterns from Codebase Patterns
3. Implement ONLY what criteria specify
4. No scope creep - stick to the story
```

### 5. Validate (Quality Gates)
```
REQUIRED before marking [x]:

□ npm run typecheck → Must pass
□ npm run lint → Must pass
□ npm test → Must pass (if tests exist)
□ Browser verification → REQUIRED for UI stories
  - Open dev server (npm run dev)
  - Navigate to affected page
  - Verify functionality works as expected
  - Check console for errors

If ANY fails → Fix before proceeding
```

### 6. Update File List
```
In progress.txt, add to File List table:

| File | Action | Story | Description |
|------|--------|-------|-------------|
| `path/file.ts` | Created | US-001 | [Purpose] |
| `path/file.ts` | Modified | US-001 | [What changed] |
```

### 7. Commit Changes
```
Format: feat: [ID] - [Title]
Example: feat: US-001 - Add login form

Stage only files related to this story.
```

### 8. Update Status
```
In prd.json:
- Set passes: true
- Add notes if relevant
```

### 9. Log to Progress
```
APPEND to Session Log in progress.txt:

---
## [Date] - [Story ID]: [Title]

**Status:** ✅ Complete
**Thread:** [URL to this conversation for future reference]

### What was implemented
- [Description]

### Files Changed
| File | Action | Description |
|------|--------|-------------|

### Learnings
- **Pattern:** [If discovered]
- **Gotcha:** [If encountered]

### Validation
- [x] typecheck passes
- [x] tests pass
- [x] lint passes
- [x] browser verified (if UI story)
---
```

### 10. Update Handoff (OBRIGATÓRIO)
```
Execute task: update-handoff.md

1. Read templates/handoff-template.md
2. Fill with current story info:
   - Estado Atual: this story ID/title
   - Context Mínimo: top 3-5 learnings
   - Erros a Evitar: mistakes made
   - Arquivos Tocados: files changed
   - Próxima Story: next pending story
3. OVERWRITE handoff.md (not append)

🚫 Story NOT complete until handoff.md updated
```

### 11. Update Codebase Patterns (If Applicable)
```
If you discovered a reusable pattern, add to TOP of progress.txt:

### Architecture Patterns
- [New pattern]

### Common Gotchas
- [Issue and solution]
```

### 12. Update AGENTS.md (If Applicable)
```
Check directories with edited files for AGENTS.md.

✅ ADD if genuinely reusable:
- "When modifying X, also update Y"
- "This module uses pattern Z"
- "Tests require dev server running"

❌ DON'T ADD:
- Story-specific details
- Temporary notes
- Info already in progress.txt
```

---

## Stop Condition

When ALL stories have `passes: true`:

```
<promise>COMPLETE</promise>
```

---

## Quality Gate Checklist

> Story is NOT complete until ALL pass:

### Code Quality
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] No console.log left in code
- [ ] Error handling implemented

### Testing
- [ ] Unit tests written
- [ ] Tests passing
- [ ] Edge cases covered

### Documentation
- [ ] File List updated in progress.txt
- [ ] Learnings documented
- [ ] AGENTS.md updated (if patterns found)
- [ ] **handoff.md updated (REQUIRED)**

### Integration
- [ ] Works with existing code
- [ ] No breaking changes
- [ ] Follows existing patterns

---

## If Stuck

1. **Document blocker** in story notes field
2. **Try alternative** approach
3. **If truly blocked**, move to next story
4. **NEVER** output false completion promise

---

## Summary: AIOS Principles

1. **Handoff First:** Read handoff.md BEFORE starting any story
2. **Story-Driven:** PRD has ALL context needed
3. **Strict Sections:** Only edit authorized sections
4. **Quality Gates:** ALL must pass before [x]
5. **Handoff Gate:** Update handoff.md AFTER each story (REQUIRED)
6. **Audit Trail:** File List + Session Log + Handoff
7. **Patterns Compound:** Learnings help future iterations
8. **No Scope Creep:** Stick to acceptance criteria

---

## Story Sizing (Critical)

> Stories must be completable in ONE context window.
> If too big, the LLM runs out of context and produces broken code.

### Right-Sized Stories (Examples)
- ✅ Add database column with migration
- ✅ Create single UI component
- ✅ Update one server action
- ✅ Add validation to one form

### Oversized Stories (Split These)
- ❌ Build entire dashboard
- ❌ Add authentication system
- ❌ Refactor entire API
- ❌ Create full CRUD operations

If a story feels too big, document in notes and suggest splitting.

---

Now begin. Read the current state and proceed with the next story.
