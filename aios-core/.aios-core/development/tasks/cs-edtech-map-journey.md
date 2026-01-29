---

## Execution Modes

**Choose your execution mode:**

### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
- Autonomous decision making with logging
- Minimal user interaction
- **Best for:** Standard journey templates

### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
- Explicit decision checkpoints
- Educational explanations
- **Best for:** Custom journey mapping, complex products

### 3. Pre-Flight Planning - Comprehensive Upfront Planning
- Task analysis phase (identify all ambiguities)
- Zero ambiguity execution
- **Best for:** Multi-product journey ecosystem

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOS Task Format V1.0)

```yaml
task: mapStudentJourney()
responsável: Stella (Navigator)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: journey_scope
  tipo: enum
  origem: User Input
  obrigatório: true
  validação: full|stage|touchpoint
  options:
    - full: Complete end-to-end journey mapping
    - stage: Single stage deep dive
    - touchpoint: Specific touchpoint analysis

- campo: product_context
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Must include model, duration, key milestones

- campo: focus_area
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Specific area of concern or optimization

**Saída:**
- campo: journey_map
  tipo: markdown
  destino: File or Memory
  persistido: true

- campo: touchpoint_matrix
  tipo: table
  destino: Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Product context understood (model, typical duration, key milestones)
    tipo: pre-condition
    blocker: true
    validação: User provided product journey information
    error_message: "Need product context to map journey"

  - [ ] Definition of student success for this product
    tipo: pre-condition
    blocker: true
    validação: Clear success criteria defined
    error_message: "Need to define what success looks like for students"
```

---

## Elicitation Steps

```yaml
elicitation:
  enabled: true
  steps:
    - step: 1
      name: product_journey_context
      questions:
        - Qual produto e modelo? (assinatura, curso de X semanas, cohort, mentoria)
        - Qual a duração típica da jornada? (30 dias, 12 semanas, 1 ano, etc.)
        - O que significa "sucesso" para um aluno neste produto?
      required: true

    - step: 2
      name: current_touchpoints
      questions:
        - Quais pontos de contato existem hoje? (emails, WhatsApp, comunidade, lives, etc.)
        - Onde você percebe mais atrito/abandono na jornada atual?
        - Existe algum "momento mágico" que você já identificou?
      required: true

    - step: 3
      name: desired_outcome
      questions:
        - Qual o Desired Outcome do aluno? (O que ele realmente quer alcançar na vida?)
        - Quais são os marcos de sucesso intermediários? (Success Milestones)
      required: true
```

---

## Implementation Steps

### Step 1: Define Journey Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| Product Model | Type of educational product | Cohort-based, 8 weeks |
| Total Duration | Expected journey length | 8 weeks active + ongoing |
| Success Definition | What "winning" looks like | Launch first AI product |
| Key Milestones | Critical progress points | First project, Demo day |

### Step 2: Map Journey Stages

Standard Edtech B2C Journey Stages:

```markdown
# STUDENT JOURNEY MAP: [Product Name]

## Journey Overview

**Product:** [Name]
**Model:** [Subscription/Course/Cohort/Mentorship]
**Duration:** [Typical timeline]
**Desired Outcome:** [What student ultimately wants]

---

## Stage 1: AWARENESS → PURCHASE
**Duration:** Variable (marketing/sales)
**Not CS scope but impacts expectations**

### Handoff to CS:
- [ ] Clear expectations set
- [ ] Desired outcome documented
- [ ] Starting context known (experience level, goals)

---

## Stage 2: ONBOARDING (Days 0-7)
**Duration:** First 7 days

### Student Goal
[What the student wants to achieve in this stage]

### CS Goal
Get student to first success experience (Time to First Value)

### Moments of Truth
1. **Welcome Experience** (Day 0)
   - First impression sets expectations
   - Reduce overwhelm, increase confidence

2. **First Login** (Day 0-1)
   - Easy navigation to starting point
   - Clear "what's next" guidance

3. **First Win** (Day 1-3)
   - Quick, achievable first milestone
   - Celebration and recognition

### Touchpoints
| Day | Channel | Action | Owner |
|-----|---------|--------|-------|
| 0 | Email + WhatsApp | Welcome + access instructions | Automated |
| 1 | WhatsApp | Check if accessed, offer help | CS |
| 3 | In-app | First milestone celebration | Automated |
| 7 | WhatsApp | Progress check + next steps | CS |

### Success Signals
- ✅ Logged in within 24h
- ✅ Completed first lesson/module
- ✅ Joined community
- ✅ Responded to check-in positively

### Risk Signals
- ⚠️ No login within 48h
- ⚠️ Started but didn't complete first unit
- ⚠️ No community engagement
- ⚠️ Negative response or complaint

### Recommended Actions

**If Success Signals:**
- Celebrate and encourage continuation
- Introduce community features
- Preview upcoming content

**If Risk Signals:**
- Personal outreach to identify blockers
- Offer 1:1 quick call if needed
- Remove friction points

---

## Stage 3: ACTIVATION (Days 7-30)
**Duration:** Days 7-30

### Student Goal
[What the student wants to achieve - typically first meaningful project/result]

### CS Goal
Get student to "Aha Moment" - the point where value becomes clear

### Aha Moment Definition
[Specific milestone that indicates student "got it"]
Example: "Completed first AI-generated content for their business"

### Moments of Truth
1. **First Real Application** (Day 10-14)
   - Using learning in real context
   - Seeing tangible results

2. **Community Integration** (Day 14-21)
   - First meaningful community interaction
   - Peer connection and support

3. **Progress Milestone** (Day 21-30)
   - Clear advancement toward goal
   - Confidence building

### Touchpoints
| Day | Channel | Action | Owner |
|-----|---------|--------|-------|
| 10 | Email | Progress check + tips | Automated |
| 14 | WhatsApp | How's the first project going? | CS |
| 21 | Community | Highlight progress, encourage share | Community |
| 30 | Email + WhatsApp | Celebration + what's next | CS |

### Success Signals
- ✅ Completed Aha Moment milestone
- ✅ Active in community (posts or reactions)
- ✅ Progressing on schedule
- ✅ Positive sentiment in interactions

### Risk Signals
- ⚠️ Progress stalled > 5 days
- ⚠️ No community participation
- ⚠️ Questions indicating confusion
- ⚠️ Silence after initial engagement

---

## Stage 4: ENGAGEMENT (Ongoing)
**Duration:** Day 30+ (varies by model)

### Student Goal
[Continued progress toward Desired Outcome]

### CS Goal
Maintain momentum, prevent silent churn, deepen engagement

### Moments of Truth
1. **Ongoing Progress** (Continuous)
   - Regular advancement
   - New skill acquisition

2. **Community Contribution** (When ready)
   - Helping others
   - Sharing experiences

3. **Milestone Celebrations** (At key points)
   - Recognition of achievements
   - Social proof creation

### Engagement Loops
```
Trigger → Action → Variable Reward → Investment
  ↑                                      ↓
  ←────────────────────────────────────←
```

Example:
- **Trigger:** New module unlocked notification
- **Action:** Complete module
- **Reward:** Badge + community recognition
- **Investment:** Progress saved, peers congratulate

### Touchpoints
| Frequency | Channel | Action | Owner |
|-----------|---------|--------|-------|
| Weekly | Email | Progress digest + next steps | Automated |
| Bi-weekly | Community | Challenge or prompt | Community |
| Monthly | WhatsApp | Personal check-in | CS |
| At milestones | All | Celebration + testimonial ask | CS |

### Success Signals
- ✅ Consistent login pattern
- ✅ Progress advancing
- ✅ Community participation
- ✅ Positive health score

### Risk Signals
- ⚠️ Declining login frequency
- ⚠️ Progress plateau
- ⚠️ Community withdrawal
- ⚠️ Health score dropping

---

## Stage 5: SUCCESS / RENEWAL
**Duration:** End of journey/renewal period

### Student Goal
Achieve Desired Outcome, decide on continuation

### CS Goal
Confirm success, capture testimonial, secure renewal/referral

### Moments of Truth
1. **Success Confirmation** (Near completion)
   - Desired Outcome achieved
   - Transformation documented

2. **Testimonial Moment** (Peak positive emotion)
   - Capture success story
   - Social proof creation

3. **Renewal Decision** (Before period ends)
   - Clear value demonstration
   - Next level opportunity

### Touchpoints
| Timing | Channel | Action | Owner |
|--------|---------|--------|-------|
| -14 days | Email | Success recap + renewal preview | Automated |
| -7 days | WhatsApp | Personal renewal conversation | CS |
| -3 days | Email | Last chance + testimonial request | Automated |
| Day 0 | WhatsApp | Thank you + next steps | CS |

### Success Signals
- ✅ Desired Outcome achieved
- ✅ Testimonial provided
- ✅ Renewed or upgraded
- ✅ Referred others

### Risk Signals
- ⚠️ Desired Outcome not reached
- ⚠️ Unresponsive to renewal outreach
- ⚠️ Negative feedback
- ⚠️ Price objection

---

## Stage 6: ADVOCACY (Post-Success)
**Duration:** Ongoing

### Student Goal
Help others, maintain connection, continue growing

### CS Goal
Leverage success for referrals, testimonials, case studies

### Moments of Truth
1. **Referral Opportunity** (After success)
   - Ask for referrals
   - Provide easy referral mechanism

2. **Case Study Creation** (Best students)
   - Document transformation
   - Create marketing asset

3. **Community Leadership** (Engaged students)
   - Mentorship opportunities
   - Ambassador program

### Touchpoints
| Timing | Channel | Action | Owner |
|--------|---------|--------|-------|
| Post-success | WhatsApp | Referral request + incentive | CS |
| Quarterly | Email | Alumni newsletter + offers | Marketing |
| Ongoing | Community | Leadership opportunities | Community |

---

## Journey Metrics Summary

| Stage | Key Metric | Target |
|-------|------------|--------|
| Onboarding | Time to First Value | < 48h |
| Activation | Aha Moment Rate | > 60% |
| Engagement | Monthly Active Rate | > 70% |
| Success | Desired Outcome Rate | > 50% |
| Advocacy | NPS / Referral Rate | > 50 NPS |
```

### Step 3: Identify Gaps and Opportunities

After mapping current state:
- Where are the biggest drop-offs?
- Which touchpoints are missing?
- What moments of truth aren't being addressed?
- Where can automation help?
- Where is human touch essential?

### Step 4: Prioritize Improvements

Focus on:
1. **Quick wins:** Low effort, high impact
2. **Critical gaps:** High drop-off points
3. **Automation opportunities:** Repetitive touchpoints
4. **Later:** Nice-to-have improvements

---

## Error Handling

```yaml
errors:
  - error: Journey Too Complex
    cause: Trying to map every possible scenario
    resolution: Focus on ideal path first
    recovery: Map 80% case, note exceptions separately

  - error: Missing Data
    cause: Can't track journey stages
    resolution: Identify minimum tracking needed
    recovery: Start with manual tracking if needed

  - error: Disconnected Touchpoints
    cause: Touchpoints exist but not coordinated
    resolution: Create journey orchestration
    recovery: Assign ownership and create cadence
```

---

## Success Output

```
✅ Journey map complete!

🗺️ Summary:
- Stages mapped: [Number]
- Touchpoints defined: [Number]
- Moments of truth identified: [Number]

📍 Critical Touchpoints:
1. [Touchpoint 1] - [Why critical]
2. [Touchpoint 2] - [Why critical]
3. [Touchpoint 3] - [Why critical]

⚠️ Gaps Identified:
- [Gap 1] - [Recommended action]
- [Gap 2] - [Recommended action]

🚀 Next Steps:
1. Implement highest-impact touchpoint first
2. Set up tracking for key moments
3. Create playbooks for each stage
```

---

## Metadata

```yaml
task: cs-edtech-map-journey
version: 1.0.0
agents:
  - cs-edtech
tags:
  - journey
  - customer-success
  - edtech
  - touchpoints
updated_at: 2025-01-28
```
