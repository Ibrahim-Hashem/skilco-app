'use client'
import { UsernameRequest, UsernameValidator } from '@/lib/validators/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { FC, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface UserNameFormProps {
  user: Pick<User, 'id' | 'username'>
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || '',
    },
  })

  const router = useRouter()

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = {
        name,
      }
      const { data } = await axios.patch('/api/username', payload)
      return data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status == 409) {
          return toast({
            title: 'Username already taken',
            description: 'Please try another username',
            variant: 'destructive',
          })
        }
        if (error.response?.status == 422) {
          return toast({
            title: 'Invalid username',
            description: 'Please try another username',
            variant: 'destructive',
          })
        }
      }
      return toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Username updated',
        description: 'Your username has been updated',
        variant: 'default',
      })
      startTransition(() => {
        router.refresh()
      })
    },
  })

  return (
    <form
      onSubmit={handleSubmit((e) => {
        updateUsername(e)
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>
            Your username is how people will find you on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-8 grid place-items-center"></div>
          </div> */}
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            className="w-[400px]"
            pl-6
            size={32}
            {...register('name')}
          />
          {errors?.name && (
            <p className="text-red-500 px-1 text-xs ">{errors.name.message}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Change Username</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default UserNameForm
