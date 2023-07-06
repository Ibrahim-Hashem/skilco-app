import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/card'
// import { Input } from '@/components/ui/Input'
// import { Label } from '@/components/ui/Label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectIdea from '@/components/ProjectIdea'
import ProjectKeyInformation from '@/components/ProjectKeyInformation'
import ProjectTeam from '@/components/ProjectTeam'
import ProjectUpdates from '@/components/ProjectUpdates'
import ProjectDiscussion from '@/components/ProjectDiscussion'
import ProjectDocuments from '@/components/ProjectDocuments'

export function ProjectTabs() {
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
          <ProjectIdea />
        </Card>
      </TabsContent>
      <TabsContent value="keyInformation">
        <Card>
          <ProjectKeyInformation />
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          <ProjectTeam />
        </Card>
      </TabsContent>
      <TabsContent value="updates">
        <Card>
          <ProjectUpdates />
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
