import UserAccountNav from '@/components/UserAccountNav'
import UserAvatar from '@/components/UserAvatar'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import EditProfileButton from '@/components/EditProfileButton'

interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {
  const { slug } = params
  const session = await getAuthSession()
  const currentUserId = session?.user.id
  const user = await db.user.findFirst({
    where: {
      id: currentUserId,
    },
  })

  const projects = await db.project.findMany({
    where: {
      creatorId: currentUserId,
    },
  })

  return (
    <div className="grid grid-cols-6 gap-4 min-h-[70vh]">
      <div className="col-span-2 border border-red-200">
        {/* user pic */}
        <div className="flex flex-col">
          <div className="flex justify-center text-center py-4">
            <div className="relative">
              <UserAvatar
                className="h-24 w-24 rounded-full"
                user={{
                  name: user?.name || null,
                  image: user?.image || null,
                }}
              />
              <div className="absolute -bottom-2 -right-5">
                <EditProfileButton user={user} />
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-xl font-bold md:text-xl h-auto">
              {user?.name}
            </h1>
            <p className="text-sm md:text-base">
              <span>Username: </span>
              {user?.username}
            </p>
            {user?.bio && (
              <p className="text-sm md:text-base">
                <span>Bio: </span>
                {user?.bio}
              </p>
            )}
            {user?.location && (
              <p className="text-sm md:text-base">
                <span>Location: </span>
                {user?.location}
              </p>
            )}
            {user?.website && (
              <p className="text-sm md:text-base">
                <span>Website: </span>
                {user?.website}
              </p>
            )}
          </div>
        </div>

        {/* user name */}
        {/* user username */}
        {/* user bio */}
        {/* user location */}
        {/* user website */}
      </div>
      <div className="col-span-4 border-blue-200"></div>
      {/* {projects.map((project) => {
        return <div key={project.id}>{project.name}</div>
      })} */}
    </div>
  )
}

export default page
