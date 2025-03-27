export interface Property {
  id: number;
  property_image: string[];
  property_name: string;
  unit_type: string;
  unit_status: string;
  location: string;
  price: string;
  status: string;
  square_meter: number;
  floor_number: number;
  parking: string;
  description: string;
  type_of_listing: string; // ✅ Updated to an array to match backend
  other_details: string[]; // ✅ New field to store multiple inputs
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
  unique_views: number; // ✅ Tracks unique visitors
  views: any[];
}

export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  category?: string;
  salary?: string;
  deadline?: string;
  description: string;
  image_url?: string; // Keep this as it's the database field name
}
