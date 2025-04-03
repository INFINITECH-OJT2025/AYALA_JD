"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendInquiry } from "@/lib/api";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    inquiry_type: "",
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false); // Consent checkbox state

  const handleBlur = () => {
    if (!form.email) {
      setError("email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email");
    } else {
      setError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, inquiry_type: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if consent is not given
    if (!consent) {
      toast.error("You must agree to the privacy policy before submitting.");
      return;
    }

    // Check if inquiry type is selected
    if (!form.inquiry_type) {
      toast.error("Please select an inquiry type.");
      return;
    }

    setLoading(true);

    try {
      await sendInquiry(form); // Assuming sendInquiry function exists
      toast.success("Inquiry sent successfully! 🎉");

      // Reset form after successful submission
      setForm({
        inquiry_type: "",
        last_name: "",
        first_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Send Us an Inquiry
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Inquiry Type */}
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500">
            <SelectValue placeholder="What can we help you with?" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:text-white">
            <SelectItem value="Sale Inquiry">Sales Inquiry</SelectItem>
            <SelectItem value="Leasing Inquiry">Leasing Inquiry</SelectItem>
            <SelectItem value="Customer Care">
              Customer Care Concerns
            </SelectItem>
            <SelectItem value="Other Concern">Other Concerns</SelectItem>
          </SelectContent>
        </Select>

        {/* Form Inputs */}
        <Input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
          className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
        <Input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
          className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (numericValue.length <= 11) {
              setForm({ ...form, phone: numericValue });
            }
          }}
          required
          className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />

        <Textarea
          name="message"
          placeholder="Leave us a message..."
          value={form.message}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              handleChange(e); // Allow input only if within 50 characters
            }
          }}
          required
          className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {form.message.length}/250 characters
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

        {/* Submit Button */}
        <Button
          type="submit"
          variant="success"
          disabled={loading}
          className="w-full mt-4"
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </Button>
      </form>
    </div>
  );
}
