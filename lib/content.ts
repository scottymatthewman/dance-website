export type BlogArticle = {
  title: string;
  slug: string;
};

export type GlossaryEntry = {
  term: string;
  definition: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [];

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
