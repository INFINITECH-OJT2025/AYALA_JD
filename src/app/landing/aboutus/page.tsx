import React from "react";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <img
            src="/ayalapic1.jpg" 
            alt="Ayala Land Development"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
                Enhancing Land, Enriching Lives
              </h1>
              <p className="mt-4 text-lg opacity-90">
                Ayala Land is committed to sustainable development, innovation, and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 px-8 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">Our Mission</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                We develop vibrant, master-planned communities that elevate the quality of life for Filipinos.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">Our Vision</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                To be the most trusted and innovative real estate developer in the Philippines, creating spaces that inspire and endure.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gray-200 dark:bg-gray-800 py-16 px-8 lg:px-24">
          <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400">Our History</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/ayalapic5.jpg",
                title: "Beginnings in Makati",
                desc: "Ayala Land’s beginnings are anchored on the development of an uncharted land known as Hacienda Makati. It is now the leading financial and central business district in the Philippines.",
              },
              {
                img: "/ayalapic2.jpeg",
                title: "Leading listed property developer",
                desc: "After its establishment in 1988, Ayala Land was listed in both the Manila and Makati Stock Exchanges in July of 1991. Today, Ayala Land is recognized as the country’s leading real estate and property developer.",
              },
              {
                img: "/ayalapic4.jpg",
                title: "A partner in nation-building",
                desc: "Our estates in Luzon, Visayas, and Mindanao offer diverse property formats of residences, malls, offices, and leisure developments that foster job generation and local economic growth.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">{item.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-8 lg:px-24">
          <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400">Core Values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "We uphold transparency and ethical business practices." },
              { title: "Excellence", desc: "We aim for the highest standards in all our developments." },
              { title: "Innovation", desc: "We embrace new ideas to drive better real estate solutions." },
              { title: "Sustainability", desc: "We build communities that thrive for generations." },
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">{value.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="relative h-[400px]">
          <img
            src="/ayalapic6.jpg"
            alt="Join Ayala Land"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h2 className="text-4xl font-bold drop-shadow-lg">Be Part of Our Legacy</h2>
            <p className="mt-4 text-lg opacity-90">Explore careers or discover our latest developments today.</p>
            <div className="mt-6 space-x-4">
              <a href="/landing/joblistings" className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Careers
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
