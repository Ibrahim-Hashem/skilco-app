import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { OpportunityValidator } from '@/lib/validators/opportunity'

export async function POST(req: Request) {
  try {
    // check if user is logged in
    const session = await getAuthSession()
    // check if user is admin of project
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()
    const { title, description, projectId } = OpportunityValidator.parse(body)

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
        title,
        projectId,
      },
    })

    // check if opportunity is in project
    if (opportunityExists) {
      return new Response('Opportunity already exists', { status: 409 })
    }

    const newOpportunity = await db.opportunity.create({
      data: {
        title: title,
        description: description,
        projectId: projectId,
      },
    })

    return new Response(JSON.stringify(newOpportunity.title), { status: 201 })
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 })
    }
    return new Response(e.message, { status: 500 })
  }
}
