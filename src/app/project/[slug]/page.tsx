import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { notFound } from 'next/navigation'
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
  const currentUser = session?.user.id

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
      creator: true,
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

  const isCreator = project.creator.id == currentUser
  return (
    <>
      {/* name and bio */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl h-auto">
          {project?.name}
        </h1>
        {project?.description && (
          <p className="text-sm md:text-base">{project?.description}</p>
        )}
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="grid grid-cols-2 w-fit h-fit gap-2 text-sm md:text-base">
            <>
              <span className="text-zinc-400 ">{'Followers:'}</span>
              <span className="ml-2"> {subscribed}</span>
            </>

            <>
              <span className="text-zinc-400 ">{'contributors:'} </span>
              <span className="ml-2"> {contributers}</span>
            </>
          </div>
        </div>
      </div>
      {/* business overview section */}
      <ProjectOverview slug={slug} isCreator={isCreator} />
      {/* tabs */}
      <ProjectTabs slug={slug} isCreator={isCreator} session={session} />
    </>
  )
}

export default page
