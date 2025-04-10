"use client";

import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getFaqs } from "@/lib/api";  // Import the API function to fetch FAQs

export default function FAQSection() {
  const [faqs, setFaqs] = useState<any[]>([]);  // Use any[] if the FAQ structure is dynamic
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fetch real FAQs from the API
  const fetchFaqs = async () => {
    try {
      const data = await getFaqs();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-10">
      {/* Title Section */}
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
        Find answers to common questions about buying, selling, and renting properties.
      </p>

      {/* FAQ List */}
      <div className="mt-6 space-y-4">
        {faqs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base pb-3">
            No FAQs available at the moment.
          </p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq.id} // Using unique 'id' instead of index for better key management
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
          ))
        )}
      </div>
    </div>
  );
}
