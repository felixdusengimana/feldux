"use client"
import InstallTabs from "@/components/InstallTabs";
import { packages } from "@/lib/packages";
import Link from "next/link";
import React from 'react';

export default function PackagesPage() {

  return (
    <section className="p-6 max-w-4xl mx-auto text-neutral-800 dark:text-neutral-200">
      <h1 className="text-4xl font-bold mb-8 ">Available Packages</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {packages.map(({ slug, name, description, repoUrl, packageName }) => (
          <div
            key={slug}
            className="relative cursor-pointer border border-neutral-300 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none dark:hover:shadow-lg transition-shadow bg-white dark:bg-neutral-900"
          >
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">{description}</p>

            <div className="relative z-10 cursor-auto">
              <InstallTabs packageName={packageName} />
            </div>

            <Link
              href={`/packages/${slug}`}
              className="inline-block text-blue-600 mt-5 hover:underline after:absolute after:inset-0 after:rounded-lg"
            >
              View Documentation →
            </Link>

            {repoUrl && (
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 hover:underline"
                >
                  Contribute / Create a Pull Request
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
