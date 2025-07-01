'use client';

import { useEffect, useState } from "react";

export interface ITableOfContent {
    id: string;
    title: string;
    active: boolean;
}

interface ITableOfContentsProps {
    sections: ITableOfContent[];
}

export default function TableOfContents({ sections }: ITableOfContentsProps) {
    const [tableOfContentState, setTableOfContentState] = useState<ITableOfContent[]>(sections);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            let currentId = sections[0].id;

            for (const section of sections) {
                const elem = document.getElementById(section.id);
                if (elem && elem.offsetTop <= scrollPos) {
                    currentId = section.id;
                }
            }

            // if end of page, set last section as active
            if (scrollPos + window.innerHeight >= document.body.scrollHeight) {
                currentId = sections[sections.length - 1].id;
            }

            setTableOfContentState((prev) =>
                prev.map((section) => ({
                    ...section,
                    active: section.id === currentId,
                }))
            );
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const onClick = (id: string) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTableOfContentState((prev) =>
            prev.map((section) => ({
                ...section,
                active: section.id === id,
            }))
        );
    };

    return (
        <aside className="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif">
            <nav className="sticky top-20 hidden md:block w-64 pr-6 text-sm overflow-visible" aria-label="Table of contents">
                <h2 className="text-lg font-semibold mb-4">On this page</h2>
                {isClient && <ul className="space-y-2 border-l border-gray-300 dark:border-gray-700 relative">
                    {tableOfContentState.map(({ id, title, active }) => (
                        <li key={id} className="relative">
                            <a
                                onClick={() => onClick?.(id)}
                                href={`#${id}`}
                                className={`
                  block
                  relative
                  pl-3
                  transition-colors duration-300
                  cursor-pointer
                  ${active
                                        ? 'text-black dark:text-white font-semibold'
                                        : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                                    }
                `}
                            >
                                {title}
                            </a>
                            {/* Animated left border on active */}
                            {active && (
                                <span
                                    className="
                    absolute
                    -left-0.5 top-0 bottom-0
                    w-1
                    rounded
                    bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400
                    animate-[border-scroll_2s_linear_infinite]
                    z-10
                  "
                                    style={{ animationDuration: '2s' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>}
            </nav>

            {/* Keyframes for the border scroll animation */}
            <style jsx>{`
        @keyframes border-scroll {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 200%;
          }
        }
        .animate-\[border-scroll_2s_linear_infinite\] {
          background-size: 100% 400%;
          background-repeat: repeat-y;
          animation-name: border-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 2s;
        }
      `}</style>
        </aside>
    );
}
