# Local Steel Browser

This project can run browser automation against a local Steel Browser container instead of Browserbase.

## Start Steel

From the repository root:

```powershell
docker compose -f infra/steel/docker-compose.yml up -d
```

Steel is intentionally mapped away from the Next.js defaults:

- API: `http://localhost:3100`
- UI: `http://localhost:3100/ui`
- CDP: `localhost:9323`

Check that Steel is healthy:

```powershell
curl.exe http://localhost:3100/v1/health
```

Stop it with:

```powershell
docker compose -f infra/steel/docker-compose.yml down
```

## App environment

For local Next.js + Trigger.dev development, put this in your local `.env.local`:

```env
STEEL_BASE_URL=http://localhost:3100
STEEL_PUBLIC_URL=http://localhost:3100

# Required by Stagehand's model provider.
GOOGLE_API_KEY=your_google_api_key
```

Do not set `STEEL_API_KEY` for this local self-hosted setup.

For Steel Cloud, use:

```env
STEEL_BASE_URL=https://api.steel.dev
STEEL_API_KEY=your_steel_api_key
STEEL_PUBLIC_URL=https://api.steel.dev
```

## Run the app

Terminal 1:

```powershell
npm run dev
```

Terminal 2:

```powershell
npx trigger.dev@latest dev
```

Then run a workflow from the dashboard.

The workflow task creates one Steel session lazily on the first browser node and reuses it for the rest of the workflow. The session metadata contains the Steel debug URL, so the run console can open a live read-only browser view while the run is active. Once the run finishes, the app polls Steel's HLS recording endpoint and plays the session recording in the inspector.

## Important local-development limitation

Steel Local is intended for local development and has a single-session concurrency limit. It is not a drop-in replacement for a multi-tenant production browser fleet. Use Steel Cloud or your own horizontally scaled browser infrastructure when several workflows must run at the same time.

Also, `localhost:3100` only works when the Trigger.dev worker is running on the same machine. A Trigger.dev Cloud task cannot reach a Steel container bound to your laptop's localhost. In that case, expose Steel through a reachable private/public endpoint or use Steel Cloud.
