import type { Metadata } from "next";
import { ContentArticleLink, FileTextIcon, GlossaryIcon } from "@/components/content/ContentArticleLink";
import { BLOG_ARTICLES } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: COPY.content.blog.title,
  description: COPY.content.blog.description,
  alternates: {
    canonical: `${SITE.domain}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div className="content-page">
      <div className="content-page-inner">
        <div className="content-page-intro">
          <h1 className="content-page-headline">{COPY.content.blog.headline}</h1>
        </div>

        <section aria-label="Content" className="content-article-list">
          <ul className="content-articles">
            <li>
              <ContentArticleLink href="/glossary" icon={<GlossaryIcon />}>
                {COPY.content.glossary.title}
              </ContentArticleLink>
            </li>
          </ul>

          <div className="content-article-group">
            <p className="content-article-year">{COPY.content.blog.year}</p>

            {BLOG_ARTICLES.length > 0 ? (
              <ul className="content-articles">
                {BLOG_ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <ContentArticleLink
                      href={`/blog/${article.slug}`}
                      icon={<FileTextIcon />}
                    >
                      {article.title}
                    </ContentArticleLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
