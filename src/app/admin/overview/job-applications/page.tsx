"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import JobTable from "@/components/admin/JobTable";
import JobApplicants from "@/components/common/JobApplicants";
import JobCreateModal from "@/components/common/JobCreateModal";

export default function JobManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Job Listings Table */}
        <JobTable />

      {/* Applicants Section */}
      <div className="mt-6">
        <JobApplicants />
      </div>

      {/* Modal for Creating Job */}
      <JobCreateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
