"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";
import { fetchAboutUsContent } from "@/lib/api";
import { NewsUpdates } from "@/components/landing-page/NewsUpdates";
import { WhyChooseUs } from "@/components/landing-page/Whychooseus";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  const [aboutUs, setAboutUs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchAboutUsContent();
      setAboutUs(data);
      setLoading(false);
    };
    getContent();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-800">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          {aboutUs?.hero_image && (
            <>
              {aboutUs.hero_image.endsWith(".mp4") ? (
                <video
                  src={aboutUs.hero_image}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={aboutUs.hero_image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6 bg-black/40">
                    <div className="max-w-3xl">
                      <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
                        {aboutUs?.hero_title}
                      </h1>
                      <p className="mt-4 text-xl font-semibold opacity-90">
                        {aboutUs?.hero_subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 px-8 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">
                {aboutUs?.mission_title}
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {aboutUs?.mission_description}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">
                {aboutUs?.vision_title}
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {aboutUs?.vision_description}
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gray-200 dark:bg-gray-900 py-16 px-8 lg:px-24">
          <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400">
            OUR HISTORY
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {aboutUs?.history?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition"
              >
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://127.0.0.1:8000/storage/${item.image}`
                    }
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Hide broken images
                  />
                )}
                <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Programs Section */}

        <section className="bg-white dark:bg-gray-800 py-16 px-8 lg:px-24">
          <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400">
            OUR PROGRAMS
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {aboutUs?.programs?.map((program: any, index: number) => {
              // Extract YouTube video ID if link is a YouTube URL
              const youtubeMatch = program.link?.match(
                /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/
              );
              const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

              return (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition relative group flex flex-col justify-between h-full"
                >
                  {/* Video or Image Preview */}
                  <div className="relative w-full h-48 overflow-hidden rounded-md">
                    {youtubeId ? (
                      <a
                        href={program.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                          alt="YouTube Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                          <div className="bg-white p-3 rounded-full">
                            <svg
                              className="w-10 h-10 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9.75 16.5V7.5l7.5 4.5-7.5 4.5z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    ) : program.image ? (
                      <a
                        href={program.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                      >
                        <img
                          src={
                            program.image.startsWith("http")
                              ? program.image
                              : `http://127.0.0.1:8000/storage/${program.image}`
                          }
                          alt={program.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>
                      </a>
                    ) : null}
                  </div>

                  {/* Program Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  {/* Learn More Button (Fixed at Bottom) */}
                  {program.link && (
                    <div className="mt-auto pt-4">
                      <Button asChild variant="success" className="w-full">
                        <a
                          href={program.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn More
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <WhyChooseUs />
        <NewsUpdates />
      </div>
      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Footer />
    </>
  );
}
