# Example Plugin

A comprehensive example Claude Code plugin demonstrating skills, commands, resources, and an embedded MCP server built with TypeScript.

## Overview

This plugin serves as a learning resource for Claude Code plugin development. It demonstrates:

- **Skill**: A greeting helper skill with references and examples
- **Command**: A `/greet` command for generating personalized greetings
- **MCP Server**: A TypeScript-based MCP server providing tools and resources
- **Resources**: Reference documentation and example files

## Directory Structure

```
example-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   └── greet.md             # /greet command
├── skills/
│   └── greeting-helper/
│       ├── SKILL.md         # Skill definition
│       ├── references/      # Detailed documentation
│       │   ├── greeting-templates.md
│       │   └── context-guide.md
│       └── examples/        # Working examples
│           ├── business-greetings.md
│           └── team-greetings.md
├── mcp-server/              # TypeScript MCP server
│   ├── src/
│   │   └── index.ts         # Server implementation
│   ├── package.json
│   └── tsconfig.json
├── .mcp.json                # MCP server configuration
└── README.md                # This file
```

## Installation

### 1. Build the MCP Server

First, build the TypeScript MCP server:

```bash
cd example-plugin/mcp-server
npm install
npm run build
```

### 2. Install the Plugin

Install the plugin in Claude Code:

```bash
# Using plugin directory
claude --plugin-dir /path/to/example-plugin

# Or copy to your plugins directory
cp -r example-plugin ~/.claude/plugins/
```

## Components

### Command: /greet

Generate personalized greetings with different styles.

**Usage:**
```
/greet Alice              # Casual greeting for Alice
/greet Bob formal         # Formal greeting for Bob
/greet Charlie enthusiastic   # Enthusiastic greeting for Charlie
```

### Skill: Greeting Helper

The greeting helper skill provides guidance on creating personalized greetings. It triggers when you ask about:
- "Generate a greeting"
- "Create a welcome message"
- "Write a formal greeting"
- "Personalize a message"

### MCP Server Tools

The embedded MCP server provides these tools:

| Tool | Description |
|------|-------------|
| `greet` | Generate personalized greetings (formal, casual, enthusiastic) |
| `calculate` | Basic math operations (add, subtract, multiply, divide) |
| `get_timestamp` | Get current time in various formats (ISO, Unix, readable) |
| `random_fact` | Get interesting facts about science, history, nature, or technology |

### MCP Server Resources

The server also provides these resources:

| URI | Description |
|-----|-------------|
| `example://config` | Plugin configuration data |
| `example://help` | Usage documentation |
| `example://facts` | Facts database |

## Development

### Building the MCP Server

```bash
cd mcp-server
npm install          # Install dependencies
npm run build        # Build TypeScript
npm run dev          # Watch mode for development
```

### Testing the MCP Server

Run the server directly to test:

```bash
cd mcp-server
npm start
```

The server communicates via stdin/stdout using the MCP protocol.

### Plugin Structure Notes

- **`.claude-plugin/plugin.json`**: Required manifest file defining plugin metadata
- **`commands/`**: Slash commands are auto-discovered from this directory
- **`skills/`**: Skills are auto-discovered from subdirectories containing `SKILL.md`
- **`.mcp.json`**: MCP server configuration, uses `${CLAUDE_PLUGIN_ROOT}` for portable paths

## MCP Server Implementation

The MCP server (`mcp-server/src/index.ts`) demonstrates:

1. **Tool Definition**: How to define and implement MCP tools
2. **Resource Exposure**: How to expose resources that Claude can read
3. **Input Validation**: Handling different input types and errors
4. **TypeScript Setup**: Proper configuration for MCP SDK with TypeScript

### Key MCP SDK Patterns

```typescript
// Import the SDK
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server with capabilities
const server = new Server(
  { name: "example-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [/* tool definitions */]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Implement tool logic
});

// Start with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Customization

### Adding New Tools

1. Add the tool definition in `ListToolsRequestSchema` handler
2. Implement the tool logic in `CallToolRequestSchema` handler
3. Rebuild the server

### Adding New Resources

1. Add the resource definition in `ListResourcesRequestSchema` handler
2. Implement the read logic in `ReadResourceRequestSchema` handler
3. Rebuild the server

### Adding New Commands

Create a new `.md` file in the `commands/` directory with YAML frontmatter:

```markdown
---
name: my-command
description: Description shown in /help
argument-hint: [arg1] [arg2]
---

Command instructions for Claude...
```

### Extending the Skill

Add new reference files to `skills/greeting-helper/references/` or example files to `skills/greeting-helper/examples/`, then reference them in `SKILL.md`.

## License

MIT License - Feel free to use this as a starting point for your own plugins.

## Author

Example Developer (developer@example.com)
