import { z } from 'zod'

export const postValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'title must be longer' })
    .max(128, { message: 'title must be shorter' }),
  projectId: z.string(),
  content: z.any(),
})

export type PostCreationRequest = z.infer<typeof postValidator>

export const DeletePostValidator = z.object({
  postId: z.string(),
})

export type DeletePostRequest = z.infer<typeof DeletePostValidator>
