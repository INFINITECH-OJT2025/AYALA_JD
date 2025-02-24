import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Home, HandCoins } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Property Sales & Leasing Assistance",
      icon: <Home className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Property Management Services",
      icon: <Building className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Investment Consultation",
      icon: <HandCoins className="w-10 h-10 text-yellow-500" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Services We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 text-center shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-col items-center">
                {service.icon}
                <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
