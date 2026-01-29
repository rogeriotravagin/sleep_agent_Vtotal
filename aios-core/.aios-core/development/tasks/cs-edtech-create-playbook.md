---

## Execution Modes

**Choose your execution mode:**

### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
- Autonomous decision making with logging
- Minimal user interaction
- **Best for:** Simple, deterministic playbooks

### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
- Explicit decision checkpoints
- Educational explanations
- **Best for:** Complex playbooks, learning

### 3. Pre-Flight Planning - Comprehensive Upfront Planning
- Task analysis phase (identify all ambiguities)
- Zero ambiguity execution
- **Best for:** Ambiguous requirements, critical playbooks

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOS Task Format V1.0)

```yaml
task: createCSPlaybook()
responsável: Stella (Navigator)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: playbook_type
  tipo: enum
  origem: User Input
  obrigatório: true
  validação: onboarding|activation|retention|intervention|winback|expansion|community
  options:
    - onboarding: First 7/14/30/60/90 days experience
    - activation: Getting student to "Aha Moment"
    - retention: Ongoing engagement and prevention
    - intervention: At-risk student recovery
    - winback: Reactivation of churned students
    - expansion: Upsell and cross-sell
    - community: Community engagement strategies

- campo: product_context
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Must include model, stage, tools

- campo: timeframe
  tipo: string
  origem: User Input
  obrigatório: false
  validação: e.g., "7 days", "30 days", "90 days"

**Saída:**
- campo: playbook_document
  tipo: markdown
  destino: File or Memory
  persistido: true

- campo: success_metrics
  tipo: array
  destino: Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Product context understood (model, stage, tools available)
    tipo: pre-condition
    blocker: true
    validação: User provided product information
    error_message: "Need product context before creating playbook"

  - [ ] Playbook type selected
    tipo: pre-condition
    blocker: true
    validação: Valid playbook type chosen
    error_message: "Need to know which type of playbook to create"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Playbook contains all required sections (objective, trigger, actions, metrics)
    tipo: post-condition
    blocker: true
    validação: All sections present and complete
    error_message: "Playbook missing required sections"

  - [ ] Actions are specific and actionable (not generic)
    tipo: post-condition
    blocker: true
    validação: Each action has timing, channel, and clear description
    error_message: "Actions must be specific and actionable"
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
        - Qual produto específico e modelo de negócio? (assinatura, curso fechado, cohort, mentoria, híbrido)
        - Quais ferramentas/dados estão disponíveis hoje?
        - Qual o estágio atual da operação? (inexistente / inicial / em estruturação / madura)
      required: true

    - step: 2
      name: specific_pain
      questions:
        - Há alguma dor específica que motivou este pedido?
        - Qual o tamanho da base e do time disponível?
      required: true

    - step: 3
      name: playbook_scope
      questions:
        - Qual tipo de playbook precisa? (onboarding, ativação, retenção, intervenção, win-back, expansão, comunidade)
        - Para qual período/timeframe? (7 dias, 30 dias, 90 dias, etc.)
      required: true
```

---

## Implementation Steps

### Step 1: Context Gathering
- Collect product model and business context
- Understand available tools and data sources
- Assess current CS maturity level
- Identify specific pain points or goals

### Step 2: Framework Selection
Based on playbook type, select appropriate framework:

| Playbook Type | Primary Framework | Secondary |
|---------------|-------------------|-----------|
| Onboarding | Time to First Value (TTFV) | Lincoln Murphy Success Milestones |
| Activation | Moment Aha | Jobs To Be Done |
| Retention | Health Score + Engagement Loops | AARRR |
| Intervention | Leading Indicators | Churn Signals |
| Win-back | Reactivation Windows | JTBD |
| Expansion | Net Revenue Retention | Customer Advocacy |
| Community | SPACES Model | Community-Led Growth |

### Step 3: Playbook Structure

Create playbook following format:

```markdown
# PLAYBOOK: [Name]

## Overview
**Objective:** [One sentence describing the goal]
**Trigger:** [When this playbook is activated]
**Owner:** [Who is responsible for execution]
**Frequency:** [How often it runs]

## Context
**Product:** [Product name and model]
**Target Segment:** [Who this applies to]
**Stage:** [Where in the journey]

## Actions

### Action 1: [Name]
- **Timing:** [When to execute]
- **Channel:** [How to reach - WhatsApp, email, in-app, etc.]
- **Message/Action:** [What to do/say]
- **Owner:** [Who executes]
- **Fallback:** [What if no response]

### Action 2: [Name]
[Continue pattern...]

## Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric 1] | [Target] | [How to measure] |
| [Metric 2] | [Target] | [How to measure] |

## Framework Reference
**Using:** [Framework name]
**Why:** [Brief justification for this context]

## Automation Opportunities
- [What can be automated]
- [What requires human touch]

## Future Evolution (Don't implement now)
- [Improvement 1 for when operation matures]
- [Improvement 2]
```

### Step 4: Adapt to Context
- Adjust complexity based on team capacity
- Consider available channels (WhatsApp priority for Brazil)
- Scale actions to base size
- Remove anything that can't be executed with current resources

### Step 5: Validate and Deliver
- Review playbook against checklist
- Ensure all actions are executable with current resources
- Present MVP version first
- Indicate future evolutions separately

---

## Playbook Templates by Type

### Onboarding Playbook (Example Structure)
```
Day 0: Welcome + expectation setting
Day 1: First content access + quick win
Day 3: Check-in + obstacle identification
Day 7: First milestone celebration
Day 14: Progress review + community intro
Day 30: Success assessment + next steps
```

### Intervention Playbook (Example Triggers)
```
Trigger: Health Score < 40 OR 7 days inactive
→ Personal check-in (WhatsApp)
→ Identify blocker
→ Offer specific solution
→ Schedule follow-up
→ Escalate if no response in 48h
```

---

## Error Handling

```yaml
errors:
  - error: Insufficient Context
    cause: Product information not provided
    resolution: Run discovery questions
    recovery: Pause and ask essential questions

  - error: Unrealistic Playbook
    cause: Actions exceed available resources
    resolution: Simplify to MVP version
    recovery: Remove non-essential actions, focus on highest impact

  - error: Generic Actions
    cause: Playbook too theoretical
    resolution: Make actions specific with timing and channel
    recovery: Rewrite each action with concrete details
```

---

## Success Output

```
✅ Playbook '[Name]' created successfully!

📋 Summary:
- Type: [Playbook type]
- Actions: [Number of actions]
- Timeframe: [Period covered]
- Framework: [Framework used]

📊 Key Metrics:
- [Metric 1]: [Target]
- [Metric 2]: [Target]

🚀 Next steps:
1. Review and adjust to your specific context
2. Set up automation for applicable actions
3. Train team on execution
4. Start with pilot group before full rollout
```

---

## Metadata

```yaml
task: cs-edtech-create-playbook
version: 1.0.0
agents:
  - cs-edtech
tags:
  - playbook
  - customer-success
  - edtech
  - retention
updated_at: 2025-01-28
```
