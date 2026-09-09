"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/admin" },
  { name: "Quotes", href: "/admin/quotes" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Users", href: "/admin/users" },
  { name: "Messages", href: "/admin/messages" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex lg:flex-col gap-2 overflow-x-auto">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-violet/20 text-accent ring-1 ring-brand-violet/30"
                : "text-stone-600 hover:bg-white hover:text-ink"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
