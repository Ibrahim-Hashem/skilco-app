import { type } from 'os'
import { z } from 'zod'

export const profileValidator = z.object({
  name: z.string().min(3).max(21),
  username: z.string().min(3).max(21),
  bio: z.string().min(3).max(100).optional(),
  location: z.string().min(3).max(100).optional(),
  website: z.string().min(3).max(100).optional(),
})

export type ProfilePayload = z.infer<typeof profileValidator>
