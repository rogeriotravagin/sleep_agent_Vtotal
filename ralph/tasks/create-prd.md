---
name: ralph-create-prd
description: Create a structured PRD for development (manual or autonomous)
version: 2.0
author: AIOS Framework
mode: elicit
elicit: true
tags: [ralph, prd, planning, development]

arguments:
  - name: feature_name
    description: Name of the feature to implement
    required: true
  - name: mode
    description: "Output mode: 'ralph' for prd.json, 'manual' for tasks.md, 'both' for both"
    required: false
    default: "both"

pre_conditions:
  - Project repository is initialized
  - User has clear feature idea
  - Development environment is set up

post_conditions:
  - PRD document created (prd-[name].md or prd.json)
  - Tasks document created (if manual mode)
  - Progress file created (if ralph mode)
  - Files ready for implementation or autonomous loop

outputs:
  ralph_mode:
    - prd.json (structured user stories)
    - progress.txt (tracking template)
  manual_mode:
    - prd-[name].md (full PRD)
    - tasks-[name].md (checkbox tasks)
  both_mode:
    - All of the above

related_checklists:
  - quality-gates.md
  - pre-implementation.md

aios_integration:
  story_driven: true
  quality_gates: included
  dev_agent_record: template provided
---

# Rule: Generating a Product Requirements Document (PRD)

## Goal

Guide AI assistant in creating a detailed PRD in Markdown format. The PRD should be clear, actionable, and suitable for a **junior developer** to understand and implement.

## Process

1. **Receive Initial Prompt:** User provides feature description
2. **Ask Clarifying Questions:** 3-5 essential questions (WHAT and WHY, not HOW)
3. **Generate PRD:** Based on answers, create structured PRD
4. **Save PRD:** Save as `prd-[feature-name].md` in `/tasks/` directory

## ⚠️ IMPORTANT: Final Instructions

1. **Do NOT start implementing the PRD**
2. **Make sure to ask clarifying questions FIRST**
3. **Take user's answers and improve the PRD**
4. **Wait for user approval before generating tasks**

---

## Phase 1: Clarifying Questions

Ask only the most critical questions. Focus on areas where initial prompt is ambiguous.

### Common Areas Needing Clarification

- **Problem/Goal:** "What problem does this feature solve?"
- **Core Functionality:** "What are the key actions a user should perform?"
- **Scope/Boundaries:** "What should this feature NOT do?"
- **Success Criteria:** "How will we know it's successfully implemented?"

### Formatting Requirements

- **Number all questions** (1, 2, 3, etc.)
- **List options as A, B, C, D** for easy reference
- Make it simple to respond with "1A, 2C, 3B"

### Question Template

```markdown
Before I create the PRD for "{{feature_name}}", I need to clarify a few things:

**1. What problem does this feature solve?**
   A) User pain point: users struggle with [describe]
   B) Business need: we need to [describe]
   C) Technical debt: current implementation [describe]
   D) Other: [please specify]

**2. Who is the primary user?**
   A) End users (customers)
   B) Internal team members
   C) Developers/API consumers
   D) Admin users only

**3. What is the scope?**
   A) MVP - minimal viable feature
   B) Full feature with all requirements
   C) Enhancement to existing feature
   D) Other: [please specify]

**4. What are the success criteria?**
   A) Specific metrics: [define]
   B) User can complete: [action]
   C) System performs: [behavior]
   D) Other: [please specify]

**5. Are there any constraints or non-goals?**
   A) Timeline pressure (when?)
   B) Technical limitations (what?)
   C) Must NOT include: [specify]
   D) None significant

Please respond with your choices (e.g., "1A, 2B, 3A, 4B, 5D") and any additional context.
```

---

## Phase 2: Generate PRD Document

Create `prd-[feature-name].md` in `/tasks/`:

```markdown
# PRD: {{Feature Name}}

## 1. Introduction/Overview

**Problem Statement:**
[Clear description of the problem being solved]

**Solution Summary:**
[Brief description of the proposed solution]

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

> Clearly state what this feature will NOT include.

- ❌ [What this feature will NOT do]
- ❌ [Explicit boundary]
- ❌ [Future consideration]

---

## 6. Design Considerations

### UI/UX Requirements
- [Visual requirement]
- [Interaction pattern]

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

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric 1] | [Value] | [How to measure] |
| [Metric 2] | [Value] | [How to measure] |

---

## 9. Open Questions

- [ ] [Question needing clarification]
- [ ] [Decision to be made]

---

*Created: {{date}}*
*Status: Draft*
```

---

## Phase 3: Generate Tasks (After PRD Approval)

### ⚠️ IMPORTANT: Two-Phase Task Generation

**Phase 3a: Generate Parent Tasks**

After PRD is approved, generate HIGH-LEVEL tasks only:

```markdown
I have analyzed the PRD and identified the following high-level tasks:

- [ ] 0.0 Create feature branch
- [ ] 1.0 [Parent Task 1]
- [ ] 2.0 [Parent Task 2]
- [ ] 3.0 [Parent Task 3]
- [ ] 4.0 [Parent Task 4]
- [ ] 5.0 [Parent Task 5]

**Ready to generate the sub-tasks?**
Respond with **"Go"** to proceed.
```

**⏸️ PAUSE HERE - Wait for user to say "Go"**

**Phase 3b: Generate Sub-Tasks**

Only after user confirms with "Go", expand each parent task:

```markdown
# Tasks: {{Feature Name}}

Based on: `prd-{{feature-name}}.md`

---

## Relevant Files

> List all files that will be created or modified.

- `path/to/component.tsx` - Main component for this feature
- `path/to/component.test.tsx` - Unit tests for component
- `path/to/api.ts` - API route handler
- `path/to/api.test.ts` - Unit tests for API
- `lib/utils/helpers.ts` - Utility functions
- `lib/utils/helpers.test.ts` - Unit tests for helpers

### Notes

- Unit tests should be placed alongside code files (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in same directory)
- Run tests: `npx jest [optional/path/to/test]`
- Run all tests: `npm test`

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

**Update the file after completing each sub-task**, not just after completing an entire parent task.

---

## Tasks

- [ ] **0.0 Create feature branch**
  - [ ] 0.1 Create and checkout new branch: `git checkout -b feature/{{feature-name}}`

- [ ] **1.0 [Parent Task Title]**
  - [ ] 1.1 [Sub-task description]
  - [ ] 1.2 [Sub-task description]
  - [ ] 1.3 [Sub-task description]
  - [ ] 1.4 Write tests for above
  - [ ] 1.5 Run typecheck: `npm run typecheck`

- [ ] **2.0 [Parent Task Title]**
  - [ ] 2.1 [Sub-task description]
  - [ ] 2.2 [Sub-task description]
  - [ ] 2.3 Write tests for above
  - [ ] 2.4 Run typecheck: `npm run typecheck`

- [ ] **3.0 [Parent Task Title]**
  - [ ] 3.1 [Sub-task description]
  - [ ] 3.2 [Sub-task description]
  - [ ] 3.3 Write tests
  - [ ] 3.4 Run typecheck

- [ ] **4.0 Integration & Testing**
  - [ ] 4.1 Run full test suite: `npm test`
  - [ ] 4.2 Run typecheck: `npm run typecheck`
  - [ ] 4.3 Run linter: `npm run lint`
  - [ ] 4.4 Manual testing / browser verification

- [ ] **5.0 Finalize**
  - [ ] 5.1 Update documentation if needed
  - [ ] 5.2 Create pull request
  - [ ] 5.3 Request code review

---

*Generated: {{date}}*
*PRD: prd-{{feature-name}}.md*
```

---

## Phase 4: Output Based on Mode

### Mode: `manual` (Default for ai-dev-tasks workflow)
1. Create `prd-[name].md` in `/tasks/`
2. Wait for approval
3. Generate parent tasks, wait for "Go"
4. Generate `tasks-[name].md` in `/tasks/`

### Mode: `ralph` (For autonomous execution)
1. Create `prd-[name].md` in `/tasks/`
2. **Create `prd.json`** with user stories (see template below)
3. Create `progress.txt` from template
4. Provide `/ralph-loop` command

#### prd.json Template

```json
{
  "branchName": "ralph/{{feature-name}}",
  "userStories": [
    {
      "id": "US-001",
      "title": "[Story Title]",
      "description": "As a [user], I want [goal] so that [benefit]",
      "acceptanceCriteria": [
        "[Specific, verifiable criterion]",
        "[Another criterion]",
        "typecheck passes",
        "browser verified (if UI)"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-002",
      "title": "[Story Title]",
      "description": "As a [user], I want [goal] so that [benefit]",
      "acceptanceCriteria": [
        "[Criterion]",
        "typecheck passes"
      ],
      "priority": 2,
      "passes": false,
      "notes": ""
    }
  ]
}
```

#### Story Ordering Rules
- **Priority 1** = First to implement
- Database/schema changes → Backend logic → UI components
- Each story must be completable in ONE context window
- If too big, split into smaller stories

#### Acceptance Criteria Rules
- Must be **verifiable** (not "works correctly")
- Always include `typecheck passes`
- UI stories must include `browser verified`
- Examples:
  - ✅ "Add `status` column to tasks table with default 'pending'"
  - ✅ "Form shows error message when email invalid"
  - ❌ "Good UX"
  - ❌ "Works correctly"

### Mode: `both`
1. Create all files
2. User chooses workflow

---

## Task Granularity Guidelines

### Parent Task Sizing
- Take 15-60 minutes
- Have clear completion criteria
- Be independently committable
- **About 5 parent tasks** is typical

### Subtask Sizing
- Take 5-15 minutes
- Single action
- Binary completion (done/not done)

### Examples

**❌ Too Big:**
```
- [ ] Implement authentication system
```

**✅ Right Size (Parent Tasks):**
```
- [ ] 0.0 Create feature branch
- [ ] 1.0 Add login form UI
- [ ] 2.0 Add form validation
- [ ] 3.0 Add auth server action
- [ ] 4.0 Add session management
- [ ] 5.0 Integration & testing
```

**✅ Right Size (Subtasks):**
```
- [ ] 1.1 Create LoginForm component
- [ ] 1.2 Add email input field
- [ ] 1.3 Add password input field
- [ ] 1.4 Add submit button
- [ ] 1.5 Style with design system
- [ ] 1.6 Write unit tests
- [ ] 1.7 Run typecheck
```

---

## Target Audience

Assume the primary reader is a **junior developer**. Therefore:
- Requirements should be **explicit** and **unambiguous**
- Avoid jargon where possible
- Provide enough detail to understand purpose and logic
- Include test file locations and commands

---

## Checklist Before Finishing

- [ ] Asked clarifying questions (3-5)
- [ ] Generated PRD with all 9 sections
- [ ] Saved as `prd-[feature-name].md`
- [ ] **Did NOT start implementing**
- [ ] Waited for PRD approval
- [ ] Generated parent tasks first
- [ ] Waited for "Go" before subtasks
- [ ] IF gitEnabled: true → Included Task 0.0: Create branch
- [ ] Listed all relevant files
- [ ] Included checkbox instructions

---

## Expansion Pack Rules (CRITICAL)

### When target is `expansion-packs/`:

**1. Git is DISABLED by default**
```json
{
  "gitEnabled": false,
  "branchName": null
}
```

**2. Atomicity Rule: 1 Story = 1 Item**
- 1 story per AGENT (never multiple agents in 1 story)
- 1 story per TASK (never multiple tasks in 1 story)
- Each story includes its ECOSYSTEM:
  - Agent: agent.md + tasks/ + checklists/ + templates/
  - Task: task.md + checklist + template (if applicable)

**3. Research-Then-Create is MANDATORY**
- Reference: `expansion-packs/expansion-creator/workflows/research-then-create-agent.md`
- Before creating any agent or task:
  1. Execute deep research (500+ lines minimum)
  2. Extract framework from research
  3. Create item based on real methodology
- Minimum output sizes:
  - Research: 500+ lines
  - Agent: 800+ lines (Tier 0) or 1000+ lines (Tier 1-3)
  - Task: 600+ lines

**4. Acceptance Criteria Must Include Ecosystem**
```json
{
  "acceptanceCriteria": [
    "CREATE agents/[name].md (~1000 lines)",
    "CREATE tasks/[name-task].md (~600 lines)",
    "CREATE checklists/[name]-checklist.md",
    "CREATE templates/[name]-tmpl.yaml (if applicable)",
    "Research saved to docs/research/[name]-research.md"
  ]
}
```

### Validation for Expansion Pack PRDs
- [ ] gitEnabled: false
- [ ] 1 story = 1 item (check atomicity)
- [ ] Each story references research requirement
- [ ] Ecosystem files included in acceptance criteria
