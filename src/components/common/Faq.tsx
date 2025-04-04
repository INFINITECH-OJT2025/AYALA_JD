import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is the process of buying a home?",
    answer: "The home-buying process typically involves getting pre-approved, finding a home, making an offer, getting an inspection, securing financing, and closing the deal.",
  },
  {
    question: "How much should I save for a down payment?",
    answer: "The standard down payment is usually 20% of the home's purchase price, but many lenders offer options with lower down payments, sometimes as low as 3-5%. However, a larger down payment can help you secure better loan terms and avoid mortgage insurance.",
  },
  {
    question: "What are closing costs, and how much should I expect?",
    answer: "Closing costs typically range from 2% to 5% of the home’s purchase price and cover expenses like appraisal fees, title insurance, and lender fees.",
  },
  {
    question: "What is a real estate agent’s commission?",
    answer: "Real estate agents typically charge a commission of 5-6% of the home's sale price, which is usually split between the buyer’s and seller’s agents.",
  },
  {
    question: "What should I look for during a home inspection?",
    answer: "Look for structural issues, roof condition, plumbing, electrical systems, HVAC, and signs of water damage or pest infestations.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-10">
      {/* Title Section */}
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
        Find answers to common questions about buying, selling, and renting properties.
      </p>

      {/* FAQ List */}
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 dark:border-gray-600 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center py-3">
              <h3 className="text-gray-900 dark:text-gray-100 text-sm sm:text-base font-medium">
                {faq.question}
              </h3>
              <FaChevronDown
                className={`text-gray-500 dark:text-gray-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </div>
            {openIndex === index && (
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base pb-3">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
