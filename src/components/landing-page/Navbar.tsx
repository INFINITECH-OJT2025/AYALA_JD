"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/landing/aboutus" },
    { name: "Properties", path: "/landing/properties" },
    { name: "Services", path: "/landing/services" },
    { name: "Careers", path: "/landing/joblistings" },
    { name: "Contact", path: "/landing/contactus" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white/30 backdrop-blur-md shadow-md fixed w-full z-50 top-0 left-0">

        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Ayala Land Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-gray-800">Ayala Land</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={clsx(
                  "hover:text-gray-900 transition text-lg font-semibold",
                  pathname === link.path && "text-blue-600 font-semibold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700 transition" asChild>
              <Link href="/landing/loancalculator">Loan Calculator</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden bg-white shadow-md fixed inset-x-0 top-16 transition-transform",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}
        >
          <div className="flex flex-col items-center py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block py-2 text-gray-600 hover:text-gray-900 transition",
                  pathname === link.path && "text-blue-600 font-semibold"
                )}
              >
                {link.name}
              </Link>
            ))}
            {/* Buttons in Mobile Menu */}

            <Button className="w-11/12 bg-blue-600 hover:bg-blue-700 transition" asChild>
              <Link href="/landing/loancalculator">Loan Calculator</Link>
            </Button>

          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
