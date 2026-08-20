"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { createClient } from "@/lib/supabase/client";

type NavItem = { name: string; href: string };
type NavGroup = { name: string; items: NavItem[] };

const navigation: (NavItem | NavGroup)[] = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  {
    name: "Company",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Stats", href: "#stats" },
    ],
  },
  {
    name: "Platforms",
    items: [
      { name: "Lakshya Academy", href: "/lakshya-deploy/index.html" },
      { name: "Lakshya Travels", href: "/travels/index.html" },
    ],
  },
  { name: "Contact", href: "#contact" },
];

function isGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}

// Shows "My Portal" when signed in, "Client Portal" otherwise.
// Admins additionally get an "Admin" link in the navbar.
function PortalLink({
  mobile,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      const client = createClient();
      client.auth
        .getUser()
        .then(async ({ data }) => {
          if (!mounted) return;
          setIsSignedIn(Boolean(data.user));
          if (data.user) {
            const { data: profile } = await client
              .from("profiles")
              .select("is_admin")
              .eq("id", data.user.id)
              .maybeSingle();
            if (mounted) setIsAdmin(Boolean(profile?.is_admin));
          }
        })
        .catch(() => {});
    } catch {
      // Supabase not configured yet — keep the default labels.
    }
    return () => {
      mounted = false;
    };
  }, []);

  const linkClasses = mobile
    ? "text-lg font-medium text-white"
    : "text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors";

  return (
    <>
      <a href="/portal" onClick={onClick} className={linkClasses}>
        {isSignedIn ? "My Portal" : "Client Portal"}
      </a>
      {isAdmin && (
        <a href="/admin" onClick={onClick} className={linkClasses}>
          Admin
        </a>
      )}
    </>
  );
}

function Dropdown({
  group,
  onItemClick,
}: {
  group: NavGroup;
  onItemClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.name}
        <svg
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-48 py-2 bg-neutral-900/95 backdrop-blur-xl border border-white/[0.06] rounded-xl shadow-xl"
          >
            {group.items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        <motion.a
          href="#home"
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Image
            src="/laksya-logo.png"
            alt="Lakshya Groups"
            width={1240}
            height={799}
            unoptimized
            className="h-12 w-auto object-contain"
          />
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navigation.map((item) =>
            isGroup(item) ? (
              <Dropdown key={item.name} group={item} />
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {item.name}
              </a>
            )
          )}
          <PortalLink />
          <MagneticButton className="!px-6 !py-2 text-sm">
            Get a Free Consultation
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            className="w-6 h-0.5 bg-white"
            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white"
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white"
            animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-white/[0.06]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            role="menu"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navigation.map((item) =>
                isGroup(item) ? (
                  <div key={item.name} className="flex flex-col items-center gap-2">
                    <button
                      className="flex items-center gap-1 text-lg font-medium text-white"
                      onClick={() =>
                        setMobileOpenGroup(
                          mobileOpenGroup === item.name ? null : item.name
                        )
                      }
                    >
                      {item.name}
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform",
                          mobileOpenGroup === item.name && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileOpenGroup === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col items-center gap-2 overflow-hidden"
                        >
                          {item.items.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="text-base text-zinc-400 hover:text-white transition-colors"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              {sub.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-white"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}
              <PortalLink
                mobile
                onClick={() => setIsMobileOpen(false)}
              />
              <MagneticButton className="!px-8 !py-3">Get a Free Consultation</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
