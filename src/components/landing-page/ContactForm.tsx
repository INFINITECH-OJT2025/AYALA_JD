"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";


export function ContactForm() {
  return (
    <div className="bg-gray-100">
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-xl shadow-lg">
        {/* Left Side - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-green-700">Get in Touch with Ayala Land</h2>
          <p className="text-gray-700 mt-3">
            Our expert team is ready to assist you in finding your dream home or investment property. Reach out today!
          </p>

          {/* Contact Icons */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-lg">
              <FaPhoneAlt className="text-green-600" />
              <a href="tel:+639265536964" className="text-blue-700 hover:underline">(+63) 926 553 6964</a>
            </div>
            <div className="flex items-center space-x-3 text-lg">
              <FaEnvelope className="text-green-600" />
              <a href="mailto:info@ayalaland.com" className="text-blue-700 hover:underline">
                info@ayalaland.com
              </a>
            </div>
            <div className="flex items-center space-x-3 text-lg">
              <FaFacebookF className="text-green-600" />
              <a href="#" className="text-blue-700 hover:underline">Ayala Land Official</a>
            </div>
          </div>

          {/* Office & Additional Contacts */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800">Our Office:</h3>
            <p className="flex items-center space-x-2 text-gray-700">
              <FaMapMarkerAlt className="text-green-600" />
              <span className="text-blue-700 font-medium">Tower One, Ayala Avenue, Makati City, Philippines</span>
            </p>
            <ul className="mt-3 space-y-1 text-gray-700">
              <li><strong>Sales:</strong> <a href="tel:+639651983796" className="text-blue-700 hover:underline">(+63) 965 198 3796</a></li>
              <li><strong>Leasing:</strong> <a href="tel:+639651983796" className="text-blue-700 hover:underline">(+63) 965 198 3796</a></li>
              <li><strong>Customer Care:</strong> <a href="tel:0286466136" className="text-blue-700 hover:underline">02-8646-6136</a></li>
            </ul>
          </div>
        </div>

        {/* Right Side - Inquiry Form */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us an Inquiry</h3>

          {/* Inquiry Type */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="What can we help you with?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="leasing">Leasing</SelectItem>
            </SelectContent>
          </Select>

          {/* Form Inputs */}
          <div className="mt-4 space-y-4">
            <Input type="text" placeholder="Last Name (e.g. Dela Cruz)" className="w-full" />
            <Input type="text" placeholder="First Name (e.g. Juan)" className="w-full" />
            <Input type="email" placeholder="Email (e.g. juandelacruz@gmail.com)" className="w-full" />
            <Input type="tel" placeholder="Phone Number (e.g. 09924401097)" className="w-full" />
            <Textarea placeholder="Leave us a message..." className="w-full" />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white mt-4">
            SEND INQUIRY
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
