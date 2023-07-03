import { FC } from 'react'

interface KeyValueProps {
  label: string
  value: string
}

const KeyValue: FC<KeyValueProps> = ({ label, value }: KeyValueProps) => {
  return (
    <div className=" grid grid-cols-2 gap-4 ">
      <div className="text-sm font-bold text-gray-500">{label}</div>
      <div className="text-sm text-gray-500">{value}</div>
    </div>
  )
}

export default KeyValue
