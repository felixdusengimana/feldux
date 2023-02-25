import Link from 'next/link'
import React from 'react'

interface BlogsProps {
  blogs: any[]
}

export default function Blogs() {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  )
}

// async function fetchBlogs(){
//   const res = await fetch(
//     "https://jsonplaceholder.typicode.com/posts"

//   )
//   return await res.json()
// }

export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
  console.log('posts',posts)
  return {
    props: {
      data: {
        id: 1
      },
      data2:{
        id: 2
      }
    },
    revalidate: 86400,
  }
}