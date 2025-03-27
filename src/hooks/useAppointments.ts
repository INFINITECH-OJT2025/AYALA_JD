"use client";

import { useState, useEffect } from "react";
import { EventInput } from "@fullcalendar/core";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  property?: {
    first_name: string;
    last_name: string;
  };
}

export interface Interview {
  applicant_id: number;
  reschedule?: {
    new_schedule: string | null;
    status: string;
  };
  appointment?: {
    admin_schedule: string | null;
  };
}

const useAppointments = () => {
  const [appointments, setAppointments] = useState<EventInput[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch property viewing appointments
        const res = await fetch(`${API_URL}/appointments`);
        const data: Appointment[] = await res.json();

        const formattedAppointments: EventInput[] = data.map((appointment: Appointment) => ({
          id: String(appointment.id),
          title: `Viewing for property owned by ${appointment.property?.first_name} ${appointment.property?.last_name}`,
          start: new Date(`${appointment.date}T${appointment.time}`).toISOString(), // ✅ Ensures valid date format
        }));

        // Fetch interview schedules
        const resInterviews = await fetch(`${API_URL}/applicant-reschedules`);
        const interviews: Interview[] = await resInterviews.json();

        const formattedInterviews: EventInput[] = interviews
          .map((interview: Interview) => {
            const interviewDate =
              interview.reschedule?.status === "approved"
                ? interview.reschedule.new_schedule
                : interview.appointment?.admin_schedule;

            if (!interviewDate) return null; // ✅ Skip invalid entries

            return {
              id: String(interview.applicant_id),
              title: interview.reschedule?.status === "approved"
                ? "Interview (Rescheduled)"
                : "Interview",
              start: new Date(interviewDate).toISOString(), // ✅ Ensures valid date format
              extendedProps: { isInterview: true },
            };
          })
          .filter(Boolean) as EventInput[]; // ✅ Remove null values

        // Merge both property appointments and interviews
        setAppointments([...formattedAppointments, ...formattedInterviews]);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return appointments;
};

export default useAppointments;
