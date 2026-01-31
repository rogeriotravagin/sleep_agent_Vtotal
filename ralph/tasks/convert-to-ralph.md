---
name: ralph-convert
description: Convert existing PRD markdown to prd.json format for autonomous execution
version: 2.0
author: AIOS Framework
mode: elicit
elicit: true
tags: [ralph, prd, conversion, autonomous]

arguments:
  - name: prd_path
    description: Path to existing PRD markdown file
    required: true

pre_conditions:
  - PRD markdown file exists
  - PRD has User Stories section
  - Stories have acceptance criteria

post_conditions:
  - prd.json created in docs/ralph/{project-name}/
  - progress.txt created in docs/ralph/{project-name}/
  - Ready for /ralph-loop execution

outputs:
  - docs/ralph/{project-name}/prd.json (structured user stories)
  - docs/ralph/{project-name}/progress.txt (tracking template)

related_tasks:
  - create-prd.md
  - start-loop.md
---

# Convert PRD to Ralph Format

## Goal

Convert an existing PRD markdown document into `prd.json` format for autonomous Ralph execution.

---

## Process

### Step 1: Read the PRD

Read the provided PRD file completely. Extract:
- Feature name
- User stories
- Acceptance criteria for each story
- Non-goals (to avoid scope creep)

### Step 2: Validate Stories

Before converting, validate each story:

```
STORY SIZING CHECK:

For each story ask:
□ Can this be completed in ONE context window?
□ Is it a single, focused task?
□ Are acceptance criteria verifiable?

If NO to any → Split the story first
```

### Right-Sized Examples
- ✅ Add database column with migration
- ✅ Create single UI component
- ✅ Update one server action
- ✅ Add validation to one form

### Oversized Examples (Must Split)
- ❌ Build entire dashboard → Split into: header, sidebar, main content, etc.
- ❌ Add authentication → Split into: login form, auth API, session, etc.
- ❌ Create CRUD → Split into: create, read, update, delete separately

---

## Step 3: Generate prd.json

Create `docs/ralph/{project-name}/prd.json`:

```bash
# IMPORTANT: Always create in docs/ralph/{project-name}/
mkdir -p docs/ralph/{project-name}
```

```json
{
  "project": "{{Project Name}}",
  "branchName": "ralph/{{feature-name-kebab-case}}",
  "userStories": [
    {
      "id": "US-001",
      "title": "{{Story Title}}",
      "description": "As a {{user}}, I want {{goal}} so that {{benefit}}",
      "acceptanceCriteria": [
        "{{Criterion 1 - specific and verifiable}}",
        "{{Criterion 2}}",
        "typecheck passes",
        "browser verified (if UI story)"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

### Priority Ordering Rules

Stories execute in priority order (1 = first). Order by dependencies:

| Priority | Type | Example |
|----------|------|---------|
| 1-2 | Database/Schema | Add columns, create tables |
| 3-4 | Backend Logic | Server actions, API endpoints |
| 5-6 | UI Components | Forms, displays, interactions |
| 7+ | Integration | Connect pieces, polish |

---

## Step 4: Validate Acceptance Criteria

Each criterion must be **verifiable** by code or observation:

### Good Criteria (Verifiable)
```
✅ "Add `status` column to tasks table with default 'pending'"
✅ "Form displays error when email format is invalid"
✅ "API returns 400 for missing required fields"
✅ "Component renders loading state while fetching"
✅ "typecheck passes"
✅ "browser verified"
```

### Bad Criteria (Subjective)
```
❌ "Works correctly"
❌ "Good UX"
❌ "Fast performance"
❌ "Clean code"
❌ "User-friendly"
```

**Fix bad criteria by making them specific:**
- "Good UX" → "Form shows inline validation errors"
- "Fast" → "Response time < 200ms"
- "Clean" → "No linting errors"

---

## Step 5: Create progress.txt

Copy from template to project folder:

```bash
# IMPORTANT: Create in docs/ralph/{project-name}/, NOT in root
cp expansion-packs/ralph/templates/progress.txt docs/ralph/{project-name}/progress.txt
```

Update the header:
- **Project:** [Feature Name]
- **Branch:** ralph/[feature-name]
- **Started:** [Today's Date]

---

## Step 6: Create Git Branch

```bash
# Get branch name from prd.json
BRANCH=$(cat prd.json | jq -r '.branchName')

# Create and checkout
git checkout -b "$BRANCH"
```

---

## Step 7: Provide Next Steps

After conversion, output:

```markdown
✅ **Conversion Complete**

Files created:
- `docs/ralph/{project-name}/prd.json` - {{X}} user stories
- `docs/ralph/{project-name}/progress.txt` - Tracking template

**To start Ralph loop:**
```bash
/ralph-loop:ralph-loop
```

**Or use script:**
```bash
./expansion-packs/ralph/scripts/ralph.sh docs/ralph/{project-name} 30
```
```

---

## Pre-Conversion Checklist

Before converting, verify:

- [ ] PRD is approved/finalized
- [ ] All stories are right-sized (fit in one context)
- [ ] Acceptance criteria are verifiable
- [ ] Dependencies are ordered correctly
- [ ] Non-goals are clear (to prevent scope creep)

---

## Common Conversion Issues

### Issue: Story Too Big
**Symptom:** Story has 5+ acceptance criteria or touches multiple files
**Fix:** Split into smaller stories

### Issue: Vague Criteria
**Symptom:** "Should work", "Good UX", etc.
**Fix:** Make specific and verifiable

### Issue: Missing Dependencies
**Symptom:** Story 3 needs code from Story 5
**Fix:** Reorder priorities

### Issue: UI Story Without Browser Check
**Symptom:** UI story missing "browser verified"
**Fix:** Add to acceptance criteria

---

## Output Example

### Input (PRD Section)
```markdown
### Story 1: User Login
As a user, I want to log in so that I can access my account.

Acceptance Criteria:
- User can enter email and password
- Form validates inputs
- Successful login redirects to dashboard
- Failed login shows error message
```

### Output (prd.json)
```json
{
  "id": "US-001",
  "title": "User Login Form UI",
  "description": "As a user, I want to see a login form so that I can enter my credentials",
  "acceptanceCriteria": [
    "Login form has email input field",
    "Login form has password input field",
    "Login form has submit button",
    "Form shows loading state on submit",
    "typecheck passes",
    "browser verified"
  ],
  "priority": 1,
  "passes": false,
  "notes": ""
}
```

Note: The original story was split because it was too big (form + validation + auth + redirect).
