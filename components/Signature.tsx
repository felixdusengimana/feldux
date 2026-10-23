"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

// centerlines traced from the handwritten "felix", drawn in this order
const STROKES = [
  "M44 71C46.7 68.3 54.3 60.5 60 55C65.7 49.5 72.7 43.5 78 38C83.3 32.5 88.5 25.8 92 22C95.5 18.2 98 15.3 99 15C100 14.7 100.2 16.7 98 20C95.8 23.3 90.3 29.7 86 35C81.7 40.3 76.3 46.5 72 52C67.7 57.5 63.7 63 60 68C56.3 73 53.3 77 50 82C46.7 87 43.3 92.7 40 98C36.7 103.3 33.7 108 30 114C26.3 120 21.3 128.3 18 134C14.7 139.7 11.7 144.8 10 148C8.3 151.2 7.5 152.5 8 153C8.5 153.5 10.7 153.2 13 151C15.3 148.8 18.8 144.2 22 140C25.2 135.8 29 131.3 32 126C35 120.7 37.7 113.3 40 108C42.3 102.7 45.3 97.5 46 94C46.7 90.5 45.7 89.3 44 87C42.3 84.7 39 81.3 36 80C33 78.7 28.3 78.3 26 79C23.7 79.7 21.8 82.2 22 84C22.2 85.8 24 88.7 27 90C30 91.3 35.8 92.2 40 92C44.2 91.8 48.3 90.2 52 89C55.7 87.8 60.3 85.7 62 85C64.2 83.5 70.3 79.2 75 76C79.7 72.8 85.8 69 90 66C94.2 63 97.3 59.7 100 58C102.7 56.3 104.8 55.7 106 56C107.2 56.3 108 58 107 60C106 62 102.8 65.3 100 68C97.2 70.7 93 73.3 90 76C87 78.7 83.8 81.8 82 84C80.2 86.2 78.8 87.7 79 89C79.2 90.3 80.3 91.8 83 92C85.7 92.2 90.8 91.3 95 90C99.2 88.7 103.8 86.7 108 84C112.2 81.3 118 75.7 120 74C122.5 71.2 129.7 63.2 135 57C140.3 50.8 146.5 43.7 152 37C157.5 30.3 163.8 21.8 168 17C172.2 12.2 174.5 9.7 177 8C179.5 6.3 182 6.2 183 7C184 7.8 184.3 10 183 13C181.7 16 178.8 20 175 25C171.2 30 165 37.2 160 43C155 48.8 149.7 54.8 145 60C140.3 65.2 135.7 69.8 132 74C128.3 78.2 125 82.3 123 85C121 87.7 119.7 89 120 90C120.3 91 122.5 91.7 125 91C127.5 90.3 131.2 88.3 135 86C138.8 83.7 143.8 80 148 77C152.2 74 157 70.5 160 68C163 65.5 165 63 166 62C165.3 63.2 163.5 66.3 162 69C160.5 71.7 158.5 75.3 157 78C155.5 80.7 153.8 83.2 153 85C152.2 86.8 151.5 88.2 152 89C152.5 89.8 154.2 90.7 156 90C157.8 89.3 160.3 87 163 85C165.7 83 168.8 80.5 172 78C175.2 75.5 179 72.5 182 70C185 67.5 188.2 64.5 190 63C191.8 61.5 192.5 61.3 193 61C192.5 61.5 190.7 62.2 190 64C189.3 65.8 189.3 69.3 189 72C188.7 74.7 188.3 77.5 188 80C187.7 82.5 186.7 85.3 187 87C187.3 88.7 188.5 89.7 190 90C191.5 90.3 193.3 90.3 196 89C198.7 87.7 202.7 84.5 206 82C209.3 79.5 212.8 76.7 216 74C219.2 71.3 223.5 67.3 225 66",
  "M171 89C172.5 87.8 176.8 84.5 180 82C183.2 79.5 186.7 76.5 190 74C193.3 71.5 196.2 69.7 200 67C203.8 64.3 210.8 59.5 213 58",
  "M172 50C172.3 49.7 173.7 48.3 174 48",
  "M66 97C68.3 97.5 74.3 98.8 80 100C85.7 101.2 94.2 103 100 104C105.8 105 110.3 105.8 115 106C119.7 106.2 123 106 128 105C133 104 138.8 101.7 145 100C151.2 98.3 158.3 96.5 165 95C171.7 93.5 181.7 91.7 185 91"
];
const DURATION = 1.8; // seconds for the whole signature
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Signature({ className }: { className?: string }) {
  const pathname = usePathname();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const nib = useRef<SVGGElement>(null);

  useIsoLayoutEffect(() => {
    const els = paths.current.filter((p): p is SVGPathElement => !!p);
    const show = (p: SVGPathElement, f: number) => {
      p.style.strokeDashoffset = String(1 - f);
      p.style.opacity = f > 0 ? "1" : "0";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((p) => show(p, 1));
      return;
    }
    const lens = els.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    els.forEach((p) => show(p, 0));
    let start = 0;
    let raf = 0;
    const tick = (now: number) => {
      start ||= now;
      let left = ((now - start) / 1000 / DURATION) * total;
      els.forEach((p, i) => {
        const f = Math.min(Math.max(left / lens[i], 0), 1);
        show(p, f);
        if (f > 0 && f < 1 && nib.current) {
          const pt = p.getPointAtLength(f * lens[i]);
          nib.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        }
        left -= lens[i];
      });
      const drawing = left < 0;
      if (nib.current) nib.current.style.opacity = drawing ? "1" : "0";
      if (drawing) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <svg viewBox="0 0 232 160" fill="none" aria-hidden="true" className={className}>
      {STROKES.map((d, i) => (
        <path
          key={i}
          ref={(el) => (paths.current[i] = el)}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={i === STROKES.length - 1 ? 4 : 5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: "1 1", strokeDashoffset: 1, opacity: 0 }}
        />
      ))}
      <g ref={nib} style={{ opacity: 0 }} className="transition-opacity duration-300">
        <path d="M0 0C5-11 14-27 26-37C24-24 16-10 0 0Z" fill="currentColor" />
        <circle cx="17" cy="-21" r="2.4" className="fill-white dark:fill-[#111214]" />
      </g>
    </svg>
  );
}
