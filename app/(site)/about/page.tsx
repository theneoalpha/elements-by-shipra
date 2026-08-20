import type { Metadata } from "next";

import { AboutSection } from "@/features/about/components/about-section";
import { sanityFetch } from "@/sanity/lib";
import { aboutSectionQuery, pageMetadataQuery } from "@/sanity/lib/queries";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "about" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "About Us",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function AboutPage() {
  const [about] = await Promise.all([
    sanityFetch<Record<string, unknown>>(aboutSectionQuery, undefined, {
      tags: ["sanity-aboutSection"],
    }),
  ]);

  return (
    <main className="pt-[88px] lg:pt-[105px]">
      <AboutSection data={about ?? undefined} />
    </main>
  );
}
