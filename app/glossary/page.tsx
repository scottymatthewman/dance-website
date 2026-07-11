import type { Metadata } from "next";
import { GLOSSARY_TERMS } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: COPY.content.glossary.title,
  description: COPY.content.glossary.description,
  alternates: {
    canonical: `${SITE.domain}/glossary`,
  },
};

export default function GlossaryPage() {
  return (
    <div className="content-page">
      <div className="content-page-inner">
        <div className="content-page-intro">
          <h1 className="content-page-headline">
            {COPY.content.glossary.headline}
          </h1>
          <p className="content-page-description">
            {COPY.content.glossary.description}
          </p>
        </div>

        <dl className="glossary-list">
          {GLOSSARY_TERMS.map((entry, index) => (
            <div key={`${entry.term}-${index}`} className="glossary-entry">
              <dt className="glossary-term">{entry.term}</dt>
              <dd className="glossary-definition">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
