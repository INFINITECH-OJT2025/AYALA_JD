"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";
import { fetchPropertyById } from "@/lib/api";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import {
  FaSwimmer,
  FaBed,
  FaParking,
  FaPaw,
  FaHome,
  FaDumbbell,
  FaBuilding,
  FaConciergeBell,
  FaShieldAlt,
  FaCalendarAlt,
  FaRulerCombined,
  FaTag,
} from "react-icons/fa";
import Inquiry from "@/components/common/Inquiry";
import Nearby from "@/components/common/Nearby";

interface Property {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type_of_listing: string;
  property_name: string;
  description: string;
  other_details: string[];
  unit_type: string;
  unit_status: string;
  location: string;
  price: string;
  status: string;
  square_meter: number;
  floor_number: number;
  parking: string;
  pool_area: boolean;
  guest_suite: boolean;
  underground_parking: boolean;
  pet_friendly_facilities: boolean;
  balcony_terrace: boolean;
  club_house: boolean;
  gym_fitness_center: boolean;
  elevator: boolean;
  concierge_services: boolean;
  security: boolean;
  property_image: string[];
}

export default function PropertyDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  useEffect(() => {
    if (id) {
      const loadProperty = async () => {
        try {
          const data = await fetchPropertyById(id as string);
          if (data) {
            setProperty(data); // Set only the property object from the response
            // If you need to store the unique views somewhere:
            // setUniqueViews(data.unique_views);
          }
        } catch (error) {
          console.error("Error fetching property:", error);
        }
      };
      loadProperty();
    }
  }, [id]);

  useEffect(() => {
    if (property?.property_image?.length) {
      setCurrentImageIndex(0); // Reset to the first image when property changes
    }
  }, [property]);

  if (!property)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        Loading property details...
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 p-5 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Left Section: Property Images & Details */}
        <div className="col-span-7">
          <div className="relative">
            {property.property_image?.length ? (
              <>
                {/* Thumbnail View */}
                <img
                  src={property.property_image[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover rounded-lg cursor-pointer"
                  onClick={() => openFullScreen(currentImageIndex)}
                />

                {/* Navigation Buttons */}
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-black/80 transition"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? property.property_image.length - 1 : prev - 1
                    )
                  }
                >
                  <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-black/80 transition"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev + 1) % property.property_image.length
                    )
                  }
                >
                  <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                {/* Full Screen Modal */}
                {isFullScreen && (
                  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                    <img
                      src={property.property_image[currentImageIndex]}
                      alt={`Property ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />

                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"
                      onClick={closeFullScreen}
                    >
                      <X className="w-6 h-6" />
                    </button>

                    {/* Full Screen Navigation */}
                    <button
                      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? property.property_image.length - 1
                            : prev - 1
                        )
                      }
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % property.property_image.length
                        )
                      }
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No images available
              </p>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex justify-center space-x-2 mt-4 overflow-x-auto">
            {property.property_image?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 sm:w-20 h-12 sm:h-14 object-cover rounded-lg cursor-pointer border-2 ${
                  currentImageIndex === index
                    ? "border-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Property Details */}
          <Card className="p-6 sm:p-8 space-y-4 mt-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Section: Property Details */}
              <div>
                {/* Status & Listing Type */}
                <div className="flex items-center space-x-2 flex-wrap">
                  <Badge
                    className="bg-green-500 text-white text-sm px-3 py-1 
                   hover:bg-green-600 transition"
                  >
                    {property.unit_status}
                  </Badge>

                  {/* Handle multiple type_of_listing values */}
                  {Array.isArray(property.type_of_listing) ? (
                    property.type_of_listing.map((listing, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-500 text-white text-sm px-3 py-1 flex items-center
                       hover:bg-blue-600 transition"
                      >
                        <FaTag className="mr-1" /> {listing}
                      </Badge>
                    ))
                  ) : (
                    <Badge
                      className="bg-blue-500 text-white text-sm px-3 py-1 flex items-center
                        hover:bg-blue-600 transition"
                    >
                      <FaTag className="mr-1" /> {property.type_of_listing}
                    </Badge>
                  )}
                </div>

                {/* Property Name & Price */}
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                  {property.property_name}
                </h2>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                  ₱
                  {Number(property.price).toLocaleString("en-PH", {
                    minimumFractionDigits: 2, // Ensures two decimal places
                    maximumFractionDigits: 2, // Prevents extra decimals
                  })}
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center mt-1">
                  📌 {property.location}
                </p>

                {/* Property Details */}
                <h3 className="font-bold mt-4">DETAILS</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  {[
                    {
                      label: "Floor",
                      value: `${property.floor_number} level/s`,
                      icon: <FaBuilding className="mr-1" />,
                    },
                    {
                      label: "Size",
                      value: `${property.square_meter} sqm`,
                      icon: <FaRulerCombined className="mr-1" />,
                    },
                  ].map((detail, index) =>
                    detail.value ? (
                      <Badge
                        key={index}
                        className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 
                        text-sm px-3 py-1 flex items-center rounded-lg 
                        hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        {detail.icon} {detail.label}: {detail.value}
                      </Badge>
                    ) : null
                  )}
                </div>

                {/* Features & Amenities */}
              </div>

              {/* Right Section: Property Description */}
              <div className="lg:mt-12 md:mt-0">
                <h3 className="font-bold">OTHER DETAILS</h3>
                <ul className="text-gray-700 dark:text-gray-300 col-span-2 list-disc pl-5 mt-1">
                  {property.other_details?.length ? (
                    property.other_details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))
                  ) : (
                    <li>No details provided</li>
                  )}
                </ul>
                <h3 className="font-bold mt-2">DESCRIPTION</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  {property.description}
                </p>
              </div>
            </div>
            <h3 className="font-bold mt-4">FEATURES & AMENITIES</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                {
                  label: "Pool",
                  value: property.pool_area,
                  icon: <FaSwimmer className="mr-1" />,
                },
                {
                  label: "Guest Suite",
                  value: property.guest_suite,
                  icon: <FaBed className="mr-1" />,
                },
                {
                  label: "Underground Parking",
                  value: property.underground_parking,
                  icon: <FaParking className="mr-1" />,
                },
                {
                  label: "Pet-Friendly",
                  value: property.pet_friendly_facilities,
                  icon: <FaPaw className="mr-1" />,
                },
                {
                  label: "Club House",
                  value: property.club_house,
                  icon: <FaShieldAlt className="mr-1" />,
                },
                {
                  label: "Gym",
                  value: property.gym_fitness_center,
                  icon: <FaDumbbell className="mr-1" />,
                },
                {
                  label: "Concierge Services",
                  value: property.concierge_services,
                  icon: <FaConciergeBell className="mr-1" />,
                },
                {
                  label: "Balcony/Terrace",
                  value: property.balcony_terrace,
                  icon: <FaHome className="mr-1" />,
                },
                {
                  label: "Elevator",
                  value: property.elevator,
                  icon: <FaShieldAlt className="mr-1" />,
                },
                {
                  label: "Security",
                  value: property.security,
                  icon: <FaShieldAlt className="mr-1" />,
                },
              ].map((feature, index) =>
                feature.value ? (
                  <Badge
                    key={index}
                    className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 
                    text-sm px-3 py-1 flex items-center rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    {feature.icon} {feature.label}
                  </Badge>
                ) : null
              )}
            </div>
          </Card>
        </div>

        {/* Right Section: Inquiry Form */}
        <div className="col-span-7 md:col-span-5 lg:col-span-3">
          <Inquiry propertyId={parseInt(id as string, 10)} />
          <div className="mt-4">
            <Nearby />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
