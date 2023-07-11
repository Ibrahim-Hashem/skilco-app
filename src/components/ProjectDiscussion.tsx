import { FC } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card'
interface ProjectDiscussionProps {}

const ProjectDiscussion: FC<ProjectDiscussionProps> = ({}) => {
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

export default ProjectDiscussion
