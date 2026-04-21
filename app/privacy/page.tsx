import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How On Call Network collects, uses, and protects your personal information under the Australian Privacy Act 1988.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 April 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      <section className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-block text-sm text-[#1e3a5f] underline hover:text-[#d4a853] mb-6"
          >
            &larr; Back to home
          </Link>
          <article className="prose prose-slate max-w-none prose-headings:text-[#1e3a5f] prose-a:text-[#1e3a5f] prose-strong:text-[#1e3a5f]">
            <h1>Privacy Policy</h1>
            <p>
              <strong>Last updated: {LAST_UPDATED}</strong>
            </p>
            <p>
              On Call Network (&ldquo;OCN&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting
              your privacy and handling your personal information in accordance
              with the Privacy Act 1988 (Cth) and the Australian Privacy
              Principles (&ldquo;APPs&rdquo;). This Privacy Policy explains what
              personal information we collect, how we use it, who we share it
              with, and your rights.
            </p>

            <h2>1. Who we are</h2>
            <p>
              On Call Network is a Sydney-based hospitality recruitment and
              introduction service operating in New South Wales. Contact:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:hello@oncallnetwork.com.au">
                  hello@oncallnetwork.com.au
                </a>
              </li>
              <li>Phone: 0424 195 996</li>
              <li>Location: Inner West Sydney, NSW, Australia</li>
            </ul>

            <h2>2. What personal information we collect</h2>
            <p>
              <strong>
                From candidates applying to join our network
              </strong>
              , we collect: full name, email address, Australian mobile number,
              suburb, work experience, RSA certificate details, availability,
              right-to-work status, references (names and contact details of up
              to two previous employers), and any information voluntarily
              provided in your application.
            </p>
            <p>
              <strong>From venues submitting role briefs</strong>, we collect:
              venue name, contact person name, business email, phone number,
              suburb, role requirements, and any information voluntarily
              provided.
            </p>
            <p>
              <strong>Automatically</strong>, we collect limited technical
              information when you visit the site: IP address, browser type,
              device type, pages visited, and referral source. This is used for
              analytics and site improvement only.
            </p>

            <h2>3. How we collect it</h2>
            <p>
              We collect information directly from you through forms on
              oncallnetwork.com.au, email correspondence, phone calls, video
              interviews, and reference calls with your nominated referees
              (candidates only).
            </p>

            <h2>4. Why we collect it</h2>
            <ul>
              <li>
                To assess candidate suitability through our five-stage screening
                process.
              </li>
              <li>To match candidates with venues requiring staff.</li>
              <li>
                To communicate with you about applications, role briefs,
                introductions, and service updates.
              </li>
              <li>To operate and improve our services.</li>
              <li>To comply with our legal obligations.</li>
            </ul>

            <h2>5. Who we share it with</h2>
            <p>
              <strong>Candidate information</strong> is shared with venues to
              whom we introduce you, only after you have passed our screening
              and only to the extent necessary for the venue to make a hiring
              decision.
            </p>
            <p>
              <strong>
                We use the following third-party service providers
              </strong>{" "}
              who may process personal information on our behalf:
            </p>
            <ul>
              <li>
                <strong>Airtable, Inc.</strong> (United States) &mdash; CRM and
                form data storage.
              </li>
              <li>
                <strong>Vercel, Inc.</strong> (United States) &mdash; web
                hosting and analytics.
              </li>
              <li>
                <strong>Resend</strong> (United States) &mdash; transactional
                email delivery.
              </li>
              <li>
                <strong>Cloudflare, Inc.</strong> (United States) &mdash; email
                routing and DNS.
              </li>
            </ul>

            <h2>6. Cross-border disclosure</h2>
            <p>
              Some of the service providers listed above store or process
              information outside Australia, primarily in the United States.
              Where personal information is disclosed to overseas recipients,
              we take reasonable steps to ensure they handle your information
              consistently with the APPs. By submitting information through
              this site you consent to this overseas disclosure. If you do not
              consent, do not submit information through our online forms;
              contact us directly by email or phone instead.
            </p>

            <h2>7. Security</h2>
            <p>
              We store personal information on access-controlled cloud systems
              (Airtable, Vercel). Access is limited to the founder and any
              expressly authorised personnel. We use HTTPS encryption for data
              in transit. No method of electronic storage is 100% secure;
              however, we take reasonable steps to protect your information.
            </p>

            <h2>8. Data retention</h2>
            <ul>
              <li>
                Candidate applications that do not progress: retained for 12
                months from last contact, then deleted.
              </li>
              <li>
                Active network candidates: retained while you remain in the
                network and for 12 months after last activity.
              </li>
              <li>
                Venue role briefs and correspondence: retained for 7 years for
                tax and commercial records compliance.
              </li>
              <li>
                You may request earlier deletion (see section 10).
              </li>
            </ul>

            <h2>9. Cookies</h2>
            <p>
              We use essential cookies required for the site to function, and
              analytics cookies (Vercel Analytics, Microsoft Clarity where
              installed) to understand site usage. You can disable cookies in
              your browser settings. We do not sell cookie data to third
              parties.
            </p>

            <h2>10. Your rights</h2>
            <p>Under the APPs you have the right to:</p>
            <ul>
              <li>
                <strong>Access</strong> the personal information we hold about
                you (APP 12).
              </li>
              <li>
                <strong>Correct</strong> information that is inaccurate, out of
                date, incomplete, or misleading (APP 13).
              </li>
              <li>
                <strong>Request deletion</strong> of your information where we
                no longer need it for a lawful purpose.
              </li>
              <li>
                <strong>Withdraw consent</strong> to further processing at any
                time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:hello@oncallnetwork.com.au">
                hello@oncallnetwork.com.au
              </a>
              . We will respond within 30 days.
            </p>

            <h2>11. Complaints</h2>
            <p>
              If you believe we have breached the APPs or mishandled your
              information, contact us first at{" "}
              <a href="mailto:hello@oncallnetwork.com.au">
                hello@oncallnetwork.com.au
              </a>
              . We will acknowledge within 5 business days and aim to resolve
              within 30 days. If you are not satisfied with our response, you
              may complain to the Office of the Australian Information
              Commissioner (OAIC) at{" "}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.oaic.gov.au
              </a>{" "}
              or 1300 363 992.
            </p>

            <h2>12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &ldquo;last updated&rdquo; date at the top reflects the current
              version. Material changes will be communicated by email to
              registered candidates and venues.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
