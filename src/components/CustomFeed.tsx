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

  const createdProjects = await db.project.findMany({
    where: {
      creatorId: session?.user?.id,
    },
  })

  const posts = await db.post.findMany({
    where: {
      project: {
        id: {
          in: [
            ...followedProjects.map(({ project }) => project.id),
            ...createdProjects.map(({ id }) => id),
          ],
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
