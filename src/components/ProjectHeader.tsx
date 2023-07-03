'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'
import { Icons } from './Icons'

// interface ProjectHeaderProps {
//   projectBgImage: string
//   projectLogo: string
// }

const ProjectHeader = () => {
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
      {/* follow button for project */}
      <Button
        className="absolute top-4 right-4 md:top-8 md:right-8"
        variant="outline"
        onClick={() => console.log('follow project')}
      >
        <Icons.plus className="mr-2" />
        Follow
      </Button>
    </div>
  )
}

export default ProjectHeader
