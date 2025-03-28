"use client"

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubscribeNewsletter } from "../common/SubscribeNewsletter";
import { fetchContactDetails } from "@/lib/api";
import { useEffect, useState } from "react";
export function Footer() {
  const [contact, setContact] = useState<{
    location: string;
    phones: { number: string }[];
    email: string;
  } | null>(null);

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
  return (
    <footer className="bg-gray-900 dark:bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <Image
            src="/logo.png"
            alt="Ayala Land Logo"
            width={150}
            height={40}
          />
          <p className="text-sm mt-4">
            Building sustainable communities and exceptional living spaces for a
            better future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/landing/aboutus" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/landing/properties" className="hover:text-white">
                Property Listings
              </Link>
            </li>
            <li>
              <Link href="/landing/joblistings" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/landing/contactus" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/landing/terms" className="hover:text-white">
                Terms & Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Office Location & Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Our Office</h4>

          {/* Location */}
          {contact?.location && (
            <p className="flex items-center gap-2">
              <MapPin size={18} /> {contact.location}
            </p>
          )}

          {/* Phone Numbers */}
          {contact?.phones?.map((phone, index) => (
            <p key={index} className="flex items-center gap-2 mt-2">
              <Phone size={18} />
              <a
                href={`tel:${phone.number}`}
                className="text-blue-400 hover:underline"
              >
                {phone.number}
              </a>
            </p>
          ))}

          {/* Email */}
          {contact?.email && (
            <p className="flex items-center gap-2 mt-2">
              <Mail size={18} />
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-400 hover:underline"
              >
                {contact.email}
              </a>
            </p>
          )}
        </div>

        {/* Newsletter Subscription */}
        <SubscribeNewsletter />
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Ayala Land. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} className="hover:text-white transition" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={24} className="hover:text-white transition" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} className="hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
