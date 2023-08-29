import { FC, useRef } from 'react'
import { ExtendedPost } from '@/types/db'
import { useRouter } from 'next/navigation'
import { formatTimeToNow } from '@/lib/utils'
import { Icons } from './Icons'
import { User, Vote } from '@prisma/client'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'

type PartialVote = Pick<Vote, 'type'>
interface PostProps {
  projectName: string
  post: ExtendedPost & {
    author: User
    votes: Vote[]
  }
  commentAmt: number
  votesAmt: number
  currentVote?: PartialVote
}

const Post: FC<PostProps> = ({
  projectName,
  post,
  commentAmt,
  votesAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null)
  const author = post?.author.name
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVote={currentVote?.type}
          initialVotesAmt={votesAmt}
        />
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {projectName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/project/${projectName}`}
                >
                  {projectName}
                </a>
                <span className="px-1">-</span>
              </>
            ) : null}
            <span>
              Posted by {author} - {formatTimeToNow(new Date(post.createdAt))}
            </span>
          </div>
          <a href={`project/${projectName}/post/${post.id}`}>
            <h2 className="text-lg font-semibold py-2 leading-6 text-zinc-900">
              {post.title}
            </h2>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent " />
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-grey-50 z-20 text-sm p-4 sm:px-6">
        <a
          href={`/project/${projectName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <Icons.messageSquare className="w-5 h-5" /> {commentAmt} comments
        </a>
      </div>
    </div>
  )
}

export default Post