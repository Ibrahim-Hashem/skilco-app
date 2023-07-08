import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

import { db } from '@/lib/db'
interface ProjectKeyInformationProps {
  slug: string
  isCreator: boolean
}

const ProjectKeyInformation = async ({
  slug,
  isCreator,
}: ProjectKeyInformationProps) => {
  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
  })
  const projectKeyInformation =
    project?.keyInformation && project?.keyInformation.length > 0
      ? project?.keyInformation
      : null
  return (
    <>
      <CardHeader>
        <CardTitle>Key Information</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {projectKeyInformation
          ? projectKeyInformation
          : isCreator
          ? 'add content'
          : 'No idea yet'}
      </CardContent>
    </>
  )
}

export default ProjectKeyInformation
