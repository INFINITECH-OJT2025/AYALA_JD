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
import { Megaphone } from "lucide-react";

export default function TestimonialModal() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="success"
          className="px-6 py-2 text-md font-semibold"
            >
          Share your experience
          <Megaphone/>
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700 p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Share your experience
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
            We'd love to hear your thoughts! Fill out the form below to submit
            your testimonial.
          </DialogDescription>
        </DialogHeader>

        {/* ⭐ Star Rating with Label */}
        <div>
          <label className="text-sm font-medium block mb-1 text-gray-900 dark:text-white">
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
          className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600 p-2 rounded-md mt-2"
        />

        <Textarea
          placeholder="Share your experience"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600 p-2 rounded-md mt-2"
        />

        <div>
          <label className="text-sm font-medium block mb-1 text-gray-900 dark:text-white">
            Profile Photo (optional)
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, photo: e.target.files?.[0] || null })
            }
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600 p-2 rounded-md mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1 text-gray-900 dark:text-white">
            Upload Images/Videos
          </label>
          <Input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 3) {
                toast.error("You can only upload up to 3 media files.");
                return;
              }
              setForm({ ...form, media: files });
            }}
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600 p-2 rounded-md mt-2"
          />
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            {form.media
              ? `${form.media.length} / 3 files selected`
              : `No files selected`}
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
