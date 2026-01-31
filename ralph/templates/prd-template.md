# PRD: [Feature Name]

> **AIOS Integration:** This PRD follows Story-Driven Development principles.
> The Dev Agent should find ALL context needed here - no external docs required.

**Epic:** [Epic Name/Number]
**Status:** Draft | In Review | Approved | In Progress | Complete
**Complexity:** P (Small) | M (Medium) | G (Large)
**Agent:** @dev (or @architect for design-heavy)

---

## 1. Introduction/Overview

**Problem Statement:**
[Clear description of the problem being solved. What pain point exists? Why does this matter?]

**Solution Summary:**
[Brief description of the proposed solution. How does this feature address the problem?]

---

## 2. Goals

- [ ] **Goal 1:** [Specific, measurable objective]
- [ ] **Goal 2:** [Specific, measurable objective]
- [ ] **Goal 3:** [Specific, measurable objective]

---

## 3. User Stories

### Story 1: [Title]
**As a** [user type],
**I want** [goal/desire],
**So that** [benefit/value].

**Acceptance Criteria:**
- [ ] [Specific, verifiable criterion]
- [ ] [Specific, verifiable criterion]
- [ ] typecheck passes

### Story 2: [Title]
**As a** [user type],
**I want** [goal/desire],
**So that** [benefit/value].

**Acceptance Criteria:**
- [ ] [Specific, verifiable criterion]
- [ ] typecheck passes

---

## 4. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | System must [capability] | High |
| FR-2 | System must [capability] | Medium |
| FR-3 | System must [capability] | Low |

---

## 5. Non-Goals (Out of Scope)

> Clearly state what this feature will NOT include. This prevents scope creep.

- ❌ [What this feature will NOT do]
- ❌ [Explicit boundary]
- ❌ [Future consideration, not now]

---

## 6. Design Considerations

### UI/UX Requirements
- [Visual requirement]
- [Interaction pattern]
- [Accessibility requirement]

### Mockups/References
- [Link or description]

---

## 7. Technical Considerations

### Constraints
- [Technical limitation]
- [Dependency]

### Suggestions
- [Recommended approach]

---

## 8. Dev Notes (CRITICAL - Complete Context Here)

> **AIOS Principle:** The developer should NEVER need to read external documentation.
> Put EVERYTHING needed to implement here.

### Relevant Architecture
```
[Paste relevant architecture snippets, data models, etc.]
[Source: docs/architecture/xyz.md#section-N]
```

### Existing Patterns to Follow
```typescript
// Example of existing pattern in codebase
// [Source: app/components/example.tsx]
```

### Dependencies
- [Library/package needed]
- [API endpoint to use]
- [Database table/column]

### Testing Standards
- Test file location: `[path]`
- Test command: `npm test [path]`
- Coverage requirement: [%]

### Environment Variables
```bash
# Required env vars
VAR_NAME=description
```

---

## 9. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| [Metric 1] | [Value] | [Method] |
| [Metric 2] | [Value] | [Method] |

---

## 10. Open Questions

- [ ] [Question needing clarification]
- [ ] [Decision to be made]

---

## 11. Quality Gates (Definition of Done)

> **AIOS Principle:** Story is only complete when ALL gates pass.

### Pre-Implementation
- [ ] PRD approved by stakeholder
- [ ] Technical approach validated
- [ ] Dependencies available

### Implementation
- [ ] All acceptance criteria met
- [ ] Code follows existing patterns
- [ ] No hardcoded values (use config/env)
- [ ] Error handling implemented

### Testing
- [ ] Unit tests written and passing
- [ ] Integration tests (if applicable)
- [ ] Manual testing completed
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

### Documentation
- [ ] Code comments where non-obvious
- [ ] README updated (if API changes)
- [ ] AGENTS.md updated (if patterns discovered)

---

## Dev Agent Record (Dev ONLY Section)

> **AIOS Principle:** This section is the audit trail. Only Dev updates this.

### File List

| File | Action | Description |
|------|--------|-------------|
| `path/to/file.ts` | Created | [Purpose] |
| `path/to/file.ts` | Modified | [What changed] |
| `path/to/file.ts` | Deleted | [Why removed] |

### Completion Notes
```
[What was accomplished]
[Any deviations from plan]
[Issues encountered and solutions]
```

### Change Log

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | @dev | Initial implementation |
| YYYY-MM-DD | @dev | Fixed [issue] |

---

*Created: [Date]*
*Last Updated: [Date]*
*Status: Draft*
