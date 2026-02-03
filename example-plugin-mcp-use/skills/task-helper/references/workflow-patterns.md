# Task Management Workflow Patterns

Detailed patterns for effective task management across different contexts.

## Individual Contributor Workflows

### Morning Planning

```
1. Check task summary
   -> Use get_task_summary

2. Review high-priority items
   -> Use list_tasks with priority="high" or priority="critical"

3. Pick top 3 tasks for the day
   -> Update their status to "in_progress"

4. Focus on one task at a time
   -> Complete, then update to "done"
```

### End of Day Review

```
1. Update all task statuses
   -> Mark completed tasks as "done"
   -> Mark blocked tasks back to "todo"

2. Check progress
   -> Use get_task_summary

3. Plan tomorrow
   -> Identify top priorities for next day

4. Create any new tasks discovered
   -> Use create_task with appropriate priority
```

### Focus Time Block

```
1. Select a single task
   -> Update to "in_progress"

2. Set a timer (25-50 minutes)

3. Work without interruption

4. On completion
   -> Update to "done"
   -> Take a break
   -> Repeat
```

## Team Workflows

### Sprint Planning Pattern

```
Phase 1: Backlog Review
   - List all "todo" tasks
   - Review and reprioritize
   - Delete stale tasks

Phase 2: Sprint Scope
   - Identify sprint goal
   - Select tasks that support goal
   - Set priorities: critical > high > medium

Phase 3: Capacity Planning
   - Count tasks per priority
   - Adjust scope to fit capacity
   - Document any deferrals
```

### Daily Standup Pattern

```
Each team member:

1. What did I complete?
   -> List tasks moved to "done" since last standup

2. What am I working on?
   -> List tasks currently "in_progress"

3. Any blockers?
   -> Identify tasks that may need priority adjustment
   -> Create new tasks for unplanned work
```

### Sprint Review Pattern

```
1. Summary check
   -> Use get_task_summary

2. List completed work
   -> list_tasks with status="done"

3. Review incomplete work
   -> list_tasks with status="todo" and "in_progress"

4. Calculate completion rate
   -> done / (done + todo + in_progress)

5. Retrospective
   -> What went well?
   -> What to improve?
```

## Project Management Workflows

### Project Kickoff

```
1. Create project milestone tasks
   -> High-level deliverables
   -> Priority: based on dependencies

2. Break down into subtasks
   -> Each subtask is independently achievable
   -> Priority: inherit from parent or adjust

3. Identify critical path
   -> Mark critical tasks as "critical" priority

4. Set up tracking
   -> Regular summary reviews
```

### Risk Management

```
When a risk is identified:

1. Create a task for the risk
   -> Title: [RISK] Risk description
   -> Priority: based on likelihood × impact

2. Create mitigation tasks
   -> Link to risk in description
   -> Priority: medium or high

3. Monitor regularly
   -> Include in daily review
   -> Update priority as risk changes
```

### Deadline Approaching

```
When deadline is near:

1. Get current state
   -> Use get_task_summary

2. Identify at-risk items
   -> list_tasks with status="todo"

3. Escalate priorities
   -> Move critical path items to "critical"
   -> Move important items to "high"

4. Consider scope cuts
   -> Move nice-to-haves to "low"
   -> Delete non-essential tasks

5. Increase check-in frequency
   -> Daily summary reviews
   -> Status updates as tasks complete
```

## Emergency Response Patterns

### Production Issue

```
Immediate:
1. Create critical task
   -> Priority: critical
   -> Title: [INCIDENT] Description
   -> Status: in_progress

2. Pause other work
   -> Document current state
   -> Focus on incident

During:
3. Create subtasks as needed
   -> Investigation tasks
   -> Fix tasks
   -> Communication tasks

Resolution:
4. Update main task to done

5. Create follow-up tasks
   -> Post-mortem
   -> Prevention measures
   -> Priority: high
```

### Unexpected Request

```
1. Assess urgency
   -> Does it truly need to interrupt?

2. Create task
   -> Set appropriate priority
   -> NOT everything is critical

3. If priority is high/critical:
   -> Consider what to deprioritize
   -> Update other task priorities

4. Communicate
   -> Set expectations on timing
   -> Note trade-offs
```

## Maintenance Patterns

### Weekly Review

```
1. Archive completed tasks
   -> Review all "done" tasks
   -> Export/archive if needed

2. Clean stale tasks
   -> Delete tasks not relevant anymore
   -> Update descriptions if context changed

3. Rebalance priorities
   -> What's actually urgent now?
   -> Adjust based on current context

4. Plan upcoming week
   -> What must happen?
   -> What would be nice?
```

### Monthly Reset

```
1. Full task audit
   -> Review ALL tasks
   -> Delete, update, or keep

2. Priority reset
   -> Assume "medium" for everything
   -> Deliberately set critical/high
   -> Mark true low-priority items

3. Process review
   -> Is the workflow serving you?
   -> Adjust patterns as needed
```

## Anti-Patterns to Avoid

### Everything is Critical

**Problem:** If everything is critical, nothing is.
**Solution:** Strictly limit critical to true emergencies. Most work is medium.

### Status Never Updates

**Problem:** Tasks stay "in_progress" forever.
**Solution:** Update status as first action when changing focus.

### Too Many Tasks

**Problem:** Overwhelming list causes paralysis.
**Solution:** Limit visible tasks. Archive or delete aggressively.

### No Priority Variation

**Problem:** All tasks are same priority (usually medium).
**Solution:** Force distribution: few critical, some high, many medium, some low.

### Stale Backlog

**Problem:** Old tasks sit forever without action.
**Solution:** If not done in 30 days, delete or demote to low.
