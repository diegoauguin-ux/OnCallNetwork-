"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { DJ } from "@/lib/dj";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false }
);
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export const DJ_PACKAGE_EVENT = "dj:select-package";

type PackageValue = "essentials" | "signature" | "premium" | "not-sure";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  eventDate: string;
  venueAndSuburb: string;
  startTime: string;
  endTime: string;
  guests: string;
  venueHasSoundSystem: "Yes" | "No" | "Not sure";
  package: PackageValue;
  message: string;
  consentAccepted: boolean;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  eventType: "",
  eventDate: "",
  venueAndSuburb: "",
  startTime: "",
  endTime: "",
  guests: "",
  venueHasSoundSystem: "Not sure",
  package: "not-sure",
  message: "",
  consentAccepted: false,
};

const input =
  "w-full h-[52px] text-base px-4 rounded-lg border border-[#E2DDD1] focus:border-[#0E1512] focus:ring-0 outline-none transition-all bg-white text-gray-900";
const label = "block text-sm font-medium text-[#14342B] mb-1.5";

function todayInSydney() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Sydney" }).format(new Date());
}

function isPackage(v: string | null): v is Exclude<PackageValue, "not-sure"> {
  return v === "essentials" || v === "signature" || v === "premium";
}

export default function DjEnquiryForm({ sourcePage, defaultEventType }: { sourcePage: string; defaultEventType?: string }) {
  const [form, setForm] = useState<FormState>({ ...initial, eventType: defaultEventType ?? "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(todayInSydney());
    const fromQuery = new URLSearchParams(window.location.search).get("package");
    if (isPackage(fromQuery)) setForm((p) => ({ ...p, package: fromQuery }));
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (isPackage(id)) setForm((p) => ({ ...p, package: id }));
    };
    window.addEventListener(DJ_PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(DJ_PACKAGE_EVENT, onPick);
  }, []);

  const set =
    (name: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [name]: e.target.value }) as FormState);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consentAccepted) {
      setStatus("error");
      setErrorMessage("Please accept the Privacy Policy and Terms and Conditions to submit.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/dj-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: form.guests ? Number(form.guests) : undefined,
          sourcePage,
          turnstileToken,
          website: honeypot,
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && result.success) {
        setStatus("success");
        setForm({ ...initial, eventType: defaultEventType ?? "" });
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
        window.dispatchEvent(
          new CustomEvent("ocn:conversion", {
            detail: { type: "dj_quote_submitted", meta: { page: sourcePage } },
          })
        );
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again or email hello@oncallnetwork.com.au.");
        setTurnstileKey((k) => k + 1);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email hello@oncallnetwork.com.au.");
      setTurnstileKey((k) => k + 1);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md bg-green-50 p-8 text-center" role="status">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-600" />
        <h3 className="font-display text-[30px] tracking-tight text-[#14342B]">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-[44ch] text-gray-600">
          Thanks. We aim to send your written quote within one business day. A confirmation is on its way to your inbox.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-5 font-semibold text-[#14342B] hover:text-[#B9452D]">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-md bg-[#F6F3EC] p-6 md:p-8">
      <label className="hidden" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </label>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dj-name" className={label}>Your name *</label>
          <input id="dj-name" className={input} value={form.fullName} onChange={set("fullName")} required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="dj-company" className={label}>Company</label>
          <input id="dj-company" className={input} value={form.company} onChange={set("company")} autoComplete="organization" />
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dj-email" className={label}>Work email *</label>
          <input id="dj-email" type="email" className={input} value={form.email} onChange={set("email")} required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="dj-phone" className={label}>Phone</label>
          <input id="dj-phone" type="tel" className={input} value={form.phone} onChange={set("phone")} autoComplete="tel" />
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dj-type" className={label}>Event type *</label>
          <select id="dj-type" className={input} value={form.eventType} onChange={set("eventType")} required>
            <option value="">Select an event type</option>
            {DJ.eventTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dj-date" className={label}>Event date *</label>
          <input id="dj-date" type="date" className={input} value={form.eventDate} onChange={set("eventDate")} min={minDate || undefined} required />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dj-venue" className={label}>Venue and suburb *</label>
        <input id="dj-venue" className={input} value={form.venueAndSuburb} onChange={set("venueAndSuburb")} required placeholder="E.g. The Establishment, Sydney CBD" />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="dj-start" className={label}>Start time</label>
          <input id="dj-start" type="time" className={input} value={form.startTime} onChange={set("startTime")} />
        </div>
        <div>
          <label htmlFor="dj-end" className={label}>End time</label>
          <input id="dj-end" type="time" className={input} value={form.endTime} onChange={set("endTime")} />
        </div>
        <div>
          <label htmlFor="dj-guests" className={label}>Guests</label>
          <input id="dj-guests" type="number" inputMode="numeric" min={1} className={input} value={form.guests} onChange={set("guests")} />
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dj-sound" className={label}>Does the venue have a sound system?</label>
          <select id="dj-sound" className={input} value={form.venueHasSoundSystem} onChange={set("venueHasSoundSystem")}>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="dj-package" className={label}>Package</label>
          <select id="dj-package" className={input} value={form.package} onChange={set("package")}>
            <option value="not-sure">Not sure yet</option>
            {DJ.packages.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="dj-message" className={label}>Anything else we should know?</label>
        <textarea id="dj-message" rows={3} className="w-full resize-none rounded-lg border border-[#E2DDD1] bg-white px-4 py-3 text-base text-gray-900 outline-none transition-all focus:border-[#0E1512] focus:ring-0" value={form.message} onChange={set("message")} placeholder="Music style, speeches, access times, dress code..." />
      </div>

      <div className="mb-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consentAccepted}
            onChange={(e) => setForm((p) => ({ ...p, consentAccepted: e.target.checked }))}
            required
            className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-[#14342B] focus:ring-[#B9452D]"
          />
          <span className="text-sm leading-relaxed text-gray-700">
            I have read and agree to the{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#14342B] hover:text-[#B9452D]">Privacy Policy</a>{" "}
            and{" "}
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline text-[#14342B] hover:text-[#B9452D]">Terms and Conditions</a>.
          </span>
        </label>
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="mb-4 flex justify-center">
          <Turnstile
            key={turnstileKey}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(t: string) => setTurnstileToken(t)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
            options={{ theme: "light", size: "flexible" }}
          />
        </div>
      ) : null}

      {status === "error" && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3" role="alert" aria-live="polite">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <span className="text-sm text-red-700">{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !form.consentAccepted || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#14342B] text-lg font-bold text-white transition-all duration-300 hover:bg-[#1D4A3D] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Get a written quote
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[13px] text-gray-500">No obligation. Nothing is booked until you accept the written quote.</p>
    </form>
  );
}
