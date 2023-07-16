import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { DeleteOpportunityValidator } from '@/lib/validators/opportunity'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    // check if user is logged in
    const session = await getAuthSession()
    // check if user is admin of project
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()

    if (!body.title || !body.projectId) {
      return new Response('Invalid request body', { status: 400 })
    }

    const { title, projectId } = DeleteOpportunityValidator.parse(body)

    const projectExists = await db.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        creator: true,
      },
    })

    if (!projectExists) {
      return new Response('Project does not exist', { status: 404 })
    }

    if (projectExists.creatorId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    // check if opportunity exists
    const opportunityExists = await db.opportunity.findFirst({
      where: {
        title: title,
        projectId: projectId,
      },
    })

    // check if opportunity is in project
    if (!opportunityExists) {
      return new Response('Opportunity does not exist', { status: 404 })
    }

    await db.opportunity.delete({
      where: {
        projectId_title: {
          projectId: projectId as string,
          title: title as string,
        },
      },
    })

    return new Response(JSON.stringify(title), { status: 200 })
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 })
    }
    return new Response(e.message, { status: 500 })
  }
}
