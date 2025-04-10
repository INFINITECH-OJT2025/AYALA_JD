import { NonFeaturedNewsUpdates } from "@/components/common/NonFeaturedNewsUpdates";
import PublishedTestimonials from "@/components/common/PublishedTestimonials";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";
import { NewsUpdates } from "@/components/landing-page/NewsUpdates";

export default function Page() {
  return (
    <div>
      <>
        <Navbar />
        <div className="relative bg-gradient-to-r from-green-700 to-green-900 dark:from-gray-900 dark:to-gray-800 py-12 px-6 text-center shadow-lg overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src="/latest-news.jpg"
              alt="Latest News"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white mb-4 tracking-wide">
              Latest News
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed">
              Stay informed with our latest news and updates.
            </p>
          </div>
        </div>

        <NonFeaturedNewsUpdates />
        <hr className="border-t border-gray-300 dark:border-gray-700" />
        <Footer />
      </>
      {/* Other content */}
    </div>
  );
}
