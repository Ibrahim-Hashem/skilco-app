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
  const contributions = await db.contribution.findMany({
    where: {
      userId: currentUserId,
    },
    include: {
      project: true,
    },
  })

  const IsCurrentUser = currentUserId === user?.id

  const urlify = (text: string) => {
    const urlRegex =
      /\b(?!www\.)(?!http:\/\/www\.)(?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*(?:\.?|\b)/g
    return text.replace(urlRegex, function (url) {
      return url
    })
  }

  return (
    <div className="grid grid-cols-6 gap-4 h-fit">
      <div className="col-span-2 border shadow-sm rounded-lg py-4">
        {/* user pic */}
        <div className="flex flex-col">
          <div className="flex justify-center text-center mb-2">
            <div className="relative">
              <UserAvatar
                className="h-24 w-24 rounded-full"
                user={{
                  name: user?.name || null,
                  image: user?.image || null,
                }}
              />
              {IsCurrentUser && (
                <div className="absolute -bottom-2 -right-5">
                  <EditProfileButton user={user} />
                </div>
              )}
            </div>
          </div>
          <div className="px-4 gap-6">
            <h1 className="text-xl font-bold md:text-xl h-auto">
              {user?.name}
            </h1>
            <p className="text-sm md:text-base">
              <span className="text-zinc-400">Username: </span>
              {user?.username}
            </p>
            {user?.bio && (
              <p className="text-sm md:text-base">
                <span className="text-zinc-400">Bio: </span>
                {user?.bio}
              </p>
            )}
            {user?.location && (
              <p className="text-sm md:text-base">
                <span className="text-zinc-400">Location: </span>
                {user?.location}
              </p>
            )}
            {user?.website && (
              <>
                <p className="text-sm md:text-base">
                  <span className="text-zinc-400">Website: </span>
                  <a href={urlify(user?.website)} target="_blank">
                    {urlify(user?.website)}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4 border rounded-lg shadow-lg px-2 py-2">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="grid col-span-1">
            <h1 className="text-xl font-bold md:text-xl h-auto px-4 py-2 flex justify-center text-center">
              My Projects
            </h1>
            {projects.map((project) => {
              return (
                <a key={project.id} href={`/project/${project.name}`}>
                  <div className="border shadow-sm px-4 py-2 rounded-md flex justify-center text-center hover:bg-purple-100">
                    {project.name}
                  </div>
                </a>
              )
            })}
          </div>
          <div className="grid col-span-1">
            <h1 className="text-xl font-bold md:text-xl h-auto px-4 py-2 flex justify-center text-center">
              My Contributions
            </h1>
            {contributions.map(({ project }) => {
              return (
                <a key={project.id} href={`/project/${project.name}`}>
                  <div className="border shadow-sm px-4 py-2 rounded-md flex justify-center text-center hover:bg-purple-100">
                    {project.name}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
