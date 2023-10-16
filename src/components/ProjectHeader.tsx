'use client'

import { FC, startTransition, use, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'
import { Icons } from './Icons'
import SubscribeUnfollowToggle from './SubscribeUnfollowToggle'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { Project } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { EditProjectPayload } from '@/lib/validators/project'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { is } from 'date-fns/locale'

interface ProjectHeaderProps {
  isCreator: boolean
  projectId: string
  isSubscribed: boolean
  project: Project & {
    creator: {
      id: string
      name: string | null
      username: string | null
    }
  }
}

interface projectInfoInterface {
  location?: string
  website?: string
  companyNumber?: string
  description?: string
}

const ProjectHeader = ({
  isCreator,
  projectId,
  isSubscribed,
  project,
}: ProjectHeaderProps) => {
  const [projectInfo, setProjectInfo] = useState<projectInfoInterface>({
    location: project?.location || undefined,
    website: project?.website || undefined,
    companyNumber: project?.companyNumber || undefined,
    description: project?.description || undefined,
  })

  const router = useRouter()

  const { mutate: EditProject, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: EditProjectPayload = {
        location: projectInfo.location,
        website: projectInfo.website,
        companyNumber: projectInfo.companyNumber,
        description: projectInfo.description,
        name: project.name,
      }

      const { data } = await axios.put(`/api/project`, payload)

      return data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: `Couldn't edit project`,
          description:
            'there was an error editing your project, try again later',
          variant: 'destructive',
        })
      }
      toast({
        title: `Something went wrong`,
        description: 'there was an error editing, try again later',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      toast({
        title: `Project edited`,
        description: 'Your project has been edited',
        variant: 'default',
      })
    },
  })

  return (
    <div className="relative h-28 md:h-64 w-full">
      <Image
        src="/bgImage.jpg"
        alt="project background image"
        fill={true}
        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <div className="absolute mt-20 ml-4 h-36 w-36  md:mt-48 md:ml-8 box-content overflow-clip ">
        <Image
          src="/bgImage.jpg"
          alt="project background image"
          fill={true}
          style={{ overflow: 'clip', borderRadius: '0.5rem' }}
        />
      </div>
      {isCreator ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="absolute top-4 right-4 md:top-8 md:right-8"
              variant="outline"
            >
              <Icons.edit className="mr-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
              <DialogDescription>
                {`Make changes to your profile here. Click save when you're done.`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* project Location */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="project-location"
                  value={projectInfo.location || ''}
                  className="col-span-3"
                  onChange={(e) => {
                    setProjectInfo({ ...projectInfo, location: e.target.value })
                  }}
                  required
                />
              </div>
              {/* project website */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-website" className="text-right">
                  Website
                </Label>
                <Input
                  id="project-website"
                  value={projectInfo.website || ''}
                  className="col-span-3"
                  onChange={(e) => {
                    setProjectInfo({ ...projectInfo, website: e.target.value })
                  }}
                  required
                />
              </div>

              {/* project description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="project-description"
                  value={projectInfo.description}
                  className="col-span-3"
                  onChange={(e) => {
                    setProjectInfo({
                      ...projectInfo,
                      description: e.target.value,
                    })
                  }}
                  required
                />
              </div>
              {/* project company number */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-company-number" className="text-right">
                  Company Number
                </Label>
                <Input
                  id="project-company-number"
                  value={projectInfo.companyNumber}
                  className="col-span-3"
                  onChange={(e) => {
                    setProjectInfo({
                      ...projectInfo,
                      companyNumber: e.target.value,
                    })
                  }}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => EditProject()}
                isLoading={isLoading}
                disabled={
                  projectInfo.companyNumber == undefined ||
                  projectInfo.description == undefined ||
                  projectInfo.location == undefined ||
                  projectInfo.website == undefined ||
                  isLoading
                }
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <SubscribeUnfollowToggle
          projectId={projectId}
          isSubscribed={isSubscribed}
        />
      )}
    </div>
  )
}

export default ProjectHeader
