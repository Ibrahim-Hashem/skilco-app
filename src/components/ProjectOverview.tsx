import { FC } from 'react'
import BusinessOverview from './BusinessOverview'
import OpportunitySection from './OpportunitySection'

interface ProjectOverviewProps {}

const ProjectOverview: FC<ProjectOverviewProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BusinessOverview />
      <OpportunitySection />
    </div>
  )
}

export default ProjectOverview
