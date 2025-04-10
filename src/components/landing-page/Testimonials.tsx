import PublishedTestimonials from "../common/PublishedTestimonials";
import TestimonialModal from "../common/TestimonialModal";

const Testimonials = () => {
  return (
    <section className="w-full bg-white dark:bg-black">
      <PublishedTestimonials />
      <div className="text-center">
        <TestimonialModal />
      </div>
    </section>
  );
};

export default Testimonials;
