---
name: Greeting Helper
description: This skill should be used when the user asks to "generate a greeting", "create a welcome message", "write a formal greeting", "personalize a message", "use the example MCP tools", or needs guidance on creating personalized greetings with different styles, using the example plugin's MCP server tools, or understanding the greeting patterns available.
version: 1.0.0
---

# Greeting Helper Skill

## Overview

This skill provides guidance for generating personalized greetings and using the example plugin's MCP server tools effectively. Use it to create appropriate greetings for various contexts and learn how to interact with the bundled MCP server.

## Available MCP Tools

The example plugin provides these MCP tools for generating greetings and other utilities:

### greet Tool

Generate personalized greetings with different styles.

**Parameters:**
- `name` (required): The person's name
- `style` (optional): One of "formal", "casual", or "enthusiastic"

**Style Guide:**
- **formal**: Professional settings, business communications, first introductions
- **casual**: Everyday interactions, friendly communications, team messages
- **enthusiastic**: Celebrations, welcomes, motivational contexts

### calculate Tool

Perform basic mathematical operations.

**Parameters:**
- `operation` (required): "add", "subtract", "multiply", or "divide"
- `a` (required): First number
- `b` (required): Second number

### get_timestamp Tool

Retrieve the current timestamp in various formats.

**Parameters:**
- `format` (optional): "iso", "unix", or "readable"

### random_fact Tool

Get an interesting fact from various categories.

**Parameters:**
- `category` (optional): "science", "history", "nature", or "technology"

## Greeting Patterns

### Formal Greetings

Use formal greetings in these contexts:
- Professional emails
- First-time introductions
- Business proposals
- Official communications

### Casual Greetings

Use casual greetings in these contexts:
- Team chat messages
- Internal communications
- Follow-up messages to known contacts
- Informal project updates

### Enthusiastic Greetings

Use enthusiastic greetings in these contexts:
- Welcome messages for new team members
- Celebration announcements
- Kickoff messages for exciting projects
- Achievement recognitions

## Integration with Other Tools

Combine greeting tools with timestamps for context-aware messages:

1. Get the current time using `get_timestamp` with format "readable"
2. Choose the appropriate greeting style based on time of day
3. Generate the greeting using the `greet` tool

## Quick Reference

| Context | Style | Example Use Case |
|---------|-------|------------------|
| Business email | formal | Client introduction |
| Slack message | casual | Team update |
| Welcome event | enthusiastic | New hire welcome |
| Meeting invite | formal | Board meeting |
| Daily standup | casual | Team sync |

## Additional Resources

### Reference Files

For detailed greeting templates and patterns:
- **`references/greeting-templates.md`** - Complete greeting template library
- **`references/context-guide.md`** - Detailed context selection guide

### Example Files

Working examples in `examples/`:
- **`examples/business-greetings.md`** - Professional greeting examples
- **`examples/team-greetings.md`** - Team communication examples
