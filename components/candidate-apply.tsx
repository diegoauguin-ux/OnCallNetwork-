"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  Check,
  Loader2,
  Send,
} from "lucide-react";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false }
);

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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

type ErrorMap = Partial<Record<keyof CandidateApplyData, string>>;

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

const certOptions = ["RSA", "RCG", "Food Safety", "First Aid", "None"];
const availabilityOptions = ["Immediately", "Within 1 week", "Within 2 weeks", "1 month+"];
const zoneOptions = [
  "Inner West",
  "CBD",
  "Eastern Suburbs",
  "North Shore",
  "Western Sydney",
  "Open to all Sydney",
];
const employmentOptions = [
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

const stepLabels = ["About you", "Fit & consent"];

export default function CandidateApply() {
  const [formData, setFormData] = useState<CandidateApplyData>(initialFormData);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState<number>(0);
  const [honeypot, setHoneypot] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [rsaCertificateFile, setRsaCertificateFile] = useState<File | null>(null);

  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const introRemaining = useMemo(() => 300 - formData.briefIntro.length, [formData.briefIntro.length]);

  const setFieldRef = (name: string) => (el: HTMLDivElement | null) => {
    fieldRefs.current[name] = el;
  };

  const scrollToField = (name: string) => {
    fieldRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const setValue = <K extends keyof CandidateApplyData>(key: K, value: CandidateApplyData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleMultiChip = (key: "certifications" | "preferredZones" | "employmentType", value: string) => {
    const current = formData[key];

    if (key === "certifications" && value === "None") {
      setValue("certifications", current.includes("None") ? [] : ["None"]);
      return;
    }

    if (key === "certifications" && current.includes("None")) {
      const withoutNone = current.filter((x) => x !== "None");
      const next = withoutNone.includes(value)
        ? withoutNone.filter((x) => x !== value)
        : [...withoutNone, value];
      setValue("certifications", next);
      return;
    }

    if (key === "preferredZones" && value === "Open to all Sydney") {
      const next = current.includes("Open to all Sydney") ? [] : ["Open to all Sydney", ...zoneOptions.filter((z) => z !== "Open to all Sydney")];
      setValue("preferredZones", next);
      return;
    }

    if (key === "preferredZones" && formData.preferredZones.includes("Open to all Sydney")) {
      const base = formData.preferredZones.filter((z) => z !== "Open to all Sydney");
      const next = base.includes(value) ? base.filter((z) => z !== value) : [...base, value];
      setValue("preferredZones", next);
      return;
    }

    const next = current.includes(value)
      ? current.filter((x) => x !== value)
      : [...current, value];
    setValue(key, next as CandidateApplyData[typeof key]);
  };

  const validateStep = (targetStep: number): boolean => {
    const nextErrors: ErrorMap = {};

    if (targetStep === 1) {
      if (!formData.fullName.trim()) nextErrors.fullName = "Please enter your full name";
      if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = "Please enter a valid email address";
      if (!/^04\d{2}\s?\d{3}\s?\d{3}$/.test(formData.phone.trim())) nextErrors.phone = "Please enter a valid Australian mobile number";
      if (!formData.suburb.trim()) nextErrors.suburb = "Please enter your suburb";
      if (!formData.roleApplyingFor) nextErrors.roleApplyingFor = "Please select a role";
      if (!formData.yearsInAustralia) nextErrors.yearsInAustralia = "Please select your experience range";
      if (!formData.currentVenue.trim()) nextErrors.currentVenue = "Please enter your most recent venue";
      if (formData.certifications.length < 1) nextErrors.certifications = "Please tell us which certifications you hold (choose None if you don't have any)";
    }

    if (targetStep === 2) {
      if (!formData.availability) nextErrors.availability = "Please select your availability";
      if (formData.preferredZones.length < 1) nextErrors.preferredZones = "Please select at least one work zone";
      if (formData.employmentType.length < 1) nextErrors.employmentType = "Please select at least one employment type";
      if (formData.briefIntro.trim().length < 30) nextErrors.briefIntro = "Please write a brief intro (minimum 30 characters)";
      if (!formData.legalConfirmation) nextErrors.legalConfirmation = "Please confirm legal work rights and accuracy";
      if (!formData.termsAccepted) nextErrors.termsAccepted = "Please accept Terms & Conditions and Privacy Policy";
    }

    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      scrollToField(firstInvalid);
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(2, s + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      if (!cvFile || !rsaCertificateFile) {
        setStatus("error");
        setErrorMessage("Please upload both your CV and RSA Certificate.");
        return;
      }

      const formPayload = new FormData();
      formPayload.append("formType", formData.formType);
      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("suburb", formData.suburb);
      formPayload.append("roleApplyingFor", formData.roleApplyingFor);
      formPayload.append("yearsInAustralia", formData.yearsInAustralia);
      formPayload.append("currentVenue", formData.currentVenue);
      formPayload.append("certifications", JSON.stringify(formData.certifications));
      formPayload.append("availability", formData.availability);
      formPayload.append("preferredZones", JSON.stringify(formData.preferredZones));
      formPayload.append("employmentType", JSON.stringify(formData.employmentType));
      formPayload.append("briefIntro", formData.briefIntro);
      formPayload.append("legalConfirmation", String(formData.legalConfirmation));
      formPayload.append("termsAccepted", String(formData.termsAccepted));
      formPayload.append("turnstileToken", turnstileToken);
      formPayload.append("website", honeypot);
      formPayload.append("cvFile", cvFile);
      formPayload.append("rsaCertificateFile", rsaCertificateFile);

      const response = await fetch("/api/venue-contact", {
        method: "POST",
        body: formPayload,
      });

      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (response.ok && result.success) {
        setStatus("success");
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
        setCvFile(null);
        setRsaCertificateFile(null);
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("ocn:conversion", {
              detail: {
                type: "candidate_application_submitted",
                meta: { role: formData.roleApplyingFor },
              },
            })
          );
        }
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again or email hello@oncallnetwork.com.au directly.");
        setTurnstileKey((k) => k + 1);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email hello@oncallnetwork.com.au directly.");
      setTurnstileKey((k) => k + 1);
    }
  };

  const progress = (step / 2) * 100;

  return (
    <section id="apply" className="py-12 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              For candidates
            </span>
            <h2 className="text-[26px] md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Apply to the OCN Network
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Two short steps. Diego reads every application personally and
              replies within 48 hours if there is a likely match for your
              profile in Sydney.
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a853] mt-0.5 flex-shrink-0" /> Free to join &mdash; candidates never pay OCN.</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a853] mt-0.5 flex-shrink-0" /> You agree the rate directly with the venue.</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a853] mt-0.5 flex-shrink-0" /> No mandatory acceptance, no penalties for declining.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="p-6 md:p-8 bg-green-50 rounded-2xl border border-green-200 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Application received</h3>
                <p className="text-gray-700 mb-3">
                  Diego reviews every application personally and will be in
                  touch within 48 hours if there&apos;s a match for your
                  profile.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Check your inbox for a confirmation email.
                </p>
                <a href="#venues" className="text-[#1e3a5f] font-semibold hover:text-[#d4a853]">Back to home &uarr;</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-[#faf9f6] rounded-2xl shadow-lg overflow-hidden" noValidate>
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

                <div className="mb-6">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e3a5f] transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Step {step} of 2 &middot; {stepLabels[step - 1]}
                  </p>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#1e3a5f]">About you</h3>

                        <div ref={setFieldRef("fullName")}>
                          <label htmlFor="apply-fullname" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Full name *</label>
                          <input id="apply-fullname" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.fullName} onChange={(e)=>setValue("fullName", e.target.value)} placeholder="Your full name" autoCapitalize="words" />
                          {errors.fullName && <p className="text-[13px] text-red-600 mt-1">{errors.fullName}</p>}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div ref={setFieldRef("email")}>
                            <label htmlFor="apply-email" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Email *</label>
                            <input id="apply-email" type="email" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.email} onChange={(e)=>setValue("email", e.target.value)} placeholder="your@email.com" inputMode="email" />
                            {errors.email && <p className="text-[13px] text-red-600 mt-1">{errors.email}</p>}
                          </div>

                          <div ref={setFieldRef("phone")}>
                            <label htmlFor="apply-phone" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Phone *</label>
                            <input id="apply-phone" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.phone} onChange={(e)=>setValue("phone", e.target.value)} placeholder="04XX XXX XXX" inputMode="tel" />
                            {errors.phone && <p className="text-[13px] text-red-600 mt-1">{errors.phone}</p>}
                          </div>
                        </div>

                        <div ref={setFieldRef("suburb")}>
                          <label htmlFor="apply-suburb" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Suburb *</label>
                          <input id="apply-suburb" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.suburb} onChange={(e)=>setValue("suburb", e.target.value)} placeholder="e.g. Newtown, Surry Hills" />
                          {errors.suburb && <p className="text-[13px] text-red-600 mt-1">{errors.suburb}</p>}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div ref={setFieldRef("roleApplyingFor")}>
                            <label htmlFor="apply-role" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Role *</label>
                            <select id="apply-role" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.roleApplyingFor} onChange={(e)=>setValue("roleApplyingFor", e.target.value)}>
                              <option value="">Select role</option>
                              {roleOptions.map((o)=><option key={o} value={o}>{o}</option>)}
                            </select>
                            {errors.roleApplyingFor && <p className="text-[13px] text-red-600 mt-1">{errors.roleApplyingFor}</p>}
                          </div>

                          <div ref={setFieldRef("yearsInAustralia")}>
                            <label htmlFor="apply-years" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Experience in Australia *</label>
                            <select id="apply-years" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.yearsInAustralia} onChange={(e)=>setValue("yearsInAustralia", e.target.value)}>
                              <option value="">Select</option>
                              {yearsOptions.map((o)=><option key={o} value={o}>{o}</option>)}
                            </select>
                            {errors.yearsInAustralia && <p className="text-[13px] text-red-600 mt-1">{errors.yearsInAustralia}</p>}
                          </div>
                        </div>

                        <div ref={setFieldRef("currentVenue")}>
                          <label htmlFor="apply-venue" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Current or most recent venue *</label>
                          <input id="apply-venue" className="w-full h-[52px] text-base px-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20" value={formData.currentVenue} onChange={(e)=>setValue("currentVenue", e.target.value)} placeholder="e.g. The Grounds of Alexandria" />
                          {errors.currentVenue && <p className="text-[13px] text-red-600 mt-1">{errors.currentVenue}</p>}
                        </div>

                        <div ref={setFieldRef("certifications")}>
                          <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Certifications held *</label>
                          <div className="flex flex-wrap gap-2">
                            {certOptions.map((opt) => {
                              const active = formData.certifications.includes(opt);
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => toggleMultiChip("certifications", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-white text-[#1e3a5f] border-gray-300"}`}>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {errors.certifications && <p className="text-[13px] text-red-600 mt-1">{errors.certifications}</p>}
                        </div>

                        <button type="button" onClick={goNext} className="w-full h-[52px] rounded-lg bg-[#1e3a5f] text-white font-semibold">
                          Next &mdash; Fit &amp; Consent &rarr;
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#1e3a5f]">Fit &amp; consent</h3>

                        <div ref={setFieldRef("availability")}>
                          <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Availability *</label>
                          <div className="flex flex-wrap gap-2">
                            {availabilityOptions.map((opt) => {
                              const active = formData.availability === opt;
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => setValue("availability", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-white text-[#1e3a5f] border-gray-300"}`}>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {errors.availability && <p className="text-[13px] text-red-600 mt-1">{errors.availability}</p>}
                        </div>

                        <div ref={setFieldRef("preferredZones")}>
                          <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Preferred work zones *</label>
                          <div className="flex flex-wrap gap-2">
                            {zoneOptions.map((opt) => {
                              const active = formData.preferredZones.includes(opt);
                              const disabled = formData.preferredZones.includes("Open to all Sydney") && opt !== "Open to all Sydney";
                              return (
                                <button key={opt} type="button" aria-pressed={active} disabled={disabled} onClick={() => toggleMultiChip("preferredZones", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-white text-[#1e3a5f] border-gray-300"} ${disabled ? "opacity-50" : ""}`}>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {errors.preferredZones && <p className="text-[13px] text-red-600 mt-1">{errors.preferredZones}</p>}
                        </div>

                        <div ref={setFieldRef("employmentType")}>
                          <label className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Employment type *</label>
                          <div className="flex flex-wrap gap-2">
                            {employmentOptions.map((opt) => {
                              const active = formData.employmentType.includes(opt);
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => toggleMultiChip("employmentType", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-white text-[#1e3a5f] border-gray-300"}`}>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {errors.employmentType && <p className="text-[13px] text-red-600 mt-1">{errors.employmentType}</p>}
                        </div>

                        <div ref={setFieldRef("briefIntro")}>
                          <label htmlFor="apply-intro" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">Short intro *</label>
                          <textarea id="apply-intro" className="w-full min-h-[120px] text-base p-4 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 resize-none" value={formData.briefIntro} onChange={(e)=>setValue("briefIntro", e.target.value.slice(0,300))} placeholder="Your best venue, your specialty, and what makes you reliable." />
                          <p className={`text-[13px] mt-1 ${introRemaining < 20 ? "text-red-600" : "text-gray-500"}`}>{introRemaining} characters remaining</p>
                          {errors.briefIntro && <p className="text-[13px] text-red-600 mt-1">{errors.briefIntro}</p>}
                        </div>

                        <div>
                          <label htmlFor="apply-cv" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                            CV (PDF or Word) *
                          </label>
                          <input
                            id="apply-cv"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                            className="w-full h-[52px] text-base px-3 py-2 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 bg-white"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="apply-rsa-certificate" className="block text-sm font-medium text-[#1e3a5f] mb-1.5">
                            RSA Certificate (PDF or image) *
                          </label>
                          <input
                            id="apply-rsa-certificate"
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                            onChange={(e) => setRsaCertificateFile(e.target.files?.[0] ?? null)}
                            className="w-full h-[52px] text-base px-3 py-2 rounded-lg border border-gray-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 bg-white"
                            required
                          />
                        </div>

                        <div ref={setFieldRef("legalConfirmation")} className="pt-2">
                          <button type="button" onClick={() => setValue("legalConfirmation", !formData.legalConfirmation)} className="w-full min-h-[48px] flex items-start gap-3 text-left">
                            <span className={`w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center ${formData.legalConfirmation ? "bg-[#1e3a5f] border-[#1e3a5f]" : "border-gray-400"}`}><Check className="w-4 h-4 text-white" /></span>
                            <span className="text-[15px] text-gray-700">I confirm I have the legal right to work in Australia and that all information provided is accurate.</span>
                          </button>
                          {errors.legalConfirmation && <p className="text-[13px] text-red-600 mt-1">{errors.legalConfirmation}</p>}
                        </div>

                        <div ref={setFieldRef("termsAccepted")}>
                          <button type="button" onClick={() => setValue("termsAccepted", !formData.termsAccepted)} className="w-full min-h-[48px] flex items-start gap-3 text-left">
                            <span className={`w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center ${formData.termsAccepted ? "bg-[#1e3a5f] border-[#1e3a5f]" : "border-gray-400"}`}><Check className="w-4 h-4 text-white" /></span>
                            <span className="text-[15px] text-gray-700">
                              I have read and agree to the {" "}
                              <a href="/terms-and-conditions" target="_blank" className="underline" rel="noopener noreferrer">Terms and Conditions</a>
                              {" "}and{" "}
                              <a href="/privacy" target="_blank" className="underline" rel="noopener noreferrer">Privacy Policy</a>.
                            </span>
                          </button>
                          {errors.termsAccepted && <p className="text-[13px] text-red-600 mt-1">{errors.termsAccepted}</p>}
                        </div>

                        {TURNSTILE_SITE_KEY ? (
                          <div className="pt-1 flex justify-center">
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

                        <div className="flex items-center gap-3 pt-2">
                          <button type="button" onClick={goBack} className="h-[52px] px-5 rounded-lg border border-[#1e3a5f]/30 text-[#1e3a5f] font-medium">
                            &larr; Back
                          </button>
                          <button
                            type="submit"
                            disabled={
                              status === "loading" ||
                              (!!TURNSTILE_SITE_KEY && !turnstileToken)
                            }
                            className="flex-1 h-[52px] rounded-lg bg-[#1e3a5f] text-white font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                          >
                            {status === "loading" ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                Apply to the Network
                              </>
                            )}
                          </button>
                        </div>

                        {status === "error" && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span className="text-red-700 text-sm">{errorMessage}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
