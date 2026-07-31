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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PP2M2RND');`,
          }}
        />
      </head>
      <body className="min-h-full overflow-x-clip bg-section text-primary">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP2M2RND"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteShell>
          <main className="overflow-x-clip">{children}</main>
        </SiteShell>
        <AgentationToolbar />
      </body>
    </html>
  );
}
