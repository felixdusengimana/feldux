import Head from "next/head";
import md from "markdown-it";

const components = {
  Head,
};

interface MdxPageProps {
  code: any;
}

export default function MdxPage({ code }: MdxPageProps) {
  return (
    <article
      className="prose prose-pre:block prose-pre:h-full prose-pre:bg-neutral-50 prose-pre:dark:bg-neutral-800 prose-pre:pl-10 prose-blockquote:bg-slate-500 prose-neutral dark:prose-invert prose-a:text-blue-400 prose-strong:font-bold"
      dangerouslySetInnerHTML={{ __html: md().render(code) }}
    />
  );
}
