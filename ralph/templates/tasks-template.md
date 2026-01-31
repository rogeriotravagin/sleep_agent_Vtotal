# Tasks: [Feature Name]

**Based on:** `prd-[feature-name].md`
**Branch:** `feature/[feature-name]`
**Created:** [Date]

---

## Relevant Files

> List all files that will be created or modified.

| File | Purpose | Action |
|------|---------|--------|
| `path/to/component.tsx` | Main component for this feature | Create |
| `path/to/component.test.tsx` | Unit tests for component | Create |
| `path/to/api.ts` | API route handler | Modify |
| `path/to/api.test.ts` | Unit tests for API | Create |
| `lib/utils/helpers.ts` | Utility functions | Modify |
| `lib/utils/helpers.test.ts` | Unit tests for helpers | Create |

### Notes

- Unit tests should be placed alongside code files (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in same directory)
- Run tests: `npx jest [optional/path/to/test]`
- Run all tests: `npm test`
- Run typecheck: `npm run typecheck`

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

**Update the file after completing each sub-task**, not just after completing an entire parent task.

---

## Tasks

- [ ] **0.0 Create feature branch**
  - [ ] 0.1 Create and checkout new branch: `git checkout -b feature/[feature-name]`

- [ ] **1.0 [Parent Task Title]**
  - [ ] 1.1 [Sub-task description]
  - [ ] 1.2 [Sub-task description]
  - [ ] 1.3 [Sub-task description]
  - [ ] 1.4 Write tests for above functionality
  - [ ] 1.5 Run typecheck: `npm run typecheck`
  - [ ] 1.6 Commit: `feat: [brief description]`

- [ ] **2.0 [Parent Task Title]**
  - [ ] 2.1 [Sub-task description]
  - [ ] 2.2 [Sub-task description]
  - [ ] 2.3 [Sub-task description]
  - [ ] 2.4 Write tests for above functionality
  - [ ] 2.5 Run typecheck: `npm run typecheck`
  - [ ] 2.6 Commit: `feat: [brief description]`

- [ ] **3.0 [Parent Task Title]**
  - [ ] 3.1 [Sub-task description]
  - [ ] 3.2 [Sub-task description]
  - [ ] 3.3 Write tests
  - [ ] 3.4 Run typecheck: `npm run typecheck`
  - [ ] 3.5 Commit: `feat: [brief description]`

- [ ] **4.0 Integration & Testing**
  - [ ] 4.1 Run full test suite: `npm test`
  - [ ] 4.2 Run typecheck: `npm run typecheck`
  - [ ] 4.3 Run linter: `npm run lint`
  - [ ] 4.4 Manual testing / browser verification
  - [ ] 4.5 Verify all acceptance criteria from PRD

- [ ] **5.0 Finalize**
  - [ ] 5.1 Update documentation if needed
  - [ ] 5.2 Create pull request
  - [ ] 5.3 Request code review

---

## Progress Tracking

| Task | Status | Notes |
|------|--------|-------|
| 0.0 Create branch | ⬜ Not started | |
| 1.0 [Task 1] | ⬜ Not started | |
| 2.0 [Task 2] | ⬜ Not started | |
| 3.0 [Task 3] | ⬜ Not started | |
| 4.0 Integration | ⬜ Not started | |
| 5.0 Finalize | ⬜ Not started | |

**Legend:** ⬜ Not started | 🔄 In progress | ✅ Complete

---

## Learnings / Gotchas

> Document any issues encountered and solutions found.

- [Issue encountered and solution]
- [Important consideration for future]
- [Pattern discovered]

---

## For Ralph (Optional Conversion)

If you want to run this with Ralph autonomous loop:

### 1. Convert tasks to prd.json

Each parent task becomes a user story:

```json
{
  "project": "[Feature Name]",
  "branchName": "ralph/[feature-name]",
  "userStories": [
    {
      "id": "US-001",
      "title": "[Task 1.0 title]",
      "acceptanceCriteria": ["subtask 1.1", "subtask 1.2", "typecheck passes"],
      "priority": 1,
      "passes": false
    }
  ]
}
```

### 2. Run Ralph

```bash
/ralph-loop "Read prd.json, implement highest priority story with passes=false, run typecheck, commit, mark done. Output <promise>COMPLETE</promise> when all pass." --max-iterations 30 --completion-promise 'COMPLETE'
```

---

*Generated from PRD: prd-[feature-name].md*
*Status: Not Started | In Progress | Complete*
