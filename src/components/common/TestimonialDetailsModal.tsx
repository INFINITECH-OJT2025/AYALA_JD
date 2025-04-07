"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  photo: string | null;
  media: string[];
  status: string;
  photo_url?: string;
  media_urls?: string[];
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
  const [fullscreenMedia, setFullscreenMedia] = useState<string | null>(null);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          // Prevent closing from outside click or escape
          if (!val) {
            onClose();
          }
        }}
      >
        <DialogContent
          className="max-w-2xl p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-gray-900 dark:text-white">
              {testimonial.name}'s Testimonial
            </DialogTitle>
          </DialogHeader>

          {/* Avatar Section */}
          {testimonial.photo_url && (
            <div className="flex justify-center mt-2">
              <img
                src={testimonial.photo_url}
                alt="Client Avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setFullscreenMedia(testimonial.photo_url!)}
              />
            </div>
          )}

          {/* Rating */}
          <div className="text-center text-lg text-gray-900 dark:text-white">
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < testimonial.rating ? "#facc15" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.48 3.499l2.644 5.353 5.91.857-4.277 4.173 1.01 5.887L11.5 17.5l-5.266 2.77 1.01-5.887-4.277-4.173 5.91-.857 2.623-5.353z"
                  />
                </svg>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <strong className="text-gray-900 dark:text-white">
              Experience:
            </strong>
            <p className="text-gray-600 dark:text-gray-300 mt-1 max-h-40 overflow-y-auto p-4 text-justify bg-gray-50 dark:bg-gray-700 rounded-lg">
              {testimonial.experience}
            </p>
          </div>

          {/* Media Section */}
          {testimonial.media_urls && testimonial.media_urls.length > 0 && (
            <div className="mt-4">
              <strong className="text-gray-900 dark:text-white">Media:</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                {testimonial.media_urls.map((file, idx) =>
                  file.endsWith(".mp4") ? (
                    <video
                      key={idx}
                      src={file}
                      controls
                      onClick={() => setFullscreenMedia(file)}
                      className="w-40 h-40 rounded-md bg-black cursor-pointer hover:scale-105 transition-transform"
                    />
                  ) : (
                    <img
                      key={idx}
                      src={file}
                      alt={`Media ${idx}`}
                      onClick={() => setFullscreenMedia(file)}
                      className="w-40 h-40 object-cover rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform"
                    />
                  )
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Fullscreen Media Preview */}
      {/* Fullscreen Media View */}
      {fullscreenMedia && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setFullscreenMedia(null)}
          style={{ pointerEvents: "auto" }} // ensure click events are received
        >
          {/* X Button */}
          <button
            className="absolute top-4 right-4 text-white z-[10000]"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking the button
              setFullscreenMedia(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Media Content */}
          <div
            className="max-w-full max-h-full z-[9999] flex justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking media
          >
            {fullscreenMedia.endsWith(".mp4") ? (
              <video
                src={fullscreenMedia}
                controls
                autoPlay
                className="max-h-[90vh] rounded-lg"
              />
            ) : (
              <img
                src={fullscreenMedia}
                alt="Fullscreen"
                className="max-h-[90vh] rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
