"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const serviceOptions = [
  "Interior Design",
  "External Elevation",
  "Vastu Consultation",
  "Commercial Interiors",
  "Modular Furniture",
  "Complete Turnkey",
];

const budgetRanges = [
  "₹10L – ₹25L",
  "₹25L – ₹50L",
  "₹50L – ₹1Cr",
  "₹1Cr+",
];

export function ConsultationForm() {
  const [selectedService, setSelectedService] = useState<string>("Interior Design");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹25L – ₹50L");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          location,
          service: selectedService,
          budget: selectedBudget,
          message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send inquiry. Please check your connection.");
    } finally {
      setLoading(false);
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
          Thank you for reaching out. Our principal designer will review your requirements and connect with you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#B58544] underline underline-offset-4 hover:text-[#9E7134]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[32px] border border-[#E8DFC8] bg-white/90 p-7 shadow-[0_20px_50px_rgba(40,25,10,0.04)] backdrop-blur-md sm:p-10"
    >
      {/* Top Subtle Gold Accent Line */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C59A58]/60 to-transparent" />

      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#B58544]">
          Step into your vision
        </span>
        <h3 className="mt-1 font-serif text-[26px] font-normal text-[#1A1816] sm:text-[30px]">
          Share Your Project Details
        </h3>
        {error && (
          <p className="mt-3 text-[12px] font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </p>
        )}
      </div>

      {/* 1. Service Selection Chips */}
      <div className="mb-6">
        <label className="mb-3 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
          Select Service Required
        </label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const isSelected = selectedService === service;
            return (
              <button
                type="button"
                key={service}
                onClick={() => setSelectedService(service)}
                className={`rounded-full px-4 py-2 text-[12px] font-medium transition-all ${
                  isSelected
                    ? "border border-[#1A1816] bg-[#1A1816] text-[#EAD8BD] shadow-sm"
                    : "border border-[#E8DFC8] bg-[#FAF8F5] text-[#5A544D] hover:border-[#C59A58]/60 hover:text-[#1A1816]"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Text Input Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
            Your Full Name *
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vikram Verma"
            className="w-full rounded-[14px] border border-[#E8DFC8] bg-[#FAF8F5] px-4 py-3.5 text-[13.5px] text-[#1A1816] placeholder:text-[#A29A90] transition-colors focus:border-[#B58544] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
            Contact Number *
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 98765 43210"
            className="w-full rounded-[14px] border border-[#E8DFC8] bg-[#FAF8F5] px-4 py-3.5 text-[13.5px] text-[#1A1816] placeholder:text-[#A29A90] transition-colors focus:border-[#B58544] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. vikram@example.com"
            className="w-full rounded-[14px] border border-[#E8DFC8] bg-[#FAF8F5] px-4 py-3.5 text-[13.5px] text-[#1A1816] placeholder:text-[#A29A90] transition-colors focus:border-[#B58544] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
            Project City / Location *
          </label>
          <input
            required
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Bilaspur / Raipur"
            className="w-full rounded-[14px] border border-[#E8DFC8] bg-[#FAF8F5] px-4 py-3.5 text-[13.5px] text-[#1A1816] placeholder:text-[#A29A90] transition-colors focus:border-[#B58544] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Budget Range Selector */}
      <div className="mt-5">
        <label className="mb-2.5 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
          Estimated Budget
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {budgetRanges.map((range) => {
            const isSelected = selectedBudget === range;
            return (
              <button
                type="button"
                key={range}
                onClick={() => setSelectedBudget(range)}
                className={`rounded-[12px] px-3 py-2.5 text-center text-[12px] font-medium transition-all ${
                  isSelected
                    ? "border-[1.5px] border-[#B58544] bg-[#FAF6F0] font-semibold text-[#B58544]"
                    : "border border-[#E8DFC8] bg-[#FAF8F5] text-[#6E675E] hover:border-[#C59A58]/50"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Message Field */}
      <div className="mt-5">
        <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#4A453E]">
          Tell Us About Your Space (Optional)
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your space, timeline, and aesthetic preferences..."
          className="w-full resize-none rounded-[14px] border border-[#E8DFC8] bg-[#FAF8F5] px-4 py-3.5 text-[13.5px] text-[#1A1816] placeholder:text-[#A29A90] transition-colors focus:border-[#B58544] focus:bg-white focus:outline-none"
        />
      </div>

      {/* 5. Submit Button */}
    <div className="mt-8">
  <button
    type="submit"
    disabled={loading}
    className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1A1816] px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-[#EAD8BD] shadow-[0_10px_30px_rgba(26,24,22,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A2724] hover:shadow-[0_14px_35px_rgba(26,24,22,0.22)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
  >
    {/* Subtle hover shine */}
    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

    {loading ? (
      <>
        <span className="relative h-4 w-4 animate-spin rounded-full border border-[#EAD8BD]/30 border-t-[#EAD8BD]" />
        <span className="relative">Sending Inquiry...</span>
      </>
    ) : (
      <>
        <span className="relative">Schedule My Consultation</span>

        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#EAD8BD] text-[#1A1816] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight
            size={14}
            strokeWidth={2}
          />
        </span>
      </>
    )}
  </button>
</div>
    </form>
  );
}

export default ConsultationForm;