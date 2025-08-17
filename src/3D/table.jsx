import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const Table = forwardRef(({ modelPath, onClick, ...props }, ref) => {
  const { scene } = useGLTF(modelPath);

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

export default Table;

// ✅ Preload all tables for smoother switching
// useGLTF.preload("/GLTF/table/table1/table.gltf");
// useGLTF.preload("/GLTF/table/table2/Rolling_B.gltf");
// useGLTF.preload("/GLTF/table/table3/Rolling_B.gltf");
