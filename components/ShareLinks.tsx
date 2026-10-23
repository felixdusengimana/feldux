'use client';

import React from 'react';

interface ShareLinksProps {
    url: string;
    title: string;
    text: string;
    heading?: string;
}

export default function ShareLinks({ url, title, text, heading = 'Share' }: ShareLinksProps) {
    const [canShare, setCanShare] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => setCanShare(typeof navigator !== 'undefined' && !!navigator.share), []);

    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const links = [
        { name: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
        { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
        { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
        { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard can be blocked (e.g. insecure context); nothing to do
        }
    };

    const nativeShare = () => navigator.share({ title, text, url }).catch(() => {});

    const item = 'px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors';

    return (
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold mb-3">{heading}</h2>
            <div className="flex flex-wrap gap-2">
                {canShare && (
                    <button type="button" onClick={nativeShare} className={item}>
                        Share…
                    </button>
                )}
                {links.map((l) => (
                    <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={item} aria-label={`Share on ${l.name}`}>
                        {l.name}
                    </a>
                ))}
                <button type="button" onClick={copyLink} className={item}>
                    {copied ? 'Link copied' : 'Copy link'}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</span>
            </div>
        </div>
    );
}
