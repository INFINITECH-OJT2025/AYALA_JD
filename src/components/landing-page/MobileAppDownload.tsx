import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Star } from "lucide-react";

export function MobileAppDownload() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* App Mockup */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Download the Ayala Land Mobile App
          </h2>
          <p className="text-gray-600 mb-6">
            Experience seamless property browsing, instant updates, and exclusive deals—right at your fingertips.
          </p>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Smartphone className="text-blue-600" size={24} />
              <span>Search & explore properties anytime, anywhere</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="text-green-600" size={24} />
              <span>Easy application & investment tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" size={24} />
              <span>Exclusive app-only deals & property previews</span>
            </div>
          </div>

          {/* App Download Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-black text-white flex items-center gap-2 px-6">
                <Image src="/gplay.png" alt="Google Play" width={20} height={20} />
                Get on Google Play
              </Button>
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-black text-white flex items-center gap-2 px-6">
                <Image src="/appstore.png" alt="App Store" width={20} height={20} />
                Download on the App Store
              </Button>
            </a>
          </div>
        </div>

        {/* QR Code & Mobile Image */}
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm">Scan the QR code to install instantly</p>
          <Image src="/ayalaqr.png" alt="Mobile App Mockup" width={300} height={300} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
