"use client"
import Image from "next/image";
import Link from "next/link";
import  { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";
import { SubmitProperty } from "@/components/landing-page/SubmitProperty";
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

export default function FeaturedProperties() {
  return (
    <>
    <Navbar />
    <section className="py-1 mb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-start">
          Properties
        </h2>
        <p className="text-gray-600 text-lg mb-6">Turning Dreams into Addresses, Secure Your Future with the Right Property.</p>

        {/* Property Grid - 5 cards per row */}
        <div className="grid md:grid-cols-5 gap-6">
          {properties.map((property) => (
            <Link key={property.id} href="/landing/viewproperties" className="block bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
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
                <h3 className="mt-2 text-sm font-bold">
                  {property.unitType} | {property.name}
                </h3>
                <p className="text-gray-600 text-sm">{property.location}</p>
                <p className="mt-2 text-lg font-bold text-green-800">{property.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <div className="border-t border-gray-300 my-4"></div>

    <SubmitProperty />
    <Footer/>
    </>
  );

}
