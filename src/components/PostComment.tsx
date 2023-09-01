'use client'
import { FC, useRef } from 'react'
import UserAvatar from './UserAvatar'
import { CommentVote, User, Comment } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils'

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}
interface PostCommentProps {
  comment: ExtendedComment
}

const PostComment: FC<PostCommentProps> = ({ comment }) => {
  const postCommentRef = useRef<HTMLDivElement>(null)
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
    </div>
  )
}

export default PostComment
