'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'
import { Icons } from './Icons'
import SubscribeUnfollowToggle from './SubscribeUnfollowToggle'

interface ProjectHeaderProps {
  isCreator: boolean
  projectId: string
  isSubscribed: boolean
}

const ProjectHeader = ({
  isCreator,
  projectId,
  isSubscribed,
}: ProjectHeaderProps) => {
  return (
    <div className="relative h-28 md:h-64 w-full">
      <Image
        src="/bgImage.jpg"
        alt="project background image"
        fill={true}
        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <div className="absolute mt-20 ml-4 h-36 w-36  md:mt-48 md:ml-8 box-content overflow-clip ">
        <Image
          src="/bgImage.jpg"
          alt="project background image"
          fill={true}
          style={{ overflow: 'clip', borderRadius: '0.5rem' }}
        />
      </div>
      {isCreator ? (
        <Button
          className="absolute top-4 right-4 md:top-8 md:right-8"
          variant="outline"
          onClick={() => console.log('edit project')}
        >
          <Icons.edit className="mr-2" />
          Edit
        </Button>
      ) : (
        <SubscribeUnfollowToggle
          projectId={projectId}
          isSubscribed={isSubscribed}
        />
      )}
    </div>
  )
}

export default ProjectHeader
