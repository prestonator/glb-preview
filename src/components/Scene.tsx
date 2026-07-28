import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { Model } from "./Homestead2";
import { Model as ModelTimeline } from "./HomesteadTimeline";
import { CameraLogger } from "./CamLogger";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
  Vignette,
  Noise // 1. Imported Noise
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

function CustomEnvironment() {
  const texture = useTexture("/bgSky3.png");
  texture.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <>
      <Environment preset="forest" />
      <Environment map={texture} background="only" blur={0.05} backgroundRotation={[0, Math.PI, 0]} />
    </>
  );
}

interface SceneProps {
  useCustomEnv?: boolean;
  currentStage?: number;
  modelType?: "26-stage" | "4-stage";
}

export function Scene({
  useCustomEnv = true,
  currentStage = 1,
  modelType = "26-stage",
}: SceneProps) {
  return (
    <Canvas shadows camera={{ position: [30, 8, 44], fov: 60 }}>
      {/* Lighting Setup */}
      <directionalLight
        castShadow
        color="#ff8c42" 
        position={[-50, 10, -50]} // Lowered Y to 10 for longer, sweeping shadows
        intensity={2.5} 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      >
        {/* Added near (0.1) and far (500) planes to prevent shadow depth clipping */}
        <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40, 0.1, 500]} />
      </directionalLight>

      <Suspense fallback={null}>
        {modelType === "26-stage" ? (
          <Model currentStage={currentStage} />
        ) : (
          <ModelTimeline />
        )}
        {useCustomEnv ? <CustomEnvironment /> : <Environment preset="sunset" />}
      </Suspense>

      <OrbitControls makeDefault />
      <CameraLogger />

      {/* Post-Processing Pipeline */}
      <EffectComposer enableNormalPass={false}>
        {/* ACES_FILMIC is the industry standard for mapping high-contrast lighting */}
        <ToneMapping mode={ToneMappingMode.NEUTRAL} />
        
        <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.5} />
        
        {/* Subtle film grain ties the gradients together and prevents color banding */}
        <Noise opacity={0.03} />

        <Vignette eskil={false} offset={0.05} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}

export default Scene;