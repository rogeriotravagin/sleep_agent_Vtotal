---
name: swarm
description: Launch parallel Ralph workers using tmux panes
version: 2.0
author: AIOS Ralph
tags: [ralph, parallel, swarm, tmux]

trigger: "*swarm"
arguments:
  - name: project_dir
    description: Project directory with prd.json (required)
    required: true
  - name: num_workers
    description: Number of parallel workers (default 8)
    required: false
    default: 8

elicit: false
---

# Task: Launch Ralph TMUX Swarm

## Overview

Launch multiple parallel Ralph workers in tmux panes.
Each worker processes a batch of stories from prd.json.

**NO QUESTIONS ASKED.** Just execute.

---

## Quick Start

```bash
# From project root
./expansion-packs/ralph/scripts/ralph-tmux-swarm.sh <project-dir> [workers]

# Examples:
./expansion-packs/ralph/scripts/ralph-tmux-swarm.sh expansion-packs/copy/projects/copy-v2-upgrade 8
./expansion-packs/ralph/scripts/ralph-tmux-swarm.sh docs/ralph/books 6
```

---

## How It Works

### Phase Architecture (Sequential with Delays)

```
Phase 0: Create N tmux panes (tiled layout)
         ↓ (0.5s delay between each)
Phase 1: Start Claude in all panes
         ↓ (5s wait for prompts)
Phase 2: Accept permissions (option 2)
         ↓ (8s wait for init)
Phase 3: Activate /Ralph:agents:ralph
         ↓ (10s wait for skill)
Phase 4: Send execute commands with story batches
         ↓
Workers process stories in parallel!
```

### Story Distribution

Stories are distributed evenly across workers:

| Workers | 52 Stories | Per Worker |
|---------|------------|------------|
| 4 | → | 13 each |
| 6 | → | ~9 each |
| 8 | → | ~7 each |
| 10 | → | ~6 each |

---

## Tmux Commands

| Action | Command |
|--------|---------|
| Connect | `tmux attach -t ralph-swarm` |
| Change pane | `Ctrl+B` → arrow |
| Zoom pane | `Ctrl+B` → z |
| Detach | `Ctrl+B` → d |
| Kill all | `tmux kill-session -t ralph-swarm` |

---

## Monitor Progress

```bash
# Count completed stories
jq '[.userStories[] | select(.passes == true)] | length' <prd.json>

# Watch progress
watch -n 30 'jq "[.userStories[] | select(.passes == true)] | length" <prd.json>'

# View logs
ls <project-dir>/logs/*.log
```

---

## Requirements

- tmux: `brew install tmux`
- jq: `brew install jq`
- claude CLI with `--dangerously-skip-permissions` support

---

## Execution (If Inside Claude Session)

If user runs `*swarm` inside Claude, show them the command:

```
To launch the swarm, run this in your terminal:

./expansion-packs/ralph/scripts/ralph-tmux-swarm.sh {project_dir} {num_workers}
```

**DO NOT** try to run tmux from inside Claude session - it won't work.
The user must run the script directly in their terminal.

---

*Task: swarm v2.0*
