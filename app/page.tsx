import Header from "@/components/header";
import Hero from "@/components/hero";
import Hire from "@/components/hire";
import Vetting from "@/components/vetting";
import CvTeaser from "@/components/cv-teaser";
import CandidateApply from "@/components/candidate-apply";
import MeetTheFounder from "@/components/meet-the-founder";
import FAQ from "@/components/faq";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import MobileStickyCTA from "@/components/mobile-sticky-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <Hire />
      <Vetting />
      <CvTeaser />
      <CandidateApply />
      <MeetTheFounder />
      <FAQ />
      <ContactForm />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
