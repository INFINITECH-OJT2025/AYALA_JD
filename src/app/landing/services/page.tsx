import Services from "@/components/common/Services";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 dark:from-gray-900 dark:to-gray-800 py-12 px-6 text-center shadow-lg overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="/services.jpg"
            alt="Our Services"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-white mb-4 tracking-wide">
            Our Services
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed">
            Explore our top-quality real estate services designed to meet your
            needs.
          </p>
        </div>
      </div>

      <Services />

      <hr className="border-t border-gray-300 dark:border-gray-700" />

      <Footer />
    </>
  );
}
