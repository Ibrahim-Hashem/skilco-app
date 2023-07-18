'use client'

import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import UserAvatar from './UserAvatar'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Icons } from './Icons'

interface MiniCreatePostProps {
  session: Session | null
  isCreator: boolean
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session, isCreator }) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <li className="overflow-hidden rounded-md bg-white shadow list-none">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
            className="w-8 h-8 md:w-12 md:h-12"
          />
          {session && (
            <span className="absolute bottom-[3px] right-[3px] md:bottom-0 md:right-0 inline-block w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <Input
          readOnly
          onClick={() =>
            session && isCreator
              ? router.push(pathname + '/projectUpdate')
              : router.push('/sign-in')
          }
          placeholder="Create post"
        />

        <Button
          variant="ghost"
          onClick={() =>
            session && isCreator
              ? router.push(pathname + '/projectUpdate')
              : router.push('/sign-in')
          }
        >
          <Icons.image className="text-zinc-600" />
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            session && isCreator
              ? router.push(pathname + '/projectUpdate')
              : router.push('/sign-in')
          }
        >
          <Icons.link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  )
}

export default MiniCreatePost
