import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {
  const { slug } = params
  const session = await getAuthSession()
  const currentUserId = session?.user.id

  const projects = await db.project.findMany({
    where: {
      creatorId: currentUserId,
    },
  })

  return (
    <div>
      {projects.map((project) => {
        return <div key={project.id}>{project.name}</div>
      })}
    </div>
  )
}

export default page
