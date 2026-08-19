"use client";

import { useId } from "react";

import { defaultGuarantees, defaultSteps, guaranteeIcons, stepIcons } from "@/features/turnkey/data";


interface TurnkeySectionProps {
  data?: {
    steps?: Array<{ number: string; title: string; description: string }>;
    guarantees?: Array<{ title: string; description: string }>;
  };
}

export function TurnkeySection({ data }: TurnkeySectionProps) {
  const gradientId = useId();
  const steps = data?.steps?.length ? data.steps : defaultSteps;
  const guarantees = data?.guarantees?.length ? data.guarantees : defaultGuarantees;

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] py-16 md:py-24 font-sans selection:bg-[#c59a58]/20">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#C59A58]" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B58544]">
              Turnkey Approach
            </span>
            <span className="h-px w-6 bg-[#C59A58]" />
          </div>
          <h2 className="mt-4 font-serif text-[40px] font-normal leading-tight tracking-tight text-[#1A1816] md:text-[54px]">
            From Concept to <span className="italic text-[#B58544]">Completion.</span>
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center">
            <div className="h-px w-10 bg-[#C59A58]/70" />
            <span className="mx-3 text-[11px] text-[#B58544]">✦</span>
            <div className="h-px w-10 bg-[#C59A58]/70" />
          </div>
          <p className="mx-auto mt-4 max-w-lg text-[13.5px] leading-relaxed text-[#6E675E] sm:text-[14px]">
            We manage every detail of your project with precision, delivering spaces that are beautiful, functional and built to last.
          </p>
        </div>

        {/* DESKTOP TRACK & NODES */}
        <div className="relative mt-20 hidden lg:block">
          <svg
            className="absolute inset-0 size-full pointer-events-none z-0"
            viewBox="0 0 1200 480"
            fill="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C59A58" />
                <stop offset="50%" stopColor="#B58544" />
                <stop offset="100%" stopColor="#8C6430" />
              </linearGradient>
            </defs>
            <path
              d="M 200 48 L 1000 48 C 1140 48, 1140 205, 1000 205 L 200 205 C 60 205, 60 305, 200 305 L 1000 305 C 1030 305, 1050 325, 1070 325"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="1070" cy="325" r="5" fill="#B58544" />
            <circle cx="1070" cy="325" r="10" stroke="#C59A58" strokeWidth="1.2" opacity="0.6" />
          </svg>

          {/* Row 1: 01, 02, 03 */}
          <div className="grid grid-cols-3 gap-12 relative z-10 pb-28">
            {steps.slice(0, 3).map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center group">
                <div className="relative flex size-24 items-center justify-center rounded-full border-[1.5px] border-[#D8C7B0] bg-[#FAF8F5] shadow-md transition-all duration-300 group-hover:border-[#B58544] group-hover:shadow-lg">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#D5C6B0] bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#B58544] shadow-sm">
                    {step.number}
                  </span>
                  <div className="text-[#B58544] transition-transform duration-300 group-hover:scale-110">
                    {stepIcons[i]}
                  </div>
                </div>
                <h3 className="mt-5 font-serif text-[20px] font-normal text-[#1A1816]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#6E675E] max-w-[240px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2: 04, 05, 06 */}
          <div className="grid grid-cols-3 gap-12 relative z-10">
            {steps.slice(3, 6).map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center group">
                <div className="relative flex size-24 items-center justify-center rounded-full border-[1.5px] border-[#D8C7B0] bg-[#FAF8F5] shadow-md transition-all duration-300 group-hover:border-[#B58544] group-hover:shadow-lg">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#D5C6B0] bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#B58544] shadow-sm">
                    {step.number}
                  </span>
                  <div className="text-[#B58544] transition-transform duration-300 group-hover:scale-110">
                    {stepIcons[i + 3]}
                  </div>
                </div>
                <h3 className="mt-5 font-serif text-[20px] font-normal text-[#1A1816]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#6E675E] max-w-[240px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="mt-12 space-y-6 lg:hidden relative">
          <div className="absolute left-[31px] top-6 bottom-6 w-[1.5px] bg-[#E0D5C3]" />
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex items-start gap-4 z-10">
              <div className="relative flex size-16 shrink-0 items-center justify-center rounded-full border border-[#D5C6B0] bg-[#FAF8F5] shadow-sm">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#B58544] px-2 py-0.2 text-[8.5px] font-bold text-white shadow-xs">
                  {step.number}
                </span>
                <div className="text-[#B58544] scale-90">{stepIcons[i]}</div>
              </div>
              <div className="flex-1 pt-1 rounded-[16px] border border-[#E8DFC8] bg-white/80 p-4 shadow-sm">
                <h3 className="font-serif text-[17px] font-normal text-[#1A1816]">
                  {step.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#6E675E]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM 4-PILLAR TRUST BAR */}
        <div className="mt-20">
          <div className="rounded-[24px] border border-[#E8DFC8] bg-white/80 backdrop-blur-md p-6 lg:p-8 shadow-[0_15px_40px_rgba(40,25,10,0.03)]">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#E8DFC8]/80">
              {guarantees.map((item, i) => (
                <div key={item.title} className="flex items-start gap-4 px-2 lg:px-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D5C6B0] bg-[#FAF6F0] text-[#B58544] shadow-xs">
                    {guaranteeIcons[i]}
                  </div>
                  <div>
                    <h4 className="font-sans text-[14px] font-bold text-[#1A1816]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[11.5px] leading-snug text-[#6E675E]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
