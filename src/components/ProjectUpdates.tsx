import { CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'

import MiniCreatePost from './MiniCreatePost'
import ProjectUpdateFeed from './ProjectUpdateFeed'
import { Session } from 'next-auth'
import { ExtendedProject } from '@/types/db'

interface ProjectUpdatesProps {
  isCreator: boolean
  session: Session | null
  project: ExtendedProject
}

const ProjectUpdates = ({
  isCreator,
  session,
  project,
}: ProjectUpdatesProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>
          {isCreator ? 'Add Project Updates' : 'Update Feed'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isCreator && (
          <MiniCreatePost session={session} isCreator={isCreator} />
        )}
        {/* display posts feed that where uploaded by project owner */}
        <ProjectUpdateFeed
          initialPosts={project.posts}
          projectName={project.name}
          isCreator={isCreator}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectUpdates
