import AdminCalendar from "@/components/calendar/adminCalendar";
import React from "react";

const CalendarPage = () => {
  return (
    <div className="min-h-screen p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Admin Calendar</h1>
      <AdminCalendar />
    </div>
  );
};

export default CalendarPage;
