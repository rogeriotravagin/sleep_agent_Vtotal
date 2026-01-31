# Quality Gates Checklist

```yaml
metadata:
  name: quality-gates
  description: AIOS Quality Gates - Story not complete until ALL pass
  version: 2.0
  usage: Run before marking any story as passes=true
```

---

## MANDATORY: Run ALL checks before marking [x]

> **AIOS Principle:** A story is NOT complete until ALL gates pass.
> Do NOT mark `passes: true` if ANY check fails.

---

## 1. Code Quality

```
- [ ] `npm run typecheck` passes (0 errors)
- [ ] `npm run lint` passes (0 errors/warnings)
- [ ] No console.log statements in production code
- [ ] No commented-out code left behind
- [ ] No TODO/FIXME markers without tracking issue
- [ ] Error handling implemented for all operations
- [ ] No hardcoded values (use config/env)
- [ ] Follows existing code patterns
```

### Validation Commands
```bash
# TypeScript check
npm run typecheck

# Lint check
npm run lint

# Find console.log
grep -r "console.log" --include="*.ts" --include="*.tsx" src/

# Find TODOs
grep -r "TODO\|FIXME" --include="*.ts" --include="*.tsx" src/
```

---

## 2. Testing

```
- [ ] Unit tests written for new functionality
- [ ] All tests passing (`npm test`)
- [ ] Edge cases covered
- [ ] Error scenarios tested
- [ ] Integration tests (if applicable)
- [ ] Manual testing completed for UI changes
```

### Validation Commands
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.ts
```

---

## 3. Documentation

```
- [ ] File List updated in progress.txt
- [ ] Learnings documented in Session Log
- [ ] AGENTS.md updated (if reusable patterns found)
- [ ] README updated (if API changes)
- [ ] Code comments where logic is non-obvious
- [ ] JSDoc for public functions (if applicable)
```

### What to Document
- **File List:** Every file created/modified/deleted
- **Session Log:** What was done, why, learnings
- **AGENTS.md:** Patterns that help future agents
- **README:** Breaking changes, new features

---

## 4. Integration

```
- [ ] Works with existing code (no regressions)
- [ ] No breaking changes to existing APIs
- [ ] Follows existing architectural patterns
- [ ] Compatible with existing dependencies
- [ ] Performance acceptable (no degradation)
```

### Integration Checks
```bash
# Build check
npm run build

# Start dev server and verify
npm run dev

# Check for import errors
npm run typecheck
```

---

## 5. Git & Commit (IF gitEnabled: true)

> **Skip this section if `gitEnabled: false` in prd.json**

```
- [ ] Changes staged for correct files only
- [ ] Commit message follows format: "feat: [ID] - [Title]"
- [ ] No unrelated changes included
- [ ] No sensitive data committed (env vars, keys)
- [ ] Branch name matches PRD branchName
```

### Commit Format
```bash
# Correct format
git commit -m "feat: US-001 - Add user authentication"

# With Co-Author
git commit -m "feat: US-001 - Add user authentication

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### When gitEnabled: false
- Skip all git operations
- Track changes in File List only
- No branches or commits required

---

## Quick Reference Card

### Before Marking Complete

| Check | Command | Must Be |
|-------|---------|---------|
| TypeScript | `npm run typecheck` | 0 errors |
| Lint | `npm run lint` | 0 errors |
| Tests | `npm test` | All pass |
| Build | `npm run build` | Success |

### Files to Update

| File | Section | Action |
|------|---------|--------|
| progress.txt | File List | Add entries |
| progress.txt | Session Log | Append entry |
| prd.json | passes | Set true |
| prd.json | notes | Add if relevant |

### If ANY Check Fails

1. **DO NOT** mark story as complete
2. Fix the issue
3. Re-run ALL checks
4. Only proceed when all pass

---

## Failure Handling

### TypeScript Errors
```
1. Read error message carefully
2. Navigate to file and line
3. Fix type issue
4. Re-run typecheck
5. Repeat until 0 errors
```

### Lint Errors
```
1. Read lint error/warning
2. Apply fix or add exception with justification
3. Re-run lint
4. Repeat until clean
```

### Test Failures
```
1. Read test failure output
2. Identify assertion that failed
3. Fix code or fix test (if test is wrong)
4. Re-run tests
5. Repeat until all pass
```

---

## AIOS Compliance Note

This checklist enforces **Quality Gates** principle from AIOS Framework.

> "Story is only complete when ALL gates pass."

No exceptions. No shortcuts. No "I'll fix it later."

If it doesn't pass, it's not done.
