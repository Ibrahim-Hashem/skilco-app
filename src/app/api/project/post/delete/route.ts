import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { DeletePostValidator } from '@/lib/validators/post'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('postId', JSON.stringify(body))
    const { postId } = DeletePostValidator.parse(body)

    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    // check if post belongs to user
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    })
    if (!post) {
      return new Response('Not found', { status: 404 })
    }
    if (post.authorId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    })

    return new Response('OK', { status: 200 })
  } catch (error: any) {
    return new Response(error.message, { status: 500 })
  }
}
