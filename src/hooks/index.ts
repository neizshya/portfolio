"use client";

import { useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { VIEWPORT } from "@/lib/constants";
import type { ViewportInfo } from "@/types";

/**
 * Custom hook to detect mobile viewport in Three.js scene
 */
export function useViewport(): ViewportInfo {
  const { viewport } = useThree();
  const isMobile = viewport.width < VIEWPORT.MOBILE_WIDTH;

  return {
    isMobile,
    width: viewport.width,
    height: viewport.height,
  };
}

/**
 * Custom hook to detect mobile screen size in DOM
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // Safe initial value for SSR
    if (typeof window === "undefined") return false;
    return window.innerWidth < VIEWPORT.MOBILE_SCREEN;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < VIEWPORT.MOBILE_SCREEN);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

/**
 * Stable pseudo-random number generator for consistent rendering
 * @param seed - Seed value for deterministic output
 * @returns Random number between 0 and 1
 */
export function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Calculate scroll progress within a range
 * @param scrollY - Current scroll position
 * @param maxScroll - Maximum scroll value for full progress
 * @returns Progress value between 0 and 1
 */
export function calculateScrollProgress(
  scrollY: number,
  maxScroll: number
): number {
  return Math.max(0, Math.min(1, scrollY / maxScroll));
}

/**
 * Custom hook to manage scroll-based journey progress and UI visibility
 */
export function useJourneyScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [canScrollToProjects, setCanScrollToProjects] = useState(false);

  useEffect(() => {
    // Early return for SSR
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sceneHeight = window.innerHeight;
          const journeyScrollHeight = sceneHeight * 5;
          const scrollPosition = window.scrollY;

          // Calculate normalized progress (0 to 1)
          const progress = calculateScrollProgress(
            scrollPosition,
            journeyScrollHeight
          );

          // Freeze 3D animation at 95% to allow smooth projects scroll
          const frozenProgress = Math.min(progress, 0.95);
          setScrollProgress(frozenProgress);

          // Hide header when nearing journey end
          setIsHeaderVisible(progress <= 0.7);

          // Show projects section when journey is nearly complete
          setCanScrollToProjects(progress >= 0.95);

          ticking = false;
        });

        ticking = true;
      }
    };

    // Call once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrollProgress,
    isHeaderVisible,
    canScrollToProjects,
  };
}
