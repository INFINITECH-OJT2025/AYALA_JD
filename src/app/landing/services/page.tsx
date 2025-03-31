import Services from "@/components/common/Services";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Services />

      <hr className="border-t border-gray-300 dark:border-gray-700" />

      <Footer />
    </>
  );
}
