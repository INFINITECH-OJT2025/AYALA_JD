"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

export default function LoadingSection({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image 
          src="/loading.gif" 
          alt="Loading..." 
          width={150} 
          height={150} 
          className="mb-4"
        />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading Section...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
