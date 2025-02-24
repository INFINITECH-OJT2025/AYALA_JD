"use client";

import { useEffect, useState } from "react";
import { fetchProperties, createProperty, deleteProperty } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Property {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type_of_listing: string;
  property_name: string;
  unit_type: string;
  unit_status: string;
  location: string;
  price: string;
  square_meter: number;
  floor_number: number;
  parking: boolean;
  pool_area: boolean;
  guest_suite: boolean;
  underground_parking: boolean;
  pet_friendly_facilities: boolean;
  balcony_terrace: boolean;
  club_house: boolean;
  gym_fitness_center: boolean;
  elevator: boolean;
  concierge_services: boolean;
  security: boolean;
  property_image: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    loadProperties();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">Property Listings</h1>
      <Card className="mt-4">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Type of Listing</TableHead>
                <TableHead>Property Name</TableHead>
                <TableHead>Unit Type</TableHead>
                <TableHead>Unit Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.first_name}</TableCell>
                  <TableCell>{property.last_name}</TableCell>
                  <TableCell>{property.type_of_listing}</TableCell>
                  <TableCell>{property.property_name}</TableCell>
                  <TableCell>{property.unit_type}</TableCell>
                  <TableCell>{property.unit_status}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="icon" onClick={() => handleViewProperty(property)}>
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(property.id)} className="ml-2">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl h-[70vh] overflow-hidden p-4 m-4">
          <DialogHeader>
            <DialogTitle>{selectedProperty?.property_name}</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4">
              {/* Two-column layout for property details */}
              <div className="grid grid-cols-2 gap-4">
                <p><strong>First Name:</strong> {selectedProperty.first_name}</p>
                <p><strong>Last Name:</strong> {selectedProperty.last_name}</p>
                <p><strong>Email:</strong> {selectedProperty.email}</p>
                <p><strong>Phone:</strong> {selectedProperty.phone_number}</p>
                <p><strong>Location:</strong> {selectedProperty.location}</p>
                <p><strong>Price:</strong> {selectedProperty.price}</p>
                <p><strong>Square Meter:</strong> {selectedProperty.square_meter} sqm</p>
                <p><strong>Floor Number:</strong> {selectedProperty.floor_number}</p>
                <p><strong>Parking:</strong> {selectedProperty.parking ? "Yes" : "No"}</p>
              </div>

              {/* Two-column layout for amenities */}
              <div>
                <p><strong>Amenities:</strong></p>
                <div className="grid grid-cols-2 gap-4">
                  <p>Pool Area: {selectedProperty.pool_area ? "Yes" : "No"}</p>
                  <p>Guest Suite: {selectedProperty.guest_suite ? "Yes" : "No"}</p>
                  <p>Underground Parking: {selectedProperty.underground_parking ? "Yes" : "No"}</p>
                  <p>Pet Friendly: {selectedProperty.pet_friendly_facilities ? "Yes" : "No"}</p>
                  <p>Balcony/Terrace: {selectedProperty.balcony_terrace ? "Yes" : "No"}</p>
                  <p>Club House: {selectedProperty.club_house ? "Yes" : "No"}</p>
                  <p>Gym/Fitness Center: {selectedProperty.gym_fitness_center ? "Yes" : "No"}</p>
                  <p>Elevator: {selectedProperty.elevator ? "Yes" : "No"}</p>
                  <p>Concierge Services: {selectedProperty.concierge_services ? "Yes" : "No"}</p>
                  <p>Security: {selectedProperty.security ? "Yes" : "No"}</p>
                </div>
              </div>

              {/* Property Image - Full width */}
              {selectedProperty.property_image && (
                <div className="w-full">
                  <img 
                    src={selectedProperty.property_image} 
                    alt="Property Image" 

                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>


    </div>
  );
}
