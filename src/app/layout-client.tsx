"use client";

import { useEffect } from "react";
import { Toaster } from "sonner"; // Import Sonner toast
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((error) => console.error("❌ Service Worker Registration Failed:", error));
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-right" richColors /> {/* Global toast */}
      {children}
    </ThemeProvider>
  );
}
