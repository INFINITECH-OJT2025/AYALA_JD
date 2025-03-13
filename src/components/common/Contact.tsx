"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, inquiry_type: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendInquiry(form);
      toast.success("Inquiry sent successfully! 🎉");
      setForm({ inquiry_type: "", last_name: "", first_name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Send Us an Inquiry</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Inquiry Type */}
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500">
            <SelectValue placeholder="What can we help you with?" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:text-white">
            <SelectItem value="Sale Inquiry">Sales Inquiry</SelectItem>
            <SelectItem value="Leasing Inquiry">Leasing Inquiry</SelectItem>
            <SelectItem value="Customer Care">Customer Care Concerns</SelectItem>
            <SelectItem value="Other Concern">Other Concerns</SelectItem>
          </SelectContent>
        </Select>

        {/* Form Inputs */}
        <Input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500" />
        <Input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500" />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500" />
        <Input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500" />
        <Textarea name="message" placeholder="Leave us a message..." value={form.message} onChange={handleChange} required className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500" />

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white mt-4">
          {loading ? "Sending..." : "SEND INQUIRY"}
        </Button>
      </form>
    </div>
  );
}
