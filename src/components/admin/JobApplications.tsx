import { Download } from "lucide-react";

interface JobApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: string;
}

interface JobApplicationsProps {
  applications: JobApplication[];
}

const JobApplications: React.FC<JobApplicationsProps> = ({ applications }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Job Applications</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border">
              <td className="border p-2">{app.name}</td>
              <td className="border p-2">{app.email}</td>
              <td className="border p-2">{app.phone}</td>
              <td className="border p-2">{app.position}</td>
              <td className="border p-2">
                <a
                  href={app.resume}
                  download
                  className="text-blue-600 flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplications;
