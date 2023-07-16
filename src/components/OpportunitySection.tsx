import KeyValue from './KeyValue'
import ModalAddOpportunity from './ModalAddOpportunity'
import { Card, CardDescription } from './ui/Card'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

// import { mockOpportunities } from '@/mockData/Data'

interface OpportunitySectionProps {
  slug: string
  isCreator: boolean
}
const OpportunitySection = async ({
  slug,
  isCreator,
}: OpportunitySectionProps) => {
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
    })) || []

  const isProject = !!project
  if (!isProject) return notFound()

  return (
    <Card className="px-4 py-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl md:text-1xl"> Opportunities</h1>
        {/* OPEN POP UP MODAL */}
        {isCreator && (
          <ModalAddOpportunity projectId={project.id} slug={slug} />
        )}
      </div>
      <CardDescription className="text-sm">
        Opportunities are a great way to get involved in a project. You can
        message the project creator to get involved. (scroll to see more)
      </CardDescription>
      <div className="mt-4 overflow-y-scroll h-40">
        {opportunities.length > 0 ? (
          opportunities.map((ops) => {
            return (
              <div className="flex flex-col" key={ops?.title}>
                <KeyValue
                  label={ops?.title}
                  value={ops?.description}
                  type="opportunity"
                  isCreator={isCreator}
                  projectId={project.id}
                  title={ops?.title}
                />
              </div>
            )
          })
        ) : (
          <p>No opportunities</p>
        )}
      </div>
    </Card>
  )
}

export default OpportunitySection
