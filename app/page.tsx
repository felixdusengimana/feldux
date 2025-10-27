import Link from "next/link";
import Image from "next/image";

import {
  ArrowIcon,
  BioIcon,
  CalenderIcon,
  LocationIcon,
} from "components/icons";
import { name, about, bio, avatar } from "lib/info";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        {about()}
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="#"
            className="flex items-center gap-2"
          >
            <LocationIcon />
            {`Kigali, Rwanda`}
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/felixdusengimana"
            className="flex items-center gap-2"
          >
            <CalenderIcon />
            {`started in 2019`}
          </a>
          <Link href="/blog" className="flex items-center gap-2">
            <BioIcon />
            {`software developer`}
          </Link>
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/felix__dusenge"
          >
            <ArrowIcon />
            <p className="h-7">X(Formerly Twitter)</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/felixdusengimana"
          >
            <ArrowIcon />
            <p className="h-7">Github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://bsky.app/profile/felixdusengimana.bsky.social"
          >
            <ArrowIcon />
            <p className="h-7">Bluesky</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://codepen.io/felixdusengimana"
          >
            <ArrowIcon />
            <p className="h-7">Codepen</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.google.com/document/d/1QIiMGRmwq9YADUY92TnQiLcr7vTMMiAaM_RI6tdgHGE/edit?usp=sharing"
          >
            <ArrowIcon />
            <p className="h-7">Resume</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/felixdusengimana"
          >
            <ArrowIcon />
            <p className="h-7">LinkedIn</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
