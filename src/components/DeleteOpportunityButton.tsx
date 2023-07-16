'use client'
import { FC } from 'react'
import { Icons } from './Icons'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { DeleteOpportunityPayload } from '@/lib/validators/opportunity'
import { toast } from '@/hooks/use-toast'

interface DeleteOpportuniyButtonProps {
  projectId?: string
  title?: string
}

const DeleteOpportunityButton: FC<DeleteOpportuniyButtonProps> = ({
  projectId,
  title,
}) => {
  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: deleteOpportunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: DeleteOpportunityPayload = {
        projectId: projectId?.toString() as string,
        title: title?.toString() as string,
      }
      const { data } = await axios.post(`/api/removeOpportunity`, payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast()
        }
        if (error.response?.status === 404) {
          toast({
            title: 'Opportunity not found',
            description: 'Please try again',
            variant: 'destructive',
          })
        }
      }
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Opportunity deleted',
      })
    },
  })

  return (
    <div className="flex justify-end">
      <button
        disabled={isLoading}
        className="text-sm text-red-200 hover:text-red-500"
        onClick={() => deleteOpportunity()}
      >
        <Icons.x />
      </button>
    </div>
  )
}

export default DeleteOpportunityButton
