import { Footer } from "@/components/landing-page/Footer";
import {MobileAppDownload} from "@/components/landing-page/MobileAppDownload";
import { Navbar } from "@/components/landing-page/Navbar";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <MobileAppDownload />
      <Footer/>
    </div>
  );
}
