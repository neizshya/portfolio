"use client";
import React, { useMemo } from "react";
import { pseudoRandom } from "@/hooks";
import { SCENE_CONFIG, LANDSCAPE, COLORS } from "@/lib/constants";
import type { LandscapeObject, SceneryData } from "@/types";

const Tree = ({ pos, scale }: LandscapeObject) => {
  return (
    <group position={pos} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.4, 1, 5]} />
        <meshStandardMaterial color={COLORS.TREE_TRUNK} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[1, 2, 5]} />
        <meshStandardMaterial color={COLORS.TREE_DARK} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.7, 1.5, 5]} />
        <meshStandardMaterial color={COLORS.TREE_LIGHT} roughness={0.8} />
      </mesh>
    </group>
  );
};

const Mountain = ({ pos, scale, rot }: Required<LandscapeObject>) => {
  return (
    <mesh position={pos} rotation={[0, rot, 0]} receiveShadow>
      <coneGeometry args={[scale, scale * 1.5, 4]} />
      <meshStandardMaterial color={COLORS.MOUNTAIN} roughness={0.9} />
    </mesh>
  );
};

function GroundPlane() {
  const midpoint = -SCENE_CONFIG.ROAD_LENGTH / 2;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, midpoint]}
      receiveShadow
    >
      <planeGeometry args={[LANDSCAPE.GROUND_SIZE, LANDSCAPE.GROUND_SIZE]} />
      <meshStandardMaterial color={COLORS.GROUND} roughness={1} metalness={0} />
    </mesh>
  );
}

function generateTrees(length: number): LandscapeObject[] {
  const trees: LandscapeObject[] = [];

  for (let i = 0; i < LANDSCAPE.TREE_COUNT; i++) {
    const r1 = pseudoRandom(i * 13.5);
    const r2 = pseudoRandom(i * 42.1);
    const r3 = pseudoRandom(i * 7.8);

    const z = 20 - r1 * length;
    const isLeft = r2 > 0.5;
    const xBase = isLeft ? -1 : 1;
    const x =
      xBase *
      (LANDSCAPE.TREE.MIN_DISTANCE +
        r3 * (LANDSCAPE.TREE.MAX_DISTANCE - LANDSCAPE.TREE.MIN_DISTANCE));
    const scale =
      LANDSCAPE.TREE.MIN_SCALE +
      r2 * (LANDSCAPE.TREE.MAX_SCALE - LANDSCAPE.TREE.MIN_SCALE);

    trees.push({ pos: [x, 0, z] as [number, number, number], scale });
  }

  return trees;
}

function generateMountains(length: number): Required<LandscapeObject>[] {
  const mountains: Required<LandscapeObject>[] = [];

  for (let i = 0; i < LANDSCAPE.MOUNTAIN_COUNT; i++) {
    const idx = i + 100;
    const r1 = pseudoRandom(idx * 22.4);
    const r2 = pseudoRandom(idx * 5.9);
    const r3 = pseudoRandom(idx * 99.1);

    const z = 20 - r1 * length;
    const isLeft = r2 > 0.5;
    const xBase = isLeft ? -1 : 1;
    const x =
      xBase *
      (LANDSCAPE.MOUNTAIN.MIN_DISTANCE +
        r3 *
          (LANDSCAPE.MOUNTAIN.MAX_DISTANCE - LANDSCAPE.MOUNTAIN.MIN_DISTANCE));
    const scale =
      LANDSCAPE.MOUNTAIN.MIN_SCALE +
      r2 * (LANDSCAPE.MOUNTAIN.MAX_SCALE - LANDSCAPE.MOUNTAIN.MIN_SCALE);
    const rot = r3 * Math.PI;

    mountains.push({
      pos: [x, 0, z] as [number, number, number],
      scale,
      rot,
    });
  }

  return mountains;
}

export default function Landscape() {
  const scenery: SceneryData = useMemo(() => {
    const length = SCENE_CONFIG.ROAD_LENGTH + 50;
    return {
      trees: generateTrees(length),
      mountains: generateMountains(length),
    };
  }, []);

  return (
    <group>
      <GroundPlane />

      {scenery.trees.map((data, i) => (
        <Tree key={`tree-${i}`} pos={data.pos} scale={data.scale} />
      ))}

      {scenery.mountains.map((data, i) => (
        <Mountain
          key={`mountain-${i}`}
          pos={data.pos}
          scale={data.scale}
          rot={data.rot}
        />
      ))}
    </group>
  );
}
