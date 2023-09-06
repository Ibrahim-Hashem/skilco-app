'use client'

import { FC } from 'react'
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

interface ProjectHeaderProps {
  isCreator: boolean
  projectId: string
  isSubscribed: boolean
}

const ProjectHeader = ({
  isCreator,
  projectId,
  isSubscribed,
}: ProjectHeaderProps) => {
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
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
