"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
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

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false }
);

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type ServiceType =
  | "Permanent Placement (18% of annual salary)"
  | "Casual Introduction ($99 per intro)"
  | "Priority plan (enquire)"
  | "Venue partner (enquire)"
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
  consentAccepted: boolean;
};

const serviceOptions: ServiceType[] = [
  "Permanent Placement (18% of annual salary)",
  "Casual Introduction ($99 per intro)",
  "Priority plan (enquire)",
  "Venue partner (enquire)",
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

const initialFormData: FormData = {
  formType: "venue",
  serviceType: "Permanent Placement (18% of annual salary)",
  venueName: "",
  contactName: "",
  email: "",
  phone: "",
  suburb: "",
  positionsNeeded: "",
  immediateNeed: "",
  additionalNotes: "",
  consentAccepted: false,
};

function readServiceFromHash(): ServiceType | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  const query = hash.includes("?") ? hash.split("?")[1] : "";
  const params = new URLSearchParams(query);
  const service = params.get("service");
  if (service === "casual") return "Casual Introduction ($99 per intro)";
  if (service === "permanent")
    return "Permanent Placement (18% of annual salary)";
  return null;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState<number>(0);
  const [honeypot, setHoneypot] = useState<string>("");

  useEffect(() => {
    const pre = readServiceFromHash();
    if (pre) setFormData((prev) => ({ ...prev, serviceType: pre }));
    const onHashChange = () => {
      const next = readServiceFromHash();
      if (next) setFormData((prev) => ({ ...prev, serviceType: next }));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as FormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentAccepted) {
      setStatus("error");
      setErrorMessage(
        "Please accept the Privacy Policy and Terms and Conditions to submit."
      );
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/venue-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken, website: honeypot }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (response.ok && result?.success) {
        setStatus("success");
        setFormData(initialFormData);
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("ocn:conversion", {
              detail: {
                type:
                  formData.serviceType === "Casual Introduction ($99 per intro)"
                    ? "casual_intro_submitted"
                    : "role_brief_submitted",
                meta: { serviceType: formData.serviceType },
              },
            })
          );
        }
      } else {
        setStatus("error");
        setErrorMessage(result?.message || `Error ${response.status}`);
        setTurnstileKey((k) => k + 1);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form");
      setTurnstileKey((k) => k + 1);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-white scroll-mt-20">
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
              <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-[#faf9f6] rounded-2xl shadow-lg" noValidate>
                <label className="hidden" aria-hidden="true">
                  Leave this field empty
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
                <div className="mb-4">
                  <label htmlFor="serviceType" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Service *</label>
                  <select
                    id="serviceType"
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
                    <label htmlFor="venueName" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Venue Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="venueName" type="text" name="venueName" value={formData.venueName} onChange={handleChange} required placeholder="Your venue name" className="w-full h-[52px] text-base pl-11 pr-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="contactName" type="text" name="contactName" value={formData.contactName} onChange={handleChange} required placeholder="Your name" className="w-full h-[52px] text-base pl-11 pr-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@venue.com" className="w-full h-[52px] text-base pl-11 pr-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="0400 000 000" className="w-full h-[52px] text-base pl-11 pr-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="suburb" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Suburb</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="suburb" type="text" name="suburb" value={formData.suburb} onChange={handleChange} placeholder="E.g., Newtown" className="w-full h-[52px] text-base pl-11 pr-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="positionsNeeded" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Role Needed *</label>
                    <select id="positionsNeeded" name="positionsNeeded" value={formData.positionsNeeded} onChange={handleChange} required className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all bg-white text-gray-900">
                      <option value="">Select a role</option>
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Anything else we should know?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3} placeholder="Role details, shift patterns, team notes..." className="w-full text-base pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition-all resize-none bg-white text-gray-900" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentAccepted"
                      checked={formData.consentAccepted}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          consentAccepted: e.target.checked,
                        }))
                      }
                      required
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#d4a853] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      I have read and agree to the{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#1e3a5f] hover:text-[#d4a853]"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#1e3a5f] hover:text-[#d4a853]"
                      >
                        Terms and Conditions
                      </a>
                      .
                    </span>
                  </label>
                </div>

                {TURNSTILE_SITE_KEY ? (
                  <div className="mb-4 flex justify-center">
                    <Turnstile
                      key={turnstileKey}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token: string) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => setTurnstileToken("")}
                      options={{ theme: "light", size: "flexible" }}
                    />
                  </div>
                ) : null}

                {status === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2" role="alert" aria-live="polite">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{errorMessage || "Something went wrong. Please try again."}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    !formData.consentAccepted ||
                    (!!TURNSTILE_SITE_KEY && !turnstileToken)
                  }
                  className="w-full h-14 bg-[#1e3a5f] text-white font-bold text-lg rounded-lg hover:bg-[#2a4a6f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
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
