import React from "react";
import { getAllblogs } from "lib/mdx";
import { Metadata } from "next";
const BlurImage = dynamic(() => import("components/BlurImage"));
import allBlogs from "./generated";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowIcon } from "@/components/icons";

const POSTS_PER_PAGE = 5;

interface Blog {
  title: string;
  date: string;
  slug: string;
  coverImage: string;
  excerpt: string;
}

interface BlogsProps {
  initialDisplayPosts: Array<Blog>;
  posts: Array<Blog>;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function Blogs() {
  return (
    <div>
      {/* 2 grid and one in mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allBlogs.map((blog, index) => (
          <div
            key={index}
            className="text-white max-w-[300px] overflow-hidden flex flex-col justify-between"
          >
            <BlurImage
              image={blog.coverImage}
              alt={blog.title}
              width={300}
              height={200}
            />
            <Link href={`/blog/${blog.slug}`} suppressHydrationWarning>
              <h2 className="font-bold text-lg">{blog.title}</h2>
              <p className="text-md mt-2">{blog.excerpt}</p>
              <p className="mt-2 text-[12px] text-gray-400">
                {new Date(blog.date).toLocaleDateString()}
              </p>
              {/* read more button */}
            </Link>
          </div>
        ))}
      </div>
      <ul className="flex flex-col md:flex-row mt-16 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://dev.to/felixdusengimana"
          >
            <ArrowIcon />
            <p className="h-7">i also publish blogs on Dev.to</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

// export async function generateStaticParams() {
//   const allBlogs = getAllblogs([
//     'slug',
//   ])
//   return allBlogs.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {params: any}): Promise<Metadata | undefined> {
//   const allBlogs = getAllblogs()
//   const post = allBlogs.find((post) => post.slug === params.slug);
//   if (!post) {
//     return;
//   }

//   const {
//     title,
//     publishedAt: publishedTime,
//     summary: description,
//     image,
//     slug,
//   } = post;
//   const ogImage = image
//     ? `https://feldux.com${image}`
//     : `https://feldux.com/api/og?title=${title}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: 'article',
//       publishedTime,
//       url: `https://feldux.com/blog/${slug}`,
//       images: [
//         {
//           url: ogImage,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [ogImage],
//     },
//   };
// }
