import Head from 'next/head'
import md from 'markdown-it'

const components = {
  Head,
}

interface MdxPageProps{
  code: any
}

export default function MdxPage({ code }: MdxPageProps) {
  return (
      <article className="prose prose-quoteless prose-blockquote:bg-slate-500 prose-neutral dark:prose-invert prose-a:text-blue-400 prose-strong:font-bold" dangerouslySetInnerHTML={{ __html: md().render(code) }}/>
  )
}