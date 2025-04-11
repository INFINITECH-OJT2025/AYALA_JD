"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import RescheduleDetails from "@/components/common/RescheduleDetails";
import RescheduleForm from "@/components/common/RescheduleForm";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";
import { Loader2 } from "lucide-react";

export default function ReschedulePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id ? String(params.id) : "";
  const email = searchParams.get("email") || "";

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !email) {
        setError("Invalid request: Missing applicant ID or email.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/reschedule/${id}?email=${email}`
        );

        if (!response.ok) throw new Error("Failed to fetch schedule data.");

        const result = await response.json();
        console.log("Fetched Data:", result); // ✅ Debugging API response

        setData(result);
      } catch (err) {
        console.error("❌ Error fetching schedule data:", err);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, email]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 m-6 bg-white dark:bg-[#18181a] shadow-md rounded-lg flex flex-col md:flex-row gap-6">
        <RescheduleDetails id={id} email={email} data={data} setData={setData} setError={setError} />
        <RescheduleForm id={id} email={email} data={data} setData={setData} />
      </div>
      <Footer />
    </>
  );
}
