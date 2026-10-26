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
import CvTeaser from "@/components/cv-teaser";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <BenefitsVenues />
      <TrustSignals />
      <HowItWorksVenues />
      <Pricing />
      <Testimonials />
      <MeetTheFounder />
      <BenefitsWorkers />
      <HowItWorksWorkers />
      <WorkerCTA />
      <CandidateApply />
      <CvTeaser />
      <FAQ />
      <ContactForm />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
