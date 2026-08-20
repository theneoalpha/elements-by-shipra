"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { reviewFields } from "@/features/testimonial-review/constants";
import { Form } from "@/shared/components/forms/form";
import { RenderFields } from "@/shared/components/forms/render-fields";
import { FormSubmitStatusMessage } from "@/shared/components/forms/submit-status-message";
import type { FormSubmitStatus } from "@/shared/components/forms/types";

const reviewSchema = z.object({
  quote: z.string().min(10, "Review must be at least 10 characters"),
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Project type is required"),
  projectImage: z.any().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { quote: "", name: "", role: "" },
    mode: "onBlur",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState<FormSubmitStatus>({
    status: "idle",
  });

  const onSubmit = async (values: ReviewFormValues) => {
    setSubmitState({ status: "idle" });

    const formData = new FormData();
    formData.append("quote", values.quote);
    formData.append("name", values.name);
    formData.append("role", values.role);

    if (values.projectImage instanceof File) {
      formData.append("projectImage", values.projectImage);
    }

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmitState({ status: "success" });
        form.reset();
        return;
      }

      const data = await response.json();
      setSubmitState({
        status: "error",
        message: data.error || "Something went wrong. Please try again.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Failed to submit. Please check your connection.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-[#E8DFC8] bg-white p-8 text-center shadow-[0_20px_50px_rgba(40,25,10,0.04)]">
        <div className="flex size-16 items-center justify-center rounded-full border border-[#B58544]/40 bg-[#FAF6F0] text-[#B58544]">
          <CheckCircle2 size={32} strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-serif text-[28px] font-normal text-[#1A1816]">
          Thank You!
        </h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#6E675E]">
          Your review has been submitted. It will appear on the site once
          approved by our team.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#B58544] underline underline-offset-4 hover:text-[#9E7134]"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-[32px] border border-[#E8DFC8] bg-white/90 p-7 shadow-[0_20px_50px_rgba(40,25,10,0.04)] backdrop-blur-md sm:p-10">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C59A58]/60 to-transparent" />

      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B58544]">
          Share Your Experience
        </span>
        <h3 className="mt-1 font-serif text-[26px] font-normal text-[#1A1816] sm:text-[30px]">
          Leave a Review
        </h3>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <RenderFields fields={reviewFields} />

        <div className="pt-4">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1A1816] px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-[#EAD8BD] shadow-[0_10px_30px_rgba(26,24,22,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A2724] hover:shadow-[0_14px_35px_rgba(26,24,22,0.22)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {form.formState.isSubmitting ? (
              <>
                <span className="relative h-4 w-4 animate-spin rounded-full border border-[#EAD8BD]/30 border-t-[#EAD8BD]" />
                <span className="relative">Submitting...</span>
              </>
            ) : (
              <>
                <span className="relative">Submit Review</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#EAD8BD] text-[#1A1816] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </>
            )}
          </button>
        </div>
      </Form>

      <FormSubmitStatusMessage
        status={submitState}
        successMessage="Thank you for your review! It will appear on the site once approved."
      />
    </div>
  );
}
