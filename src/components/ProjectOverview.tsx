import { FC } from 'react'
import BusinessOverview from './BusinessOverview'
import InvestmentSummary from './InvestmentSummary'

interface ProjectOverviewProps {}

const ProjectOverview: FC<ProjectOverviewProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <div className="border border-red-500"></div> */}
      <BusinessOverview />
      {/* <div className="border border-red-500"></div> */}
      <InvestmentSummary />
    </div>
  )
}

export default ProjectOverview
