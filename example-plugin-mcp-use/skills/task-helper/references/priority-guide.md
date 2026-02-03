# Task Priority Decision Framework

A comprehensive guide to setting and managing task priorities effectively.

## Priority Levels Defined

### Critical Priority

**Definition:** Tasks that must be addressed immediately. Blocking other work or causing significant business impact.

**Characteristics:**
- Production systems affected
- Security vulnerabilities
- Revenue-impacting issues
- Legal/compliance deadlines
- Multiple team members blocked

**Response Time:** Within hours, often minutes

**Typical Duration at This Level:** Hours to 1-2 days maximum

**Examples:**
- Website is down
- Data breach detected
- Critical bug in production
- Regulatory deadline tomorrow

### High Priority

**Definition:** Important tasks with near-term deadlines or significant impact.

**Characteristics:**
- Customer-facing issues
- Committed deliverables
- Sprint goals
- Dependencies for other work
- Management requests

**Response Time:** Same day or next day

**Typical Duration at This Level:** 1-7 days

**Examples:**
- Feature for upcoming release
- Customer-reported bug
- Sprint commitment
- Pre-approved deadline work

### Medium Priority

**Definition:** Standard work with reasonable timelines. The default for most tasks.

**Characteristics:**
- Normal development work
- Planned improvements
- Documentation
- Non-urgent bug fixes
- Technical debt

**Response Time:** Within the current sprint or iteration

**Typical Duration at This Level:** 1-4 weeks

**Examples:**
- Planned feature development
- Code refactoring
- Unit test improvements
- Non-critical bug fixes

### Low Priority

**Definition:** Nice-to-have items that improve quality of life but aren't necessary.

**Characteristics:**
- Backlog items
- Nice-to-have features
- Long-term improvements
- Research tasks
- Optional documentation

**Response Time:** When capacity allows

**Typical Duration at This Level:** Weeks to months (may never happen)

**Examples:**
- Code style improvements
- Optional optimizations
- Exploratory research
- "Someday" features

## Decision Matrix

Use this matrix to determine priority based on urgency and importance:

```
                    URGENT
                      |
          Critical    |    High
       (Do Now!)      |  (Schedule Soon)
                      |
    ------------------+------------------
                      |
           High       |    Medium
       (Negotiate)    |  (Plan & Do)
                      |
                      |
                  NOT URGENT

                IMPORTANT -------------- NOT IMPORTANT
```

### Quadrant Behaviors

**Critical (Urgent + Important):** Drop everything. Do now.

**High (Important, Less Urgent):** Schedule for soon. Protect this time.

**High (Urgent, Less Important):** Negotiate. Can it wait? Can someone else do it?

**Medium (Not Urgent, Less Important):** Plan it. Do when capacity allows.

## Priority Escalation Rules

### When to Escalate

A task should move UP in priority when:

1. **Deadline approaches**
   - 1 week out: Consider moving to High
   - 1-2 days out: Move to High or Critical

2. **Blocker discovered**
   - If task blocks other work, escalate
   - If task is on critical path, escalate

3. **Scope increases**
   - If task grows significantly, reassess
   - May need to escalate or split

4. **Stakeholder pressure**
   - New information about importance
   - Business priority shift

### When to De-escalate

A task should move DOWN in priority when:

1. **Deadline extended**
   - More time available = less urgent

2. **Blocker removed elsewhere**
   - No longer on critical path

3. **Requirements change**
   - Original urgency no longer applies

4. **Better alternative found**
   - Task may not be needed at all

## Common Priority Mistakes

### Mistake: Everything is Critical

**Symptom:** 50%+ of tasks are Critical or High

**Problem:** Real critical items get lost in noise

**Fix:**
- Critical: 5-10% of tasks maximum
- High: 15-20% of tasks
- Medium: 50-60% of tasks
- Low: 20-30% of tasks

### Mistake: Priority Never Changes

**Symptom:** Tasks keep same priority forever

**Problem:** Context changes but priorities don't

**Fix:** Review and adjust priorities at least weekly

### Mistake: Confusing Urgency with Importance

**Symptom:** Reactive work always wins

**Problem:** Important but not urgent work never happens

**Fix:** Use the matrix above. Protect time for important work.

### Mistake: Not Considering Dependencies

**Symptom:** Low priority task blocks high priority work

**Problem:** Failed to see downstream impact

**Fix:** When prioritizing, check what depends on the task

## Priority by Task Type

### Bugs

| Severity | Typical Priority |
|----------|------------------|
| Critical (production down) | Critical |
| Major (feature broken) | High |
| Minor (workaround exists) | Medium |
| Cosmetic (visual only) | Low |

### Features

| Context | Typical Priority |
|---------|------------------|
| Committed for release | High |
| Customer requested | High or Medium |
| Internal improvement | Medium |
| Nice-to-have | Low |

### Technical Debt

| Impact | Typical Priority |
|--------|------------------|
| Blocking new features | High |
| Causing bugs | High |
| Slowing development | Medium |
| Code quality only | Low |

### Documentation

| Type | Typical Priority |
|------|------------------|
| API docs (public) | High |
| Critical runbooks | High |
| Internal guides | Medium |
| Nice-to-have docs | Low |

## Priority Review Checklist

When setting priority, ask:

1. **Impact**
   - [ ] How many users/systems affected?
   - [ ] What's the business impact?
   - [ ] Are there dependencies?

2. **Urgency**
   - [ ] Is there a deadline?
   - [ ] Is something broken now?
   - [ ] Can it wait?

3. **Effort**
   - [ ] How long will this take?
   - [ ] Is this blocking quick wins?

4. **Context**
   - [ ] What else is in flight?
   - [ ] What's the team's capacity?
   - [ ] Are there other priorities competing?

## Priority Communication

### Explaining Critical Priority

"This task is Critical because [specific impact]. It's blocking [specific work/users]. We need to address it within [timeframe]."

### Explaining Priority Changes

"I'm moving this from [old] to [new] priority because [specific reason]. This means [impact on timeline/other work]."

### Pushing Back on Priority

"I understand this feels urgent. Let me check: [ask about deadline, impact, alternatives]. Based on that, I'd suggest [recommended priority] because [reasoning]."
