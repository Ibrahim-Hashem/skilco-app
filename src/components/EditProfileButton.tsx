'use client'
import { User } from '@prisma/client'
import { FC, startTransition, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { Icons } from './Icons'
import { notFound, useRouter } from 'next/navigation'
import { ProfilePayload } from '@/lib/validators/profile'
import { useMutation } from '@tanstack/react-query'

import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'

interface EditProfileButtonProps {
  user: User | null
}
type ProfileInfo = {
  name: string
  username: string
  bio: string
  location: string
  website: string
}

const EditProfileButton: FC<EditProfileButtonProps> = ({ user }) => {
  const { loginToast } = useCustomToast()
  const router = useRouter()

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: user?.name ? user.name : '',
    username: user?.username ? user.username : '',
    bio: user?.bio ? user.bio : '',
    location: user?.location ? user.location : '',
    website: user?.website ? user.website : '',
  })

  const { mutate: updateProfileData, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: ProfilePayload = {
        name: profileInfo.name,
        username: profileInfo.username,
        bio: profileInfo.bio,
        location: profileInfo.location,
        website: profileInfo.website,
      }
      const { data } = await axios.put('/api/profileInfo', payload)
      return data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast({
            title: 'Profile already exists',
            description: 'Please choose a different name',
            variant: 'destructive',
          })
        }
        if (error.response?.status === 422) {
          toast({
            title: 'Invalid profile',
            description: 'Please try again',
            variant: 'destructive',
          })
        }
        if (error.response?.status === 404) {
          toast({
            title: 'Profile not found',
            description: 'Please try again',
            variant: 'destructive',
          })
        }
        if (error.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated',
        variant: 'default',
      })
    },
  })

  if (!user) return notFound()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="">
          <Icons.edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={profileInfo.name ? profileInfo.name : undefined}
              className="col-span-3"
              onChange={(e) =>
                setProfileInfo({
                  ...profileInfo,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={profileInfo.username ? profileInfo.username : undefined}
              placeholder="username"
              className="col-span-3"
              onChange={(e) =>
                setProfileInfo({
                  ...profileInfo,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input
              id="bio"
              value={profileInfo.bio ? profileInfo.bio : undefined}
              placeholder="I like to code and stuff..."
              className="col-span-3"
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, bio: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={profileInfo.location ? profileInfo.location : undefined}
              placeholder="United kingdom"
              className="col-span-3"
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, location: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input
              id="website"
              value={profileInfo.website ? profileInfo.website : undefined}
              placeholder="www.example.com"
              className="col-span-3"
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, website: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="subtle"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => updateProfileData()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileButton
