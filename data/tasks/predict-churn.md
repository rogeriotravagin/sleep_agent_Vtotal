# Predict Churn - Customer Risk Prediction & Intervention System

## Purpose

Systematic churn prediction task based on Nick Mehta's Customer Success methodology from Gainsight. This task transforms reactive churn management ("they canceled, why?") into proactive risk identification ("who might cancel, and how do we save them?").

Churn doesn't happen suddenly—it builds up silently through declining engagement, unresolved issues, and eroding value perception. This task provides the complete framework to identify, score, and intervene before customers leave.

## When to Use

- **PROACTIVELY** - Building a churn early warning system from scratch
- **REACTIVELY** - After unexpected churn to prevent similar losses
- **STRATEGICALLY** - During QBRs to prioritize CS resources
- **OPERATIONALLY** - Weekly/monthly risk reviews
- **CRISIS MODE** - Renewal period with concerning signals

## Primary Agent

```yaml
primary_agent: nick-mehta
supporting_agents:
  - peter-fader  # CLV context for prioritization
  - sean-ellis   # Growth metrics correlation

nick_mehta_perspective:
  core_belief: "Churn is a symptom, not the disease. The disease is failure to deliver customer success."

  key_insight: |
    "If customers achieve their desired outcomes through your product,
    they don't churn. Churn prediction is really success prediction inverted."
```

---

## Metadata

```yaml
task:
  name: Predict Churn
  id: predict-churn
  version: "1.0"
  category: customer_success
  difficulty: intermediate
  estimated_effort: 2-4 weeks initial setup, ongoing refinement

  primary_agents:
    - nick-mehta

  supporting_agents:
    - peter-fader
    - sean-ellis

  outputs:
    - churn_risk_model
    - leading_indicators_list
    - intervention_playbooks
    - alert_system_config
    - tracking_dashboard

  prerequisites:
    - customer_data_access
    - usage_analytics
    - support_ticket_history
    - billing_data
```

---

## Nick Mehta's Churn Philosophy

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    MEHTA'S CHURN PREDICTION PRINCIPLES                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. CHURN IS PREDICTABLE                                                    │
│     "By the time a customer asks to cancel, you've already lost.            │
│      The decision was made weeks or months ago."                            │
│                                                                              │
│  2. LEADING INDICATORS > LAGGING OUTCOMES                                   │
│     "If you wait for renewal date to assess risk, it's too late.            │
│      The signals were there—you just weren't watching."                     │
│                                                                              │
│  3. SUCCESS PREVENTS CHURN                                                  │
│     "Don't focus on preventing churn. Focus on ensuring success.            │
│      If customers succeed, they don't leave."                               │
│                                                                              │
│  4. DATA + HUMAN JUDGMENT                                                   │
│     "Algorithms identify risk. Humans understand context.                   │
│      The best systems combine both."                                        │
│                                                                              │
│  5. INTERVENTION TIMING IS EVERYTHING                                       │
│     "A call 60 days before renewal saves accounts.                          │
│      The same call 7 days before is a waste of time."                       │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## PHASE 0: PRE-FLIGHT CHECK

### Required Data Sources

Before starting churn prediction, verify access to these data sources:

```yaml
data_requirements:

  product_usage_data:
    required: true
    sources:
      - application_analytics
      - feature_usage_logs
      - login_history
      - session_duration
    minimum_history: 6 months
    ideal_history: 12+ months

  support_data:
    required: true
    sources:
      - support_tickets
      - chat_transcripts
      - escalations
      - nps_csat_scores
    minimum_history: 6 months

  billing_data:
    required: true
    sources:
      - payment_history
      - failed_payments
      - plan_changes
      - expansion_contraction
    minimum_history: 12 months

  relationship_data:
    required: false_but_valuable
    sources:
      - champion_contacts
      - executive_sponsor
      - stakeholder_map
      - meeting_history

  external_signals:
    required: false_but_valuable
    sources:
      - company_news
      - layoff_announcements
      - funding_rounds
      - leadership_changes
      - competitor_mentions
```

### Pre-Flight Checklist

```
□ Data Sources Verified
  □ Product usage data accessible
  □ Support ticket history available
  □ Billing/payment data accessible
  □ Customer contact information current

□ Historical Analysis Possible
  □ Can identify past churned customers
  □ Have data from before they churned
  □ Can compare churned vs retained

□ Intervention Capability
  □ CS team can act on alerts
  □ Escalation path defined
  □ Executive sponsor access exists

□ Success Definition Clear
  □ Know what "customer success" looks like
  □ Have outcome metrics defined
  □ Can measure value delivery
```

---

## PHASE 1: CHURN DEFINITION

### Step 1.1: Define What Churn Means

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         CHURN DEFINITION FRAMEWORK                          │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Mehta: "If you can't define churn precisely, you can't predict it."       │
│                                                                              │
│  CHURN TYPES:                                                               │
│                                                                              │
│  1. CONTRACTUAL CHURN (Explicit)                                            │
│     - Customer cancels subscription                                          │
│     - Contract not renewed at term                                           │
│     - Formal termination notice received                                     │
│     → Easiest to track, but lagging indicator                               │
│                                                                              │
│  2. NON-CONTRACTUAL CHURN (Implicit)                                        │
│     - Customer stops using but doesn't cancel                                │
│     - "Zombie" accounts with no activity                                     │
│     - Month-to-month that silently lapses                                    │
│     → Requires activity-based definition                                    │
│                                                                              │
│  3. REVENUE CHURN (Contraction)                                             │
│     - Customer downgrades plan                                               │
│     - Reduces seats/users                                                    │
│     - Decreases usage-based spend                                            │
│     → Partial loss, often precursor to full churn                           │
│                                                                              │
│  4. LOGO CHURN (Complete Exit)                                              │
│     - Customer relationship ends entirely                                    │
│     - All products/services terminated                                       │
│     - No remaining revenue                                                   │
│     → Ultimate failure metric                                               │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

### Step 1.2: Churn Definition Template

```yaml
churn_definition:

  business_model: [subscription | usage_based | hybrid | perpetual]

  contractual_churn:
    definition: "Customer terminates contract or fails to renew"
    measurement_point: "Renewal date + grace period (if any)"
    grace_period_days: [0 | 7 | 30 | custom]

  activity_churn:
    definition: "No meaningful activity for X consecutive days"
    activity_threshold:
      metric: [logins | transactions | api_calls | custom]
      minimum_value: ____
      time_window_days: ____

  revenue_churn:
    definition: "MRR decreased by X% or more"
    threshold_percentage: ____
    measurement_period: "month_over_month | quarter_over_quarter"

  prediction_window:
    target: "Predict churn X days before it happens"
    days_before_churn: [30 | 60 | 90]
    rationale: "Allows time for intervention"
```

### Step 1.3: Churn Event Documentation

```
CHURN EVENT TAXONOMY:

┌─────────────────────────────────────────────────────────────────────────┐
│ CHURN TYPE          │ DEFINITION                  │ SIGNAL TIMING       │
├─────────────────────┼─────────────────────────────┼─────────────────────┤
│ Voluntary Cancel    │ Customer requests cancel    │ Usually 30-60d lag  │
│ Non-Renewal         │ Contract expires, no renew  │ Known date          │
│ Involuntary         │ Payment failure, no recover │ Payment attempt     │
│ Downgrade/Contract  │ Reduces to lower tier       │ Request submitted   │
│ Zombie              │ No activity > X days        │ Activity stops      │
│ Champion Loss       │ Key sponsor leaves company  │ LinkedIn/news       │
│ Acquisition         │ Customer acquired by other  │ M&A announcement    │
│ Bankruptcy          │ Customer goes out of bus    │ News/filing         │
└─────────────────────┴─────────────────────────────┴─────────────────────┘
```

---

## PHASE 2: LEADING INDICATORS

### Step 2.1: Identify Churn Signals

Nick Mehta categorizes signals into three tiers:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    LEADING INDICATOR HIERARCHY                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIER 1: RED FLAGS (Act Immediately - 48 hours)                            │
│  ───────────────────────────────────────────────────────────────────       │
│  ⚠️  Login decrease >50% month-over-month                                  │
│  ⚠️  Champion/sponsor left the company                                      │
│  ⚠️  Critical support ticket unresolved >7 days                             │
│  ⚠️  Explicitly mentioned competitor by name                                │
│  ⚠️  Requested data export or API access for "backup"                      │
│  ⚠️  Asked about contract termination clause                                │
│  ⚠️  Executive escalation submitted                                         │
│  ⚠️  Failed to attend scheduled renewal call                                │
│  ⚠️  Payment failed 2+ consecutive times                                    │
│                                                                              │
│  TIER 2: WARNING SIGNS (Act within 1-2 weeks)                              │
│  ───────────────────────────────────────────────────────────────────       │
│  ⚡  Usage decline 25-50% over 4 weeks                                      │
│  ⚡  Stopped using 2+ core features                                         │
│  ⚡  Support tickets trending up (3+ in 30 days)                            │
│  ⚡  NPS/CSAT dropped 20+ points                                            │
│  ⚡  No executive engagement in 90+ days                                    │
│  ⚡  Missed last QBR or EBR                                                 │
│  ⚡  Reduced user count by 20%+                                              │
│  ⚡  No response to 3+ outreach attempts                                    │
│  ⚡  Company announced layoffs                                               │
│                                                                              │
│  TIER 3: EARLY WARNINGS (Monitor closely - weekly review)                  │
│  ───────────────────────────────────────────────────────────────────       │
│  📊  Usage flat for 3+ months (no growth)                                   │
│  📊  Only 1 active user (key person risk)                                   │
│  📊  Never completed onboarding milestones                                  │
│  📊  Low feature adoption (<40% of plan features)                           │
│  📊  Declining email engagement                                              │
│  📊  No product feedback or feature requests                                │
│  📊  Hasn't attended webinar/community event                                │
│  📊  Contract value small relative to company size                          │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

### Step 2.2: Signal Measurement Framework

```yaml
signal_categories:

  product_usage_signals:
    metrics:
      - login_frequency:
          baseline: "Average logins per user per week"
          warning_threshold: "25% decline"
          critical_threshold: "50% decline"
          window: "4 weeks vs prior 4 weeks"

      - feature_usage:
          baseline: "% of paid features used monthly"
          warning_threshold: "<50% features used"
          critical_threshold: "<25% features used"
          window: "30 days"

      - depth_of_use:
          baseline: "Actions per session"
          warning_threshold: "30% decline"
          critical_threshold: "50% decline"
          window: "4 weeks"

      - time_in_product:
          baseline: "Minutes per user per day"
          warning_threshold: "25% decline"
          critical_threshold: "50% decline"
          window: "4 weeks"

      - api_calls:
          baseline: "Average daily API calls"
          warning_threshold: "40% decline"
          critical_threshold: "70% decline"
          window: "2 weeks"

  support_signals:
    metrics:
      - ticket_volume:
          baseline: "Average tickets per month"
          warning_threshold: "100% increase"
          critical_threshold: "200% increase"
          window: "30 days"

      - ticket_sentiment:
          baseline: "Average sentiment score"
          warning_threshold: "Negative sentiment 3+ tickets"
          critical_threshold: "Escalation requested"
          window: "60 days"

      - resolution_time:
          baseline: "Average time to resolution"
          warning_threshold: "Open tickets >7 days"
          critical_threshold: "Open tickets >14 days"
          window: "Current"

      - repeat_issues:
          baseline: "Same issue reported twice"
          warning_threshold: "Same issue 2x"
          critical_threshold: "Same issue 3x+"
          window: "90 days"

  engagement_signals:
    metrics:
      - email_engagement:
          baseline: "Open rate on product emails"
          warning_threshold: "<10% open rate"
          critical_threshold: "<5% open rate, unsubscribed"
          window: "Last 10 emails"

      - community_participation:
          baseline: "Posts/comments per month"
          warning_threshold: "0 activity for 60 days"
          critical_threshold: "0 activity for 90 days"
          window: "90 days"

      - event_attendance:
          baseline: "Webinar/training attendance"
          warning_threshold: "No attendance 6 months"
          critical_threshold: "Declined 3+ invitations"
          window: "6 months"

      - csm_responsiveness:
          baseline: "Response time to CSM outreach"
          warning_threshold: "No response to 2 attempts"
          critical_threshold: "No response to 3+ attempts"
          window: "30 days"

  relationship_signals:
    metrics:
      - champion_status:
          baseline: "Executive sponsor engaged"
          warning_threshold: "Champion changed roles"
          critical_threshold: "Champion left company"
          window: "Current"

      - stakeholder_depth:
          baseline: "Number of engaged stakeholders"
          warning_threshold: "Only 1 active contact"
          critical_threshold: "Primary contact unresponsive"
          window: "90 days"

      - nps_csat:
          baseline: "Last NPS/CSAT score"
          warning_threshold: "Score dropped 20+ points"
          critical_threshold: "Detractor (0-6 NPS)"
          window: "Last survey vs prior"

      - executive_engagement:
          baseline: "Exec meeting quarterly"
          warning_threshold: "No exec meeting 6 months"
          critical_threshold: "No exec access at all"
          window: "6 months"

  financial_signals:
    metrics:
      - payment_history:
          baseline: "On-time payments"
          warning_threshold: "1 late payment"
          critical_threshold: "2+ failed payments"
          window: "6 months"

      - contract_value_trend:
          baseline: "ARR trajectory"
          warning_threshold: "Downgrade requested"
          critical_threshold: "Significant contraction"
          window: "12 months"

      - seat_utilization:
          baseline: "Active users / paid seats"
          warning_threshold: "<50% utilization"
          critical_threshold: "<25% utilization"
          window: "90 days"

  external_signals:
    metrics:
      - company_health:
          sources: "News, LinkedIn, Crunchbase"
          warning_threshold: "Layoffs announced"
          critical_threshold: "Major restructuring, bankruptcy"
          window: "Current"

      - competitive_signals:
          sources: "Mentions, G2 reviews, conversations"
          warning_threshold: "Competitor mentioned"
          critical_threshold: "RFP for replacement"
          window: "6 months"

      - leadership_changes:
          sources: "LinkedIn, news"
          warning_threshold: "New CTO/VP Engineering"
          critical_threshold: "New CEO, major reorg"
          window: "6 months"
```

### Step 2.3: Signal Validation

```
SIGNAL VALIDATION PROCESS:

For each potential leading indicator, validate:

1. CORRELATION WITH CHURN
   Question: "Do customers who show this signal churn more often?"

   Analysis:
   - Calculate churn rate for customers WITH signal
   - Calculate churn rate for customers WITHOUT signal
   - Signal is valid if: WITH > WITHOUT by significant margin

   Example:
   - Customers with >50% login decline: 47% churn in 90 days
   - Customers without login decline: 8% churn in 90 days
   - Lift: 5.9x → VALID SIGNAL

2. LEAD TIME
   Question: "How far in advance does this signal appear?"

   Analysis:
   - Identify when signal first appeared for churned customers
   - Calculate average days between signal and churn
   - Signal is actionable if lead time > intervention time

   Example:
   - Champion departure detected: avg 67 days before churn
   - Intervention playbook needs: 30 days
   - Lead time sufficient → ACTIONABLE SIGNAL

3. ACTIONABILITY
   Question: "Can we do something about this signal?"

   Analysis:
   - Define intervention for each signal
   - Estimate success rate of intervention
   - Signal is actionable if intervention exists

   Example:
   - Signal: Usage decline 50%
   - Intervention: Re-onboarding, training, use-case discovery
   - Success rate: 35% save rate → ACTIONABLE

4. FALSE POSITIVE RATE
   Question: "How often does signal appear but customer doesn't churn?"

   Analysis:
   - Count times signal appeared
   - Count times signal preceded churn vs didn't
   - Acceptable false positive rate: <40%

   Example:
   - Signal triggered: 100 times
   - Led to churn: 65 times
   - False positive: 35% → ACCEPTABLE
```

---

## PHASE 3: CHURN SCORING MODEL

### Step 3.1: Scoring Approaches

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    CHURN SCORING APPROACHES                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  APPROACH 1: RULE-BASED SCORECARD (Start Here)                             │
│  ─────────────────────────────────────────────────────────────────         │
│  Best for: Starting out, <500 customers, limited data science              │
│                                                                              │
│  How it works:                                                              │
│  - Assign points to each risk signal                                        │
│  - Sum points = risk score                                                  │
│  - Define thresholds for action                                             │
│                                                                              │
│  Pros: Simple, explainable, fast to implement                              │
│  Cons: Doesn't learn, may miss complex patterns                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────         │
│                                                                              │
│  APPROACH 2: WEIGHTED COMPOSITE SCORE (Intermediate)                       │
│  ─────────────────────────────────────────────────────────────────         │
│  Best for: 500-5000 customers, some historical data                        │
│                                                                              │
│  How it works:                                                              │
│  - Weight signals by correlation with churn                                 │
│  - Normalize to 0-100 scale                                                 │
│  - Regression-based weights                                                 │
│                                                                              │
│  Pros: Data-driven weights, more accurate                                  │
│  Cons: Requires historical churn data, more setup                          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────         │
│                                                                              │
│  APPROACH 3: MACHINE LEARNING (Advanced)                                   │
│  ─────────────────────────────────────────────────────────────────         │
│  Best for: 5000+ customers, data science team, rich data                   │
│                                                                              │
│  How it works:                                                              │
│  - Train model on historical churn events                                   │
│  - Model learns signal importance automatically                             │
│  - Outputs probability score                                                │
│                                                                              │
│  Algorithms: Logistic Regression, Random Forest, XGBoost, Neural Net       │
│  Pros: Most accurate, finds hidden patterns                                │
│  Cons: Requires data science expertise, black box                          │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

### Step 3.2: Rule-Based Scorecard Template

```yaml
churn_risk_scorecard:

  version: "1.0"
  max_score: 100

  scoring_categories:

    product_usage:
      weight: 30
      signals:
        - signal: "Login decline >50% MoM"
          points: 15
          tier: "red_flag"

        - signal: "Login decline 25-50% MoM"
          points: 8
          tier: "warning"

        - signal: "No login in 14+ days"
          points: 12
          tier: "red_flag"

        - signal: "Feature adoption <25%"
          points: 8
          tier: "warning"

        - signal: "Usage flat 3+ months"
          points: 5
          tier: "early_warning"

    support_health:
      weight: 25
      signals:
        - signal: "Critical ticket open >7 days"
          points: 12
          tier: "red_flag"

        - signal: "3+ tickets in 30 days"
          points: 8
          tier: "warning"

        - signal: "Escalation submitted"
          points: 15
          tier: "red_flag"

        - signal: "Same issue reported 3x"
          points: 10
          tier: "red_flag"

        - signal: "Negative sentiment detected"
          points: 6
          tier: "warning"

    relationship:
      weight: 25
      signals:
        - signal: "Champion left company"
          points: 15
          tier: "red_flag"

        - signal: "No response to 3+ outreach"
          points: 12
          tier: "red_flag"

        - signal: "NPS detractor (0-6)"
          points: 10
          tier: "warning"

        - signal: "Missed renewal call"
          points: 12
          tier: "red_flag"

        - signal: "No exec engagement 6+ months"
          points: 6
          tier: "warning"

        - signal: "Only 1 active contact"
          points: 5
          tier: "early_warning"

    financial_billing:
      weight: 10
      signals:
        - signal: "2+ failed payments"
          points: 10
          tier: "red_flag"

        - signal: "Downgrade requested"
          points: 8
          tier: "warning"

        - signal: "Seat utilization <25%"
          points: 6
          tier: "warning"

    external_factors:
      weight: 10
      signals:
        - signal: "Company announced layoffs"
          points: 8
          tier: "warning"

        - signal: "Competitor mentioned"
          points: 6
          tier: "warning"

        - signal: "Requested data export"
          points: 10
          tier: "red_flag"

        - signal: "Asked about termination"
          points: 12
          tier: "red_flag"

  risk_thresholds:
    - range: "0-25"
      category: "Healthy"
      color: "green"
      action: "Standard engagement"

    - range: "26-50"
      category: "Monitor"
      color: "yellow"
      action: "Increased touchpoints"

    - range: "51-75"
      category: "At Risk"
      color: "orange"
      action: "Intervention playbook"

    - range: "76-100"
      category: "Critical"
      color: "red"
      action: "Immediate escalation"
```

### Step 3.3: Score Calculation Example

```
EXAMPLE: Calculating Risk Score for "Acme Corp"

┌─────────────────────────────────────────────────────────────────────────┐
│ CUSTOMER: Acme Corp                                                      │
│ ARR: $48,000                                                            │
│ Contract End: 90 days                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ SIGNALS DETECTED:                                                        │
│                                                                          │
│ [x] Login decline 35% MoM              →  8 points (warning)            │
│ [x] Champion changed roles             →  8 points (warning)            │
│ [x] 4 support tickets in 30 days       →  8 points (warning)            │
│ [x] No response to last 2 outreach     →  6 points (early warning)      │
│ [x] NPS dropped from 8 to 5 (detractor)→ 10 points (warning)            │
│ [ ] Critical ticket open - NO                                            │
│ [ ] Payment failed - NO                                                  │
│ [ ] Competitor mentioned - NO                                            │
│                                                                          │
│ TOTAL SCORE: 40 / 100                                                   │
│                                                                          │
│ RISK CATEGORY: MONITOR (Yellow)                                         │
│                                                                          │
│ RECOMMENDED ACTION:                                                      │
│ - Schedule executive alignment call                                      │
│ - Identify new champion/sponsor                                          │
│ - Review and resolve open tickets                                        │
│ - Conduct value realization session                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Step 3.4: Score Calibration

```yaml
score_calibration:

  process:
    1_initial_weights: "Set based on intuition and Mehta's guidance"
    2_historical_validation: "Back-test against known churned customers"
    3_adjust_weights: "Increase weight of signals that predicted accurately"
    4_ongoing_refinement: "Review quarterly, adjust based on results"

  calibration_metrics:

    accuracy: "What % of predictions were correct?"
    target: ">70%"

    precision: "Of customers flagged high-risk, what % actually churned?"
    target: ">60%"

    recall: "Of customers who churned, what % were flagged?"
    target: ">80%"

    lead_time: "How many days before churn was risk identified?"
    target: ">60 days"

  calibration_questions:
    - "Are we catching churned customers before they churn?"
    - "Are we generating too many false alarms (alert fatigue)?"
    - "Are certain signals over/under-weighted?"
    - "Are we missing any signals that churned customers showed?"
```

---

## PHASE 4: INTERVENTION PLAYBOOKS

### Step 4.1: Playbook by Risk Level

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    INTERVENTION PLAYBOOK FRAMEWORK                          │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Mehta: "A risk score without an action plan is just expensive reporting." │
│                                                                              │
│  PRINCIPLE: Each risk level has a specific playbook.                       │
│  Don't improvise. Execute the playbook.                                    │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘

PLAYBOOK: CRITICAL RISK (Score 76-100)
══════════════════════════════════════

Timeline: Act within 48 hours
Owner: CSM + CS Manager + Executive Sponsor

Day 1-2: Immediate Response
───────────────────────────
□ Alert CS Manager immediately
□ Review all account data (usage, tickets, contacts)
□ Draft personalized outreach (not template)
□ Identify highest-level contact available
□ Schedule same-day/next-day call if possible

Day 3-7: Executive Engagement
────────────────────────────
□ Escalate to executive sponsor internally
□ Request exec-to-exec call
□ Prepare value realization summary
□ Create custom save offer if applicable
□ Document all contact attempts

Day 8-14: Save Attempt
─────────────────────
□ Present value received vs expected
□ Acknowledge issues transparently
□ Propose specific remediation plan
□ Offer concession if warranted (discount, extended support)
□ Get commitment to specific next steps

Day 15-30: Stabilization or Transition
─────────────────────────────────────
□ If saved: Implement remediation, increase monitoring
□ If lost: Begin transition planning, exit interview
□ Document lessons learned
□ Update churn prediction model


PLAYBOOK: AT RISK (Score 51-75)
══════════════════════════════

Timeline: Begin within 1 week
Owner: CSM with Manager visibility

Week 1: Assessment
─────────────────
□ Deep-dive on all risk signals
□ Review recent interactions/tickets
□ Check contract renewal date
□ Identify specific concerns to address
□ Plan outreach strategy

Week 2: Proactive Engagement
───────────────────────────
□ Schedule business review call
□ Prepare value report (ROI, usage, outcomes)
□ Identify expansion opportunities (show investment)
□ Gather internal success stories similar to their use case
□ Draft re-engagement campaign

Week 3-4: Value Reinforcement
────────────────────────────
□ Conduct business review
□ Present value delivered
□ Address concerns directly
□ Propose success plan for next 90 days
□ Secure commitment to success plan

Week 5-8: Monitoring
───────────────────
□ Weekly check-ins
□ Monitor risk score changes
□ Ensure success plan execution
□ Escalate if score increases
□ Move to standard engagement if score decreases


PLAYBOOK: MONITOR (Score 26-50)
══════════════════════════════

Timeline: Within 2 weeks
Owner: CSM

Bi-Weekly Actions:
─────────────────
□ Review account health dashboard
□ Check for new risk signals
□ Send personalized check-in (not template)
□ Share relevant content (case study, webinar, feature)
□ Update stakeholder map

Monthly Actions:
───────────────
□ Conduct mini-business review
□ Review feature adoption
□ Identify training opportunities
□ Check for expansion signals
□ Plan advocacy engagement


PLAYBOOK: HEALTHY (Score 0-25)
═════════════════════════════

Timeline: Ongoing cadence
Owner: CSM (may be pooled/digital for smaller accounts)

Quarterly Actions:
─────────────────
□ QBR or digital business review
□ NPS/CSAT survey
□ Feature adoption review
□ Expansion opportunity assessment
□ Advocacy request (case study, referral, review)

Ongoing:
───────
□ Standard email nurtures
□ Product updates and release notes
□ Community engagement
□ Event invitations
□ Proactive support monitoring
```

### Step 4.2: Intervention by Signal Type

```yaml
signal_specific_interventions:

  usage_decline:
    signals:
      - "Login decline >50%"
      - "Feature usage dropped"
      - "Session duration decreased"

    interventions:
      - name: "Re-Onboarding Session"
        owner: "CSM"
        timing: "Within 5 days"
        actions:
          - "Schedule call to understand usage drop"
          - "Identify if needs changed or obstacles arose"
          - "Offer guided re-onboarding on key features"
          - "Create 30-day adoption plan"
        success_metric: "Usage returns to baseline within 30 days"

      - name: "Use Case Discovery"
        owner: "CSM"
        timing: "Within 7 days"
        actions:
          - "Interview stakeholders on goals"
          - "Map current workflows"
          - "Identify product-market fit gaps"
          - "Propose alternative use cases"
        success_metric: "New use case identified and adopted"

      - name: "Training Boost"
        owner: "CSM + Training"
        timing: "Within 10 days"
        actions:
          - "Assess team's skill level"
          - "Deliver targeted training session"
          - "Provide self-serve resources"
          - "Set up office hours access"
        success_metric: "Training completed, usage increase"

  champion_loss:
    signals:
      - "Champion left company"
      - "Champion changed roles"
      - "Champion went silent"

    interventions:
      - name: "Champion Succession"
        owner: "CSM + AE"
        timing: "Within 48 hours"
        actions:
          - "Identify potential new champions"
          - "Reach out to other known contacts"
          - "Request intro from departing champion"
          - "Expand stakeholder map urgently"
        success_metric: "New champion identified within 2 weeks"

      - name: "Executive Alignment"
        owner: "CSM Manager"
        timing: "Within 1 week"
        actions:
          - "Escalate to exec sponsor internally"
          - "Request exec-to-exec meeting"
          - "Reestablish strategic relationship"
          - "Align on success criteria"
        success_metric: "Executive relationship established"

  support_issues:
    signals:
      - "Critical ticket unresolved"
      - "High ticket volume"
      - "Escalation submitted"
      - "Negative sentiment"

    interventions:
      - name: "Support Escalation"
        owner: "CSM + Support Lead"
        timing: "Within 24 hours"
        actions:
          - "Review all open tickets"
          - "Escalate to senior support"
          - "Set customer expectation on resolution"
          - "Follow up daily until resolved"
        success_metric: "Tickets resolved, CSAT recovered"

      - name: "Root Cause Analysis"
        owner: "CSM + Product"
        timing: "Within 1 week"
        actions:
          - "Analyze ticket patterns"
          - "Identify systemic issues"
          - "Escalate to product if needed"
          - "Communicate resolution plan"
        success_metric: "Recurring issues eliminated"

  relationship_signals:
    signals:
      - "No response to outreach"
      - "Missed scheduled calls"
      - "NPS detractor"

    interventions:
      - name: "Multi-Channel Outreach"
        owner: "CSM"
        timing: "Staggered over 2 weeks"
        actions:
          - "Email (personalized, value-focused)"
          - "Phone call"
          - "LinkedIn message"
          - "Executive-to-exec email"
        success_metric: "Response received"

      - name: "NPS Recovery"
        owner: "CSM + Manager"
        timing: "Within 48 hours of survey"
        actions:
          - "Call to understand feedback"
          - "Acknowledge issues sincerely"
          - "Create action plan"
          - "Follow up on commitments"
        success_metric: "NPS improves on next survey"

  financial_signals:
    signals:
      - "Payment failed"
      - "Downgrade requested"
      - "Low seat utilization"

    interventions:
      - name: "Payment Recovery"
        owner: "CSM + AR"
        timing: "Within 24 hours"
        actions:
          - "Contact billing contact"
          - "Identify payment issue"
          - "Offer payment alternatives"
          - "Extend grace period if needed"
        success_metric: "Payment recovered"

      - name: "Value Defense"
        owner: "CSM"
        timing: "Before downgrade processed"
        actions:
          - "Understand reason for downgrade"
          - "Present ROI and value received"
          - "Offer alternative to downgrade"
          - "If downgrade proceeds, plan re-expansion"
        success_metric: "Downgrade prevented or minimized"
```

### Step 4.3: Save Offer Framework

```
SAVE OFFER DECISION MATRIX:

┌─────────────────────────────────────────────────────────────────────────┐
│ When to Offer Concessions to Save Account                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ Mehta: "A save offer is an investment, not a discount.                  │
│         Only invest where you'll get a return."                         │
│                                                                          │
│ EVALUATE BEFORE OFFERING:                                                │
│                                                                          │
│ 1. CUSTOMER VALUE                                                        │
│    □ CLV > acquisition cost + save offer cost?                          │
│    □ Strategic account (logo, reference, network)?                      │
│    □ Growth potential if saved?                                          │
│                                                                          │
│ 2. SAVE PROBABILITY                                                      │
│    □ Issue is within our control to fix?                                │
│    □ Customer willing to engage in save process?                        │
│    □ Not already committed to competitor?                               │
│                                                                          │
│ 3. PRECEDENT IMPACT                                                      │
│    □ Won't train customer to threaten for discounts?                    │
│    □ Offer is one-time, clearly communicated?                           │
│    □ Tied to specific commitment from customer?                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

SAVE OFFER OPTIONS (by situation):

┌────────────────────┬─────────────────────────────────────────────────────┐
│ SITUATION          │ APPROPRIATE OFFERS                                  │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Underusing product │ Free training, extended onboarding, success plan   │
│ Budget constraints │ Flexible payment terms, temporary discount         │
│ Feature gaps       │ Roadmap commitment, early access, custom dev       │
│ Support issues     │ Dedicated support, SLA upgrade, service credits    │
│ Champion loss      │ Exec engagement, dedicated CSM, success partner    │
│ Competitor threat  │ Price match (if strategic), feature comparison     │
└────────────────────┴─────────────────────────────────────────────────────┘

SAVE OFFER TEMPLATE:

"[Customer], I understand you're considering [churn action].

Before you make that decision, I want to propose [specific offer]:

- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

In exchange, we'd ask for [commitment]:
- [Customer action 1]
- [Customer action 2]
- [Customer action 3]

This is a one-time investment we're making because we believe in your success.
Can we schedule a call to discuss?"
```

---

## PHASE 5: TRACKING & FEEDBACK LOOPS

### Step 5.1: Churn Prediction Dashboard

```yaml
dashboard_components:

  executive_summary:
    metrics:
      - total_arr_at_risk: "Sum of ARR for accounts in At Risk + Critical"
      - accounts_by_risk_level:
          healthy: count
          monitor: count
          at_risk: count
          critical: count
      - risk_trend: "MoM change in at-risk accounts"
      - save_rate: "% of at-risk accounts saved in last 90 days"
      - churn_prediction_accuracy: "% of predictions that were correct"

    visualizations:
      - risk_distribution_pie_chart
      - arr_at_risk_bar_chart
      - risk_trend_line_chart
      - save_rate_gauge

  account_risk_list:
    columns:
      - account_name
      - arr
      - risk_score
      - risk_category
      - primary_risk_signals
      - days_until_renewal
      - csm_owner
      - last_intervention_date
      - intervention_status

    filters:
      - risk_category
      - csm_owner
      - renewal_date_range
      - arr_range
      - industry_segment

    sorting:
      - default: risk_score_descending
      - options:
          - arr_descending
          - renewal_date_ascending
          - last_intervention_ascending

  signal_analysis:
    views:
      - signals_by_frequency: "Which signals appear most often?"
      - signals_by_accuracy: "Which signals best predict churn?"
      - signals_by_lead_time: "Which signals give most warning?"
      - signals_by_actionability: "Which signals can we address?"

    charts:
      - signal_correlation_matrix
      - signal_frequency_bar
      - lead_time_distribution

  intervention_tracking:
    metrics:
      - interventions_in_progress
      - average_intervention_duration
      - intervention_success_rate
      - time_to_first_intervention

    lists:
      - active_interventions
      - completed_interventions
      - overdue_interventions
```

### Step 5.2: Feedback Loop System

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       CHURN PREDICTION FEEDBACK LOOP                        │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    ┌─────────────────┐                                      │
│                    │   PREDICTION    │                                      │
│                    │  Generate Score │                                      │
│                    └────────┬────────┘                                      │
│                             │                                                │
│                             ▼                                                │
│                    ┌─────────────────┐                                      │
│                    │   INTERVENTION  │                                      │
│                    │  Execute Playbook│                                     │
│                    └────────┬────────┘                                      │
│                             │                                                │
│                             ▼                                                │
│                    ┌─────────────────┐                                      │
│                    │    OUTCOME      │                                      │
│                    │  Saved or Churned│                                     │
│                    └────────┬────────┘                                      │
│                             │                                                │
│                             ▼                                                │
│                    ┌─────────────────┐                                      │
│                    │   ANALYSIS      │                                      │
│                    │ What worked/didn't│                                    │
│                    └────────┬────────┘                                      │
│                             │                                                │
│                             ▼                                                │
│                    ┌─────────────────┐                                      │
│                    │   REFINEMENT    │                                      │
│                    │ Update Model    │◄──────────────────────────┐         │
│                    └────────┬────────┘                           │         │
│                             │                                     │         │
│                             └─────────────────────────────────────┘         │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘

FEEDBACK LOOP CADENCE:

Daily:
  □ Review new Critical accounts
  □ Update intervention status
  □ Log customer interactions

Weekly:
  □ Review At Risk accounts
  □ Analyze intervention effectiveness
  □ Identify stuck interventions
  □ Update risk scores

Monthly:
  □ Calculate prediction accuracy
  □ Review signal performance
  □ Identify new signals to add
  □ Retire underperforming signals

Quarterly:
  □ Full model calibration
  □ Weight adjustment
  □ Threshold review
  □ Playbook effectiveness analysis
  □ Report to leadership
```

### Step 5.3: Model Refinement Process

```yaml
model_refinement:

  accuracy_tracking:
    metrics_to_calculate:
      - true_positives: "Predicted churn, actually churned"
      - false_positives: "Predicted churn, actually retained"
      - true_negatives: "Predicted retain, actually retained"
      - false_negatives: "Predicted retain, actually churned"

    derived_metrics:
      - accuracy: "(TP + TN) / (TP + TN + FP + FN)"
      - precision: "TP / (TP + FP)"
      - recall: "TP / (TP + FN)"
      - f1_score: "2 * (precision * recall) / (precision + recall)"

  signal_refinement:
    process:
      1: "List all signals"
      2: "Calculate correlation with actual churn for each"
      3: "Rank signals by predictive power"
      4: "Increase weight for high-correlation signals"
      5: "Decrease weight or remove low-correlation signals"
      6: "Identify new signals from churned account analysis"

    questions_to_ask:
      - "What signals did churned customers show that we didn't track?"
      - "What signals triggered false alarms frequently?"
      - "Are there industry-specific signals we're missing?"
      - "Are timing/thresholds optimized?"

  threshold_adjustment:
    review_questions:
      - "Are we flagging too many accounts (alert fatigue)?"
      - "Are we missing accounts that churned (insufficient coverage)?"
      - "Is the distribution across risk levels balanced?"
      - "Do CS teams have capacity for current alert volume?"

    adjustment_guidelines:
      - "If too many false positives: Raise thresholds"
      - "If too many false negatives: Lower thresholds"
      - "If CS overwhelmed: Prioritize by ARR"
      - "If CS underutilized: Expand coverage"
```

---

## PHASE 6: OPERATIONALIZATION

### Step 6.1: Alert System Configuration

```yaml
alert_configuration:

  alert_channels:
    - email: "CSM and Manager"
    - slack: "#customer-success-alerts"
    - crm: "Task created in Salesforce"
    - cs_platform: "CTA in Gainsight/ChurnZero"

  alert_rules:

    critical_risk:
      trigger: "Score crosses 75"
      channels: ["email", "slack", "crm", "cs_platform"]
      recipients: ["csm", "cs_manager", "cs_director"]
      frequency: "Immediate + daily until resolved"
      sla: "Response within 4 hours"
      escalation: "Auto-escalate if no action in 24 hours"

    at_risk:
      trigger: "Score crosses 50"
      channels: ["email", "cs_platform"]
      recipients: ["csm", "cs_manager"]
      frequency: "Immediate + weekly summary"
      sla: "Response within 48 hours"
      escalation: "Auto-escalate if no action in 1 week"

    monitor:
      trigger: "Score crosses 25"
      channels: ["cs_platform"]
      recipients: ["csm"]
      frequency: "Weekly summary"
      sla: "Response within 1 week"
      escalation: "None"

    signal_specific:
      - trigger: "Champion left"
        channels: ["email", "slack"]
        recipients: ["csm", "cs_manager", "ae"]
        frequency: "Immediate"
        sla: "Response within 24 hours"

      - trigger: "Competitor mentioned"
        channels: ["email", "slack"]
        recipients: ["csm", "ae", "sales_manager"]
        frequency: "Immediate"
        sla: "Response within 4 hours"

      - trigger: "Data export requested"
        channels: ["email", "slack"]
        recipients: ["csm", "cs_manager"]
        frequency: "Immediate"
        sla: "Response within 4 hours"

  alert_template:
    subject: "[CHURN ALERT] {customer_name} - {risk_level}"
    body: |
      Customer: {customer_name}
      Risk Score: {score}/100 ({risk_level})
      ARR: {arr}
      Renewal Date: {renewal_date}

      Risk Signals Triggered:
      {signal_list}

      Recommended Action:
      {recommended_playbook}

      Account Owner: {csm_name}

      [View Account] [Start Intervention]
```

### Step 6.2: Team Workflow Integration

```
CS TEAM DAILY WORKFLOW WITH CHURN PREDICTION:

Morning (30 min):
────────────────
□ Review overnight alerts (Critical first)
□ Check dashboard for new At Risk accounts
□ Update intervention status for active saves
□ Plan day's outreach based on priorities

Throughout Day:
──────────────
□ Execute intervention playbooks
□ Log all customer interactions
□ Update signal status (resolved/ongoing)
□ Escalate as needed

End of Day (15 min):
───────────────────
□ Update CRM/CS platform with notes
□ Move interventions forward in pipeline
□ Flag any blockers for manager
□ Check tomorrow's scheduled activities


CS MANAGER WEEKLY WORKFLOW:

Monday:
──────
□ Review all Critical accounts
□ Assign/reassign CSM coverage
□ Approve save offers if needed
□ Align with Sales on at-risk renewals

Wednesday:
─────────
□ Pipeline review meeting
□ Intervention effectiveness check
□ Coach CSMs on stuck accounts
□ Identify systemic issues

Friday:
──────
□ Weekly metrics review
□ Prepare leadership report
□ Plan next week's priorities
□ Recognize wins (saves accomplished)


CS DIRECTOR MONTHLY WORKFLOW:

Week 1:
──────
□ Review churn prediction accuracy
□ Analyze model performance
□ Approve signal/weight changes
□ Executive at-risk account review

Week 2:
──────
□ Customer success QBR prep
□ Save rate analysis
□ Intervention playbook review
□ Team capacity assessment

Week 3:
──────
□ Cross-functional alignment (Sales, Product)
□ Escalation review
□ Process improvement identification
□ Customer feedback synthesis

Week 4:
──────
□ Board/leadership reporting
□ Strategic planning
□ Model refinement approval
□ Next month priorities
```

### Step 6.3: Reporting Cadence

```yaml
reporting:

  daily_report:
    audience: "CS Team"
    distribution: "Slack + Email"
    content:
      - new_critical_accounts
      - new_at_risk_accounts
      - interventions_due_today
      - save_wins_yesterday
    format: "Brief summary (3-5 min read)"

  weekly_report:
    audience: "CS Leadership"
    distribution: "Email + Meeting"
    content:
      - risk_distribution_change
      - intervention_pipeline_status
      - save_rate_trailing_30_days
      - notable_saves_and_losses
      - top_risk_accounts_by_arr
    format: "Dashboard + commentary"

  monthly_report:
    audience: "Executive Team"
    distribution: "Presentation"
    content:
      - churn_prediction_accuracy
      - arr_at_risk_trend
      - save_rate_vs_target
      - model_improvements_made
      - resource_recommendations
    format: "Executive summary + details"

  quarterly_report:
    audience: "Board/Investors"
    distribution: "Presentation"
    content:
      - net_retention_rate
      - churn_rate_trend
      - early_warning_effectiveness
      - roi_of_cs_investment
    format: "Strategic narrative"
```

---

## Elicitation Questions

Before beginning churn prediction setup, gather this information:

### Business Context

```yaml
elicitation:

  business_model:
    - "What is your billing model? (monthly, annual, usage-based, hybrid)"
    - "What is your average contract length?"
    - "Do customers sign contracts or go month-to-month?"
    - "What is your current churn rate? (monthly and annual)"

  customer_base:
    - "How many active customers do you have?"
    - "What is your ARR range? (smallest to largest customer)"
    - "Do you segment customers by size/tier?"
    - "What industries do your customers come from?"

  current_state:
    - "Do you have any churn prediction in place today?"
    - "What data do you currently track?"
    - "How does your CS team currently identify at-risk accounts?"
    - "What tools do you use? (CRM, CS platform, analytics)"

  past_churn:
    - "Can you identify customers who churned in the last 12 months?"
    - "Do you have data from before they churned?"
    - "Have you done exit interviews or surveys?"
    - "What were the common reasons for churn?"
```

### Data Availability

```yaml
data_questions:

  product_data:
    - "Do you track login/usage data? At what granularity?"
    - "Can you measure feature adoption?"
    - "Do you have a product analytics tool? (Amplitude, Mixpanel, Heap)"
    - "Is data accessible via API or export?"

  support_data:
    - "Where are support tickets tracked? (Zendesk, Intercom, Freshdesk)"
    - "Do you categorize tickets by type/severity?"
    - "Do you track ticket sentiment?"
    - "Is NPS/CSAT tracked at account level?"

  relationship_data:
    - "Do you track customer contacts and stakeholders?"
    - "Do you know who the champion/sponsor is for each account?"
    - "Do you log CSM touchpoints and meeting notes?"
    - "Is executive engagement tracked?"
```

### Team Context

```yaml
team_questions:

  cs_team:
    - "How large is your CS team?"
    - "How many accounts per CSM?"
    - "What is the CSM engagement model? (high-touch, tech-touch, pooled)"
    - "Do CSMs have capacity for proactive intervention?"

  processes:
    - "Do you have playbooks for at-risk accounts today?"
    - "What is the renewal process?"
    - "How far in advance do you start renewal conversations?"
    - "Who owns save/retain conversations? (CS, AE, Manager)"

  tools:
    - "What CS platform do you use, if any?"
    - "Can it trigger alerts and workflows?"
    - "Where should risk scores live?"
    - "What reporting tools does leadership use?"
```

---

## Output Format

### Churn Prediction Deliverable

```yaml
deliverable_structure:

  1_churn_definition:
    contents:
      - churn_event_types_defined
      - measurement_methodology
      - prediction_window_set
    format: "Documentation (markdown or wiki)"

  2_leading_indicators:
    contents:
      - signal_inventory_complete
      - signals_validated_historically
      - measurement_thresholds_set
    format: "Configuration table"

  3_risk_scoring_model:
    contents:
      - scorecard_or_model_defined
      - weights_calibrated
      - thresholds_set
    format: "Spreadsheet or config file"

  4_intervention_playbooks:
    contents:
      - playbook_per_risk_level
      - signal_specific_interventions
      - save_offer_framework
    format: "Documented playbooks"

  5_alert_system:
    contents:
      - alert_rules_configured
      - notification_channels_set
      - escalation_paths_defined
    format: "System configuration"

  6_dashboard:
    contents:
      - risk_distribution_view
      - account_list_view
      - signal_analysis_view
      - intervention_tracking
    format: "Dashboard (Looker, Tableau, Metabase)"

  7_operating_procedures:
    contents:
      - daily_weekly_monthly_workflows
      - reporting_cadence
      - feedback_loop_process
    format: "Process documentation"
```

### Sample Output Summary

```
CHURN PREDICTION SYSTEM SUMMARY
═══════════════════════════════

Churn Definition:
- Primary: Contract non-renewal
- Secondary: 60 days no login (activity churn)
- Prediction Window: 90 days before churn event

Leading Indicators (25 signals identified):
- Tier 1 Red Flags: 9 signals
- Tier 2 Warnings: 10 signals
- Tier 3 Early Warnings: 6 signals
- Top predictors: Champion loss (6.2x), Login decline (5.9x), NPS detractor (4.1x)

Risk Scoring:
- Model: Rule-based scorecard (v1)
- Max Score: 100
- Thresholds: Healthy (0-25), Monitor (26-50), At Risk (51-75), Critical (76-100)

Intervention Playbooks:
- 4 risk-level playbooks defined
- 12 signal-specific interventions
- Save offer framework approved

Alert System:
- Channels: Slack, Email, Salesforce
- SLAs: Critical (4hr), At Risk (48hr), Monitor (1 week)
- Escalation paths defined

Dashboard:
- Built in [tool]
- Views: Executive, Account List, Signal Analysis, Interventions
- Access: CS Team, Leadership

Operating Rhythm:
- Daily: Alert review, intervention updates
- Weekly: Pipeline review, manager check-in
- Monthly: Accuracy review, model refinement
- Quarterly: Full calibration, leadership report
```

---

## Examples

### Example 1: SaaS Company Initial Setup

```
CONTEXT:
- B2B SaaS, 450 customers
- ARR range: $12K - $240K
- Current churn: 15% annual (logo), 12% revenue
- No formal churn prediction today
- 5 CSMs, 1 CS Manager

APPROACH:
Started with rule-based scorecard (Approach 1)

KEY SIGNALS IDENTIFIED:
1. Login decline >40% MoM (historical correlation: 5.8x)
2. Support tickets 3+ in 30 days (correlation: 3.2x)
3. Champion changed/left (correlation: 6.1x)
4. NPS detractor (correlation: 4.5x)
5. No CSM response in 2 weeks (correlation: 3.8x)

SCORECARD WEIGHTS:
- Product Usage: 35%
- Support Health: 25%
- Relationship: 25%
- Financial: 10%
- External: 5%

RESULTS AFTER 6 MONTHS:
- Prediction accuracy: 74%
- Save rate: 38% (up from 22%)
- Churn reduced: 15% → 11% annual
- ARR saved: $847K
```

### Example 2: High-Volume Digital Product

```
CONTEXT:
- Freemium + paid tiers
- 12,000 paid customers
- Mostly self-serve, low-touch
- High volume = ML approach needed

APPROACH:
Machine learning model (Approach 3)

MODEL INPUTS:
- 47 features across usage, support, billing
- 24 months historical data
- 2,400 churn events in training set

MODEL ARCHITECTURE:
- Algorithm: XGBoost
- Features: 47 → reduced to 23 (feature importance)
- Output: Probability score 0-100%

TOP PREDICTIVE FEATURES:
1. Days since last login (importance: 0.18)
2. Feature adoption % (importance: 0.14)
3. Session duration trend (importance: 0.12)
4. Support ticket count (importance: 0.09)
5. Payment failure count (importance: 0.08)

ALERT THRESHOLDS:
- High Risk: >70% probability
- Medium Risk: 40-70% probability
- Low Risk: <40% probability

AUTOMATION:
- High Risk: Auto-email + CSM alert
- Medium Risk: Auto-email sequence
- Low Risk: Standard nurture

RESULTS:
- Model AUC: 0.82
- Precision: 68%
- Recall: 79%
- Prevented churn: 340 accounts / quarter
```

### Example 3: Enterprise Account Churn Prediction

```
CONTEXT:
- Enterprise SaaS
- 85 customers
- ARR range: $200K - $2.5M
- High-touch CS model
- Cannot afford to lose any account

APPROACH:
Weighted composite with heavy human judgment

UNIQUE SIGNALS FOR ENTERPRISE:
1. Executive sponsor engagement (quarterly meetings)
2. Business review attendance
3. Strategic roadmap alignment
4. Multi-year commitment status
5. Reference/advocacy participation
6. Expansion pipeline

RISK SCORING ADAPTATION:
- Higher weight on relationship signals (40%)
- External signals more important (layoffs, M&A)
- Champion tracking more granular
- Stakeholder depth critical

INTERVENTION DIFFERENCES:
- Every At Risk = executive involvement
- Save offers include strategic elements
- Product roadmap customization
- Contract flexibility (multi-year incentives)

RESULTS:
- Zero surprise churns in 18 months
- All at-risk accounts identified 90+ days early
- Save rate: 67% (high for enterprise)
- Net retention: 118%
```

---

## Integration

### Related Tasks

- **calculate-clv.md** - Prioritize interventions by customer value
- **segment-rfm.md** - Segment-specific churn patterns
- **design-health-score.md** - Health score feeds into churn prediction
- **run-pmf-test.md** - PMF correlation with retention

### Related Agents

- **nick-mehta** - Primary methodology owner
- **peter-fader** - CLV-based prioritization
- **sean-ellis** - Growth correlation analysis

### Related Checklists

- **health-score-checklist.md** - Validate health score inputs
- **customer-360-checklist.md** - Data completeness for prediction

### Tool Integrations

```yaml
tool_integrations:

  cs_platforms:
    - gainsight: "Native health score + CTAs"
    - churnzero: "Real-time churn scores"
    - totango: "SuccessBLOCs for at-risk"
    - vitally: "Health scoring automation"

  crm:
    - salesforce: "Custom fields + reports"
    - hubspot: "Deal risk scoring"

  analytics:
    - amplitude: "Behavioral cohorts"
    - mixpanel: "Retention analysis"
    - heap: "Usage tracking"

  alerting:
    - slack: "Real-time notifications"
    - pagerduty: "Critical escalations"
    - zapier: "Custom workflows"
```

---

## Nick Mehta's Parting Wisdom

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    NICK MEHTA'S CHURN PREDICTION PRINCIPLES                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  "Churn prediction is not about catching customers trying to leave.        │
│   It's about helping customers succeed before they even think about it."   │
│                                                                              │
│  1. PREVENTION > PREDICTION                                                 │
│     "The best churn prediction system is one that prevents the signals     │
│      from ever appearing in the first place."                              │
│                                                                              │
│  2. SIGNALS ARE SYMPTOMS                                                    │
│     "Every risk signal is a symptom of undelivered value.                  │
│      Treat the disease, not just the symptom."                             │
│                                                                              │
│  3. HUMAN + MACHINE                                                         │
│     "Algorithms find patterns. Humans understand context.                  │
│      The magic is in combining both."                                      │
│                                                                              │
│  4. START SIMPLE                                                            │
│     "A simple scorecard acted upon beats a sophisticated model ignored.    │
│      Start with what you can execute."                                     │
│                                                                              │
│  5. CONTINUOUS IMPROVEMENT                                                  │
│     "Your churn model is never done. Every churn is data.                  │
│      Every save is learning. Keep refining."                               │
│                                                                              │
│  FINAL THOUGHT:                                                             │
│  "The goal isn't zero churn. That's impossible.                            │
│   The goal is zero surprise churn.                                         │
│   If someone's going to leave, know it before they do."                    │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

```yaml
changelog:
  - version: "1.0"
    date: "2026-01-23"
    author: "Data Intelligence Pack"
    changes:
      - "Initial task creation"
      - "Nick Mehta methodology integrated"
      - "6-phase framework established"
      - "Intervention playbooks defined"
      - "Examples from SaaS, digital, enterprise contexts"
```
