"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitApplication } from "@/lib/api";
import { toast } from "sonner";

export default function ApplicationModal({
  job,
  isOpen,
  onClose,
}: {
  job: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    resume: null as File | null,
  });

  const [error, setError] = useState("");
  const handleBlur = () => {
    if (!form.email) {
      setError("email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email");
    } else {
      setError("");
    }
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("job_title", job.title); // ✅ Send job title instead of job ID
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob);
    });

    try {
      await submitApplication(formData);
      toast.success(`Application submitted for ${job.title}! 🎉`);

      // ✅ Reset form after success
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        resume: null,
      });
      onClose();
    } catch (error: any) {
      // ✅ Check if error is due to duplicate application
      if (error.message.includes("already applied for this job")) {
        toast.error(
          "You've already applied for this job. Please check other opportunities."
        );
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {job?.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <Input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            required
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
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Input
            name="phone"
            placeholder="Phone No."
            value={form.phone}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              if (numericValue.length <= 11) {
                setForm({ ...form, phone: numericValue });
              }
            }}
            maxLength={11} // Ensures max input length
            required
          />

          <Input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Upload Resume or CV (PDF, DOC, DOCX, JPG, PNG)
            </label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.odt,.rtf,.jpg,.jpeg,.png"
              required
            />
          </div>

          <Button
            variant="success"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
