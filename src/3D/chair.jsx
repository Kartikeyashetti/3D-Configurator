// src/Blocks/Chair/Chair.jsx
import React, { forwardRef, useMemo} from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


const Chair = forwardRef(({ modelPath, onClick, ...props }, ref) => {
  const { scene } = useGLTF(modelPath);

   const Material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#800000" }), // maroon hex
    []
  );

   scene.traverse((child) => {
    if (child.isMesh) {
      child.material = Material;
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      onClick={(e) => {
        e.stopPropagation(); // prevent canvas click
        onClick?.(e);
      }}
    >
      <primitive object={scene} />
    </group>
  );
});

export default Chair;

// ✅ Preload all chairs for smoother switching
useGLTF.preload("/gltf/chair/chair1.glb");
useGLTF.preload("/gltf/chair/chair2.glb");
useGLTF.preload("/gltf/chair/chair3.glb");
