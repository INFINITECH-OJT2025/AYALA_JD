"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Defining the Testimonial type inline
type Testimonial = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  photo: string | null;
  media: string[]; // URLs for media (images or videos)
  status: number; // 0 = unpublished, 1 = published
  photo_url?: string; // URL to access the photo
  media_urls?: string[]; // URLs to access the media
};

type TestimonialDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  testimonial: Testimonial;
};

export default function TestimonialDetailsModal({
  open,
  onClose,
  testimonial,
}: TestimonialDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>{testimonial.name}'s Testimonial</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <strong>Rating:</strong> {testimonial.rating} ★
        </div>

        <div className="mt-2">
          <strong>Experience:</strong>
          <p className="text-gray-600">{testimonial.experience}</p>
        </div>

        {testimonial.photo_url && (
          <div className="mt-4 flex items-center">
            <strong className="mr-3">Photo:</strong>
            <img
              src={testimonial.photo_url} // Using the public URL for photo
              alt="Client Photo"
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
            />
          </div>
        )}

        {testimonial.media_urls && testimonial.media_urls.length > 0 && (
          <div className="mt-4">
            <strong>Media:</strong>
            <div className="flex flex-wrap gap-4 mt-2">
              {testimonial.media_urls.map((file, idx) =>
                file.endsWith(".mp4") ? (
                  <video
                    key={idx}
                    src={file}
                    controls
                    className="w-40 h-40 rounded-md bg-black"
                  />
                ) : (
                  <img
                    key={idx}
                    src={file}
                    alt={`Media ${idx}`}
                    className="w-40 h-40 object-cover rounded-md shadow-md"
                  />
                )
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
