import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Mail, CheckCircle, XCircle } from "lucide-react";

const inquiries = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    phone: "09924401097",
    inquiryType: "General Inquiry",
    message: "I want to know more about the property in Makati."
  },
  {
    id: 2,
    firstName: "Maria",
    lastName: "Santos",
    email: "mariasantos@email.com",
    phone: "09123456789",
    inquiryType: "Appointment Request",
    message: "Can I schedule a visit to your office this weekend?"
  }
];

const jobApplications = [
  {
    id: 1,
    applicantName: "Carlos Mendoza",
    email: "carlosmendoza@email.com",
    position: "Software Developer",
    status: "Pending",
    resume: "resume-carlos.pdf"
  },
  {
    id: 2,
    applicantName: "Anna Garcia",
    email: "annagarcia@email.com",
    position: "Marketing Specialist",
    status: "Reviewed",
    resume: "resume-anna.pdf"
  }
];

const recentTransactions = [
  {
    id: 1,
    client: "John Doe",
    property: "Condo in BGC",
    amount: "$250,000",
    status: "Completed"
  },
  {
    id: 2,
    client: "Jane Smith",
    property: "House in Quezon City",
    amount: "$180,000",
    status: "Pending"
  }
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 gap-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      {/* Client Inquiries & Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Client Inquiries & Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>{inquiry.firstName} {inquiry.lastName}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.phone}</TableCell>
                  <TableCell>{inquiry.inquiryType}</TableCell>
                  <TableCell>{inquiry.message}</TableCell>
                  <TableCell>
                    <Button variant="outline"><Mail className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Job Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.applicantName}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>
                    {app.status === "Pending" ? (
                      <XCircle className="text-red-500 w-5 h-5" />
                    ) : (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.client}</TableCell>
                  <TableCell>{tx.property}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    {tx.status === "Completed" ? (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    ) : (
                      <XCircle className="text-yellow-500 w-5 h-5" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}