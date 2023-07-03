import { FC } from 'react'
import KeyValue from './KeyValue'

interface BusinessOverviewProps {}

const BusinessOverview: FC<BusinessOverviewProps> = ({}) => {
  return (
    <div>
      <h1>Business Overview</h1>
      <div className=''>
        <KeyValue label="Business Type" value="Sole Proprietorship" />
        
      </div>
    </div>
  )
}

export default BusinessOverview
