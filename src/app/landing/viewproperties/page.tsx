"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaBuilding, FaCalendarAlt, FaRulerCombined, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";
import { Inquiries } from "@/components/landing-page/Inquiries";

const propertyImages = ["/prop1.jpg", "/prop2.jpg", "/prop3.jpg"];

export default function PropertyDetails() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
        {/* Image Slider */}
        <div className="w-full">
          <div className="relative">
            <img
              src={propertyImages[currentImage]}
              alt={`Property ${currentImage + 1}`}
              className="w-full h-[60vh] object-cover rounded-lg"
            />
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
            >
              <FaArrowRight size={20} />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-2 mt-4">
            {propertyImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-14 object-cover rounded-lg cursor-pointer border-2 ${
                  currentImage === index ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>

          <Card className="p-6 space-y-2 mt-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">FULLY-FURNISHED</Badge>
              <Badge className="bg-blue-500 text-white">FOR RENT</Badge>
            </div>
            <h2 className="text-2xl font-bold">Modern 2BR Condo in Makati</h2>
            <p className="text-xl font-semibold text-indigo-600">₱8,500,000</p>
            <p className="text-gray-500">📍West Capitol, Kapitolyo, Pasig City</p>

            <div>
              <h3 className="font-semibold">DESCRIPTION</h3>
              <p className="text-gray-600">
                Elevate your way of living and experience rare exclusivity with DMCI Homes' newest
                residential landmark in Kapitolyo, Pasig City. Standing proud along West Capitol Drive,
                Fairlane Residences features modern tropical design and thoughtfully designed spacious units
                that suit your lifestyle needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">DETAILS</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-100 text-blue-600 flex items-center px-3 py-1">
                  <FaHome className="mr-2" /> For Rent
                </Badge>
                <Badge className="bg-blue-100 text-blue-600 flex items-center px-3 py-1">
                  <FaCalendarAlt className="mr-2" /> 6 Months
                </Badge>
                <Badge className="bg-blue-100 text-blue-600 flex items-center px-3 py-1">
                  <FaRulerCombined className="mr-2" /> 62.00 sqm
                </Badge>
                <Badge className="bg-blue-100 text-blue-600 flex items-center px-3 py-1">
                  <FaBuilding className="mr-2" /> 35th Floor
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">GENERAL FEATURES</h3>
              <div className="flex flex-wrap gap-2">
                {["Pool Area", "Gym/Fitness Center", "Elevator", "Security"].map((feature, index) => (
                  <Badge key={index} className="bg-gray-200 text-gray-700 px-3 py-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Property Details & Inquiry */}
        <Inquiries/>
      </div>

      <Footer />
    </>
  );
}
