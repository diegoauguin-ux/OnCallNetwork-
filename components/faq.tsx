"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const venuesFAQ = [
    {
      question: "How fast can you really respond?",
      answer: "For EXPRESS bookings (<6 hours notice), we guarantee confirmation within 15 minutes and worker arrival within 2 hours. Our workers arrive 15 minutes early, uniformed, briefed on your venue, and ready to work. For PREMIUM and PLANNED bookings, we confirm same-day or within 24 hours respectively.",
    },
    {
      question: "What if the worker doesn't show up?",
      answer: "Our show-up rate is 97% (vs 65% industry average) thanks to our PhD behavioral screening. But if we ever fail to deliver, you don't pay. Period. We'll also attempt to find a replacement immediately at no additional charge.",
    },
    {
      question: "How do you screen your workers?",
      answer: "Every applicant goes through a rigorous screening process developed by our founder Diego, who holds a PhD in Psychology. We assess reliability, professionalism, and behavioral indicators. Only 8% of applicants make it into our network. All workers must have RSA certification and 2+ years experience.",
    },
    {
      question: "What areas do you cover?",
      answer: "We focus on Sydney's Inner West: Newtown, Enmore, Marrickville, Balmain, Leichhardt, Drummoyne, and surrounding suburbs. This geographic focus ensures fast response times and workers who know the local scene.",
    },
    {
      question: "What types of staff can you provide?",
      answer: "Bartenders, waiters/waitresses, kitchen hands, chefs (all levels), baristas, and floor managers. All our workers are experienced hospitality professionals, not students looking for casual work.",
    },
    {
      question: "Do you offer permanent placements?",
      answer: "Yes! We offer permanent placement services for senior roles (Head Chef, Sous Chef, Managers) at 20% of annual salary with a 90-day replacement guarantee. Contact us to discuss your hiring needs.",
    },
  ];

  const workersFAQ = [
    {
      question: "How much can I earn?",
      answer: "$32-40/hr base rate depending on role and notice period. Plus penalty rates: 125% Saturdays, 150% Sundays, 250% Public Holidays. Top workers earning $800-1,200/week with 3-4 shifts.",
    },
    {
      question: "Do I have to accept every shift offered?",
      answer: "No! Real flexibility means you choose. Accept only shifts that work for your schedule. No mandatory requirements or penalties for declining offers.",
    },
    {
      question: "What happens if I can't make a shift I accepted?",
      answer: "Life happens. Cancel with 4+ hours notice and it's fine. However, reliability is our core value—3 no-shows without valid reason means removal from the network.",
    },
    {
      question: "Why only 8% acceptance?",
      answer: "Our venues pay premium rates for premium reliability. We maintain high standards to protect both venue relationships and the reputation of workers in our network. Being in the 8% means venues trust and request you.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#faf9f6] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            <HelpCircle className="w-4 h-4 inline mr-1" />
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't see what you're looking for, reach out directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Venues FAQ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-sm">V</span>
              For Venues
            </h3>
            <div className="space-y-3">
              {venuesFAQ?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#1e3a5f] pr-4">{item?.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#d4a853] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                          {item?.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Workers FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#d4a853] text-[#1e3a5f] flex items-center justify-center text-sm font-bold">W</span>
              For Workers
            </h3>
            <div className="space-y-3">
              {workersFAQ?.map((item, index) => {
                const workerIndex = index + venuesFAQ?.length;
                return (
                  <div
                    key={workerIndex}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(workerIndex)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#1e3a5f] pr-4">{item?.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#d4a853] flex-shrink-0 transition-transform duration-300 ${
                          openIndex === workerIndex ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openIndex === workerIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                            {item?.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
