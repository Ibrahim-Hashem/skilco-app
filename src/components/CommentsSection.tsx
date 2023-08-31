import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { FC } from 'react'
import PostComment from './PostComment'

interface CommentsSectionProps {
  postId: string
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession()

  const comments = await db.comment.findMany({
    where: {
      postId,
      replytoId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />
      {/* add comment feature: todo*/}
      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replytoId)
          .map((topLevelComment) => {
            const topLevelCommentsVotesAmt = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === 'UP') {
                  return acc + 1
                }
                if (vote.type === 'DOWN') {
                  return acc - 1
                }
                return acc
              },
              0
            )
            const topLevelCommentVote = topLevelComment.votes.find(
              (vote) => vote.userId === session?.user?.id
            )
            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <div className="mb-2">
                  <PostComment />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CommentsSection