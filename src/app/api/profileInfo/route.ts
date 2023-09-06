import { z } from 'zod'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { profileValidator } from '@/lib/validators/profile'

export async function PUT(req: Request) {
  try {
    // check if user is logged in
    const session = await getAuthSession()
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }
    // check if user is user who is updating
    const sessionId = session.user.id

    // get user
    const user = await db.user.findUnique({
      where: { id: sessionId },
    })
    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // get body
    const body = await req.json()
    const { name, username, bio, location, website } =
      profileValidator.parse(body)

    // update userinfo
    await db.user.update({
      where: { id: sessionId },
      data: {
        name: name,
        username: username,
        bio: bio,
        location: location,
        website: website,
      },
    })
    return new Response('User info updated', { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 400 })
    }
    return new Response('Error when updating user info', { status: 500 })
  }
}
