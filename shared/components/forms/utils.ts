import type { TColSpan } from "./types";

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
  const classes = [`col-span-${base}`];

  for (const bp of BREAKPOINT_ORDER) {
    if (bp === "xs") continue;

    const span = size?.[bp];
    if (span) classes.push(`${BREAKPOINT_PREFIXES[bp]}col-span-${span}`);
  }

  return classes.join(" ");
}
