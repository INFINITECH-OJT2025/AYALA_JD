"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, Loader2, FileText } from "lucide-react";
import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";
import ApplicationModal from "@/components/common/ApplicationModal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { FaMoneyBill } from "react-icons/fa";
import { ChevronsUpDown } from "lucide-react";

const JobListings = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/jobs/all");
        const data = await res.json();
        setJobs(data);
        setSelectedJob(data.length > 0 ? data[0] : null); // ✅ Default to first job
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Careers</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Experience exceptional real estate services, tailored to meet your
            needs and exceed expectations.
          </p>

          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : jobs.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ✅ Left Side: Job Image */}
              <div>
                <img
                  src={selectedJob?.image_url || "/default.jpg"}
                  alt={selectedJob?.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>

              {/* ✅ Right Side: Job Details */}
              <div className="flex flex-col justify-between">
                {/* Job Slots */}
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Slots: <span>{selectedJob?.slots ?? "N/A"}</span>
                </p>

                {/* Job Selection Dropdown (with Autocomplete) */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
                    >
                      {selectedJob?.title || "Select a Job"}
                      <ChevronsUpDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search for a job..."
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList>
                        <CommandEmpty>No jobs found.</CommandEmpty>
                        {jobs
                          .filter((job) =>
                            job.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((job) => (
                            <CommandItem
                              key={job.id}
                              value={job.title}
                              onSelect={() => {
                                setSelectedJob(job);
                                setOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              {job.title}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Salary */}
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <FaMoneyBill className="w-4 h-4 mr-2 text-green-600 dark:text-green-500" />
                  Salary Starts:
                  <span className="font-bold text-green-700 dark:text-green-500 ml-2">
                    {selectedJob?.salary
                      ? `₱${Number(selectedJob.salary).toLocaleString("en-PH")}`
                      : "Not specified"}
                  </span>
                </div>

                {/* Job Location */}
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  {selectedJob?.location}
                </div>

                {/* Job Type */}
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  {selectedJob?.type}
                </div>

                {/* Job Description */}
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <FileText className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  {selectedJob?.description}
                </div>

                {/* Apply Button Fixed at Bottom */}
                <Button
                  className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  APPLY NOW
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No jobs found.
            </p>
          )}

          {/* Application Modal */}
          {selectedJob && (
            <ApplicationModal
              job={selectedJob}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default JobListings;
