import { z } from 'zod'

export const OpportunityValidator = z.object({
  title: z.string().min(3).max(21),
  description: z.string().min(3).max(100),
  projectId: z.string(),
})

export const AssignOpportunityValidator = z.object({
  projectId: z.string(),
  authorId: z.string(),
})

export const DeleteOpportunityValidator = z.object({
  projectId: z.string(),
  title: z.string(),
})

export type CreateOpportunityPayload = z.infer<typeof OpportunityValidator>
export type AssignOpportunityPayload = z.infer<
  typeof AssignOpportunityValidator
>
export type DeleteOpportunityPayload = z.infer<
  typeof DeleteOpportunityValidator
>
