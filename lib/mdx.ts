import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const blogsDirectory = join(process.cwd(), '_blogs')

export function getBlogslugs() {
  return fs.readdirSync(blogsDirectory)
}

export function getBlogBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllblogs(fields: string[] = []) : Array<any>{
  const slugs = getBlogslugs()
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug, fields))
    // sort blogs by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return blogs
}