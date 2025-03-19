"use client";

import { useEffect, useState } from "react";
import {
  fetchApplicants,
  approveApplicant,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Check, X, Trash } from "lucide-react";
import { toast } from "sonner";

export default function JobApplicants() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null
  );
  // Fetch all applicants
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

    getApplicants(); // Initial fetch
  }, []);

  // Handle Approval / Rejection Dialog Submission
  const handleActionSubmit = async () => {
    if (!selectedApplicant) return;

    try {
      if (actionType === "approve") {
        await approveApplicant(selectedApplicant.id, message);
        toast.success("Applicant Approved", {
          description: `An approval email has been sent to ${selectedApplicant.email}.`,
        });
      } else if (actionType === "reject") {
        await rejectApplicant(selectedApplicant.id, message);
        toast.error("Applicant Rejected", {
          description: `A rejection email has been sent to ${selectedApplicant.email}.`,
        });
      }

      setSelectedApplicant(null);
      setActionType(null);
      setMessage("");
    } catch (error) {
      console.error("Email failed:", error);
      toast.error("Failed to send email", {
        description: "There was an issue sending the email. Please try again.",
      });
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedApplicantId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle Applicant Deletion
  const handleDelete = async () => {
    if (!selectedApplicantId) return;

    try {
      await deleteApplicant(selectedApplicantId);
      setApplicants((prev) => prev.filter((a) => a.id !== selectedApplicantId));

      // ✅ Show Sonner toast notification
      toast.success("Applicant Deleted", {
        description: "The applicant has been removed successfully.",
      });
    } catch (error) {
      console.error("Error deleting applicant:", error);

      // ✅ Show error toast
      toast.error("Failed to delete applicant", {
        description:
          "There was an issue deleting the applicant. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedApplicantId(null);
    }
  };

  // Filter applicants based on selected status
  const filteredApplicants = applicants.filter((applicant) =>
    filter === "all" ? true : applicant.status === filter
  );

  // Define table columns
  const columns: ColumnDef<any>[] = [
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone No." },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "status", header: "Status" }, // ✅ Show application status
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
      cell: ({ row }) => {
        const status = row.original.status; // Get the applicant's status

        return (
          <div className="flex space-x-2">
            {/* Approve Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedApplicant(row.original);
                setActionType("approve");
              }}
              disabled={status === "approved"} // ✅ Disable if already approved
            >
              <Check className="w-4 h-4 text-green-600" />{" "}
              {status === "approved" ? "Approved" : "Approve"}
            </Button>

            {/* Reject Button */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                setSelectedApplicant(row.original);
                setActionType("reject");
              }}
              disabled={status === "rejected"} // ✅ Disable if already rejected
            >
              <X className="w-4 h-4" />{" "}
              {status === "rejected" ? "Rejected" : "Reject"}
            </Button>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => confirmDelete(row.original.id)}
            >
              <Trash className="w-4 h-4" /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white dark:bg-black p-6 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Job Applicants
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center md:justify-start space-x-4 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "approved" ? "default" : "outline"}
          onClick={() => setFilter("approved")}
        >
          Approved
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-300">
            Loading applicants...
          </p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredApplicants} />
        </div>
      )}

      {/* Approval/Rejection Dialog */}
      {selectedApplicant && actionType && (
        <Dialog
          open={!!selectedApplicant}
          onOpenChange={() => setSelectedApplicant(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "approve"
                  ? "Approve Applicant"
                  : "Reject Applicant"}
              </DialogTitle>
            </DialogHeader>
            <div>
              <p className="mb-2">
                Send a message to <b>{selectedApplicant.email}</b>:
              </p>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedApplicant(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleActionSubmit}
                variant={actionType === "approve" ? "success" : "destructive"}
              >
                {actionType === "approve"
                  ? "Send Approval Email"
                  : "Send Rejection Email"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>
              Are you sure you want to delete this applicant? This action cannot
              be undone.
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
    </div>
  );
}
