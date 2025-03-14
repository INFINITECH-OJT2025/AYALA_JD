"use client";

import InquiryStats from "@/components/dashboard/InquiryStats";
import JobApplicationsDashboard from "@/components/dashboard/JobApplicationsDashboard";
import JobApplicationsTable from "@/components/dashboard/JobApplicationsTable";
import LatestInquiries from "@/components/dashboard/LatestInquiries";
import PropertyStats from "@/components/dashboard/PropertyStats";
export default function AdminDashboard() {
  return (
    <div className="space-y-0">
        <PropertyStats />
        <JobApplicationsDashboard/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* ✅ Latest Inquiries Table */}
          <div className="flex flex-col">
            <LatestInquiries />
          </div>

          {/* ✅ Inquiry Statistics Pie Chart */}
          <div className="flex flex-col">
            <InquiryStats />
          </div>
        </div>

        <JobApplicationsTable/>
      {/* ✅ Other Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
      </div>

    </div>
  );
}
