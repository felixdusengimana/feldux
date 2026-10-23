import type { Metadata } from "next";

export const siteUrl = "https://feldux.com";
export const siteName = "Felix Dusengimana";
export const twitterHandle = "@felix__dusenge";
export const defaultDescription =
  "Felix Dusengimana is a software engineer in Kigali, Rwanda, building React and TypeScript apps, open-source packages and writing about web development.";
export const defaultImage = { url: `${siteUrl}/og/default.png`, width: 1200, height: 630, alt: `${siteName}, Software Engineer` };
export const defaultKeywords = [
  "Felix Dusengimana",
  "software engineer",
  "Kigali",
  "Rwanda",
  "React",
  "Next.js",
  "TypeScript",
  "web development",
  "open source",
];

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
}

// canonical and og:url must only be set on pages, not layouts: Next 13.2 dev
// fails to clone these URLs when a child page has generateMetadata
// search results show about 160 characters
const shorten = (text: string, max = 160) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…";

export function pageMetadata({ title, description: full, path, keywords = [], image = defaultImage, type = "website", publishedTime }: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  const description = shorten(full);
  return {
    title,
    description,
    keywords: [...keywords, ...defaultKeywords],
    authors: [{ name: siteName, url: siteUrl }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      locale: "en_US",
      images: [image],
      ...(publishedTime ? { publishedTime, authors: [siteName] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: twitterHandle,
      images: [image.url],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const person = {
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  sameAs: [
    "https://github.com/felixdusengimana",
    "https://www.linkedin.com/in/felixdusengimana",
    "https://x.com/felix__dusenge",
    "https://bsky.app/profile/feldux.com",
    "https://codepen.io/felixdusengimana",
    "https://dev.to/felixdusengimana",
  ],
};
