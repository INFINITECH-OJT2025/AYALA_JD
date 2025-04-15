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
    const formData = new FormData();
    formData.append("property_id", propertyId.toString());
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      await sendPropertyInquiry(formData);
      toast.success("Inquiry sent successfully!");
      setForm({
        last_name: "",
        first_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#18181a] p-6 rounded-lg shadow-md w-full max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col">
      <div className="flex space-x-2 mb-4">
        <Button
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "inquiry"
              ? "bg-emerald-600 text-white"
              : "bg-emerald-400 dark:bg-emerald-200 hover:bg-emerald-500 dark:hover:bg-emerald-300"
          }`}
          onClick={() => setActiveTab("inquiry")}
        >
          Inquiry
        </Button>
        <Button
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "appointment"
              ? "bg-emerald-600 text-white"
              : "bg-emerald-400 dark:bg-emerald-200 hover:bg-emerald-500 dark:hover:bg-emerald-300"
          }`}
          onClick={() => setActiveTab("appointment")}
        >
          Appointment
        </Button>
      </div>

      {/* Scrollable Form Container */}
      <div className="flex-1 pr-2 p-2">
        {activeTab === "inquiry" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <FaQuestion className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span>Send Inquiry</span>
            </h3>
            <Input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-[#333333] text-black dark:text-white rounded-md p-2"
              required
            />
            <Input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="bg-gray-100 dark:bg-[#333333] text-black dark:text-white rounded-md p-2"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              className="bg-gray-100 dark:bg-[#333333] text-black dark:text-white rounded-md p-2"
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
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
            <Input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="bg-gray-100 dark:bg-[#333333] text-black dark:text-white rounded-md p-2"
              value={form.phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); // allow numbers only
                if (numericValue.length <= 11) {
                  setForm({ ...form, phone: numericValue });
                }
              }}
              maxLength={11}
              required
            />
            <div>
              <Textarea
                name="message"
                placeholder="Leave us a message..."
                value={form.message}
                className="bg-gray-100 dark:bg-[#333333] text-black dark:text-white rounded-md p-2"
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setForm({ ...form, message: e.target.value });
                  }
                }}
                required
              />
              <div className="text-sm text-gray-500 mt-1 text-left">
                {form.message.length} / 100 characters
              </div>
            </div>

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
                following personal data necessary to address your query. These
                data are protected under the Data Privacy Act and our Company's
                Private Notice.
              </label>
            </div>

            <Button
              type="submit"
              variant="success"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending... " : "Send Inquiry"}
            </Button>
          </form>
        ) : (
          <Appointment propertyId={propertyId} />
        )}
      </div>
    </div>
  );
}
