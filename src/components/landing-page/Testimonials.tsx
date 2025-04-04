import TestimonialModal from "../common/TestimonialModal";

const Testimonials = () => {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          How was your experience?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Can you share it with us?
        </p>
        <TestimonialModal />
      </div>
    </section>
  );
};

export default Testimonials;
