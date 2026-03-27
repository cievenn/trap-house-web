"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScroll;

  varying vec2 vUv;

  // Fonction de hachage pseudo-aléatoire
  float hash(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
  }

  // Bruit de base (Value Noise) interpolé
  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f); 

      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Mouvement Brownien Fractionnaire (FBM)
  float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;

      // Amplification du scroll pour la fumée
      float scrollFx = uScroll * 1.2; 

      // 1. Déplacement de base (haut/bas) lié au temps ET au scroll
      vec2 movement = vec2(uTime * 0.02, uTime * -0.15 + scrollFx);
      vec2 p = uv * 3.0 + movement;

      // 2. Déformation (Domain Warping) : La fumée tourbillonne au scroll
      vec2 q = vec2(0.0);
      q.x = fbm(p + vec2(0.0, uTime * 0.05 + scrollFx * 0.5));
      q.y = fbm(p + vec2(1.0, uTime * 0.02 + scrollFx * 0.3));

      vec2 r = vec2(0.0);
      r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + uTime * 0.15 + scrollFx * 0.8);
      r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + uTime * 0.12 + scrollFx * 0.6);

      float f = fbm(p + r);

      // Couleurs de la fumée
      vec3 color = mix(vec3(0.01, 0.02, 0.08), vec3(0.04, 0.08, 0.25), clamp(f * f * 4.0, 0.0, 1.0));
      color = mix(color, vec3(0.08, 0.15, 0.4), clamp(length(q), 0.0, 1.0));
      color = mix(color, vec3(0.12, 0.2, 0.5), clamp(length(r.x), 0.0, 1.0));

      color = (f * f * f + 0.6 * f * f + 0.5 * f) * color;

      // --- ÉLECTRICITÉ ---
      // L'électricité bouge encore plus vite pour garder l'effet de profondeur (parallaxe)
      vec2 ep = uv * 4.0 + vec2(uTime * 0.1, uTime * -0.4 + (scrollFx * 1.8));
      float eNoise = fbm(ep + r * 1.5 - uTime * 0.6);
      
      float ridge = abs(eNoise - 0.5);
      float electricity = 0.005 / (ridge + 0.005);
      
      float mask = fbm(p * 3.0 + uTime);
      float flash = pow(sin(uTime * 5.0 + f * 12.0) * 0.5 + 0.5, 4.0);
      electricity *= smoothstep(0.4, 0.7, mask) * flash;

      vec3 elecColor = vec3(0.4, 0.8, 1.0); 
      color += elecColor * electricity;

      // Vignette
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

  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const onScroll = () => { 
      // Multiplicateur à ajuster pour définir la vitesse de déplacement au scroll
      scrollTarget.current = window.scrollY * 0.0015; 
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uScroll:     { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    depthWrite: false,
  }), [uniforms]);

  // Cleanup GPU memory on unmount
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    // Interpolation linéaire (lerp) pour un effet "smooth scroll" fluide et naturel
    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, 0.04);

    const u = matRef.current.uniforms;
    u.uTime.value       = clock.elapsedTime;
    u.uScroll.value     = scrollCurrent.current;
    u.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}

export function SmokeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
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