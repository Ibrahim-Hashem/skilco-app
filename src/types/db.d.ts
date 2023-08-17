import { Post, Project, User, Vote, Comment } from '@prisma/client'
export type ExtendedPost = Post & {
  project: Project
  votes: Vote[]
  author: User
  comments: Comment[]
}

export type ExtendedProject = Project & {
  posts: ExtendedPost[]
}
