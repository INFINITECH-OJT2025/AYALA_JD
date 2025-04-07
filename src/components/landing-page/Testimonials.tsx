import PublishedTestimonials from "../common/PublishedTestimonials";
import TestimonialModal from "../common/TestimonialModal";

const Testimonials = () => {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-2">
          How was your experience?
        </h2>

        <div className="mt-4 mb-4 text-center">
          <TestimonialModal />
        </div>
      </div>
      <PublishedTestimonials />
    </section>
  );
};

export default Testimonials;