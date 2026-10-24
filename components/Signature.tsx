"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Holiday, holidayOn } from "@/lib/holidays";

// centerlines traced from the handwritten "felix", drawn in this order
const STROKES = [
  "M44 71C46.7 68.3 54.3 60.5 60 55C65.7 49.5 72.7 43.5 78 38C83.3 32.5 88.5 25.8 92 22C95.5 18.2 98 15.3 99 15C100 14.7 100.2 16.7 98 20C95.8 23.3 90.3 29.7 86 35C81.7 40.3 76.3 46.5 72 52C67.7 57.5 63.7 63 60 68C56.3 73 53.3 77 50 82C46.7 87 43.3 92.7 40 98C36.7 103.3 33.7 108 30 114C26.3 120 21.3 128.3 18 134C14.7 139.7 11.7 144.8 10 148C8.3 151.2 7.5 152.5 8 153C8.5 153.5 10.7 153.2 13 151C15.3 148.8 18.8 144.2 22 140C25.2 135.8 29 131.3 32 126C35 120.7 37.7 113.3 40 108C42.3 102.7 45.3 97.5 46 94C46.7 90.5 45.7 89.3 44 87C42.3 84.7 39 81.3 36 80C33 78.7 28.3 78.3 26 79C23.7 79.7 21.8 82.2 22 84C22.2 85.8 24 88.7 27 90C30 91.3 35.8 92.2 40 92C44.2 91.8 48.3 90.2 52 89C55.7 87.8 60.3 85.7 62 85C64.3 84.3 71.3 82.8 76 81C80.7 79.2 86 76.5 90 74C94 71.5 97.3 68.7 100 66C102.7 63.3 105 60.2 106 58C107 55.8 106.8 54 106 53C105.2 52 103 51.3 101 52C99 52.7 96.3 54.8 94 57C91.7 59.2 89.2 62.2 87 65C84.8 67.8 82.5 71 81 74C79.5 77 78.2 80.3 78 83C77.8 85.7 78.7 88.5 80 90C81.3 91.5 83.3 92 86 92C88.7 92 92.3 91.3 96 90C99.7 88.7 104 86.7 108 84C112 81.3 118 75.7 120 74C123.7 72.3 135 68.3 142 64C149 59.7 156.3 53.7 162 48C167.7 42.3 172.2 35.5 176 30C179.8 24.5 183 18.8 185 15C187 11.2 188 8.8 188 7C188 5.2 186.5 4.2 185 4C183.5 3.8 181.5 4.2 179 6C176.5 7.8 173.5 11 170 15C166.5 19 162 24.5 158 30C154 35.5 150 42 146 48C142 54 137.5 60.3 134 66C130.5 71.7 127 78 125 82C123 86 122 88.5 122 90C122 91.5 122.8 91.7 125 91C127.2 90.3 131.2 88.3 135 86C138.8 83.7 143.8 80 148 77C152.2 74 157 70.5 160 68C163 65.5 165 63 166 62C165.3 63.2 163.5 66.3 162 69C160.5 71.7 158.5 75.3 157 78C155.5 80.7 153.8 83.2 153 85C152.2 86.8 151.5 88.2 152 89C152.5 89.8 154.2 90.7 156 90C157.8 89.3 160.3 87 163 85C165.7 83 168.8 80.5 172 78C175.2 75.5 179 72.5 182 70C185 67.5 188.2 64.5 190 63C191.8 61.5 192.5 61.3 193 61C192.5 61.5 190.7 62.2 190 64C189.3 65.8 189.3 69.3 189 72C188.7 74.7 188.3 77.5 188 80C187.7 82.5 186.7 85.3 187 87C187.3 88.7 188.5 89.7 190 90C191.5 90.3 193.3 90.3 196 89C198.7 87.7 202.7 84.5 206 82C209.3 79.5 212.8 76.7 216 74C219.2 71.3 223.5 67.3 225 66",
  "M171 89C172.5 87.8 176.8 84.5 180 82C183.2 79.5 186.7 76.5 190 74C193.3 71.5 196.2 69.7 200 67C203.8 64.3 210.8 59.5 213 58",
  "M172 50C172.3 49.7 173.7 48.3 174 48",
  "M66 97C68.3 97.5 74.3 98.8 80 100C85.7 101.2 94.2 103 100 104C105.8 105 110.3 105.8 115 106C119.7 106.2 123 106 128 105C133 104 138.8 101.7 145 100C151.2 98.3 158.3 96.5 165 95C171.7 93.5 181.7 91.7 185 91"
];
const DURATION = 1.8; // seconds for the whole signature
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Signature({ className }: { className?: string }) {
  const [holiday, setHoliday] = useState<Holiday>();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const nib = useRef<SVGGElement>(null);

  useIsoLayoutEffect(() => {
    setHoliday(holidayOn(new Date()));
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
  }, []);

  return (
    <svg viewBox="0 0 232 160" fill="none" aria-hidden="true" className={className}>
      {holiday && (
        <>
          <title>{holiday.name}</title>
          <defs>
            <linearGradient id="signature-ink" gradientUnits="userSpaceOnUse" x1="8" y1="0" x2="225" y2="0">
              {holiday.ink.flatMap((c, i, all) => [
                <stop key={`${i}a`} offset={i / all.length} stopColor={c} />,
                <stop key={`${i}b`} offset={(i + 1) / all.length} stopColor={c} />,
              ])}
            </linearGradient>
          </defs>
        </>
      )}
      {STROKES.map((d, i) => (
        <path
          key={i}
          ref={(el) => (paths.current[i] = el)}
          d={d}
          pathLength={1}
          stroke={!holiday ? "currentColor" : i === STROKES.length - 1 ? holiday.underline ?? holiday.ink[holiday.ink.length - 1] : "url(#signature-ink)"}
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
