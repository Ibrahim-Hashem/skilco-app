'use client'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Search, Atom } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Prisma, Project } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import debounce from 'lodash.debounce'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('')

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ['search-query'],
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Project & {
        _count: Prisma.ProjectCountOutputType
      })[]
    },
    enabled: false,
  })

  const request = debounce(() => {
    refetch()
  }, 300)
  const debouncedInput = useCallback(() => {
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()
  const commandRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useOnClickOutside(commandRef, () => {
    setInput('')
  })

  useEffect(() => {
    setInput('')
  }, [pathname])

  return (
    <>
      <Command
        ref={commandRef}
        className="relative rounded-lg border max-w-lg z-50 overflow-visible"
      >
        <CommandInput
          className="outline-none border-non focus:border-none focus:outline-none px-1 w-full"
          placeholder="Search projects..."
          value={input}
          onValueChange={(text) => {
            setInput(text)
            debouncedInput()
          }}
        />

        {input.length > 0 ? (
          <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
            {isFetched && <CommandEmpty>No results found</CommandEmpty>}
            {(queryResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Projects">
                {queryResults?.map((project) => {
                  return (
                    <CommandItem
                      key={project?.id}
                      onSelect={(e) => {
                        router.push(`/project/${e}`)
                        router.refresh()
                      }}
                      value={project.name}
                    >
                      <Atom className="w-4 h-4 mr-2" />
                      <a href={`/project/${project.name}`}>{project.name}</a>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ) : null}
          </CommandList>
        ) : null}
      </Command>
    </>
  )
}

export default SearchBar
