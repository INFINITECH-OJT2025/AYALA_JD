import { NonFeaturedNewsUpdates } from "@/components/common/NonFeaturedNewsUpdates";
import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";
import { NewsUpdates } from "@/components/landing-page/NewsUpdates";

export default function Page() {
  return (
    <div>
        <>
        <Navbar/>
        <NonFeaturedNewsUpdates/> 
        <Footer/>
        </>
      {/* Other content */}

    </div>
  );
}
