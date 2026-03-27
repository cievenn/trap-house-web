"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════════════════
//  SHADERS — "ELECTRIC NEURAL NETWORK" (AVEC INERTIE DES FLUIDES & PROFONDEUR)
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
  uniform float uScrollVelocity; // NOUVEAU : La force cinétique du scroll
  uniform vec2  uResolution;

  varying vec2 vUv;

  // ── Palette (Fond Bleu Nuit, Centre Marine, Crêtes Bleu Électrique) ──
  const vec3 C_BG     = vec3(0.01, 0.02, 0.06);   // #03050F
  const vec3 C_CORE   = vec3(0.05, 0.15, 0.45);   // #0D2673
  const vec3 C_ENERGY = vec3(0.00, 0.60, 1.00);   // #0099FF

  // ── 1. GÉNÉRATEURS DE BRUIT ──
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

    // Temps de base très lent pour contraster avec la vitesse du scroll
    float t = uTime * 0.12; 
    
    // LA PHYSIQUE DU SCROLL (Réalité vs Superficiel)
    // 1. Déplacement en profondeur (On traverse la matière, axe Z)
    float scrollDepth = uScroll * 1.5; 
    // 2. Déplacement vertical classique (Axe Y)
    float scrollY = uScroll * 0.4;     

    // 3. Déformation Cinétique (Drag Force)
    // Quand l'utilisateur scrolle vite, la matière s'étire verticalement
    // L'effet est plus fort au centre que sur les bords pour créer un appel d'air 3D
    float drag = uScrollVelocity * 0.003;
    vec2 warpedSt = st;
    warpedSt.y -= drag * (1.2 - length(st)); 

    // Injection des coordonnées physiques dans le moteur 3D
    vec3 p = vec3(warpedSt * 3.5, t + scrollDepth);

    vec3 warp = vec3(
      ridgedFBM(p + vec3(0.0, t * 0.3, 0.0)),
      ridgedFBM(p + vec3(4.3, -t * 0.3, 1.2)),
      0.0
    );

    // Réseau de Premier plan (Réagit fortement au déplacement vertical)
    float network = ridgedFBM(p + warp * 0.5 - vec3(0.0, scrollY, 0.0));
    
    // Réseau d'Arrière-plan (Bouge différemment pour créer un Parallaxe Massif)
    float bgNetwork = ridgedFBM(p * 1.5 - vec3(t * 0.5, scrollY * 1.5, scrollDepth * 0.5)) * 0.5;

    // ── COLOR GRADING ──
    vec3 col = C_BG;

    float aura = smoothstep(0.3, 1.2, network + bgNetwork);
    col = mix(col, C_CORE, aura * 0.85);

    // Le flash cinétique : La matière s'illumine très légèrement quand elle subit un "drag" fort
    float kineticFlash = clamp(abs(uScrollVelocity) * 0.015, 0.0, 0.3);
    
    float sparks = pow(smoothstep(0.8, 1.4, network), 2.5);
    col += C_ENERGY * (sparks * 3.0 + kineticFlash * aura); 

    float dist = length(uv - 0.5);
    float vignette = smoothstep(0.8, 0.2, dist);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPOSANT REACT (Moteur Physique d'Inertie)
// ═══════════════════════════════════════════════════════════════════════════════
function ElectricNetwork() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  // Variables physiques pour l'inertie
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const lastScrollY = useRef(0);
  
  // NOUVEAU : Traqueur de vélocité
  const scrollVelocity = useRef(0);

  useEffect(() => {
    // Initialisation
    lastScrollY.current = window.scrollY;

    const onScroll = () => { 
      scrollTarget.current = window.scrollY * 0.0005; // Facteur d'échelle ajusté
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uScroll:         { value: 0 },
    uScrollVelocity: { value: 0 },
    uResolution:     { value: new THREE.Vector2(1, 1) },
  }), []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    depthWrite: false,
  }), [uniforms]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    // 1. CALCUL DE LA VITESSE (Vélocité brute)
    const currentScrollY = window.scrollY;
    const rawVelocity = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    // 2. INERTIE DE VÉLOCITÉ (La vitesse s'estompe doucement, effet ressort)
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, rawVelocity, 0.08);

    // 3. INERTIE DE POSITION (Mouvement lourd et luxueux)
    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, 0.035);

    const u = matRef.current.uniforms;
    u.uTime.value           = clock.elapsedTime;
    u.uScroll.value         = scrollCurrent.current;
    u.uScrollVelocity.value = scrollVelocity.current; // Envoi de la vitesse au Shader
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