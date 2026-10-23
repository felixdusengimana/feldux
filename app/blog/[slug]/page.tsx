import type { Metadata } from "next";
import { notFound } from "next/navigation";
import allBlogs from "../generated";
import MdxPage from "@/components/MDX";
import { getBlogBySlug } from "@/lib/mdx";
import { pageMetadata, JsonLd, person, siteUrl, defaultImage } from "@/lib/seo";
import ShareLinks from "@/components/ShareLinks";

interface ParamProps {
  params: {
    slug: string;
  };
}
export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

// front matter keywords can be a list or a comma-separated string
const toList = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : typeof v === "string" ? v.split(",").map((k) => k.trim()).filter(Boolean) : [];

export async function generateMetadata({
  params,
}: ParamProps): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, excerpt: description, date: publishedTime, coverImage, slug, keywords } = post;
  return pageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime,
    keywords: [...toList(keywords), "tutorial", "article"],
    image: coverImage ? { url: `${siteUrl}${coverImage}`, alt: title } : defaultImage,
  });
}

export default async function Blog({ params }: ParamProps) {
  const post = getBlogBySlug(params.slug, [
    "title",
    "slug",
    "date",
    "excerpt",
    "coverImage",
    "content",
  ]);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: post.coverImage ? `${siteUrl}${post.coverImage}` : defaultImage.url,
          url: `${siteUrl}/blog/${params.slug}`,
          mainEntityOfPage: `${siteUrl}/blog/${params.slug}`,
          author: person,
        }}
      />
      <h1 className="font-bold text-3xl font-serif max-w-[650px]">
        {post.title}
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
        <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md px-2 py-1 tracking-tighter">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
        </div>
        <div className="h-[0.2em] bg-neutral-200 dark:bg-neutral-800 mx-2" />
      </div>

      <MdxPage code={post.content} />
      <ShareLinks
        heading="Share this article"
        url={`${siteUrl}/blog/${params.slug}`}
        title={post.title}
        text={`${post.title} by Felix Dusengimana`}
      />
    </section>
  );
}
