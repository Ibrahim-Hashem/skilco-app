'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CreateProjectPayload } from '@/lib/validators/project'

const Page = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateProjectPayload = {
        name: input as string,
      }
      const { data } = await axios.post('/api/project')
      return data as string
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
            Project names cannot be changed once created.
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
