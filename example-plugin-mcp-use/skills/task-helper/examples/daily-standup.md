# Daily Standup Workflow Example

Practical example of using task manager tools for daily standups.

## Morning Standup (9:00 AM)

### Step 1: Get Current State

```
Use get_task_summary

Output:
Task Summary (12 total)

By Status:
  To Do: 5
  In Progress: 3
  Done: 4

By Priority:
  Critical: 1
  High: 4
  Medium: 6
  Low: 1
```

### Step 2: Check Critical Items

```
Use list_tasks:
  priority: "critical"

Output:
Found 1 task(s):

[task-8] Fix payment processing timeout
  Priority: critical | Status: in_progress
  Production users experiencing checkout failures
```

**Standup Note:** Critical payment issue still in progress. Expected fix by noon.

### Step 3: Review In-Progress Work

```
Use list_tasks:
  status: "in_progress"

Output:
Found 3 task(s):

[task-8] Fix payment processing timeout
  Priority: critical | Status: in_progress
  Production users experiencing checkout failures

[task-3] Implement user search API
  Priority: high | Status: in_progress
  Search by name, email, with pagination

[task-5] Add unit tests for auth module
  Priority: medium | Status: in_progress
  Cover login, logout, session refresh
```

**Standup Update:**
- Payment fix: ~80% complete, debugging final edge case
- User search: API done, working on pagination
- Auth tests: 70% coverage achieved, targeting 85%

### Step 4: Plan Today's Focus

Based on priorities, today's plan:
1. Complete payment fix (critical)
2. Finish user search API (high)
3. Continue auth tests if time allows

### Step 5: Update Any Completed Work

Mark auth tests as done (completed yesterday evening):

```
Use update_task_status:
  taskId: "task-5"
  status: "done"
```

### Step 6: Start New Tasks

Pick up next high-priority item:

```
Use list_tasks:
  status: "todo"
  priority: "high"

Output:
Found 2 task(s):

[task-6] Create admin dashboard
  Priority: high | Status: todo
  Admin panel for user management

[task-7] Implement email notifications
  Priority: high | Status: todo
  Transactional emails for key events

Use update_task_status:
  taskId: "task-6"
  status: "in_progress"
```

## Mid-Day Check-In (1:00 PM)

### Payment Fix Update

```
Use update_task_status:
  taskId: "task-8"
  status: "done"
```

Critical issue resolved! Update team.

### Progress Check

```
Use get_task_summary

Output:
Task Summary (12 total)

By Status:
  To Do: 4
  In Progress: 3
  Done: 5

By Priority:
  Critical: 0  # Payment fix done!
  High: 4
  Medium: 6
  Low: 1
```

No critical items remaining - good state.

## End of Day Update (5:00 PM)

### Final Status Updates

Mark completed work:

```
Use update_task_status:
  taskId: "task-3"
  status: "done"
```

### New Tasks Discovered

During development, found a needed task:

```
Use create_task:
  title: "Add rate limiting to search API"
  description: "Prevent abuse of search endpoint, implement token bucket"
  priority: "medium"
```

### End of Day Summary

```
Use get_task_summary

Output:
Task Summary (13 total)

By Status:
  To Do: 4
  In Progress: 2
  Done: 7

By Priority:
  Critical: 0
  High: 3
  Medium: 7
  Low: 1
```

**Daily Summary:**
- Completed: 3 tasks (payment fix, user search, auth tests)
- In Progress: 2 tasks (admin dashboard, email notifications)
- Discovered: 1 new task (rate limiting)
- Blockers: None

## Weekly Pattern

### Monday

- Review full backlog
- Reprioritize based on week's goals
- Start high-impact items early

### Tuesday-Thursday

- Standard standup workflow
- Focus on sprint commitments
- Address emerging issues

### Friday

- Complete in-progress work
- Review week's accomplishments
- Light planning for next week

```
Use list_tasks:
  status: "done"

# Count this week's completions
# Celebrate wins!
```

## Standup Script

Use this script for consistent standups:

```
1. "Let me check the current state..."
   -> get_task_summary

2. "Any critical items?"
   -> list_tasks (priority: critical)

3. "Here's what I'm working on..."
   -> list_tasks (status: in_progress)

4. "Completed since last standup..."
   -> Update statuses to done

5. "Today I'll focus on..."
   -> Identify next tasks to start

6. "Any blockers?"
   -> Note issues, consider priority changes
```

## Tips for Effective Standups

1. **Update before standup**: Mark completed items done first
2. **Be specific**: "Working on task-3" not "working on search"
3. **Mention blockers immediately**: Don't wait for daily standup
4. **Keep it brief**: Summary, not detailed status report
5. **Follow up offline**: Detailed discussions after standup
