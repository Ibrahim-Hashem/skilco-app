import { FC } from 'react'

interface KeyValueProps {
  label: string
  value: string
}

const KeyValue: FC<KeyValueProps> = ({ label, value }: KeyValueProps) => {
  return (
    <div className="my-2">
      <div className=" grid grid-cols-2 gap-4 ">
        <div className="text-sm font-bold text-gray-700 overflow-auto">
          {label}
        </div>
        <div className="text-sm text-gray-500 overflow-auto">{value}</div>
      </div>
    </div>
  )
}

export default KeyValue
