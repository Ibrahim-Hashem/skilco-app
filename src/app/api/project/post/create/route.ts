import { getAuthSession } from '@/lib/auth'
import { postValidator } from '@/lib/validators/post'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { projectId, title, content } = postValidator.parse(body)

    const isCreator = await db.project.findFirst({
      where: {
        id: projectId,
        creatorId: session.user.id,
      },
    })

    if (!isCreator) {
      return new Response('Unauthorized', { status: 401 })
    }
    
    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        projectId,
      },
    })
    return new Response('OK', { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response('Invalid Post Request', { status: 422 })
    }
    return new Response("Couldn't create post", { status: 500 })
  }
}
