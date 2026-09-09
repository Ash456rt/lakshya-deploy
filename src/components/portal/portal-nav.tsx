"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/portal" },
  { name: "My Projects", href: "/portal/projects" },
  { name: "Request a Quote", href: "/portal/quote" },
];

export function PortalNav({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex lg:flex-col gap-2 overflow-x-auto">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/portal" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-blue-deep/20 text-accent ring-1 ring-brand-violet/30"
                : "text-stone-600 hover:bg-white hover:text-ink"
            )}
          >
            {item.name}
          </Link>
        );
      })}
      {isAdmin && (
        <Link
          href="/admin"
          className={cn(
            "whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/admin")
              ? "bg-brand-violet/20 text-accent ring-1 ring-brand-violet/30"
              : "text-stone-600 hover:bg-white hover:text-ink"
          )}
        >
          Admin
        </Link>
      )}
    </nav>
  );
}
