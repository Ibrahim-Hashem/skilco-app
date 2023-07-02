'use client'

import { FC } from 'react'
import Image from 'next/image'

// interface ProjectHeaderProps {
//   projectBgImage: string
//   projectLogo: string
// }

const ProjectHeader = () => {
  return (
    // <div className="relative -mr-8 -ml-8 md:mr-0 md:ml-0 -mt-10 object-cover h-[20vh] md:h-[50vh] w-[100vw] ">
    //   <Image
    //     src="/bgImage.jpg"
    //     alt="project background image"
    //     fill={true}
    //     style={{ objectFit: 'cover' }}
    //   />
    // </div>
    <div className="relative h-28 md:h-64 w-full">
      <Image
        src="/bgImage.jpg"
        alt="project background image"
        fill={true}
        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <div className="absolute mt-20 ml-4 h-36 w-36  md:mt-48 md:ml-8">
        <Image
          src="/bgImage.jpg"
          alt="project background image"
          fill={true}
          style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </div>
    </div>
  )
}

export default ProjectHeader
