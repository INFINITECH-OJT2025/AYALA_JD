import Image from "next/image";
import Link from "next/link";

interface Property {
  id: number;
  image: string;
  type: string;
  name: string;
  unitType: string;
  status: string;
  location: string;
  price: string;
}

const properties: Property[] = [
  {
    id: 1,
    image: "/prop1.jpg",
    type: "For Sale",
    name: "Prisma Residences",
    unitType: "1BR",
    status: "Fully-Furnished",
    location: "Pasig Blvd, Pasig, Metro Manila",
    price: "₱5,000,000.00",
  },
  {
    id: 2,
    image: "/prop2.jpg",
    type: "For Rent",
    name: "Avida Towers",
    unitType: "Studio",
    status: "Bare",
    location: "Makati Ave, Makati, Metro Manila",
    price: "₱25,000/month",
  },
  {
    id: 3,
    image: "/prop3.jpg",
    type: "For Sale",
    name: "The Residences at Greenbelt",
    unitType: "2BR",
    status: "Fully-Furnished",
    location: "Greenbelt, Makati, Metro Manila",
    price: "₱12,500,000.00",
  },
];

export function FeaturedProperties() {
  return (
    <section className="py-5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Featured Properties
        </h2>

        {/* Property Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href="/landing/properties"
              className="block transform transition-transform hover:scale-105"
            >
              <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                <div className="relative">
                  <Image
                    src={property.image}
                    alt={property.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 text-white text-xs font-bold px-3 py-1 rounded ${
                      property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {property.type}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">
                    {property.status}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">
                    {property.unitType} | {property.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <p className="mt-2 text-xl font-bold text-green-800">{property.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Submit Your Property Section */}
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-700">
            Do you have a property for <span className="text-green-600 font-semibold">sale</span> or{" "}
            <span className="text-blue-600 font-semibold">rent</span>?  
          </p>
          <p className="text-lg text-gray-700 mb-4">
            List it with us and connect with potential buyers or tenants.
          </p>
          <Link
            href="/landing/properties"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg animate-bounce hover:scale-110 transition duration-800"
          >
            Submit Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}
