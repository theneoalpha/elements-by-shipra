import type { TColSpan } from "./types";

const COL_SPAN_MAP: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const RESPONSIVE_COL_SPAN_MAP: Record<number, Record<string, string>> = {
  1: { sm: "sm:col-span-1", md: "md:col-span-1", lg: "lg:col-span-1", xl: "xl:col-span-1" },
  2: { sm: "sm:col-span-2", md: "md:col-span-2", lg: "lg:col-span-2", xl: "xl:col-span-2" },
  3: { sm: "sm:col-span-3", md: "md:col-span-3", lg: "lg:col-span-3", xl: "xl:col-span-3" },
  4: { sm: "sm:col-span-4", md: "md:col-span-4", lg: "lg:col-span-4", xl: "xl:col-span-4" },
  5: { sm: "sm:col-span-5", md: "md:col-span-5", lg: "lg:col-span-5", xl: "xl:col-span-5" },
  6: { sm: "sm:col-span-6", md: "md:col-span-6", lg: "lg:col-span-6", xl: "xl:col-span-6" },
  7: { sm: "sm:col-span-7", md: "md:col-span-7", lg: "lg:col-span-7", xl: "xl:col-span-7" },
  8: { sm: "sm:col-span-8", md: "md:col-span-8", lg: "lg:col-span-8", xl: "xl:col-span-8" },
  9: { sm: "sm:col-span-9", md: "md:col-span-9", lg: "lg:col-span-9", xl: "xl:col-span-9" },
  10: { sm: "sm:col-span-10", md: "md:col-span-10", lg: "lg:col-span-10", xl: "xl:col-span-10" },
  11: { sm: "sm:col-span-11", md: "md:col-span-11", lg: "lg:col-span-11", xl: "xl:col-span-11" },
  12: { sm: "sm:col-span-12", md: "md:col-span-12", lg: "lg:col-span-12", xl: "xl:col-span-12" },
};

const BREAKPOINT_PREFIXES: Record<keyof TColSpan, string> = {
  xs: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
};

const BREAKPOINT_ORDER: (keyof TColSpan)[] = ["xs", "sm", "md", "lg", "xl"];

export function getResponsiveColSpan(size?: TColSpan, fallback = 12) {
  const base = size?.xs ?? fallback;
  const classes = [COL_SPAN_MAP[base] ?? `col-span-${base}`];

  for (const bp of BREAKPOINT_ORDER) {
    if (bp === "xs") continue;

    const span = size?.[bp];
    if (span) {
      classes.push(
        RESPONSIVE_COL_SPAN_MAP[span]?.[bp] ??
          `${BREAKPOINT_PREFIXES[bp]}col-span-${span}`,
      );
    }
  }

  return classes.join(" ");
}
