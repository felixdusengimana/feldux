'use client';

import { useEffect } from 'react';

// handles the copy buttons inside markdown code blocks rendered by components/MDX.tsx
export default function BlogCodeCopy() {
    useEffect(() => {
        const onClick = async (e: MouseEvent) => {
            const button = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy-code]');
            const code = button?.closest('figure')?.querySelector('code');
            if (!button || !code) return;
            try {
                await navigator.clipboard.writeText(code.innerText);
                button.dataset.copied = 'true';
                button.setAttribute('aria-label', 'Copied');
                setTimeout(() => {
                    button.dataset.copied = 'false';
                    button.setAttribute('aria-label', 'Copy code');
                }, 2000);
            } catch {
                // clipboard can be blocked (e.g. insecure context); nothing to do
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return null;
}
