import { FC } from 'react'
import KeyValue from './KeyValue'
import { Card } from './ui/card'

interface OpportunitySectionProps {}

const mockOppertunities = [
  {
    id: 1,
    title: 'Opportunity 1',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Opportunity 2',
    description: 'Description 2',
  },
  {
    id: 3,
    title: 'Opportunity 3',
    description: 'Description 3',
  },
]

const OpportunitySection: FC<OpportunitySectionProps> = ({}) => {
  return (
    <Card className="px-4 py-2">
      <h1 className="font-bold text-2xl md:text-1xl"> Opportunities</h1>
      {mockOppertunities.length > 0 ? (
        mockOppertunities.map((oppertunity) => {
          return (
            <div className="flex flex-col" key={oppertunity.id}>
              <KeyValue
                label={oppertunity.title}
                value={oppertunity.description}
              />
            </div>
          )
        })
      ) : (
        <p>No oppertunities</p>
      )}
    </Card>
  )
}

export default OpportunitySection
