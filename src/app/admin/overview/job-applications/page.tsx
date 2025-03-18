"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { createJob } from "@/lib/api";
import JobTable from "@/components/admin/JobTable";
import { XCircle } from "lucide-react";
import JobApplicants from "@/components/common/JobApplicants";
import { toast } from "sonner";

export default function JobForm() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time",
    category: "",
    salary: "",
    deadline: "",
    description: "",
    slots: "", // ✅ Added slots field
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [categories, setCategories] = useState([
    "Real Estate Agent",
    "Property Manager",
    "Mortgage Broker",
    "Real Estate Developer",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setForm({ ...form, category: newCategory });
      setNewCategory("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    try {
      await createJob(formData);

      // ✅ Show Sonner success toast
      toast.success("Job Created", {
        description: "The job listing has been successfully created.",
      });

      // ✅ Reset form
      setForm({
        title: "",
        location: "",
        type: "Full-time",
        category: "",
        salary: "",
        deadline: "",
        description: "",
        slots: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error creating job:", error);

      // ✅ Show Sonner error toast
      toast.error("Job Creation Failed", {
        description: "There was an issue creating the job. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6">
        {/* Left Column: Job Form */}
        <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white text-center md:text-left">
            Create Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 text-black dark:text-white">
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />
            </div>

            <Input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ✅ Slots Input */}
              <Input
                name="slots"
                placeholder="Available Slots"
                type="number"
                min="1"
                value={form.slots}
                onChange={handleChange}
                required
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />
              {/* ✅ Category Selection */}
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 text-black dark:text-white">
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Input for new category */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <Input
                placeholder="Add New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />
              <Button type="button" onClick={handleNewCategory}>
                Add
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="salary"
                placeholder="Starting Salary (Optional)"
                value={
                  form.salary
                    ? new Intl.NumberFormat("en-US").format(
                        Number(form.salary.replace(/,/g, ""))
                      )
                    : ""
                }
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, "");
                  if (!isNaN(Number(rawValue))) {
                    setForm({ ...form, salary: rawValue });
                  }
                }}
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />

              <Input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />
            </div>

            <Textarea
              name="description"
              placeholder="Job Description 50 characters"
              value={form.description}
              onChange={handleChange}
              maxLength={50}
              required
              className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
            />

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-100">
                Job Image
              </label>

              {/* Image Preview with Remove Button */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Selected Image"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1 hover:text-red-500"
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              )}

              {/* File Input */}
              <Input
                type="file"
                onChange={handleImageChange}
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black"
            >
              Create Job
            </Button>
          </form>
        </div>

        {/* Right Column: Job Table */}
        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
          <JobTable />
        </div>
      </div>

      <div className="mt-4">
        <JobApplicants />
      </div>
    </>
  );
}
