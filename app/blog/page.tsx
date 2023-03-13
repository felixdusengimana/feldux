import React from 'react'
import {getAllblogs} from 'lib/mdx'
import { Metadata } from 'next'
import BlurImage from '@/components/BlurImage'

const POSTS_PER_PAGE = 5

interface Blog{
  title: string
  date: string
  slug: string
  coverImage: string
  excerpt: string
}

interface BlogsProps {
  initialDisplayPosts: Array<Blog>
  posts: Array<Blog>
  pagination: {
    currentPage: number
    totalPages: number
  }
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function Blogs() {
  const allBlogs:Array<Blog> = getAllblogs([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ])
  return (
    <div>
      {/* 2 grid and one in mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {
          allBlogs.map((blog, index) => (
            <div key={index} className='text-white max-w-[300px] overflow-hidden flex flex-col justify-between'>
              <BlurImage
                image={blog.coverImage}
                alt={blog.title}
                width={300}
                height={300}
              />
              <h2 className='font-bold text-lg'>{blog.title}</h2>
              <p className='text-md mt-2'>{blog.excerpt}</p>
              <p className='mt-2 text-[12px] text-gray-400'>{new Date(blog.date).toLocaleDateString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
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