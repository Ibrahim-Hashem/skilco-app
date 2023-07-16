import { FC } from 'react'
import { Icons } from './Icons'
import DeletePropertyButton from './DeleteOpportunityButton'

interface KeyValueProps {
  label: string
  value: string
  type?: string
  isCreator?: boolean
  projectId?: string
  title?: string
}

const KeyValue: FC<KeyValueProps> = ({
  label,
  value,
  type = '',
  isCreator,
  projectId,
  title,
}: KeyValueProps) => {
  const deleteOpportunityButton = type === 'opportunity' && isCreator
  return (
    <div className="my-2">
      <div className=" grid grid-cols-2 gap-4 ">
        <div className="text-sm font-bold text-gray-700 overflow-auto">
          {label}
        </div>
        <div className="text-sm text-gray-500 overflow-auto flex justify-between">
          {value}
          {deleteOpportunityButton && (
            // <div className="flex justify-end">
            //   <button className="text-sm text-red-200 hover:text-red-500">
            //     <Icons.x />
            //   </button>
            // </div>
            <DeletePropertyButton projectId={projectId} title={title} />
          )}
        </div>
      </div>
    </div>
  )
}

export default KeyValue
