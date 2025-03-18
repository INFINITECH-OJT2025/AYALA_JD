"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/landing/aboutus" },
    { name: "Services", path: "/landing/services" },
    { name: "Careers", path: "/landing/joblistings" },
    { name: "Contact", path: "/landing/contactus" },
    { name: "Properties", path: "/landing/properties" },
  ];

  return (
    <>
      {/* ✅ Mobile Navbar Header */}
      <div className="bg-[#fafffe] dark:bg-[#003865] shadow-md fixed w-full z-50 top-0 left-0 flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          Ayala Land
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={clsx(
          "md:hidden bg-white dark:bg-gray-900 shadow-md fixed inset-x-0 top-16 transition-transform",
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
                "block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 transition",
                pathname === link.path && "text-blue-600 font-semibold"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Theme Toggle in Mobile Menu */}
          {mounted && (
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("light")}
              >
                <Sun className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("dark")}
              >
                <Moon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("system")}
              >
                <Monitor className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* ✅ Loan Calculator Button */}
          <Link href="/landing/loancalculator" passHref>
            <Button className="w-11/12 bg-blue-600 hover:bg-blue-700 transition">
              Loan Calculator
            </Button>
          </Link>
        </div>
      </div>

      {/* ✅ Spacer to Prevent Overlap */}
      <div className="h-16"></div>
    </>
  );
}
