import { CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { db } from '@/lib/db'
interface ProjectIdeaProps {
  slug: string
  isCreator: boolean
}

const ProjectIdea = async ({ slug, isCreator }: ProjectIdeaProps) => {
  const project = await db.project.findFirst({
    where: {
      name: slug,
    },
  })
  const projectIdea =
    project?.idea && project?.idea.length > 0 ? project.idea : null
  return (
    <>
      <CardHeader>
        <CardTitle>Idea</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {projectIdea ? projectIdea : isCreator ? 'add content' : 'No idea yet'}
      </CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectIdea
