"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════════════════
//  SHADERS — "FUMÉE ÉLECTRIQUE" (Rendu Vaporeux)
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
  uniform float uLowEnd; // 1.0 = mobile/low-end, 0.0 = high-end PC

  varying vec2 vUv;

  // Fonction de hash rapide pour générer du bruit procédural sans texture
  float hash(vec2 p) {
      vec3 p3  = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
  }

  // Value noise très doux et optimisé
  float noise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      // Lissage cubique pour un effet nuageux très doux
      f = f * f * (3.0 - 2.0 * f); 
      
      float a = hash(i + vec2(0.0, 0.0));
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM (Fractal Brownian Motion)
  float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      // Rotation douce pour éviter les biais axiaux
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      
      // Adaptation des performances (3 boucles sur mobile, 5 sur PC)
      int maxIters = uLowEnd > 0.5 ? 3 : 5;
      
      for (int i = 0; i < 5; ++i) {
          if (i >= maxIters) break;
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;

      // Adoucissement du scroll pour éviter l'effet "soupe remuée"
      float scrollFx = uScroll * 0.3; 
      
      // La fumée dérive doucement vers le haut
      vec2 movement = vec2(uTime * 0.03, uTime * -0.08 + scrollFx);
      
      // Échelle globale : plus c'est petit, plus les volutes de fumée sont grosses
      vec2 p = uv * 2.2 + movement;

      // Déformations douces (Domain Warping)
      vec2 q = vec2(0.0);
      q.x = fbm(p + vec2(0.0, uTime * 0.03));
      q.y = fbm(p + vec2(1.0, uTime * 0.03));

      vec2 r = vec2(0.0);
      // On réduit le multiplicateur de 'q' (0.4 au lieu de 1.0) pour enlever l'effet visqueux/gélatine
      r.x = fbm(p + 0.4 * q + vec2(1.7, 9.2) + uTime * 0.02);
      r.y = fbm(p + 0.4 * q + vec2(8.3, 2.8) + uTime * 0.02);

      // Intensité finale de la fumée
      float f = fbm(p + r * 0.6);

      // Couleurs : Teintes bleutées / nuit
      vec3 darkBlue  = vec3(0.01, 0.015, 0.04);
      vec3 midBlue   = vec3(0.04, 0.08, 0.18);
      vec3 lightBlue = vec3(0.1, 0.2, 0.4);

      // Mélange très doux avec smoothstep (adieu les arêtes dures)
      vec3 color = mix(darkBlue, midBlue, smoothstep(0.1, 0.7, f));
      color = mix(color, lightBlue, smoothstep(0.4, 1.0, f) * smoothstep(0.2, 0.8, r.x));

      // Ajout de volume diffus
      color *= (f * 1.5 + 0.1);

      // --- ÉLECTRICITÉ SUBTILE ---
      // L'électricité bouge différemment et semble "à l'intérieur" du nuage
      vec2 ep = uv * 3.5 + vec2(uTime * 0.08, uTime * -0.15 + scrollFx * 0.8);
      float eNoise = fbm(ep + r * 1.0 - uTime * 0.3);
      
      float ridge = abs(eNoise - 0.5);
      // Légère augmentation de l'épaisseur de base (0.0025 au lieu de 0.002)
      float electricity = 0.0025 / (ridge + 0.003); 
      
      // Le masque est moins restrictif (0.45 au lieu de 0.5) pour qu'il y en ait un peu plus souvent
      float mask = smoothstep(0.45, 0.85, f);
      // Flash légèrement plus long (puissance 4.0 au lieu de 6.0)
      float flash = pow(sin(uTime * 3.0 + f * 10.0) * 0.5 + 0.5, 4.0);
      electricity *= mask * flash;

      vec3 elecColor = vec3(0.4, 0.8, 1.0); 
      // Multiplicateur global augmenté de 1.5 à 1.8
      color += elecColor * electricity * 1.8;

      // Vignette douce sur les bords
      vec2 screenCenter = vUv - 0.5;
      float vignette = 1.0 - dot(screenCenter, screenCenter) * 1.5;
      color *= clamp(vignette, 0.0, 1.0);

      gl_FragColor = vec4(color, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPOSANT REACT
// ═══════════════════════════════════════════════════════════════════════════════
function ElectricSmokeLayer() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const isLowEnd = useMemo(() => {
    if (typeof window === "undefined") return false;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isLowCore = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    return isTouch || isLowCore;
  }, []);

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uScroll:     { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uLowEnd:     { value: isLowEnd ? 1.0 : 0.0 }, // 1.0 = active les optimisations GLSL
  }), [isLowEnd]);

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    const u = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    
    // Fallback robuste pour la lecture du scroll global
    const currentScroll = typeof window !== "undefined" 
      ? ((window as any).lenisScroll || window.scrollY || 0) 
      : 0;
    u.uScroll.value = currentScroll * 0.0015;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={isLowEnd ? [1, 1] : [2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export function SmokeBackground() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      setIsMobile(isTouch || isLowEnd);
    }
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0 pointer-events-none bg-black" />;
  }

  // Le fallback reste identique pour assurer des perfs parfaites sur vieux mobiles
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#010101] to-[#040816]">
        <div className="absolute -top-[20vh] left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-[#00F2FF]/[0.08] blur-[100px] rounded-full pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
      >
        <ElectricSmokeLayer />
      </Canvas>
    </div>
  );
}