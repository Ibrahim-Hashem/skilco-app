'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog'
import { Icons } from './Icons'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { useQuery } from '@tanstack/react-query'
import { Contribution, Project } from '@prisma/client'
import axios from 'axios'

const ContributionsModal = ({}) => {
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ['contribution-query'],
    queryFn: async () => {
      const { data } = await axios.get(`/api/contributions`)
      if (!data) return []
      return data as (Contribution & {
        projects: Project
      })[]
    },
    enabled: false,
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex px-2 py-1 cursor-default hover:bg-zinc-100 w-full">
          <Icons.users className="mr-2 h-4 w-4" />
          <span className="text-sm ">My Contributions</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contributions</DialogTitle>
          <DialogDescription>
            {`Here is a list of all the projects you've contributed to.`}
          </DialogDescription>
        </DialogHeader>
        {isFetching && (
          <div className="flex justify-center items-center">
            <Icons.loader2 className="animate-spin h-5 w-5" />
          </div>
        )}
        {isFetched &&
          (queryResults?.length ?? 0) > 0 &&
          queryResults?.map((x) => (
            <div className="grid gap-4 py-4" key={x.projectId}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{x.projects.name}</Label>
              </div>
            </div>
          ))}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContributionsModal
