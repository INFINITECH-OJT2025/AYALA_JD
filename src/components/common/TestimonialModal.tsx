"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendTestimonial } from "@/lib/api";

export default function TestimonialModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    experience: "",
    photo: null as File | null,
    media: [] as File[],
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("rating", form.rating.toString());
    formData.append("experience", form.experience);
    if (form.photo) formData.append("photo", form.photo);
    form.media.forEach((file) => formData.append("media[]", file));

    try {
      await sendTestimonial(formData);
      toast.success("Thank you for your testimonial!");
      setOpen(false);
      setForm({ name: "", rating: 0, experience: "", photo: null, media: [] });
    } catch (err: any) {
      toast.error(err.message || "Submission failed.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Share it with us</Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
          <DialogDescription>
            We'd love to hear your thoughts! Fill out the form below to submit
            your testimonial.
          </DialogDescription>
        </DialogHeader>

        {/* ⭐ Star Rating with Label */}
        <div>
          <label className="text-sm font-medium block mb-1">
            How would you rate us?
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm({ ...form, rating: star })}
                className={`text-2xl ${
                  form.rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <Input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Textarea
          placeholder="Share your experience"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <div>
          <label className="text-sm font-medium block mb-1">Self Photo</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, photo: e.target.files?.[0] || null })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">
            Upload Images/Videos
          </label>
          <Input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) =>
              setForm({ ...form, media: Array.from(e.target.files || []) })
            }
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Submit Testimonial
        </Button>
      </DialogContent>
    </Dialog>
  );
}
