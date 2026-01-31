# Workflow: Autonomous Ralph Loop

```yaml
metadata:
  name: autonomous-loop
  description: Execute autonomous development loop until all stories complete
  version: 2.0
  author: AIOS Framework
  tags: [ralph, autonomous, loop, development]
  estimated_duration: varies

triggers:
  - "*start-loop"
  - "@ralph start"
  - "ralph loop"

pre_conditions:
  - prd.json exists in project root
  - progress.txt exists in project root
  - IF gitEnabled: true → Git branch matches branchName in prd.json
  - At least one story has passes: false

post_conditions:
  - All stories have passes: true
  - progress.txt has Session Log entries for all stories
  - File List is complete
  - IF gitEnabled: true → Git commits created for each story
  - <promise>COMPLETE</promise> has been output

inputs:
  required:
    - prd_path: Path to prd.json (default: ./prd.json)
    - progress_path: Path to progress.txt (default: ./progress.txt)
  optional:
    - max_iterations: Maximum loop iterations (default: 30)
    - completion_promise: Promise string (default: COMPLETE)

outputs:
  - Updated prd.json with all passes: true
  - Updated progress.txt with Session Log
  - Git commits for each story
  - Completion promise output
```

## Workflow Steps

### Step 1: Initialize
```yaml
action: read_state
description: Read current PRD and progress state
tasks:
  - Read prd.json completely
  - Read progress.txt completely
  - Verify git branch matches branchName
  - Check Codebase Patterns section FIRST
```

### Step 2: Select Story
```yaml
action: select_next_story
description: Find highest priority incomplete story
logic:
  - Find stories where passes: false
  - Sort by priority (highest first)
  - Select first story
  - If no stories remain → go to Step 10
```

### Step 2.5: Research Check (Expansion Packs)
```yaml
action: check_research_requirement
condition: targetPath starts with "expansion-packs/"
description: Verify research exists before creating agents/tasks
workflow_reference: expansion-packs/expansion-creator/workflows/research-then-create-agent.md
tasks:
  - Check if story creates agent or task
  - IF creating agent/task:
      - Check if research file exists in docs/research/
      - IF not exists → Execute deep-research-pre-agent.md FIRST
      - Minimum: 500 lines research
  - Verify research quality before proceeding
skip_if: NOT expansion-packs/ OR NOT creating agent/task
```

### Step 3: Check Dev Notes
```yaml
action: read_context
description: Load all context from PRD Dev Notes
principle: AIOS Story-Driven - PRD contains ALL context
tasks:
  - Read section 8 "Dev Notes" completely
  - Follow patterns listed there
  - Use dependencies specified
  - DO NOT search external documentation
```

### Step 4: Implement
```yaml
action: implement_story
description: Implement story following acceptance criteria
principle: No Scope Creep - stick to criteria
tasks:
  - Review acceptance criteria
  - Follow existing patterns from Codebase Patterns
  - Implement ONLY what criteria specify
  - Track all file changes
```

### Step 5: Validate
```yaml
action: quality_gates
description: Run all Quality Gate checks
required_checks:
  - npm run typecheck → Must pass
  - npm run lint → Must pass
  - npm test → Must pass (if tests exist)
  - Manual verification → For UI changes
on_failure:
  - Fix issue
  - Return to Step 4
  - DO NOT proceed until all pass
```

### Step 6: Update File List
```yaml
action: update_audit_trail
description: Document all file changes
location: progress.txt → File List section
format: |
  | File | Action | Story | Description |
  |------|--------|-------|-------------|
  | `path/file.ts` | Created | US-001 | [Purpose] |
  | `path/file.ts` | Modified | US-001 | [What changed] |
```

### Step 7: Commit (IF gitEnabled: true)
```yaml
action: git_commit
condition: prd.json has gitEnabled: true
description: Create commit for this story
format: "feat: [ID] - [Title]"
example: "feat: US-001 - Add login form"
rules:
  - Stage only files related to this story
  - Use conventional commit format
  - Include Co-Authored-By if applicable
skip_if: gitEnabled: false → Skip to Step 8
```

### Step 8: Update Status
```yaml
action: update_prd
description: Mark story as complete
changes:
  prd_json:
    - Set passes: true
    - Add notes if relevant
authorized_edits:
  - passes field only
  - notes field only
```

### Step 9: Log Progress
```yaml
action: append_session_log
description: Document completion in progress.txt
location: progress.txt → Session Log section
mode: APPEND only (never replace)
format: |
  ---
  ## [Date] - [Story ID]: [Title]

  **Status:** ✅ Complete

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
  ---
```

### Step 10: Check Completion
```yaml
action: check_all_complete
description: Verify if all stories are done
logic:
  - Check all stories in prd.json
  - If any has passes: false → Return to Step 2
  - If all have passes: true → Proceed to Step 11
```

### Step 11: Capture Learnings (MANDATORY)
```yaml
action: capture_learnings
description: Document patterns, decisions, and lessons from this session
task_file: tasks/capture-learnings.md
mandatory: true  # NEVER skip this step
tasks:
  - Review Session Log for patterns
  - Identify decisions made and rationale
  - Document lessons learned (especially failures)
  - Propose improvements to Ralph process
  - Write learnings file to data/learnings-{date}-{project}.md
  - Update Codebase Patterns in progress.txt
  - Commit learnings
minimum_outputs:
  patterns: 1
  lessons: 1
```

### Step 12: Complete
```yaml
action: output_completion
description: Signal loop completion
output: "<promise>COMPLETE</promise>"
final_tasks:
  - Verify learnings were captured (Step 11)
  - Update Completion Summary in progress.txt
  - Verify all File List entries
  - Confirm Codebase Patterns updated
```

---

## Error Handling

### If Stuck
```yaml
action: handle_blocker
steps:
  - Document blocker in story notes field
  - Try alternative approach
  - If truly blocked, move to next story
  - NEVER output false completion promise
```

### If Quality Gates Fail
```yaml
action: fix_and_retry
steps:
  - Identify failing check
  - Fix the issue
  - Re-run validation
  - DO NOT proceed until all pass
  - DO NOT mark story complete if validation fails
```

---

## Integration Points

### Plugin Integration
```bash
# Using ralph-loop plugin
/ralph-loop "Execute autonomous loop" --max-iterations 30 --completion-promise 'COMPLETE'
```

### Script Integration
```bash
# Using bash script
./expansion-packs/ralph/scripts/ralph.sh 30
```

---

## AIOS Principles Applied

1. **Story-Driven:** All context in Dev Notes section
2. **Strict Sections:** Only edit authorized sections
3. **Quality Gates:** All must pass before [x]
4. **Audit Trail:** File List + Session Log
5. **Patterns Compound:** Learnings shared across iterations
6. **No Scope Creep:** Stick to acceptance criteria
