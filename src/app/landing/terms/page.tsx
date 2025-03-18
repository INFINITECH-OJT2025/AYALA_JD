"use client";

import { Navbar } from "@/components/landing-page/Navbar";
import { Footer } from "@/components/landing-page/Footer";
import TermsPrivacy from "@/components/landing-page/Terms";

export default function TermsPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <TermsPrivacy />
      </main>
      <Footer />
    </div>
  );
}
