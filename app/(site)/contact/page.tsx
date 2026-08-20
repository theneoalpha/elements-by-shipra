import type { Metadata } from "next";

import { ConsultationSection } from "@/features/consultation/components/consultation-section";
import { sanityFetch } from "@/sanity/lib";
import { consultationQuery, pageMetadataQuery } from "@/sanity/lib/queries";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "contact" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "Contact Us",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function ContactPage() {
  const consultation = await sanityFetch<Record<string, unknown>>(consultationQuery, undefined, {
    tags: ["sanity-consultation"],
  });

  return (
    <main className="pt-[88px] lg:pt-[105px]">
      <ConsultationSection data={consultation ?? undefined} />
    </main>
  );
}
