import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { db } from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
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
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Members</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            <TableRow>
              {projectTeam &&
                projectTeam.map((member) => {
                  return (
                    <>
                      <TableCell>{member.user.name}</TableCell>
                      <TableCell>{member?.role}</TableCell>
                    </>
                  )
                })}
              
              {contributors &&
                contributors.map((contributor) => {
                  return (
                    <>
                      <TableCell>{contributor.user.name}</TableCell>
                      <TableCell>{contributor?.workCarriedOut}</TableCell>
                    </>
                  )
                })}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </>
  )
}

export default ProjectTeam
