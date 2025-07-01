'use client';

import { useState } from 'react';
import { Root, Input, Label } from '@frjoy/otp';
import { packages } from '@/lib/packages';
import InstallTabs from '@/components/InstallTabs';
import TableOfContents, { ITableOfContent } from '@/components/TableOfContents';
import Head from 'next/head';

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
    { id: 'usage', title: 'Usage', active: false },
    { id: 'live-demo-1', title: 'Live Demo 1: Basic OTP', active: false },
    { id: 'live-demo-2', title: 'Live Demo 2: Alphanumeric OTP with Joiner', active: false },
    { id: 'props-reference', title: 'Props Reference', active: false },
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
          <p className="text-gray-600 dark:text-gray-400 mb-6">{pkg.description}</p>

          {/* Usage */}
          <h2 id="usage" className="text-2xl font-semibold mb-4">Usage</h2>
          <InstallTabs packageName={pkg.packageName} />
          <div className="mb-10 text-sm text-blue-600 dark:text-blue-400">
            <a href={pkg.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline mr-6">
              GitHub Repository
            </a>
            <a href={pkg.npmUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              View on NPM
            </a>
          </div>

          {/* Live Demo 1 */}
          <h2 id="live-demo-1" className="text-2xl font-semibold mb-4">Live Demo 1: Basic OTP</h2>
          <Root onChange={setOtpValue1} type="number" password>
            <Label className="block mb-2 font-medium">Enter OTP</Label>
            <div className="flex space-x-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <Input
                  key={i}
                  length={1}
                  className="w-12 h-12 text-center border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              ))}
            </div>
          </Root>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Entered OTP: <span className="font-mono">{otpValue1 || '-'}</span>
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded overflow-x-auto text-gray-800 dark:text-gray-100 mb-10">
            <code>
              {`<Root onChange={setOtp} type="number" password>
  <Label>Enter OTP</Label>
  {[...Array(6)].map((_, i) => (
    <Input key={i} length={1} />
  ))}
</Root>`}
            </code>
          </pre>

          {/* Live Demo 2 */}
          <h2 id="live-demo-2" className="text-2xl font-semibold mb-4">Live Demo 2: Alphanumeric OTP with Joiner</h2>
          <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
            This example shows a referral-style OTP code joined with <code>-</code>.
          </p>
          <Root onChange={setOtpValue2} type="text" joiner="-">
            <Label className="block mb-2 font-medium">Referral Code</Label>
            <div className="flex space-x-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <Input
                  key={i}
                  length={2}
                  className="w-14 h-12 text-center border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white uppercase"
                />
              ))}
            </div>
          </Root>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Joined Code: <span className="font-mono">{otpValue2 || '-'}</span>
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded overflow-x-auto text-gray-800 dark:text-gray-100 mb-10">
            <code>
              {`<Root onChange={setOtp} type="text" joiner="-">
  <Label>Referral Code</Label>
  {[...Array(4)].map((_, i) => (
    <Input key={i} length={2} />
  ))}
</Root>`}
            </code>
          </pre>

          {/* Props Reference */}
          <h2 id="props-reference" className="text-2xl font-semibold mt-10 mb-4">Props Reference</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">{`<Root />`}</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            <li><code>onChange?: (otp: string) =&gt; void</code></li>
            <li><code>type?: &apos;number&apos; | &apos;text&apos; | &apos;any&apos;</code></li>
            <li><code>password?: boolean</code></li>
            <li><code>joiner?: string</code></li>
            <li><code>pattern?: string</code></li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">{`<Input />`}</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            <li><code>length?: number</code></li>
            <li><code>password?: boolean</code></li>
            <li>Supports all native input props</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">{`<Label />`}</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            <li>Automatically focuses first incomplete field</li>
            <li>Accessible via <code>aria-live</code></li>
          </ul>

          {/* Share Package */}
          <div id="share-package" className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Share this package</h2>
            <div className="flex space-x-4 text-blue-600 dark:text-blue-400">
              <a
                href={`https://twitter.com/intent/tweet?url=https://feldux.com/packages/otp-input&text=Check out this awesome React OTP input component from @frjoy!`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://feldux.com/packages/otp-input`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://feldux.com/packages/otp-input`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* PR Link */}
          <div className="mt-10 text-sm text-gray-600 dark:text-gray-400">
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
