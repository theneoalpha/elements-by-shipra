"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { fallbackPromises, promiseIcons } from "@/features/promises/data";


interface PromisesSectionProps {
  data?: Array<{
    number?: string;
    title?: string;
    mobileTitle?: string;
    description?: string;
    stat?: string;
    statLabel?: string;
  }>;
}

export function PromisesSection({ data }: PromisesSectionProps) {
  const promises = data?.length ? data.map((p, i) => ({
    number: p.number ?? fallbackPromises[i]?.number ?? String(i + 1).padStart(2, "0"),
    title: p.title ?? fallbackPromises[i]?.title ?? "",
    mobileTitle: p.mobileTitle ?? p.title ?? fallbackPromises[i]?.mobileTitle ?? "",
    description: p.description ?? fallbackPromises[i]?.description ?? "",
    arcColor: i % 2 === 0 ? "#B58544" : "#1A1816",
    iconColor: i % 2 === 0 ? "text-[#B58544]" : "text-[#1A1816]",
  })) : fallbackPromises.map((p, i) => ({
    ...p,
    arcColor: i % 2 === 0 ? "#B58544" : "#1A1816",
    iconColor: i % 2 === 0 ? "text-[#B58544]" : "text-[#1A1816]",
  }));

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] py-16 md:py-24 font-sans selection:bg-[#c59a58]/20">
      <div className="pointer-events-none absolute left-0 top-0 hidden lg:block h-[380px] w-[340px] overflow-hidden rounded-br-[160px] border-r border-b border-[#D9C4A1]/40 shadow-sm">
        <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" alt="Luxury Architecture" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none absolute right-16 top-10 hidden lg:grid grid-cols-4 gap-2 opacity-30 select-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-[#B58544]" />
        ))}
      </div>

      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#C59A58]" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B58544]">Our Promises</span>
            <span className="h-px w-6 bg-[#C59A58]" />
          </div>
          <h2 className="mt-4 font-serif text-[38px] font-normal leading-tight tracking-tight text-[#1A1816] md:text-[52px]">
            Promises We Make, <br />
            <span className="italic text-[#B58544]">Standards</span> We Keep.
          </h2>
          <div className="mx-auto mt-4 h-px w-10 bg-[#C59A58]/80" />
          <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-[#6E675E] sm:text-[14px]">
            We don&apos;t just design beautiful spaces, we deliver experiences built on trust, transparency and excellence.
          </p>
        </div>

        {/* DESKTOP 5-COLUMN GRID */}
        <div className="mt-20 hidden lg:grid lg:grid-cols-5 relative divide-x divide-[#E8DFC8]/70">
          {promises.map((item) => (
            <div key={item.number} className="flex flex-col items-center px-6 text-center group">
              <span className="font-serif text-[26px] leading-none text-[#B58544]">{item.number}</span>
              <div className="relative mt-7 flex size-20 items-center justify-center">
                <svg className="absolute inset-0 size-full" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#E8DFC8" strokeWidth="1.2" />
                  <path d="M 40 4 A 36 36 0 0 1 76 40" fill="none" stroke={item.arcColor} strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="4" cy="40" r="2.5" fill={item.arcColor} />
                </svg>
                <div className={`${item.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {promiseIcons[promises.indexOf(item)]}
                </div>
              </div>
              <h3 className="mt-8 font-sans text-[16px] font-bold leading-snug text-[#1A1816] whitespace-pre-line min-h-[44px]">{item.title}</h3>
              <div className="mt-3 h-[1.5px] w-6 bg-[#C59A58]" />
              <p className="mt-4 text-[12px] leading-relaxed text-[#6E675E] max-w-[190px]">{item.description}</p>
            </div>
          ))}
        </div>

        {/* MOBILE STACKED CARDS */}
        <div className="mt-10 space-y-3 lg:hidden">
          {promises.map((item) => (
            <div key={item.number} className="group relative flex items-center justify-between rounded-[18px] border border-[#E9E2D5] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform active:scale-[0.99]">
              <div className="relative flex size-14 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 size-full" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E8DFC8" strokeWidth="1.2" />
                  <path d="M 30 4 A 26 26 0 0 1 56 30" fill="none" stroke={item.arcColor} strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="4" cy="30" r="2" fill={item.arcColor} />
                </svg>
                <div className={`${item.iconColor} scale-75`}>
                  {promiseIcons[promises.indexOf(item)]}
                </div>
              </div>
              <div className="flex-1 pl-4 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[15px] font-medium text-[#B58544]">{item.number}</span>
                  <h4 className="font-sans text-[14px] font-bold text-[#1A1816]">{item.mobileTitle}</h4>
                </div>
                <p className="mt-1 text-[11px] leading-tight text-[#6E675E]">{item.description}</p>
              </div>
              <div className="text-[#B58544]">
                <ArrowRight size={15} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Full-width CTA Button */}
        <div className="mt-6 lg:hidden">
          <button type="button" className="flex h-12 w-full items-center justify-between rounded-full bg-[#161616] px-6 text-white shadow-md active:scale-95 transition-transform">
            <span className="font-sans text-[13px] font-medium tracking-wide">Let&apos;s Build Your Dream Space</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-[#B58544]" />
          </button>
        </div>
      </div>
    </section>
  );
}
