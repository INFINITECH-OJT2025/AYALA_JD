"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { submitProperty } from "@/lib/api";
import {
  Phone,
  MapPin,
  DollarSign,
  Home,
  CheckSquare,
  Car,
  Image as ImageIcon,
} from "lucide-react";
import { Textarea } from "../ui/textarea";

export function SubmitProperty() {
  const form = useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages([...selectedImages, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    console.log("Submitting Data:", data); // Debugging

    const formData = new FormData();

    // Convert features object into a JSON string before sending
    formData.append("features", JSON.stringify(data.features));

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "features") {
        formData.append(key, value as string);
      }
    });

    selectedImages.forEach((image) => formData.append("images[]", image));

    try {
      const response = await submitProperty(formData);
      console.log("Property submitted successfully", response);
    } catch (error) {
      console.error("Error submitting property", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 dark:bg-gray-800 bg-white shadow-xl rounded-lg mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-start">
        Want To Sell Your Property?
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Phone className="inline-block mr-2" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="property_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Home className="inline-block mr-2" />
                      Property Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Property Name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <MapPin className="inline-block mr-2" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Location"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="unit_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Car className="inline-block mr-2" />
                    Unit Status
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bare">Bare</SelectItem>
                      <SelectItem value="Semi-Furnished">
                        Semi-Furnished
                      </SelectItem>
                      <SelectItem value="Fully-Furnished">
                        Fully-Furnished
                      </SelectItem>
                      <SelectItem value="Interiored">Interiored</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="square_meter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Meter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Square Meter"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floor_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Floor Number"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parking</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Parking Availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="with">With Parking</SelectItem>
                      <SelectItem value="without">Without Parking</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Unit Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="studio type">Studio type</SelectItem>
                      <SelectItem value="1br">1BR</SelectItem>
                      <SelectItem value="2br">2BR</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type_of_listing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Listing Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel>Amenities</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Pool",
                  "Gym",
                  "Parking",
                  "Balcony",
                  "Security",
                  "Playground",
                  "Elevator",
                  "Concierge",
                  "Garden",
                ].map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name={`features.${feature}`}
                    render={({ field }) => (
                      <FormItem className="flex items-end gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>{feature}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter property description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <FormLabel>
              <ImageIcon className="inline-block mr-2" />
              Property Images
            </FormLabel>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-2"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    width={96}
                    height={96}
                    className="object-cover rounded-lg border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-0 right-0 p-1"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" variant="success" className="w-full text-lg">
            Submit Property
          </Button>
        </form>
      </Form>
    </div>
  );
}
