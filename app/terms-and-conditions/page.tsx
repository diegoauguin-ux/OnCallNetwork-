import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms governing use of On Call Network's hospitality recruitment and introduction services in New South Wales.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 April 2026";

export default function TermsAndConditionsPage() {
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
            <h1>Terms and Conditions</h1>
            <p>
              <strong>Last updated: {LAST_UPDATED}</strong>
            </p>
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use
              of services provided by On Call Network (&ldquo;OCN&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By
              engaging our services or submitting a role brief or application,
              you agree to be bound by these Terms.
            </p>

            <h2>1. Definitions</h2>
            <ul>
              <li>
                <strong>&ldquo;Candidate&rdquo;</strong> means a hospitality
                professional who has applied to join the OCN network.
              </li>
              <li>
                <strong>&ldquo;Venue&rdquo;</strong> means a hospitality
                business that engages OCN to receive candidate introductions.
              </li>
              <li>
                <strong>&ldquo;Introduction&rdquo;</strong> means the act of
                OCN presenting a screened Candidate to a Venue.
              </li>
              <li>
                <strong>&ldquo;Placement&rdquo;</strong> means a Candidate who
                is engaged by a Venue on a permanent basis following an
                Introduction.
              </li>
              <li>
                <strong>&ldquo;Casual Engagement&rdquo;</strong> means a shift
                or short-term engagement between a Venue and a Candidate
                following a $99 Introduction.
              </li>
              <li>
                <strong>&ldquo;Services&rdquo;</strong> means the recruitment,
                screening, and introduction services described on
                oncallnetwork.com.au.
              </li>
            </ul>

            <h2>2. Nature of our services &mdash; marketplace only</h2>
            <p>
              OCN is a hospitality{" "}
              <strong>introduction service and marketplace</strong>. We do NOT
              employ Candidates. We do NOT supply labour. We introduce screened
              Candidates to Venues. All employment, engagement, payment,
              supervision, work health and safety, superannuation, taxation,
              and workplace compliance obligations rest with the Venue, who
              becomes the employer or engager of the Candidate.
            </p>

            <h2>3. Services provided</h2>
            <h3>3.1 Permanent Placement</h3>
            <ul>
              <li>
                OCN sources, screens, and introduces up to three shortlisted
                Candidates for a senior hospitality role within 5&ndash;7
                business days of role brief approval.
              </li>
              <li>
                Screening consists of: written application, structured phone
                screen, 45-minute behavioural interview conducted by the OCN
                founder, and two reference checks.
              </li>
              <li>
                The Venue retains full discretion to hire, interview further,
                or reject any Candidate.
              </li>
            </ul>

            <h3>3.2 Casual Introduction</h3>
            <ul>
              <li>
                OCN introduces a screened Candidate suited to a short-term or
                shift-based engagement.
              </li>
              <li>
                The Venue engages the Candidate directly under the Hospitality
                Industry (General) Award 2020 or applicable industrial
                instrument and pays the Candidate directly.
              </li>
              <li>
                OCN is not party to the engagement between Venue and Candidate
                and takes no margin from the Candidate&rsquo;s wage.
              </li>
            </ul>

            <h2>4. Fees and payment</h2>
            <h3>4.1 Permanent Placement Fee</h3>
            <ul>
              <li>
                <strong>
                  Standard fee: 18% of Candidate&rsquo;s gross annual salary.
                </strong>
              </li>
              <li>
                <strong>Founding Venues discount: 15%</strong> &mdash;
                available to the first three Venues to sign a permanent
                engagement with OCN in any calendar month, at OCN&rsquo;s
                discretion.
              </li>
              <li>
                The fee is payable only upon the Candidate accepting and
                commencing employment with the Venue.
              </li>
              <li>
                Invoice issued on the Candidate&rsquo;s start date. Payment
                terms: 14 days from invoice date.
              </li>
            </ul>

            <h3>4.2 Casual Introduction Fee</h3>
            <ul>
              <li>
                <strong>$99 per Candidate Introduction</strong>, invoiced on
                the day of the first confirmed shift.
              </li>
              <li>
                The fee is payable regardless of whether the Candidate
                continues beyond the first shift.
              </li>
            </ul>

            <h3>4.3 GST</h3>
            <p>
              All fees stated on the website and in these Terms are{" "}
              <strong>GST-exclusive</strong>. GST will be added to invoices
              where applicable under Australian taxation law.
            </p>

            <h2>5. Replacement Guarantee (Permanent Placements only)</h2>
            <p>
              If a Candidate placed by OCN resigns or is terminated for cause
              within <strong>60 days</strong> of their commencement date, OCN
              will source one replacement Candidate at no additional fee,
              subject to the following conditions:
            </p>
            <ul>
              <li>The Venue has paid the original placement fee in full.</li>
              <li>
                The reason for separation is not attributable to a material
                breach by the Venue of workplace laws, the employment contract,
                or the Hospitality Industry (General) Award 2020.
              </li>
              <li>
                The Venue notifies OCN in writing within 7 days of the
                Candidate&rsquo;s last day.
              </li>
              <li>
                The replacement search commences within 14 days of notification
                and concludes when OCN presents three new shortlisted
                Candidates.
              </li>
            </ul>

            <h2>6. No-Show Guarantee (Casual Introductions only)</h2>
            <p>
              If a Candidate fails to attend a confirmed shift without prior
              notice of at least 4 hours:
            </p>
            <ul>
              <li>
                The $99 Introduction Fee is refunded in full within 7 business
                days.
              </li>
              <li>
                OCN will personally source a replacement Candidate at no
                additional fee for the same or equivalent shift, subject to
                Candidate availability in the network.
              </li>
              <li>
                This guarantee does not apply where the Venue cancels or
                changes the shift details with less than 12 hours&rsquo; notice
                to the Candidate.
              </li>
            </ul>

            <h2>7. Venue obligations</h2>
            <p>The Venue warrants and undertakes to:</p>
            <ul>
              <li>
                Pay the Candidate directly at or above the minimum rates
                required by the Hospitality Industry (General) Award 2020 (or
                successor instrument).
              </li>
              <li>
                Comply with all workplace laws including Fair Work Act 2009
                (Cth), Work Health and Safety Act 2011 (NSW), and
                superannuation obligations.
              </li>
              <li>
                Provide a safe workplace and all necessary induction and
                training.
              </li>
              <li>Pay OCN fees in accordance with clause 4.</li>
              <li>
                Not circumvent OCN by directly engaging Candidates introduced
                by OCN without paying the applicable fee, for a period of 12
                months from the date of Introduction.
              </li>
            </ul>

            <h2>8. Candidate obligations</h2>
            <p>Candidates warrant and undertake to:</p>
            <ul>
              <li>
                Provide accurate information in their application and
                interviews.
              </li>
              <li>
                Hold a current RSA certificate where required by the role.
              </li>
              <li>Hold a legal right to work in Australia.</li>
              <li>
                Attend confirmed shifts or provide reasonable notice of
                inability to attend.
              </li>
              <li>
                Conduct themselves professionally in any Venue to which they
                are introduced.
              </li>
            </ul>

            <h2>9. Limitation of liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul>
              <li>
                OCN&rsquo;s total liability to a Venue or Candidate in
                connection with the Services is capped at the amount of fees
                paid by the Venue in the preceding 12 months, or AU$1,000,
                whichever is lower.
              </li>
              <li>
                OCN is not liable for any indirect, consequential, or special
                loss, including loss of revenue, profit, reputation, or
                business opportunity.
              </li>
              <li>
                OCN does not warrant any specific outcome of an Introduction or
                Placement beyond the guarantees expressly set out in clauses 5
                and 6.
              </li>
            </ul>
            <p>
              Nothing in these Terms excludes or limits any non-excludable
              consumer guarantees under the Australian Consumer Law.
            </p>

            <h2>10. Indemnity</h2>
            <p>
              The Venue indemnifies OCN against any claim, loss, damage, or
              expense arising from:
            </p>
            <ul>
              <li>
                The Venue&rsquo;s engagement, supervision, termination, or
                treatment of a Candidate.
              </li>
              <li>
                The Venue&rsquo;s breach of workplace laws or the Hospitality
                Industry (General) Award 2020.
              </li>
              <li>
                Any act or omission of a Candidate during their engagement with
                the Venue.
              </li>
            </ul>

            <h2>11. Intellectual property</h2>
            <p>
              All content on oncallnetwork.com.au, including the &ldquo;OCN
              Behavioural Profile&rdquo; screening framework, is owned by On
              Call Network. No licence or right to use is granted except as
              expressly stated.
            </p>

            <h2>12. Termination</h2>
            <p>
              Either party may terminate the engagement for convenience on 14
              days&rsquo; written notice. Fees accrued to the date of
              termination remain payable. Clauses 5, 6, 7.5, 9, 10, and 13
              survive termination.
            </p>

            <h2>13. Governing law and jurisdiction</h2>
            <p>
              These Terms are governed by the laws of New South Wales,
              Australia. The parties submit to the exclusive jurisdiction of
              the courts of New South Wales. Disputes must first be attempted
              to be resolved by good-faith negotiation for 14 days, failing
              which the parties agree to mediation administered by the
              Resolution Institute before commencing proceedings.
            </p>

            <h2>14. Changes</h2>
            <p>
              OCN may update these Terms on 30 days&rsquo; written notice.
              Continued use of the Services after the effective date
              constitutes acceptance.
            </p>

            <h2>15. Contact</h2>
            <p>
              <a href="mailto:hello@oncallnetwork.com.au">
                hello@oncallnetwork.com.au
              </a>{" "}
              &middot; 0493 906 632
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
