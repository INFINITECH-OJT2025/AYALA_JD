"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";
import { fetchProperties, trackPropertyView } from "@/lib/api";
import {
  Plus,
  Send,
  Upload,
  Loader2,
  HomeIcon,
  Home,
  HousePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateListingLand from "@/components/common/CreateListingLanding";
import ComparisonModal from "@/components/common/ComparisonModal"; // Adjust path if needed
import { Property } from "@/components/types/property";
import { Eye } from "lucide-react"; // Import the eye icon

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        const approvedProperties = data.filter(
          (property) => property.status.toLowerCase() === "approved"
        );
        setProperties(approvedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties(); // Initial fetch
  }, []);

  const togglePropertySelection = (property: Property) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.some((p) => p.id === property.id)) {
        return prevSelected.filter((p) => p.id !== property.id); // ✅ Remove if already selected
      }

      if (prevSelected.length >= 3) {
        return prevSelected; // ✅ Prevent adding more than 3
      }

      return [...prevSelected, property]; // ✅ Add property
    });
  };

  const removeFromComparison = (propertyId: number) => {
    setSelectedProperties((prev) =>
      prev.filter((property) => property.id !== propertyId)
    );
  };

  const formatPrice = (price: string) => {
    return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
  };

  const getPriceRange = (price: number) => {
    if (price < 100_000) return "<100K";
    if (price <= 1_000_000) return "100K-1M";
    if (price <= 5_000_000) return "1M-5M";
    if (price <= 10_000_000) return "5M-10M";
    return "10M+";
};


  const filteredProperties = properties.filter((property) => {
    const searchLower = searchQuery.toLowerCase();
  
    const matchesSearch =
      property.property_name.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.type_of_listing.toLowerCase().includes(searchLower); // ✅ Now works as a string
  
    const priceCategory = getPriceRange(formatPrice(property.price));
    const matchesPrice = priceFilter ? priceCategory === priceFilter : true;
  
    return matchesSearch && matchesPrice;
  });
  
  
  
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-start">
            Properties
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Turning Dreams into Addresses, Secure Your Future with the Right
            Property.
          </p>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search by property name or location..."
              className="w-48 md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="100K-1M">₱100K - ₱1M</option>
              <option value="1M-5M">₱1M - ₱5M</option>
              <option value="5M-10M">₱5M - ₱10M</option>
              <option value="10M+">₱10M+</option>
            </select>

            <Button
              variant="success"
              className="font-bold"
              onClick={() => setIsDialogOpen(true)}
            >
              <Upload className="w-5 h-5" />
              Submit Property
            </Button>
          </div>

          <CreateListingLand
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />

          {selectedProperties.length > 0 && (
            <div
              className="fixed top-20 md:right-5 md:w-[45%] w-[95%] 
                bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg 
                flex flex-wrap items-center justify-between 
                z-50 border border-gray-300 dark:border-gray-600 
                outline outline-2 outline-gray-300 dark:outline-gray-500 
                md:translate-x-0 left-1/2 transform -translate-x-1/2"
            >
              {/* ✅ Label on the left */}
              <div className="w-full md:w-auto text-center md:text-left mb-2 md:mb-0">
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  COMPARE PROPERTIES:
                </span>
              </div>

              {/* ✅ Selected properties (max 3) and button stay at the right */}
              <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end w-full md:w-auto">
                {selectedProperties.slice(0, 3).map((property) => (
                  <span
                    key={property.id}
                    className="bg-green-600 text-gray-100 px-3 py-1 rounded flex items-center max-w-[120px] truncate"
                    title={property.property_name}
                  >
                    <span className="truncate max-w-[100px]">{property.property_name}</span>
                    <button
                      className="ml-2 text-sm font-extrabold text-red-600"
                      onClick={() => togglePropertySelection(property)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <Button
                  variant="success"
                  className="font-bold"
                  onClick={() => setIsComparisonOpen(true)}
                >
                  Compare
                </Button>
              </div>
            </div>
          )}


          <ComparisonModal
            isOpen={isComparisonOpen}
            onClose={() => setIsComparisonOpen(false)}
            selectedProperties={selectedProperties}
            removeFromComparison={removeFromComparison} // ✅ Pass the function
          />

          {/* ✅ Show Loading Spinner if Data is Loading */}
          {loading ? (
            <div className="flex justify-center items-center mt-6">
              <Loader2 className="animate-spin w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="grid md:grid-cols-5 gap-6 mt-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-2xl overflow-hidden flex flex-col h-full"
                  >
                    {/* ✅ Only Image is Clickable */}
                    <Link
                      href=""
                      onClick={async (e) => {
                        e.preventDefault();
                        await trackPropertyView(property.id);
                        window.location.href = `/landing/property/${property.id}`;
                      }}
                      className="block hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative cursor-pointer">
                        <Image
                          src={
                            property.property_image?.[0] || "/placeholder.jpg"
                          }
                          alt={property.property_name}
                          width={500}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                       <span
  className={`absolute top-2 left-2 text-white text-xs font-bold px-3 py-1 rounded ${
    property.type_of_listing.includes("For Sale") &&
    property.type_of_listing.includes("For Rent")
      ? "bg-gradient-to-r from-green-500 to-blue-500"
      : property.type_of_listing.includes("For Sale")
      ? "bg-green-500"
      : "bg-blue-500"
  }`}
>
  {property.type_of_listing}
</span>


                        <span className="absolute top-2 right-2 flex items-center bg-gray-800/80 text-white text-xs font-bold px-3 py-1 rounded">
                          <Eye className="w-4 h-4 mr-1" />
                          {property.views.length ?? 0}{" "}
                          {property.views.length === 1 ? "View" : "Views"}
                        </span>
                      </div>
                    </Link>

                    {/* 🏡 Property Details */}
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="inline-block w-fit text-xs bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-300 font-bold px-2 py-1 rounded">
                        {property.unit_status}
                      </span>
                      <h3 className="mt-2 text-sm font-bold dark:text-white">
                        {property.unit_type} | {property.property_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {property.location}
                      </p>

                      {/* ✅ Bottom Section: Sticks to Bottom */}
                      <div className="mt-auto flex justify-between items-center pt-4">
                        <p className="text-lg font-bold text-green-800 dark:text-green-400">
                          ₱
                          {new Intl.NumberFormat("en-PH").format(
                            formatPrice(property.price)
                          )}
                        </p>

                        {/* ✅ Home+ Button (Add to Compare) */}
                        <Button
                          variant={
                            selectedProperties.some((p) => p.id === property.id)
                              ? "success"
                              : "outline"
                          }
                          size="icon"
                          onClick={() => togglePropertySelection(property)}
                        >
                          <HousePlus
                            className={`w-5 h-5 ${
                              selectedProperties.some(
                                (p) => p.id === property.id
                              )
                                ? "text-white"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center col-span-5">
                  No properties found matching your criteria.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
      <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
      <Footer />
    </>
  );
}
