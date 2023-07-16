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
    if (isSubscribed) {
      return new Response('Already subscribed', { status: 409 })
    }
    // check if project exists
    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
    })
    if (!project) {
      return new Response('Project not found', { status: 404 })
    }
    // check if project is public
    if (project.type !== 'PUBLIC') {
      return new Response('Project is not public', { status: 403 })
    }
    // check if user is owner of project
    if (project.creatorId === session.user.id) {
      return new Response('Cannot subscribe to own project', { status: 403 })
    }
    // create subscription
    const subscription = await db.subscription.create({
      data: {
        userId: session.user.id,
        projectId: projectId,
      },
    })

    return new Response(JSON.stringify(subscription), { status: 200 })
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return new Response(err.message, { status: 500 })
    }
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 })
    }
    return new Response(err.message, { status: 500 })
  }
}
