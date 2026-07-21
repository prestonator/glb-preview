import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./HomesteadMain";

export function Scene() {
  return (
    <Canvas camera={{ position: [50, 50, 50], fov: 50 }} shadows>
      <Suspense fallback={null}>

        <Model />
        {/* Environment map for realistic PBR reflections based on grill-me choice */}
        <Environment preset="forest" />
      </Suspense>

      {/* Free orbit controls based on grill-me choice */}
      <OrbitControls makeDefault />
    </Canvas>
  );
}

export default Scene;
