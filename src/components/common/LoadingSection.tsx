"use client";

import { useState, useEffect, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSection({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading Section...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
