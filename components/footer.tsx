"use client";
import { MapPin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = 2026;
  return (
    <footer className="bg-[#0f1e32] text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/ocn-icon.png"
                alt="On Call Network icon"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover bg-[#0b2340]"
                loading="lazy"
              />
              <span className="font-semibold text-lg">On Call Network</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              A founder-led hospitality staff introduction service for Sydney venues. Every candidate is personally interviewed and reference-checked before they&rsquo;re introduced to a venue.
            </p>
            <p className="text-[#d4a853] font-semibold text-sm">
              Inner West &middot; Eastern Suburbs &middot; CBD &middot; North Shore
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@oncallnetwork.com.au"
                className="flex items-center gap-3 text-white/70 hover:text-[#d4a853] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@oncallnetwork.com.au</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Inner West Sydney, NSW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="#venues" className="block text-white/70 hover:text-[#d4a853] transition-colors py-0.5">
                For Venues
              </Link>
              <Link href="#workers" className="block text-white/70 hover:text-[#d4a853] transition-colors py-0.5">
                For Workers
              </Link>
              <Link href="#pricing" className="block text-white/70 hover:text-[#d4a853] transition-colors py-0.5">
                Pricing
              </Link>
              <Link href="#contact" className="block text-white/70 hover:text-[#d4a853] transition-colors py-0.5">
                Contact
              </Link>
              <Link href="/terms-and-conditions" className="block text-white/70 hover:text-[#d4a853] transition-colors py-0.5">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              <span className="md:hidden">
                OCN is a marketplace. Employment is directly between venue and candidate.
              </span>
              <span className="hidden md:inline">
                On Call Network is a marketplace platform connecting hospitality venues with pre-screened candidates. All employment relationships are formed directly between the venue and the candidate. OCN does not employ, supervise, or pay candidates.
              </span>
            </p>
            <p className="text-white/50 text-sm">
              &copy; {currentYear} On Call Network. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
