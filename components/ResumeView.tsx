'use client';

import React from 'react';
import { resume, formatRange, allSkills } from '@/lib/resume';

const PREVIEW = 4;
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const sectionTitle = 'text-xl font-semibold mt-12 mb-4';
const muted = 'text-neutral-600 dark:text-neutral-400';

function Chip({ name, active, onClick }: { name: string; active: boolean; onClick: (s: string) => void }) {
    return (
        <button
            type="button"
            onClick={() => onClick(name)}
            aria-pressed={active}
            className={`px-2 py-0.5 rounded text-xs border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${active
                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
        >
            {name}
        </button>
    );
}

const exports = [
    { label: 'PDF', run: async () => (await import('@/lib/resumeExport')).downloadPdf(resume) },
    { label: 'Word', run: async () => (await import('@/lib/resumeExport')).downloadDocx(resume) },
    { label: 'Markdown', run: async () => (await import('@/lib/resumeExport')).downloadMarkdown(resume) },
    { label: 'JSON', run: async () => (await import('@/lib/resumeExport')).downloadJson(resume) },
];

export default function ResumeView() {
    const [skill, setSkill] = React.useState<string | null>(null);
    const [open, setOpen] = React.useState<Record<string, boolean>>({});
    const [busy, setBusy] = React.useState<string | null>(null);
    const skills = React.useMemo(() => allSkills(), []);

    const toggleSkill = (s: string) => setSkill((cur) => (cur === s ? null : s));
    const matches = (stack: string[]) => !skill || stack.includes(skill);
    const dim = (stack: string[]) => (matches(stack) ? '' : 'opacity-40');

    const runExport = async (label: string, run: () => Promise<void>) => {
        setBusy(label);
        try {
            await run();
        } finally {
            setBusy(null);
        }
    };

    const roleCount = resume.experience.filter((e) => matches(e.stack)).length;
    const projectCount = resume.projects.filter((p) => matches(p.stack)).length;

    return (
        <article className="resume max-w-[650px]">
            <header>
                <h1 className="font-bold text-3xl font-serif">{resume.name}</h1>
                <p className={`mt-1 ${muted}`}>
                    {resume.headline} · {resume.location}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <li><a className="underline hover:no-underline" href={`mailto:${resume.email}`}>{resume.email}</a></li>
                    <li><a className="underline hover:no-underline" href={resume.website}>{host(resume.website)}</a></li>
                    {resume.profiles.map((p) => (
                        <li key={p.network}>
                            <a className="underline hover:no-underline" href={p.url} target="_blank" rel="noopener noreferrer">{p.network}</a>
                        </li>
                    ))}
                </ul>
            </header>

            <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden" aria-label="Download resume">
                <span className={`text-sm mr-1 ${muted}`}>Download:</span>
                {exports.map(({ label, run }) => (
                    <button
                        key={label}
                        type="button"
                        onClick={() => runExport(label, run)}
                        disabled={busy !== null}
                        className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                    >
                        {busy === label ? 'Preparing…' : label}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    Print
                </button>
            </div>

            <section>
                <h2 className={sectionTitle}>Summary</h2>
                <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">{resume.summary}</p>
            </section>

            <section className="print:hidden">
                <h2 className={sectionTitle}>Skills</h2>
                <p className={`text-sm mb-3 ${muted}`}>Pick a skill to see where I used it.</p>
                <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => <Chip key={s} name={s} active={skill === s} onClick={toggleSkill} />)}
                </div>
                <p className="mt-3 text-sm min-h-[1.25rem]" aria-live="polite">
                    {skill && (
                        <>
                            <strong>{skill}</strong>: {roleCount} {roleCount === 1 ? 'role' : 'roles'}, {projectCount} {projectCount === 1 ? 'project' : 'projects'}
                            <button type="button" onClick={() => setSkill(null)} className="ml-3 underline hover:no-underline">Clear</button>
                        </>
                    )}
                </p>
            </section>

            <section>
                <h2 className={sectionTitle}>Experience</h2>
                <ol className="relative border-l border-neutral-200 dark:border-neutral-800 ml-1.5 space-y-10">
                    {resume.experience.map((e) => {
                        const id = `${e.company}-${e.start}`;
                        const expanded = !!open[id];
                        const hidden = e.highlights.length - PREVIEW;
                        return (
                            <li key={id} className={`pl-6 transition-opacity ${dim(e.stack)}`}>
                                <span className="absolute -left-[5px] mt-2 w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" aria-hidden="true" />
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                    <h3 className="font-semibold">{e.role}, {e.company}</h3>
                                    <span className={`text-sm ${muted}`}>{formatRange(e.start, e.end)}</span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{e.intro}</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {e.stack.map((s) => <Chip key={s} name={s} active={skill === s} onClick={toggleSkill} />)}
                                </div>
                                <ul id={`${id}-points`} className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                                    {e.highlights.map((h, i) => (
                                        <li key={i} className={i >= PREVIEW && !expanded ? 'hidden print:list-item' : ''}>{h}</li>
                                    ))}
                                </ul>
                                {hidden > 0 && (
                                    <button
                                        type="button"
                                        aria-expanded={expanded}
                                        aria-controls={`${id}-points`}
                                        onClick={() => setOpen((o) => ({ ...o, [id]: !expanded }))}
                                        className="mt-2 text-sm underline hover:no-underline print:hidden"
                                    >
                                        {expanded ? 'Show less' : `Show ${hidden} more`}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </section>

            <section>
                <h2 className={sectionTitle}>Projects</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {resume.projects.map((p) => (
                        <div key={p.name} className={`rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 transition-opacity break-inside-avoid ${dim(p.stack)}`}>
                            <h3 className="font-semibold">
                                {p.url ? <a href={p.url} className="underline hover:no-underline">{p.name}</a> : p.name}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{p.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {p.stack.map((s) => <Chip key={s} name={s} active={skill === s} onClick={toggleSkill} />)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={sectionTitle}>Areas of expertise</h2>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                    {resume.expertise.map((x) => <li key={x}>{x}</li>)}
                </ul>
            </section>

            <section>
                <h2 className={sectionTitle}>Education</h2>
                <ul className="space-y-4">
                    {resume.education.map((e) => (
                        <li key={e.school}>
                            <h3 className="font-semibold">{e.title}</h3>
                            <p className={`text-sm ${muted}`}>{e.school}, {e.location} · {formatRange(e.start, e.end)}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className={sectionTitle}>Certificates and awards</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {resume.awards.map((a) => (
                        <li key={a.title}>
                            {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">{a.title}</a> : a.title}
                            <span className={muted}> · {a.issuer}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className={sectionTitle}>Languages</h2>
                <ul className="flex flex-wrap gap-2 text-sm">
                    {resume.languages.map((l) => (
                        <li key={l.name} className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800">
                            {l.name} <span className={muted}>· {l.level}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className={sectionTitle}>Additional skills</h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{resume.additionalSkills.join(', ')}</p>
            </section>

            <section>
                <h2 className={sectionTitle}>Hobbies and interests</h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{resume.hobbies.join(', ')}</p>
            </section>
        </article>
    );
}
