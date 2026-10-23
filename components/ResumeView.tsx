'use client';

import React from 'react';
import { resume, formatRange, allSkills, applyView, parseView, stringifyView, fullView, MAX, SECTIONS, Section, View } from '@/lib/resume';
import type { Resume } from '@/lib/resume';

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
    { label: 'PDF', run: async (r: Resume) => (await import('@/lib/resumeExport')).downloadPdf(r) },
    { label: 'Word', run: async (r: Resume) => (await import('@/lib/resumeExport')).downloadDocx(r) },
    { label: 'Markdown', run: async (r: Resume) => (await import('@/lib/resumeExport')).downloadMarkdown(r) },
    { label: 'JSON', run: async (r: Resume) => (await import('@/lib/resumeExport')).downloadJson(r) },
];

const STORE = 'resume-view';
const PARAMS = ['hide', ...Object.keys(MAX)];
const btn = 'px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors';

function Limit({ label, k, view, onChange }: { label: string; k: keyof typeof MAX; view: View; onChange: (v: View) => void }) {
    return (
        <label className="flex items-center justify-between gap-3 text-sm">
            {label}
            <select
                value={view[k]}
                onChange={(e) => onChange({ ...view, [k]: Number(e.target.value) })}
                className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1"
            >
                {Array.from({ length: MAX[k] }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n === MAX[k] ? `All (${n})` : n}</option>
                ))}
            </select>
        </label>
    );
}

export default function ResumeView() {
    const [skill, setSkill] = React.useState<string | null>(null);
    const [open, setOpen] = React.useState<Record<string, boolean>>({});
    const [busy, setBusy] = React.useState<string | null>(null);
    const [view, setView] = React.useState<View>(fullView);
    const [ready, setReady] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const r = React.useMemo(() => applyView(resume, view), [view]);
    const skills = React.useMemo(() => allSkills(r), [r]);
    const tailored = stringifyView(view) !== '';
    const show = (s: Section) => !view.hidden.includes(s);

    // the server always renders the full resume; a shared link or this tab's choice applies after mount
    React.useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        let saved = '';
        try { saved = sessionStorage.getItem(STORE) ?? ''; } catch { }
        setView(parseView(PARAMS.some((k) => url.has(k)) ? window.location.search : saved));
        setReady(true);
    }, []);

    React.useEffect(() => {
        if (!ready) return;
        const q = stringifyView(view);
        try { sessionStorage.setItem(STORE, q); } catch { }
        window.history.replaceState(null, '', `${window.location.pathname}${q ? `?${q}` : ''}${window.location.hash}`);
    }, [view, ready]);

    const toggleSection = (s: Section) =>
        setView((v) => ({ ...v, hidden: v.hidden.includes(s) ? v.hidden.filter((x) => x !== s) : [...v.hidden, s] }));

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { }
    };

    const toggleSkill = (s: string) => setSkill((cur) => (cur === s ? null : s));
    const matches = (stack: string[]) => !skill || stack.includes(skill);
    const dim = (stack: string[]) => (matches(stack) ? '' : 'opacity-40');

    const runExport = async (label: string, run: (r: Resume) => Promise<void>) => {
        setBusy(label);
        try {
            await run(r);
        } finally {
            setBusy(null);
        }
    };

    const roleCount = r.experience.filter((e) => matches(e.stack)).length;
    const projectCount = r.projects.filter((p) => matches(p.stack)).length;

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
                    <button key={label} type="button" onClick={() => runExport(label, run)} disabled={busy !== null} className={btn}>
                        {busy === label ? 'Preparing…' : label}
                    </button>
                ))}
            </div>

            <details className="mt-4 rounded-lg border border-neutral-200 dark:border-neutral-800 print:hidden">
                <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-medium">
                    Customize what to show{tailored && <span className={`font-normal ${muted}`}> · tailored</span>}
                </summary>
                <div className="px-4 pb-4 pt-1 space-y-4">
                    <fieldset>
                        <legend className={`text-xs uppercase tracking-wide mb-2 ${muted}`}>Sections</legend>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                            {(Object.keys(SECTIONS) as Section[]).map((s) => (
                                <label key={s} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={show(s)} onChange={() => toggleSection(s)} className="accent-neutral-900 dark:accent-neutral-100" />
                                    {SECTIONS[s]}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset className="grid sm:grid-cols-3 gap-3">
                        <legend className={`text-xs uppercase tracking-wide mb-2 ${muted}`}>Limits</legend>
                        <Limit label="Recent roles" k="roles" view={view} onChange={setView} />
                        <Limit label="Points per role" k="points" view={view} onChange={setView} />
                        <Limit label="Projects shown" k="projects" view={view} onChange={setView} />
                    </fieldset>
                    <p className={`text-xs ${muted}`}>Downloads follow this view. Kept for this tab and in the link, so you can share it.</p>
                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={copyLink} className={btn}>{copied ? 'Copied' : 'Copy link'}</button>
                        <button type="button" onClick={() => setView(fullView)} disabled={!tailored} className={btn}>Reset</button>
                    </div>
                </div>
            </details>

            {tailored && (
                <p className={`mt-3 text-sm ${muted} print:hidden`} role="status">
                    Showing a tailored view. <button type="button" onClick={() => setView(fullView)} className="underline hover:no-underline">Show full resume</button>
                </p>
            )}

            {r.summary && (
                <section>
                    <h2 className={sectionTitle}>Summary</h2>
                    <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">{r.summary}</p>
                </section>
            )}

            {show('skills') && skills.length > 0 && <section className="print:hidden">
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
            </section>}

            {r.experience.length > 0 && <section>
                <h2 className={sectionTitle}>Experience</h2>
                <ol className="relative border-l border-neutral-200 dark:border-neutral-800 ml-1.5 space-y-10">
                    {r.experience.map((e) => {
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
                                {(e.type || e.location) && <p className={`text-sm ${muted}`}>{[e.type, e.location].filter(Boolean).join(' · ')}</p>}
                                {e.intro && <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{e.intro}</p>}
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
            </section>}

            {r.projects.length > 0 && <section>
                <h2 className={sectionTitle}>Projects</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {r.projects.map((p) => (
                        <div key={p.name} className={`rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 transition-opacity break-inside-avoid ${dim(p.stack)}`}>
                            <h3 className="font-semibold">
                                {p.url ? <a href={p.url} className="underline hover:no-underline">{p.name}</a> : p.name}
                            </h3>
                            {p.start && <p className={`text-xs ${muted}`}>{formatRange(p.start, p.end)}</p>}
                            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{p.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {p.stack.map((s) => <Chip key={s} name={s} active={skill === s} onClick={toggleSkill} />)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>}

            {r.expertise.length > 0 && <section>
                <h2 className={sectionTitle}>Areas of expertise</h2>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                    {r.expertise.map((x) => <li key={x}>{x}</li>)}
                </ul>
            </section>}

            {r.education.length > 0 && <section>
                <h2 className={sectionTitle}>Education</h2>
                <ul className="space-y-4">
                    {r.education.map((e) => (
                        <li key={e.school}>
                            <h3 className="font-semibold">{e.title}</h3>
                            <p className={`text-sm ${muted}`}>{e.school}, {e.location} · {formatRange(e.start, e.end)}</p>
                        </li>
                    ))}
                </ul>
            </section>}

            {r.awards.length > 0 && <section>
                <h2 className={sectionTitle}>Certificates and awards</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {r.awards.map((a) => (
                        <li key={a.title}>
                            {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">{a.title}</a> : a.title}
                            <span className={muted}> · {a.issuer}</span>
                        </li>
                    ))}
                </ul>
            </section>}

            {r.languages.length > 0 && <section>
                <h2 className={sectionTitle}>Languages</h2>
                <ul className="flex flex-wrap gap-2 text-sm">
                    {r.languages.map((l) => (
                        <li key={l.name} className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800">
                            {l.name} <span className={muted}>· {l.level}</span>
                        </li>
                    ))}
                </ul>
            </section>}

            {r.additionalSkills.length > 0 && <section>
                <h2 className={sectionTitle}>Additional skills</h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{r.additionalSkills.join(', ')}</p>
            </section>}

            {r.hobbies.length > 0 && <section>
                <h2 className={sectionTitle}>Hobbies and interests</h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{r.hobbies.join(', ')}</p>
            </section>}
        </article>
    );
}
