import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

import { sanityFetch } from "@/sanity/lib";
import { siteSettingsQuery } from "@/sanity/lib/queries";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

interface SiteSettings {
  name?: string;
  description?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery, undefined, { tags: ["sanity-siteSettings"] });

  const name = settings?.name ?? "SHIPRA DESIGNS";
  const description = settings?.description ?? "";

  return {
    title: {
      default: `${name} — Interior Design Studio`,
      template: `%s — ${name}`,
    },
    description,
    openGraph: {
      title: `${name} — Interior Design Studio`,
      description,
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
