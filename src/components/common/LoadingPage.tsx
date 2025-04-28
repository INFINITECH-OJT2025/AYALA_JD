"use client";

import { useState, useEffect, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export default function LoadingPage({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Immediately set loading to false when the component is mounted
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading Section...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
