"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock3,
  Building2,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

type CandidateApplyData = {
  formType: "candidate";
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  roleApplyingFor: string;
  yearsInAustralia: string;
  currentVenue: string;
  certifications: string[];
  availability: string;
  preferredZones: string[];
  employmentType: string[];
  briefIntro: string;
  legalConfirmation: boolean;
  termsAccepted: boolean;
};

const roleOptions = [
  "Venue Manager",
  "Bar Manager",
  "Head Chef",
  "Sous Chef",
  "FOH Manager",
  "BOH Manager",
  "Bartender",
  "Barista",
  "Chef",
  "Kitchen Hand",
  "Other",
];

const yearsOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const certificationOptions = [
  "RSA",
  "RCG",
  "Food Safety Supervisor",
  "First Aid",
  "None",
];

const availabilityOptions = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "1 month+",
];

const zoneOptions = [
  "Inner West",
  "CBD",
  "Eastern Suburbs",
  "North Shore",
  "Western Sydney",
  "Open to all Sydney",
];

const employmentTypeOptions = [
  "Permanent Full-Time",
  "Permanent Part-Time",
  "Casual/Flexible",
  "Open to offers",
];

const initialFormData: CandidateApplyData = {
  formType: "candidate",
  fullName: "",
  email: "",
  phone: "",
  suburb: "",
  roleApplyingFor: "",
  yearsInAustralia: "",
  currentVenue: "",
  certifications: [],
  availability: "",
  preferredZones: [],
  employmentType: [],
  briefIntro: "",
  legalConfirmation: false,
  termsAccepted: false,
};

export default function CandidateApply() {
  const [formData, setFormData] = useState<CandidateApplyData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const introRemaining = useMemo(
    () => 300 - formData.briefIntro.length,
    [formData.briefIntro.length]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked } as CandidateApplyData));
      return;
    }

    if (name === "briefIntro") {
      setFormData((prev) => ({ ...prev, briefIntro: value.slice(0, 300) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value } as CandidateApplyData));
  };

  const toggleMultiSelect = (
    key: "certifications" | "preferredZones" | "employmentType",
    value: string
  ) => {
    setFormData((prev) => {
      const current = prev[key];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
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
        setFormData(initialFormData);
      } else {
        setStatus("error");
        setErrorMessage(result?.message || `Error ${response.status}`);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    }
  };

  return (
    <section id="apply" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              For candidates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Apply to Join the OCN Talent Network
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Free forever. Diego reviews every application personally. Senior roles only - we work with Sydney&apos;s best venues.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-full text-center p-8 bg-green-50 rounded-2xl border border-green-200">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    ✅ Application received. Diego reviews every application personally and will contact you within 48 hours if there&apos;s a match for your profile.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-[#1e3a5f] font-semibold hover:text-[#d4a853] transition-colors"
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-[#faf9f6] rounded-2xl shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="04XX XXX XXX" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Suburb *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="suburb" value={formData.suburb} onChange={handleChange} required placeholder="E.g., Newtown" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Role Applying For *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select name="roleApplyingFor" value={formData.roleApplyingFor} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900">
                        <option value="">Select role</option>
                        {roleOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Years of Experience in Australia *</label>
                    <div className="relative">
                      <Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select name="yearsInAustralia" value={formData.yearsInAustralia} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900">
                        <option value="">Select experience range</option>
                        {yearsOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Current or Most Recent Venue *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="currentVenue" value={formData.currentVenue} onChange={handleChange} required placeholder="E.g., Venue name" className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">Certifications</label>
                  <div className="grid sm:grid-cols-2 gap-2 p-4 bg-white rounded-lg border border-gray-200">
                    {certificationOptions.map((option) => (
                      <label key={option} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={formData.certifications.includes(option)} onChange={() => toggleMultiSelect("certifications", option)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Availability *</label>
                  <select name="availability" value={formData.availability} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900">
                    <option value="">Select availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">Preferred Work Zones *</label>
                  <div className="grid sm:grid-cols-2 gap-2 p-4 bg-white rounded-lg border border-gray-200">
                    {zoneOptions.map((option) => (
                      <label key={option} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={formData.preferredZones.includes(option)} onChange={() => toggleMultiSelect("preferredZones", option)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">Employment Type Sought *</label>
                  <div className="grid sm:grid-cols-2 gap-2 p-4 bg-white rounded-lg border border-gray-200">
                    {employmentTypeOptions.map((option) => (
                      <label key={option} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={formData.employmentType.includes(option)} onChange={() => toggleMultiSelect("employmentType", option)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Brief intro *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea name="briefIntro" value={formData.briefIntro} onChange={handleChange} rows={3} maxLength={300} required placeholder="Your best venue, your specialty, and what makes you reliable." className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all resize-none bg-white text-gray-900" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{introRemaining} characters remaining</p>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" name="legalConfirmation" checked={formData.legalConfirmation} onChange={handleChange} required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853]" />
                    <span>I have the legal right to work in Australia and all information provided is accurate.</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853]" />
                    <span>I agree to the <a href="/terms-and-conditions" className="underline hover:text-[#1e3a5f]">Terms & Conditions</a> and Privacy Policy.</span>
                  </label>
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
                      Apply to OCN Network →
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
