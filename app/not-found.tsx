import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Briefcase, Users, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist, but On Call Network might be what you're looking for.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F6F3EC]">
      <Header />
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow mb-6 block">
            404 &middot; Page not found
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#14342B] mb-4">
            This page doesn&rsquo;t exist, but we might.
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
            If you were looking for a role brief, candidate application, or
            pricing, use one of the links below.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/#contact"
              className="group h-full p-6 bg-white rounded-md  hover: transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-md bg-[#14342B]/10 flex items-center justify-center mb-3 group-hover:bg-[#14342B] transition-colors">
                <Briefcase className="w-6 h-6 text-[#14342B] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#14342B]">
                Submit a Role Brief
              </span>
            </Link>
            <Link
              href="/#apply"
              className="group h-full p-6 bg-white rounded-md  hover: transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-md bg-[#14342B]/10 flex items-center justify-center mb-3 group-hover:bg-[#14342B] transition-colors">
                <Users className="w-6 h-6 text-[#14342B] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#14342B]">
                Apply as a Candidate
              </span>
            </Link>
            <Link
              href="/#pricing"
              className="group h-full p-6 bg-white rounded-md  hover: transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-md bg-[#14342B]/10 flex items-center justify-center mb-3 group-hover:bg-[#14342B] transition-colors">
                <Tag className="w-6 h-6 text-[#14342B] group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-[#14342B]">See Pricing</span>
            </Link>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#14342B] font-medium underline hover:text-[#B9452D]"
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
