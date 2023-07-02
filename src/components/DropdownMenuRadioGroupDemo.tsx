'use client'

import { Dispatch, SetStateAction, FunctionComponent, useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { ProjectType } from '@/lib/enum'

interface IProps {
  setStatus: Dispatch<SetStateAction<ProjectType>>
  status: ProjectType
}

const DropdownMenuRadioGroupDemo: FunctionComponent<IProps> = ({
  setStatus,
  status,
}: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="subtle">{status}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-40" margin-left="5px">
        <DropdownMenuLabel>Status of your Project </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(e) => {
            setStatus(e as ProjectType)
          }}
        >
          <DropdownMenuRadioItem value={'PUBLIC' as ProjectType}>
            Public
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem  value={'PRIVATE' as ProjectType}>
            Private
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuRadioGroupDemo
