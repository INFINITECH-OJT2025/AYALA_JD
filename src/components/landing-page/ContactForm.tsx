"use client";

import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import Contact from "../common/Contact";

export function ContactForm() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg dark:shadow-md">
          
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Get in Touch with Ayala Land</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Our expert team is ready to assist you in finding your dream home or investment property. Reach out today!
            </p>

            {/* Contact Icons */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3 text-lg">
                <FaPhoneAlt className="text-green-600 dark:text-green-400" />
                <a href="tel:+639265536964" className="text-blue-700 dark:text-blue-400 hover:underline">
                  (+63) 926 553 6964
                </a>
              </div>
              <div className="flex items-center space-x-3 text-lg">
                <FaEnvelope className="text-green-600 dark:text-green-400" />
                <a href="mailto:info@ayalaland.com" className="text-blue-700 dark:text-blue-400 hover:underline">
                  info@ayalaland.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-lg">
                <FaFacebookF className="text-green-600 dark:text-green-400" />
                <a href="#" className="text-blue-700 dark:text-blue-400 hover:underline">
                  Ayala Land Official
                </a>
              </div>
            </div>

            {/* Office & Additional Contacts */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Our Office:</h3>
              <p className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                <span className="text-blue-700 dark:text-blue-400 font-medium">
                  Tower One, Ayala Avenue, Makati City, Philippines
                </span>
              </p>
              <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Sales:</strong> 
                  <a href="tel:+639651983796" className="text-blue-700 dark:text-blue-400 hover:underline">
                    (+63) 965 198 3796
                  </a>
                </li>
                <li>
                  <strong>Leasing:</strong> 
                  <a href="tel:+639651983796" className="text-blue-700 dark:text-blue-400 hover:underline">
                    (+63) 965 198 3796
                  </a>
                </li>
                <li>
                  <strong>Customer Care:</strong> 
                  <a href="tel:0286466136" className="text-blue-700 dark:text-blue-400 hover:underline">
                    02-8646-6136
                  </a>
                </li>
              </ul>
            </div>
          </div>

         <Contact/>
        </div>
      </div>
    </div>
  );
}
