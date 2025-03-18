"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Appointment({ propertyId }: { propertyId: number }) {
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = { ...form, property_id: propertyId }; // ✅ Include property_id

    try {
      const res = await fetch("http://127.0.0.1:8000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (!res.ok) throw new Error("Failed to book appointment");

      toast.success("Appointment booked successfully! 📅✅");
      setForm({
        last_name: "",
        first_name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Book an On-Site Viewing</span>
      </h3>
      <p className="text-gray-500 dark:text-gray-300 text-sm">
        Select your preferred date and time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <Input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative">
          <Input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      <Textarea
        name="message"
        placeholder="Leave us a message..."
        value={form.message}
        onChange={handleChange}
      />
      <Button
        type="submit"
        className="w-full bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white"
      >
        BOOK APPOINTMENT
      </Button>
    </form>
  );
}
