import { getAllblogs } from "@/lib/mdx";

const allBlogs = getAllblogs([
    'slug',
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
    'keywords',
])

export default allBlogs;