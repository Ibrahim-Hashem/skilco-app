import { FC } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
interface ProjectTeamProps {}

const ProjectTeam: FC<ProjectTeamProps> = ({}) => {
  return (
    <>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectTeam
