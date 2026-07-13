export type BlogArticle = {
  title: string;
  slug: string;
};

export type GlossaryEntry = {
  term: string;
  definition: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [
  { title: "Article Title", slug: "article-title-1" },
  { title: "Article Title", slug: "article-title-2" },
  { title: "Article Title", slug: "article-title-3" },
  { title: "Article Title", slug: "article-title-4" },
  { title: "From Tessa's Laptop", slug: "from-tessas-laptop" },
];

export const GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    term: "Term",
    definition: "A short definition of what this term means in our context.",
  },
  {
    term: "Term",
    definition: "A short definition of what this term means in our context.",
  },
  {
    term: "Term",
    definition: "A short definition of what this term means in our context.",
  },
];
