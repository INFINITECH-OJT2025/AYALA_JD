import { FaBuilding, FaUserTie, FaSmile, FaHandshake } from "react-icons/fa";

const benefits = [
  { icon: <FaBuilding className="text-green-600 text-4xl" />, text: "50+ years of real estate excellence" },
  { icon: <FaUserTie className="text-green-600 text-4xl" />, text: "Top-notch property management services" },
  { icon: <FaHandshake className="text-green-600 text-4xl" />, text: "Investment consultation from experts" },
  { icon: <FaSmile className="text-green-600 text-4xl" />, text: "Thousands of happy homeowners" },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-2xl flex flex-col items-center">
              {benefit.icon}
              <p className="mt-3 text-lg font-medium text-gray-700 text-center">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
