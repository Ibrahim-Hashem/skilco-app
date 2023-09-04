import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  // this api will return a list of projects contributions
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response('Not Authorised', { status: 400 })
    }

    const result = await db.contribution.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        project: true,
      },
    })

    return new Response(JSON.stringify(result), { status: 201 })
  } catch (e: any) {
    return new Response(e.message, { status: 500 })
  }
}
