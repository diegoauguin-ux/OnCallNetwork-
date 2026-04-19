"use client";
import { MapPin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = 2026;
  return (
    <footer className="bg-[#0f1e32] text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#d4a853] flex items-center justify-center">
                <span className="text-[#1e3a5f] font-bold text-lg">OCN</span>
              </div>
              <span className="font-semibold text-lg">On Call Network</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {"Sydney's hospitality staffing marketplace. Pre-screened professionals with a verified Reliability Score. Inner West, Eastern Suburbs, CBD, North Shore."}
            </p>
            <p className="text-[#d4a853] font-semibold text-sm">
              Connecting venues with reliable staff.
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
              &copy; {currentYear} On Call Network. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              On Call Network is a marketplace platform. All employment is directly between venue and candidate. OCN does not employ candidates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
