import { Navbar } from "@/components/landing-page/Navbar";
import { LoanCalculator } from "@/components/landing-page/LoanCalculator";
import { Footer } from "@/components/landing-page/Footer";

function page() {
  return (
    <>
      <Navbar />
      <LoanCalculator />
      <Footer />
    </>
  );
}

export default page;
