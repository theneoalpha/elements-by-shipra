import type { Metadata } from "next";

import { ServicesSection } from "@/features/services/components/services-section";
import { sanityFetch } from "@/sanity/lib";
import { pageMetadataQuery, servicesQuery } from "@/sanity/lib/queries";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "services" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "Services",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function ServicesPage() {
  const [services] = await Promise.all([
    sanityFetch<Array<Record<string, unknown>>>(servicesQuery, undefined, {
      tags: ["sanity-services"],
    }),
  ]);

  return (
    <main className="pt-[88px] lg:pt-[105px]">
      <ServicesSection data={services ?? undefined} />
    </main>
  );
}
