"use client";

import { useEffect, useState } from "react";
import { fetchJobs, deleteJob, updateJob } from "@/lib/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { toast } from "sonner";

export default function JobTable() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editJob, setEditJob] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  // Fetch Jobs
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    getJobs(); // Initial fetch

    const interval = setInterval(getJobs, 5000); // ✅ Fetch new data every 5 seconds

    return () => clearInterval(interval); // ✅ Cleanup on unmount
  }, []);

  const confirmDelete = (id: number) => {
    setSelectedJobId(id);
    setIsDeleteDialogOpen(true);
  };

  // Delete Job
  const handleDelete = async () => {
    if (!selectedJobId) return;

    try {
      await deleteJob(selectedJobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJobId));

      // ✅ Show Sonner toast
      toast.success("Job Deleted", {
        description: "The job listing has been removed successfully.",
      });
    } catch (error) {
      console.error("Error deleting job:", error);

      // ✅ Show error toast
      toast.error("Failed to delete job", {
        description: "There was an issue deleting the job. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedJobId(null);
    }
  };

  // Open Edit Modal
  const handleEdit = (job: any) => {
    setEditJob(job);
    setEditForm({ ...job });
  };

  // Handle Edit Form Change
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle Job Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;

    try {
      await updateJob(editJob.id, editForm);
      setJobs(
        jobs.map((job) =>
          job.id === editJob.id ? { ...job, ...editForm } : job
        )
      );
      setEditJob(null);

      // ✅ Show Sonner toast notification
      toast.success("Job Updated", {
        description: `The job "${editForm.title}" has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating job:", error);

      // ✅ Show Sonner error toast
      toast.error("Failed to update job", {
        description: "There was an issue updating the job. Please try again.",
      });
    }
  };

  // Table Columns
  const columns: ColumnDef<any>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "slots", header: "Slots" },
    { accessorKey: "category", header: "Category" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(row.original)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => confirmDelete(row.original.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Job Listings
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-300">Loading jobs...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={jobs} />
        </div>
      )}

      {/* Edit Job Modal */}
      {editJob && (
        <Dialog open={!!editJob} onOpenChange={() => setEditJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-2" method="POST">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                  Job Title
                </label>
                <Input
                  name="title"
                  value={editForm.title || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Location */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Location
                  </label>
                  <Input
                    name="location"
                    value={editForm.location || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Job Type
                  </label>
                  <Input
                    name="category"
                    value={editForm.type || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Job Slots */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Job Slots
                  </label>
                  <Input
                    name="slots"
                    value={editForm.slots || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Category
                  </label>
                  <Input
                    name="category"
                    value={editForm.category || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Salary
                  </label>
                  <Input
                    name="salary"
                    value={editForm.salary || ""}
                    onChange={handleEditChange}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Application Deadline
                  </label>
                  <Input
                    name="deadline"
                    type="date"
                    value={editForm.deadline || ""}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              {/* Full-Width Fields */}
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Job Description
                  </label>
                  <Textarea
                    name="description"
                    value={editForm.description || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold dark:text-gray-100 text-gray-700">
                    Job Image
                  </label>

                  {/* Show the existing image or the newly selected preview */}
                  {editForm.image_url && !editForm.imagePreview && (
                    <img
                      src={editForm.image_url}
                      alt="Current Image"
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  )}

                  {editForm.imagePreview && (
                    <img
                      src={editForm.imagePreview}
                      alt="New Image Preview"
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  )}

                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setEditForm({
                          ...editForm,
                          image: file, // Store the file for submission
                          imagePreview: URL.createObjectURL(file), // Show the new preview
                        });
                      }
                    }}
                  />
                </div>
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditJob(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Job</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
