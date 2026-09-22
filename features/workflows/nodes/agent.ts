import type { Stagehand } from "@browserbasehq/stagehand"
import { z } from "zod"

const agentOutputSchema = z.object({
  report: z.string().min(1),
})

export async function agent({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const result = await stagehand.agent().execute({
    instruction: `${instruction}

IMPORTANT OUTPUT REQUIREMENT:
When you finish the task, return the complete final answer as the structured \`report\` field.
The \`report\` must contain the full report/content requested by the workflow, not a confirmation message such as "task completed".
Do not omit the report just because the browser actions are complete.`,
    output: agentOutputSchema,
  })

  const report =
    typeof result.output?.report === "string" && result.output.report.trim()
      ? result.output.report
      : result.message

  return {
    success: result.success,
    report,
    message: result.message,
    completed: result.completed,
  }
}
