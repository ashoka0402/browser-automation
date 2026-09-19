const STEEL_BASE_URL = (process.env.STEEL_BASE_URL ?? "https://api.steel.dev").replace(/\/$/, "")
const STEEL_API_KEY = process.env.STEEL_API_KEY

export type SteelSession = {
  id: string
  websocketUrl: string
  debugUrl?: string | null
}

function withSteelAuth(init: RequestInit = {}): RequestInit {
  const headers = new Headers(init.headers)

  if (STEEL_API_KEY) {
    headers.set("steel-api-key", STEEL_API_KEY)
  }

  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json")
  }

  return { ...init, headers }
}

export async function steelRequest(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(
    `${STEEL_BASE_URL}${path}`,
    withSteelAuth(init)
  )
}

async function steelJson<T>(response: Response, label: string): Promise<T> {
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `${label} failed (${response.status}): ${body || response.statusText}`
    )
  }

  return response.json() as Promise<T>
}

export async function createSteelSession(): Promise<SteelSession> {
  const response = await steelRequest("/v1/sessions", {
    method: "POST",
    body: JSON.stringify({
      debugConfig: {
        interactive: false,
      },
    }),
  })

  return steelJson<SteelSession>(response, "Steel session creation")
}

export function steelCdpUrl(session: SteelSession): string {
  // Self-hosted Steel normally runs without auth. Cloud Steel returns a
  // websocket URL that requires the API key as a query parameter.
  if (!STEEL_API_KEY) return session.websocketUrl

  const separator = session.websocketUrl.includes("?") ? "&" : "?"
  return `${session.websocketUrl}${separator}apiKey=${encodeURIComponent(STEEL_API_KEY)}`
}

export function steelViewerUrl(session: SteelSession): string {
  if (session.debugUrl) return session.debugUrl

  // Keep local self-hosting and cloud deployments working even when the
  // session response omits debugUrl.
  const publicBase = (
    process.env.STEEL_PUBLIC_URL ??
    STEEL_BASE_URL
  ).replace(/\/$/, "")

  return `${publicBase}/v1/sessions/${encodeURIComponent(session.id)}/debug`
}

export async function releaseSteelSession(sessionId: string): Promise<void> {
  const response = await steelRequest(
    `/v1/sessions/${encodeURIComponent(sessionId)}/release`,
    { method: "POST" }
  )

  if (!response.ok && response.status !== 404) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `Steel session release failed (${response.status}): ${body || response.statusText}`
    )
  }
}
