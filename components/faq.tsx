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
      answer:
        "You shouldn't \u2014 not blindly. That's exactly why we built a written no-show guarantee into every casual intro and a 60-day replacement guarantee into every permanent placement. If it doesn't work, you don't pay. Your risk on the first engagement is limited to time, not money. Judge us on what actually happens.",
    },
    {
      question: "How does the $99 Casual Introduction work?",
      answer:
        "You message Diego with the shift details (role, date, hours, rate). Diego proposes one pre-screened candidate from the network. You approve them. The $99 intro fee (ex GST) is invoiced after the candidate completes their first confirmed shift. If the candidate no-shows, the fee is fully refunded and Diego sources a replacement at no extra cost. You pay the candidate their hourly rate directly \u2014 OCN never takes a cut of their pay.",
    },
    {
      question: "What's included in the 18% permanent placement fee?",
      answer:
        "18% of the candidate's first-year gross annual salary (ex GST), payable on the candidate's start date on 14-day terms. The fee includes: intake brief with Diego, bespoke search, 3-person shortlist (typically within 5\u20137 days), full interview notes and reference checks, and a 60-day replacement guarantee. For the first three venues to sign each month, the fee is 15% under the Founding Venues programme.",
    },
    {
      question: "How do you screen candidates?",
      answer:
        "A documented 5-stage process, the same for every applicant. Stage 1: written application. Stage 2: 15-minute structured phone screen. Stage 3: 45-minute behavioural interview with Diego using a written framework and scoring rubric. Stage 4: two reference calls with the applicant's last two venue managers. Stage 5: only then do we introduce them to a venue. We'll share the interview framework with any venue that asks.",
    },
    {
      question: "How is this different from Sidekicker, Barcats or a labour-hire agency?",
      answer:
        "Sidekicker and similar labour-hire platforms employ the worker, add an hourly markup on every hour worked, and you pay them. Barcats is a public job board where anyone can post. OCN is neither: we're an introduction and recruitment service. You engage or employ the candidate directly, at a rate you agree with them, and pay them directly. We charge one flat introduction or placement fee per successful engagement \u2014 no hourly markup, no ongoing fees.",
    },
    {
      question: "How do I pay, and when?",
      answer:
        "Casual introductions: $99 (ex GST) invoiced after the candidate's first confirmed shift, 7-day terms. Permanent placements: 18% of first-year gross annual salary (ex GST), invoiced on the candidate's start date, 14-day terms. All invoices GST-inclusive where applicable. Bank transfer (preferred) or credit card.",
    },
    {
      question: "What happens if the candidate doesn't work out?",
      answer:
        "Casual: full refund + replacement if the candidate no-shows or leaves within the first two hours. Permanent: 60-day replacement guarantee \u2014 if the candidate resigns or is terminated for performance reasons in the first 60 days, Diego personally re-opens the search and delivers a replacement shortlist at no extra fee.",
    },
    {
      question: "What areas and roles do you cover?",
      answer:
        "Inner West, Eastern Suburbs, CBD and North Shore Sydney. Venue Managers, Bar Managers, Head Chefs, Sous Chefs, FOH/BOH Managers, Bartenders, Baristas, Chefs and Kitchen Hands. Hospitality only \u2014 we deliberately don't do other industries.",
    },
    {
      question: "How fast can you respond?",
      answer:
        "For urgent casual requests with less than 24 hours' notice, Diego replies within 2 business hours and attempts to introduce a candidate within the day. For planned casual requests, we confirm within 24 hours. For permanent searches, a 3-person shortlist typically lands within 5\u20137 days of intake.",
    },
    {
      question: "When will you publish real testimonials?",
      answer:
        "Once the first three venues have completed a placement and given signed consent to be quoted and named. We won't fabricate social proof, and we won't quote anyone without written permission. If you want to speak to an existing venue before engaging, ask Diego for a reference call.",
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
    <section id="faq" className="py-12 md:py-24 bg-[#faf9f6] scroll-mt-20">
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
                    className="w-full min-h-[48px] px-5 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[17px] font-bold text-[#1e3a5f] pr-4">{item?.question}</span>
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
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-[15px] leading-[1.6] text-gray-600">
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
                      className="w-full min-h-[48px] px-5 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[17px] font-bold text-[#1e3a5f] pr-4">{item?.question}</span>
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
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 text-[15px] leading-[1.6] text-gray-600">
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
