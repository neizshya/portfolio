"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { MotorcycleModel } from "./MotorcycleModel";
import { MilestoneSign } from "./MilestoneSign";
import Road from "./Road";
import { Group } from "three";
import Landscape from "./landscape";
import { useViewport, useIsMobile } from "@/hooks";
import {
  SCENE_CONFIG,
  CAMERA,
  LIGHTING,
  STARS,
  COLORS,
  ANIMATION,
  PERFORMANCE,
} from "@/lib/constants";
import type { ResumeItem, ScrollProgressProps } from "@/types";
import milestonesData from "@/data/milestones.json";

function Milestones() {
  const { isMobile } = useViewport();
  const maxDisplayDist = Math.max(10, SCENE_CONFIG.TRAVEL - 8);

  return (
    <>
      {milestonesData.map((item: ResumeItem, index: number) => (
        <MilestoneSign
          key={item.id}
          item={item}
          index={index}
          isMobile={isMobile}
          maxDisplayDist={maxDisplayDist}
        />
      ))}
    </>
  );
}

function JourneyCamera() {
  const { isMobile } = useViewport();

  useFrame((state) => {
    const config = isMobile ? CAMERA.MOBILE : CAMERA.DESKTOP;
    state.camera.position.z = config.Z;
    state.camera.position.y = config.Y;
    state.camera.lookAt(0, CAMERA.LOOK_Y, config.LOOK_Z);
  });

  return null;
}

function BikeWrapper() {
  const bikeRef = useRef<Group>(null);

  useFrame((state) => {
    if (bikeRef.current) {
      bikeRef.current.position.z = 0;
      bikeRef.current.position.y = 0.25;
      bikeRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * ANIMATION.BIKE_WOBBLE_SPEED) *
        ANIMATION.BIKE_WOBBLE_AMOUNT;
    }
  });

  return (
    <group ref={bikeRef}>
      <Suspense fallback={<BikeFallback />}>
        <MotorcycleModel />
      </Suspense>
    </group>
  );
}

function BikeFallback() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 0.5, 1.5]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function WorldMover({
  scrollProgress,
  children,
}: {
  scrollProgress: number;
  children: React.ReactNode;
}) {
  const groupRef = useRef<Group>(null);
  const targetZ = useRef(0);
  const currentZ = useRef(0);
  const { invalidate } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const normalizedProgress = Math.max(0, Math.min(1, scrollProgress));
      targetZ.current = normalizedProgress * SCENE_CONFIG.TRAVEL;

      currentZ.current +=
        (targetZ.current - currentZ.current) * ANIMATION.SCROLL_LERP_FACTOR;

      groupRef.current.position.z = currentZ.current;
      invalidate();
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function TouringScene({ scrollProgress }: ScrollProgressProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`h-screen w-full bg-${COLORS.BACKGROUND}`}>
      <Canvas
        shadows="basic"
        camera={{ fov: isMobile ? CAMERA.MOBILE.FOV : CAMERA.DESKTOP.FOV }}
        dpr={isMobile ? PERFORMANCE.MOBILE_DPR : PERFORMANCE.DESKTOP_DPR}
        performance={{ min: PERFORMANCE.MIN_PERFORMANCE }}
        frameloop="demand"
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#1a1a2e");
        }}
      >
        <Suspense fallback={null}>
          <JourneyCamera />
          <SceneLighting isMobile={isMobile} />
          <Environment preset="night" background={false} />

          <WorldMover scrollProgress={scrollProgress}>
            <Landscape />
            <Road />
            <Milestones />
          </WorldMover>

          <BikeWrapper />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneLighting({ isMobile }: { isMobile: boolean }) {
  const shadowMapSize = isMobile
    ? LIGHTING.DIRECTIONAL.shadow.MOBILE
    : LIGHTING.DIRECTIONAL.shadow.DESKTOP;

  const starsCount = isMobile ? STARS.MOBILE_COUNT : STARS.DESKTOP_COUNT;

  return (
    <>
      <ambientLight intensity={LIGHTING.AMBIENT_INTENSITY} />
      <hemisphereLight
        args={[
          LIGHTING.HEMISPHERE.sky,
          LIGHTING.HEMISPHERE.ground,
          LIGHTING.HEMISPHERE.intensity,
        ]}
      />
      <directionalLight
        castShadow
        position={LIGHTING.DIRECTIONAL.position}
        intensity={LIGHTING.DIRECTIONAL.intensity}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <spotLight
        position={LIGHTING.SPOTLIGHT.position}
        intensity={LIGHTING.SPOTLIGHT.intensity}
        angle={LIGHTING.SPOTLIGHT.angle}
        penumbra={LIGHTING.SPOTLIGHT.penumbra}
      />
      <Stars
        radius={STARS.RADIUS}
        depth={STARS.DEPTH}
        count={starsCount}
        factor={STARS.FACTOR}
        fade
      />
    </>
  );
}
