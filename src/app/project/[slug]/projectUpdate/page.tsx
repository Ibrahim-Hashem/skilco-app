import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Editor from '@/components/Editor'
import { getAuthSession } from '@/lib/auth'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = params
  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
  })

  const session = await getAuthSession()
  const currentUser = session?.user.id

  const isCreator = project?.creatorId === currentUser

  if (!isCreator) {
    return notFound()
  }

  if (!project) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="border-b border-gray-500 pb-5">
        <div className="items-baseline">
          <h3 className=" text-base font-semibold text-gray-900">
            Create an update post for {slug}
          </h3>
        </div>
      </div>
      {/* form */}
      <Editor projectId={project?.id} />
      <div className="flex justify-center w-full">
        <Button
          type="submit"
          className="w-full "
          form="project-update-post-form"
        >
          Post
        </Button>
      </div>
    </div>
  )
}
