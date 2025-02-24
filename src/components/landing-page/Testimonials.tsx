import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "John Dela Cruz",
      image: "/tes1.jpg", // Add actual image path or use placeholder
      review: "Ayala Land made my dream home a reality! Smooth transaction and great service.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      image: "/tes2.jpg",
      review: "Excellent investment advice. My property value has grown significantly!",
      rating: 5,
    },
    {
      name: "Carlos Rivera",
      image: "/tes3.jpg",
      review: "The leasing team was very professional and helped me find the perfect space.",
      rating: 4.5,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Customer Testimonials
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <CardTitle className="mt-4 text-lg">{testimonial.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">"{testimonial.review}"</p>
                <div className="flex justify-center mt-3 text-yellow-500">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  {testimonial.rating % 1 !== 0 && <Star className="w-5 h-5 fill-current opacity-50" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
