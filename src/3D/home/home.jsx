import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Home(props) {
  const { scene } = useGLTF("/GLTF/home/home.gltf");

  // Memoize the cloned scene so it's stable across renders
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} {...props} />;
}
