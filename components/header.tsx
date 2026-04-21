"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "For Venues", href: "#contact", icon: Briefcase },
    { name: "For Candidates", href: "#apply", icon: Users },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1e3a5f]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/ocn-icon.png"
              alt="On Call Network icon"
              width={52}
              height={52}
              className="w-[52px] h-[52px] md:w-11 md:h-11 rounded-full object-cover bg-[#0b2340]"
              priority
            />
            <span className={`font-semibold text-lg hidden sm:block ${
              isScrolled ? "text-white" : "text-white"
            }`}>
              On Call Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems?.map((item) => (
              <Link
                key={item?.name}
                href={item?.href ?? "#"}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  isScrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item?.icon && <item.icon className="w-4 h-4" />}
                {item?.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/#contact?service=permanent"
              className="px-5 py-2.5 bg-[#d4a853] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#e8c77b] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit a Role Brief
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/#contact?service=permanent"
              className="h-12 px-4 inline-flex items-center justify-center bg-[#d4a853] text-[#1e3a5f] font-semibold rounded-lg text-sm"
            >
              Role Brief →
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-12 w-12 inline-flex items-center justify-center rounded-lg text-white hover:bg-white/10 border border-white/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 bg-[#1e3a5f] z-40"
          >
            <div className="px-4 py-4">
              {navItems?.map((item) => (
                <Link
                  key={item?.name}
                  href={item?.href ?? "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-14 flex items-center gap-3 px-1 text-white/90 hover:text-white border-b border-white/15 text-base font-medium"
                >
                  {item?.icon && <item.icon className="w-5 h-5" />}
                  {item?.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
