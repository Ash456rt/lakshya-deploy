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
                ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
