import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from '@/components/UserAccountNav'
import SearchBar from '@/components/SearchBar'

const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <nav className="bg-zinc-100 border-b border-zinc-300 z-[10] py-1">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="w-14 h-8 sm:w-16 sm:h-8 " />
        </Link>
        {/* search bar */}
        <SearchBar />
        {/* auth */}
        {session?.user ? (
          <UserAccountNav user={session?.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
export default Navbar
