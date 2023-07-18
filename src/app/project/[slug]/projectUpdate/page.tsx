import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  const { slug } = params
  const project = db.project.findFirst({
    where: {
      name: slug,
    },
  })

  if (!project) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-500 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create an update post for {slug}
          </h3>
          <p className=""></p>
        </div>
      </div>
    </div>
  )
}
