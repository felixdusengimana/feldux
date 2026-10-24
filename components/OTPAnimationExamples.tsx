'use client';

import { useState } from 'react';
import { Root, Input } from '@frjoy/otp';
import CodeBlock from '@/components/CodeBlock';

const box = 'w-10 h-10 sm:w-12 sm:h-12 text-center border border-neutral-300 dark:border-neutral-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white';
const title = 'text-lg font-semibold mt-8 mb-2';
const text = 'text-sm mb-3 text-neutral-700 dark:text-neutral-300';

const slots = (n: number, className: string) =>
    [...Array(n)].map((_, i) => (
        <Input key={i} length={1} placeholder=" " aria-label={`Digit ${i + 1} of ${n}`} className={className} />
    ));

export default function OTPAnimationExamples() {
    const [status, setStatus] = useState<'' | 'wrong' | 'right'>('');

    return (
        <>
            <h2 id="animations" className="text-2xl font-semibold mt-10 mb-4">Typing Animations</h2>
            <p className={text}>
                Each <code>Input</code> is a real input that takes your <code>className</code>, so animations are plain CSS.
                An empty <code>placeholder=&quot; &quot;</code> lets <code>:placeholder-shown</code> tell empty and filled boxes apart.
            </p>

            <h3 className={title}>Pop when a box fills</h3>
            <Root type="number">
                <div className="flex space-x-2 mb-4">{slots(4, `${box} otp-pop`)}</div>
            </Root>
            <CodeBlock filename="otp.css" code={`.otp-pop:not(:placeholder-shown) {
  animation: otp-pop 160ms ease-out;
}
@keyframes otp-pop {
  0% { transform: scale(0.8); }
  60% { transform: scale(1.08); }
  100% { transform: scale(1); }
}`} />
            <CodeBlock code={`<Input placeholder=" " className="otp-pop" />`} />

            <h3 className={title}>Underline that fills on focus</h3>
            <Root type="number">
                <div className="flex space-x-2 mb-4">{slots(6, 'otp-line w-10 h-12 text-center text-xl bg-transparent')}</div>
            </Root>
            <CodeBlock filename="otp.css" code={`.otp-line {
  border: 0;
  outline: none;
  background-image: linear-gradient(#3b82f6, #3b82f6),
    linear-gradient(#d4d4d4, #d4d4d4);
  background-size: 0% 2px, 100% 2px;
  background-position: bottom;
  background-repeat: no-repeat;
  transition: background-size 200ms;
}
.otp-line:focus,
.otp-line:not(:placeholder-shown) {
  background-size: 100% 2px, 100% 2px;
}`} />

            <h3 className={title}>Shake on a wrong code</h3>
            <p className={text}>
                <code>onChange</code> on <code>Root</code> gives you the whole code, so you can set a class when it is wrong.
                Try any 4 digits; the right code is <code>1234</code>.
            </p>
            <div className={status ? `otp-${status}` : ''}>
                <Root type="number" onChange={(v) => setStatus(v.length < 4 ? '' : v === '1234' ? 'right' : 'wrong')}>
                    <div className="flex space-x-2 mb-2">{slots(4, `${box} otp-pop`)}</div>
                </Root>
                <p className="text-sm mb-4 min-h-[1.25rem]" aria-live="polite">
                    {status === 'right' && <span className="text-green-600 dark:text-green-400">Correct</span>}
                    {status === 'wrong' && <span className="text-red-600 dark:text-red-400">Wrong code, try again</span>}
                </p>
            </div>
            <CodeBlock filename="otp.css" code={`.otp-wrong input {
  border-color: #dc2626;
  animation: otp-shake 300ms;
}
.otp-right input { border-color: #16a34a; }
@keyframes otp-shake {
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}`} />
            <CodeBlock code={`const [status, setStatus] = useState('');
const check = (v) => {
  if (v.length < 4) setStatus('');
  else setStatus(v === '1234' ? 'right' : 'wrong');
};

<div className={status && \`otp-\${status}\`}>
  <Root type="number" onChange={check}>
    {[...Array(4)].map((_, i) => (
      <Input key={i} placeholder=" " className="otp-pop" />
    ))}
  </Root>
</div>`} />
        </>
    );
}
