
import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { FeaturedProperties } from "@/components/landing-page/Features";
import { WhyChooseUs } from "@/components/landing-page/Whychooseus";
import { LoanCalculator } from "@/components/landing-page/LoanCalculator";
import { Services } from "@/components/landing-page/Services";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { Careers } from "@/components/landing-page/Careers";
import { NewsUpdates } from "@/components/landing-page/NewsUpdates";
import { ContactForm } from "@/components/landing-page/ContactForm";
import { MobileAppDownload } from "@/components/landing-page/MobileAppDownload";
import { Footer } from "@/components/landing-page/Footer";

function page() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <FeaturedProperties/>
      {/* <LoanCalculator/> */}
      <WhyChooseUs/>
      <Services/>
      {/* <Testimonials/> */}
      <Careers/>
      <NewsUpdates/>
      <ContactForm/>
      <MobileAppDownload/>
      <Footer/>
    </>
  );
}

export default page;
