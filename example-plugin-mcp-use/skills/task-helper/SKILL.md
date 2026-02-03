---
name: Task Helper
description: This skill should be used when the user asks to "manage tasks", "create a task", "track progress", "organize work items", "prioritize tasks", "update task status", "get task summary", or needs guidance on task management workflows, priority setting, and using the task manager MCP tools effectively.
version: 1.0.0
---

# Task Helper Skill

## Overview

This skill provides guidance for effective task management using the example plugin's MCP server tools. Use it to create, organize, prioritize, and track tasks efficiently.

## Available MCP Tools

The task manager MCP server provides these tools:

### create_task Tool

Create new tasks with title, description, and priority.

**Parameters:**
- `title` (required): The task title
- `description` (optional): Detailed task description
- `priority` (optional): One of "low", "medium", "high", or "critical"

**Priority Guidelines:**
- **critical**: Urgent issues blocking other work, production problems
- **high**: Important tasks with near-term deadlines
- **medium**: Standard tasks with reasonable timelines (default)
- **low**: Nice-to-have items, backlog tasks

### list_tasks Tool

List and filter tasks by status or priority.

**Parameters:**
- `status` (optional): "todo", "in_progress", "done", or "all"
- `priority` (optional): "low", "medium", "high", "critical", or "all"

### update_task_status Tool

Change a task's workflow status.

**Parameters:**
- `taskId` (required): The task identifier
- `status` (required): "todo", "in_progress", or "done"

### update_task_priority Tool

Adjust a task's priority level.

**Parameters:**
- `taskId` (required): The task identifier
- `priority` (required): "low", "medium", "high", or "critical"

### delete_task Tool

Remove a task from the system.

**Parameters:**
- `taskId` (required): The task identifier

### get_task_summary Tool

Get an overview of all tasks grouped by status and priority.

**Parameters:** None

## Task Management Workflows

### Daily Planning Workflow

1. Use `get_task_summary` to see current state
2. Use `list_tasks` with status "todo" to see pending work
3. Identify top priorities and update statuses to "in_progress"
4. Create new tasks as they arise

### Sprint Planning Workflow

1. Create all tasks for the sprint using `create_task`
2. Set appropriate priorities based on business value
3. Use `list_tasks` to review by priority
4. Adjust priorities as needed with `update_task_priority`

### Task Completion Workflow

1. When starting work, update status to "in_progress"
2. When done, update status to "done"
3. Use `get_task_summary` to track progress

## Priority Matrix

| Priority | Response Time | Examples |
|----------|---------------|----------|
| Critical | Immediate | Production outage, security issue |
| High | Same day | Customer request, deadline approaching |
| Medium | This week | Standard development work |
| Low | As available | Documentation, nice-to-have features |

## Best Practices

1. **Be specific with titles**: Clear, actionable task titles
2. **Add descriptions**: Include context and acceptance criteria
3. **Set realistic priorities**: Not everything is critical
4. **Update status promptly**: Keep the board current
5. **Review regularly**: Daily summary checks

## Additional Resources

### Reference Files

For detailed task management patterns:
- **`references/workflow-patterns.md`** - Detailed workflow guides
- **`references/priority-guide.md`** - Priority decision framework

### Example Files

Working examples in `examples/`:
- **`examples/sprint-setup.md`** - Setting up a sprint
- **`examples/daily-standup.md`** - Daily workflow patterns
