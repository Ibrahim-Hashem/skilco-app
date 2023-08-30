'use client'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { usePrevious } from '@mantine/hooks'
import { VoteType } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Icons } from '../Icons'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { PostVoteRequest } from '@/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { set } from 'date-fns'

interface PostVoteClientProps {
  postId: string
  initialVotesAmt: number
  initialVote?: VoteType | null
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVote,
  initialVotesAmt,
}) => {
  const { loginToast } = useCustomToast()
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const prevVote = usePrevious(currentVote)

  useEffect(() => {
    setCurrentVote(initialVote)
  }, [initialVote])

  const { mutate: vote, isLoading } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      }
      await axios.patch('/api/project/post/vote', payload)
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') {
        setVotesAmt((prev) => prev - 1)
      } else {
        setVotesAmt((prev) => prev + 1)
      }
      //reset current vote
      setCurrentVote(prevVote)
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          loginToast()
        }
      }
      return toast({
        title: 'something went wrong',
        description: 'Your vote was not registered, please try again later',
        variant: 'destructive',
      })
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined)
        if (type === 'UP') {
          setVotesAmt((prev) => prev - 1)
        } else if (type === 'DOWN') {
          setVotesAmt((prev) => prev + 1)
        }
      } else {
        setCurrentVote(type)
        if (type === 'UP') {
          setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
        } else if (type === 'DOWN') {
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
        }
      }
    },
  })

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        size="sm"
        variant="ghost"
        arial-label="upvote"
        onClick={() => vote('UP')}
      >
        <Icons.arrowUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>
      <Button
        size="sm"
        variant="ghost"
        arial-label="updown"
        onClick={() => vote('DOWN')}
      >
        <Icons.arrowDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </Button>
    </div>
  )
}

export default PostVoteClient
