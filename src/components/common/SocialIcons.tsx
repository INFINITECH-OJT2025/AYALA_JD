"use client";

import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { fetchContactDetails } from "@/lib/api";

interface ContactDetails {
  phones: { title: string; number: string }[];
  email: string;
  social_media: { platform: string; link: string }[];
  location: string;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebook className="text-blue-600 dark:text-blue-400" />;
    case "twitter":
    case "x":
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
      return <FaGlobe className="text-green-600 dark:text-green-400" />;
  }
};

export default function SocialIcons() {
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [openMobile, setOpenMobile] = useState(false);

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

  const renderIcons = () => (
    <>
      {/* Social Media Links */}
      {contact?.social_media?.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 p-2 rounded-full shadow-lg hover:scale-110 transition"
        >
          {getSocialIcon(social.platform)}
        </a>
      ))}

      {/* Phone (Customer Service Only) */}
      {contact?.phones?.find(
        (phone) => phone.title.toLowerCase() === "customer service"
      ) ? (
        <a
          href={`tel:${
            contact.phones.find(
              (phone) => phone.title.toLowerCase() === "customer service"
            )?.number
          }`}
          className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaPhone />
        </a>
      ) : null}

      {/* Email */}
      {contact?.email && (
        <a
          href={`mailto:${contact.email}`}
          className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaEnvelope />
        </a>
      )}
    </>
  );

  return (
    <>
      {/* Desktop View (always visible) */}
      <div className="fixed top-1/3 right-4 z-50 hidden md:flex flex-col space-y-3">
        {renderIcons()}
      </div>
  
      {/* Mobile View (toggle dropdown) */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <div className="flex flex-col items-end">
          {openMobile && (
            <div className="mb-2 flex flex-col-reverse space-y-reverse space-y-3 mr-1 items-end">
              {renderIcons()}
            </div>
          )}
  
          <button
            onClick={() => setOpenMobile(!openMobile)}
            className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaGlobe />
          </button>
        </div>
      </div>
    </>
  );
  
}
