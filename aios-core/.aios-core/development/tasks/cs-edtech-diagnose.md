---

## Execution Modes

**Choose your execution mode:**

### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
- Autonomous decision making with logging
- Minimal user interaction
- **Best for:** Quick health check

### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
- Explicit decision checkpoints
- Educational explanations
- **Best for:** Full diagnosis, strategic planning

### 3. Pre-Flight Planning - Comprehensive Upfront Planning
- Task analysis phase (identify all ambiguities)
- Zero ambiguity execution
- **Best for:** Major CS restructuring

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOS Task Format V1.0)

```yaml
task: diagnoseCS()
responsável: Stella (Navigator)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: diagnosis_scope
  tipo: enum
  origem: User Input
  obrigatório: true
  validação: full|quick|specific
  options:
    - full: Complete CS operations diagnosis
    - quick: Rapid health check (15-20 min)
    - specific: Focus on specific area (retention, onboarding, etc.)

- campo: product_context
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Must include product, model, current state

- campo: focus_area
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Specific area if scope is 'specific'

**Saída:**
- campo: diagnosis_report
  tipo: markdown
  destino: File or Memory
  persistido: true

- campo: action_plan
  tipo: array
  destino: Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Product/business model understood
    tipo: pre-condition
    blocker: true
    validação: User provided product context
    error_message: "Need product context for diagnosis"

  - [ ] Access to describe current state
    tipo: pre-condition
    blocker: true
    validação: User can describe current CS operations
    error_message: "Need to understand current state"
```

---

## Elicitation Steps

```yaml
elicitation:
  enabled: true
  steps:
    - step: 1
      name: product_context
      questions:
        - Qual produto vamos diagnosticar e qual o modelo de negócio?
        - Qual o tamanho atual da base de alunos?
        - Há quanto tempo este produto existe?
      required: true

    - step: 2
      name: current_state
      questions:
        - Existe alguma operação de CS estruturada hoje? (time, processos, ferramentas)
        - Quais métricas você acompanha atualmente? (mesmo que informalmente)
        - Qual é a maior dor relacionada a retenção/engajamento agora?
      required: true

    - step: 3
      name: resources
      questions:
        - Quais ferramentas estão disponíveis? (CRM, LMS, analytics, comunicação)
        - Qual o tamanho do time disponível para CS? (dedicado ou acumulado?)
        - Qual o budget aproximado para melhorias?
      required: true

    - step: 4
      name: goals
      questions:
        - O que motivou buscar este diagnóstico agora?
        - Qual seria o resultado ideal deste diagnóstico?
      required: false
```

---

## Implementation Steps

### Step 1: Context Mapping

Document the current landscape:

```markdown
## CONTEXT SNAPSHOT

### Product
- **Name:** [Product name]
- **Model:** [Subscription/Course/Cohort/Mentorship/Hybrid]
- **Duration:** [Typical student journey length]
- **Price point:** [Ticket médio]
- **Base size:** [Number of active students]
- **Age:** [How long product has existed]

### Current CS State
- **Team:** [Dedicated CS / Founder-led / No structure]
- **Processes:** [Documented / Informal / None]
- **Tools:** [List of tools in use]
- **Metrics tracked:** [Current metrics, if any]

### Known Challenges
- [Challenge 1]
- [Challenge 2]
- [Challenge 3]

### Resources Available
- **People:** [X people, Y hours/week]
- **Tools:** [Available tools]
- **Budget:** [Approximate budget for improvements]
```

### Step 2: Maturity Assessment

Evaluate CS maturity across dimensions:

```markdown
## CS MATURITY ASSESSMENT

### Maturity Levels
- **Level 0 - Inexistent:** No CS structure, reactive support only
- **Level 1 - Initial:** Basic onboarding, some metrics, ad-hoc processes
- **Level 2 - Developing:** Defined processes, health score, proactive outreach
- **Level 3 - Established:** Automated workflows, segmentation, predictive actions
- **Level 4 - Optimized:** Data-driven, community-led, continuous optimization

### Dimension Scores

| Dimension | Current Level | Evidence | Gap to Next Level |
|-----------|---------------|----------|-------------------|
| **Onboarding** | [0-4] | [What exists] | [What's missing] |
| **Engagement Tracking** | [0-4] | [What exists] | [What's missing] |
| **Health Score** | [0-4] | [What exists] | [What's missing] |
| **Proactive Outreach** | [0-4] | [What exists] | [What's missing] |
| **Churn Prevention** | [0-4] | [What exists] | [What's missing] |
| **Community** | [0-4] | [What exists] | [What's missing] |
| **Metrics & Reporting** | [0-4] | [What exists] | [What's missing] |
| **Automation** | [0-4] | [What exists] | [What's missing] |

### Overall Maturity: Level [X] - [Name]
```

### Step 3: Gap Analysis

Identify critical gaps:

```markdown
## GAP ANALYSIS

### Critical Gaps (Must Fix)
High impact on retention, causing active harm

| Gap | Impact | Effort | Priority |
|-----|--------|--------|----------|
| [Gap 1] | [High/Med/Low] | [High/Med/Low] | [P1/P2/P3] |
| [Gap 2] | [High/Med/Low] | [High/Med/Low] | [P1/P2/P3] |

### Important Gaps (Should Fix)
Significant opportunity cost if not addressed

| Gap | Impact | Effort | Priority |
|-----|--------|--------|----------|
| [Gap 1] | [High/Med/Low] | [High/Med/Low] | [P1/P2/P3] |

### Nice-to-Have Gaps (Could Fix Later)
Would improve but not urgent

| Gap | Impact | Effort | Priority |
|-----|--------|--------|----------|
| [Gap 1] | [High/Med/Low] | [High/Med/Low] | [P1/P2/P3] |
```

### Step 4: Quick Wins Identification

Find immediate opportunities:

```markdown
## QUICK WINS

Actions that can be implemented this week with current resources:

### Quick Win 1: [Name]
- **Action:** [Specific action]
- **Impact:** [Expected result]
- **Effort:** [Time/resources needed]
- **How:** [Step-by-step]

### Quick Win 2: [Name]
- **Action:** [Specific action]
- **Impact:** [Expected result]
- **Effort:** [Time/resources needed]
- **How:** [Step-by-step]

### Quick Win 3: [Name]
- **Action:** [Specific action]
- **Impact:** [Expected result]
- **Effort:** [Time/resources needed]
- **How:** [Step-by-step]
```

### Step 5: Risk Assessment

Identify retention risks:

```markdown
## RISK ASSESSMENT

### Churn Risk Factors

| Risk Factor | Severity | Likelihood | Current Mitigation | Recommended Action |
|-------------|----------|------------|--------------------|--------------------|
| [Risk 1] | [H/M/L] | [H/M/L] | [What exists] | [What to do] |
| [Risk 2] | [H/M/L] | [H/M/L] | [What exists] | [What to do] |

### Leading Indicators to Watch
Signals that predict problems before they manifest:

1. [Indicator 1] - [What it predicts]
2. [Indicator 2] - [What it predicts]
3. [Indicator 3] - [What it predicts]

### Lagging Indicators (Already Problems)
1. [Indicator 1] - [Current status]
2. [Indicator 2] - [Current status]
```

### Step 6: Recommendations

Prioritized action plan:

```markdown
## RECOMMENDATIONS

### Phase 1: Foundation (Now - 30 days)
Focus: Establish basics, implement quick wins

| Action | Owner | Timeline | Success Metric |
|--------|-------|----------|----------------|
| [Action 1] | [Who] | [When] | [How to measure] |
| [Action 2] | [Who] | [When] | [How to measure] |

### Phase 2: Structure (30-90 days)
Focus: Build processes, implement health score

| Action | Owner | Timeline | Success Metric |
|--------|-------|----------|----------------|
| [Action 1] | [Who] | [When] | [How to measure] |
| [Action 2] | [Who] | [When] | [How to measure] |

### Phase 3: Scale (90+ days)
Focus: Automate, optimize, expand

| Action | Owner | Timeline | Success Metric |
|--------|-------|----------|----------------|
| [Action 1] | [Who] | [When] | [How to measure] |
| [Action 2] | [Who] | [When] | [How to measure] |

### NOT Recommended (Yet)
Things that are nice but premature for current stage:

- [Thing 1] - [Why not now]
- [Thing 2] - [Why not now]
```

---

## Diagnosis Report Template

```markdown
# CS DIAGNOSIS REPORT: [Product Name]

**Date:** [Date]
**Analyst:** Stella (CS Edtech Agent)
**Scope:** [Full/Quick/Specific]

---

## Executive Summary

### Current State
[2-3 sentences describing where CS is today]

### Key Finding
[Single most important insight]

### Recommended Focus
[What to prioritize first and why]

---

## Context
[Context snapshot from Step 1]

---

## Maturity Assessment
[Assessment from Step 2]

---

## Gap Analysis
[Gaps from Step 3]

---

## Quick Wins
[Quick wins from Step 4]

---

## Risks
[Risks from Step 5]

---

## Recommendations
[Phased recommendations from Step 6]

---

## Next Steps

1. **Immediate (This week):**
   - [Action 1]
   - [Action 2]

2. **Short-term (This month):**
   - [Action 1]
   - [Action 2]

3. **Medium-term (This quarter):**
   - [Action 1]
   - [Action 2]

---

## Appendix

### Frameworks Referenced
- [Framework 1] - [Why used]
- [Framework 2] - [Why used]

### Data Sources
- [Source 1]
- [Source 2]

### Assumptions Made
- [Assumption 1]
- [Assumption 2]

---

*Generated by Stella (CS Edtech Agent) | Academia Lendária*
```

---

## Error Handling

```yaml
errors:
  - error: Insufficient Information
    cause: Not enough context to diagnose
    resolution: Ask more discovery questions
    recovery: Pause diagnosis, gather essential info

  - error: Over-Diagnosis
    cause: Trying to analyze everything
    resolution: Focus on scope defined
    recovery: Narrow to most impactful areas

  - error: Unrealistic Recommendations
    cause: Suggesting actions beyond resources
    resolution: Calibrate to actual capacity
    recovery: Revise recommendations to match reality
```

---

## Success Output

```
✅ Diagnosis complete!

📋 Summary:
- Current maturity: Level [X] - [Name]
- Critical gaps identified: [Number]
- Quick wins available: [Number]
- Phases recommended: [Number]

🎯 Top Priority:
[Single most important action with justification]

⚡ Quick Wins (This Week):
1. [Quick win 1]
2. [Quick win 2]
3. [Quick win 3]

📊 Key Metrics to Start Tracking:
1. [Metric 1]
2. [Metric 2]

🚀 Next Steps:
1. Review diagnosis report
2. Validate with team
3. Start Phase 1 actions
```

---

## Metadata

```yaml
task: cs-edtech-diagnose
version: 1.0.0
agents:
  - cs-edtech
tags:
  - diagnosis
  - customer-success
  - edtech
  - strategy
updated_at: 2025-01-28
```
