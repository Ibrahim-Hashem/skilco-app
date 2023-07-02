import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { notFound, useRouter } from 'next/navigation'
import ProjectHeader from '@/components/ProjectHeader'

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
      <div>
        <h1 className="text-3xl font-bold md:text-4xl h-14">{project?.name}</h1>
        {project?.description && (
          <p className="text-sm md:text-base">{project?.description}</p>
        )}
      </div>
    </>
  )
}

export default page
