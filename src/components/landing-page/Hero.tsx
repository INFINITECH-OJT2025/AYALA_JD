"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/ayalapic1.jpg", "/ayalapic2.jpeg", "/ayalapic3.jpg"];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-full h-[25vh] flex items-center justify-center bg-gray-900 text-white">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image
          src={images[currentIndex]}
          alt="Ayala Property"
          layout="fill"
          objectFit="cover"
          className="opacity-70 transition-opacity duration-1000"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
  <h1 className="text-4xl md:text-6xl font-bold pt-10 bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-500 text-transparent bg-clip-text">
    Find Your <span className="text-white drop-shadow-lg">Dream Property</span> with <span className="text-blue-400">Ayala Land</span>
  </h1>
  <p className="mt-4 text-lg md:text-xl text-gray-200">
    Discover <span className="text-yellow-300 font-semibold">premium properties</span> for sale and lease with 
    <span className="text-green-300 font-semibold"> exclusive investment opportunities.</span>
  </p>
</div>

    </section>
  );
}
