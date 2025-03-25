"use client";

import { useEffect, useState } from "react";
import {
  fetchApplicants,
  scheduleApplicant,
  rejectApplicant,
  deleteApplicant,
} from "@/lib/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Eye, CalendarCheck, X, Trash, Clock } from "lucide-react";
import { toast } from "sonner";

export default function JobApplicants() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduleTime, setScheduleTime] = useState<string>("09:00"); // Default time
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const data = await fetchApplicants();
        setApplicants(data);
      } catch (err) {
        setError("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };

    getApplicants();
    const interval = setInterval(getApplicants, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScheduleSubmit = async () => {
    setLoading(true);
    if (!selectedApplicant || !scheduleDate || !scheduleTime) return;

    try {
      const validDate = new Date(scheduleDate);
      if (isNaN(validDate.getTime())) {
        console.error("Invalid schedule date");
        return;
      }

      const [hours, minutes] = scheduleTime.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid schedule time");
        return;
      }

      validDate.setHours(hours, minutes, 0, 0);

      // ✅ Pass validDate directly if `scheduleApplicant` expects a Date
      await scheduleApplicant(selectedApplicant.id, validDate, message);

      toast.success("Interview Scheduled", {
        description: `An interview has been scheduled for ${
          selectedApplicant.email
        } on ${validDate.toLocaleString()}.`,
      });

      setIsScheduleDialogOpen(false);
      setSelectedApplicant(null);
      setScheduleDate(null);
      setScheduleTime("09:00");
      setMessage("");
    } catch (error) {
      console.error("Scheduling failed:", error);
      toast.error("Failed to schedule interview", {
        description:
          "There was an issue scheduling the interview. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRejectionSubmit = async () => {
    setLoading(true);
    if (!selectedApplicant) return;

    try {
      await rejectApplicant(selectedApplicant.id, message);
      toast.error("Applicant Rejected", {
        description: `A rejection email has been sent to ${selectedApplicant.email}.`,
      });

      setIsRejectionDialogOpen(false);
      setSelectedApplicant(null);
      setMessage("");
    } catch (error) {
      console.error("Rejection failed:", error);
      toast.error("Failed to reject applicant", {
        description:
          "There was an issue rejecting the applicant. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedApplicantId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedApplicantId) return;

    try {
      await deleteApplicant(selectedApplicantId);
      setApplicants((prev) => prev.filter((a) => a.id !== selectedApplicantId));

      toast.success("Applicant Deleted", {
        description: "The applicant and their appointment have been removed.",
      });
    } catch (error) {
      console.error("Error deleting applicant:", error);
      toast.error("Failed to delete applicant", {
        description:
          "There was an issue deleting the applicant. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedApplicantId(null);
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone No." },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "job_title", header: "Position" },
    {
      accessorKey: "resume_path",
      header: "Resume",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(row.original.resume_path, "_blank")}
        >
          <Eye className="w-4 h-4" /> View Resume
        </Button>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              setSelectedApplicant(row.original);
              setIsScheduleDialogOpen(true);
            }}
            disabled={row.original.status === "rejected"} // Disable if status is 'replied'
          >
            <CalendarCheck className="w-4 h-4" /> Schedule
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectedApplicant(row.original);
              setIsRejectionDialogOpen(true);
              setIsScheduleDialogOpen(false); // Ensure the schedule modal doesn't open
            }}
            disabled={row.original.status === "replied"} // Disable if status is 'rejected'
          >
            <X className="w-4 h-4" /> Reject
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectedApplicantId(row.original.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Job Applicants
      </h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          Loading applicants...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={applicants} />
        </div>
      )}

      <Dialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      >
        <DialogContent className="max-w-lg w-full mx-auto !h-auto">
          <DialogHeader className="text-center">
            <DialogTitle>
              {selectedApplicant?.status === "replied"
                ? "Scheduled Interview Details"
                : "Schedule Interview"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-start">
            Interview for <b>{selectedApplicant?.email || "this applicant"}</b>:
          </p>

          {selectedApplicant?.status === "replied" ? (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-3">
              <p>
                <b>Scheduled Date:</b>{" "}
                {new Date(selectedApplicant.schedule_date).toLocaleString()}
              </p>
              <p className="mt-2">
                <b>Message:</b>{" "}
                {selectedApplicant.message || "No additional details"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-center">
                  <div className="min-h-[320px] max-h-[320px] flex items-center">
                    <Calendar
                      selected={scheduleDate || undefined}
                      onSelect={(date: Date | undefined) =>
                        setScheduleDate(date || null)
                      }
                      mode="single"
                      required
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ✅ Time Selection */}
              <div>
                <p className="text-start">Select Time:</p>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="time"
                    className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <p className="text-start">Additional Details:</p>
                <Textarea
                  className="w-full min-h-[100px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter any additional details..."
                />
              </div>
            </>
          )}

          <DialogFooter className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsScheduleDialogOpen(false)}
            >
              Close
            </Button>
            {selectedApplicant?.status !== "replied" && (
              <Button
                onClick={handleScheduleSubmit}
                variant="success"
                disabled={!scheduleDate || loading} // ✅ Disable button while loading
              >
                {loading ? "Scheduling..." : "Schedule Interview"}{" "}
                {/* ✅ Show loading text */}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRejectionDialogOpen}
        onOpenChange={setIsRejectionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Applicant</DialogTitle>
          </DialogHeader>

          {selectedApplicant?.status === "rejected" ? (
            // ✅ Show this message if the applicant is already rejected
            <div className="p-4 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-md">
              <p>
                <b>This applicant is already rejected.</b>
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2">
                Enter a rejection message for <b>{selectedApplicant?.email}</b>:
              </p>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter rejection reason..."
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectionDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={handleRejectionSubmit}
              variant="destructive"
              disabled={loading || selectedApplicant?.status === "rejected"} // ✅ Disable if rejected
            >
              {loading ? "Rejecting..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this applicant? This action cannot
            be undone.
          </p>
          <DialogFooter className="flex justify-end space-x-4">
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
    </div>
  );
}
