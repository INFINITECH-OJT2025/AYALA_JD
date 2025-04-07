"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Notification from "@/components/common/Notification";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        router.replace("/auth/login");
      }

      // Hardcore Back Button Prevention
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", function () {
        window.history.pushState(null, "", window.location.href);
      });

      return () => {
        window.removeEventListener("popstate", () => {});
      };
    }
  }, [router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="p-6 flex justify-center w-screen min-h-screen flex-1 dark:bg-[#18181a] rounded-xl">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content Area */}
          <SidebarInset className="flex flex-col flex-1">
            {/* Header Section */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#18181a] shadow-sm">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
              </div>

              {/* Push Notification & Theme Toggle to the right */}
              <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
                <Notification />
              </div>
            </div>

            {/* Dashboard Content Goes Here */}
            <div className="p-4 flex-1 bg-white dark:bg-[#18181a] rounded-md">{children}</div>
          </SidebarInset>
        </div>

        {/* Add Toaster for global notifications */}
      </SidebarProvider>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
