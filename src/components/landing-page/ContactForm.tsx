"use client";

import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Contact from "../common/Contact";
import { fetchContactDetails } from "@/lib/api";
import { Card } from "../ui/card";

interface ContactDetails {
  phones: { title: string; number: string }[];
  email: string;
  social_media: { platform: string; link: string }[];
  location: string;
}

export function ContactForm() {
  const [contact, setContact] = useState<ContactDetails | null>(null);

  useEffect(() => {
    const loadContactDetails = async () => {
      try {
        const data = await fetchContactDetails();
        setContact(data);
      } catch (error) {
        console.error("Failed to fetch contact details", error);
      }
    };
    loadContactDetails();
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebook className="text-blue-600 dark:text-blue-400" />;
      case "twitter":
      case "x": // Supports both Twitter & X branding
        return <FaTwitter className="text-blue-400 dark:text-blue-300" />;
      case "instagram":
        return <FaInstagram className="text-pink-500 dark:text-pink-400" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-700 dark:text-blue-500" />;
      case "youtube":
        return <FaYoutube className="text-red-600 dark:text-red-500" />;
      case "tiktok":
        return <FaTiktok className="text-red-600 dark:text-red-500" />;
      default:
        return <FaGlobe className="text-green-600 dark:text-green-400" />; // Default icon for unknown platforms
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="px-6 py-16">
        {/* Contact Section */}
        <Card className="grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-[#18181a] p-8 rounded-xl shadow-lg dark:shadow-md">
          {/* Left Side - Contact Info with Background */}
          <div
            className="relative w-full h-full p-6 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: "url('/contact.png')" }}
          >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/80 rounded-lg z-0" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                Get in Touch with Ayala Land
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Our expert team is ready to assist you in finding your dream
                home or investment property. Reach out today!
              </p>

              {/* Contact Icons */}
              <div className="mt-6 space-y-4">
                {/* Email at the Top */}
                {contact?.email && (
                  <div className="flex items-center space-x-3 text-md">
                    <FaEnvelope className="text-green-600 dark:text-green-400" />
                    <p className="font-medium">Email:</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {/* Phone Numbers */}
                {contact?.phones?.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-md"
                  >
                    <FaPhoneAlt className="text-green-600 dark:text-green-400" />
                    <span className="text-gray-800 dark:text-gray-200">
                      {phone.title}:
                    </span>
                    <a
                      href={`tel:${phone.number}`}
                      className="text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}

                {/* Social Media */}
                {contact?.social_media?.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-md"
                  >
                    {getSocialIcon(social.platform)}
                    <span className="text-gray-800 dark:text-gray-200">
                      {social.platform}:
                    </span>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {social.link}
                    </a>
                  </div>
                ))}

                {/* Office Location */}
                {contact?.location && (
                  <div className="flex items-center space-x-3 text-md">
                    <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                    <p className="font-medium">Location:</p>
                    <span className="text-blue-700 dark:text-blue-400 font-medium">
                      {contact.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form or Component */}
          <Contact />
        </Card>
      </div>
    </div>
  );
}
