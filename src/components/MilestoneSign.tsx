"use client";

import { Text } from "@react-three/drei";
import { SIGN, COLORS, MATERIALS, FONTS } from "@/lib/constants";
import type { ResumeItem, SignDimensions } from "@/types";

interface MilestoneSignProps {
  item: ResumeItem;
  index: number;
  isMobile: boolean;
  maxDisplayDist: number;
}

function getSignDimensions(isMobile: boolean): SignDimensions {
  return {
    width: isMobile ? SIGN.MOBILE.WIDTH : SIGN.DESKTOP.WIDTH,
    height: isMobile ? SIGN.MOBILE.HEIGHT : SIGN.DESKTOP.HEIGHT,
    postHeight: isMobile ? SIGN.MOBILE.POST_HEIGHT : SIGN.DESKTOP.POST_HEIGHT,
    xOffset: isMobile ? SIGN.MOBILE.X_OFFSET : SIGN.DESKTOP.X_OFFSET,
    postRadius: isMobile ? SIGN.POST_RADIUS.MOBILE : SIGN.POST_RADIUS.DESKTOP,
    scale: 1,
  };
}

export function MilestoneSign({
  item,
  index,
  isMobile,
  maxDisplayDist,
}: MilestoneSignProps) {
  const displayDist = Math.min(item.distance, maxDisplayDist);
  const dimensions = getSignDimensions(isMobile);
  const xPos = index % 2 === 0 ? -dimensions.xOffset : dimensions.xOffset;

  return (
    <group key={item.id} position={[xPos, 0, -displayDist]}>
      <SignBoard dimensions={dimensions} item={item} isMobile={isMobile} />
      <SignPost dimensions={dimensions} />
      <PostBase />
    </group>
  );
}

function SignBoard({
  dimensions,
  item,
  isMobile,
}: {
  dimensions: SignDimensions;
  item: ResumeItem;
  isMobile: boolean;
}) {
  const yPos = dimensions.postHeight / 2 + dimensions.height / 2;

  return (
    <group>
      <mesh position={[0, yPos, 0.06]} castShadow receiveShadow>
        <planeGeometry args={[dimensions.width, dimensions.height]} />
        <meshStandardMaterial
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
          color={COLORS.SIGN_BACKGROUND}
          roughness={MATERIALS.SIGN.roughness}
          metalness={MATERIALS.SIGN.metalness}
        />
      </mesh>

      <mesh position={[0, yPos, -0.08]}>
        <boxGeometry
          args={[dimensions.width + 0.2, dimensions.height + 0.2, 0.1]}
        />
        <meshStandardMaterial
          color={COLORS.SIGN_FRAME}
          roughness={MATERIALS.FRAME.roughness}
          metalness={MATERIALS.FRAME.metalness}
        />
      </mesh>

      <SignText
        dimensions={dimensions}
        item={item}
        isMobile={isMobile}
        yPos={yPos}
      />
    </group>
  );
}

function SignText({
  dimensions,
  item,
  isMobile,
  yPos,
}: {
  dimensions: SignDimensions;
  item: ResumeItem;
  isMobile: boolean;
  yPos: number;
}) {
  const fontSize = {
    title: isMobile ? 0.35 : 0.45,
    company: isMobile ? 0.25 : 0.3,
    description: 0.18,
    date: isMobile ? 0.18 : 0.2,
  };

  return (
    <group scale={dimensions.scale} position={[0, yPos, 0.08]}>
      <Text
        position={[0, dimensions.height * 0.25, 0]}
        fontSize={fontSize.title}
        color={COLORS.SIGN_TITLE}
        anchorX="center"
        anchorY="middle"
        maxWidth={dimensions.width - 0.5}
        lineHeight={1.1}
        font={FONTS.INTER_BOLD}
      >
        {item.title}
      </Text>

      <Text
        position={[0, 0, 0]}
        fontSize={fontSize.company}
        color={COLORS.SIGN_COMPANY}
        anchorX="center"
        anchorY="middle"
        maxWidth={dimensions.width - 0.5}
      >
        {item.company}
      </Text>

      {!isMobile && (
        <Text
          position={[0, -dimensions.height * 0.2, 0]}
          fontSize={fontSize.description}
          color={COLORS.SIGN_DESCRIPTION}
          anchorX="center"
          anchorY="top"
          maxWidth={dimensions.width - 1.5}
          textAlign="center"
          lineHeight={1.2}
        >
          {item.description}
        </Text>
      )}

      <Text
        position={[
          0,
          isMobile ? -dimensions.height * 0.28 : -dimensions.height * 0.42,
          0,
        ]}
        fontSize={fontSize.date}
        color={COLORS.SIGN_DATE}
        anchorX="center"
        anchorY="bottom"
      >
        {item.date}
      </Text>
    </group>
  );
}

function SignPost({ dimensions }: { dimensions: SignDimensions }) {
  return (
    <mesh position={[0, dimensions.postHeight / 2, -0.2]} castShadow>
      <cylinderGeometry
        args={[
          dimensions.postRadius,
          dimensions.postRadius,
          dimensions.postHeight,
        ]}
      />
      <meshStandardMaterial
        color={COLORS.POST}
        roughness={MATERIALS.POST.roughness}
        metalness={MATERIALS.POST.metalness}
      />
    </mesh>
  );
}

function PostBase() {
  return (
    <mesh position={[0, 0.2, -0.2]} receiveShadow>
      <boxGeometry args={[0.8, 0.4, 0.8]} />
      <meshStandardMaterial color={COLORS.POST_BASE} />
    </mesh>
  );
}
