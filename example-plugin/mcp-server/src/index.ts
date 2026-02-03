#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create the MCP server instance
const server = new Server(
  {
    name: "example-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "greet",
        description: "Generate a friendly greeting for a person",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the person to greet",
            },
            style: {
              type: "string",
              enum: ["formal", "casual", "enthusiastic"],
              description: "The style of greeting (default: casual)",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "calculate",
        description: "Perform a basic mathematical calculation",
        inputSchema: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              enum: ["add", "subtract", "multiply", "divide"],
              description: "The mathematical operation to perform",
            },
            a: {
              type: "number",
              description: "The first operand",
            },
            b: {
              type: "number",
              description: "The second operand",
            },
          },
          required: ["operation", "a", "b"],
        },
      },
      {
        name: "get_timestamp",
        description: "Get the current timestamp in various formats",
        inputSchema: {
          type: "object",
          properties: {
            format: {
              type: "string",
              enum: ["iso", "unix", "readable"],
              description: "The format for the timestamp (default: iso)",
            },
          },
        },
      },
      {
        name: "random_fact",
        description: "Get a random interesting fact",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["science", "history", "nature", "technology"],
              description: "Category of fact (default: random)",
            },
          },
        },
      },
    ],
  };
});

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "example://config",
        name: "Plugin Configuration",
        description: "Example plugin configuration data",
        mimeType: "application/json",
      },
      {
        uri: "example://help",
        name: "Help Documentation",
        description: "Usage instructions for the example plugin",
        mimeType: "text/markdown",
      },
      {
        uri: "example://facts",
        name: "Facts Database",
        description: "Collection of interesting facts",
        mimeType: "application/json",
      },
    ],
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "example://config":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(
              {
                version: "1.0.0",
                features: {
                  greetings: true,
                  calculations: true,
                  timestamps: true,
                  facts: true,
                },
                settings: {
                  defaultGreetingStyle: "casual",
                  defaultTimestampFormat: "iso",
                },
              },
              null,
              2
            ),
          },
        ],
      };

    case "example://help":
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: `# Example MCP Server Help

## Available Tools

### greet
Generate personalized greetings with different styles.
- **name** (required): Person's name
- **style** (optional): formal, casual, or enthusiastic

### calculate
Perform basic math operations.
- **operation** (required): add, subtract, multiply, or divide
- **a** (required): First number
- **b** (required): Second number

### get_timestamp
Get current time in various formats.
- **format** (optional): iso, unix, or readable

### random_fact
Get an interesting fact from various categories.
- **category** (optional): science, history, nature, or technology

## Resources
- **example://config**: Plugin configuration
- **example://help**: This help document
- **example://facts**: Facts database
`,
          },
        ],
      };

    case "example://facts":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(FACTS_DATABASE, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// Facts database
const FACTS_DATABASE = {
  science: [
    "A teaspoon of neutron star would weigh about 6 billion tons.",
    "Honey never spoils - archaeologists have found 3000-year-old honey that was still edible.",
    "Octopuses have three hearts and blue blood.",
    "The human brain uses about 20% of the body's total energy.",
  ],
  history: [
    "The Great Wall of China is not visible from space with the naked eye.",
    "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
    "Oxford University is older than the Aztec Empire.",
    "The shortest war in history lasted only 38-45 minutes (Anglo-Zanzibar War, 1896).",
  ],
  nature: [
    "A group of flamingos is called a 'flamboyance'.",
    "Bananas are berries, but strawberries are not.",
    "Trees can communicate with each other through underground fungal networks.",
    "Cows have best friends and get stressed when separated.",
  ],
  technology: [
    "The first computer programmer was Ada Lovelace in the 1840s.",
    "The average smartphone has more computing power than NASA had for the Apollo 11 moon landing.",
    "The first website is still online at info.cern.ch.",
    "Email existed before the World Wide Web.",
  ],
};

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "greet": {
      const { name: personName, style = "casual" } = args as {
        name: string;
        style?: string;
      };

      let greeting: string;
      switch (style) {
        case "formal":
          greeting = `Good day, ${personName}. It is a pleasure to make your acquaintance.`;
          break;
        case "enthusiastic":
          greeting = `Hey there, ${personName}! So awesome to meet you! This is going to be great!`;
          break;
        case "casual":
        default:
          greeting = `Hi ${personName}! Nice to meet you.`;
          break;
      }

      return {
        content: [
          {
            type: "text",
            text: greeting,
          },
        ],
      };
    }

    case "calculate": {
      const { operation, a, b } = args as {
        operation: string;
        a: number;
        b: number;
      };

      let result: number;
      let explanation: string;

      switch (operation) {
        case "add":
          result = a + b;
          explanation = `${a} + ${b} = ${result}`;
          break;
        case "subtract":
          result = a - b;
          explanation = `${a} - ${b} = ${result}`;
          break;
        case "multiply":
          result = a * b;
          explanation = `${a} * ${b} = ${result}`;
          break;
        case "divide":
          if (b === 0) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: Division by zero is not allowed.",
                },
              ],
              isError: true,
            };
          }
          result = a / b;
          explanation = `${a} / ${b} = ${result}`;
          break;
        default:
          return {
            content: [
              {
                type: "text",
                text: `Error: Unknown operation '${operation}'.`,
              },
            ],
            isError: true,
          };
      }

      return {
        content: [
          {
            type: "text",
            text: explanation,
          },
        ],
      };
    }

    case "get_timestamp": {
      const { format = "iso" } = args as { format?: string };
      const now = new Date();

      let timestamp: string;
      switch (format) {
        case "unix":
          timestamp = Math.floor(now.getTime() / 1000).toString();
          break;
        case "readable":
          timestamp = now.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          });
          break;
        case "iso":
        default:
          timestamp = now.toISOString();
          break;
      }

      return {
        content: [
          {
            type: "text",
            text: timestamp,
          },
        ],
      };
    }

    case "random_fact": {
      const { category } = args as { category?: string };

      let facts: string[];
      if (category && category in FACTS_DATABASE) {
        facts = FACTS_DATABASE[category as keyof typeof FACTS_DATABASE];
      } else {
        // Combine all facts if no category specified
        facts = Object.values(FACTS_DATABASE).flat();
      }

      const randomFact = facts[Math.floor(Math.random() * facts.length)];

      return {
        content: [
          {
            type: "text",
            text: randomFact,
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `Error: Unknown tool '${name}'.`,
          },
        ],
        isError: true,
      };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Example MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
