"use client";
import { useRef } from "react";
import SceneLoader from "@/components/SceneLoader";
import Projects from "@/components/Projects";
import { useJourneyScroll } from "@/hooks";
import { SCROLL } from "@/lib/constants";

function Header({ isVisible }: { isVisible: boolean }) {
  const opacity = isVisible ? "opacity-100" : "opacity-0";

  return (
    <header
      className={`fixed top-2 sm:top-4 md:top-8 left-2 sm:left-4 md:left-8 text-white z-50 pointer-events-none drop-shadow-md transition-opacity ${SCROLL.TRANSITION_DURATION} max-w-[90vw] sm:max-w-none ${opacity}`}
    >
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
        M. NURUL ADZAN
      </h1>
      <p className="text-lg sm:text-base md:text-lg lg:text-xl text-green-400 font-mono mt-1 sm:mt-2">
        Frontend Developer // Touring Enthusiast
      </p>
      <div
        className="mt-1 sm:mt-2 md:mt-4 text-[15px] sm:text-xs md:text-sm opacity-70"
        aria-label="Scroll to explore"
      >
        SCROLL TO RIDE ▼
      </div>
    </header>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const { scrollProgress, isHeaderVisible, canScrollToProjects } =
    useJourneyScroll();

  const projectsOpacity = canScrollToProjects
    ? "opacity-100"
    : "opacity-0 pointer-events-none";

  return (
    <main ref={mainRef}>
      <div
        className="fixed top-0 left-0 w-full h-screen z-0"
        role="presentation"
        aria-label="Interactive 3D touring scene"
      >
        <SceneLoader scrollProgress={scrollProgress} />
      </div>

      <Header isVisible={isHeaderVisible} />

      <div
        style={{ height: "500vh" }}
        className="w-full relative z-10"
        aria-hidden="true"
      />

      <section
        className={`relative z-20 transition-opacity ${SCROLL.TRANSITION_DURATION} ${projectsOpacity}`}
        aria-label="Featured Projects"
      >
        <Projects />
      </section>
    </main>
  );
}
