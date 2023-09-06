import { FC } from 'react'
import KeyValue from './KeyValue'
import { Card } from './ui/Card'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

interface BusinessOverviewProps {
  slug: string
}

const BusinessOverview = async ({ slug }: BusinessOverviewProps) => {
  const session = await getAuthSession()
  const currentUser = session?.user.id
  const project = await db.project.findFirst({
    where: {
      name: slug,
      creatorId: currentUser,
    },
  })

  return (
    <Card className="px-4 py-2">
      <h1 className="font-bold text-2xl md:text-1xl">Business Overview</h1>
      {project?.location && (
        <KeyValue label="Location" value={project.location} />
      )}

      {project?.website && (
        <a href={project.website} target="_blank">
          <KeyValue label="Website" value={project.website} />
        </a>
      )}

      {project?.createdAt && (
        <KeyValue
          label="Created"
          value={
            project.createdAt
              ? project.createdAt.toLocaleDateString().toString()
              : ''
          }
        />
      )}

      {project?.employees && (
        <KeyValue
          label="Employees"
          value={project?.employees ? project?.employees.toString() : ''}
        />
      )}
      {project?.companyNumber && (
        <KeyValue
          label="Company Number"
          value={project?.companyNumber ? project.companyNumber : 'N/A'}
        />
      )}
      {project?.description && (
        <KeyValue label="Description" value={project.description} />
      )}
    </Card>
  )
}

export default BusinessOverview
