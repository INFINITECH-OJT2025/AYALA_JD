"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage,} from "@/components/ui/form";
import Image from "next/image";
import { submitProperty } from "@/lib/api";
import { Phone, MapPin, DollarSign, Home, CheckSquare, Car, Mail, Contact, Image as ImageIcon, AirVent, Grid2X2Check, Building2, List, Combine, PencilLine, Banknote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";

export default function SubmitPropertyPage() {
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

      // ✅ Convert type_of_listing to JSON string before sending
  formData.append("type_of_listing", JSON.stringify(data.type_of_listing));

    // ✅ Convert features object into an array before sending
    const selectedFeatures = Object.keys(data.features).filter(
      (key) => data.features[key] === true
    );
  
    formData.append("features", JSON.stringify(selectedFeatures)); // Send as JSON string
  
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "features" && key !== "type_of_listing") {
        formData.append(key, value as string);
      }
    });
  
    selectedImages.forEach((image) => formData.append("property_image[]", image));
  
    try {
      const response = await submitProperty(formData);
      console.log("Property submitted successfully", response);
    } catch (error) {
      console.error("Error submitting property", error);
    }
  };

  const listingOptions = ["For Rent", "For Sale",];



  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto p-8 dark:bg-gray-900 bg-white mt-4 mb-4 shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">Personal Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="first_name" render={({ field }) => (
              <FormItem>
                <FormLabel><Contact className="inline-block mr-2" />First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="last_name" render={({ field }) => (
              <FormItem>
                <FormLabel><Contact className="inline-block mr-2" />Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel><Mail className="inline-block mr-2" />Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone_number" render={({ field }) => (
            <FormItem>
              <FormLabel><Phone className="inline-block mr-2" />Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone Number" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        </div>

           {/* Property Information */}
           <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-6">Property Information</h2>
           <div className="grid grid-cols-3 gap-4">
            <FormField control={form.control} name="property_name" render={({ field }) => (
              <FormItem>
                <FormLabel><Home className="inline-block mr-2" />Property Name</FormLabel>
                <FormControl>
                  <Input placeholder="Property Name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel><MapPin className="inline-block mr-2" />Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
    

          <FormField control={form.control} name="unit_status" render={({ field }) => (
            <FormItem>
              <FormLabel><AirVent className="inline-block mr-2" />Unit Status</FormLabel>
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
          

          <div className="grid grid-cols-3 gap-4">
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel><Banknote className="inline-block mr-2" />Price</FormLabel>
                <FormControl>
                  <Input  placeholder="Price" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="square_meter" render={({ field }) => (
              <FormItem>
                <FormLabel><Grid2X2Check className="inline-block mr-2" /> Square Meter</FormLabel>
                <FormControl>
                  <Input  placeholder="Square Meter" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="floor_number" render={({ field }) => (
              <FormItem>
                <FormLabel><Building2 className="inline-block mr-2"/> Floor Number</FormLabel>
                <FormControl>
                  <Input  placeholder="Floor Number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
          <FormField control={form.control} name="parking" render={({ field }) => (
            <FormItem>
              <FormLabel><Car className="inline-block mr-2" /> Parking</FormLabel>
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

          <FormField control={form.control} name="unit_type" render={({ field }) => (
            <FormItem>
              <FormLabel><Combine className="inline-block mr-2"/> Unit Type</FormLabel>
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


            <FormField
              control={form.control}
              name="type_of_listing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><List className="inline-block mr-2" /> Listing Type</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
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
              )}
            />
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
          <div className="grid grid-cols-2 gap-4">
            <div>
            <div className="grid grid-cols-2 gap-2">
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
          <FormLabel><ImageIcon className="inline-block mr-2" />Property Images</FormLabel>
            <Input type="file" multiple onChange={handleImageChange} className="mt-2" />
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
            <div className="flex justify-end">
                 <Button type="submit" variant="success">Submit Property</Button>
            </div>

        </form>
      </Form>
    </div>
    <Footer/>
    </>
  );
}
