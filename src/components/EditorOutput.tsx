import dynamic from 'next/dynamic'
import { FC } from 'react'
import Image from 'next/image'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const style = {
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  )
}

function CustomCodeRenderer({ data }: any) {
  const code = data.code

  return (
    <pre className="bg-gray-100 p-2 rounded-md">
      <code className="text-sm">{code}</code>
    </pre>
  )
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  )
}

export default EditorOutput
