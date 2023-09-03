import { db } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) {
    return new Response('Missing query', { status: 400 })
  }

  const result = await db.project.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    include: {
      _count: true,
    },
    take: 5,
  })

  return new Response(JSON.stringify(result))
}
