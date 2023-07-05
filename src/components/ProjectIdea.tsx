import { FC } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface ProjectIdeaProps {}

const ProjectIdea: FC<ProjectIdeaProps> = ({}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Idea</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectIdea
