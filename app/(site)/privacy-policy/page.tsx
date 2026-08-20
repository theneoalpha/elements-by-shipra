import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib";
import { legalPageQuery, pageMetadataQuery } from "@/sanity/lib/queries";
import { RichText } from "@/shared/components/rich-text";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

interface LegalPageData {
  title: string;
  body: Array<Record<string, unknown>>;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "privacy-policy" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "Privacy Policy",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function PrivacyPolicyPage() {
  const page = await sanityFetch<LegalPageData>(legalPageQuery, { slug: "privacy-policy" }, { tags: ["sanity-legalPage"] });

  return (
    <section className="bg-[#FAF8F5] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-6 bg-[#C59A58]" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B58544]">
              Legal
            </span>
            <span className="h-px w-6 bg-[#C59A58]" />
          </div>
          <h1 className="mt-4 font-serif text-[38px] font-normal leading-[1.1] text-[#1A1816] md:text-[50px]">
            {page?.title ?? "Privacy Policy"}
          </h1>
        </div>

        {page?.body ? (
          <RichText value={page.body} />
        ) : (
          <p className="text-center text-[13.5px] leading-relaxed text-[#6E675E]">
            Content coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
