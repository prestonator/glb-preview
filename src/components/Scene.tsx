import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three"; // You will need to import THREE
import { Model } from "./Homestead2";
import { Model as ModelTimeline } from "./HomesteadTimeline";
import { CameraLogger } from './CamLogger';

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
  modelType?: "26-stage" | "4-stage";
}

export function Scene({ useCustomEnv = true, currentStage = 1, modelType = "26-stage" }: SceneProps) {
  return (
    <Canvas camera={{ position: [30, 8, 44], fov: 50 }}>
      <Suspense fallback={null}>
        {modelType === "26-stage" ? (
          <Model currentStage={currentStage} />
        ) : (
          <ModelTimeline />
        )}

        {useCustomEnv ? <CustomEnvironment /> : <Environment preset="forest" />}
      </Suspense>

      {/* Free orbit controls */}
      <OrbitControls makeDefault />
      {/* Camera logger */}
      <CameraLogger />
    </Canvas>
  );
}

export default Scene;
