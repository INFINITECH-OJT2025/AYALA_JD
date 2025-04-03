"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Loader2,
  FileText,
  CalendarDays,
} from "lucide-react";
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
import { format } from "date-fns"; // ✅ Import date formatting
import { useSearchParams } from "next/navigation"; // ✅ Import Next.js hook
const JobListings = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId"); // ✅ Get job ID from URL

  interface Job {
    id: number;
    title: string;
    location: string;
    type?: string;
    category?: string;
    salary?: string;
    deadline?: string | null;
    description?: string;
    image_url?: string;
    slots?: number;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/jobs/all");
        const data: Job[] = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ✅ Filter out jobs that expired more than 7 days ago
        const filteredJobs = data.filter((job: Job) => {
          if (!job.deadline) return true;

          const deadlineDate = new Date(job.deadline);
          const expiryDate = new Date(deadlineDate);
          expiryDate.setDate(expiryDate.getDate() + 7);

          return expiryDate >= today;
        });

        setJobs(filteredJobs);

        // ✅ Set the job from URL if exists, otherwise default to first non-expired job
        const selectedFromUrl = filteredJobs.find(
          (job) => job.id.toString() === jobId
        );
        const nonExpiredJobs = filteredJobs.filter(
          (job) => !job.deadline || new Date(job.deadline) >= today
        );

        setSelectedJob(selectedFromUrl || nonExpiredJobs[0] || null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobId]); // ✅ Re-run effect when jobId changes

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 dark:from-gray-900 dark:to-gray-800 py-12 px-6 text-center shadow-lg overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="/careers.jpg"
            alt="Join Our Team"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-white mb-4 tracking-wide">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed">
            Join us and grow your skill while making an impact!
          </p>
        </div>
      </div>

      <section className="py-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
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
                  src={selectedJob?.image_url || "/defaultJob.jpg"}
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
                        {jobs.map((job) => {
                          const isExpired =
                            job.deadline && new Date(job.deadline) < new Date();

                          return (
                            <CommandItem
                              key={job.id}
                              value={job.title}
                              onSelect={() => {
                                setSelectedJob(job); // ✅ Allow selecting expired jobs
                                setOpen(false);
                              }}
                              className={`cursor-pointer ${
                                isExpired ? "opacity-50" : ""
                              }`} // ✅ Just faded, not disabled
                            >
                              {job.title} {isExpired && "(Expired)"}
                            </CommandItem>
                          );
                        })}
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

                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2 text-red-500" />{" "}
                  {/* ✅ New Icon & Color */}
                  <span className="font-medium">Deadline:</span>{" "}
                  {/* ✅ Added Label */}
                  <span className="ml-1">
                    {selectedJob?.deadline
                      ? format(new Date(selectedJob.deadline), "MMMM d, yyyy") // ✅ Format the date
                      : "No deadline"}{" "}
                    {/* ✅ Fallback for missing deadline */}
                  </span>
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
                  className={`w-full text-white text-lg py-3 rounded-lg font-semibold transition mt-4 ${
                    selectedJob?.deadline &&
                    new Date(selectedJob.deadline) < new Date()
                      ? "bg-red-400 cursor-not-allowed" // ✅ Disabled if expired
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => {
                    if (
                      selectedJob?.deadline &&
                      new Date(selectedJob.deadline) >= new Date()
                    ) {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={
                    selectedJob?.deadline &&
                    new Date(selectedJob.deadline) < new Date()
                  } // ✅ Disable expired jobs
                >
                  {selectedJob?.deadline &&
                  new Date(selectedJob.deadline) < new Date()
                    ? "Expired"
                    : "APPLY NOW"}
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

      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Footer />
    </>
  );
};

export default JobListings;
