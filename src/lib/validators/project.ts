import { z } from 'zod'

export const ProjectValidator = z.object({
  name: z.string().min(3).max(21),
})

export const ProjectSubscriptionsValidator = z.object({
  projectId: z.string(),
})

export type CreateProjectPayload = z.infer<typeof ProjectValidator>
export type SubscribeToPorjectPayload = z.infer<
  typeof ProjectSubscriptionsValidator
>
