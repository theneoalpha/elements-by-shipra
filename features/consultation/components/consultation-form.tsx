"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { consultationFields } from "@/features/consultation/constants";
import {
  consultationFormSchema,
  type ConsultationFormValues,
} from "@/features/consultation/form-schema";
import { Form } from "@/shared/components/forms/form";
import { RenderFields } from "@/shared/components/forms/render-fields";
import { FormSubmitStatusMessage } from "@/shared/components/forms/submit-status-message";
import type { FormSubmitStatus } from "@/shared/components/forms/types";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState<FormSubmitStatus>({
    status: "idle",
  });

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      service: undefined,
      budget: undefined,
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ConsultationFormValues) => {
    setSubmitState({ status: "idle" });

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
        message: "Failed to send inquiry. Please check your connection.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center rounded-[32px] border border-[#E8DFC8] bg-white p-8 text-center shadow-[0_20px_50px_rgba(40,25,10,0.04)]">
        <div className="flex size-16 items-center justify-center rounded-full border border-[#B58544]/40 bg-[#FAF6F0] text-[#B58544]">
          <CheckCircle2 size={32} strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-serif text-[28px] font-normal text-[#1A1816]">
          Inquiry Received
        </h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#6E675E]">
          Thank you for reaching out. Our principal designer will review your
          requirements and connect with you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#B58544] underline underline-offset-4 hover:text-[#9E7134]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-[32px] border border-[#E8DFC8] bg-white/90 p-7 shadow-[0_20px_50px_rgba(40,25,10,0.04)] backdrop-blur-md sm:p-10">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C59A58]/60 to-transparent" />

      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B58544]">
          Step into your vision
        </span>
        <h3 className="mt-1 font-serif text-[26px] font-normal text-[#1A1816] sm:text-[30px]">
          Share Your Project Details
        </h3>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <RenderFields fields={consultationFields} />

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
                <span className="relative">Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span className="relative">Schedule My Consultation</span>
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
        successMessage="Thank you for reaching out! Our designer will connect with you within 24 hours."
      />
    </div>
  );
}

export default ConsultationForm;
