"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Building2,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Briefcase,
  Phone,
} from "lucide-react";

type ServiceType =
  | "Permanent Placement (15% of annual salary)"
  | "Casual Introduction ($99 per intro)"
  | "Priority Casual Access ($199/mo)"
  | "Venue Partner ($349/mo)"
  | "General Enquiry";

type RoleNeeded =
  | "Venue Manager"
  | "Bar Manager"
  | "Head Chef"
  | "Sous Chef"
  | "FOH Manager"
  | "BOH Manager"
  | "Bartender"
  | "Barista"
  | "Kitchen Hand"
  | "Multiple Roles"
  | "Other";

type FormData = {
  formType: "venue";
  serviceType: ServiceType;
  venueName: string;
  contactName: string;
  email: string;
  phone: string;
  suburb: string;
  positionsNeeded: RoleNeeded | "";
  immediateNeed: string;
  additionalNotes: string;
};

const serviceOptions: ServiceType[] = [
  "Permanent Placement (15% of annual salary)",
  "Casual Introduction ($99 per intro)",
  "Priority Casual Access ($199/mo)",
  "Venue Partner ($349/mo)",
  "General Enquiry",
];

const roleOptions: RoleNeeded[] = [
  "Venue Manager",
  "Bar Manager",
  "Head Chef",
  "Sous Chef",
  "FOH Manager",
  "BOH Manager",
  "Bartender",
  "Barista",
  "Kitchen Hand",
  "Multiple Roles",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    formType: "venue",
    serviceType: "Permanent Placement (15% of annual salary)",
    venueName: "",
    contactName: "",
    email: "",
    phone: "",
    suburb: "",
    positionsNeeded: "",
    immediateNeed: "",
    additionalNotes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as FormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          formType: "venue",
          serviceType: "Permanent Placement (15% of annual salary)",
          venueName: "",
          contactName: "",
          email: "",
          phone: "",
          suburb: "",
          positionsNeeded: "",
          immediateNeed: "",
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

  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              For venues
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Submit a Role Brief
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Tell us what you need. We respond within 2 hours on business days.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">Permanent placement</h3>
                  <p className="text-gray-600 text-sm">
                    Senior hospitality recruitment with founder-led screening and a 60-day guarantee.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#1e3a5f] rounded-xl text-white">
                <p className="font-semibold mb-2">Prefer email?</p>
                <a
                  href="mailto:hello@oncallnetwork.com.au"
                  className="inline-flex items-center gap-2 text-[#d4a853] text-lg font-bold hover:text-[#e8c77b] transition-colors break-all"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>hello@oncallnetwork.com.au</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Every enquiry is handled by the founder.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
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
                    Diego will be in touch within 2 hours on business days.
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Service *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Venue Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="venueName" value={formData.venueName} onChange={handleChange} required placeholder="Your venue name" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required placeholder="Your name" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@venue.com" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="0400 000 000" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Suburb</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="suburb" value={formData.suburb} onChange={handleChange} placeholder="E.g., Newtown" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Role Needed *</label>
                    <select name="positionsNeeded" value={formData.positionsNeeded} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900">
                      <option value="">Select a role</option>
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Anything else we should know?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3} placeholder="Role details, shift patterns, team notes..." className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all resize-none bg-white text-gray-900" />
                  </div>
                </div>

                {status === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{errorMessage || "Something went wrong. Please try again."}</span>
                  </div>
                )}

                <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-[#1e3a5f] text-white font-bold text-lg rounded-lg hover:bg-[#2a4a6f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit a Role Brief →
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
