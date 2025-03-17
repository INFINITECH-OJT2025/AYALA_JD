"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Star } from "lucide-react";

export function MobileAppDownload() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
      console.log("✅ Install prompt captured.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      alert("PWA installation is not available. Try adding this page to your home screen manually.");
      return;
    }

    deferredPrompt.prompt(); // Show install prompt

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("🎉 PWA installed successfully!");
    } else {
      console.log("❌ PWA installation was declined.");
    }

    setDeferredPrompt(null); // Reset prompt
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        
        {/* App Mockup */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Download the Ayala Land Mobile App
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Experience seamless property browsing, instant updates, and exclusive deals—right at your fingertips.
          </p>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Smartphone className="text-blue-600 dark:text-blue-400" size={24} />
              <span className="text-gray-700 dark:text-gray-300">Search & explore properties anytime, anywhere</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="text-green-600 dark:text-green-400" size={24} />
              <span className="text-gray-700 dark:text-gray-300">Easy application & investment tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500 dark:text-yellow-400" size={24} />
              <span className="text-gray-700 dark:text-gray-300">Exclusive app-only deals & property previews</span>
            </div>
          </div>

          {/* PWA Install Button */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Button
              onClick={handleInstallPWA}
              className="bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-2 px-6"
            >
              <Image src="/logo.png" alt="Google Play" width={20} height={20} />
              Install AYALAPP
            </Button>
          </div>
        </div>

        {/* QR Code & Mobile Image */}
        <div className="flex flex-col items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Scan the QR code to install instantly</p>
          <Image src="/ayalaqr.png" alt="Mobile App Mockup" width={300} height={300} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
