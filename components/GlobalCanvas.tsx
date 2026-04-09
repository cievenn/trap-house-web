"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getScroll } from "@/lib/scrollStore";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities"; // Ajout de votre hook

// ═══════════════════════════════════════════════════════════════════════════════
//  MOBILE VIDEO BACKGROUND — CSS premium → fondu vidéo au 1er geste utilisateur
// ═══════════════════════════════════════════════════════════════════════════════
function MobileVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // videoReady : la vidéo est chargée ET en cours de lecture → on peut l'afficher
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Tentative de lecture immédiate directe
    video.play().then(() => {
      setVideoReady(true);
    }).catch(() => {
      // Bloqué en mode économie de batterie ou par la politique stricte autoplay
      setVideoFailed(true); // On affiche alors le CSS simple
      
      const unlockOnTouch = () => {
        video.play().then(() => {
          setVideoReady(true);
          setVideoFailed(false); // Retrait du background CSS une fois démarré
        }).catch(() => {});
        document.removeEventListener("touchstart", unlockOnTouch);
        document.removeEventListener("click", unlockOnTouch);
        document.removeEventListener("scroll", unlockOnTouch);
      };
      
      document.addEventListener("touchstart", unlockOnTouch, { once: true, passive: true });
      document.addEventListener("click", unlockOnTouch, { once: true });
      document.addEventListener("scroll", unlockOnTouch, { once: true, passive: true });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050A]">

      {/* ── FOND CSS SIMPLE (monté UNIQUEMENT si la vidéo échoue) ── */}
      {videoFailed && (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,180,255,0.15)_0%,transparent_80%)]" />
        </div>
      )}

      {/* ── VIDÉO (préchargée silencieusement, fondu-entrant au 1er geste) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: videoReady ? 0.65 : 0 }}
      >
        <source src="/assets/smoke-background.mp4" type="video/mp4" />
      </video>
      
      {/* Black overlay replacing 'filter: brightness(0.75)' for better GPU performance */}
      <div 
        className="absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-[1200ms] ease-in-out" 
        style={{ opacity: videoReady ? 1 : 0 }} 
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MOBILE LOGO SCENE — MatCap only. 0 lumières, 0 Environment, 0 shader lourd.
//  Fondu de disparition pilotée par le scroll (identique à la version PC).
// ═══════════════════════════════════════════════════════════════════════════════
function MobileLogoScene() {
  const { scene } = useGLTF("/assets/logo1_draco.glb");
  const clone = useMemo(() => scene.clone(), [scene]);
  const matcap = useTexture("/assets/matcap-chrome.webp");

  const groupRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const createdMaterials = useRef<THREE.MeshMatcapMaterial[]>([]);

  // Configuration texture matcap : filtrage lisse + espace couleur correct
  useEffect(() => {
    matcap.minFilter = THREE.LinearFilter;
    matcap.magFilter = THREE.LinearFilter;
    matcap.colorSpace = THREE.SRGBColorSpace;
    matcap.needsUpdate = true;
  }, [matcap]);

  // Application du matcap sur chaque mesh + recalcul des normales lisses
  useEffect(() => {
    const mats: THREE.MeshMatcapMaterial[] = [];
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // CORRECTION KALÉIDOSCOPE : suppression (le modèle a été mis à jour avec un shade smooth natif Blender)
        // La ligne mesh.geometry.computeVertexNormals() ruinait le process CPU mobile.

        const mat = new THREE.MeshMatcapMaterial({
          matcap,
          transparent: true,
          opacity: 1,
          flatShading: false, // Force l'interpolation lisse entre les vertex
        });
        mesh.material = mat;
        mats.push(mat);
      }
    });
    createdMaterials.current = mats;
    return () => mats.forEach((m) => m.dispose());
  }, [clone, matcap]);

  // Légère oscillation + fondu au scroll (même comportement que sur PC)
  useFrame(({ clock }) => {
    if (!groupRef.current || !containerRef.current) return;

    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;

    const scrollPx = getScroll() || 0;
    const opacity = Math.max(0, Math.min(1, 1 - (scrollPx - 100) / 500));
    containerRef.current.visible = opacity > 0.01;

    createdMaterials.current.forEach((mat) => {
      mat.opacity = opacity;
    });
  });

  return (
    <group ref={containerRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <group ref={groupRef}>
          <primitive object={clone} scale={5} position={[0, -3, 0]} />
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/assets/logo1_draco.glb");

export function GlobalCanvas() {
  const [isReady, setIsReady] = useState(false);
  const { isMobile } = useDeviceCapabilities();

  useEffect(() => {
    setIsReady(true);
  }, []);

  // SSR / Hydration guard — évite le flash blanc sur le serveur
  if (!isReady) {
    return <div className="fixed inset-0 z-0 bg-[#010101]" />;
  }

  // ==== MOBILE : vidéo + logo matcap, zéro WebGL lourd ====
  if (isMobile) {
    return (
      <>
        {/* Fond vidéo */}
        <MobileVideoBackground />
        {/* Logo matcap dans son propre canvas — indépendant de la vidéo */}
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 9], fov: 45 }}
            dpr={[0.75, 1]}
            gl={{
              alpha: true,       // fond transparent pour voir la vidéo derrière
              antialias: false,
              powerPreference: "high-performance",
              stencil: false,
            }}
          >
            <Suspense fallback={null}>
              <MobileLogoScene />
            </Suspense>
          </Canvas>
        </div>
      </>
    );
  }

  // ==== DESKTOP : WebGL complet ====
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

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;

      float scrollFx = uScroll * 0.3;
      vec2 movement = vec2(uTime * 0.03, uTime * -0.08 + scrollFx);
      vec2 p = uv * 2.2 + movement;

      vec2 q = vec2(0.0);
      q.x = fbm(p + vec2(0.0, uTime * 0.03));
      q.y = fbm(p + vec2(1.0, uTime * 0.03));
      vec2 r = vec2(0.0);
      r.x = fbm(p + 0.4 * q + vec2(1.7, 9.2) + uTime * 0.02);
      r.y = fbm(p + 0.4 * q + vec2(8.3, 2.8) + uTime * 0.02);
      float f = fbm(p + r * 0.6);

      vec2 ep = uv * 3.5 + vec2(uTime * 0.08, uTime * -0.15 + scrollFx * 0.8);
      float eNoise = fbm(ep + r * 1.0 - uTime * 0.3);

      vec3 darkBlue  = vec3(0.01, 0.015, 0.04);
      vec3 midBlue   = vec3(0.04, 0.08, 0.18);
      vec3 lightBlue = vec3(0.1, 0.2, 0.4);

      vec3 color = mix(darkBlue, midBlue, smoothstep(0.1, 0.7, f));
      color = mix(color, lightBlue, smoothstep(0.4, 1.0, f) * smoothstep(0.2, 0.8, r.x));
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
function ElectricSmokeLayer() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
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
  const createdMaterials = useRef<THREE.MeshPhysicalMaterial[]>([]);

  // Apply materials
  useEffect(() => {
    const mats: THREE.MeshPhysicalMaterial[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = new THREE.MeshPhysicalMaterial({
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
        mats.push(mat as THREE.MeshPhysicalMaterial);
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
        <ambientLight intensity={0.08} />
        <spotLight
          position={[0, 8, 7]}
          angle={0.35}
          penumbra={0.8}
          intensity={80}
          color="#D0E0FF"
          castShadow={true}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight
          position={[0, -5, 4]}
          intensity={8}
          color="#304060"
          distance={15}
        />

        <spotLight
          position={[0, 3, -8]}
          angle={0.5}
          penumbra={1.0}
          intensity={30}
          color="#00A8C8"
        />

        <OrbitLight
          color="#00F2FF"
          intensity={35}
          radius={7}
          speed={0.3}
          yOffset={2}
          phase={0}
        />

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

        <group ref={groupRef}>
          <primitive object={clone} scale={5} position={[0,-3, 0]} />
        </group>

        <Environment preset="studio" />
      </Float>
    </group>
  );
}

useGLTF.preload("/assets/logo1_draco.glb");