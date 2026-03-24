"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════════════════
//  SHADERS — "ELECTRIC NEURAL NETWORK" (EDITION BLEU NUIT & ÉLECTRIQUE)
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

  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uResolution;

  varying vec2 vUv;

  // ── Palette (Fond Bleu Nuit, Centre Marine, Crêtes Bleu Électrique) ──
  const vec3 C_BG     = vec3(0.01, 0.02, 0.06);   // #03050F (Bleu nuit abyssal, fond sombre)
  const vec3 C_CORE   = vec3(0.05, 0.15, 0.45);   // #0D2673 (Bleu marine profond pour le centre)
  const vec3 C_ENERGY = vec3(0.00, 0.60, 1.00);   // #0099FF (Bleu électrique / Néon très lumineux)

  // ── 1. GÉNÉRATEURS DE BRUIT (Noise) ──
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // ── 2. FRACTALE TRANCHANTE ──
  float ridgedFBM(vec3 p) {
    float f = 0.0;
    float amp = 0.5;
    float weight = 1.0;
    
    for (int i = 0; i < 5; i++) {
      float n = 1.0 - abs(snoise(p)); 
      n = pow(n, 2.0); 
      f += amp * n * weight;
      weight = clamp(n * 2.0, 0.0, 1.0); 
      p *= 2.0;
      amp *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 st = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.15;
    float scrollOffset = uScroll * 0.2;

    vec3 p = vec3(st * 3.5, t * 0.2 + scrollOffset);

    vec3 warp = vec3(
      ridgedFBM(p + vec3(0.0, t * 0.1, 0.0)),
      ridgedFBM(p + vec3(4.3, -t * 0.1, 1.2)),
      0.0
    );

    float network = ridgedFBM(p + warp * 0.5);
    float bgNetwork = ridgedFBM(p * 1.5 - vec3(t * 0.3, scrollOffset, 0.0)) * 0.5;

    // ── COLOR GRADING ──
    vec3 col = C_BG;

    // 1. Le cœur bleu marine (La masse sombre de l'image)
    float aura = smoothstep(0.3, 1.2, network + bgNetwork);
    col = mix(col, C_CORE, aura * 0.85);

    // 2. Les contours de flammes / énergie Bleu Électrique
    float sparks = pow(smoothstep(0.8, 1.4, network), 2.5);
    col += C_ENERGY * sparks * 3.0; 

    // 3. Vignette pour assombrir les bords (focus central)
    float dist = length(uv - 0.5);
    float vignette = smoothstep(0.8, 0.2, dist);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPOSANT REACT
// ═══════════════════════════════════════════════════════════════════════════════
function ElectricNetwork() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollTarget.current = window.scrollY * 0.002; };
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

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, 0.05);

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
    // J'ai mis à jour la couleur de fond CSS pour correspondre au Bleu nuit très sombre
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#03050F]">
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
        <ElectricNetwork />
      </Canvas>
    </div>
  );
}