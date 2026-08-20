"use client";

import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_PHONE } from "@/features/whatsapp/constants";

export function WhatsAppButton({ message }: { message?: string }) {
  const text = message || WHATSAPP_DEFAULT_MESSAGE;
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="size-7"
        aria-hidden
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.118-1.97A15.906 15.906 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.316 22.59c-.39 1.1-1.932 2.014-3.164 2.28-.84.18-1.936.324-5.626-1.206-4.724-1.952-7.764-6.744-7.996-7.056-.226-.312-1.856-2.474-1.856-4.72 0-2.244 1.176-3.348 1.596-3.814.39-.44.946-.546 1.26-.546.31 0 .62.002.89.016.284.014.664-.106 1.036.79.39.938 1.326 3.23 1.442 3.466.116.236.194.51.038.822-.156.312-.234.506-.466.78-.234.276-.486.618-.696.828-.234.234-.478.488-.204.958.274.47 1.216 2.008 2.61 3.252 1.792 1.6 3.302 2.098 3.772 2.33.47.234.744.194 1.018-.118.274-.312 1.168-1.36 1.482-1.83.312-.47.624-.39 1.056-.234.434.156 2.744 1.292 3.214 1.528.47.236.784.354.898.55.116.196.116 1.138-.272 2.238Z" />
      </svg>
    </a>
  );
}
