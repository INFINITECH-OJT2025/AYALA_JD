"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Appointment from "./Appointment"; 
import { FaQuestion } from "react-icons/fa";
import { sendPropertyInquiry } from "@/lib/api";
import { toast } from "sonner";

export default function Inquiry({ propertyId }: { propertyId: number }) {
  const [activeTab, setActiveTab] = useState("inquiry");
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property_id", propertyId.toString());
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      await sendPropertyInquiry(formData);
      toast.success("Inquiry sent successfully!");
      setForm({ last_name: "", first_name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full h-[70vh] max-w-lg">
      <div className="flex space-x-2 mb-4">
        <Button
          className={`px-4 py-2 rounded-md ${activeTab === "inquiry" ? "bg-blue-600 text-white" : "bg-blue-400 dark:bg-blue-200"}`}
          onClick={() => setActiveTab("inquiry")}
        >
          Inquiry
        </Button>
        <Button
          className={`px-4 py-2 rounded-md ${activeTab === "appointment" ? "bg-blue-600 text-white" : "bg-blue-400 dark:bg-blue-200"}`}
          onClick={() => setActiveTab("appointment")}
        >
          Appointment
        </Button>
      </div>

      {activeTab === "inquiry" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            <FaQuestion className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span>Send Inquiry</span>
          </h3>
          <Input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
          <Input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <Textarea name="message" placeholder="Leave us a message..." value={form.message} onChange={handleChange} required />
          <Button type="submit" className="w-full bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white">
            SEND INQUIRY
          </Button>
        </form>
      ) : (
        <Appointment propertyId={propertyId} />
      )}
    </div>
  );
}
