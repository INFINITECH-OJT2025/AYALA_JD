"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Star } from "lucide-react";

export function MobileAppDownload() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect if the user is on an iPhone (iOS Safari)
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent) && navigator.vendor.includes("Apple")) {
      setIsIOS(true);
    }

    // Capture beforeinstallprompt event (not supported in iOS)
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (isIOS) {
      alert("To install this app on iPhone:\n\n1️⃣ Open Safari\n2️⃣ Tap Share Button (📤)\n3️⃣ Tap 'Add to Home Screen'\n4️⃣ Tap 'Add'");
      return;
    }

    if (!deferredPrompt) {
      alert("PWA installation is not available. Try opening this page in a browser.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
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
              <Image src="/logo.png" alt="ayala" width={20} height={20} />
              {isIOS ? "How to Install on iPhone" : "Install AYALAPP"}
            </Button>
          </div>
        </div>

        {/* QR Code & Mobile Image */}
        <div className="flex flex-col items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Scan the QR code to install</p>
          <Image src="/qr.png" alt="Mobile App Mockup" width={300} height={300} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
