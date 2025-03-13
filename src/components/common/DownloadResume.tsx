"use client"; // ✅ Ensure this component runs only on the client side

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadResume({ resumePath, fileName }: { resumePath: string; fileName: string }) {
  const handleDownload = () => {
    if (!resumePath) {
      console.error("Resume path is missing");
      return;
    }

    // ✅ Use a dynamic import to prevent hydration issues
    import("next/dist/client/link").then(() => {
      const link = document.createElement("a");
      link.href = resumePath;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <Download className="w-4 h-4 mr-1" /> Download
    </Button>
  );
}
