import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustSignals from "@/components/trust-signals";
import BenefitsVenues from "@/components/benefits-venues";
import HowItWorksVenues from "@/components/how-it-works-venues";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import MeetTheFounder from "@/components/meet-the-founder";
import BenefitsWorkers from "@/components/benefits-workers";
import HowItWorksWorkers from "@/components/how-it-works-workers";
import WorkerCTA from "@/components/worker-cta";
import CandidateApply from "@/components/candidate-apply";
import MobileStickyCTA from "@/components/mobile-sticky-cta";
import FAQ from "@/components/faq";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      <Hero />
      <TrustSignals />

      {/* Desktop only — too long for mobile */}
      <div className="hidden md:block">
        <BenefitsVenues />
      </div>

      <HowItWorksVenues />
      <Pricing />

      <Testimonials />
      <MeetTheFounder />

      <section id="workers" className="scroll-mt-20">
        {/* Desktop only */}
        <div className="hidden md:block">
          <BenefitsWorkers />
          <HowItWorksWorkers />
        </div>
        <WorkerCTA />
      </section>

      <CandidateApply />
      <FAQ />
      <ContactForm />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
