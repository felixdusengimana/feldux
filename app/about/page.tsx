/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import {
  GitHubIcon,
  ArrowIcon,
  TwitterIcon,
  CodePenIcon,
  BlueSkyIcon,
  LinkedInIcon
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Software Developer | Felix Dusengimana",
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
          I'm the <b>Software Developer</b> <br />
        </p>

        <p>
          More than {new Date().getFullYear() - 2020}+ years of software
          development, experience with a focus on web and mobile app
          development. Launched a couple of dozen different apps on multiple
          platforms. I like to work on challenging problems, especially ones
          that touch people's lives.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/felix__dusenge"
            className="flex col-span-2 w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">X(Formerly Twitter)</div>
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
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://codepen.io/phelixdusengimana"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <CodePenIcon />
              <div className="ml-2">Codepen</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://bsky.app/profile/felixdusengimana.bsky.social"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <BlueSkyIcon />
              <div className="ml-3">BlueSky</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.google.com/document/d/1QIiMGRmwq9YADUY92TnQiLcr7vTMMiAaM_RI6tdgHGE/edit?usp=sharing"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-3">Resume</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/felixdusengimana"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedInIcon />
              <div className="ml-3">LinkedIn</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
