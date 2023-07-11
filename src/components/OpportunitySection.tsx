import { FC } from 'react'
import KeyValue from './KeyValue'
import { Card } from './ui/Card'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface OpportunitySectionProps {
  slug: string
}
const OpportunitySection = async ({ slug }: OpportunitySectionProps) => {
  // fetch opportunity from database
  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
  })
  const opportunities =
    (await db.opportunity.findMany({
      where: {
        projectId: project?.id,
      },
      include: {
        author: true,
      },
    })) || []

  const isProject = !!project
  if (!isProject) return notFound()

  return (
    <Card className="px-4 py-2">
      <h1 className="font-bold text-2xl md:text-1xl"> Opportunities</h1>
      {opportunities.length > 0 ? (
        opportunities.map((ops) => {
          return (
            <div
              className="flex flex-col"
              key={ops?.projectId + ops?.authorId + ops?.createdAt}
            >
              <KeyValue label={ops?.title} value={ops?.description} />
            </div>
          )
        })
      ) : (
        <p>No opportunities</p>
      )}
    </Card>
  )
}

export default OpportunitySection
