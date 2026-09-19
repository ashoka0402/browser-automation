"use client"

import { NodeIcon } from "@/features/workflows/components/node-icon"
import { LiveSession } from "@/features/workflows/components/live-session"
import { useConsoleRuns } from "@/features/workflows/components/workflow-runs-provider"
import type { ConsoleSelection } from "@/features/workflows/components/logs-panel"

// A short, centered note for when there's nothing concrete to show.
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
      {children}
    </div>
  )
}

// The output pane for whatever the logs have selected: a step or the live browser.
 // It re-reads the shared run history so a still-running step's output appears
 // the moment it lands, without a re-select.
export function InspectorPanel({ selection }: { selection: ConsoleSelection }) {
  const runs = useConsoleRuns()
  const run = runs.find((r) => r.id === selection.runId)

  // A live selection points at the same Steel session while it is executing.
  if (selection.kind === "live") {
    if (run?.isLive && run.steelDebugUrl) {
      return <LiveSession viewerUrl={run.steelDebugUrl} />
    }

    return <Note>This live browser session is no longer available.</Note>
  }

  const step = run?.steps.find((s) => s.nodeId === selection.nodeId)

  // The selected step can vanish if its run drops out of the realtime window.
  if (!step) return <Note>This step is no longer available.</Note>

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <NodeIcon type={step.type} />
        <span className="truncate text-xs font-semibold">{step.title}</span>
      </div>
      {step.error ? (
        <pre className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-destructive">
          {step.error}
        </pre>
      ) : step.output !== undefined ? (
        <pre className="min-h-0 flex-1 overflow-auto p-3 font-mono text-xs">
          {JSON.stringify(step.output, null, 2)}
        </pre>
      ) : step.status === "pending" ? (
        <Note>This step hasn&apos;t run yet.</Note>
      ) : step.status === "running" ? (
        <Note>Waiting for this step to finish…</Note>
      ) : (
        <Note>This step produced no output.</Note>
      )}
    </div>
  )
}
