"use client";

import { cn } from "@/shared/utils";

function ChipGroup({
  options,
  value,
  onChange,
  disabled,
  className,
}: {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-[12px] font-medium transition-all",
              isSelected
                ? "border border-[#1A1816] bg-[#1A1816] text-[#EAD8BD] shadow-sm"
                : "border border-[#E8DFC8] bg-[#FAF8F5] text-[#5A544D] hover:border-[#C59A58]/60 hover:text-[#1A1816]",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function BudgetChipGroup({
  options,
  value,
  onChange,
  disabled,
  className,
}: {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
            className={cn(
              "rounded-[12px] px-3 py-2.5 text-center text-[12px] font-medium transition-all",
              isSelected
                ? "border-[1.5px] border-[#B58544] bg-[#FAF6F0] font-semibold text-[#B58544]"
                : "border border-[#E8DFC8] bg-[#FAF8F5] text-[#6E675E] hover:border-[#C59A58]/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { BudgetChipGroup, ChipGroup };
