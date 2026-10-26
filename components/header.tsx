"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV = [
  { name: "Hire staff", href: "#hire" },
  { name: "Find work", href: "#apply" },
  { name: "CV rewrite", href: "#cv" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        open ? "border-b border-line bg-paper" : scrolled ? "border-b border-line bg-paper/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" className="flex items-center gap-3" aria-label="On Call Network home" onClick={() => setOpen(false)}>
          <Image
            src="/ocn-icon.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
            priority
          />
          <span className="font-display text-[22px] leading-none tracking-tight">On Call Network</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.name} href={n.href.startsWith("#") ? `/${n.href}` : n.href} className="text-[14.5px] text-ink/75 transition-colors hover:text-ink">
              {n.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#contact?service=permanent" className="btn btn-solid hidden h-11 px-5 text-[14.5px] sm:inline-flex">
            Get a quote
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden">
          <nav className="wrap flex min-h-[calc(100vh-4rem)] flex-col pb-10 pt-6" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.name}
                href={n.href.startsWith("#") ? `/${n.href}` : n.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-[34px] leading-none tracking-tight"
              >
                {n.name}
              </Link>
            ))}
            <div className="mt-auto grid gap-3 pt-10">
              <Link href="/#contact?service=permanent" onClick={() => setOpen(false)} className="btn btn-solid">
                Get a quote
              </Link>
              <Link href="/#apply" onClick={() => setOpen(false)} className="btn btn-outline">
                Apply to work
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
