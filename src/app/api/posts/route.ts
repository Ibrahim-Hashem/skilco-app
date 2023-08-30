import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const session = await getAuthSession()

  let followedProjectsIds: string[] = []

  if (session) {
    const followedProjects = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        project: true,
      },
    })
    followedProjectsIds = followedProjects.map(({ project }) => project.id)
  }

  try {
    const { limit, page, projectName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        projectName: z.string().nullish().optional(),
      })
      .parse({
        projectName: url.searchParams.get('projectName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })
    let whereClause = {}
    if (projectName) {
      whereClause = {
        project: {
          name: projectName,
        },
      }
    } else if (session) {
      whereClause = {
        project: {
          id: {
            in: followedProjectsIds,
          },
        },
      }
    }
    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        project: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })
    return new Response(JSON.stringify(posts))
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response('invalid request data passed', { status: 400 })
    }
    return new Response(error.message, {
      status: 500,
    })
  }
}
