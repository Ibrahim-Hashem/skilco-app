import { getAuthSession } from '@/lib/auth'
import { PostVoteValidator } from '@/lib/validators/vote'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { postId, voteType } = PostVoteValidator.parse(body)

    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const existingVote = await db.vote.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    })
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    })

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    
  } catch (error) {}
}
