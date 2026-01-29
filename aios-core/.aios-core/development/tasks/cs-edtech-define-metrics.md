---

## Execution Modes

**Choose your execution mode:**

### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
- Autonomous decision making with logging
- Minimal user interaction
- **Best for:** Standard metric definitions

### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
- Explicit decision checkpoints
- Educational explanations
- **Best for:** Custom health scores, complex metric systems

### 3. Pre-Flight Planning - Comprehensive Upfront Planning
- Task analysis phase (identify all ambiguities)
- Zero ambiguity execution
- **Best for:** Full CS measurement framework

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOS Task Format V1.0)

```yaml
task: defineCSMetrics()
responsável: Stella (Navigator)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: metric_type
  tipo: enum
  origem: User Input
  obrigatório: true
  validação: health_score|kpis|dashboard|single_metric
  options:
    - health_score: Multi-dimensional customer health score
    - kpis: Set of KPIs for CS operations
    - dashboard: Minimal viable CS dashboard design
    - single_metric: Define a single specific metric

- campo: product_context
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Must include model, data sources, tools

- campo: maturity_level
  tipo: enum
  origem: User Input
  obrigatório: false
  validação: initial|growing|mature

**Saída:**
- campo: metrics_document
  tipo: markdown
  destino: File or Memory
  persistido: true

- campo: implementation_notes
  tipo: string
  destino: Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Product context understood (model, data sources available)
    tipo: pre-condition
    blocker: true
    validação: User provided product and data information
    error_message: "Need product context and available data sources"

  - [ ] Metric type selected
    tipo: pre-condition
    blocker: true
    validação: Valid metric type chosen
    error_message: "Need to know what type of metrics to define"
```

---

## Elicitation Steps

```yaml
elicitation:
  enabled: true
  steps:
    - step: 1
      name: product_data_context
      questions:
        - Qual produto e modelo de negócio?
        - Quais dados você consegue coletar hoje? (acesso a conteúdo, progresso, login, interações, etc.)
        - Qual ferramenta de analytics/CRM está em uso?
      required: true

    - step: 2
      name: current_state
      questions:
        - Quais métricas você já acompanha (se alguma)?
        - O que considera "sucesso" para um aluno neste produto?
        - Qual é o maior desafio atual? (churn, engajamento, ativação, etc.)
      required: true

    - step: 3
      name: capacity
      questions:
        - Quem vai acompanhar essas métricas? (time dedicado ou acumulado?)
        - Com que frequência consegue revisar métricas? (diário, semanal, mensal?)
      required: false
```

---

## Implementation Steps

### Step 1: Understand Data Landscape
Map what data is actually available:

| Data Type | Possible Sources | Priority |
|-----------|------------------|----------|
| Access/Login | LMS, Auth system | High |
| Progress | LMS, Course platform | High |
| Engagement | Platform analytics | High |
| Sentiment | NPS, CSAT, Support tickets | Medium |
| Community | Community platform, Social | Medium |
| Payment | Payment gateway, CRM | High |

### Step 2: Define Health Score (if applicable)

Structure for Health Score:

```markdown
# HEALTH SCORE: [Product Name]

## Dimensions

### 1. Engagement Score (Weight: 40%)
**Definition:** Measures active participation and content consumption

| Indicator | Weight | Calculation | Data Source |
|-----------|--------|-------------|-------------|
| Login frequency | 15% | Logins last 7 days / expected | Auth logs |
| Content consumption | 15% | Lessons completed / available | LMS |
| Time on platform | 10% | Minutes last 7 days | Analytics |

**Thresholds:**
- 🟢 Green: > 70%
- 🟡 Yellow: 40-70%
- 🔴 Red: < 40%

### 2. Progress Score (Weight: 35%)
**Definition:** Measures advancement toward learning goals

| Indicator | Weight | Calculation | Data Source |
|-----------|--------|-------------|-------------|
| Course progress | 20% | Modules completed / total | LMS |
| Assignment completion | 10% | Assignments done / assigned | LMS |
| Milestone achievement | 5% | Key milestones hit | Custom |

### 3. Sentiment Score (Weight: 25%)
**Definition:** Measures satisfaction and likelihood to continue

| Indicator | Weight | Calculation | Data Source |
|-----------|--------|-------------|-------------|
| NPS response | 10% | Last NPS score | Survey tool |
| Support tickets | 10% | Inverse of open tickets | Help desk |
| Community participation | 5% | Posts/reactions last 30d | Community |

## Overall Score Calculation
```
Health Score = (Engagement × 0.40) + (Progress × 0.35) + (Sentiment × 0.25)
```

## Action Triggers

| Score Range | Status | Action |
|-------------|--------|--------|
| 80-100 | Champion | Advocacy program, upsell opportunities |
| 60-79 | Healthy | Standard nurturing, celebrate wins |
| 40-59 | At Risk | Proactive outreach, identify blockers |
| 0-39 | Critical | Immediate intervention, personal contact |

## Leading Indicators (Early Warnings)
- 3+ days without login (after active period)
- Progress stall > 2 weeks
- Negative support interaction
- Community absence after initial engagement
```

### Step 3: Define KPIs (if applicable)

Structure for KPI Set:

```markdown
# CS KPIs: [Product Name]

## North Star Metric
**[Metric Name]:** [Definition]
- Why this matters: [Strategic importance]
- Target: [Benchmark]
- Measurement: [How and when]

## Primary KPIs

### 1. Retention Rate
**Definition:** Percentage of students who remain active/paying
**Formula:** (Students at end - New students) / Students at start × 100
**Frequency:** Monthly
**Benchmark (Edtech B2C Brazil):**
- Subscriptions: 85-90% monthly
- Courses: 70-80% completion cohort

### 2. Activation Rate
**Definition:** Percentage reaching "Aha Moment" within first X days
**Formula:** Students reaching milestone / New students × 100
**Frequency:** Weekly cohorts
**Benchmark:** 60-70% within first 7 days

### 3. Net Revenue Retention (NRR)
**Definition:** Revenue retained + expansion from existing base
**Formula:** (Starting MRR - Churn + Expansion) / Starting MRR × 100
**Frequency:** Monthly
**Benchmark:** > 100% (expansion > churn)

### 4. Time to First Value (TTFV)
**Definition:** Time until student experiences first meaningful win
**Formula:** Median time from signup to first milestone
**Frequency:** Per cohort
**Target:** < 48 hours

## Secondary KPIs
[Additional metrics based on specific needs]

## Anti-Metrics (What NOT to optimize for)
- Course completion rate alone (completion ≠ success)
- Vanity engagement metrics (page views without learning)
- Support ticket volume (fewer tickets ≠ better experience)
```

### Step 4: Design Dashboard (if applicable)

```markdown
# CS DASHBOARD: [Product Name]

## Dashboard Philosophy
- **Fewer metrics, better tracked**
- **Leading > Lagging indicators**
- **Actionable > Informational**

## Layout

### Top Row: Health Overview
| Widget | Metric | Update Frequency |
|--------|--------|------------------|
| Health Distribution | % Green/Yellow/Red students | Daily |
| At-Risk Count | Students with score < 40 | Real-time |
| Trend Arrow | Week-over-week change | Weekly |

### Second Row: Funnel Metrics
| Widget | Metric | Update Frequency |
|--------|--------|------------------|
| Activation Rate | % reaching Aha Moment | Weekly |
| Engagement Rate | Active students / Total | Daily |
| Churn Risk | Predicted churn this month | Weekly |

### Third Row: Alerts
| Alert Type | Trigger | Action Required |
|------------|---------|-----------------|
| Critical Student | Score drops below 30 | Immediate outreach |
| Cohort Anomaly | Activation < 50% for cohort | Review onboarding |
| Churn Spike | Churn > 2x average | Root cause analysis |

## Drill-Down Views
- Individual student health cards
- Cohort comparison view
- Segment analysis (by product, plan, source)
```

### Step 5: Single Metric Definition (if applicable)

```markdown
# METRIC: [Name]

## Definition
[Clear description of what this measures in plain language]

## Formula
```
[Calculation formula]
```

## Data Source
- **Primary:** [Where the data comes from]
- **Backup:** [Alternative source if primary unavailable]

## Collection
- **Frequency:** [How often to measure]
- **Responsibility:** [Who collects/calculates]
- **Tool:** [Where it's tracked]

## Interpretation
- **Good:** [What values indicate success]
- **Warning:** [Values requiring attention]
- **Critical:** [Values requiring immediate action]

## Benchmark
- **Industry (Edtech B2C):** [Reference value]
- **Our Target:** [Internal goal]
- **Why this target:** [Rationale]

## Actions

### If above target:
- [Action to maintain/improve]

### If below target:
- [Immediate action]
- [Root cause investigation]
- [Escalation if needed]

## Common Pitfalls
- [Mistake 1 to avoid]
- [Mistake 2 to avoid]
```

---

## Edtech B2C Benchmarks Reference

| Metric | Subscription | Closed Course | Cohort-Based |
|--------|--------------|---------------|--------------|
| Monthly Retention | 85-92% | N/A | 90-95% (within cohort) |
| Activation (7d) | 50-60% | 60-70% | 80-90% |
| Completion Rate | 15-25% (misleading) | 30-50% | 60-80% |
| NPS | 30-50 | 40-60 | 50-70 |
| Support Response | < 4h | < 24h | < 2h |

**Important Notes:**
- Completion rate is often misleading in edtech (students get value before completing)
- Brazilian market tends to have higher churn but also higher responsiveness to personal contact
- WhatsApp engagement rates are 3-5x higher than email

---

## Error Handling

```yaml
errors:
  - error: No Data Available
    cause: Metrics defined but no way to collect data
    resolution: Start with manual collection or proxies
    recovery: Identify minimum viable data collection method

  - error: Too Many Metrics
    cause: Trying to measure everything
    resolution: Apply "Metrics Minimum Viable" principle
    recovery: Choose 3-5 most impactful metrics only

  - error: Vanity Metrics
    cause: Metrics that look good but don't drive action
    resolution: Apply "So what?" test to each metric
    recovery: Replace with actionable metrics
```

---

## Success Output

```
✅ Metrics definition complete!

📊 Summary:
- Type: [Health Score / KPIs / Dashboard / Single Metric]
- Metrics defined: [Count]
- Data sources required: [List]

🎯 Key Metrics:
1. [Metric 1]: [Target] - [Data source]
2. [Metric 2]: [Target] - [Data source]
3. [Metric 3]: [Target] - [Data source]

📈 Implementation Priority:
1. [First metric to implement - easiest/most impactful]
2. [Second priority]
3. [Can wait for later]

⚠️ Prerequisites:
- [Data source 1 needs setup]
- [Tool integration required]
```

---

## Metadata

```yaml
task: cs-edtech-define-metrics
version: 1.0.0
agents:
  - cs-edtech
tags:
  - metrics
  - health-score
  - kpis
  - customer-success
  - edtech
updated_at: 2025-01-28
```
