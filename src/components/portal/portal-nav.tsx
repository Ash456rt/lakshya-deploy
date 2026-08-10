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
                ? "bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
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
              ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30"
              : "text-neutral-400 hover:bg-white/5 hover:text-white"
          )}
        >
          Admin
        </Link>
      )}
    </nav>
  );
}
