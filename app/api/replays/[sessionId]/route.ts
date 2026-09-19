import * as Sentry from "@sentry/nextjs"
import { auth } from "@clerk/nextjs/server"
import { steelRequest } from "@/lib/steel"

// Proxies a Steel session's replay so the browser can play it back. Any cloud
// Steel API key stays server-side; the client only sees the resulting playlist.
//
// The recording can lag the session release by a short window. We surface that
// as 202 Accepted so the SessionReplay component keeps polling until the HLS
// playlist is available.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { userId, orgId } = await auth()
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { sessionId } = await params

  Sentry.getIsolationScope().setAttributes({
    route: "GET /api/replays/[sessionId]",
    userId,
    orgId,
    sessionId,
  })

  try {
    // Steel exposes completed session recordings as an HLS playlist at this
    // endpoint. The recording may take a few seconds to become available after
    // the browser session is released, so a 404 is treated as "not ready".
    const response = await steelRequest(
      `/v1/sessions/${encodeURIComponent(sessionId)}/hls`
    )

    if (response.status === 404 || response.status === 409) {
      return new Response(null, { status: 202 })
    }

    if (!response.ok) {
      const body = await response.text().catch(() => "")
      Sentry.logger.error("Steel replay request failed", {
        sessionId,
        orgId,
        status: response.status,
        body,
      })
      return new Response("Unable to load recording", { status: 502 })
    }

    const m3u8 = await response.text()

    Sentry.logger.info("Steel session replay served", {
      sessionId,
      orgId,
    })

    return new Response(m3u8, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        // Steel's HLS manifest contains signed segment URLs; don't cache the
        // manifest itself in the app route.
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    Sentry.logger.error("Steel replay proxy failed", {
      sessionId,
      orgId,
      error,
    })
    throw error
  }
}