import { getAuthSession } from '@/lib/auth'
import { PostVoteValidator } from '@/lib/validators/vote'
import { db } from '@/lib/db'
import type { CachedPayload } from '@/types/redis'
import { z } from 'zod'
import { redis } from '@/lib/redis'

const CACHE_AFTER_UPVOTES = 100

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
        votes: true,
        author: true,
      },
    })

    if (!post) {
      return new Response('Not found', { status: 404 })
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id,
            },
          },
        })

        return new Response('OK', { status: 200 })
      }

      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      })

      // recount the votes

      const votesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === 'UP') {
          return acc + 1
        }
        if (vote.type === 'DOWN') {
          return acc - 1
        }
        return acc
      }, 0)

      if (votesAmt >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedPayload = {
          id: post.id,
          title: post.title,
          authorUsername: post.author.username ?? '',
          content: JSON.stringify(post.content),
          currentVote: voteType,
          createdAt: post.createdAt,
        }

        await redis.hset(`post:${post.id}`, cachePayload)
      }
      return new Response('OK', { status: 200 })
    }

    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId,
      },
    })

    const votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') {
        return acc + 1
      }
      if (vote.type === 'DOWN') {
        return acc - 1
      }
      return acc
    }, 0)

    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPayload = {
        id: post.id,
        title: post.title,
        authorUsername: post.author.username ?? '',
        content: JSON.stringify(post.content),
        currentVote: voteType,
        createdAt: post.createdAt,
      }

      await redis.hset(`post:${post.id}`, cachePayload)
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid PATCH request data passed', { status: 400 })
    }
    return new Response(
      'Could not vote on a post at this time, Please try again later',
      { status: 500 }
    )
  }
}
