'use client'
import { FC, startTransition, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from './ui/Dialog'
import { Icons } from './Icons'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useMutation } from '@tanstack/react-query'
import { CreateOpportunityPayload } from '@/lib/validators/opportunity'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

interface ModalAddOpportunityProps {
  projectId: string
  slug: string
}

const ModalAddOpportunity: FC<ModalAddOpportunityProps> = ({
  projectId,
  slug,
}) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  // TODO: add mutation to create opportunity
  // mutation must pass in title, description, and projectId

  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: createOpportunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateOpportunityPayload = {
        title: title as string,
        description: description as string,
        projectId: projectId as string,
      }
      const { data } = await axios.post('/api/opportunity', payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast({
            title: 'Opportunity already exists',
            description: 'Please choose a different name',
            variant: 'destructive',
          })
        }
        if (error.response?.status === 422) {
          toast({
            title: 'Invalid opportunity name',
            description:
              'Please choose a different name between 3 and 21 characters',
            variant: 'destructive',
          })
        }
        if (error.response?.status == 401) {
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
        title: 'Opportunity created',
        description: 'Your opportunity has been created',
        variant: 'default',
      })
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Icons.plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an opportunity</DialogTitle>
          <DialogDescription>
            {`create an opportunity for skilco members to help collaborate on ${slug}.
            (Opportunity will be broadcasted to all scubscribers of ${slug})`}
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                value={title}
                placeholder="Enter a title for your opportunity"
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                id="username"
                value={description}
                placeholder="Enter a description for your opportunity"
                className="col-span-3"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="subtle"
            onClick={() => createOpportunity()}
            isLoading={isLoading}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddOpportunity
