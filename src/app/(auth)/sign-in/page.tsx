import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import SignIn from '@/components/SignIn'
import { Icons } from '@/components/Icons'

const Page: FC = () => {
  return (
    <div className=" absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href={'/'}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-start -mt-20'
          )}
        >
          <Icons.chevronLeft className="w-6 h-6 mr-2" />
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  )
}

export default Page
