# Browser Automation

A visual browser automation platform for building, running, and monitoring AI-powered workflows.

Build workflows by connecting nodes on a React Flow canvas. Browser actions are executed through Stagehand with Gemini, the browser runs inside Steel, and the workflow engine is handled by Trigger.dev.

## What it does

Browser Automation turns browser tasks into reusable visual workflows.

You can:

- Build workflows with a drag-and-drop canvas
- Open websites and navigate between pages
- Let an AI agent perform browser actions from natural-language instructions
- Observe pages and find elements using AI
- Extract structured information from webpages
- Send emails from workflow results
- Reuse outputs from previous nodes with `{{ nodeId.path }}` connections
- Run workflows asynchronously with Trigger.dev
- Watch the browser session live while a workflow is executing
- Inspect every workflow step, status, duration, output, and error
- Collaborate on workflow graphs with Liveblocks
- Persist workflow graphs with Neon Postgres and Drizzle ORM

## Example workflow

A simple workflow can look like:

```text
Start
  ↓
Open URL
  ↓
Observe
  ↓
Agent / Act
  ↓
Extract
  ↓
Send Email
```

For example:

> Open Google → find the search box → search for a product → extract the result → email it.

Each node is independently configurable from the editor panel, and outputs can be connected to later nodes.

## Architecture

```text
┌───────────────────────────────────────────────────────────┐
│                    Next.js Dashboard                       │
│                                                           │
│  React Flow Canvas  ←→  Liveblocks  ←→  Workflow Editor  │
└────────────────────────────┬──────────────────────────────┘
                             │
                             │ Trigger workflow
                             ▼
┌───────────────────────────────────────────────────────────┐
│                     Trigger.dev Task                       │
│                                                           │
│  Load graph → Topological order → Execute each node      │
└───────────────┬─────────────────────────┬─────────────────┘
                │                         │
                │ Browser automation      │ Email
                ▼                         ▼
        ┌───────────────┐          ┌─────────────┐
        │ Steel Browser │          │   Resend    │
        │     + CDP     │          │             │
        └───────┬───────┘          └─────────────┘
                │
                ▼
        ┌─────────────────┐
        │    Stagehand    │
        │  + Gemini model │
        └─────────────────┘
```

### Execution flow

1. The workflow graph is saved before a run starts.
2. The graph is topologically sorted so connected nodes execute in dependency order.
3. The first browser node lazily creates a Steel browser session.
4. Stagehand connects to that browser over CDP.
5. Browser nodes share the same Steel session for the entire workflow.
6. Step metadata is published to Trigger.dev as execution progresses.
7. The dashboard subscribes to the run and shows live step status.
8. While the run is active, the console can display the live Steel browser session.

## Node types

| Node | Purpose |
| --- | --- |
| **Start** | Workflow entry point |
| **Open URL** | Navigate the browser to a URL |
| **Observe** | Find elements on the current page from a natural-language instruction |
| **Act** | Perform a browser action from a natural-language instruction |
| **Agent** | Let the AI agent handle a browser task autonomously |
| **Extract** | Extract information from the current page |
| **Send Email** | Send workflow output through Resend |

## Tech stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- React Flow
- Tailwind CSS
- shadcn/ui

### Workflow and automation
- Trigger.dev
- Stagehand
- Google Gemini
- Steel Browser
- CDP

### Data and collaboration
- Neon Postgres
- Drizzle ORM
- Liveblocks

### Integrations
- Resend
- Clerk

### Observability
- Sentry

## Getting started

### Requirements

Make sure you have:

- Node.js
- Docker
- A Google AI API key
- A Clerk project
- A Neon database
- A Liveblocks project
- A Trigger.dev project
- A Resend account

### Clone the repository

```bash
git clone https://github.com/ashoka0402/browser-automation.git
cd browser-automation
npm install
```

### Environment variables

Create `.env.local` and configure the services used by the application.

For local Steel:

```env
STEEL_BASE_URL=http://localhost:3100
STEEL_PUBLIC_URL=http://localhost:3100

GOOGLE_API_KEY=your_google_api_key
```

You will also need the project-specific Clerk, Neon, Liveblocks, Trigger.dev, and Resend environment variables.

Do not commit `.env.local` or API keys to the repository.

## Run Steel locally

The project includes a Docker setup for Steel.

Start it from the repository root:

```powershell
docker compose -f infra/steel/docker-compose.yml up -d
```

Steel is exposed locally at:

```text
API: http://localhost:3100
UI:  http://localhost:3100/ui
CDP: localhost:9323
```

Health check:

```powershell
curl.exe http://localhost:3100/v1/health
```

Stop Steel:

```powershell
docker compose -f infra/steel/docker-compose.yml down
```

## Run the application

Start the Next.js app:

```bash
npm run dev
```

In another terminal, start the Trigger.dev development worker:

```bash
npx trigger.dev@latest dev
```

Then open the dashboard, create a workflow, connect your nodes, and press **Run**.

For local development, the Trigger.dev worker and Steel container must be reachable from the same machine. A Trigger.dev Cloud task cannot directly access a Steel container bound to your laptop's `localhost`.

## Workflow data flow

Node inputs support references to outputs produced by earlier nodes.

For example:

```text
{{ 5ff40d74-04a0-45d2-9f76-fec3573f0d16.title }}
```

This allows one node to consume data produced by another node without hard-coding values.

## Reliability and execution

The workflow runner:

- Executes only nodes connected to the workflow graph
- Topologically sorts connected nodes before execution
- Tracks `pending`, `running`, `done`, and `failed` states
- Records step duration
- Stores step output for inspection
- Publishes live execution metadata through Trigger.dev
- Reuses one Steel session across browser nodes in a run
- Cleans up the Stagehand connection and Steel session after execution

## Project structure

```text
app/
├── (dashboard)/           # Dashboard routes
├── api/                   # API routes
└── sign-in/ sign-up/      # Clerk authentication

components/
└── ui/                    # Shared UI primitives

features/
└── workflows/
    ├── components/        # Canvas, sidebar, console, live browser
    ├── hooks/             # Workflow-specific hooks
    ├── lib/               # Validation and interpolation
    ├── nodes/             # Node registry and executors
    └── tasks/             # Trigger.dev workflow tasks

infra/
└── steel/                 # Local Steel browser setup

lib/
├── db/                    # Drizzle schema and database helpers
├── steel.ts               # Steel API integration
├── resend.ts              # Resend client
└── liveblocks.ts           # Liveblocks integration
```

## Useful commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format

npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

## Local Steel vs Steel Cloud

Local Steel is useful for development and testing.

The bundled setup is intentionally local and is not designed as a multi-tenant browser fleet. For concurrent production workloads, use Steel Cloud or deploy your own scalable browser infrastructure.

## Current status

This project is actively being built around a simple idea:

**describe the task → connect the workflow → let the browser execute it → watch the run happen.**

The architecture is intentionally modular so additional browser actions, integrations, triggers, and workflow primitives can be added without changing the core execution engine.

## License

Private project.
