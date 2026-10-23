'use client';

import { highlight } from 'sugar-high';
import CopyButton from '@/components/CopyButton';

// sugar-high escapes HTML, so user input in the playground code is safe here
export default function CodeBlock({ code, filename = 'Example.tsx' }: { code: string; filename?: string }) {
    return (
        <figure className="code-block mb-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
            <figcaption className="flex items-center justify-between gap-3 px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="flex gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </span>
                    <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate">{filename}</span>
                </div>
                <CopyButton text={code} />
            </figcaption>
            <pre className="p-4 text-sm leading-6 overflow-x-auto">
                <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
            </pre>
        </figure>
    );
}
