"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { a } from "react-intersection-observer";
import {
  Send, Building2, User, Mail, Phone, MessageSquare,
  CheckCircle, AlertCircle, Loader2, MapPin, Briefcase, Users
} from "lucide-react";

type ServiceType = "casual" | "permanent";

type FormData = {
  serviceType: ServiceType;
  venueName: string;
  contactName: string;
  email: string;
  phone: string;
  suburb: string;
  positionsNeeded: string;
  immediateNeed: string;
  additionalNotes: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    serviceType: "casual",
    venueName: "",
    contactName: "",
    email: "",
    phone: "",
    suburb: "",
    positionsNeeded: "",
    immediateNeed: "no",
    additionalNotes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target ?? {};
    if (name) setFormData((prev) => ({ ...prev, [name]: value } as FormData));
  };

  const handleServiceType = (type: ServiceType) => {
    setFormData((prev) => ({ ...prev, serviceType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/venue-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (response.ok && result?.success) {
        setStatus("success");
        setFormData({
          serviceType: "casual",
          venueName: "",
          contactName: "",
          email: "",
          phone: "",
          suburb: "",
          positionsNeeded: "",
          immediateNeed: "no",
          additionalNotes: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result?.message || `Error ${response.status}`);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form");
    }
  };

  const isCasual = formData.serviceType === "casual";

  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Info Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              Get in touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Let&apos;s solve your{" "}
              <span className="text-[#d4a853]">staffing problem</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you need reliable casual staff for this weekend or a permanent hire for your team —
              Diego handles it personally.
            </p>

            {/* Service highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">Casual Introductions</h3>
                  <p className="text-gray-600 text-sm">
                    Pre-screened professionals with a verified Reliability Score. $99/intro or $199/month unlimited.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">Permanent Placement</h3>
                  <p className="text-gray-600 text-sm">
                    Venue Managers, Head Chefs, Supervisors. Found in 10–14 days. 60-day replacement guarantee.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1e3a5f] rounded-xl text-white">
                <p className="font-semibold mb-1">Prefer a quick call?</p>
                <a
                  href="tel:+61XXXXXXXXX"
                  className="text-[#d4a853] text-xl font-bold hover:text-[#e8c77b] transition-colors"
                >
                  0XXX XXX XXX
                </a>
                <p className="text-white/60 text-sm mt-1">
                  Diego answers directly — 7 days, 8am–9pm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Diego responds personally within 2 hours on business days.
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-green-50 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Got it!</h3>
                  <p className="text-gray-600 mb-4">
                    Diego will be in touch within 2 hours to discuss your needs.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-[#1e3a5f] font-semibold hover:text-[#d4a853] transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-[#faf9f6] rounded-2xl shadow-lg">

                {/* Service Type Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-3">
                    What do you need?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleServiceType("casual")}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                        isCasual
                          ? "border-[#d4a853] bg-[#d4a853]/10 text-[#1e3a5f]"
                          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Users className="w-4 h-4 flex-shrink-0" />
                      Casual Staff
                    </button>
                    <button
                      type="button"
                      onClick={() => handleServiceType("permanent")}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                        !isCasual
                          ? "border-[#1e3a5f] bg-[#1e3a5f]/10 text-[#1e3a5f]"
                          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      Permanent Hire
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {isCasual
                      ? "Pre-screened casual professionals — $99/intro or $199/month"
                      : "Permanent placement — Chef, Manager, Supervisor. 10–14 day turnaround"}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Venue Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="venueName"
                        value={formData?.venueName ?? ""}
                        onChange={handleChange}
                        required
                        placeholder="Your venue name"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="contactName"
                        value={formData?.contactName ?? ""}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData?.email ?? ""}
                        onChange={handleChange}
                        required
                        placeholder="email@venue.com"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData?.phone ?? ""}
                        onChange={handleChange}
                        required
                        placeholder="0400 000 000"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Suburb
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="suburb"
                        value={formData?.suburb ?? ""}
                        onChange={handleChange}
                        placeholder="E.g., Newtown, Glebe, CBD"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      {isCasual ? "Roles Needed" : "Position to Fill"}
                    </label>
                    <input
                      type="text"
                      name="positionsNeeded"
                      value={formData?.positionsNeeded ?? ""}
                      onChange={handleChange}
                      placeholder={
                        isCasual ? "E.g., 2 bartenders, 1 waiter" : "E.g., Head Chef, Venue Manager"
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                    />
                  </div>
                </div>

                {isCasual && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      How urgent?
                    </label>
                    <select
                      name="immediateNeed"
                      value={formData?.immediateNeed ?? "no"}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                    >
                      <option value="no">Planning ahead — not urgent</option>
                      <option value="yes">Need staff this week</option>
                      <option value="today">Need someone today / ASAP</option>
                    </select>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                    Anything else we should know?
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="additionalNotes"
                      value={formData?.additionalNotes ?? ""}
                      onChange={handleChange}
                      rows={3}
                      placeholder={
                        isCasual
                          ? "E.g., Friday nights ongoing, need RSA, fast-paced bar..."
                          : "E.g., 60-seat restaurant, need someone who can lead a team..."
                      }
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all resize-none bg-white text-gray-900"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">
                      {errorMessage || "Something went wrong. Please try again."}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[#1e3a5f] text-white font-bold text-lg rounded-lg hover:bg-[#2a4a6f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {isCasual ? "Request Casual Staff" : "Enquire About Placement"}
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">
                  Diego responds personally within 2 hours on business days.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
