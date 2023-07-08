'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateProjectPayload } from '@/lib/validators/project'
import { ProjectType } from '@/lib/enum'
import DropdownMenuRadioGroupDemo from '@/components/DropdownMenuRadioGroupDemo'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'

const Page = () => {
  const [input, setInput] = useState<string>('')
  const [type, setType] = useState<ProjectType>(ProjectType.PUBLIC)

  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateProjectPayload = {
        name: input as string,
        type: type as ProjectType,
        
      }
      const { data } = await axios.post('/api/project', payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast({
            title: 'Project already exists',
            description: 'Please choose a different name',
            variant: 'destructive',
          })
        }
        if (error.response?.status === 422) {
          toast({
            title: 'Invalid project name',
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
    onSuccess: (data) => {
      router.push(`/project/${data}`)
    },
  })

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a project</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Project name cannot be changed once created.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 pl-1 inset-y-0 grid place-items-center text-zinc-400">
              project/
            </p>
            <Input
              value={input}
              className="pl-14"
              onChange={(e) => {
                e.preventDefault()
                setInput(e.target.value)
              }}
            />
          </div>
          <div className="flex items-center mt-6">
            <p className="text-lg font-medium mr-4">Status</p>
            <div className="relative">
              <DropdownMenuRadioGroupDemo setStatus={setType} status={type} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant={'subtle'} onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            variant={'subtle'}
            onClick={() => createProject()}
            disabled={input.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
