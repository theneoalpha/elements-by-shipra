"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-serif text-2xl font-normal text-[#1A1816]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-medium text-[#1A1816]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[13.5px] leading-relaxed text-[#6E675E]">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 text-[13.5px] leading-relaxed text-[#6E675E]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 text-[13.5px] leading-relaxed text-[#6E675E]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

interface RichTextProps {
  value: Array<Record<string, unknown>>;
}

export function RichText({ value }: RichTextProps) {
  return <PortableText value={value} components={components} />;
}
