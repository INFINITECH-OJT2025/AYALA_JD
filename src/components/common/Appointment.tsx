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

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("You must agree to the privacy policy before submitting.");
      return;
    }
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Book an On-Site Viewing</span>
      </h3>

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
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => {
          handleChange(e);
          setEmailError(""); // Clear error when typing
        }}
        onBlur={() => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setEmailError("Please enter a valid email address.");
          }
        }}
        required
      />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

      <Input
        name="phone"
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, ""); // Only numbers
          if (numericValue.length <= 11) {
            setForm({ ...form, phone: numericValue });
          }
        }}
        maxLength={11}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            type="date"
            name="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]} // Prevents past dates
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
        onChange={(e) => {
          if (e.target.value.length <= 100) {
            handleChange(e); // Restricts input to 100 characters
          }
        }}
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {form.message.length}/100 characters
      </p>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <label
          htmlFor="consent"
          className="text-sm text-gray-600 dark:text-gray-300 text-justify"
        >
          By clicking, you consent to the collection and processing of the
          following personal data necessary to address your query. These data
          are protected under the Data Privacy Act and our Company's Private
          Notice.
        </label>
      </div>

      <Button
        type="submit"
        variant="success"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Book Appointment"}
      </Button>
    </form>
  );
}
