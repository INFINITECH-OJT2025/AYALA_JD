"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  Wrench,
  Calculator,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    { name: "Explore", path: "/landing/News" },
  ];

  return (
    <>
      <nav className="bg-[#16423C] shadow-md fixed w-full z-50 top-0 left-0">
        <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-y-4 max-w-screen-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logoTrans.png"
              alt="Ayala Land Logo"
              width={30}
              height={30}
            />
            <span className="text-xl font-bold text-gray-100 whitespace-nowrap">
              AyalaLand
            </span>
          </Link>

          {/* Desktop Menu (Centered) */}
          <div className="hidden md:flex flex-grow justify-center gap-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={clsx(
                  "hover:text-blue-400 transition text-lg font-semibold whitespace-nowrap",
                  pathname === link.path ? "text-blue-400" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right-side buttons (Fixed Alignment) */}
          <div className="hidden md:flex items-center gap-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 text-white"
                  >
                    {theme === "dark" ? (
                      <Moon size={20} />
                    ) : theme === "light" ? (
                      <Sun size={20} />
                    ) : (
                      <Monitor size={20} />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun size={16} className="mr-2" /> Light Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon size={16} className="mr-2" /> Dark Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor size={16} className="mr-2" /> System Default
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-black font-semibold bg-gray-200 hover:bg-gray-300 transition px-4 min-w-[160px] flex items-center gap-2">
                  <Wrench className="w-5 h-5" /> Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href="/landing/loancalculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Calculator className="w-5 h-5" /> Loan Calculator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/landing/roomplanner"
                    className="flex items-center gap-2"
                    target="_blank" // Open the link in a new tab
                    rel="noopener noreferrer" // Recommended for security when using target="_blank"
                  >
                    <LayoutGrid className="w-5 h-5" />
                    Room Planner
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? (
              <X size={28} className="text-gray-100" />
            ) : (
              <Menu size={28} className="text-gray-100" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-[#003865] z-50 shadow-lg transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none"
            >
              <X size={28} className="text-gray-800 dark:text-gray-100" />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-6 mt-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Loan Calculator Button */}
            <Button
              className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-400 dark:hover:bg-blue-500 transition w-3/4"
              asChild
            >
              <Link href="/landing/loancalculator">Loan Calculator</Link>
            </Button>

            {/* Theme Toggle for Mobile */}
            {mounted && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme("light")}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                >
                  <Sun className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                >
                  <Moon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                >
                  <Monitor className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-14 md:h-18"></div>
    </>
  );
}
