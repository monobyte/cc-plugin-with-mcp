---
name: greet
description: Generate a personalized greeting using the example MCP server
argument-hint: [name] [style: formal|casual|enthusiastic]
---

Generate a personalized greeting for the specified person.

## Instructions

1. Parse the arguments:
   - First argument ($1): The name of the person to greet
   - Second argument ($2): The greeting style (optional, defaults to "casual")

2. Use the example MCP server's `greet` tool with the provided parameters:
   - name: $1
   - style: $2 (if provided)

3. If the name is not provided, ask the user for a name.

4. Present the generated greeting to the user.

## Valid Styles

- **formal**: Professional, respectful greetings for business contexts
- **casual**: Friendly, everyday greetings
- **enthusiastic**: Excited, energetic greetings for celebrations

## Examples

- `/greet Alice` - Generates a casual greeting for Alice
- `/greet Bob formal` - Generates a formal greeting for Bob
- `/greet Charlie enthusiastic` - Generates an enthusiastic greeting for Charlie
