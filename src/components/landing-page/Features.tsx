"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Property {
  id: number;
  property_image: string[];
  type_of_listing: string;
  property_name: string;
  unit_type: string;
  location: string;
  price: string;
  status: string;
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");

        const data: Property[] = await response.json();

        // ✅ Filter only approved properties
        const approvedProperties = data
          .filter((property) => property.status.toLowerCase() === "approved")
          .map((property) => ({
            ...property,
            numericPrice: parseFloat(property.price.replace(/[^\d.]/g, "")),
          }))
          .sort((a, b) => b.numericPrice - a.numericPrice); // Sort highest to lowest

        // ✅ Get highest, mid, and lowest-priced properties
        let featured = [];
        if (approvedProperties.length >= 3) {
          featured = [
            approvedProperties[0], // Highest price
            approvedProperties[Math.floor(approvedProperties.length / 2)], // Mid price
            approvedProperties[approvedProperties.length - 1], // Lowest price
          ];
        } else {
          featured = approvedProperties.slice(0, 3); // Show available properties (if < 3)
        }

        setProperties(featured);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-5 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Featured Properties
        </h2>

        {/* Property Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Link
                key={property.id}
                href={`/landing/property/${property.id}`}
                className="block transform transition-transform hover:scale-105"
              >
                <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-2xl overflow-hidden">
                  <div className="relative">
                    <Image
                      src={property.property_image?.[0] || "/placeholder.jpg"} // ✅ Show first image or fallback
                      alt={property.property_name}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 text-white text-xs font-bold px-3 py-1 rounded ${
                        Array.isArray(property.type_of_listing)
                          ? property.type_of_listing.includes("For Sale") && property.type_of_listing.includes("For Rent")
                            ? "bg-gradient-to-r from-green-500 to-blue-500"
                            : property.type_of_listing.includes("For Sale")
                            ? "bg-green-500"
                            : "bg-blue-500"
                          : property.type_of_listing === "For Sale"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {Array.isArray(property.type_of_listing) ? property.type_of_listing.join(" & ") : property.type_of_listing}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="mt-2 text-lg font-bold dark:text-white">
                      {property.unit_type} | {property.property_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{property.location}</p>
                    <p className="mt-2 text-xl font-bold text-green-800 dark:text-green-400">
                      ₱{parseFloat(property.price).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
              No featured properties available.
            </p>
          )}
        </div>

        {/* Submit Your Property Section */}
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Do you have a property for <span className="text-green-600 dark:text-green-400 font-semibold">sale</span> or{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">rent</span>?
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            List it with us and connect with potential buyers or tenants.
          </p>
          <Link
            href="/landing/properties"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg animate-bounce hover:scale-110 transition duration-800"
          >
            Submit Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}
