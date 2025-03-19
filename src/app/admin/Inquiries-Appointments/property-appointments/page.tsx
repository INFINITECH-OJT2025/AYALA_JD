"use client";

import { useEffect, useState } from "react";
import {
  fetchAppointments,
  replyAppointment,
  deleteAppointment,
  archiveAppointment,
  unarchiveAppointment,
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
import { Mail, Archive, Trash, Inbox, User, ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  );
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    getAppointments(); // Initial fetch

    const interval = setInterval(getAppointments, 5000); // ✅ Auto-refresh every 5 seconds

    return () => clearInterval(interval); // ✅ Cleanup on unmount
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredAppointments(appointments);
    } else if (filter === "archived") {
      setFilteredAppointments(
        appointments.filter((inq) => inq.status === "archived")
      );
    } else {
      setFilteredAppointments(
        appointments.filter((inq) => inq.status !== "archived")
      );
    }
  }, [filter, appointments]);

  const handleReply = async () => {
    if (!selectedAppointment) return;
    try {
      await replyAppointment(selectedAppointment.id, replyMessage);

      // ✅ Update the status to "replied"
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id
            ? { ...appt, status: "replied" }
            : appt
        )
      );

      // ✅ Show Sonner toast
      toast.success("Reply Sent", {
        description: `Your response has been sent to ${selectedAppointment.email}.`,
      });

      setSelectedAppointment(null);
      setReplyMessage("");
    } catch {
      toast.error("Failed to send reply", {
        description: "There was an issue sending the reply.",
      });
    }
  };

  const handleToggleArchive = async (id: number, isArchived: boolean) => {
    try {
      if (isArchived) {
        await unarchiveAppointment(id);
        setAppointments((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: "active" } : i))
        );

        // ✅ Show Sonner toast
        toast.success("Appointment Unarchived", {
          description: "The appointment has been restored to active.",
        });
      } else {
        await archiveAppointment(id);
        setAppointments((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: "archived" } : i))
        );

        // ✅ Show Sonner toast
        toast.info("Appointment Archived", {
          description: "The appointment has been moved to archived.",
        });
      }
    } catch {
      toast.error("Failed to update appointment", {
        description: "There was an issue updating the status.",
      });
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedAppointmentId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedAppointmentId) return;

    try {
      await deleteAppointment(selectedAppointmentId);
      setAppointments((prev) =>
        prev.filter((appt) => appt.id !== selectedAppointmentId)
      );

      // ✅ Show Sonner toast
      toast.success("Appointment Deleted", {
        description: "The appointment has been removed successfully.",
      });
    } catch {
      toast.error("Failed to delete appointment", {
        description: "There was an issue deleting the appointment.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedAppointmentId(null);
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "property.property_name", header: "Property Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "status", header: "Status" },

    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) =>
        row.original.date
          ? new Date(row.original.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Not specified",
    },

    // ✅ Format Time
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) =>
        row.original.time
          ? new Date(`1970-01-01T${row.original.time}`).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            )
          : "Not specified",
    },

    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedAppointment(row.original)}
          >
            <Mail className="w-4 h-4 text-blue-600" /> Reply
          </Button>
          {/* Archive / Unarchive Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleToggleArchive(
                row.original.id,
                row.original.status === "archived"
              )
            }
          >
            {row.original.status === "archived" ? (
              <>
                <Inbox className="w-4 h-4 text-green-600" /> Unarchive
              </>
            ) : (
              <>
                <Archive className="w-4 h-4 text-gray-600" /> Archive
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => confirmDelete(row.original.id)}
          >
            <Trash className="w-4 h-4" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Property Appointments
      </h2>

      <div className="flex justify-center md:justify-start space-x-4 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "archived" ? "default" : "outline"}
          onClick={() => setFilter("archived")}
        >
          Archived
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-300">
            Loading appointments...
          </p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredAppointments} />
        </div>
      )}

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>
              Are you sure you want to delete this appointment? This action
              cannot be undone.
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

      {/* Reply Dialog */}
      {selectedAppointment && (
        <Dialog
          open={!!selectedAppointment}
          onOpenChange={() => setSelectedAppointment(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Appointment</DialogTitle>
            </DialogHeader>

            {/* Property Details */}
            <div className="mb-2 p-3 border rounded bg-gray-100 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                Property Details:
              </h3>

              {selectedAppointment.property?.property_image ? (
                (() => {
                  // Ensure property_image is an array (if it's a string, split it)
                  const images = Array.isArray(
                    selectedAppointment.property.property_image
                  )
                    ? selectedAppointment.property.property_image
                    : selectedAppointment.property.property_image.split(",");

                  return (
                    <img
                      src={images[0]} // ✅ Display only the first image
                      alt="Property"
                      className="w-full h-40 object-cover rounded-md mt-2"
                    />
                  );
                })()
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  No image available
                </p>
              )}

              <p className="text-gray-700 dark:text-gray-300 mt-1">
                <b>Property Name: </b>
                {selectedAppointment.property?.property_name ||
                  "Unknown Property"}
              </p>

              {/* ✅ Display Date & Time of Appointment */}
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                <b>Appointment Date:</b>{" "}
                {selectedAppointment.date
                  ? new Date(selectedAppointment.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "Not specified"}
              </p>

              <p className="text-gray-700 dark:text-gray-300 mt-1">
                <b>Time:</b>{" "}
                {selectedAppointment.time
                  ? new Date(
                      `1970-01-01T${selectedAppointment.time}`
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Not specified"}
              </p>
            </div>

            {/* Client Message */}
            <div className="mb-2 p-3 border rounded bg-gray-100 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                Client Message:
              </h3>
              <p className="text-gray-800 dark:text-gray-300 mt-2">
                {selectedAppointment.message || "No message provided."}
              </p>
            </div>

            {/* Reply Form */}
            <div>
              <p className="mb-2">
                Sending reply to <b>{selectedAppointment.email}</b>:
              </p>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply message..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedAppointment(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleReply} variant="success">
                Send Reply
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
