"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage,} from "@/components/ui/form";
import Image from "next/image";
import { submitProperty } from "@/lib/api";
import { Phone, MapPin, DollarSign, Home, CheckSquare, Car, Mail, Contact, Image as ImageIcon, AirVent, Grid2X2Check, Building2, List, Combine, PencilLine, Banknote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CreateListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateListingLand({ isOpen, onClose }: CreateListingDialogProps) {
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
    console.log("Submitting Data:", data);
  
    const formData = new FormData();
  
    // ✅ Convert type_of_listing to JSON string before sending
    formData.append("type_of_listing", JSON.stringify(data.type_of_listing));
  
    // ✅ Convert features to JSON string before sending
    const selectedFeatures = Object.keys(data.features).filter((key) => data.features[key] === true);
    formData.append("features", JSON.stringify(selectedFeatures));
  
    // ✅ Append all other form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "features" && key !== "type_of_listing") {
        formData.append(key, value as string);
      }
    });
  
    // ✅ Attach Admin User ID (Hardcoded for Now)
    formData.append("user_id", "1"); // Replace with actual admin ID dynamically
  
    // ✅ Append images
    selectedImages.forEach((image) => formData.append("property_image[]", image));
  
    try {
      const response = await submitProperty(formData);
      console.log("Property submitted successfully", response);
      onClose(); // Close dialog after submission
    } catch (error) {
      console.error("Error submitting property", error);
    }
  };
  

  const listingOptions = ["For Rent", "For Sale",];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[90vh] overflow-hidden p-6 sm:p-8 md:p-10 mx-auto rounded-lg">

        <DialogHeader>
          <DialogTitle>Submit Your Property</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] pr-4">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">Personal Information</h2>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="first_name" rules={{ required: "First Name is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Contact className="inline-block mr-2" />First Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="last_name" rules={{ required: "Last Name is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Contact className="inline-block mr-2" />Last Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" rules={{ required: "Email is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Mail className="inline-block mr-2" />Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone_number" rules={{ required: "Phone Number is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Phone className="inline-block mr-2" />Phone Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone Number" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Property Information */}
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-6">Property Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="property_name" rules={{ required: "Property Name is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Home className="inline-block mr-2" />Property Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Property Name" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="location" rules={{ required: "Location is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><MapPin className="inline-block mr-2" />Location <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="unit_status" rules={{ required: "Unit Status is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><AirVent className="inline-block mr-2" />Unit Status <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bare">Bare</SelectItem>
                        <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                        <SelectItem value="Fully-Furnished">Fully-Furnished</SelectItem>
                        <SelectItem value="Interiored">Interiored</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              
    
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <FormField control={form.control} name="price" rules={{ required: "Price is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Banknote className="inline-block mr-2" />Price <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        {...field}
                        value={field.value ? Number(field.value.replace(/,/g, "")).toLocaleString("en-US") : ""}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
                          if (!isNaN(Number(rawValue))) {
                            field.onChange(Number(rawValue).toLocaleString("en-US")); // Format as user types
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="square_meter" rules={{ required: "Square Meter is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Grid2X2Check className="inline-block mr-2" />Square Meter <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Square Meter" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="floor_number" rules={{ required: "Floor Number is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Building2 className="inline-block mr-2"/> Floor Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Floor Number" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <FormField control={form.control} name="parking" rules={{ required: "Parking selection is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Car className="inline-block mr-2" /> Parking <span className="text-red-500">*</span></FormLabel>
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
                )} />

                <FormField control={form.control} name="unit_type" rules={{ required: "Unit Type is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><Combine className="inline-block mr-2"/> Unit Type <span className="text-red-500">*</span></FormLabel>
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
                )} />

                <FormField control={form.control} name="type_of_listing" rules={{ required: "At least one listing type is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel><List className="inline-block mr-2" /> Listing Type <span className="text-red-500">*</span></FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {listingOptions.map((option) => (
                        <FormField
                          key={option}
                          control={form.control}
                          name="type_of_listing"
                          render={({ field }) => (
                            <FormItem className="flex items-end gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...(field.value || []), option] // Add selected option
                                      : field.value.filter((item: string) => item !== option); // Remove unchecked
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel>{option}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

    
              <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel><PencilLine className="inline-block mr-2"/> Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Enter property description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
    
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-6">General Features and Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Pool Area",
                    "Gym Fitness Center",
                    "Underground Parking",
                    "Balcony Terrace",
                    "Security",
                    "Pet Friendly Facilities",
                    "Elevator",
                    "Concierge Services",
                    "Guest Suite",
                    "Club House"
                  ].map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name={`features.${feature}`}
                      render={({ field }) => (
                        <FormItem className="flex items-end gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>{feature}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
    
                </div>
              </div>
    
    
              {/* Image Upload */}
              <div className="mt-4" >
              <FormLabel>Upload Images <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="file" multiple onChange={handleImageChange} className="mt-2" />
              </FormControl>
              <FormMessage />
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image src={URL.createObjectURL(image)} alt={`Selected ${index}`} width={96} height={96} className="object-cover rounded-lg border" />
                      <Button size="sm" variant="destructive" className="absolute top-0 right-0 p-1" onClick={() => removeImage(index)}>
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="default">
                Publish Property
              </Button>
              </div>
              
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
