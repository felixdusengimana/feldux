import React from 'react'

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
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm font-mono overflow-x-auto">
                <code className="block text-blue-600">
                    {getCommand(selected)}
                </code>
            </pre>
        </>
    )
}
