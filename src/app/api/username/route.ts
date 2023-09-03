import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = UsernameValidator.parse(body)

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    })

    if (username) {
      return new Response('Username already taken', { status: 409 })
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        username: name,
      },
    })

    return new Response('OK', { status: 200 })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response('Invalid request type: username update', {
        status: 400,
      })
    }
    return new Response(`Couldn't update username. Please try again later `, {
      status: 500,
    })
  }
}
