import { getAuthSession } from '@/lib/auth'
import { ProjectValidator } from '@/lib/validators/project'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()
    const { name, type } = ProjectValidator.parse(body)
    const projectExists = await db.project.findFirst({
      where: {
        name,
      },
    })

    if (projectExists) {
      return new Response('Project already exists', { status: 409 })
    }

    const newProject = await db.project.create({
      data: {
        name: name,
        creatorId: session.user.id,
        type: type || 'PUBLIC',
      },
    })

    await db.projectTeam.create({
      data: {
        userId: session.user.id,
        projectId: newProject.id,
        role: 'ADMIN',
      },
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        projectId: newProject.id,
      },
    })

    return new Response(JSON.stringify(newProject.name), { status: 201 })
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 })
    }
    return new Response(e.message, { status: 500 })
  }
}
