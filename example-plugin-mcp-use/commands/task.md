---
name: task
description: Create and manage tasks using the task manager MCP server
argument-hint: [create|list|done|summary] [args...]
---

Manage tasks using the task manager MCP tools.

## Instructions

Parse the first argument to determine the action:

### create [title] [priority]

Create a new task.

1. If no title provided ($2), ask the user for a task title
2. Use the `create_task` tool with:
   - title: $2 (and any additional words as part of title)
   - priority: $3 if provided (low|medium|high|critical), otherwise "medium"
3. Report the created task's ID and details

### list [filter]

List tasks with optional filter.

1. If filter provided ($2):
   - If filter is a status (todo|in_progress|done): use `list_tasks` with that status
   - If filter is a priority (low|medium|high|critical): use `list_tasks` with that priority
2. If no filter: use `list_tasks` to show all tasks
3. Format and display the results

### done [task-id]

Mark a task as completed.

1. If no task ID provided ($2), list in-progress tasks and ask which to complete
2. Use `update_task_status` with:
   - taskId: $2
   - status: "done"
3. Confirm the task was marked complete

### summary

Get a summary of all tasks.

1. Use `get_task_summary` tool
2. Present the summary in a readable format

## Examples

- `/task create Fix login bug high` - Create a high-priority task
- `/task create Update documentation` - Create a medium-priority task
- `/task list` - List all tasks
- `/task list todo` - List tasks to do
- `/task list high` - List high-priority tasks
- `/task done task-5` - Mark task-5 as done
- `/task summary` - Get task overview
