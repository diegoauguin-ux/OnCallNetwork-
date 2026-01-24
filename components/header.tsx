"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Users, Briefcase } from "lucide-react";
import Link from "next/link";

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
    { name: "For Venues", href: "#venues", icon: Briefcase },
    { name: "For Workers", href: "#workers", icon: Users },
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
            <div className="w-10 h-10 rounded-lg bg-[#d4a853] flex items-center justify-center">
              <span className="text-[#1e3a5f] font-bold text-lg">OCN</span>
            </div>
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
              href="#contact"
              className="px-5 py-2.5 bg-[#d4a853] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#e8c77b] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Book Trial Shift
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1e3a5f] border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems?.map((item) => (
                <Link
                  key={item?.name}
                  href={item?.href ?? "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item?.icon && <item.icon className="w-5 h-5" />}
                  {item?.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 mt-4 bg-[#d4a853] text-[#1e3a5f] font-semibold rounded-lg text-center"
              >
                Book Trial Shift
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
