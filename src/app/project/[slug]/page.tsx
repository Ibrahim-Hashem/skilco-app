import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { notFound } from 'next/navigation'
import ProjectHeader from '@/components/ProjectHeader'
import ProjectOverview from '@/components/ProjectOverview'
import ProjectTabs from '@/components/ProjectTabs'

interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {
  const { slug } = params
  const session = await getAuthSession()

  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          project: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  })

  const projectMembers = await db.subscription.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      user: true,
    },
  })
  const subscribed = projectMembers.length || 0

  const projects = await db.contribution.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      user: true,
    },
  })
  const contributers = projects.length || 0

  if (!project) {
    return notFound()
  }
  return (
    <>
      {/* header bgImge and logo */}
      <div className="pb-28">
        <ProjectHeader />
      </div>
      {/* name and bio */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl h-auto">
          {project?.name}
        </h1>
        {project?.description && (
          <p className="text-sm md:text-base">{project?.description}</p>
        )}
        {subscribed && (
          <p className="text-sm md:text-base">
            {' '}
            <span className="text-zinc-400">Followers:</span> {subscribed}
          </p>
        )}

        <p className="text-sm md:text-base">
          <span className="text-zinc-400">Contributers: </span>
          {contributers}
        </p>
      </div>
      {/* business overview section */}
      <ProjectOverview />
      {/* tabs */}
      <ProjectTabs />
    </>
  )
}

export default page
