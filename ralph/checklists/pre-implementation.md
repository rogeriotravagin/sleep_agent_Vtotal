# Pre-Implementation Checklist

```yaml
metadata:
  name: pre-implementation
  description: Validation before starting implementation
  version: 2.0
  usage: Run before implementing any story
```

---

## MANDATORY: Complete ALL checks before coding

> **AIOS Principle:** Story-Driven Development requires complete context.
> Do NOT start coding until all pre-conditions are met.

---

## 1. PRD Validation

```
- [ ] PRD document exists and is approved
- [ ] User story is clearly defined
- [ ] Acceptance criteria are specific and verifiable
- [ ] Dev Notes section has complete context
- [ ] Non-Goals are clearly stated
- [ ] Technical considerations documented
```

### PRD Checklist
| Section | Required | Content |
|---------|----------|---------|
| Introduction | ✅ | Problem + Solution |
| Goals | ✅ | Measurable objectives |
| User Stories | ✅ | As a/I want/So that |
| Acceptance Criteria | ✅ | Verifiable conditions |
| Non-Goals | ✅ | Out of scope items |
| Dev Notes | ✅ | ALL implementation context |
| Quality Gates | ✅ | Definition of Done |

---

## 2. Technical Readiness

```
- [ ] Development environment is set up
- [ ] Dependencies are installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] Tests pass before changes (`npm test`)
- [ ] Dev server starts (`npm run dev`)
```

### Environment Commands
```bash
# Verify setup
node -v          # Node version
npm -v           # NPM version
git status       # Clean working directory

# Install dependencies
npm install

# Verify build
npm run build

# Run tests
npm test
```

---

## 3. Git Setup (IF gitEnabled: true)

> **Skip this section if `gitEnabled: false` in prd.json**

```
- [ ] On correct branch (matches PRD branchName)
- [ ] Branch is up to date with main
- [ ] Working directory is clean
- [ ] No uncommitted changes
```

### Git Commands
```bash
# Check current branch
git branch --show-current

# Update from main
git fetch origin
git rebase origin/main

# Check status
git status
```

### When gitEnabled: false
- Skip all git setup
- Work directly on files without branching

---

## 4. Context Loading

```
- [ ] Read progress.txt → Codebase Patterns section
- [ ] Understand existing patterns
- [ ] Review Key Files Reference
- [ ] Check previous Session Log entries
- [ ] Note any gotchas or warnings
```

### Context Priority
1. **Codebase Patterns** - Read FIRST, always
2. **Key Files Reference** - Know what exists
3. **Session Log** - Learn from previous iterations
4. **Dev Notes** - Complete implementation context

---

## 5. Story Understanding

```
- [ ] Can explain story in own words
- [ ] Understand WHY (business value)
- [ ] Know WHAT to implement
- [ ] Clear on acceptance criteria
- [ ] Know what NOT to do (Non-Goals)
```

### Story Comprehension Test
Ask yourself:
- "What problem does this solve?"
- "How will users benefit?"
- "What exactly needs to be built?"
- "How will I know it's done?"
- "What am I explicitly NOT building?"

---

## 6. Dependency Check

```
- [ ] Required packages are available
- [ ] APIs needed are accessible
- [ ] Database tables exist (if applicable)
- [ ] External services are configured
- [ ] Environment variables are set
```

### Dependency Verification
```bash
# Check installed packages
npm ls [package-name]

# Check environment variables
echo $REQUIRED_VAR

# Test API connectivity
curl -I https://api.example.com/health
```

---

## Quick Reference: Pre-Flight Checks

### 5-Minute Pre-Implementation Checklist

| # | Check | Command/Action | Pass? |
|---|-------|----------------|-------|
| 1 | Branch correct | `git branch --show-current` | [ ] |
| 2 | Dependencies | `npm install` | [ ] |
| 3 | Build works | `npm run build` | [ ] |
| 4 | Tests pass | `npm test` | [ ] |
| 5 | Read Patterns | Check progress.txt top | [ ] |
| 6 | Read Dev Notes | PRD Section 8 | [ ] |
| 7 | Clear on criteria | Can explain task | [ ] |

### If ANY Check Fails

1. **DO NOT** start implementation
2. Resolve the blocker first
3. Document issue if persistent
4. Ask for help if stuck

---

## Ready to Implement?

Only proceed when you can answer YES to all:

- [ ] I know exactly what to build
- [ ] I have all the context I need
- [ ] My environment is ready
- [ ] I understand the acceptance criteria
- [ ] I know what patterns to follow
- [ ] I'm on the correct branch
- [ ] All dependencies are available

---

## AIOS Compliance Note

This checklist ensures **Story-Driven Development** principle:

> "The developer should NEVER need to read external documentation.
> Put EVERYTHING needed to implement in the Dev Notes."

If context is missing, request it before starting.
Do NOT assume or search externally.
