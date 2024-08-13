import { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Instructions from '@/components/project/Instructions'
import Feedback from '@/components/project/Feedback'

export default function Page({ params }: { params: { projectId: string } }): ReactNode {
  return (
    <Tabs defaultValue="instructions" className="">
      <TabsList>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="instructions">
        <Instructions projectId={params.projectId} />
      </TabsContent>

      <TabsContent value="feedback">
        <Feedback projectId={params.projectId} />
      </TabsContent>
    </Tabs>
  )
}
