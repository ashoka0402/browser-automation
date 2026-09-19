
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Canvas } from "./canvas"
import { ConsolePanel } from "./console-panel"
import { RightSidebar } from "./right-sidebar"

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <div className="size-full overflow-hidden bg-[#09090b] text-zinc-100">
      <ResizablePanelGroup
        orientation="horizontal"
        className="size-full"
      >
        <ResizablePanel minSize="30rem">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel minSize="18rem">
              <div className="size-full overflow-hidden">
                <Canvas />
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-zinc-800 hover:bg-violet-500/50" />

            <ResizablePanel
              defaultSize="8rem"
              minSize="6rem"
            >
              <div className="size-full border-t border-zinc-800 bg-[#0c0c0f]">
                <ConsolePanel />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle className="bg-zinc-800 hover:bg-violet-500/50" />

        <ResizablePanel
          defaultSize="16rem"
          minSize="14rem"
          maxSize="36rem"
        >
          <div className="size-full border-l border-zinc-800 bg-[#111114]">
            <RightSidebar workflowId={workflowId} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}