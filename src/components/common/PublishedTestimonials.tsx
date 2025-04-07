"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TestimonialDetailsModal from "./TestimonialDetailsModal";

// Define the Testimonial type
type Testimonial = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  photo: string | null;
  media: string[];
  status: string; // Status is a string (e.g., "published" or "unpublished")
  photo_url?: string;
  media_urls?: string[];
};

export default function PublishedTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const allTestimonials = await getTestimonials();
        // Filter published testimonials based on string status
        const published = allTestimonials.filter(
          (testimonial: Testimonial) => testimonial.status === "published"
        );
        setTestimonials(published);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {/* Title and description */}
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-6">
            Hear from our satisfied clients about their experiences with our
            services.
          </p>

          {/* Scrollable testimonial container */}
          <div className="overflow-x-auto p-6">
            <div className="flex gap-6 min-w-full">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="flex-none w-72 p-4 flex flex-col items-center text-center bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
                >
                  <img
                    src={testimonial.photo_url || "/placeholder.png"}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < testimonial.rating ? "#facc15" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.48 3.499l2.644 5.353 5.91.857-4.277 4.173 1.01 5.887L11.5 17.5l-5.266 2.77 1.01-5.887-4.277-4.173 5.91-.857 2.623-5.353z"
                        />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 flex-grow">
                    {truncateText(testimonial.experience, 100)}
                  </p>
                  <div className="mt-4 flex justify-center w-full">
                    <Button
                      variant="success"
                      onClick={() => setSelected(testimonial)}
                    >
                      See More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <TestimonialDetailsModal
          open={!!selected}
          onClose={() => setSelected(null)}
          testimonial={selected}
        />
      )}
    </>
  );
}
