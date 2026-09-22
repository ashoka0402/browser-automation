import type { Stagehand } from "@browserbasehq/stagehand"

export async function agent({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const result = await stagehand.agent().execute({
    instruction: `${instruction}

FINAL OUTPUT REQUIREMENT:
Your final response must be the complete report/content requested by this workflow.
Return the actual report itself as your final response.
Do NOT respond with a confirmation such as "task completed", "successfully created", or "I created the report".
Do NOT describe what you would return. Return the report content directly.`,
  })

  return {
    success: result.success,
    report: result.message,
    message: result.message,
    completed: result.completed,
  }
}
