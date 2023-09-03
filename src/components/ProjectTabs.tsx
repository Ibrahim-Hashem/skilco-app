import { Card } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectIdea from '@/components/ProjectIdea'
import ProjectKeyInformation from '@/components/ProjectKeyInformation'
import ProjectTeam from '@/components/ProjectTeam'
import ProjectUpdates from '@/components/ProjectUpdates'
import { Session } from 'next-auth'

import { ExtendedProject } from '@/types/db'

export function ProjectTabs({
  slug,
  isCreator,
  session,
  project,
}: {
  slug: string
  isCreator: boolean
  session: Session | null
  project: ExtendedProject
}) {
  return (
    <Tabs defaultValue="idea" className="">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="idea"
          defaultChecked
        >
          Idea
        </TabsTrigger>
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="keyInformation"
        >
          Key Information
        </TabsTrigger>
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="team"
        >
          Team
        </TabsTrigger>
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="posts"
        >
          Posts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="idea">
        <Card>
          {/* @ts-expect-error Server Component */}
          <ProjectIdea slug={slug} isCreator={isCreator} />
        </Card>
      </TabsContent>
      <TabsContent value="keyInformation">
        <Card>
          {/* @ts-expect-error Server Component */}
          <ProjectKeyInformation slug={slug} isCreator={isCreator} />
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          {/* @ts-expect-error Server Component */}
          <ProjectTeam slug={slug} isCreator={isCreator} />
        </Card>
      </TabsContent>
      <TabsContent value="posts">
        <Card>
          <ProjectUpdates
            isCreator={isCreator}
            session={session}
            project={project}
          />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default ProjectTabs
