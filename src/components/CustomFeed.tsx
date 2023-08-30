import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import ProjectUpdateFeed from './ProjectUpdateFeed'
import { getAuthSession } from '@/lib/auth'

const CustomFeed = async () => {
  const session = await getAuthSession()

  const followedProjects = await db.subscription.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      project: true,
    },
  })

  const posts = await db.post.findMany({
    where: {
      project: {
        name: {
          in: followedProjects.map(({ project }) => project.id),
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      project: true,
      comments: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  })

  return <ProjectUpdateFeed initialPosts={posts} />
}

export default CustomFeed
