import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <Image src="/logo.png" alt="Ayala Land Logo" width={150} height={40} />
          <p className="text-sm mt-4">
            Building sustainable communities and exceptional living spaces for a better future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/properties" className="hover:text-white">Property Listings</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Office Location & Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Our Office</h4>
          <p className="flex items-center gap-2">
            <MapPin size={18} /> Makati City, Philippines
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Phone size={18} /> +63 123 456 7890
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Mail size={18} /> info@ayalaland.com
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
          <p className="text-sm mb-3">
            Subscribe to our newsletter for the latest updates on new developments and promotions.
          </p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <Input type="email" placeholder="Enter your email" className="border-0 rounded-none px-4" />
            <Button className="bg-blue-600 text-white px-4 rounded-none">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© {new Date().getFullYear()} Ayala Land. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} className="hover:text-white transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} className="hover:text-white transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} className="hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
