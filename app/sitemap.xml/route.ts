import { getAllblogs } from "@/lib/mdx";
import { packages } from "@/lib/packages";
import { siteUrl } from "@/lib/seo";

export function GET() {
  const pages = [
    { path: "/", priority: "1.0" },
    { path: "/about", priority: "0.8" },
    { path: "/blog", priority: "0.8" },
    { path: "/packages", priority: "0.8" },
    { path: "/resume", priority: "0.9" },
    ...packages.map((p) => ({ path: `/packages/${p.slug}`, priority: "0.9" })),
  ].map((p) => `<url><loc>${siteUrl}${p.path}</loc><priority>${p.priority}</priority></url>`);

  const posts = getAllblogs(["slug", "date"]).map(
    (post) =>
      `<url><loc>${siteUrl}/blog/${post.slug}</loc><lastmod>${new Date(post.date).toISOString()}</lastmod><priority>0.7</priority></url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...posts].join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
