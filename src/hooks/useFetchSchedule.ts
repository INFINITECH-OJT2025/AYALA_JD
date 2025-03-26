import { useEffect, useState } from "react";

type ScheduleRequest = {
  id: number;
  new_schedule: string | null;
  applicant_message: string | null;
  status: string | null;
  file_path?: string | null;
};

type Appointment = {
  admin_schedule: string | null;
  admin_message: string | null;
};

const useFetchSchedule = (applicantId: number | null) => {
  const [scheduleRequest, setScheduleRequest] = useState<ScheduleRequest | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applicantId) {
      console.warn("Skipping fetch: No applicant ID provided.");
      return;
    }

    const fetchSchedule = async () => {
      try {
        setLoading(true);
        console.log(`Fetching schedule for applicantId: ${applicantId}`);

        const response = await fetch(`http://127.0.0.1:8000/api/reschedule/${applicantId}`);

        if (!response.ok) throw new Error("Failed to fetch schedule request");

        const data = await response.json();
        console.log("Fetched Schedule Data:", data);

        // ✅ Store reschedule request and appointment separately
        setScheduleRequest(data.reschedule);
        setAppointment(data.appointment);
        setError(null);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError((err as Error).message);
        setScheduleRequest(null);
        setAppointment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [applicantId]);

  return { scheduleRequest, appointment, loading, error };
};

export default useFetchSchedule;
