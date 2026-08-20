"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About Us", href: "/about" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Stats", href: "#stats" },
  { name: "Academy", href: "/lakshya-deploy/index.html" },
  { name: "Travels", href: "/travels/index.html" },
  { name: "Contact", href: "#contact" },
  { name: "Client Portal", href: "/portal" },
];

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
    ? "text-lg font-medium text-neutral-900 dark:text-white"
    : "text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800"
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
            alt="Laksya Groups"
            width={1240}
            height={799}
            unoptimized
            className="h-12 w-auto object-contain"
          />
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) =>
            link.href === "/portal" ? (
              <PortalLink key={link.name} />
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.name}
              </motion.a>
            )
          )}
          <MagneticButton className="!px-6 !py-2 text-sm">
            Get Started
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
            className="w-6 h-0.5 bg-neutral-900 dark:bg-white"
            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-neutral-900 dark:bg-white"
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-neutral-900 dark:bg-white"
            animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            role="menu"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) =>
                link.href === "/portal" ? (
                  <PortalLink
                    key={link.name}
                    mobile
                    onClick={() => setIsMobileOpen(false)}
                  />
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-neutral-900 dark:text-white"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
              <MagneticButton className="!px-8 !py-3">Get Started</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
