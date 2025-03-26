"use client";
import { useEffect } from "react";
import { fetchRescheduleDetails } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";

interface RescheduleDetailsProps {
  id: string;
  email: string;
  data: any;
  setData: (data: any) => void;
  setError: (error: string) => void;
}

const RescheduleDetails: React.FC<RescheduleDetailsProps> = ({
  id,
  email,
  data,
  setData,
  setError,
}) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchRescheduleDetails(id, email);
        if (!res) {
          setError("Reschedule details not found.");
          return;
        }
        setData(res);
      } catch (error) {
        setError("Failed to load reschedule details.");
      }
    };

    loadData();
  }, [id, email, setData, setError]);

  return (
    <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold text-center md:text-left text-gray-900 dark:text-gray-100">
        Scheduled Interview
      </h2>

      {/* ✅ Calendar Display - Just Shows Admin's Scheduled Date */}
      <div className="flex justify-center my-4">
        {data?.appointment?.admin_schedule ? (
          <Calendar
            mode="single"
            selected={new Date(data.appointment.admin_schedule)}
            month={new Date(data.appointment.admin_schedule)} // ✅ Ensure it starts on the scheduled month
            defaultMonth={new Date(data.appointment.admin_schedule)} // ✅ Force correct month on load
            disabled={() => true} // Prevent selection
          />
        ) : (
          <p className="text-gray-500">No scheduled interview.</p>
        )}
      </div>

      {/* ✅ Display Scheduled Time */}
      <div className="flex flex-col items-center mt-2">
        <label className="font-semibold text-gray-900 dark:text-gray-100">
          Scheduled Time:
        </label>
        <input
          type="time"
          className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={
            data?.appointment?.admin_schedule
              ? new Date(data.appointment.admin_schedule)
                  .toISOString()
                  .substring(11, 16)
              : ""
          }
          readOnly // Prevents editing
        />
      </div>

      {/* ✅ Admin Message */}
      <p className="mt-2 text-gray-900 dark:text-gray-100">
        <strong>Admin Message:</strong>{" "}
        {data?.appointment?.admin_message || "No message from admin"}
      </p>
    </div>
  );
};

export default RescheduleDetails;
