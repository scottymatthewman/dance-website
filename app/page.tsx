import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE.domain,
  },
};

export default function Home() {
  return <HomePage />;
}
