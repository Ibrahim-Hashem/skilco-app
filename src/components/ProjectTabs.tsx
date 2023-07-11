import { Card } from '@/components/ui/Card'
// import { Input } from '@/components/ui/Input'
// import { Label } from '@/components/ui/Label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import ProjectIdea from '@/components/ProjectIdea'
import ProjectKeyInformation from '@/components/ProjectKeyInformation'
import ProjectTeam from '@/components/ProjectTeam'
import ProjectUpdates from '@/components/ProjectUpdates'
import ProjectDiscussion from '@/components/ProjectDiscussion'
import ProjectDocuments from '@/components/ProjectDocuments'
import { Session } from 'next-auth'

export function ProjectTabs({
  slug,
  isCreator,
  session,
}: {
  slug: string
  isCreator: boolean
  session: Session | null
}) {
  return (
    <Tabs defaultValue="idea" className="">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
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
          value="updates"
        >
          Updates
        </TabsTrigger>
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="Discussion"
        >
          Discussion
        </TabsTrigger>
        <TabsTrigger
          className="bg-zinc-100 my-2 mx-4 hover:bg-zinc-300"
          value="Documents"
        >
          Documents
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
      <TabsContent value="updates">
        <Card>
          <ProjectUpdates isCreator={isCreator} session={session} />
        </Card>
      </TabsContent>
      <TabsContent value="Discussion">
        <Card>
          <ProjectDiscussion />
        </Card>
      </TabsContent>
      <TabsContent value="Documents">
        <Card>
          <ProjectDocuments />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default ProjectTabs
