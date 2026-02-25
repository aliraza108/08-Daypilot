"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "border-b border-borderSubtle bg-[rgba(10,10,10,0.8)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-sm tracking-[0.22em] sm:text-base">
          DAYPILOT.
        </Link>
        <div className="hidden items-center gap-8 text-sm text-textSecondary md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-accentGreenDim"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
