import type { Metadata } from "next";
import { SITE } from "./constants";
import { COPY } from "./copy";

const description = COPY.hero.subheadLines.join(" ");
const title = `${SITE.name} — ${COPY.hero.headline}`;
const ogImage = {
  url: "/metadata/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: title,
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: title,
    template: `%s | ${SITE.name}`,
  },
  description,
  icons: {
    icon: "/metadata/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    siteName: SITE.name,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};
