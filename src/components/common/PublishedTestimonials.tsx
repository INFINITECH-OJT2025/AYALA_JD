"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TestimonialDetailsModal from "./TestimonialDetailsModal";
import { Skeleton } from "../ui/skeleton";
import TestimonialModal from "./TestimonialModal";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  photo: string | null;
  media: string[];
  status: string;
  photo_url?: string;
  media_urls?: string[];
  created_at: number;
};

export default function PublishedTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const loading = testimonials.length === 0;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const allTestimonials = await getTestimonials();

        const published = allTestimonials
          .filter(
            (testimonial: Testimonial) => testimonial.status === "published"
          )
          .sort((a: Testimonial, b: Testimonial) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .slice(0, 5);

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
      <section className="bg-white dark:bg-black py-16 w-full">
        <div className="px-6 sm:px-6 lg:px-6 max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-left text-gray-900 dark:text-white">
                What Our Clients Say
              </h2>
              <p className="text-left text-lg text-gray-600 dark:text-gray-300">
                Hear from our satisfied clients about their experiences with our
                services.
              </p>
            </div>

            <div>
              <TestimonialModal />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-4 flex flex-col items-center text-center rounded-lg shadow-md relative overflow-hidden bg-gray-800 space-y-3"
                  >
                    <Skeleton className="absolute inset-0 w-full h-full z-0" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <Skeleton className="w-20 h-20 rounded-full mb-3" />
                      <Skeleton className="h-4 w-32 rounded" />
                      <div className="flex justify-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Skeleton key={i} className="h-5 w-5 rounded-full" />
                        ))}
                      </div>
                      <Skeleton className="h-3 w-full mt-3" />
                      <Skeleton className="h-3 w-2/3 mt-1" />
                      <Skeleton className="h-10 w-full mt-4 rounded-md" />
                    </div>
                  </div>
                ))
              : testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="p-4 flex flex-col items-center text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white dark:bg-[#18181a]"
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonial.photo_url || "/placeholder.png"}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border mb-3"
                      />
                      <h3 className="font-semibold">{testimonial.name}</h3>

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

                      <p className="text-sm mt-2 flex-grow">
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
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </section>

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
