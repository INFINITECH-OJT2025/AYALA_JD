"use client";

import { useEffect, useState } from "react";
import { fetchServices } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  status: string;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const data: Service[] = await fetchServices();
        setServices(data.filter((s: Service) => s.status === "active")); // ✅ Fully typed
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);

  return (
    <section className="py-12 px-6 lg:px-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Explore our top-quality real estate services designed to meet your
          needs.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading services...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="shadow-md dark:shadow-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-lg dark:hover:shadow-xl transition flex flex-col h-full"
            >
              {/* ✅ Proper Spacing & Consistent Image Design */}
              {service.image && (
                <div className="p-4">
                  <Image
                    src={
                      service.image.startsWith("http")
                        ? service.image
                        : `/storage/service_images/${service.image}`
                    }
                    alt={service.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              <CardHeader className="px-4 pb-2">
                <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-400">
                  {service.title}
                </CardTitle>
              </CardHeader>

              {/* ✅ Truncated Description */}
              <CardContent className="px-4 flex-grow">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {service.description}
                </p>
              </CardContent>

              {/* ✅ Button Fixed at Bottom */}
              <CardFooter className="px-4 mt-auto pb-4">
                <Button
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                  onClick={() => setSelectedService(service)}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No services available.
        </p>
      )}

      {/* ✅ Service Details Dialog */}
      {selectedService && (
        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedService.title}</DialogTitle>
            </DialogHeader>

            {selectedService.image && (
              <Image
                src={
                  selectedService.image.startsWith("http")
                    ? selectedService.image
                    : `/storage/service_images/${selectedService.image}`
                }
                alt={selectedService.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}

            {/* ✅ Scrollable Description */}
            <div className="flex-1 overflow-y-auto max-h-[40vh] p-2">
              <p className="text-gray-700 dark:text-gray-300 text-justify">
                {selectedService.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
