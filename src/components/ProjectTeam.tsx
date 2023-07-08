import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { db } from '@/lib/db'
import { stringify } from 'querystring'
interface ProjectTeamProps {
  slug: string
  isCreator: boolean
}

const ProjectTeam = async ({ slug, isCreator }: ProjectTeamProps) => {
  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
    include: {
      creator: true,
    },
  })

  const projectTeam = await db.projectTeam.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      user: true,
    },
  })

  const contributors = await db.contribution.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      user: true,
    },
  })

  return (
    <>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* project creator card */}
        
        {/* team cards */}

        {/* contributors */}
      </CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectTeam
