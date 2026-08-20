"use client";

import Image from "next/image";

import { fallback } from "@/features/hero/data";
import { urlFor } from "@/sanity/lib/image";

interface HeroSectionProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    scriptText?: string;
    description?: string;
    ctaText?: string;
    image?: unknown;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const eyebrow = data?.eyebrow ?? fallback.eyebrow;
  const headlineParts = (data?.headline ?? fallback.headline).split("\n");
  const scriptText = data?.scriptText ?? fallback.scriptText;
  const description = (data?.description ?? fallback.description).split("\n");
  const imageSrc = data?.image
    ? urlFor(data.image).width(1800).quality(90).url()
    : fallback.imageUrl;

  return (
    <section className="overflow-hidden bg-[#0b0b0a]">
      <div className="relative h-[650px] lg:h-[650px] xl:h-[680px]">
        {/* Interior image */}
        <div className="absolute inset-y-0 right-0 w-[67%]">
          <Image
            src={imageSrc}
            alt="Luxury living room interior"
            fill
            priority
            sizes="67vw"
            className="object-cover object-center"
          />
        </div>

        {/* Dark curved mask */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 z-10 sm:w-[67%] w-[100%] bg-[#0b0b0a] clip-hero-mask"
        />

        {/* Gold edge on curved mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[11] w-[67%] clip-hero-mask-border"
        />

        {/* Image subtle overlay */}
        <div className="absolute inset-y-0 right-0 z-[2] w-[67%] bg-gradient-to-r from-black/10 via-transparent to-black/20" />

        {/* HERO CONTENT */}
        <div className="relative z-20 h-full  px-8 xl:px-[51px]">
          <div className="pt-[175px]">
            {/* Eyebrow */}
          <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.04em] text-[#c99655]">
  <span>{eyebrow}</span>
  <span className="h-px w-9 bg-[#c99655]/70" />
</div>

<h1 className="mt-5 max-w-[280px] font-serif text-[40px] font-normal leading-[1.17] tracking-[-0.025em] text-[#c99655] sm:mt-7 sm:max-w-[450px] sm:text-[36px] md:text-[48px] xl:text-[50px]">
  {headlineParts.map((line, i) => (
    <span key={i}>
      {line}
      {i < headlineParts.length - 1 && <br />}
    </span>
  ))}
  <br />
  <span className="hero-script inline-block text-[26px] leading-[1.05] sm:text-[36px] md:text-[47px]">
    {scriptText}
  </span>
</h1>

            {/* Description */}
            <p className="mt-8 max-w-[365px] text-[14px] font-light leading-[1.8] text-white/90">
              {description.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < description.length - 1 && <br />}
                </span>
              ))}
            </p>

        
          </div>
        </div>

        {/* SLIDE INDICATOR */}
       

   
      </div>

      <style jsx>{`
        .hero-script {
          font-family:
            "Brittany Signature",
            "Allura",
            "Brush Script MT";
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}
