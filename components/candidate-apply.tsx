"use client";

import { useMemo, useRef, useState } from "react";
import { roleNeedsRsa } from "@/lib/candidate-roles";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  Check,
  ChevronDown,
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

export default function CandidateApply() {
  const [formData, setFormData] = useState<CandidateApplyData>(initialFormData);
  const [showMore, setShowMore] = useState(false);
  const startedRef = useRef(false);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState<number>(0);
  const [honeypot, setHoneypot] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [rsaCertificateFile, setRsaCertificateFile] = useState<File | null>(null);

  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const track = (type: string, meta?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("ocn:conversion", { detail: { type, meta } }));
  };

  const rsaRequired = roleNeedsRsa(formData.roleApplyingFor);
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

  const validate = (): boolean => {
    const nextErrors: ErrorMap = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = "Please enter a valid email address";
    if (!/^\+?[0-9][0-9\s()-]{7,17}$/.test(formData.phone.trim())) nextErrors.phone = "Please enter a valid mobile number (for example 04XX XXX XXX or +61 4XX XXX XXX)";
    if (!formData.roleApplyingFor) nextErrors.roleApplyingFor = "Please select a role";
    if (!formData.legalConfirmation) nextErrors.legalConfirmation = "Please confirm legal work rights and accuracy";
    if (!formData.termsAccepted) nextErrors.termsAccepted = "Please accept Terms & Conditions and Privacy Policy";
    if (formData.briefIntro.trim().length > 0 && formData.briefIntro.trim().length < 30) nextErrors.briefIntro = "If you add an intro, please write at least 30 characters";
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      if (firstInvalid === "briefIntro") setShowMore(true);
      track("apply_validation_error", { field: firstInvalid });
      scrollToField(firstInvalid);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      if (!cvFile) {
        setStatus("error");
        setErrorMessage("Please upload your CV (PDF or Word).");
        track("apply_validation_error", { field: "cvFile" });
        return;
      }
      if (roleNeedsRsa(formData.roleApplyingFor) && !rsaCertificateFile) {
        setStatus("error");
        setErrorMessage("Please upload your RSA certificate. In NSW it is required to serve alcohol.");
        track("apply_validation_error", { field: "rsaCertificateFile" });
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
      if (rsaCertificateFile) formPayload.append("rsaCertificateFile", rsaCertificateFile);

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
        track("apply_submit_error", { status: response.status, message: String(result.message ?? "").slice(0, 120) });
      }
    } catch {
      track("apply_submit_error", { status: 0, message: "network error" });
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email hello@oncallnetwork.com.au directly.");
      setTurnstileKey((k) => k + 1);
    }
  };

  return (
    <section id="apply" className="py-12 md:py-24 bg-white scroll-mt-20">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-6 block">
              For candidates
            </span>
            <h2 className="h-display h-section mb-5">
              Apply to the OCN Network
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Apply in about two minutes: name, contact, role and your CV.
              Diego reads every application personally and replies within 48
              hours if there is a likely match for your profile in Sydney.
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B9452D] mt-0.5 flex-shrink-0" /> Free to join, candidates never pay OCN.</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B9452D] mt-0.5 flex-shrink-0" /> You agree the rate directly with the venue.</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B9452D] mt-0.5 flex-shrink-0" /> No mandatory acceptance, no penalties for declining.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="p-6 md:p-8 bg-green-50 rounded-md border border-green-200 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#14342B] mb-2">Application received</h3>
                <p className="text-gray-700 mb-3">
                  Diego reviews every application personally and will be in
                  touch within 48 hours if there&apos;s a match for your
                  profile.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Check your inbox for a confirmation email.
                </p>
                <a href="#venues" className="text-[#14342B] font-semibold hover:text-[#B9452D]">Back to home &uarr;</a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocusCapture={() => {
                  if (!startedRef.current) {
                    startedRef.current = true;
                    track("apply_started");
                  }
                }}
                className="p-6 md:p-8 bg-[#F6F3EC] rounded-md overflow-hidden"
                noValidate
              >
                <label className="hidden" aria-hidden="true">
                  Leave this field empty
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#14342B]">Apply now</h3>

                  <div ref={setFieldRef("fullName")}>
                    <label htmlFor="apply-fullname" className="block text-sm font-medium text-[#14342B] mb-1.5">Full name *</label>
                    <input id="apply-fullname" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.fullName} onChange={(e)=>setValue("fullName", e.target.value)} placeholder="Your full name" autoCapitalize="words" autoComplete="name" />
                    {errors.fullName && <p className="text-[13px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div ref={setFieldRef("email")}>
                      <label htmlFor="apply-email" className="block text-sm font-medium text-[#14342B] mb-1.5">Email *</label>
                      <input id="apply-email" type="email" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.email} onChange={(e)=>setValue("email", e.target.value)} placeholder="your@email.com" inputMode="email" autoComplete="email" />
                      {errors.email && <p className="text-[13px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                    <div ref={setFieldRef("phone")}>
                      <label htmlFor="apply-phone" className="block text-sm font-medium text-[#14342B] mb-1.5">Mobile *</label>
                      <input id="apply-phone" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.phone} onChange={(e)=>setValue("phone", e.target.value)} placeholder="04XX XXX XXX or +61 4XX XXX XXX" inputMode="tel" autoComplete="tel" />
                      {errors.phone && <p className="text-[13px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div ref={setFieldRef("roleApplyingFor")}>
                    <label htmlFor="apply-role" className="block text-sm font-medium text-[#14342B] mb-1.5">Role you are applying for *</label>
                    <select id="apply-role" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.roleApplyingFor} onChange={(e)=>setValue("roleApplyingFor", e.target.value)}>
                      <option value="">Select role</option>
                      {roleOptions.map((o)=><option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.roleApplyingFor && <p className="text-[13px] text-red-600 mt-1">{errors.roleApplyingFor}</p>}
                  </div>

                  <div>
                    <label htmlFor="apply-cv" className="block text-sm font-medium text-[#14342B] mb-1.5">CV (PDF or Word) *</label>
                    <input
                      id="apply-cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                      className="w-full h-[52px] text-base px-3 py-2 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0 bg-white"
                    />
                    <p className="text-[13px] text-gray-500 mt-1">No CV yet? <a href="/cv" className="underline">Get an Australian CV in 24 hours</a>.</p>
                  </div>

                  <div>
                    <label htmlFor="apply-rsa-certificate" className="block text-sm font-medium text-[#14342B] mb-1.5">
                      RSA certificate (PDF or image) {rsaRequired ? "*" : "(optional)"}
                    </label>
                    <input
                      id="apply-rsa-certificate"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                      onChange={(e) => setRsaCertificateFile(e.target.files?.[0] ?? null)}
                      className="w-full h-[52px] text-base px-3 py-2 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0 bg-white"
                    />
                    <p className="text-[13px] text-gray-500 mt-1">
                      {rsaRequired
                        ? "Required for this role: in NSW you need a valid RSA to serve alcohol."
                        : "Not required for this role. Add it if you have one."}
                    </p>
                  </div>

                  <div className="border-t border-[#E2DDD1] pt-3">
                    <button
                      type="button"
                      aria-expanded={showMore}
                      onClick={() => {
                        setShowMore((v) => !v);
                        if (!showMore) track("apply_details_opened");
                      }}
                      className="flex w-full items-center justify-between py-2 text-left text-[15px] font-medium text-[#14342B]"
                    >
                      <span>Add more details <span className="font-normal text-gray-500">(optional, helps us match you faster)</span></span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${showMore ? "rotate-180" : ""}`} />
                    </button>

                    {showMore && (
                      <div className="space-y-4 pt-3">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div ref={setFieldRef("suburb")}>
                            <label htmlFor="apply-suburb" className="block text-sm font-medium text-[#14342B] mb-1.5">Suburb</label>
                            <input id="apply-suburb" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.suburb} onChange={(e)=>setValue("suburb", e.target.value)} placeholder="e.g. Newtown, Surry Hills" />
                          </div>
                          <div ref={setFieldRef("yearsInAustralia")}>
                            <label htmlFor="apply-years" className="block text-sm font-medium text-[#14342B] mb-1.5">Experience in Australia</label>
                            <select id="apply-years" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.yearsInAustralia} onChange={(e)=>setValue("yearsInAustralia", e.target.value)}>
                              <option value="">Select</option>
                              {yearsOptions.map((o)=><option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        </div>

                        <div ref={setFieldRef("currentVenue")}>
                          <label htmlFor="apply-venue" className="block text-sm font-medium text-[#14342B] mb-1.5">Current or most recent venue</label>
                          <input id="apply-venue" className="w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0" value={formData.currentVenue} onChange={(e)=>setValue("currentVenue", e.target.value)} placeholder="e.g. The Grounds of Alexandria" />
                        </div>

                        <div ref={setFieldRef("certifications")}>
                          <label className="block text-sm font-medium text-[#14342B] mb-1.5">Certifications held</label>
                          <div className="flex flex-wrap gap-2">
                            {certOptions.map((opt) => {
                              const active = formData.certifications.includes(opt);
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => toggleMultiChip("certifications", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#14342B] text-white border-[#14342B]" : "bg-white text-[#14342B] border-gray-300"}`}>{opt}</button>
                              );
                            })}
                          </div>
                        </div>

                        <div ref={setFieldRef("availability")}>
                          <label className="block text-sm font-medium text-[#14342B] mb-1.5">Availability</label>
                          <div className="flex flex-wrap gap-2">
                            {availabilityOptions.map((opt) => {
                              const active = formData.availability === opt;
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => setValue("availability", active ? "" : opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#14342B] text-white border-[#14342B]" : "bg-white text-[#14342B] border-gray-300"}`}>{opt}</button>
                              );
                            })}
                          </div>
                        </div>

                        <div ref={setFieldRef("preferredZones")}>
                          <label className="block text-sm font-medium text-[#14342B] mb-1.5">Preferred work zones</label>
                          <div className="flex flex-wrap gap-2">
                            {zoneOptions.map((opt) => {
                              const active = formData.preferredZones.includes(opt);
                              const disabled = formData.preferredZones.includes("Open to all Sydney") && opt !== "Open to all Sydney";
                              return (
                                <button key={opt} type="button" aria-pressed={active} disabled={disabled} onClick={() => toggleMultiChip("preferredZones", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#14342B] text-white border-[#14342B]" : "bg-white text-[#14342B] border-gray-300"} ${disabled ? "opacity-50" : ""}`}>{opt}</button>
                              );
                            })}
                          </div>
                        </div>

                        <div ref={setFieldRef("employmentType")}>
                          <label className="block text-sm font-medium text-[#14342B] mb-1.5">Employment type</label>
                          <div className="flex flex-wrap gap-2">
                            {employmentOptions.map((opt) => {
                              const active = formData.employmentType.includes(opt);
                              return (
                                <button key={opt} type="button" aria-pressed={active} onClick={() => toggleMultiChip("employmentType", opt)} className={`h-10 px-4 rounded-full border text-sm ${active ? "bg-[#14342B] text-white border-[#14342B]" : "bg-white text-[#14342B] border-gray-300"}`}>{opt}</button>
                              );
                            })}
                          </div>
                        </div>

                        <div ref={setFieldRef("briefIntro")}>
                          <label htmlFor="apply-intro" className="block text-sm font-medium text-[#14342B] mb-1.5">Short intro</label>
                          <textarea id="apply-intro" className="w-full min-h-[110px] text-base p-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0 resize-none" value={formData.briefIntro} onChange={(e)=>setValue("briefIntro", e.target.value.slice(0,300))} placeholder="Your best venue, your specialty, and what makes you reliable." />
                          <p className={`text-[13px] mt-1 ${introRemaining < 20 ? "text-red-600" : "text-gray-500"}`}>{introRemaining} characters remaining</p>
                          {errors.briefIntro && <p className="text-[13px] text-red-600 mt-1">{errors.briefIntro}</p>}
                        </div>
                      </div>
                    )}
                  </div>

                  <div ref={setFieldRef("legalConfirmation")} className="pt-2">
                    <button type="button" onClick={() => setValue("legalConfirmation", !formData.legalConfirmation)} className="w-full min-h-[48px] flex items-start gap-3 text-left">
                      <span className={`w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center ${formData.legalConfirmation ? "bg-[#14342B] border-[#14342B]" : "border-gray-400"}`}><Check className="w-4 h-4 text-white" /></span>
                      <span className="text-[15px] text-gray-700">I confirm I have the legal right to work in Australia and that all information provided is accurate.</span>
                    </button>
                    {errors.legalConfirmation && <p className="text-[13px] text-red-600 mt-1">{errors.legalConfirmation}</p>}
                  </div>

                  <div ref={setFieldRef("termsAccepted")}>
                    <button type="button" onClick={() => setValue("termsAccepted", !formData.termsAccepted)} className="w-full min-h-[48px] flex items-start gap-3 text-left">
                      <span className={`w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center ${formData.termsAccepted ? "bg-[#14342B] border-[#14342B]" : "border-gray-400"}`}><Check className="w-4 h-4 text-white" /></span>
                      <span className="text-[15px] text-gray-700">
                        I have read and agree to the{" "}
                        <a href="/terms-and-conditions" target="_blank" className="underline" rel="noopener noreferrer">Terms and Conditions</a>{" "}and{" "}
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

                  <button
                    type="submit"
                    disabled={status === "loading" || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                    className="w-full h-[56px] rounded-lg bg-[#B9452D] text-white font-semibold text-[17px] disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 hover:bg-[#9A3822] transition-colors"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Apply now
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2" role="alert">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{errorMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
