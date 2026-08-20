import type { Metadata } from "next";

import { AboutSection } from "@/features/about/components/about-section";
import { ConsultationSection } from "@/features/consultation/components/consultation-section";
import { HeroSection } from "@/features/hero/components/hero-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { PromisesSection } from "@/features/promises/components/promises-section";
import { ServicesSection } from "@/features/services/components/services-section";
import { TestimonialsSection } from "@/features/testimonials/components/testimonials-section";
import { TransformationSection } from "@/features/transformation/components/transformation-section";
import { TurnkeySection } from "@/features/turnkey/components/turnkey-section";
import { sanityFetch } from "@/sanity/lib";
import {
  aboutSectionQuery,
  consultationQuery,
  heroQuery,
  pageMetadataQuery,
  projectsQuery,
  promisesQuery,
  servicesQuery,
  testimonialStatsQuery,
  testimonialsQuery,
  transformationQuery,
  turnkeyProcessQuery,
} from "@/sanity/lib/queries";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await sanityFetch<PageMeta>(pageMetadataQuery, { slug: "home" }, { tags: ["sanity-pageMetadata"] });

  return {
    title: meta?.title ?? "Home",
    description: meta?.description ?? "",
    openGraph: meta?.ogImage ? { images: [meta.ogImage] } : undefined,
  };
}

export default async function Home() {
  const [hero, services, projects, promises, about, transformation, turnkey, testimonials, testimonialStats, consultation] =
    await Promise.all([
      sanityFetch<Record<string, unknown>>(heroQuery, undefined, { tags: ["sanity-hero"] }),
      sanityFetch<Array<Record<string, unknown>>>(servicesQuery, undefined, { tags: ["sanity-services"] }),
      sanityFetch<Array<Record<string, unknown>>>(projectsQuery, undefined, { tags: ["sanity-projects"] }),
      sanityFetch<Array<Record<string, unknown>>>(promisesQuery, undefined, { tags: ["sanity-promises"] }),
      sanityFetch<Record<string, unknown>>(aboutSectionQuery, undefined, { tags: ["sanity-aboutSection"] }),
      sanityFetch<Record<string, unknown>>(transformationQuery, undefined, { tags: ["sanity-transformation"] }),
      sanityFetch<Record<string, unknown>>(turnkeyProcessQuery, undefined, { tags: ["sanity-turnkeyProcess"] }),
      sanityFetch<Array<Record<string, unknown>>>(testimonialsQuery, undefined, { tags: ["sanity-testimonials"] }),
      sanityFetch<Record<string, unknown>>(testimonialStatsQuery, undefined, { tags: ["sanity-testimonialStats"] }),
      sanityFetch<Record<string, unknown>>(consultationQuery, undefined, { tags: ["sanity-consultation"] }),
    ]);

  return (
    <main>
      <HeroSection data={hero ?? undefined} />
      <TransformationSection data={transformation ?? undefined} />
      <TurnkeySection data={turnkey ?? undefined} />
      <ServicesSection data={services ?? undefined} />
      <ProjectsSection data={projects ?? undefined} />
      <PromisesSection data={promises ?? undefined} />
      <AboutSection data={about ?? undefined} />
      <TestimonialsSection
        testimonials={testimonials ?? undefined}
        stats={
          (testimonialStats?.stats as
            | Array<{ value: string; label: string }>
            | undefined) ?? undefined
        }
      />
      <ConsultationSection data={consultation ?? undefined} />
    </main>
  );
}
