import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // You can choose any icon from react-icons

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-start bg-gray-900 text-white">
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <video
          src="/ayala.mp4"
          autoPlay
          loop
          muted
          controls
          className="object-cover w-full h-full opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 w-full sm:w-1/2 px-6 py-10 sm:py-20 ml-4 sm:ml-12">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-500 text-transparent bg-clip-text">
          Find Your{" "}
          <span className="text-white drop-shadow-lg">Dream Property</span> with{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-500 text-transparent bg-clip-text">Ayala Land</span>
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl text-white">
          Discover{" "}
          <span className="font-semibold">
            premium properties
          </span>{" "}
          for sale and lease with
          <span className=" font-semibold">
            {" "}
            exclusive investment opportunities.
          </span>
        </p>

        {/* View Properties Button with Icon */}
        <div className="mt-6 w-40">
          <Link href="/landing/properties" className="flex items-center outline p-2">
            View Properties
            <FaArrowRight className="ml-2" /> {/* Icon */}
          </Link>
        </div>
      </div>
    </section>
  );
}
