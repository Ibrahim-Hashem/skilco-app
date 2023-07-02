import { buttonVariants } from '@/components/ui/Button'
import { toast } from './use-toast'
import Link from 'next/link'

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Please login',
      description: 'You need to login to proceed',
      variant: 'destructive',
      action: (
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href="/sign-in"
          onClick={() => dismiss()}
        >
          Login
        </Link>
      ),
    })
  }
  return { loginToast }
}
