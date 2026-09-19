"use client"

import { useEffect, useState } from "react"

type Status = "loading" | "ready" | "error"

export function LiveSession({ viewerUrl }: { viewerUrl: string }) {
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    setStatus("loading")
  }, [viewerUrl])

  return (
    <div className="relative flex size-full min-h-0 bg-black">
      <iframe
        key={viewerUrl}
        src={viewerUrl}
        title="Live browser session"
        className="size-full border-0"
        allow="autoplay; fullscreen"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black text-xs text-muted-foreground">
          Connecting to live browser…
        </div>
      )}

      {status === "error" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black p-4 text-center text-xs text-muted-foreground">
          The live browser viewer could not be loaded.
        </div>
      )}
    </div>
  )
}
