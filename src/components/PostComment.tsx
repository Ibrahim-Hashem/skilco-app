'use client'
import { FC, startTransition, useRef, useState } from 'react'
import UserAvatar from './UserAvatar'
import { CommentVote, User, Comment } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils'
import CommentVotes from './CommentVotes'
import { Button } from './ui/Button'
import { MessageSquare } from 'lucide-react'
import { Icons } from './Icons'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { boolean } from 'zod'
import { Textarea } from './ui/Textarea'
import { Label } from './ui/Label'
import { CommentRequest } from '@/lib/validators/comment'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}
interface PostCommentProps {
  comment: ExtendedComment
  votesAmt: number
  currentVote: CommentVote | undefined
  postId: string
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const postCommentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { data: session } = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      }
      const { data } = await axios.patch(`/api/project/post/comment`, payload)
      return data
    },
    onError: (err) => {
      return toast({
        title: 'Ohhh no!',
        description: 'Something went wrong while posting your comment.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      startTransition(() => {
        router.refresh()
        setIsReplying(false)
      })
      toast({
        title: 'Comment posted',
        variant: 'default',
      })
    },
  })
  return (
    <div className="flex flex-col" ref={postCommentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-8 w-8 mr-2"
        />
        <div className="flex item-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            {comment.author.name}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
      <div className="flex gap-2 items-center flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!session) router.push('/sign-in')
            setIsReplying((prev) => !prev)
            setInput('')
          }}
        >
          <Icons.messageSquare className="h-4 w-4 text-zinc-700 mr-4" />
          Reply
        </Button>
        {isReplying ? (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Your Comment</Label>

            <Textarea
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Comment..."
            />
            <div className="mt-2 flex justify-end">
              <Button
                isLoading={isLoading}
                disabled={input.length === 0}
                onClick={() => {
                  if (!input) return
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replytoId ?? comment.id,
                  })
                }}
              >
                {!isLoading && <Icons.send />}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PostComment
