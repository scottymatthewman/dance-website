import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AgentationToolbar } from "@/components/dev/AgentationToolbar";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const genInterface = localFont({
  src: [
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gen-interface",
  display: "swap",
});

const genInterfaceDisplay = localFont({
  src: [
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gen-interface-display",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${genInterface.variable} ${genInterfaceDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip bg-section text-primary">
        <SiteShell>
          <main className="overflow-x-clip">{children}</main>
        </SiteShell>
        <AgentationToolbar />
      </body>
    </html>
  );
}
