"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Define validation schemas
const inquirySchema = z.object({
  lastName: z.string().min(1, "Last Name is required"),
  firstName: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().regex(/^(\+63|0)[\d]{10}$/, "Invalid phone number"),
  message: z.string().optional(),
});

const appointmentSchema = inquirySchema.extend({
  date: z.date({ required_error: "Date is required" }).nullable(),
  time: z.string().min(1, "Time is required"),
});

// ✅ Type-safe form handling
type InquiryForm = z.infer<typeof inquirySchema>;
type AppointmentForm = z.infer<typeof appointmentSchema>;

export function Inquiries() {
  const [tab, setTab] = useState<"inquiry" | "appointment">("inquiry");

  // ✅ Correctly set the schema based on selected tab
  const form = useForm<InquiryForm | AppointmentForm>({
    resolver: zodResolver(tab === "inquiry" ? inquirySchema : appointmentSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      message: "",
      date: null, // Only used in appointment
      time: "", // Only used in appointment
    } as any, // Bypass TypeScript conflict
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: InquiryForm | AppointmentForm) => {
    console.log("Form Data:", data);
    alert(`Successfully submitted ${tab.toUpperCase()}`);
  };

  return (
    <div className="w-full mx-auto">
        <Tabs defaultValue="inquiry" onValueChange={(v) => setTab(v as "inquiry" | "appointment")}>
            <TabsList className="flex">
            <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
            <TabsTrigger value="appointment">Appointment</TabsTrigger>
            </TabsList>

            <div className="relative w-full">
            <Card className="min-h-[470px] flex flex-col justify-between"> {/* Ensures a fixed height */}
                <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">
                    {tab === "inquiry" ? "Send Inquiry" : "Book an On-Site Viewing"}
                </h3>

                {/* Common Fields */}
                <Input placeholder="Last Name" {...register("lastName")} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

                <Input placeholder="First Name" {...register("firstName")} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

                <Input placeholder="Email" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <Input placeholder="Phone Number" {...register("phoneNumber")} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

                {/* Appointment-Specific Fields */}
                {tab === "appointment" && (
                    <>
                    {/* Date Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                            "w-full justify-start text-left",
                            !watch("date") && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {watch("date") ? format(watch("date") as Date, "PPP") : "Select a date"}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={watch("date") || undefined}
                            onSelect={(date) => setValue("date", date || null)}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    {/* {errors.date && <p className="text-red-500 text-sm">{(errors as any).date?.message}</p>} */}

                    {/* Time Input */}
                    <Input type="time" {...register("time")} />
                    {/* {errors.time && <p className="text-red-500 text-sm">{(errors as any).time?.message}</p>} */}
                    </>
                )}

                {/* Message Field */}
                <Textarea placeholder="Leave us a message..." {...register("message")} />

                {/* Submit Button */}
                <Button className="w-full mt-3" onClick={handleSubmit(onSubmit)}>
                    {tab === "inquiry" ? "Send Inquiry" : "Submit Appointment"}
                </Button>
                </CardContent>
            </Card>
            </div>
        </Tabs>
    </div>

  );
}
