"use client";

import { useState, useEffect } from "react";

interface InterviewSchedule {
  admin_schedule: string | null;
  new_schedule: string | null;
  interview_date: string | null;
  admin_message: string | null;
  applicant_message: string | null;
  status: string;
}

interface ApplicantDetails {
  name: string;
  email: string;
  phone: string;
  position: string;
}

const useInterview = (applicantId: number | null) => {
  const [schedule, setSchedule] = useState<InterviewSchedule | null>(null);
  const [applicant, setApplicant] = useState<ApplicantDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applicantId) return;

    const fetchSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/reschedule/${applicantId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch interview schedule");
        }

        const data = await response.json();

        // ✅ Ensure applicant data is stored correctly
        setApplicant({
          name: data.applicant?.name || "N/A",
          email: data.applicant?.email || "N/A",
          phone: data.applicant?.phone || "N/A",
          position: data.applicant?.position || "N/A",
        });

        // ✅ Use `new_schedule` only if approved, otherwise fallback to `admin_schedule`
        const finalDate =
          data.reschedule?.status === "approved"
            ? data.reschedule.new_schedule
            : data.appointment?.admin_schedule;

        setSchedule({
          admin_schedule: data.appointment?.admin_schedule || null,
          new_schedule: data.reschedule?.new_schedule || null,
          interview_date: finalDate,
          admin_message: data.appointment?.admin_message || "No message provided",
          applicant_message: data.reschedule?.applicant_message ?? null,
          status: data.reschedule?.status ?? "no request",
        });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [applicantId]);

  return { schedule, applicant, loading, error };
};

export default useInterview;
