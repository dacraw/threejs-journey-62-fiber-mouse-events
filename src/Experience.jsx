import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds, Bvh } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  // useBVH drei helper is better than meshBounds for complex geometries; improves performance and click accuracy

  const eventHandler = ({ eventObject }) => {
    // eventObject.color = new THREE.Color("red");
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  return (
    <Bvh>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        // raycast={meshBounds}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-z={-2}
        position-y={0.5}
        onClick={(e) => {
          console.log("hamburger click");
          e.stopPropagation();
        }}
      />
    </Bvh>
  );
}
