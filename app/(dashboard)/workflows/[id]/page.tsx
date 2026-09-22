import { OrganizationList } from "@clerk/nextjs"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { notFound } from "next/navigation"
import { ReactFlowProvider } from "@xyflow/react"

import { liveblocks } from "@/lib/liveblocks"
import { getWorkflowById } from "@/features/workflows/data"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { WorkflowRunsProvider } from "@/features/workflows/components/workflow-runs-provider"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { userId, orgId } = await auth()
  if (!userId) notFound()

  // Resolve the workflow by ID first. The URL may survive an organization
  // switch, so authorization is handled separately below.
  const workflow = await getWorkflowById(id)
  if (!workflow) notFound()

  // If the workflow belongs to another organization, make sure the signed-in
  // user is a member before asking Clerk to switch the active organization.
  if (workflow.orgId !== orgId) {
    const client = await clerkClient()
    const membership = await client.organizations.getOrganizationMembershipList({
      organizationId: workflow.orgId,
      userId: [userId],
      limit: 1,
    })

    if (membership.data.length === 0) notFound()

    return (
      <div className="flex min-h-svh items-center justify-center p-8">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-6">
          <div>
            <h1 className="text-lg font-semibold">Select your organization</h1>
            <p className="text-sm text-muted-foreground">
              This workflow belongs to an organization that is not currently active.
            </p>
          </div>
          <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={`/workflows/${id}`}
            afterCreateOrganizationUrl="/"
          />
        </div>
      </div>
    )
  }

  // Rooms are private by default under ID-token auth. Grant write access to the
  // owning org, matching the `groupIds: [orgId]` issued by the auth endpoint.
  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
    metadata: {
      title: workflow.name,
    },
  })

  // A read-only token scoped to this workflow's run tag, so the client can
  // subscribe to its runs in realtime. Good for ~an hour of an open canvas.
  const runsToken = await triggerAuth.createPublicToken({
    scopes: {
      read: {
        tags: [`workflow:${id}`],
      },
    },
    expirationTime: "1hr",
  })

  // The canvas and the sidebar's node palette live in separate components, so a
  // single ReactFlowProvider wraps both to give them one shared React Flow store.
  return (
    <Room roomId={id}>
      <ReactFlowProvider>
        <WorkflowRunsProvider workflowId={id} accessToken={runsToken}>
          <WorkflowShell workflowId={id} />
        </WorkflowRunsProvider>
      </ReactFlowProvider>
    </Room>
  )
}