"use client";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import { ThreeElements } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import * as THREE from "three";

export function MotorcycleModel(props: ThreeElements["group"]) {
  const materials = useLoader(
    MTLLoader,
    "/models/Generic_Bike_v01_w_Biker.mtl"
  );

  const obj = useLoader(
    OBJLoader,
    "/models/Generic_Bike_v01_w_Biker.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  useEffect(() => {
    if (!obj) return;

    obj.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child;
        const name = mesh.name.toLowerCase();

        if (
          name.includes("plane") ||
          name.includes("floor") ||
          name.includes("ground") ||
          name.includes("shadow") ||
          name.includes("studio") ||
          name.includes("base")
        ) {
          mesh.visible = false;
        } else {
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;

            if (material.map) {
              material.map.anisotropy = 4;
              material.map.generateMipmaps = true;
            }
          }

          mesh.frustumCulled = true;
        }
      }
    });
  }, [obj]);

  return (
    <primitive
      {...props}
      object={obj}
      scale={props.scale || 0.0007}
      rotation={props.rotation || [0, Math.PI, 0]}
    />
  );
}
