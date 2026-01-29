---

## Execution Modes

**Choose your execution mode:**

### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
- Autonomous decision making with logging
- Minimal user interaction
- **Best for:** Quick churn review

### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
- Explicit decision checkpoints
- Educational explanations
- **Best for:** Deep churn analysis, strategy creation

### 3. Pre-Flight Planning - Comprehensive Upfront Planning
- Task analysis phase (identify all ambiguities)
- Zero ambiguity execution
- **Best for:** Major churn reduction initiative

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOS Task Format V1.0)

```yaml
task: analyzeChurn()
responsável: Stella (Navigator)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: analysis_type
  tipo: enum
  origem: User Input
  obrigatório: true
  validação: full|root_cause|prevention|winback
  options:
    - full: Complete churn analysis and strategy
    - root_cause: Deep dive into churn causes
    - prevention: Prevention strategy focus
    - winback: Reactivation strategy focus

- campo: churn_data
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Historical churn data if available

- campo: product_context
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Must include product, model, current churn rate

**Saída:**
- campo: churn_analysis
  tipo: markdown
  destino: File or Memory
  persistido: true

- campo: prevention_playbook
  tipo: markdown
  destino: File or Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Product context understood
    tipo: pre-condition
    blocker: true
    validação: User provided product context
    error_message: "Need product context for churn analysis"

  - [ ] Some churn pattern observable
    tipo: pre-condition
    blocker: false
    validação: User has churn data or observations
    error_message: "Will use framework-based analysis without data"
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
        - Qual produto e modelo de negócio? (assinatura, curso, cohort, etc.)
        - Qual a taxa de churn atual (se conhecida)? Ou percepção qualitativa?
        - Qual o período típico onde mais ocorre churn?
      required: true

    - step: 2
      name: churn_patterns
      questions:
        - Você tem dados de por que as pessoas cancelam? (pesquisas, feedback, suposições)
        - Existe algum padrão observável? (tempo, perfil, comportamento antes do churn)
        - O churn é principalmente voluntário (decisão) ou involuntário (cartão, esquecimento)?
      required: true

    - step: 3
      name: current_prevention
      questions:
        - O que já está sendo feito para prevenir churn?
        - Há alguma ação de win-back para quem já saiu?
        - Quais canais de comunicação são usados?
      required: false
```

---

## Implementation Steps

### Step 1: Churn Classification

```markdown
## CHURN CLASSIFICATION

### Churn Types in Edtech B2C

| Type | Description | Typical % | Primary Cause |
|------|-------------|-----------|---------------|
| **Voluntary - Active** | Consciously cancels | 40-60% | Value not perceived |
| **Voluntary - Passive** | Lets expire, doesn't renew | 20-30% | Forgot or deprioritized |
| **Involuntary** | Payment failure | 10-20% | Card issues, lack of funds |
| **Hidden** | Stops using but doesn't cancel | Variable | Disengagement |

### Your Product Analysis

| Type | Estimated % | Evidence |
|------|-------------|----------|
| Voluntary - Active | [%] | [How we know] |
| Voluntary - Passive | [%] | [How we know] |
| Involuntary | [%] | [How we know] |
| Hidden | [%] | [How we know] |

**Key Insight:** [Most significant finding about churn type distribution]
```

### Step 2: Root Cause Analysis

```markdown
## ROOT CAUSE ANALYSIS

### Framework: The 5 Whys of Edtech Churn

Most churn in edtech B2C falls into these root categories:

#### 1. Value Gap
**Surface reason:** "Not worth the price"
**Root cause:** Gap between expected and experienced value

| Signal | How to Detect | Frequency |
|--------|---------------|-----------|
| Low engagement before churn | Login/progress data | [%] |
| Price objection at cancellation | Exit survey | [%] |
| Didn't reach Aha Moment | Milestone tracking | [%] |

**Your assessment:** [Analysis of value gap in this product]

#### 2. Progress Stall
**Surface reason:** "I'm stuck" or "It's too hard"
**Root cause:** Barriers preventing advancement

| Signal | How to Detect | Frequency |
|--------|---------------|-----------|
| Plateau in progress | Progress tracking | [%] |
| Support tickets about difficulty | Help desk | [%] |
| Abandonment at specific points | Funnel analysis | [%] |

**Your assessment:** [Analysis of progress stalls in this product]

#### 3. Life Interference
**Surface reason:** "No time" or "Life got in the way"
**Root cause:** External priorities overtook commitment

| Signal | How to Detect | Frequency |
|--------|---------------|-----------|
| Gradual disengagement | Login frequency drop | [%] |
| "No time" in exit survey | Exit survey | [%] |
| Return attempts later | Reactivation data | [%] |

**Your assessment:** [Analysis of life interference patterns]

#### 4. Expectation Mismatch
**Surface reason:** "Not what I expected"
**Root cause:** Marketing/sales promise vs. product reality

| Signal | How to Detect | Frequency |
|--------|---------------|-----------|
| Early churn (< 30 days) | Cohort analysis | [%] |
| Specific complaints about content | Feedback | [%] |
| "Thought it would be different" | Exit survey | [%] |

**Your assessment:** [Analysis of expectation mismatches]

#### 5. Community Failure
**Surface reason:** "Felt alone" or "No support"
**Root cause:** Lack of connection and belonging

| Signal | How to Detect | Frequency |
|--------|---------------|-----------|
| No community participation | Community metrics | [%] |
| No peer connections made | Social data | [%] |
| Support-only interactions | Ticket analysis | [%] |

**Your assessment:** [Analysis of community connection]

### Root Cause Summary

| Root Cause | Estimated Impact | Confidence | Priority |
|------------|------------------|------------|----------|
| [Cause 1] | [%] | [H/M/L] | [P1/P2/P3] |
| [Cause 2] | [%] | [H/M/L] | [P1/P2/P3] |
| [Cause 3] | [%] | [H/M/L] | [P1/P2/P3] |
```

### Step 3: Churn Timeline Analysis

```markdown
## CHURN TIMELINE

### When Does Churn Happen?

Typical edtech B2C churn windows:

| Window | Description | Typical Rate | Primary Cause |
|--------|-------------|--------------|---------------|
| Day 0-7 | Buyer's remorse | 5-10% | Expectation mismatch |
| Day 7-30 | Didn't activate | 10-20% | Value not proven |
| Day 30-90 | Plateau | 15-25% | Progress stalled |
| Day 90+ | Fatigue | 10-15% | Life/priorities |
| Renewal | Decision point | Variable | All factors |

### Your Product Timeline

[Map specific churn patterns to timeline]

```
Week 1  Week 2  Week 3  Week 4  Month 2  Month 3  Renewal
  │       │       │       │        │        │        │
  ▼       ▼       ▼       ▼        ▼        ▼        ▼
 [X%]    [X%]    [X%]    [X%]     [X%]     [X%]     [X%]
  │       │       │       │        │        │        │
[Cause] [Cause] [Cause] [Cause] [Cause]  [Cause]  [Cause]
```

### Critical Intervention Points
Based on timeline analysis, these are the moments for intervention:

1. **Day [X]:** [What's happening] → [Intervention needed]
2. **Day [X]:** [What's happening] → [Intervention needed]
3. **Day [X]:** [What's happening] → [Intervention needed]
```

### Step 4: Prevention Strategy

```markdown
## CHURN PREVENTION STRATEGY

### Prevention Framework

```
        PREDICT → PREVENT → RESCUE → LEARN
            │        │        │        │
     Identify    Act      Last    Improve
     signals   before    chance    system
```

### Prediction Layer

#### Leading Indicators (Early Warnings)
Signals that predict churn 2-4 weeks before it happens:

| Indicator | Threshold | Lead Time | Action Trigger |
|-----------|-----------|-----------|----------------|
| Login frequency drop | > 50% decrease | 14 days | Personal outreach |
| Progress stall | > 7 days no advance | 10 days | Help offer |
| Community absence | 0 interactions in 14 days | 14 days | Re-engagement |
| Support sentiment | Negative ticket | 3 days | Priority response |

#### Health Score Integration
[Link to health score definition if exists]

### Prevention Layer

#### By Root Cause

**Preventing Value Gap:**
| Action | Timing | Channel | Owner |
|--------|--------|---------|-------|
| Quick win celebration | Day 1-3 | In-app + WhatsApp | Automated |
| Progress milestone recognition | At milestones | All channels | Automated |
| Success story sharing | Weekly | Community | Community |

**Preventing Progress Stall:**
| Action | Timing | Channel | Owner |
|--------|--------|---------|-------|
| Proactive check-in | At stall detection | WhatsApp | CS |
| Office hours invitation | Weekly | Email | Automated |
| Peer buddy connection | Day 14 | Community | Community |

**Preventing Life Interference:**
| Action | Timing | Channel | Owner |
|--------|--------|---------|-------|
| Flexible pacing options | On signup | In-app | Product |
| Catch-up content | After absence | Email | Automated |
| "Welcome back" without judgment | On return | In-app | Automated |

**Preventing Expectation Mismatch:**
| Action | Timing | Channel | Owner |
|--------|--------|---------|-------|
| Expectation setting call | Pre-purchase | Sales | Sales |
| Day 1 orientation | Day 0 | Email + Video | Automated |
| 7-day check-in | Day 7 | WhatsApp | CS |

**Preventing Community Failure:**
| Action | Timing | Channel | Owner |
|--------|--------|---------|-------|
| Community onboarding | Day 3 | Community | Community |
| Buddy system | Day 7 | Community | Community |
| Group challenges | Bi-weekly | Community | Community |

### Rescue Layer (At-Risk Intervention)

When student enters at-risk status:

```
RESCUE PLAYBOOK

Day 0 (Risk detected):
└─ Personal WhatsApp message
   "Oi [Nome], notei que você não apareceu por aqui nos últimos dias.
    Tudo bem? Tem algo em que posso ajudar?"

Day 2 (No response):
└─ Voice message or call attempt
   Show genuine concern, not sales pitch

Day 5 (Still at risk):
└─ Value reminder + specific offer
   "Vi que você estava no módulo X. Muitos alunos travam ali.
    Quer 15min de ajuda 1:1?"

Day 7 (Last chance):
└─ Direct question
   "Preciso entender: o que podemos fazer diferente para você ter sucesso aqui?"
```
```

### Step 5: Win-Back Strategy

```markdown
## WIN-BACK STRATEGY

### Win-Back Windows

| Window | Response Rate | Best Approach |
|--------|---------------|---------------|
| 0-30 days | 15-25% | Address specific reason |
| 30-90 days | 10-15% | New value proposition |
| 90-180 days | 5-10% | Fresh start + incentive |
| 180+ days | < 5% | Major update/relaunch |

### Win-Back Playbook

#### Immediate Post-Churn (Day 0-7)
- **Don't:** Immediately offer discount
- **Do:** Acknowledge departure, leave door open

```
"[Nome], vi que você decidiu sair. Respeito sua decisão.
Se quiser compartilhar o que poderia ter sido diferente,
adoraria ouvir. Sua vaga estará aqui se quiser voltar."
```

#### Short-Term Win-Back (Day 14-30)
Based on churn reason:

| Churn Reason | Win-Back Message |
|--------------|------------------|
| Price | "Lançamos um plano mais acessível..." |
| No time | "Criamos um formato acelerado..." |
| Stuck | "Adicionamos suporte extra para [área]..." |
| Expectation | "Fizemos melhorias baseadas em feedback..." |

#### Long-Term Win-Back (Day 60+)
- Trigger: New cohort launch, major update, success story
- Approach: Fresh value proposition, not reminder of past

```
"[Nome], estamos lançando a turma X do [Produto].
Alguns alunos que retornaram conseguiram [resultado específico].
Reservei uma vaga com condição especial se fizer sentido para você."
```

### Win-Back Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Win-back response rate | > 15% | Responses / Contacts |
| Win-back conversion | > 5% | Reactivations / Contacts |
| Retained after win-back | > 60% | Still active at 90 days |
```

---

## Churn Analysis Report Template

```markdown
# CHURN ANALYSIS REPORT: [Product Name]

**Date:** [Date]
**Analyst:** Stella (CS Edtech Agent)
**Period Analyzed:** [Period]

---

## Executive Summary

**Current Churn Rate:** [X%] [period]
**Benchmark (Edtech B2C Brazil):** [Y%]
**Gap:** [+/- Z%]

**Primary Finding:** [Most important insight]

**Top Action:** [Single most impactful action recommended]

---

## Churn Classification
[From Step 1]

---

## Root Cause Analysis
[From Step 2]

---

## Timeline Analysis
[From Step 3]

---

## Prevention Strategy
[From Step 4]

---

## Win-Back Strategy
[From Step 5]

---

## Recommended Actions

### Immediate (This Week)
1. [Action 1] - [Expected impact]
2. [Action 2] - [Expected impact]

### Short-Term (This Month)
1. [Action 1] - [Expected impact]
2. [Action 2] - [Expected impact]

### Medium-Term (This Quarter)
1. [Action 1] - [Expected impact]
2. [Action 2] - [Expected impact]

---

## Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Churn rate | [X%] | [Y%] | [When] |
| Prevention saves | [X] | [Y] | [When] |
| Win-back rate | [X%] | [Y%] | [When] |

---

*Generated by Stella (CS Edtech Agent) | Academia Lendária*
```

---

## Error Handling

```yaml
errors:
  - error: No Churn Data
    cause: No historical churn information available
    resolution: Use framework-based analysis with assumptions
    recovery: Document assumptions, validate with qualitative data

  - error: Single Cause Fixation
    cause: Attributing all churn to one reason
    resolution: Apply full framework analysis
    recovery: Map multiple root causes with relative weights

  - error: Generic Solutions
    cause: Recommendations too broad to implement
    resolution: Make specific to product context
    recovery: Rewrite with concrete actions, timing, owners
```

---

## Success Output

```
✅ Churn analysis complete!

📊 Key Findings:
- Current churn: [X%] ([above/below] benchmark)
- Primary cause: [Root cause] ([X%] of churn)
- Critical window: [When most churn happens]

🎯 Top 3 Actions:
1. [Action 1] - Expected [X%] churn reduction
2. [Action 2] - Expected [X%] churn reduction
3. [Action 3] - Expected [X%] churn reduction

📈 Target Impact:
- Reduce churn from [X%] to [Y%] in [timeframe]
- Save approximately [N] students per month
- Estimated revenue impact: R$ [X]/month

🚀 Next Steps:
1. Implement prediction layer (leading indicators)
2. Create prevention playbooks by root cause
3. Set up win-back automation
```

---

## Metadata

```yaml
task: cs-edtech-analyze-churn
version: 1.0.0
agents:
  - cs-edtech
tags:
  - churn
  - retention
  - customer-success
  - edtech
  - analysis
updated_at: 2025-01-28
```
