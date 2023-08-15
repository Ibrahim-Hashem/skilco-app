'use client'
import { FC, use, useCallback, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useForm } from 'react-hook-form'
import { PostCreationRequest, postValidator } from '@/lib/validators/post'
import { zodResolver } from '@hookform/resolvers/zod'
import type EditorJS from '@editorjs/editorjs'
import { boolean, promise } from 'zod'
import { type } from 'os'
import axios, { AxiosError } from 'axios'
import { uploadFiles } from '@/lib/uploadthing'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { e } from 'uploadthing/types-542f56b3'
import { usePathname, useRouter } from 'next/navigation'
import MiniCreatePost from './MiniCreatePost'

interface EditorProps {
  projectId: string
}

const Editor: FC<EditorProps> = ({ projectId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(postValidator),
    defaultValues: {
      title: '',
      projectId,
      content: null,
    },
  })

  const ref = useRef<EditorJS>()

  const pathname = usePathname()
  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)

  const _titleRef = useRef<HTMLInputElement>(null)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const ImageTool = (await import('@editorjs/image')).default
    const InlineCode = (await import('@editorjs/inline-code')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder:
          "Type here to update subscribers about your project's progress...",
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], 'imageUploader')
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
          table: Table,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: 'Error',
          description: (value as { message: string }).message,
          variant: 'destructive',
        })
      }
    }
  }, [errors])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef.current?.focus()
      }, 0)
    }
    if (isMounted) {
      init()
      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content, projectId }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        projectId,
      }
      const { data } = await axios.post('/api/project/post', payload)
      return data
    },
    onSuccess: () => {
      const newPathname = pathname.split('/').slice(0, -1).join('/')
      router.push(newPathname)
      router.refresh()
      return toast({
        title: 'Success, post created',
        description: 'Post created successfully',
      })
    },
    onError: (err: AxiosError) => {
      toast({
        title: 'Error, something went wrong with creating your post',
        description: err.message,
        variant: 'destructive',
      })
    },
  })

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save()
    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      projectId,
    }
    createPost(payload)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <div className=" p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="project-update-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px] w-full" />
        </div>
      </form>
    </div>
  )
}

export default Editor
