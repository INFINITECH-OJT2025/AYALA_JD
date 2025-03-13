"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  imageUrl: string; // Pass the image URL dynamically
}

const ImageDialog: React.FC<ImageDialogProps> = ({ isOpen, setIsOpen, imageUrl }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl w-full">
        <DialogTitle className="text-lg font-semibold">360° View</DialogTitle>

        {/* ✅ Ensure it loads the correct image */}
        <img src={imageUrl} alt="360° View" className="w-full h-auto object-cover" />

         {/* <ReactPhotoSphereViewer
            src={property.property_image[currentImageIndex]} // ✅ Fix: Ensure it uses the correct image
            height={"80vh"}
            width={"100%"}
          /> */}
        
        {/* ✅ Alternative (If using ReactPhotoSphereViewer) */}
        {/* <ReactPhotoSphereViewer src={imageUrl} height="80vh" width="100%" /> */}
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
