"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, Loader2 } from "lucide-react";
import { fetchFeaturedJobs } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/common/ApplicationModal";
import { useRouter } from "next/navigation";
import { FaMoneyBill } from "react-icons/fa";
export function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    created_at: string;
  }

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data: Job[] = await fetchFeaturedJobs(); // ✅ Ensure data is typed as Job[]

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ✅ Filter out expired jobs
        const filteredJobs = data
          .filter((job: Job) => {
            if (!job.deadline) return true; // ✅ Keep jobs without a deadline
            return new Date(job.deadline) >= today; // ✅ Only show non-expired jobs
          })
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          ); // ✅ Sort by most recent `created_at` first

        setJobs(filteredJobs);
      } catch (err) {
        setError("Failed to load featured jobs.");
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const router = useRouter();

  return (
    <section className="py-16 px-6 bg-white dark:bg-black">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-left mb-2">
          Join Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-left mb-4">
          Join us and grow your skill while making an impact!
        </p>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-10 h-10 text-green-600 dark:text-green-400 animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="shadow-md dark:shadow-lg bg-white dark:bg-[#18181a] text-gray-700 dark:text-gray-300 hover:shadow-lg dark:hover:shadow-xl transition flex flex-col h-full"
              >
                <CardHeader>
                  <img
                    src={job.image_url || "/defaultJob.jpg"}
                    alt={job.title}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                  <CardTitle className="text-lg text-green-700 dark:text-green-400">
                    {job.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.location} • {job.type}
                  </p>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />{" "}
                    {job.category || "Uncategorized"}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />{" "}
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />{" "}
                    {job.type}
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                    <FaMoneyBill className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                    Salary Starts at:
                    <span className="text-green-700 dark:text-green-400 font-bold ml-1">
                      {job.salary
                        ? `₱${Number(job.salary).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}`
                        : "Not specified"}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {job.description}
                  </p>
                </CardContent>

                {/* Button fixed at bottom */}
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full px-4 py-2"
                    variant="success"
                    onClick={() =>
                      router.push(`/landing/joblistings?jobId=${job.id}`)
                    } // ✅ Pass job ID
                  >
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No featured jobs available.
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
    </section>
  );
}
