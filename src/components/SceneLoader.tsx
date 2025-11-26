"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const TouringScene = dynamic(() => import("./TouringScene"), {
  ssr: false,
});

interface SceneLoaderProps {
  scrollProgress: number;
}

export default function SceneLoader({ scrollProgress }: SceneLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 mb-4"></div>
            <p className="text-white text-xl font-mono">
              Loading Experience...
            </p>
          </div>
        </div>
      )}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <TouringScene scrollProgress={scrollProgress} />
      </div>
    </>
  );
}
