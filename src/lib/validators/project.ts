import { z } from 'zod'

export const ProjectValidator = z.object({
  name: z.string().min(3).max(21),
  type: z.enum(['PUBLIC', 'PRIVATE']),
})

export const ProjectSubscriptionsValidator = z.object({
  projectId: z.string(),
})

export type CreateProjectPayload = z.infer<typeof ProjectValidator>
export type SubscribeToProjectPayload = z.infer<
  typeof ProjectSubscriptionsValidator
>
