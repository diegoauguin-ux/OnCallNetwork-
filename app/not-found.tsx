import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Briefcase, Users, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist — but On Call Network might be what you're looking for.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-6">
            404 &middot; Page not found
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            This page doesn&rsquo;t exist &mdash; but we might.
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
            If you were looking for a role brief, candidate application, or
            pricing, use one of the links below.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/#contact"
              className="group h-full p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-3 group-hover:bg-[#1e3a5f] transition-colors">
                <Briefcase className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#1e3a5f]">
                Submit a Role Brief
              </span>
            </Link>
            <Link
              href="/#apply"
              className="group h-full p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-3 group-hover:bg-[#1e3a5f] transition-colors">
                <Users className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#1e3a5f]">
                Apply as a Candidate
              </span>
            </Link>
            <Link
              href="/#pricing"
              className="group h-full p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-3 group-hover:bg-[#1e3a5f] transition-colors">
                <Tag className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#1e3a5f]">See Pricing</span>
            </Link>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium underline hover:text-[#d4a853]"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
