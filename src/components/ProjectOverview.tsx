import { FC } from 'react'
import BusinessOverview from './BusinessOverview'
import OpportunitySection from './OpportunitySection'

interface ProjectOverviewProps {
  slug: string
  isCreator: boolean
}

const ProjectOverview: FC<ProjectOverviewProps> = ({ slug, isCreator }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BusinessOverview />
      {/* @ts-expect-error Server Component */}
      <OpportunitySection slug={slug} isCreator={isCreator} />
    </div>
  )
}

export default ProjectOverview
