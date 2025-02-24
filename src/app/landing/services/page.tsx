import React from 'react';
import { FaBuilding, FaHome, FaShoppingCart, FaHotel, FaIndustry, FaWarehouse } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/landing-page/Navbar';
import { Footer } from '@/components/landing-page/Footer';

const services = [
  {
    title: 'Residential Development',
    icon: <FaHome className="text-blue-500 w-12 h-12" />,
    description: 'Ayala Land offers a variety of residential options, from upscale communities to affordable housing, ensuring quality living spaces for families.',
    image: '/serv1.jpg',
  },
  {
    title: 'Commercial Leasing',
    icon: <FaBuilding className="text-green-500 w-12 h-12" />,
    description: 'Providing prime office spaces in strategic locations, Ayala Land caters to businesses seeking modern and efficient work environments.',
    image: '/serv2.jpg',
  },
  {
    title: 'Shopping Centers',
    icon: <FaShoppingCart className="text-yellow-500 w-12 h-12" />,
    description: 'Ayala Malls offer diverse retail experiences, dining options, and entertainment facilities, serving as vibrant community hubs.',
    image: '/serv3.jpg',
  },
  {
    title: 'Hotels and Resorts',
    icon: <FaHotel className="text-red-500 w-12 h-12" />,
    description: 'With a portfolio of hotels and resorts, Ayala Land provides exceptional hospitality services for both business and leisure travelers.',
    image: '/serv4.jpg',
  },
  {
    title: 'Industrial Parks',
    icon: <FaIndustry className="text-purple-500 w-12 h-12" />,
    description: 'Developing industrial parks equipped with modern infrastructure, Ayala Land supports manufacturing and logistics enterprises.',
    image: '/ayalapic1.jpg',
  },
  {
    title: 'Property Leasing and Resale',
    icon: <FaWarehouse className="text-teal-500 w-12 h-12" />,
    description: 'Ayala Land Leasing and Resale Services assist clients in maximizing the value of their property investments through effective leasing and resale management.',
    image: '/serv5.jpg',
  },
];

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader className="flex items-center space-x-4 p-6">
                  {service.icon}
                  <CardTitle className="text-2xl font-semibold text-gray-700">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ServicesPage;
