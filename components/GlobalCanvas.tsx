"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { getScroll } from "@/lib/scrollStore";

// ═══════════════════════════════════════════════════════════════════════════════
//  SHADERS — "FUMÉE ÉLECTRIQUE"
// ═══════════════════════════════════════════════════════════════════════════════
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const getFragmentShader = (isLowEnd: boolean) => /* glsl */ `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScroll;

  varying vec2 vUv;

  ${isLowEnd ? `
  // SIMPLIFIED LOW-END HASH/NOISE (Mobile)
  float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      for (int i = 0; i < 2; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
      return v;
  }
  ` : `
  // HIGH END HASH/NOISE (PC)
  float hash(vec2 p) {
      vec3 p3  = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
  }
  float noise(vec2 x) {
      vec2 i = floor(x); vec2 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i + vec2(0.0, 0.0)); float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
      float v = 0.0; float a = 0.5; vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; ++i) {
          v += a * noise(p); p = rot * p * 2.0 + shift; a *= 0.5;
      }
      return v;
  }
  `}

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;

      float scrollFx = uScroll * 0.3;
      vec2 movement = vec2(uTime * 0.03, uTime * -0.08 + scrollFx);
      vec2 p = uv * 2.2 + movement;

      ${isLowEnd ? `
      float q = fbm(p + uTime * 0.03);
      float r = fbm(p + q + uTime * 0.02);
      float f = fbm(p + r * 0.6);
      float dx = sin(uv.x * 10.0 + uTime) * 0.1;
      float eNoise = fbm(uv * 3.5 + vec2(dx, uTime * -0.15));
      ` : `
      vec2 q = vec2(0.0);
      q.x = fbm(p + vec2(0.0, uTime * 0.03));
      q.y = fbm(p + vec2(1.0, uTime * 0.03));
      vec2 r = vec2(0.0);
      r.x = fbm(p + 0.4 * q + vec2(1.7, 9.2) + uTime * 0.02);
      r.y = fbm(p + 0.4 * q + vec2(8.3, 2.8) + uTime * 0.02);
      float f = fbm(p + r * 0.6);

      vec2 ep = uv * 3.5 + vec2(uTime * 0.08, uTime * -0.15 + scrollFx * 0.8);
      float eNoise = fbm(ep + r * 1.0 - uTime * 0.3);
      `}

      vec3 darkBlue  = vec3(0.01, 0.015, 0.04);
      vec3 midBlue   = vec3(0.04, 0.08, 0.18);
      vec3 lightBlue = vec3(0.1, 0.2, 0.4);

      vec3 color = mix(darkBlue, midBlue, smoothstep(0.1, 0.7, f));
      ${isLowEnd ? `
      color = mix(color, lightBlue, smoothstep(0.4, 1.0, f));
      ` : `
      color = mix(color, lightBlue, smoothstep(0.4, 1.0, f) * smoothstep(0.2, 0.8, r.x));
      `}
      color *= (f * 1.5 + 0.1);

      float ridge = abs(eNoise - 0.5);
      float electricity = 0.0025 / (ridge + 0.003);

      float mask = smoothstep(0.45, 0.85, f);
      float flash = pow(sin(uTime * 3.0 + f * 10.0) * 0.5 + 0.5, 4.0);
      electricity *= mask * flash;

      vec3 elecColor = vec3(0.4, 0.8, 1.0);
      color += elecColor * electricity * 1.8;

      vec2 screenCenter = vUv - 0.5;
      float vignette = 1.0 - dot(screenCenter, screenCenter) * 1.5;
      color *= clamp(vignette, 0.0, 1.0);

      gl_FragColor = vec4(color, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  SMOKE LAYER (renderOrder: 0, always visible)
// ═══════════════════════════════════════════════════════════════════════════════
function ElectricSmokeLayer({ isLowEnd }: { isLowEnd: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    }),
    [isLowEnd]
  );

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    
    // FIX: Protéger contre une valeur de scroll undefined (NaN casse le WebGL)
    u.uScroll.value = (getScroll() || 0) * 0.0015;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} renderOrder={0}>
      <planeGeometry args={isLowEnd ? [1, 1] : [2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={getFragmentShader(isLowEnd)}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  LOGO 3D SCENE (renderOrder: 1, fades out with scroll)
// ═══════════════════════════════════════════════════════════════════════════════
function OrbitLight({
  color,
  intensity,
  radius,
  speed,
  yOffset = 0,
  phase = 0,
}: {
  color: string;
  intensity: number;
  radius: number;
  speed: number;
  yOffset?: number;
  phase?: number;
}) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      yOffset + Math.sin(t * 0.4) * 1.5,
      Math.sin(t) * radius
    );
  });

  return (
    <pointLight
      ref={ref}
      color={color}
      intensity={intensity}
      distance={20}
      decay={2}
    />
  );
}

function Logo3DScene({ isLowEnd }: { isLowEnd: boolean }) {
  const { scene } = useGLTF("/assets/logo1_draco.glb");
  const clone = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const createdMaterials = useRef<THREE.MeshPhysicalMaterial[]>([]);

  // Apply materials
  useEffect(() => {
    const mats: THREE.MeshPhysicalMaterial[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        let mat;
        
        if (isLowEnd) {
          mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#A8B4C8"),
            metalness: 0.7,
            roughness: 0.4,
            transparent: true,
            opacity: 1,
          });
        } else {
          mat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#A8B4C8"),
            metalness: 1.0,
            roughness: 0.1,
            envMapIntensity: 3.0,
            reflectivity: 1.0,
            clearcoat: 0.4,
            clearcoatRoughness: 0.08,
            transparent: true,
            opacity: 1,
          });
        }
        
        mesh.material = mat;
        mesh.castShadow = !isLowEnd;
        mesh.receiveShadow = !isLowEnd;
        mats.push(mat as THREE.MeshPhysicalMaterial);
      }
    });

    createdMaterials.current = mats;

    return () => {
      // Dispose cloned materials ONLY
      mats.forEach((m) => m.dispose());
      // FIX: Retrait de mesh.geometry?.dispose() qui détruisait le modèle en mémoire
    };
  }, [clone, isLowEnd]);

  // Animate rotation + scroll-driven visibility
  useFrame(({ clock }) => {
    if (!groupRef.current || !containerRef.current) return;

    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;

    // Fade out with scroll
    const scrollPx = getScroll() || 0; // FIX: Protéger contre undefined
    const fadeStart = 100;
    const fadeEnd = 600;
    
    // FIX: Math.min/max assure que l'opacité est strictement comprise entre 0 et 1
    const opacity = Math.max(0, Math.min(1, 1 - (scrollPx - fadeStart) / (fadeEnd - fadeStart)));
    
    containerRef.current.visible = opacity > 0.01;

    // Apply opacity to materials
    if (createdMaterials.current.length > 0) {
      createdMaterials.current.forEach((mat) => {
        mat.opacity = opacity;
      });
    }
  });

  return (
    <group ref={containerRef} renderOrder={1}>
      <Float
        speed={isLowEnd ? 2 : 6}
        rotationIntensity={isLowEnd ? 0 : 0.4}
        floatIntensity={isLowEnd ? 0.5 : 1}
      >
        <ambientLight intensity={isLowEnd ? 0.2 : 0.08} />
        <spotLight
          position={[0, 8, 7]}
          angle={0.35}
          penumbra={0.8}
          intensity={80}
          color="#D0E0FF"
          castShadow={!isLowEnd}
          shadow-mapSize={isLowEnd ? [512, 512] : [1024, 1024]}
        />
        <pointLight
          position={[0, -5, 4]}
          intensity={8}
          color="#304060"
          distance={15}
        />

        {!isLowEnd && (
          <spotLight
            position={[0, 3, -8]}
            angle={0.5}
            penumbra={1.0}
            intensity={30}
            color="#00A8C8"
          />
        )}

        <OrbitLight
          color="#00F2FF"
          intensity={35}
          radius={7}
          speed={0.3}
          yOffset={2}
          phase={0}
        />

        {!isLowEnd && (
          <>
            <OrbitLight
              color="#C8D8F0"
              intensity={20}
              radius={6}
              speed={0.2}
              yOffset={-1}
              phase={Math.PI}
            />
            <OrbitLight
              color="#00F2FF"
              intensity={15}
              radius={4}
              speed={0.55}
              yOffset={-3}
              phase={Math.PI * 0.5}
            />
          </>
        )}

        <group ref={groupRef}>
          <primitive object={clone} scale={5} position={[0,-3, 0]} />
        </group>

        <Environment preset="studio" />
      </Float>
    </group>
  );
}

useGLTF.preload("/assets/logo1_draco.glb");

// ═══════════════════════════════════════════════════════════════════════════════
//  GLOBAL CANVAS — Single WebGL context for the entire page
// ═══════════════════════════════════════════════════════════════════════════════
export function GlobalCanvas() {
  const [isReady, setIsReady] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    setIsLowEnd(isTouch || lowCores);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#010101]" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={isLowEnd ? [0.75, 1] : [1, 1.5]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          // FIX: Le paramètre 'depth: false' a été retiré, il entrait en conflit avec le MeshPhysicalMaterial et l'Environment
        }}
      >
        <Suspense fallback={null}>
          <ElectricSmokeLayer isLowEnd={isLowEnd} />
          <Logo3DScene isLowEnd={isLowEnd} />
        </Suspense>
      </Canvas>
    </div>
  );
}