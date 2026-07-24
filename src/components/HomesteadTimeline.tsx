import * as THREE from "three";
import { useRef, useEffect } from "react";
import type { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    tree: THREE.Mesh;
    green: THREE.Mesh;
    Bonfire: THREE.Mesh;
    Hen: THREE.Mesh;
    Shovel4: THREE.Mesh;
    Trolley: THREE.Mesh;
    Water_Shower: THREE.Mesh;
    Well: THREE.Mesh;
    Farm_House: THREE.Mesh;
    Ground001: THREE.Mesh;
    House_Part: THREE.Mesh;
    Plant_Sand: THREE.Mesh;
    Road: THREE.Mesh;
    Horse: THREE.Mesh;
    House: THREE.Mesh;
    Big_Fan: THREE.Mesh;
    Grass: THREE.Mesh;
    Plants: THREE.Mesh;
    Hen_House: THREE.Mesh;
    Lamp: THREE.Mesh;
    Part: THREE.Mesh;
    Pitch_Fork: THREE.Mesh;
    Tent: THREE.Mesh;
    Cut_Tree: THREE.Mesh;
    Fence: THREE.Mesh;
    Out_Door: THREE.Mesh;
    Pant_Shirt_Hang: THREE.Mesh;
    Sand_Stone: THREE.Mesh;
    Tree: THREE.Mesh;
    Tree6: THREE.Mesh;
    Washroom: THREE.Mesh;
    Water_Basket: THREE.Mesh;
    Wood: THREE.Mesh;
  };
  materials: {
    Tree_Fence_Sand_Material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    Bonfire_Well_Material: THREE.MeshStandardMaterial;
    Farm_House_Material: THREE.MeshStandardMaterial;
    Ground_Material: THREE.MeshStandardMaterial;
    Horse_Material: THREE.MeshStandardMaterial;
    House_Material: THREE.MeshStandardMaterial;
    Plants_Grass_Fan_Material: THREE.MeshStandardMaterial;
    Tent_Hen_House_Material: THREE.MeshStandardMaterial;
  };
  animations: any[];
};

export function Model({ ...props }: any) {
  const { nodes, materials } = useGLTF(
    "/homestead2-transformed.glb"
  ) as unknown as GLTFResult;

  // Strongly typed refs for each animation stage
  const campRef = useRef<THREE.Group>(null);
  const farmRef = useRef<THREE.Group>(null);
  const homesteadRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Ensure refs exist before animating
    if (!campRef.current || !farmRef.current || !homesteadRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Initialize the scales of the groups to 0
    gsap.set(
      [
        campRef.current.scale,
        farmRef.current.scale,
        homesteadRef.current.scale,
      ],
      { x: 0, y: 0, z: 0 }
    );

    // Sequence the animation stages
    tl.to(campRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .to(
        farmRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "+=0.2"
      )
      .to(
        homesteadRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        },
        "+=0.3"
      );

    // Cleanup timeline on component unmount
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* STAGE 1: THE PLOT (Static environment, renders immediately) */}
      <group name="plot_stage">
        <mesh geometry={nodes.Ground001.geometry} material={materials.Ground_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Road.geometry} material={materials.Ground_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.tree.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.green.geometry} material={materials["Material.001"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Plant_Sand.geometry} material={materials.Ground_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Grass.geometry} material={materials.Plants_Grass_Fan_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Plants.geometry} material={materials.Plants_Grass_Fan_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Sand_Stone.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Tree.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Tree6.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>

      {/* STAGE 2: THE CAMP */}
      <group name="camp_stage" ref={campRef}>
        <mesh geometry={nodes.Tent.geometry} material={materials.Tent_Hen_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Bonfire.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Well.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Washroom.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Out_Door.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Cut_Tree.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Wood.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Pant_Shirt_Hang.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Water_Basket.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Water_Shower.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>

      {/* STAGE 3: THE FARM */}
      <group name="farm_stage" ref={farmRef}>
        <mesh geometry={nodes.Fence.geometry} material={materials.Tree_Fence_Sand_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Hen_House.geometry} material={materials.Tent_Hen_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Hen.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Horse.geometry} material={materials.Horse_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Shovel4.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Trolley.geometry} material={materials.Bonfire_Well_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Lamp.geometry} material={materials.Tent_Hen_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Pitch_Fork.geometry} material={materials.Tent_Hen_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Part.geometry} material={materials.Tent_Hen_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>

      {/* STAGE 4: THE HOMESTEAD */}
      <group name="homestead_stage" ref={homesteadRef}>
        <mesh geometry={nodes.Farm_House.geometry} material={materials.Farm_House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.House.geometry} material={materials.House_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.House_Part.geometry} material={materials.Ground_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Big_Fan.geometry} material={materials.Plants_Grass_Fan_Material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  );
}

useGLTF.preload("/homestead2-transformed.glb");
