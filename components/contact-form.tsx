"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Building2, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle, Clock, Loader2, MapPin } from "lucide-react";

type FormData = {
  venueName: string;
  contactName: string;
  email: string;
  phone: string;
  venueType: string;
  location: string;
  immediateNeed: string;
  message: string;
};

export default function ContactForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    venueName: "",
    contactName: "",
    email: "",
    phone: "",
    venueType: "",
    location: "",
    immediateNeed: "no",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const venueTypes = [
    "Restaurant",
    "Bar/Pub",
    "Café",
    "Hotel",
    "Catering",
    "Events/Functions",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {};
    if (name) {
      setFormData((prev) => ({ ...(prev ?? {}), [name]: value }));
    }
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

      const result = await response?.json?.();

      if (result?.success) {
        setStatus("success");
        setFormData({
          venueName: "",
          contactName: "",
          email: "",
          phone: "",
          venueType: "",
          location: "",
          immediateNeed: "no",
          message: "",
        });
      } else {
        throw new Error(result?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error?.message : "Failed to submit form");
    }
  };

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
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Book Your <span className="text-[#d4a853]">50% Off</span> Trial Shift
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Give us ONE trial shift. If we don't show up or the worker doesn't meet your standards, 
              you don't pay. Zero risk.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">Limited Availability</h3>
                  <p className="text-gray-600 text-sm">Only 5 trial shifts available per week to maintain quality.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#d4a853]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">What Happens Next</h3>
                  <p className="text-gray-600 text-sm">
                    Diego will personally call you within 2 hours to discuss your needs and schedule your trial.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1e3a5f] rounded-xl text-white">
                <p className="font-semibold mb-2">Urgent? Call Diego directly:</p>
                <a 
                  href="tel:+61400000000" 
                  className="text-[#d4a853] text-xl font-bold hover:text-[#e8c77b] transition-colors"
                >
                  0400 000 000
                </a>
                <p className="text-white/70 text-sm mt-1">Available 7 days, 7am-10pm</p>
              </div>
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
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Request Received!</h3>
                  <p className="text-gray-600 mb-4">
                    Diego will call you within 2 hours to discuss your trial shift.
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
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Venue Name */}
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

                  {/* Contact Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Contact Name *
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
                  {/* Email */}
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

                  {/* Phone */}
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
                  {/* Venue Type */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Venue Type *
                    </label>
                    <select
                      name="venueType"
                      value={formData?.venueType ?? ""}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                    >
                      <option value="">Select type...</option>
                      {venueTypes?.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData?.location ?? ""}
                        onChange={handleChange}
                        placeholder="E.g., Inner West Sydney"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Immediate Need */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                      Immediate Need?
                    </label>
                    <select
                      name="immediateNeed"
                      value={formData?.immediateNeed ?? "no"}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                    >
                      <option value="no">No - Planning ahead</option>
                      <option value="yes">Yes - Need staff ASAP!</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                    Tell us about your staffing needs
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData?.message ?? ""}
                      onChange={handleChange}
                      rows={4}
                      placeholder="E.g., Need 2 bartenders for Friday nights, ongoing..."
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all resize-none bg-white text-gray-900"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{errorMessage || "Something went wrong. Please try again."}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[#1e3a5f] text-white font-bold text-lg rounded-lg hover:bg-[#2a4a6f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Request 50% Off Trial Shift
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Your information is secure and will only be used to contact you about your staffing needs.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
