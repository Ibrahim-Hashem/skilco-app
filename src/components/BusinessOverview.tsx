import { FC } from 'react'
import KeyValue from './KeyValue'
import { Card } from './ui/card'

interface BusinessOverviewProps {}

const BusinessOverview: FC<BusinessOverviewProps> = ({}) => {
  return (
    <Card className="px-4 py-2">
      <h1 className="font-bold text-2xl md:text-1xl">Business Overview</h1>
      <KeyValue label="Business Type" value="Sole Proprietorship" />
      <KeyValue label="Location" value="London" />
      <KeyValue
        label="Social media"
        value="https://www.instagram.com/nike/?hl=en"
      />
      <KeyValue label="Website" value="https://www.nike.com/gb/" />
      <KeyValue label="Founded" value="1964" />
      <KeyValue label="Employees" value="76,700" />
      <KeyValue label="Company Number" value="13137770" />
    </Card>
  )
}

export default BusinessOverview
