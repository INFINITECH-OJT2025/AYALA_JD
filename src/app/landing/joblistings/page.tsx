"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";

const jobListings = [
  {
    id: 1,
    title: "Real Estate Sales Associate",
    company: "Ayala Land",
    location: "Makati, Philippines",
    type: "Full-Time",
    description:
      "Drive sales and engage with potential clients to promote Ayala Land properties.",
    image: "/agent1.jpg",
  },
  {
    id: 2,
    title: "Architectural Designer",
    company: "Ayala Land Premier",
    location: "BGC, Taguig",
    type: "Full-Time",
    description: "Design and execute high-end residential and commercial projects.",
    image: "/agent2.jpg",
  },
  {
    id: 3,
    title: "Marketing Specialist",
    company: "Ayala Malls",
    location: "Quezon City",
    type: "Part-Time",
    description: "Develop marketing strategies and campaigns for upcoming projects.",
    image: "/agent3.jpg",
  },
  {
    id: 4,
    title: "Project Engineer",
    company: "Ayala Land",
    location: "Cebu City",
    type: "Full-Time",
    description:
      "Oversee and manage construction projects ensuring quality and timeline adherence.",
    image: "/agent4.jpg",
  },
];

const JobListings = () => {
  const [filter, setFilter] = useState("");

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Navbar />

        {/* Search & Filter */}
        <section className="mt-2 lg:px-24">
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search for a job..."
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilter(e.target.value)}
            />
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Locations</option>
              <option value="Makati">Makati</option>
              <option value="Taguig">Taguig</option>
              <option value="Quezon City">Quezon City</option>
              <option value="Cebu">Cebu</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-10 px-6 lg:px-24">
          <h2 className="text-2xl font-bold text-start text-blue-700 mb-2">
            Current Job Openings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg shadow-lg transition transform hover:-translate-y-2 hover:shadow-xl"
                >
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-bold text-green-700">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" /> {job.location}
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-600" /> {job.type}
                  </div>
                  <p className="mt-4 text-gray-700">{job.description}</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No jobs found.</p>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative h-[400px]">
          <img
            src="/realestate.jpg"
            alt="Join Ayala Land"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h2 className="text-4xl font-bold text-green-400">Your Future Starts Here</h2>
            <p className="mt-4 text-lg">Explore career opportunities and be part of our growing family.</p>
            <a
              href="/apply"
              className="mt-6 bg-white text-blue-700 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100"
            >
              Apply Now
            </a>
          </div>
        </section>
      <Footer/>
    </>
  );
};

export default JobListings;
