"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Logo3D } from "./Logo3D";

export default function Logo3DCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <group position={[0, -1, 0]} scale={0.85}>
          <Logo3D />
        </group>
      </Suspense>
    </Canvas>
  );
}
