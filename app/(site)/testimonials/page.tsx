import type { Metadata } from "next";

import { ReviewForm } from "@/features/testimonial-review/components/review-form";

export const metadata: Metadata = {
  title: "Leave a Review",
  description:
    "Share your experience working with Shipra Designs. We value your feedback.",
};

export default function TestimonialsPage() {
  return (
    <section className="bg-[#FAF8F5] py-24 pb-32 md:py-32 md:pb-40">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-6 bg-[#C59A58]" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B58544]">
              Testimonials
            </span>
            <span className="h-px w-6 bg-[#C59A58]" />
          </div>
          <h1 className="mt-4 font-serif text-[38px] font-normal leading-[1.1] text-[#1A1816] md:text-[50px]">
            We&apos;d Love to{" "}
            <span className="italic text-[#B58544]">Hear From You</span>
          </h1>
          <p className="mt-4 text-[13.5px] leading-relaxed text-[#6E675E]">
            Your feedback helps us create better spaces. Share your experience
            and it will appear on our site once reviewed.
          </p>
        </div>

        <ReviewForm />
      </div>
    </section>
  );
}
