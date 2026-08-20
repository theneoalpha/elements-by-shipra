"use client";

import { ImagePlus, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImagePickerProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
}

export function ImagePicker({
  value,
  onChange,
  accept = "image/*",
  disabled,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      onChange?.(file);

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    },
    [onChange],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    },
    [onChange],
  );

  const displayPreview = preview ?? (value instanceof File ? null : null);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) inputRef.current?.click();
        }
      }}
      className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-[#C59A58]/60 hover:bg-[#FAF6F0]"
      } ${displayPreview ? "border-[#C59A58]/40" : "border-[#E8DFC8] bg-[#FAF8F5]"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {displayPreview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayPreview}
            alt="Preview"
            className="max-h-[160px] rounded-[10px] object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-[#1A1816]/70 text-white transition-colors hover:bg-[#1A1816]"
          >
            <X size={14} />
          </button>
        </>
      ) : (
        <>
          <ImagePlus size={24} className="text-[#B58544]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#A0988E]">
            Click to upload image
          </span>
        </>
      )}
    </div>
  );
}
