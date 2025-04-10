"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Loader2,
  FileText,
  CalendarDays,
  Star,
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
import { FaCertificate, FaMoneyBill } from "react-icons/fa";
import { ChevronsUpDown } from "lucide-react";
import { format } from "date-fns"; // ✅ Import date formatting
import { useSearchParams } from "next/navigation"; // ✅ Import Next.js hook
import { Card } from "@/components/ui/card";
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
    qualification: string;
    seniority_level: string;
    job_function: string;
  }

  // Helper function to check if a job is expired
  const isJobExpired = (deadline: string | null | undefined): boolean => {
    if (!deadline) return false; // If no deadline, it's not expired
    const jobDeadline = new Date(deadline);
    jobDeadline.setHours(23, 59, 59, 999); // Set to end of the day
    return jobDeadline < new Date(); // Check if the deadline has passed
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/jobs/all");
        const data: Job[] = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of today

        // ✅ Filter out jobs that expired more than 7 days ago
        const filteredJobs = data.filter((job: Job) => {
          if (!job.deadline) return true; // Include jobs without a deadline

          const deadlineDate = new Date(job.deadline);
          const expiryDate = new Date(deadlineDate);
          expiryDate.setDate(expiryDate.getDate() + 7); // Set expiry to 7 days after the deadline

          return expiryDate >= today; // Keep jobs that are not expired
        });

        setJobs(filteredJobs);

        // ✅ Set the job from URL if exists, otherwise default to first non-expired job
        const selectedFromUrl = filteredJobs.find(
          (job) => job.id.toString() === jobId
        );

        // Filter non-expired jobs for selection
        const nonExpiredJobs = filteredJobs.filter(
          (job) => !job.deadline || new Date(job.deadline) >= today
        );

        // Set the selected job to the one from the URL or the first non-expired job
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

      <section className="py-6 bg-white dark:bg-gray-900">
        <Card className="max-w-6xl mx-auto px-0 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : jobs.length > 0 ? (
            <div className="relative h-[600px] w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${
                    selectedJob?.image_url || "/defaultJob.jpg"
                  }')`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-70" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full w-full flex flex-col justify-center px-6 md:px-12 text-white">
                <div className="max-w-3xl space-y-4">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-white text-black w-full max-w-sm"
                      >
                        {selectedJob?.title || "Select a Job"}
                        <ChevronsUpDown className="w-4 h-4 ml-auto text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-sm p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search for a job..."
                          value={search}
                          onValueChange={setSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No jobs found.</CommandEmpty>
                          {jobs.map((job) => {
                            const jobDeadline = new Date(job.deadline);
                            jobDeadline.setHours(23, 59, 59, 999);
                            const isExpired =
                              job.deadline && jobDeadline < new Date();
                            return (
                              <CommandItem
                                key={job.id}
                                value={job.title}
                                onSelect={() => {
                                  setSelectedJob(job);
                                  setOpen(false);
                                }}
                                className={`cursor-pointer ${
                                  isExpired ? "opacity-50" : ""
                                }`}
                              >
                                {job.title} {isExpired && "(Expired)"}
                              </CommandItem>
                            );
                          })}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className="flex items-center gap-4 flex-wrap">
                    <h2 className="text-4xl font-bold">
                      {selectedJob?.title}{" "}
                      <span className="text-xl font-medium">
                        ({selectedJob?.slots ?? "N/A"} slots)
                      </span>
                    </h2>
                  </div>

                  {/* Job Dropdown */}

                  <div className="flex items-center text-sm">
                    <FaMoneyBill className="w-4 h-4 mr-2 text-green-400" />
                    Salary Starts:
                    <span className="font-bold ml-2 text-green-400">
                      {selectedJob?.salary
                        ? `₱${Number(selectedJob.salary).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <CalendarDays className="w-4 h-4 mr-2 text-red-400" />
                    <span className="font-medium">Deadline:</span>
                    <span className="font-bold ml-2 text-red-400">
                      {selectedJob?.deadline
                        ? format(new Date(selectedJob.deadline), "MMMM d, yyyy")
                        : "No deadline"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                    Type: <span className="ml-2">{selectedJob?.type}</span>
                  </div>

                  {selectedJob?.seniority_level && (
                    <div className="text-sm">
                      <Star className="w-4 h-4 mr-2 inline-block text-yellow-400" />
                      Seniority Level:{" "}
                      <span>{selectedJob?.seniority_level}</span>
                    </div>
                  )}

                  {selectedJob?.location && (
                    <div className="text-sm">
                      <MapPin className="w-4 h-4 mr-2 inline-block text-orange-400" />
                      Location: <span>{selectedJob?.location}</span>
                    </div>
                  )}

                  {selectedJob?.job_function && (
                    <div className="text-sm">
                      <Briefcase className="w-4 h-4 mr-2 inline-block text-gray-300" />
                      Job Function: <span>{selectedJob?.job_function}</span>
                    </div>
                  )}

                  <div className="text-sm">
                    <FileText className="w-4 h-4 mr-2 inline-block text-gray-300" />
                    Description:{" "}
                    <span className="text-justify">
                      {selectedJob?.description}
                    </span>
                  </div>

                  {selectedJob?.qualification && (
                    <div className="text-sm">
                      <FaCertificate className="w-4 h-4 mr-2 inline-block text-blue-400" />
                      Qualification:{" "}
                      <span className="text-justify">
                        {selectedJob?.qualification}
                      </span>
                    </div>
                  )}

                  <Button
                    className={` max-w-sm text-lg py-3 rounded-lg font-semibold transition mt-4 ${
                      selectedJob?.deadline &&
                      isJobExpired(selectedJob.deadline)
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={() => {
                      if (
                        selectedJob?.deadline &&
                        !isJobExpired(selectedJob.deadline)
                      ) {
                        setIsModalOpen(true);
                      }
                    }}
                    disabled={
                      selectedJob?.deadline &&
                      isJobExpired(selectedJob.deadline)
                    }
                  >
                    {selectedJob?.deadline && isJobExpired(selectedJob.deadline)
                      ? "Expired"
                      : "Apply Now"}
                  </Button>
                </div>
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
        </Card>
      </section>

      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Footer />
    </>
  );
};

export default JobListings;
