import type { Metadata } from "next";
import { SITE } from "./constants";
import { COPY } from "./copy";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${COPY.hero.headline}`,
    template: `%s | ${SITE.name}`,
  },
  description: COPY.hero.subhead,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — ${COPY.hero.headline}`,
    description: COPY.hero.subhead,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${COPY.hero.headline}`,
    description: COPY.hero.subhead,
  },
};
