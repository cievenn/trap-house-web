"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getScroll } from "@/lib/scrollStore";

useGLTF.preload("/assets/logo1_draco.glb");

export function GlobalCanvas() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // SSR / Hydration guard — évite le flash blanc sur le serveur
  if (!isReady) {
    return <div className="fixed inset-0 z-0 bg-[#010101]" />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <ElectricSmokeLayer />
          <Logo3DScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

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

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScroll;

  varying vec2 vUv;

  // Génération de bruit fluide optimisé (sans texture externe)
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 x) {
      vec2 i = floor(x); vec2 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM rapide à 3 octaves
  float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 3; ++i) {
          v += a * noise(p); p = rot * p * 2.0; a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;

      float scrollFx = uScroll * 0.3;
      vec2 movement = vec2(uTime * 0.03, uTime * -0.08 + scrollFx);
      vec2 p = uv * 2.2 + movement;

      vec2 q = vec2(fbm(p + vec2(0.0, uTime * 0.03)), fbm(p + vec2(1.0, uTime * 0.03)));
      vec2 r = vec2(fbm(p + 0.4 * q + vec2(1.7, 9.2) + uTime * 0.02), fbm(p + 0.4 * q + vec2(8.3, 2.8) + uTime * 0.02));
      float f = fbm(p + r * 0.6);
      
      float eNoise = fbm(uv * 3.5 + vec2(uTime * 0.08, uTime * -0.15 + scrollFx * 0.8) + r * 1.0 - uTime * 0.3);

      // COULEURS MODIFIÉES : Retour aux noirs profonds de l'image 2
      vec3 darkBlue  = vec3(0.00, 0.00, 0.01); // Noir quasi pur
      vec3 midBlue   = vec3(0.01, 0.03, 0.08); // Cyan très très sombre
      vec3 lightBlue = vec3(0.05, 0.15, 0.3);

      vec3 color = mix(darkBlue, midBlue, smoothstep(0.1, 0.7, f));
      color = mix(color, lightBlue, smoothstep(0.4, 1.0, f) * smoothstep(0.2, 0.8, r.x));
      color *= (f * 1.5 + 0.1);

      float electricity = 0.0025 / (abs(eNoise - 0.5) + 0.003);
      electricity *= smoothstep(0.45, 0.85, f) * pow(sin(uTime * 3.0 + f * 10.0) * 0.5 + 0.5, 4.0);

      color += vec3(0.0, 0.8, 1.0) * electricity * 1.5; // Néon pur
      color *= clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 1.5, 0.0, 1.0); // Vignette

      gl_FragColor = vec4(color, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  SMOKE LAYER (renderOrder: 0, always visible)
// ═══════════════════════════════════════════════════════════════════════════════
function ElectricSmokeLayer() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
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
    u.uScroll.value = (getScroll() || 0) * 0.0015;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} renderOrder={0}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
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

function Logo3DScene() {
  const { scene } = useGLTF("/assets/logo1_draco.glb");
  const clone = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const createdMaterials = useRef<THREE.Material[]>([]);

  // Apply materials
  useEffect(() => {
    const mats: THREE.Material[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        const MaterialClass = THREE.MeshPhysicalMaterial;
        
        const mat = new MaterialClass({
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
        
        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mats.push(mat);
      }
    });

    createdMaterials.current = mats;

    return () => {
      // Dispose cloned materials ONLY
      mats.forEach((m) => m.dispose());
      // FIX: Retrait de mesh.geometry?.dispose() qui détruisait le modèle en mémoire
    };
  }, [clone]);

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
        speed={6}
        rotationIntensity={0.4}
        floatIntensity={1}
      >
        <ambientLight intensity={0.1} />
        
        <spotLight
          position={[0, 8, 7]}
          angle={0.4}
          penumbra={0.8}
          intensity={60}
          color="#D0E0FF"
          castShadow={false}
        />
        
        <pointLight
          position={[0, -5, 4]}
          intensity={10}
          color="#304060"
          distance={15}
        />

        <OrbitLight
          color="#00F2FF"
          intensity={35}
          radius={7}
          speed={0.3}
          yOffset={2}
          phase={0}
        />
        
        <group ref={groupRef}>
          <primitive object={clone} scale={5} position={[0,-3, 0]} />
        </group>

        <Environment preset="studio" />
      </Float>
    </group>
  );
}

useGLTF.preload("/assets/logo1_draco.glb");