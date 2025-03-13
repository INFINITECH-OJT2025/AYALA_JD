"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitApplication } from "@/lib/api";
import { toast } from "sonner";

export default function ApplicationModal({ job, isOpen, onClose }: { job: any; isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    resume: null as File | null,
  });

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
    formData.append("id", job.id);
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob);
    });

    try {
      await submitApplication(formData);
      toast.success(`Application submitted for ${job.title}! 🎉`);
      setForm({ first_name: "", last_name: "", email: "", phone: "", address: "", resume: null });
      onClose();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
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
          <Input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
          <Input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone No." value={form.phone} onChange={handleChange} required />
          <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <Input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
