import type { Metadata } from "next";

import { ProjectsSection } from "@/features/projects/components/projects-section";
import { sanityFetch } from "@/sanity/lib";
import { pageMetadataQuery, projectsQuery } from "@/sanity/lib/queries";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "projects" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "Projects",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function ProjectsPage() {
  const [projects] = await Promise.all([
    sanityFetch<Array<Record<string, unknown>>>(projectsQuery, undefined, {
      tags: ["sanity-projects"],
    }),
  ]);

  return (
    <main className="pt-[88px] lg:pt-[105px]">
      <ProjectsSection data={projects ?? undefined} />
    </main>
  );
}
