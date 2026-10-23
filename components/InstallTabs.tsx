import React from 'react'

const installTabs = ['npm', 'pnpm', 'yarn'] as const;
type InstallTab = typeof installTabs[number];


export default function InstallTabs({ packageName, latest }: { packageName: string, latest?: boolean }) {
    const [selected, setSelected] = React.useState<InstallTab>('npm');
    const [copied, setCopied] = React.useState(false);

    const getCommand = (tab: InstallTab) => {
        switch (tab) {
            case 'npm':
                return `npm install ${packageName}`;
            case 'pnpm':
                return `pnpm add ${packageName}`;
            case 'yarn':
                return `yarn add ${packageName}`;
        }
    };
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(getCommand(selected));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard can be blocked (e.g. insecure context); nothing to do
        }
    };

    return (
        <>
            <div className="flex space-x-2 mb-2">
                {installTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setSelected(tab);
                            setCopied(false);
                        }}
                        className={`px-3 py-1 rounded text-sm font-medium ${selected === tab
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            <div className="relative">
                <pre className="bg-neutral-100 dark:bg-neutral-950 p-3 pr-12 rounded text-sm font-mono overflow-x-auto">
                    <code className="block text-neutral-800 dark:text-neutral-200">
                        {getCommand(selected)}
                    </code>
                </pre>
                <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? 'Copied' : 'Copy command'}
                    title={copied ? 'Copied' : 'Copy command'}
                    className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                    {copied ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
            </div>
        </>
    )
}
