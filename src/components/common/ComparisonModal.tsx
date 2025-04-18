"use client";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  XCircle,
  CheckCircle,
  Home,
  MapPin,
  Ruler,
  Layers,
  ParkingCircle,
  Building2Icon,
  Tag,
  HouseIcon,
  PlusCircle,
} from "lucide-react";
import { Property } from "@/components/types/property";
import {
  FaSwimmer,
  FaBed,
  FaParking,
  FaPaw,
  FaBuilding,
  FaDumbbell,
  FaConciergeBell,
} from "react-icons/fa";
import Link from "next/link";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import { Button } from "../ui/button";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperties: Property[];
  removeFromComparison: (propertyId: number) => void;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  selectedProperties,
  removeFromComparison,
}: ComparisonModalProps) {
  useEffect(() => {
    if (isOpen && selectedProperties.length === 0) {
      onClose(); // Close modal when all properties are removed
    }
  }, [selectedProperties, isOpen, onClose]);

  
  const exportToPDF = (selectedProperties: Property[]) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width; // Get page width
    const margin = 14; // Left margin
    const logoWidth = 15; // Smaller logo width in mm
    const logoHeight = 10; // Adjusted height to maintain aspect ratio
  
    // ** Function to Add Header (Logo + Company Name + Date) **
    const addHeader = () => {
      const logo = "/logo.png"; // Ensure this image is in the public folder
  
      // Move the logo to the top right
      doc.addImage(logo, "PNG", pageWidth - margin - logoWidth, 5, logoWidth, logoHeight);
  
      // Company Name
      doc.setFontSize(14);
      doc.text("AyalaLand", margin, 10); // Aligned to the left
  
      // Report Title
      doc.setFontSize(12);
      doc.text("Property Comparison Report", margin, 16);
  
      // Date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 22);
  
      // Horizontal line
      doc.line(margin, 24, pageWidth - margin, 24);
    };
  
    // Add Header on First Page
    addHeader();
  
    // Define row headers (property attributes), excluding "ID"
    const rowHeaders = [
      "Property Name",
      "Listing Type",
      "Unit Type",
      "Status",
      "Location",
      "Price",
      "Square Meter",
      "Floor Number",
      "Parking",
      "Pool Area",
      "Guest Suite",
      "Underground Parking",
      "Pet Friendly",
      "Balcony/Terrace",
      "Club House",
      "Gym/Fitness",
      "Elevator",
      "Concierge Services",
      "Security",
    ];
  
    // Transpose data: Make property attributes rows and properties columns
    const tableRows = rowHeaders.map((header, index) => {
      return [
        header, // The row header (e.g., "Property Name")
        ...selectedProperties.map((property) => {
          // Extract corresponding values based on index, excluding the "id"
          const values = [
            property.property_name,
            property.type_of_listing,
            property.unit_type,
            property.unit_status,
            property.location,
            property.price,
            property.square_meter,
            property.floor_number,
            property.parking ? "Yes" : "No",
            property.pool_area ? "Yes" : "No",
            property.guest_suite ? "Yes" : "No",
            property.underground_parking ? "Yes" : "No",
            property.pet_friendly_facilities ? "Yes" : "No",
            property.balcony_terrace ? "Yes" : "No",
            property.club_house ? "Yes" : "No",
            property.gym_fitness_center ? "Yes" : "No",
            property.elevator ? "Yes" : "No",
            property.concierge_services ? "Yes" : "No",
            property.security ? "Yes" : "No",
          ];
          return values[index]; // Get the corresponding value for this row
        }),
      ];
    });
  
    // Generate table
    autoTable(doc, {
      head: [], // No column headers needed
      body: tableRows,
      startY: 30, // Start below the header
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
      columnStyles: { 0: { fontStyle: "bold" } }, // Make first column bold for row headers
      didDrawPage: addHeader, // Ensure header is drawn on each page
    });
  
    // Save PDF
    doc.save("property_comparison.pdf");
  };
  
  

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevents closing on other clicks
    onClose(); // ✅ Close modal only when PlusCircle is clicked
  };
  // Ensure the layout always has 3 cards by filling empty slots with placeholders
  const propertySlots = [
    ...selectedProperties,
    ...Array(Math.max(0, 3 - selectedProperties.length)).fill(null),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[95vh] overflow-hidden p-6 sm:p-8 md:p-10 mx-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex justify-between">
            Compare Properties
            <Button
              onClick={() => exportToPDF(selectedProperties)}
              variant="default"
            >
              Export to PDF
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div id="comparison-modal" className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {propertySlots.map((property, index) =>
              property ? (
                // ✅ Property card (clickable, removable)
                <Link
                  key={property.id}
                  href={`/landing/property/${property.id}`}
                  className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 block hover:shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <Image
                      src={property.property_image?.[0] || "/placeholder.jpg"}
                      alt={property.property_name}
                      width={300}
                      height={200}
                      className="rounded-md object-cover w-full h-40 md:h-48"
                    />
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromComparison(property.id); // ✅ Remove only this property
                      }}
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <h3 className="mt-2 text-sm md:text-lg font-bold flex items-center">
                    <Home className="w-4 h-4 mr-2" /> {property.property_name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {property.location}
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-lg">
                    ₱
                    {Number(property.price).toLocaleString("en-PH", {
                      minimumFractionDigits: 2, // Always show two decimal places
                      maximumFractionDigits: 2, // Prevents extra decimals
                    })}
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <p className="flex items-center">
                      <Ruler className="w-4 h-4 mr-1" /> {property.square_meter}{" "}
                      sqm
                    </p>
                    <p className="flex items-center">
                      <Layers className="w-4 h-4 mr-1" /> Floor{" "}
                      {property.floor_number}
                    </p>
                    <p className="flex items-center">
                      <ParkingCircle className="w-4 h-4 mr-1" /> Parking:{" "}
                      {property.parking}
                    </p>
                    <p className="flex items-center">
                      <HouseIcon className="w-4 h-4 mr-1" />{" "}
                      {property.unit_status}
                    </p>
                    <p className="flex items-center">
                      <Building2Icon className="w-4 h-4 mr-1" />{" "}
                      {property.unit_type}
                    </p>
                    <p className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {Array.isArray(property.type_of_listing)
                        ? property.type_of_listing.join(" / ") // ✅ Space between items
                        : property.type_of_listing}
                    </p>
                  </div>

                  <h4 className="font-semibold mt-3">🏢 Amenities:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
                    {[
                      {
                        label: "Pool",
                        value: property.pool_area,
                        icon: FaSwimmer,
                      },
                      {
                        label: "Guest Suite",
                        value: property.guest_suite,
                        icon: FaBed,
                      },
                      {
                        label: "Underground Parking",
                        value: property.underground_parking,
                        icon: FaParking,
                      },
                      {
                        label: "Pet-Friendly",
                        value: property.pet_friendly_facilities,
                        icon: FaPaw,
                      },
                      {
                        label: "Club House",
                        value: property.club_house,
                        icon: FaBuilding,
                      },
                      {
                        label: "Gym",
                        value: property.gym_fitness_center,
                        icon: FaDumbbell,
                      },
                      {
                        label: "Concierge Services",
                        value: property.concierge_services,
                        icon: FaConciergeBell,
                      },
                      {
                        label: "Balcony/Terrace",
                        value: property.balcony_terrace,
                        icon: FaConciergeBell,
                      },
                      {
                        label: "Elevator",
                        value: property.elevator,
                        icon: FaConciergeBell,
                      },
                      {
                        label: "Security",
                        value: property.security,
                        icon: FaConciergeBell,
                      },
                    ].map(({ label, value, icon: Icon }, index) => (
                      <p key={index} className="flex items-center">
                        {value ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 mr-1" />
                        )}{" "}
                        {label}
                      </p>
                    ))}
                  </div>
                </Link>
              ) : (
                // ✅ Placeholder card when a property is removed
                <div
                  key={`placeholder-${index}`}
                  className="border rounded-lg p-6 shadow-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                >
                  <button onClick={handleClose}>
                    <PlusCircle className="w-10 h-10 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition" />
                  </button>
                  <p className="text-sm font-medium">
                    Add Properties to Compare
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
