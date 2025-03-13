"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchJobApplications } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Download, ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

interface JobApplication {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  resume_path: string;
  status: string;
}

export default function JobApplicationsTable() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadApplications() {
      const data = await fetchJobApplications();
      setApplications(data);
      setLoading(false);
    }
    loadApplications();
  }, []);

  return (
    <div className="gap-6 w-full p-4">
    <Card className="shadow-lg dark:bg-gray-800">
        <CardHeader className="flex justify-between items-center">
            <CardTitle>Job Applications</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin/overview/job-applications")}>
            View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
        </CardHeader>
        <CardContent>
            {loading ? (
            <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
            ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resume</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {applications.length > 0 ? (
                    applications.map((applicant) => (
                    <TableRow key={applicant.id}>
                        <TableCell>{`${applicant.first_name} ${applicant.last_name}`}</TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell>{applicant.phone}</TableCell>
                        <TableCell>
                            <Badge
                                className={
                                applicant.status === "approved"
                                    ? "bg-green-500 text-white"
                                    : applicant.status === "pending"
                                    ? "bg-yellow-500 text-white"
                                    : applicant.status === "rejected"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-500 text-white"
                                }
                            >
                                {applicant.status || "Pending"}
                            </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(applicant.resume_path, "_blank")}
                        >
                            <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                            const link = document.createElement("a");
                            link.href = applicant.resume_path;
                            link.download = `${applicant.first_name}_${applicant.last_name}_Resume.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            }}
                        >
                            <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                        No applications found
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            )}
        </CardContent>
    </Card>

    </div>
  );
}
