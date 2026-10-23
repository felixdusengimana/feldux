'use client';

import React from 'react';

export interface PropRow {
    name: string;
    type: string;
    defaultValue?: string;
    description: React.ReactNode;
}

export default function PropsTable({ components }: { components: Record<string, PropRow[]> }) {
    const names = Object.keys(components);
    const [active, setActive] = React.useState(names[0]);

    return (
        <div className="mb-10 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div role="tablist" aria-label="Components" className="flex overflow-x-auto border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                {names.map((name) => (
                    <button
                        key={name}
                        role="tab"
                        id={`props-tab-${name}`}
                        aria-selected={active === name}
                        aria-controls={`props-panel-${name}`}
                        onClick={() => setActive(name)}
                        className={`px-4 py-2 text-sm font-mono whitespace-nowrap border-b-2 -mb-px transition-colors ${active === name
                            ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                            : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                    >
                        {`<${name} />`}
                    </button>
                ))}
            </div>
            <div role="tabpanel" id={`props-panel-${active}`} aria-labelledby={`props-tab-${active}`} className="overflow-x-auto">
                <ul className="sm:hidden divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
                    {components[active].map((row) => (
                        <li key={row.name} className="px-4 py-3">
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{row.name}</span>
                                {row.defaultValue && (
                                    <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">default {row.defaultValue}</span>
                                )}
                            </div>
                            <code className="inline-block mt-1 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs break-all text-neutral-700 dark:text-neutral-300">{row.type}</code>
                            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{row.description}</p>
                        </li>
                    ))}
                </ul>
                <table className="hidden sm:table w-full text-sm text-left">
                    <thead className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                        <tr>
                            <th className="px-4 py-2 font-medium">Prop / Type</th>
                            <th className="px-4 py-2 font-medium">Default</th>
                            <th className="px-4 py-2 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components[active].map((row) => (
                            <tr key={row.name} className="border-t border-neutral-200 dark:border-neutral-800 align-top">
                                <td className="px-4 py-3">
                                    <div className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{row.name}</div>
                                    <code className="inline-block mt-1 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs whitespace-nowrap text-neutral-700 dark:text-neutral-300">{row.type}</code>
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">{row.defaultValue ?? '—'}</td>
                                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{row.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
