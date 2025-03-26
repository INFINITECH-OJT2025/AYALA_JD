import { useEffect, useState } from "react";
import { submitReschedule } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Upload } from "lucide-react";
import { toast } from "sonner";

interface RescheduleFormProps {
    id: string;
    email: string;
    data: any;
    setData: (data: any) => void; // ✅ Ensure this is included
  }
  
const RescheduleForm: React.FC<RescheduleFormProps> = ({ id, email, data, setData }) => {
  const [newSchedule, setNewSchedule] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<string>("");

  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    if (data?.appointment?.admin_schedule) {
      const scheduledDate = new Date(data.appointment.admin_schedule);

      if (!isNaN(scheduledDate.getTime())) {
        const validDates: Date[] = [];
        let tempDate = new Date(scheduledDate);
        tempDate.setDate(tempDate.getDate() + 0); // ✅ Move this outside the loop to start at +1 day

        // ✅ Generate the next 7 valid weekdays
        while (validDates.length < 8) {
          if (tempDate.getDay() !== 0 && tempDate.getDay() !== 6) {
            validDates.push(new Date(tempDate));
          }
          tempDate.setDate(tempDate.getDate() + 1);
        }

        setMinDate(validDates[0]);
        setMaxDate(validDates[validDates.length - 1]);
      }
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!newSchedule || !time) {
      toast.error("Please select both a date and time.");
      return;
    }
  
    if (minDate && maxDate && (newSchedule < minDate || newSchedule > maxDate)) {
      toast.error(
        `You can only request a reschedule between ${minDate.toDateString()} and ${maxDate.toDateString()}.`
      );
      return;
    }
  
    const formattedDateTime = new Date(newSchedule);
    const [hours, minutes] = time.split(":");
    formattedDateTime.setHours(parseInt(hours, 10));
    formattedDateTime.setMinutes(parseInt(minutes, 10));
    formattedDateTime.setSeconds(0);
  
    const formattedDateTimeString = formattedDateTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  
    const formData = new FormData();
    formData.append("applicant_id", id);
    formData.append("email", email);
    formData.append("new_schedule", formattedDateTimeString);
    formData.append("message", message);
    if (file) {
      formData.append("file", file, file.name);
    }
  
    setLoading(true);
    try {
      await submitReschedule(formData);
      toast.success("Reschedule request submitted successfully.");
  
      // ✅ Refetch updated data
      const response = await fetch(`http://127.0.0.1:8000/api/reschedule/${id}?email=${email}`);
      if (!response.ok) throw new Error("Failed to fetch updated data.");
      const updatedData = await response.json();
      setData(updatedData); // ✅ Update the state
    } catch (error) {
      toast.error("Failed to submit reschedule request.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return data?.reschedule?.id ? (
    <div className="flex-1 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-center md:text-left text-gray-900 dark:text-gray-100">
        Your Submitted Reschedule Request
      </h3>

      <div className="my-4 flex justify-center">
        <Calendar
          mode="single"
          selected={new Date(data.reschedule.new_schedule)}
          month={new Date(data.reschedule.new_schedule)} // ✅ Start on the scheduled month
          disabled={() => true} // Prevent selection
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Selected Time
        </label>
        <input
          type="time"
          value={new Date(data.reschedule.new_schedule)
            .toISOString()
            .substring(11, 16)}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-300 dark:bg-gray-600 border-gray-400 text-gray-900 dark:text-gray-100"
        />
      </div>

      <Textarea
        className="mt-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
        placeholder="No message provided"
        value={data.reschedule.applicant_message || ""}
        readOnly
      />

      {data.reschedule.file_path && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Uploaded File:
          </p>
          <a
            href={data.reschedule.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            View File
          </a>
        </div>
      )}

      <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-semibold text-center max-w-xs mx-auto">
        You have already submitted a reschedule request. You cannot request
        another one.
      </p>

      <Button variant="success" disabled className="mt-2 w-full">
        Request Submitted
      </Button>
    </div>
  ) : (
    <div className="flex-1 ">
      <div className="my-4 flex justify-center">
        <Calendar
          mode="single"
          selected={newSchedule || undefined}
          month={newSchedule || minDate || new Date()} // ✅ Start at selected date or first allowed date
          defaultMonth={minDate || new Date()} // ✅ Force calendar to open on the correct month
          onSelect={(date) => {
            if (
              date &&
              minDate &&
              maxDate &&
              date >= minDate &&
              date <= maxDate
            ) {
              setNewSchedule(date);
            } else {
              toast.error(
                `Please select a valid weekday between ${minDate?.toDateString()} and ${maxDate?.toDateString()}.`
              );
            }
          }}
          disabled={(date) =>
            !minDate ||
            !maxDate ||
            date < minDate ||
            date > maxDate ||
            date.getDay() === 0 ||
            date.getDay() === 6
          }
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Select Time
        </label>
        <div className="relative">
          <Clock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => {
              const selectedTime = e.target.value;
              if (selectedTime >= "08:00" && selectedTime <= "17:00") {
                setTime(selectedTime);
              } else {
                setTime("");
                toast.error(
                  "Please select a time between 08:00 AM and 05:00 PM."
                );
              }
            }}
            min="08:00"
            max="17:00"
            className="w-full p-2 pl-10 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <Textarea
        className="mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        placeholder="Enter your message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="my-4">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer text-blue-600 dark:text-blue-400"
        >
          <Upload size={18} /> {file ? file.name : "Upload File (Optional)"}
        </label>
      </div>

      <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-semibold text-center max-w-xs mx-auto">
        ⚠️ You can only submit this request **once**. Think carefully before
        proceeding.
      </p>

      <Button
        variant="success"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 w-full"
      >
        {loading ? "Submitting..." : "Submit Reschedule"}
      </Button>
    </div>
  );
};
export default RescheduleForm;
