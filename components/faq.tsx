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
      question: "OCN is new. Why should I trust it?",
      answer: "You shouldn't — not blindly. That's exactly why we built a no-show guarantee into every agreement: if the candidate we introduce doesn't arrive, the fee is refunded and Diego personally sources a replacement. Your risk on the first introduction is limited to time, not money. Try us once, judge us on what actually happens.",
    },
    {
      question: "How do you screen candidates?",
      answer: "A documented 5-stage process, the same for every applicant. Stage 1: written application. Stage 2: 15-minute structured phone screen. Stage 3: 45-minute behavioural interview with Diego using a written framework and scoring rubric. Stage 4: two reference calls with the applicant's last two venue managers. Stage 5: only then do we introduce them to a venue. We'll share the interview framework with any venue that asks.",
    },
    {
      question: "What happens if the worker doesn't show up?",
      answer: "The introduction fee is refunded in full, and Diego personally sources a replacement at no extra cost. This is written into your agreement, not just a marketing promise. You never pay for a no-show.",
    },
    {
      question: "How is this different from Sidekicker or Barcats?",
      answer: "Sidekicker is a labour-hire agency — they employ the worker, add an hourly markup, and you pay them. Barcats is a public job board where anyone can post. OCN is neither: we're an introduction service. You hire the worker directly at a rate you agree with them, pay them directly, and we charge one flat introduction fee. No markup on hours worked.",
    },
    {
      question: "What areas and roles do you cover?",
      answer: "Inner West, Eastern Suburbs, CBD and North Shore Sydney. Bartenders, waitstaff, baristas, kitchen hands, chefs and floor managers. Hospitality only — we deliberately don't do other industries.",
    },
    {
      question: "How fast can you respond?",
      answer: "For urgent requests with less than 24 hours' notice, our commitment is a reply from Diego within 2 business hours and an introduction attempt within the day. For planned requests, we confirm within 24 hours. We won't promise arrival times we can't control — what arrives is whoever the candidate's own transport allows.",
    },
    {
      question: "Do you offer permanent placements?",
      answer: "Yes. For senior roles such as Head Chef, Sous Chef and Venue Manager we run a search-and-introduce service with a below-market flat fee and a 60-day replacement guarantee. Get in touch to discuss specifics.",
    },
  ];

  const workersFAQ = [
    {
      question: "How much do I get paid?",
      answer: "You agree your hourly rate directly with the venue, in line with the Hospitality Industry (General) Award as a minimum. OCN never takes a cut from your pay — the venue pays you in full, to you, under their payment terms. Weekend and public holiday loadings apply as per the Award.",
    },
    {
      question: "Do I have to accept every shift?",
      answer: "No. You accept only the offers that suit your diary. There is no mandatory acceptance, no minimum shifts and no penalty for saying no.",
    },
    {
      question: "What happens if I can't make a shift I accepted?",
      answer: "Life happens. Let us and the venue know with as much notice as possible — ideally 4+ hours. Repeated no-shows without reasonable notice will mean removal from the network, because the whole system depends on the word of the people in it.",
    },
    {
      question: "How selective is the screening?",
      answer: "We interview every applicant personally before introducing them to a venue, and we check two references from your last two venue managers. We're not trying to filter to a headline percentage — we're trying to make sure every person in the network is someone Diego would genuinely vouch for.",
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
