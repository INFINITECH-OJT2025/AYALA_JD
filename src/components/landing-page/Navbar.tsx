"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MobileNavbar } from "../common/MobileNavbar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false); // Ensure theme is only rendered on the client

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { name: "Services", path: "/landing/services" },
    { name: "Careers", path: "/landing/joblistings" },
    { name: "Contact", path: "/landing/contactus" },
    { name: "Properties", path: "/landing/properties" },
    // { name: "Submit Property", path: "/landing/consignment" },
  ];

  return (
    <>
     <nav className="bg-[#fafffe] dark:bg-[#003865] shadow-md fixed w-full z-50 top-0 left-0">

        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Ayala Land Logo" width={25} height={25} />
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ayala Land</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={clsx(
                  "hover:text-gray-900 dark:hover:text-gray-200 transition text-lg font-semibold",
                  pathname === link.path && "text-blue-600 dark:text-green-400 font-semibold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Buttons */}
          <div className="hidden md:flex space-x-3 items-center">
            {/* Theme Toggle */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {theme === "dark" ? <Moon size={20} /> : theme === "light" ? <Sun size={20} /> : <Monitor size={20} />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="w-4 h-4 mr-2" /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="w-4 h-4 mr-2" /> Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="w-4 h-4 mr-2" /> System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Loan Calculator Button */}
            <Button className="bg-blue-700 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500  transition" asChild>
              <Link href="/landing/loancalculator">Loan Calculator</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
         
        </div>

        {/* Mobile Menu */}
        
      </nav>
        <div className="md:hidden">
          <MobileNavbar/>
        </div>
   
      {/* Spacer to prevent content overlap */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
