#!/usr/bin/env node

import { MCPServer, text } from "mcp-use/server";
import { z } from "zod";

// In-memory task storage (for demonstration)
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "todo" | "in_progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

const tasks = new Map<string, Task>();
let taskIdCounter = 1;

// Create the MCP server using mcp-use
const server = new MCPServer({
  name: "task-manager",
  version: "1.0.0",
  description: "A simple task management MCP server built with mcp-use",
});

// Tool: Create a new task
server.tool(
  {
    name: "create_task",
    description: "Create a new task with title, description, and priority",
    schema: z.object({
      title: z.string().describe("The title of the task"),
      description: z.string().optional().describe("A detailed description of the task"),
      priority: z
        .enum(["low", "medium", "high", "critical"])
        .optional()
        .describe("Task priority level (default: medium)"),
    }),
  },
  async ({ title, description = "", priority = "medium" }) => {
    const id = `task-${taskIdCounter++}`;
    const now = new Date();

    const task: Task = {
      id,
      title,
      description,
      priority,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    tasks.set(id, task);

    return text(
      `Created task "${title}" with ID: ${id}\n` +
        `Priority: ${priority}\n` +
        `Status: todo`
    );
  }
);

// Tool: List all tasks
server.tool(
  {
    name: "list_tasks",
    description: "List all tasks, optionally filtered by status or priority",
    schema: z.object({
      status: z
        .enum(["todo", "in_progress", "done", "all"])
        .optional()
        .describe("Filter by status (default: all)"),
      priority: z
        .enum(["low", "medium", "high", "critical", "all"])
        .optional()
        .describe("Filter by priority (default: all)"),
    }),
  },
  async ({ status = "all", priority = "all" }) => {
    let filteredTasks = Array.from(tasks.values());

    if (status !== "all") {
      filteredTasks = filteredTasks.filter((t) => t.status === status);
    }

    if (priority !== "all") {
      filteredTasks = filteredTasks.filter((t) => t.priority === priority);
    }

    if (filteredTasks.length === 0) {
      return text("No tasks found matching the criteria.");
    }

    const taskList = filteredTasks
      .map(
        (t) =>
          `[${t.id}] ${t.title}\n` +
          `  Priority: ${t.priority} | Status: ${t.status}\n` +
          `  ${t.description || "(no description)"}`
      )
      .join("\n\n");

    return text(`Found ${filteredTasks.length} task(s):\n\n${taskList}`);
  }
);

// Tool: Update task status
server.tool(
  {
    name: "update_task_status",
    description: "Update the status of an existing task",
    schema: z.object({
      taskId: z.string().describe("The ID of the task to update"),
      status: z
        .enum(["todo", "in_progress", "done"])
        .describe("The new status for the task"),
    }),
  },
  async ({ taskId, status }) => {
    const task = tasks.get(taskId);

    if (!task) {
      return text(`Error: Task with ID "${taskId}" not found.`);
    }

    const oldStatus = task.status;
    task.status = status;
    task.updatedAt = new Date();

    return text(
      `Updated task "${task.title}" (${taskId})\n` +
        `Status: ${oldStatus} -> ${status}`
    );
  }
);

// Tool: Update task priority
server.tool(
  {
    name: "update_task_priority",
    description: "Update the priority of an existing task",
    schema: z.object({
      taskId: z.string().describe("The ID of the task to update"),
      priority: z
        .enum(["low", "medium", "high", "critical"])
        .describe("The new priority for the task"),
    }),
  },
  async ({ taskId, priority }) => {
    const task = tasks.get(taskId);

    if (!task) {
      return text(`Error: Task with ID "${taskId}" not found.`);
    }

    const oldPriority = task.priority;
    task.priority = priority;
    task.updatedAt = new Date();

    return text(
      `Updated task "${task.title}" (${taskId})\n` +
        `Priority: ${oldPriority} -> ${priority}`
    );
  }
);

// Tool: Delete a task
server.tool(
  {
    name: "delete_task",
    description: "Delete a task by its ID",
    schema: z.object({
      taskId: z.string().describe("The ID of the task to delete"),
    }),
  },
  async ({ taskId }) => {
    const task = tasks.get(taskId);

    if (!task) {
      return text(`Error: Task with ID "${taskId}" not found.`);
    }

    tasks.delete(taskId);

    return text(`Deleted task "${task.title}" (${taskId})`);
  }
);

// Tool: Get task summary
server.tool(
  {
    name: "get_task_summary",
    description: "Get a summary of all tasks grouped by status and priority",
    schema: z.object({}),
  },
  async () => {
    const allTasks = Array.from(tasks.values());

    if (allTasks.length === 0) {
      return text("No tasks in the system yet.");
    }

    // Count by status
    const byStatus = {
      todo: allTasks.filter((t) => t.status === "todo").length,
      in_progress: allTasks.filter((t) => t.status === "in_progress").length,
      done: allTasks.filter((t) => t.status === "done").length,
    };

    // Count by priority
    const byPriority = {
      critical: allTasks.filter((t) => t.priority === "critical").length,
      high: allTasks.filter((t) => t.priority === "high").length,
      medium: allTasks.filter((t) => t.priority === "medium").length,
      low: allTasks.filter((t) => t.priority === "low").length,
    };

    return text(
      `Task Summary (${allTasks.length} total)\n` +
        `\nBy Status:\n` +
        `  To Do: ${byStatus.todo}\n` +
        `  In Progress: ${byStatus.in_progress}\n` +
        `  Done: ${byStatus.done}\n` +
        `\nBy Priority:\n` +
        `  Critical: ${byPriority.critical}\n` +
        `  High: ${byPriority.high}\n` +
        `  Medium: ${byPriority.medium}\n` +
        `  Low: ${byPriority.low}`
    );
  }
);

// Resource: Task list as JSON
server.resource(
  {
    name: "tasks_json",
    description: "All tasks in JSON format",
    uri: "tasks://all",
    mimeType: "application/json",
  },
  async () => {
    const allTasks = Array.from(tasks.values());
    return {
      contents: [
        {
          uri: "tasks://all",
          mimeType: "application/json",
          text: JSON.stringify(allTasks, null, 2),
        },
      ],
    };
  }
);

// Resource: Help documentation
server.resource(
  {
    name: "help",
    description: "Help documentation for the task manager",
    uri: "tasks://help",
    mimeType: "text/markdown",
  },
  async () => {
    return {
      contents: [
        {
          uri: "tasks://help",
          mimeType: "text/markdown",
          text: `# Task Manager MCP Server

## Available Tools

### create_task
Create a new task with a title, optional description, and priority.
- **title** (required): Task title
- **description** (optional): Task details
- **priority** (optional): low, medium, high, or critical

### list_tasks
List all tasks with optional filters.
- **status** (optional): todo, in_progress, done, or all
- **priority** (optional): low, medium, high, critical, or all

### update_task_status
Change a task's status.
- **taskId** (required): The task ID
- **status** (required): todo, in_progress, or done

### update_task_priority
Change a task's priority.
- **taskId** (required): The task ID
- **priority** (required): low, medium, high, or critical

### delete_task
Remove a task.
- **taskId** (required): The task ID

### get_task_summary
Get an overview of all tasks by status and priority.

## Resources

- **tasks://all**: All tasks in JSON format
- **tasks://help**: This documentation
`,
        },
      ],
    };
  }
);

// Start the server
// For stdio transport (Claude Code integration), we need to handle this differently
// mcp-use typically uses HTTP, but we'll configure for stdio compatibility
const port = parseInt(process.env.PORT || "3000", 10);

if (process.env.MCP_TRANSPORT === "stdio") {
  // For stdio mode, we need to use the underlying MCP SDK
  // mcp-use wraps this but we can still access stdio transport
  console.error("Task Manager MCP server starting in stdio mode...");
  server.listen(port);
} else {
  // HTTP mode with inspector
  server.listen(port);
  console.error(`Task Manager MCP server running at http://localhost:${port}`);
  console.error(`Inspector available at http://localhost:${port}/inspector`);
}
