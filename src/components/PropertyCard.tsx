import React from "react";

interface PropertyImage {
  id: number;
  image_path: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  images: PropertyImage[];
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      {property.images.length > 0 && (
        <div className="mt-2 flex space-x-2">
          {property.images.map((img) => (
            <img
              key={img.id}
              src={`http://127.0.0.1:8000/storage/${img.image_path}`}
              alt="Property"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
