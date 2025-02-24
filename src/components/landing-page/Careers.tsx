import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Careers() {
  const jobs = [
    {
      title: "Real Estate Sales Associate",
      location: "Metro Manila",
      description: "Guide clients through the buying and selling process, providing market insights and property recommendations.",
      type: "Full-Time",
    },
    {
      title: "Leasing Consultant",
      location: "Cebu City",
      description: "Assist tenants in finding rental properties, negotiating lease terms, and ensuring a smooth move-in process.",
      type: "Full-Time",
    },
    {
      title: "Digital Marketing Specialist",
      location: "Remote / Hybrid",
      description: "Create and implement digital campaigns to drive engagement and attract property buyers and investors.",
      type: "Part-Time / Contract",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Join Ayala Land</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Build your career with one of the most trusted real estate companies. We offer competitive salaries, professional growth, and a great work culture.
        </p>

        {/* Job Listings */}
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Card key={index} className="p-6 shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Join Us Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Why Work With Us?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Ayala Land is committed to providing a dynamic work environment that fosters growth, innovation, and success.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold">🏆 Career Growth</h4>
              <p className="text-gray-500">Opportunities to develop skills and climb the corporate ladder.</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold">💰 Competitive Salary</h4>
              <p className="text-gray-500">We offer industry-leading salaries and performance bonuses.</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold">🎯 Work-Life Balance</h4>
              <p className="text-gray-500">Flexible working arrangements and a supportive environment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
