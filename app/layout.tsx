import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { AgentationToolbar } from "@/components/dev/AgentationToolbar";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const genInterface = localFont({
  src: [
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp/GenInterfaceJP-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gen-interface",
  display: "swap",
});

const genInterfaceDisplay = localFont({
  src: [
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/gen-interface-jp-display/GenInterfaceJPDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gen-interface-display",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${genInterface.variable} ${genInterfaceDisplay.variable} h-full antialiased`}
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
