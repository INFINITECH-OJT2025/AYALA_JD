"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "@photo-sphere-viewer/core/index.css"; // ✅ Import styles
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

export default function PropertyImages({ property }: { property: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [is360ViewOpen, setIs360ViewOpen] = useState(false);

  return (
    <>
      {/* ✅ Image Preview with Click for 360° */}
      <div className="relative">
        {property.property_image?.length ? (
          <>
            <img
              src={property.property_image[currentImageIndex]}
              alt={`Property ${currentImageIndex + 1}`}
              className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover rounded-lg cursor-pointer"
              onClick={() => setIs360ViewOpen(true)} // ✅ Corrected function call
            />

            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-black/80 transition"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? property.property_image.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-black/80 transition"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  (prev + 1) % property.property_image.length
                )
              }
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No images available</p>
        )}
      </div>

      {/* ✅ 360° Viewer Modal */}
      <Dialog open={is360ViewOpen} onOpenChange={setIs360ViewOpen}>
        <DialogContent className="max-w-5xl w-full">
          <DialogTitle className="text-lg font-semibold">360° View</DialogTitle>

          {/* ✅ Ensure it loads the correct image */}
          {/* <ReactPhotoSphereViewer
             src={property.property_image[currentImageIndex]} // ✅ Fix: Ensure it uses the correct image
            height={"80vh"}
            width={"100%"}
          /> */}
          {/* <img src={property.property_image[currentImageIndex]} alt={property as string}/> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
