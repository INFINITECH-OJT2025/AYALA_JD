// components/landing-page/Testimonials.tsx

const Testimonials = () => {
  return (
    <section className="w-full py-16 bg-gray-200 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "Working with Ayala Land has been a game-changer. They made the entire process smooth and worry-free. Highly professional and reliable!"
            </p>
            <p className="font-semibold text-right text-gray-800 dark:text-white">— Juan Dela Cruz</p>
          </div>

          {/* Testimonial 2 */}
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "From site visits to paperwork, Ayala Land assisted us every step of the way. Their dedication and attention to detail exceeded our expectations."
            </p>
            <p className="font-semibold text-right text-gray-800 dark:text-white">— Maria Santos</p>
          </div>

          {/* Testimonial 3 */}
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "Ayala Land provided us with a seamless and personalized service. We now own a property we are proud to call home. Thank you!"
            </p>
            <p className="font-semibold text-right text-gray-800 dark:text-white">— Carlos Reyes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
