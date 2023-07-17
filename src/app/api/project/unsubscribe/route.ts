import { getAuthSession } from '@/lib/auth'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ProjectSubscriptionsValidator } from '@/lib/validators/project'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    // check if user is authenticated
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()
    const { projectId } = ProjectSubscriptionsValidator.parse(body)
    // check if user is already subscribed to project
    const isSubscribed = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        projectId: projectId,
      },
    })

    if (!isSubscribed) {
      return new Response('Not subscribed', { status: 409 })
    }

    if (isSubscribed) {
      // delete subscription
      await db.subscription.delete({
        where: {
          userId_projectId: {
            userId: session.user.id,
            projectId: projectId,
          },
        },
      })
    }
    return new Response('Successfully unsubscribed', { status: 200 })
  } catch (e: any) {
    if (e instanceof AxiosError) {
      return new Response(e.message, { status: 500 })
    }
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 })
    }
    return new Response(e.message, { status: 500 })
  }
}
