'use client';

import { useState } from 'react';
import { Root, Input, Label } from '@frjoy/otp';
import { packages } from '@/lib/packages';
import InstallTabs from '@/components/InstallTabs';
import TableOfContents, { ITableOfContent } from '@/components/TableOfContents';
import OTPPlayground from '@/components/OTPPlayground';
import CodeBlock from '@/components/CodeBlock';
import PropsTable, { PropRow } from '@/components/PropsTable';
import Head from 'next/head';

const propsReference: Record<string, PropRow[]> = {
  Root: [
    { name: 'onChange', type: '(value: string) => void', description: 'Called with the full code, in input order, whenever it changes. Not called on first render.' },
    { name: 'type', type: "'any' | 'number' | 'text'", defaultValue: "'any'", description: 'number: digits only. text: letters and digits. any: no restriction.' },
    { name: 'password', type: 'boolean', defaultValue: 'false', description: 'Masks every input.' },
    { name: 'joiner', type: 'string', defaultValue: "''", description: 'Placed between input values in onChange, e.g. "-".' },
    { name: 'pattern', type: 'string', description: 'HTML pattern applied to every input. Best with type="any".' },
    { name: 'children', type: 'ReactNode', description: 'Inputs, label and any other elements. Root renders no element of its own.' },
  ],
  Input: [
    { name: 'length', type: 'number', defaultValue: '1', description: 'Number of characters this input holds.' },
    { name: 'password', type: 'boolean', defaultValue: 'false', description: 'Masks this input only.' },
    { name: '...props', type: 'InputHTMLAttributes', description: 'Native input props except type, value, autoComplete, maxLength and minLength. Your onChange, onKeyDown, onPaste and onClick still run.' },
  ],
  Label: [
    { name: '...props', type: 'LabelHTMLAttributes', description: 'Native label props except htmlFor. Clicking the label focuses the first input that is not filled yet.' },
  ],
};

export default function OTPInputDocsPage() {
  const pkg = packages.find((p) => p.slug === 'otp');
  const [otpValue1, setOtpValue1] = useState('');
  const [otpValue2, setOtpValue2] = useState('');

  if (!pkg) return <div className="p-6">Package not found.</div>;

  const url = `https://feldux.com/packages/${pkg.slug}`;
  const title = pkg.name;
  const description = pkg.description;
  const image = 'https://feldux.com/og.jpg';

  const initialTableOfContent: ITableOfContent[] = [
    { id: 'introduction', title: 'Introduction', active: false },
    { id: 'features', title: 'Features', active: false },
    { id: 'usage', title: 'Usage', active: false },
    { id: 'live-demo-1', title: 'Live Demo 1: Basic OTP', active: false },
    { id: 'live-demo-2', title: 'Live Demo 2: Alphanumeric OTP with Joiner', active: false },
    { id: 'props-reference', title: 'Props Reference', active: false },
    { id: 'accessibility', title: 'Accessibility', active: false },
    { id: 'interactive-playground', title: 'Interactive Playground', active: false },
  ];

  return (
    <>
    <Head>
      <title>{title} - Documentation</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow px-6 max-w-7xl mx-auto gap-14 flex">
        <div className="flex-1 max-w-4xl">
          {/* Introduction */}
          <h1 id="introduction" className="text-4xl font-bold mb-2">{pkg.name}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">{pkg.description}</p>

          {/* Features */}
          <h2 id="features" className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-5 mb-10 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li><strong>Headless:</strong> no styles or wrapper element, style it however you like</li>
            <li><strong>SMS autofill:</strong> iOS and Android can offer the code from a text message</li>
            <li><strong>Paste anywhere:</strong> pasted codes spread across inputs, spaces are ignored</li>
            <li><strong>Keyboard friendly:</strong> auto-advance, Backspace steps back, arrow keys move between inputs</li>
            <li><strong>Fills in order:</strong> clicking an empty input jumps to the first unfilled one</li>
            <li><strong>Mobile keyboards:</strong> <code>type=&quot;number&quot;</code> opens the numeric keypad</li>
            <li><strong>International:</strong> Arabic-Indic and Persian digits become 0-9, and it works on right-to-left pages (Arabic, Hebrew) because the code is still entered left to right</li>
            <li><strong>Multi-character inputs</strong>, validation and password masking</li>
          </ul>

          {/* Usage */}
          <h2 id="usage" className="text-2xl font-semibold mb-4">Usage</h2>
          <InstallTabs packageName={pkg.packageName} />
          <div className="mb-10 text-sm text-blue-600 dark:text-blue-400">
            <a href={pkg.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline mr-6">
              GitHub Repository
            </a>
            <a href={pkg.npmUrl} target="_blank" rel="noopener noreferrer" className="hover:underline mr-6">
              View on NPM
            </a>
            {pkg.storybookUrl && (
              <a href={pkg.storybookUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Storybook Playground
              </a>
            )}
          </div>
          <p className="-mt-6 mb-10 text-sm text-neutral-600 dark:text-neutral-400">Requires React 18 or newer.</p>

          {pkg.storybookUrl && (
            <a
              href={pkg.storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-10 flex items-center justify-between gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <span>
                <span className="block font-semibold">Try it in the Storybook playground</span>
                <span className="block text-sm text-neutral-600 dark:text-neutral-400">
                  Live controls for every prop, ready-made examples (SMS code, PIN, license key, Arabic) and interaction tests.
                </span>
              </span>
              <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}

          {/* Live Demo 1 */}
          <h2 id="live-demo-1" className="text-2xl font-semibold mb-4">Live Demo 1: Basic OTP</h2>
          <Root onChange={setOtpValue1} type="number" password>
            <Label className="block mb-2 font-medium">Enter OTP</Label>
            <div className="flex space-x-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <Input
                  key={i}
                  length={1}
                  aria-label={`Digit ${i + 1} of 6`}
                  className="w-12 h-12 text-center border border-neutral-300 dark:border-neutral-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                />
              ))}
            </div>
          </Root>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            Entered OTP: <span className="font-mono">{otpValue1 || '-'}</span>
          </p>
          <CodeBlock code={`<Root onChange={setOtp} type="number" password>
  <Label>Enter OTP</Label>
  {[...Array(6)].map((_, i) => (
    <Input key={i} length={1} />
  ))}
</Root>`} />

          {/* Live Demo 2 */}
          <h2 id="live-demo-2" className="text-2xl font-semibold mb-4">Live Demo 2: Alphanumeric OTP with Joiner</h2>
          <p className="text-sm mb-3 text-neutral-700 dark:text-neutral-300">
            This example shows a referral-style OTP code joined with <code>-</code>.
          </p>
          <Root onChange={setOtpValue2} type="text" joiner="-">
            <Label className="block mb-2 font-medium">Referral Code</Label>
            <div className="flex space-x-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <Input
                  key={i}
                  length={2}
                  aria-label={`Part ${i + 1} of 4`}
                  className="w-14 h-12 text-center border border-neutral-300 dark:border-neutral-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                />
              ))}
            </div>
          </Root>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            Joined Code: <span className="font-mono">{otpValue2 || '-'}</span>
          </p>
          <CodeBlock code={`<Root onChange={setOtp} type="text" joiner="-">
  <Label>Referral Code</Label>
  {[...Array(4)].map((_, i) => (
    <Input key={i} length={2} />
  ))}
</Root>`} />

          {/* Props Reference */}
          <h2 id="props-reference" className="text-2xl font-semibold mt-10 mb-4">Props Reference</h2>

          <PropsTable components={propsReference} />

          {/* Accessibility */}
          <h2 id="accessibility" className="text-2xl font-semibold mt-10 mb-4">Accessibility</h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
            The component adds no text of its own, so labels stay in your language. Give each input an <code>aria-label</code>:
          </p>
          <CodeBlock code={`<Input aria-label="Digit 1 of 6" />`} />

          {/* Interactive Playground */}
          <OTPPlayground />

          {/* Share Package */}
          <div id="share-package" className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold mb-2">Share this package</h2>
            <div className="flex space-x-4 text-blue-600 dark:text-blue-400">
              <a
                href={`https://twitter.com/intent/tweet?url=https://feldux.com/packages/otp&text=Check out this awesome React OTP input component from @frjoy!`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://feldux.com/packages/otp`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://feldux.com/packages/otp`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* PR Link */}
          <div className="mt-10 text-sm text-neutral-600 dark:text-neutral-400">
            Want to improve this page?{' '}
            <a
              href={`${pkg.repoUrl}/tree/main/packages/${pkg.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Create a Pull Request
            </a>
          </div>
        </div>

        <TableOfContents sections={initialTableOfContent} />
      </main>
    </div>
    </>
  );
}
