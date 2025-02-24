"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Home, ClipboardList, Image, CheckSquare } from "lucide-react";

export function SubmitProperty() {
  return (
    <div className="mx-auto p-8 mb-10 mt-5 bg-white">
      <h2 className="text-3xl font-bold text-start mb-8">
        Want to sell properties?
      </h2>

      <div className="space-y-8">
        {/* Personal Info */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" /> Personal Info
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Input className="text-lg py-5 px-7" name="first_name" placeholder="First Name" />
            <Input className="text-lg py-5 px-7" name="last_name" placeholder="Last Name" />
            <Input className="text-lg py-5 px-7" name="email" placeholder="Email" type="email" />
            <Input className="text-lg py-5 px-7" name="phone_number" placeholder="Phone Number" />
          </div>
        </div>

        {/* Type of Listing */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Type of Listing
          </h3>
          <div className="flex gap-6 mt-3">
            <Label className="flex items-center gap-3 text-md">
              <Checkbox className="w-6 h-6" /> For Rent
            </Label>
            <Label className="flex items-center gap-3 text-md">
              <Checkbox className="w-6 h-6" /> For Sale
            </Label>
          </div>
        </div>

        {/* Property Info */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Home className="w-5 h-5" /> Property Info
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Input className="text-lg py-5 px-7" name="property_name" placeholder="Property Name" />
            <Select>
              <SelectTrigger className="text-sm py-5 px-7">
                <SelectValue placeholder="Unit Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1br">1BR</SelectItem>
                <SelectItem value="2br">2BR</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-sm py-5 px-7">
                <SelectValue placeholder="Unit Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bare">Bare</SelectItem>
                <SelectItem value="semi">Semi-Furnished</SelectItem>
                <SelectItem value="fully">Fully Furnished</SelectItem>
                <SelectItem value="interiored">Interiored</SelectItem>
              </SelectContent>
            </Select>
            <Input className="text-lg py-5 px-7" name="location" placeholder="Location" />
            <Input className="text-lg py-5 px-7" name="price" placeholder="Price" />
            <Input className="text-lg py-5 px-7" name="square_meter" placeholder="Square Meter" />
            <Input className="text-lg py-5 px-7" name="floor_number" placeholder="Floor Number" />
            <Select>
              <SelectTrigger className="text-sm py-5 px-7">
                <SelectValue placeholder="Parking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="with">With Parking</SelectItem>
                <SelectItem value="without">Without Parking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Features and Amenities */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CheckSquare className="w-5 h-5" /> Features and Amenities
          </h3>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {[
              "Pool Area",
              "Guest Suite",
              "Underground Parking",
              "Pet-Friendly Facilities",
              "Balcony/Terrace",
              "Club House",
              "Gym/Fitness Center",
              "Elevator",
              "Concierge Services",
              "Security",
            ].map((feature) => (
              <Label key={feature} className="flex items-center gap-3 text-md">
                <Checkbox className="w-6 h-6" /> {feature}
              </Label>
            ))}
          </div>
        </div>

        {/* Property Image */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Image className="w-5 h-5" /> Property Image
          </h3>
          <Input type="file" accept="image/*" className="mt-3 text-lg p-3" />
        </div>
      </div>
    </div>
  );
}
