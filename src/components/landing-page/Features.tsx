"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

interface Property {
  id: number;
  property_image: string[];
  type_of_listing: string;
  property_name: string;
  unit_type: string;
  location: string;
  price: string;
  square_meter: number;
  status: string;
  floor_number: number;
  unit_status: string;
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");

        const data: Property[] = await response.json();

        const approvedProperties = data
          .filter((property) => property.status.toLowerCase() === "approved")
          .map((property) => ({
            ...property,
            numericPrice: parseFloat(property.price.replace(/[^\d.]/g, "")),
          }))
          .sort((a, b) => b.numericPrice - a.numericPrice);

        if (approvedProperties.length < 5) {
          setProperties(approvedProperties);
          return;
        }

        const highest = approvedProperties[0];
        const lowest = approvedProperties[approvedProperties.length - 1];
        const mid =
          approvedProperties[Math.floor(approvedProperties.length / 2)];
        const lowerMid =
          approvedProperties[Math.floor(approvedProperties.length * 0.75)];

        const averagePrice =
          approvedProperties.reduce((sum, p) => sum + p.numericPrice, 0) /
          approvedProperties.length;
        const average = approvedProperties.reduce((prev, curr) =>
          Math.abs(curr.numericPrice - averagePrice) <
          Math.abs(prev.numericPrice - averagePrice)
            ? curr
            : prev
        );

        // Collect candidates
        let featured = [highest, average, mid, lowerMid, lowest];

        // Remove duplicates by id
        const uniqueFeatured: Property[] = [];
        const seenIds = new Set();

        for (const property of featured) {
          if (!seenIds.has(property.id)) {
            uniqueFeatured.push(property);
            seenIds.add(property.id);
          }
        }

        // If still less than 5, add more from sorted list
        if (uniqueFeatured.length < 5) {
          for (const property of approvedProperties) {
            if (!seenIds.has(property.id)) {
              uniqueFeatured.push(property);
              seenIds.add(property.id);
              if (uniqueFeatured.length === 5) break;
            }
          }
        }

        setProperties(uniqueFeatured);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
<section className="bg-white dark:bg-black py-16">
  <div className="container px-6 sm:px-6 lg:px-6">
    <div className="w-full mb-6">
      {/* Title and Description Section */}
      <div className="flex flex-col">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Recommended for You
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Explore properties that best match your preferences and needs.
          Find the perfect fit for your next home or investment.
        </p>
      </div>
    </div>

    {/* Property Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {properties.length > 0 ? (
        properties.map((property) => (
          <Link key={property.id} href={`/landing/property/${property.id}`}>
            <Card className="bg-white dark:bg-[#18181a] shadow-md dark:shadow-lg rounded-2xl overflow-hidden">
              <div className="relative">
                <Image
                  src={property.property_image?.[0] || "/placeholder.jpg"}
                  alt={property.property_name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                />
                <span
                  className={`absolute top-2 left-2 text-white text-xs font-bold px-3 py-1 rounded ${
                    Array.isArray(property.type_of_listing)
                      ? property.type_of_listing.includes("For Sale") &&
                        property.type_of_listing.includes("For Rent")
                        ? "bg-gradient-to-r from-green-500 to-blue-500"
                        : property.type_of_listing.includes("For Sale")
                        ? "bg-green-600"
                        : "bg-blue-500"
                      : property.type_of_listing === "For Sale"
                      ? "bg-green-600"
                      : "bg-blue-500"
                  }`}
                >
                  {Array.isArray(property.type_of_listing)
                    ? property.type_of_listing.join(" & ")
                    : property.type_of_listing}
                </span>
              </div>

              <div className="p-4">
                {/* Badges */}
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Floor: {property.floor_number}
                  </span>
                  <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {property.square_meter} sqm
                  </span>
                  <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {property.unit_status}
                  </span>
                </div>

                {/* Property Name */}
                <h3 className="mt-2 text-base sm:text-lg font-bold truncate dark:text-white">
                  {property.unit_type} | {property.property_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {property.location}
                </p>

                <p className="mt-2 text-lg sm:text-xl font-bold text-green-800 dark:text-green-400 flex items-center">
                  ₱
                  {parseFloat(property.price).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
          No featured properties available.
        </p>
      )}
    </div>
  </div>
</section>

  );
}
