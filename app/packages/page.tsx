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
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>

            <InstallTabs  packageName={packageName}/>

            <Link
              href={`/packages/${slug}`}
              className="inline-block text-blue-600 mt-5 hover:underline"
            >
              View Documentation →
            </Link>

            {repoUrl && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
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
