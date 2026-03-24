"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- LE SHADER PROCÉDURAL V2 : IMMERSION TOTALE ---
const ProceduralSmokeMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    colorBg: { value: new THREE.Color("#010101") },    // Noir à peine éclairé pour lier la fumée
    colorCore: { value: new THREE.Color("#8A2BE2") },  // Violet Toxique profond
    colorEdge: { value: new THREE.Color("#00F2FF") },  // Cyan Néon tranchant
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    uniform vec2 uResolution;
    
    uniform vec3 colorBg;
    uniform vec3 colorCore;
    uniform vec3 colorEdge;
    
    varying vec2 vUv;

    // Fonctions de bruit (Noise & Hash)
    vec3 hash( vec3 p ) {
      p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                dot(p,vec3(269.5,183.3,246.1)),
                dot(p,vec3(113.5,271.9,124.6)));
      return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }

    float noise( in vec3 p ) {
      vec3 i = floor( p );
      vec3 f = fract( p );
      vec3 u = f*f*(3.0-2.0*f);
      return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                            dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                       mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                            dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                  mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                            dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                       mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                            dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
    }

    float fbm(vec3 x) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100.0);
      for (int i = 0; i < 6; ++i) { // On passe à 6 octaves pour des détails HD dans l'épaisseur
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      st.x *= uResolution.x / uResolution.y;

      // 1. ZOOM MASSIF : st * 1.5 au lieu de 4.0. Ça rend les nuages géants et omniprésents.
      vec3 q = vec3(0.0);
      q.x = fbm( vec3(st * 1.5, uTime * 0.08) );
      q.y = fbm( vec3(st * 1.5 + vec2(1.0), uTime * 0.08) );

      // 2. INTERACTION AGRESSIVE : Le multiplicateur de la souris est doublé (uMouse * 1.0)
      vec3 r = vec3(0.0);
      r.x = fbm( vec3(st * 2.2 + q.xy + vec2(1.7, 9.2) + (uMouse.x * 1.0), uTime * 0.12 - uScroll * 0.06) );
      r.y = fbm( vec3(st * 2.2 + q.xy + vec2(8.3, 2.8) + (uMouse.y * 1.0), uTime * 0.10 + uScroll * 0.06) );

      // f est la densité brute finale de notre fumée
      float f = fbm(vec3(st * 1.8 + r.xy, uTime * 0.06));

      // --- COLOR GRADING EXTRÊME (ZÉRO TIMIDITÉ) ---
      vec3 finalColor = colorBg;
      
      // La base Violette commence DÈS le début du bruit (smoothstep de -0.2 à 0.6)
      // Ça signifie qu'il y a presque partout un fond de fumée violette lourde.
      float mixCore = smoothstep(-0.2, 0.6, f);
      finalColor = mix(finalColor, colorCore, mixCore);
      
      // Les crêtes Cyan Néon sont plus larges et agressives
      float mixEdge = smoothstep(0.1, 0.85, f * r.x * 2.5);
      finalColor = mix(finalColor, colorEdge, mixEdge * 1.5);

      // NOUVEAU : "Core Burn" - Là où la fumée est ultra-dense, elle s'illumine
      float mixHot = smoothstep(0.65, 1.0, f);
      finalColor += colorEdge * mixHot * 0.8; // Injecte un flash Cyan/Blanc au cœur des nuages

      // Vignette considérablement réduite pour que la fumée touche les bords de l'écran
      float vignette = 1.0 - smoothstep(0.8, 2.5, length(vUv - 0.5));
      finalColor *= vignette;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function ProceduralSmoke() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  
  const scrollData = useRef({ current: 0, target: 0 });
  const mouseData = useRef({ current: new THREE.Vector2(0,0), target: new THREE.Vector2(0,0) });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseData.current.target.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseData.current.target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleScroll = () => {
      scrollData.current.target = window.scrollY * 0.005;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(ProceduralSmokeMaterial.uniforms),
      vertexShader: ProceduralSmokeMaterial.vertexShader,
      fragmentShader: ProceduralSmokeMaterial.fragmentShader,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    // Inertie toujours présente mais légèrement plus nerveuse (0.07 au lieu de 0.05) 
    // pour que l'interaction massive se ressente mieux
    scrollData.current.current = THREE.MathUtils.lerp(scrollData.current.current, scrollData.current.target, 0.07);
    mouseData.current.current.lerp(mouseData.current.target, 0.07);

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = scrollData.current.current;
    materialRef.current.uniforms.uMouse.value.copy(mouseData.current.current);
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

export function SmokeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#010101]">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} gl={{ alpha: false, antialias: false }}>
        <ProceduralSmoke />
      </Canvas>
    </div>
  );
}