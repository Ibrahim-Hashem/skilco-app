import ProjectHeader from '@/components/ProjectHeader'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
  params: { slug: string }
}

const Layout = async ({ children, params: { slug } }: LayoutProps) => {
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
        },
      },
    },
  })
  const subscription = !currentUser
    ? undefined
    : await db.subscription.findFirst({
        where: {
          project: {
            name: slug,
          },
          user: {
            id: session?.user.id,
          },
        },
      })
  const isSubscribed = !!subscription
  if (!project) {
    return notFound()
  }
  const memberCount = await db.subscription.count({
    where: {
      project: {
        name: slug,
      },
    },
  })
  return (
    <>
      <div className="pb-28 h-auto">
        <ProjectHeader isCreator={isSubscribed} />
      </div>
      {children}
    </>
  )
}

export default Layout
