# Example Plugin (mcp-use)

A comprehensive example Claude Code plugin demonstrating the use of the **mcp-use** library for simpler MCP server implementation.

## Overview

This plugin demonstrates how to build a Claude Code plugin using the [mcp-use](https://github.com/mcp-use/mcp-use) library, which provides a more concise API for creating MCP servers compared to the raw MCP SDK.

**Key Features:**
- **MCP Server** built with mcp-use's simplified API
- **Skill** with comprehensive task management guidance
- **Command** for quick task operations
- **Resources** exposed through MCP protocol

## Directory Structure

```
example-plugin-mcp-use/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   └── task.md              # /task command
├── skills/
│   └── task-helper/
│       ├── SKILL.md         # Skill definition
│       ├── references/      # Detailed documentation
│       │   ├── workflow-patterns.md
│       │   └── priority-guide.md
│       └── examples/        # Working examples
│           ├── sprint-setup.md
│           └── daily-standup.md
├── mcp-server/              # mcp-use TypeScript server
│   ├── src/
│   │   └── index.ts         # Server implementation
│   ├── package.json
│   └── tsconfig.json
├── .mcp.json                # MCP server configuration
└── README.md                # This file
```

## Installation

### 1. Build the MCP Server

```bash
cd example-plugin-mcp-use/mcp-server
npm install
npm run build
```

### 2. Install the Plugin

```bash
# Using plugin directory
claude --plugin-dir /path/to/example-plugin-mcp-use

# Or copy to plugins directory
cp -r example-plugin-mcp-use ~/.claude/plugins/
```

## Components

### Command: /task

Manage tasks quickly from the command line.

**Usage:**
```
/task create Fix login bug high      # Create high-priority task
/task create Update documentation    # Create medium-priority task
/task list                           # List all tasks
/task list todo                      # List pending tasks
/task list high                      # List high-priority tasks
/task done task-5                    # Mark task as complete
/task summary                        # Get overview
```

### Skill: Task Helper

Provides comprehensive task management guidance. Triggers on:
- "manage tasks"
- "create a task"
- "track progress"
- "prioritize tasks"

### MCP Server Tools

| Tool | Description |
|------|-------------|
| `create_task` | Create task with title, description, priority |
| `list_tasks` | List/filter tasks by status or priority |
| `update_task_status` | Change task status (todo/in_progress/done) |
| `update_task_priority` | Change task priority |
| `delete_task` | Remove a task |
| `get_task_summary` | Get task statistics |

### MCP Server Resources

| URI | Description |
|-----|-------------|
| `tasks://all` | All tasks as JSON |
| `tasks://help` | Help documentation |

## mcp-use vs Raw MCP SDK

### mcp-use Approach (This Plugin)

```typescript
import { MCPServer, text } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "task-manager",
  version: "1.0.0",
});

server.tool(
  {
    name: "create_task",
    description: "Create a new task",
    schema: z.object({
      title: z.string(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    }),
  },
  async ({ title, priority = "medium" }) => {
    // Implementation
    return text(`Created task: ${title}`);
  }
);

server.listen(3000);
```

### Key Benefits of mcp-use

1. **Simpler API**: Define tools with a single `.tool()` call
2. **Zod Schemas**: Built-in schema validation with Zod
3. **Auto Inspector**: Built-in debugging UI at `/inspector`
4. **Less Boilerplate**: No manual request handler setup
5. **TypeScript First**: Full type safety out of the box

## Development

### Running the Server

```bash
cd mcp-server

# Build
npm run build

# Run with inspector (development)
npm run inspect
# Visit http://localhost:3000/inspector

# Run in production mode
npm start
```

### Adding New Tools

1. Add tool definition with schema:

```typescript
server.tool(
  {
    name: "my_tool",
    description: "What it does",
    schema: z.object({
      param: z.string().describe("Parameter description"),
    }),
  },
  async ({ param }) => {
    // Implementation
    return text("Result");
  }
);
```

2. Rebuild: `npm run build`

### Adding New Resources

```typescript
server.resource(
  {
    name: "my_resource",
    description: "Resource description",
    uri: "myapp://resource",
    mimeType: "application/json",
  },
  async () => ({
    contents: [{
      uri: "myapp://resource",
      mimeType: "application/json",
      text: JSON.stringify(data),
    }],
  })
);
```

## Comparison with example-plugin

| Feature | example-plugin | example-plugin-mcp-use |
|---------|----------------|------------------------|
| MCP Library | @modelcontextprotocol/sdk | mcp-use |
| Tool Definition | Manual handlers | `.tool()` method |
| Schema | Manual JSON Schema | Zod schemas |
| Inspector | Not included | Built-in |
| Code Lines | ~300 | ~200 |
| Learning Curve | Steeper | Gentler |

## Testing the MCP Server

### Using the Inspector

```bash
cd mcp-server
npm run inspect
```

Open http://localhost:3000/inspector to:
- Test tool calls interactively
- View server status
- Debug issues

### Manual Testing

```bash
# Test via stdio
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

## Resources

- [mcp-use Documentation](https://mcp-use.com/docs)
- [mcp-use GitHub](https://github.com/mcp-use/mcp-use)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Zod Documentation](https://zod.dev/)

## License

MIT License

## Author

Example Developer (developer@example.com)
