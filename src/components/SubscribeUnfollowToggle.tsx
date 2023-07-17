'use client'
import { FC, startTransition, use, useEffect } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToProjectPayload } from '@/lib/validators/project'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useRouter } from 'next/navigation'

interface SubscribeUnfollowToggleProps {
  projectId: string
  isSubscribed: boolean
}

const SubscribeUnfollowToggle: FC<SubscribeUnfollowToggleProps> = ({
  projectId,
  isSubscribed,
}) => {
  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: subscribeToProject, isLoading: isLoadingSubscribing } =
    useMutation({
      mutationFn: async () => {
        const payload: SubscribeToProjectPayload = {
          projectId: projectId as string,
        }

        const { data } = await axios.post('/api/project/subscribe', payload)

        return data as string
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            toast({
              title: 'Already subscribed',
              description: 'You are already subscribed to this project',
              variant: 'destructive',
            })
          }
          if (error.response?.status === 422) {
            toast({
              title: 'Invalid project',
              description: 'Please choose a different project',
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
          title: 'Subscribed',
          description: 'You are now subscribed to this project',
          variant: 'default',
        })
      },
    })

  const { mutate: unsubscribeFromProject, isLoading: isLoadingUnsubscribing } =
    useMutation({
      mutationFn: async () => {
        const payload: SubscribeToProjectPayload = {
          projectId: projectId as string,
        }

        const { data } = await axios.post('/api/project/unsubscribe', payload)

        return data as string
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            toast({
              title: 'Already unsubscribed',
              description: 'You are already unsubscribed from this project',
              variant: 'destructive',
            })
          }
          if (error.response?.status === 422) {
            toast({
              title: 'Invalid project',
              description: 'Please choose a different project',
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
          title: 'Unsubscribed',
          description: 'You are now unsubscribed from this project',
          variant: 'default',
        })
      },
    })

  return isSubscribed ? (
    <Button
      className="absolute top-4 right-4 md:top-8 md:right-8"
      variant="outline"
      onClick={() => unsubscribeFromProject()}
      isLoading={isLoadingUnsubscribing}
    >
      Unfollow project
    </Button>
  ) : (
    <Button
      className="absolute top-4 right-4 md:top-8 md:right-8"
      variant="outline"
      onClick={() => subscribeToProject()}
      isLoading={isLoadingSubscribing}
    >
      Follow project
    </Button>
  )
}

export default SubscribeUnfollowToggle
