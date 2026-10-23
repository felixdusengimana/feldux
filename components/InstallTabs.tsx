'use client';

import React from 'react'
import CopyButton from '@/components/CopyButton';

const installTabs = ['npm', 'pnpm', 'yarn'] as const;
type InstallTab = typeof installTabs[number];


export default function InstallTabs({ packageName, latest }: { packageName: string, latest?: boolean }) {
    const [selected, setSelected] = React.useState<InstallTab>('npm');

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
    return (
        <>
            <div className="flex space-x-2 mb-2">
                {installTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelected(tab)}
                        className={`px-3 py-1 rounded text-sm font-medium ${selected === tab
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-neutral-200'
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
                <CopyButton text={getCommand(selected)} className="absolute top-1/2 -translate-y-1/2 right-2" />
            </div>
        </>
    )
}
