import { Post, Vote, VoteType } from '@prisma/client'
import { get } from 'http'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import PostVoteClient from './PostVoteClient'

interface PostVoteServerProps {
  postId: string
  initialVoteAmt?: number
  initialVote?: VoteType | null
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>
}

const PostVoteServer = async ({
  postId,
  initialVoteAmt,
  initialVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getServerSession()

  let _voteAmt: number = 0
  let _currentVote: VoteType | null | undefined = undefined

  if (getData) {
    const post = await getData()
    if (!post) return notFound()

    _voteAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type
  } else {
    _voteAmt = initialVoteAmt!
    _currentVote = initialVote
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmt={_voteAmt}
      initialVote={_currentVote}
    />
  )
}

export default PostVoteServer
