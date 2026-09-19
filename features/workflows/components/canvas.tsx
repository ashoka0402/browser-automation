
"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ConnectionLineType,
  type ColorMode,
  type Edge,
  type NodeTypes,
  Panel,
} from "@xyflow/react"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"
import { AvatarStack } from "@liveblocks/react-ui"

import { StepNode } from "@/features/workflows/components/step-node"
import type { StepNodeType } from "@/features/workflows/nodes/node-registry"

import "@xyflow/react/dist/style.css"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-flow/styles.css"

const nodeTypes: NodeTypes = { step: StepNode }

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      type: "start",
      kind: "trigger",
      title: "Start",
      values: {},
    },
  },
]

const initialEdges: Edge[] = []

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const colorMode: ColorMode = mounted
    ? (resolvedTheme as ColorMode) ?? "dark"
    : "dark"

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDelete,
  } = useLiveblocksFlow({
    suspense: true,
    nodes: { initial: initialNodes },
    edges: { initial: initialEdges },
  })

  return (
    <div className="relative size-full overflow-hidden bg-[#09090b]">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={colorMode}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{
          stroke: "#71717a",
          strokeWidth: 2,
        }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "#52525b",
            strokeWidth: 2,
          },
        }}
        style={
          {
            "--xy-background-color": "#09090b",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
            "--xy-controls-button-background-color": "#18181b",
            "--xy-controls-button-color": "#e4e4e7",
            "--xy-controls-button-border-color": "#27272a",
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#3f3f46"
        />

        <Controls
          showInteractive={false}
          className="!overflow-hidden !rounded-xl !border !border-zinc-800 !bg-zinc-900 !shadow-xl [&>button]:!border-zinc-800 [&>button]:!bg-zinc-900 [&>button]:!fill-zinc-300 [&>button:hover]:!bg-zinc-800"
        />

        <Cursors />

        <Panel position="top-right">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-lg backdrop-blur">
            <AvatarStack />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}