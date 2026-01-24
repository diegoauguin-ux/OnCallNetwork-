"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Clock, Award, Users, CheckCircle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function TrustSignals() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const signals = [
    {
      icon: Shield,
      title: "97% Show-Up Rate",
      description: "vs 65% industry average. PhD behavioral screening ensures reliability.",
      highlight: true,
    },
    {
      icon: Clock,
      title: "<2 Hour Response",
      description: "Emergency staff delivered fast. Workers arrive 15 min early, ready to work.",
    },
    {
      icon: Award,
      title: "Elite 8% Accepted",
      description: "Only top hospitality professionals pass our rigorous screening process.",
    },
    {
      icon: Users,
      title: "Founder Direct Line",
      description: "Personal service from Diego. Not a call center. Real accountability.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Problem Statement */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            The <span className="text-[#d4a853]">$4,500</span> Problem Every Venue Owner Knows
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Staff call in sick at 5PM on a Friday. Revenue lost. Google reviews tank. 
            Team morale suffers. <strong>We solve that.</strong>
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals?.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl ${
                signal?.highlight
                  ? "bg-[#1e3a5f] text-white shadow-lg"
                  : "bg-[#faf9f6] hover:bg-white shadow-md"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  signal?.highlight ? "bg-[#d4a853]" : "bg-[#1e3a5f]/10"
                }`}
              >
                <signal.icon
                  className={`w-6 h-6 ${
                    signal?.highlight ? "text-[#1e3a5f]" : "text-[#1e3a5f]"
                  }`}
                />
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  signal?.highlight ? "text-white" : "text-[#1e3a5f]"
                }`}
              >
                {signal?.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  signal?.highlight ? "text-white/80" : "text-gray-600"
                }`}
              >
                {signal?.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-6 md:p-8 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Why Venues Switch to OCN</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Platform Services (Supp)", rate: 65, color: "bg-red-400" },
              { label: "Traditional Agencies", rate: 75, color: "bg-yellow-400" },
              { label: "On Call Network", rate: 97, color: "bg-[#d4a853]" },
            ]?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80 text-sm">{item?.label}</span>
                  <span className="text-white font-bold">{item?.rate}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item?.rate}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    className={`h-full rounded-full ${item?.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
