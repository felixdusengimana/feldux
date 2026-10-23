import Head from "next/head";
import md from "markdown-it";
import { highlight } from "sugar-high";
import BlogCodeCopy from "@/components/BlogCodeCopy";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const copyIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

// same look as components/CodeBlock.tsx; sugar-high escapes the code itself
const markdown = md();
markdown.renderer.rules.fence = (tokens, idx) => {
  const { content, info } = tokens[idx];
  const label = escapeHtml(info.trim().split(/\s+/)[0] || "code");
  return `<figure class="code-block not-prose my-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
<figcaption class="flex items-center justify-between gap-3 px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
<div class="flex items-center gap-3 min-w-0"><span class="flex gap-1.5" aria-hidden="true"><span class="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span><span class="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span><span class="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span></span><span class="text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate">${label}</span></div>
<button type="button" data-copy-code data-copied="false" aria-label="Copy code" title="Copy code" class="group p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"><span class="group-data-[copied=true]:hidden">${copyIcon}</span><span class="hidden group-data-[copied=true]:inline">${checkIcon}</span></button>
</figcaption>
<pre class="p-4 text-sm leading-6 overflow-x-auto"><code>${highlight(content.replace(/\n$/, ""))}</code></pre>
</figure>`;
};

const components = {
  Head,
};

interface MdxPageProps {
  code: any;
}

export default function MdxPage({ code }: MdxPageProps) {
  return (
    <>
    <article
      className="prose prose-pre:block prose-pre:h-full prose-pre:bg-neutral-50 prose-pre:text-neutral-800 prose-pre:dark:bg-neutral-800 dark:prose-pre:text-neutral-200 prose-pre:pl-10 prose-blockquote:bg-slate-500 prose-neutral dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:font-bold"
      dangerouslySetInnerHTML={{ __html: markdown.render(code) }}
    />
    <BlogCodeCopy />
    </>
  );
}
