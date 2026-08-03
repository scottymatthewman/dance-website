import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/content";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const blogPosts: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${SITE.domain}/blog/${article.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE.domain,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.domain}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: `${SITE.domain}/glossary`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
