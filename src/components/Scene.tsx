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
  Vignette
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
// 1. Create a helper component to load the PNG texture
function CustomEnvironment() {
  const texture = useTexture("/bgSky2.png");
  texture.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <>
      <Environment preset="forest" />
      <Environment map={texture} background="only" blur={0.05} />
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
    <Canvas shadows camera={{ position: [30, 8, 44], fov: 50 }}>
      {/* Lighting Setup */}
      <directionalLight
        castShadow
        color="#ff8c42" // Classic golden-hour orange
        position={[-50, 20, -40]} // Y lowered from 30 to 10 for long, stretching shadows
        intensity={2.5} // Bumped up slightly to punch through the warm colors
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      >
        {/* These define the "volume" the sun covers. Increase if shadows get clipped */}
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
      </directionalLight>
      <Suspense fallback={null}>
        {modelType === "26-stage" ? (
          <Model currentStage={currentStage} />
        ) : (
          <ModelTimeline />
        )}

        {useCustomEnv ? <CustomEnvironment /> : <Environment preset="sunset" />}
      </Suspense>

      {/* Free orbit controls */}
      <OrbitControls makeDefault />
      {/* Camera logger */}
      <CameraLogger />

      {/* 2. Add the Post-Processing Pipeline */}
      <EffectComposer enableNormalPass={false}>

        {/* 
          ToneMapping: 
          - mode: Controls how the colors are mapped to the screen 
          - good modes:LINEAR,NEUTRAL
        */}
        <ToneMapping mode={ToneMappingMode.NEUTRAL} />
        {/* 
          Bloom: 
          - luminanceThreshold: Controls how bright something must be to glow. (1+ prevents the whole screen from glowing)
          - mipmapBlur: Creates a very smooth, cinematic glow rather than a harsh blur
          - intensity: How strong the glow is
        */}
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.5} />

        {/* 
          Vignette: 
          - offset & darkness: Controls the size and opacity of the darkened edges 
        */}
        <Vignette eskil={false} offset={0.05} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}

export default Scene;
