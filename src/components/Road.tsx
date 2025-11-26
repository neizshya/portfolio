"use client";
import React from "react";
import { ThreeElements } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useViewport } from "@/hooks";
import {
  SCENE_CONFIG,
  ROAD,
  BILLBOARD,
  COLORS,
  MATERIALS,
  FONTS,
} from "@/lib/constants";

/**
 * Calculates road dash positions
 */
function generateDashPositions(totalLength: number): { z: number }[] {
  const dashCount = Math.floor(totalLength / ROAD.DASH_SPACING);
  return Array.from({ length: dashCount }, (_, i) => ({
    z: SCENE_CONFIG.BUFFER_LENGTH - i * ROAD.DASH_SPACING - 3,
  }));
}

/**
 * Road surface mesh
 */
function RoadSurface({
  width,
  zPos,
  totalLength,
}: {
  width: number;
  zPos: number;
  totalLength: number;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, zPos]} receiveShadow>
      <planeGeometry args={[width, totalLength]} />
      <meshStandardMaterial
        color={COLORS.ROAD_SURFACE}
        roughness={MATERIALS.ROAD.roughness}
        metalness={MATERIALS.ROAD.metalness}
      />
    </mesh>
  );
}

/**
 * Road dash marker
 */
function RoadDash({ z }: { z: number }) {
  return (
    <mesh position={[0, 0.02, z]} receiveShadow>
      <boxGeometry args={[ROAD.LANE_WIDTH, 0.02, ROAD.DASH_LENGTH]} />
      <meshStandardMaterial
        color={COLORS.ROAD_DASH}
        roughness={0.25}
        metalness={0}
      />
    </mesh>
  );
}

/**
 * Road curb/side barrier
 */
function RoadCurb({
  position,
  width,
  totalLength,
}: {
  position: [number, number, number];
  width: number;
  totalLength: number;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[width, ROAD.CURB.HEIGHT, totalLength]} />
      <meshStandardMaterial
        color={COLORS.CURB}
        roughness={MATERIALS.CURB.roughness}
        metalness={MATERIALS.CURB.metalness}
      />
    </mesh>
  );
}

/**
 * End-of-road billboard
 */
function EndBillboard() {
  return (
    <group position={[0, 0, -SCENE_CONFIG.TRAVEL]}>
      <BillboardPoles />
      <BillboardSign />
      <BillboardLight />
    </group>
  );
}

/**
 * Billboard support poles
 */
function BillboardPoles() {
  const poleGeometry = (
    <cylinderGeometry
      args={[
        BILLBOARD.POLE_RADIUS,
        BILLBOARD.POLE_RADIUS,
        BILLBOARD.POLE_HEIGHT,
      ]}
    />
  );
  const poleMaterial = (
    <meshStandardMaterial color={COLORS.POST} roughness={0.5} />
  );

  return (
    <>
      <mesh position={[-4, BILLBOARD.POLE_HEIGHT / 2, 0]} castShadow>
        {poleGeometry}
        {poleMaterial}
      </mesh>
      <mesh position={[4, BILLBOARD.POLE_HEIGHT / 2, 0]} castShadow>
        {poleGeometry}
        {poleMaterial}
      </mesh>
    </>
  );
}

/**
 * Billboard sign board with text
 */
function BillboardSign() {
  return (
    <>
      <mesh position={[0, BILLBOARD.SIGN_HEIGHT_POS, 0]} castShadow>
        <boxGeometry args={[BILLBOARD.WIDTH, BILLBOARD.HEIGHT, 0.5]} />
        <meshStandardMaterial
          color={COLORS.BILLBOARD_RED}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <Text
        position={[0, BILLBOARD.SIGN_HEIGHT_POS + 1.2, 0.3]}
        fontSize={0.9}
        color={COLORS.SIGN_TITLE}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor={COLORS.SIGN_FRAME}
        font={FONTS.INTER_BOLD}
      >
        🚧 ROAD ENDS 🚧
      </Text>

      <Text
        position={[0, BILLBOARD.SIGN_HEIGHT_POS - 0.5, 0.3]}
        fontSize={0.28}
        color="#eeeeee"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        maxWidth={BILLBOARD.WIDTH - 1}
        lineHeight={1.4}
      >
        {`PROJECT UNDER DEVELOPMENT\n\nContact for Full Version:\n+62-895-2535-7275\nNurul.adzan24@gmail.com \n scroll down to look at projects I've become part of in the past`}
      </Text>
    </>
  );
}

/**
 * Spotlight illuminating the billboard
 */
function BillboardLight() {
  return (
    <pointLight
      position={[0, BILLBOARD.SIGN_HEIGHT_POS + 2.5, 2]}
      color="red"
      intensity={2}
      distance={10}
    />
  );
}

/**
 * Main Road component
 */
export default function Road(props: ThreeElements["group"]) {
  const { isMobile } = useViewport();
  const width = isMobile ? ROAD.MOBILE_WIDTH : ROAD.DESKTOP_WIDTH;
  const curbWidth = isMobile ? ROAD.CURB.MOBILE_WIDTH : ROAD.CURB.DESKTOP_WIDTH;

  const totalLength = SCENE_CONFIG.ROAD_LENGTH + SCENE_CONFIG.BUFFER_LENGTH;
  const zPos = (SCENE_CONFIG.BUFFER_LENGTH - SCENE_CONFIG.ROAD_LENGTH) / 2;

  const dashes = generateDashPositions(totalLength);

  return (
    <group {...props}>
      <RoadSurface width={width} zPos={zPos} totalLength={totalLength} />

      {dashes.map((dash, idx) => (
        <RoadDash key={idx} z={dash.z} />
      ))}

      <RoadCurb
        position={[-width / 2 - 0.5, 0.1, zPos]}
        width={curbWidth}
        totalLength={totalLength}
      />

      <RoadCurb
        position={[width / 2 + 0.5, 0.1, zPos]}
        width={curbWidth}
        totalLength={totalLength}
      />

      <EndBillboard />
    </group>
  );
}
