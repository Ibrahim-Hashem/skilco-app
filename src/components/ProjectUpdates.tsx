import { CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'

import MiniCreatePost from './MiniCreatePost'
import { Session } from 'next-auth'

interface ProjectUpdatesProps {
  isCreator: boolean
  session: Session | null
}

const ProjectUpdates = ({ isCreator, session }: ProjectUpdatesProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>
          {isCreator ? 'Add Project Updates' : 'Update Feed'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <MiniCreatePost
          session={session}
          isCreator={isCreator}
          from="ProjectUpdatePost"
        />
        {/* display posts feed that where uploaded by project owner */}
      </CardContent>
      <CardFooter></CardFooter>
    </>
  )
}

export default ProjectUpdates
