import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustSignals from "@/components/trust-signals";
import BenefitsVenues from "@/components/benefits-venues";
import HowItWorksVenues from "@/components/how-it-works-venues";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import BenefitsWorkers from "@/components/benefits-workers";
import HowItWorksWorkers from "@/components/how-it-works-workers";
import WorkerCTA from "@/components/worker-cta";
import FAQ from "@/components/faq";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      <Hero />
      <TrustSignals />
      <BenefitsVenues />
      <HowItWorksVenues />
      <Pricing />
      <Testimonials />
      <section id="workers" className="scroll-mt-20">
        <BenefitsWorkers />
        <HowItWorksWorkers />
        <WorkerCTA />
      </section>
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
