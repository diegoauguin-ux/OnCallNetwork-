"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Award } from "lucide-react";
import Image from "next/image";

export default function WorkerCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const roles = [
    "Bartender",
    "Waiter/Waitress",
    "Kitchen Hand",
    "Chef",
    "Barista",
    "Floor Manager",
  ];

  const requirements = [
    "RSA Certificate (mandatory)",
    "2+ years hospitality experience",
    "Reliable & professional",
    "Inner West Sydney availability",
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1e3a5f] to-[#0f1e32]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-[#d4a853]" />
              <span className="text-[#d4a853] font-semibold">Now Accepting Applications</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join the Elite 8%?
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              We're looking for Sydney's best hospitality professionals. 
              Reliable workers who show up, deliver quality, and represent the industry well.
            </p>

            {/* Roles */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Roles We're Hiring:</h3>
              <div className="flex flex-wrap gap-2">
                {roles?.map((role, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 text-white rounded-full text-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Requirements:</h3>
              <ul className="space-y-2">
                {requirements?.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA - Worker Application */}
            <a
              href="#worker-apply"
              onClick={(e) => {
                e?.preventDefault?.();
                const email = "apply@oncallnetwork.com.au";
                const subject = encodeURIComponent("Worker Application - On Call Network");
                const body = encodeURIComponent("Hi Diego,\n\nI'd like to join On Call Network as a hospitality professional.\n\nName:\nPhone:\nRoles interested in:\nYears of experience:\nRSA Certificate: Yes/No\nAvailability:\n\nThanks!");
                window?.open?.(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a853] text-[#1e3a5f] font-bold text-lg rounded-lg hover:bg-[#e8c77b] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Apply Now via Email
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-white/60 text-sm mt-4">
              Screening process takes 7-10 days. Only serious professionals need apply.
            </p>
          </motion.div>

          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/17f7e900-b91c-42ec-a3cb-5269a19200be.png"
                alt="Premium Sydney hospitality venue"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent" />
              
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#1e3a5f]">Congratulations!</p>
                      <p className="text-sm text-gray-600">You're in the Elite 8%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#faf9f6] rounded-lg">
                    <span className="text-gray-600">Weekly potential</span>
                    <span className="text-xl font-bold text-[#d4a853]">$800-1,200</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
