"use client"

import { useState } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { InspectorPanel } from "@/features/workflows/components/inspector-panel"
import { useConsoleRuns } from "@/features/workflows/components/workflow-runs-provider"
import {
  LogsPanel,
  type ConsoleSelection,
} from "@/features/workflows/components/logs-panel"

// True when two selections point at the same thing — same kind, same run, and
// for a step the same node. Clicking the active selection again clears it.
function isSameSelection(a: ConsoleSelection, b: ConsoleSelection) {
  if (a.kind !== b.kind) return false
  if (a.runId !== b.runId) return false
  return a.kind === "step" && b.kind === "step" ? a.nodeId === b.nodeId : true
}

// The run console below the canvas. It owns what's selected: the logs on the
// left drive the selection, and the InspectorPanel on the right shows either the
// selected step's output or the selected run's replay. Clicking the active
// selection again clears it.
export function ConsolePanel() {
  const [selected, setSelected] = useState<ConsoleSelection | null>(null)
  const runs = useConsoleRuns()
  const liveRun = runs.find((run) => run.isLive && run.steelDebugUrl)
  const effectiveSelected =
    selected ??
    (liveRun ? { kind: "live" as const, runId: liveRun.id } : null)

  const toggle = (selection: ConsoleSelection) => {
    setSelected((prev) =>
      prev && isSameSelection(prev, selection) ? null : selection
    )
  }

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="12rem">
        <LogsPanel selected={effectiveSelected} onSelect={toggle} />
      </ResizablePanel>
      {effectiveSelected && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="20rem" minSize="12rem">
            <InspectorPanel selection={effectiveSelected} />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}
