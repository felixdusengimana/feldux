/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import {
  GitHubIcon,
  ArrowIcon,
  TwitterIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'About',
  description: 'Lead SoftwareDeveloper at StylosConsults.',
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I'm Felix.
      </p>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
        I'm the <b>Lead Software Developer at StylosConsults</b> <br />
        where my team helps companies build their apps.
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-2 mt-8">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/felix__dusenge"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/felixdusengimana"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          {/* <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/@felixdusengimana"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <YoutubeIcon />
              <div className="ml-3">YouTube</div>
            </div>
            <ArrowIcon />
          </a> */}
        </div>
      </div>
    </section>
  );
}