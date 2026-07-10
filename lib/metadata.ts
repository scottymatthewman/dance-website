import type { Metadata } from "next";
import { SITE } from "./constants";
import { COPY } from "./copy";

const description = COPY.hero.subheadLines.join(" ");

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${COPY.hero.headline}`,
    template: `%s | ${SITE.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — ${COPY.hero.headline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${COPY.hero.headline}`,
    description,
  },
};
