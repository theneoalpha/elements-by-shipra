"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/site";

export function DesktopNav() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label="Main"
      className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-9"
    >
      {mainNav.map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group relative py-2 text-[16px] font-medium transition-colors duration-300 ${
              active ? "text-[#c99655]" : "text-white/95 hover:text-[#c99655]"
            }`}
          >
            {item.label}

            {/* Active underline */}
            <span
              aria-hidden
              className={`absolute bottom-[-3px] left-0 h-[1px] bg-[#c99655] transition-all duration-300 ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
