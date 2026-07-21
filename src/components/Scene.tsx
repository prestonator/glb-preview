import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three"; // You will need to import THREE
import { Model } from "./HomesteadMain";

// 1. Create a helper component to load the PNG texture
function CustomEnvironment() {
  // Load custom sky image
  const texture = useTexture("/bgSky.png");
  
  // Tell Three.js to wrap this image around a 360-degree sphere
  texture.mapping = THREE.EquirectangularReflectionMapping;
  
  return (
    <>
      {/* Apply forest HDRI lighting to maintain model appearance */}
      <Environment preset="forest" />
      {/* Use custom texture ONLY for background to avoid overexposing lighting */}
      <Environment map={texture} background="only" blur={0.05} />
    </>
  );
}

interface SceneProps {
  useCustomEnv?: boolean;
  currentStage?: number;
}

export function Scene({ useCustomEnv = true, currentStage = 1 }: SceneProps) {
  return (
    <Canvas camera={{ position: [50, 50, 50], fov: 50 }}>
      <Suspense fallback={null}>
        <Model currentStage={currentStage} />
        
        {useCustomEnv ? (
          <CustomEnvironment />
        ) : (
          <Environment preset="forest" />
        )}
      </Suspense>

      {/* Free orbit controls */}
      <OrbitControls makeDefault />
    </Canvas>
  );
}

export default Scene;