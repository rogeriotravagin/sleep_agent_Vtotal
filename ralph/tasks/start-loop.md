---
name: ralph-start
description: Start Ralph autonomous development loop
version: 2.0
author: AIOS Framework
mode: execute
elicit: false
tags: [ralph, autonomous, loop, execution]

arguments:
  - name: max_iterations
    description: Maximum iterations (default 30)
    required: false
    default: "30"
  - name: completion_promise
    description: String to output when complete
    required: false
    default: "COMPLETE"

pre_conditions:
  - prd.json exists with user stories
  - progress.txt exists (or will be created)
  - IF gitEnabled: true → Git branch matches branchName in prd.json
  - At least one story has passes: false
  - Development environment ready (npm install done)

post_conditions:
  - All stories have passes: true
  - progress.txt has Session Log entries
  - File List is complete
  - IF gitEnabled: true → Git commits created for each story
  - <promise>COMPLETE</promise> output

related_workflow: autonomous-loop.md
related_checklists:
  - quality-gates.md
  - pre-implementation.md

aios_integration:
  strict_sections: enforced
  quality_gates: required
  dev_agent_record: maintained
  patterns_compound: active
---

# Start Ralph Loop

## Prerequisites Check

Before starting, verify:

1. **prd.json exists**
   ```bash
   test -f prd.json && echo "✅ prd.json found" || echo "❌ Missing prd.json"
   ```

2. **progress.txt exists**
   ```bash
   test -f progress.txt && echo "✅ progress.txt found" || echo "📝 Will create"
   ```

3. **Stories are pending**
   ```bash
   cat prd.json | jq '.userStories[] | select(.passes == false) | .id'
   ```

4. **Branch is correct** (IF gitEnabled: true)
   ```bash
   GIT_ENABLED=$(cat prd.json | jq -r '.gitEnabled // false')
   if [[ "$GIT_ENABLED" == "true" ]]; then
     BRANCH=$(cat prd.json | jq -r '.branchName')
     git checkout -B "$BRANCH" 2>/dev/null || git checkout "$BRANCH"
   else
     echo "✅ Git disabled - skipping branch setup"
   fi
   ```

## Start Loop

Execute Ralph with the plugin:

```bash
/ralph-loop "Read prd.json and progress.txt. Check Codebase Patterns first.

For each iteration:
1. Find highest priority story with passes: false
2. Implement ONLY that story
3. Run: npm run typecheck && npm run test
4. If passing, commit: feat: [ID] - [Title]
5. Update prd.json: set passes: true
6. APPEND learnings to progress.txt
7. Update AGENTS.md if discovered reusable patterns

When ALL stories have passes: true, output:
<promise>COMPLETE</promise>

If stuck, document blocker in notes field and try next story." --max-iterations {{max_iterations}} --completion-promise 'COMPLETE'
```

## Monitoring

While Ralph runs, monitor in another terminal:

```bash
# Story status
watch -n 5 'cat prd.json | jq ".userStories[] | {id, title, passes}"'

# Progress log
tail -f progress.txt

# Git commits
watch -n 10 'git log --oneline -5'
```

## Stopping

If you need to stop:

```bash
/cancel-ralph
```

## After Completion

1. **Review changes** (IF gitEnabled: true)
   ```bash
   git log --oneline
   git diff main...HEAD
   ```

2. **Run final checks**
   ```bash
   npm run typecheck
   npm run test
   npm run lint
   ```

3. **Create PR** (IF gitEnabled: true)
   ```bash
   gh pr create --title "feat: {{feature_name}}" --body "Implemented by Ralph autonomous loop"
   ```

### When gitEnabled: false
- Skip git review/PR steps
- Changes are applied directly to files
- Track changes via File List in progress.txt
