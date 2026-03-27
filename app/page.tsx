"use client";

import React, { useRef, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lock, Instagram, ChevronDown, Play, ShoppingBag, Crown, ArrowUp } from "lucide-react";
import { Canvas } from "@react-three/fiber";

import { VITRINE_DATA, VitrineCardType } from "@/lib/data";
import { CustomCursor } from "@/components/CustomCursor";
import { Logo3D } from "@/components/Logo3D";
import { SmokeBackground } from "@/components/SmokeBackground";
import Lenis from "lenis";

// NAVIGATION PROPRE
const NAV_LINKS = [
  { name: "Vision", id: "vision" },
  { name: "Vitrine", id: "vitrine" },
  { name: "Réseaux", id: "reseaux" },
  { name: "VIP", id: "vip" }
];

// ==========================================================================
// COMPOSANT : CARTE VITRINE EMPILÉE (AWWWARDS EDITION - SMOKE DISSIPATION)
// ==========================================================================
// Fraction du scroll de la section réservée comme zone tampon (les cartes restent intactes)
const VITRINE_BUFFER = 0.10;

const StackedCard = ({ src, supertitle, volume, status, description, index, total, progress }: VitrineCardType & { index: number, total: number, progress: any }) => {
  // 🧠 MATHÉMATIQUES DE DISSIPATION (Physique des gaz/fumée)
  
  // Calcule un progress normalisé qui ignore le scroll pendant le tampon initial
  const getDepth = (p: number) => {
    const effective = Math.max(0, p - VITRINE_BUFFER) / (1 - VITRINE_BUFFER);
    return index - effective * total;
  };

  const x = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    // Part légèrement à gauche en se dissipant
    if (depth < 0) return `${depth * 80}%`; 
    return "0%";
  });

  const y = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    // EFFET FUMÉE : La carte s'envole vers le HAUT (valeur négative amplifiée)
    if (depth < 0) return `${depth * 250}px`; 
    // Empilement normal (vers le bas) quand elle est en attente
    return `${depth * 40}px`; 
  });

  const scale = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    // EFFET FUMÉE : La matière se dilate/s'étend en disparaissant
    if (depth < 0) return 1 + Math.abs(depth) * 0.3; 
    // Rétrécit dans le fond de la pile
    return Math.max(1 - depth * 0.06, 0.8); 
  });

  const rotateZ = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    // Vrille douce comme une feuille morte dans le vent
    if (depth < 0) return `${depth * 15}deg`; 
    return `${(index % 2 === 0 ? 1 : -1) * depth * 2}deg`; 
  });

  const opacity = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    // EFFET FUMÉE : La carte disparaît très vite dès qu'elle est lâchée
    if (depth < 0) return Math.max(1 - Math.abs(depth) * 1.5, 0); 
    return 1; 
  });

  // NOUVEAU : LE FLOU DYNAMIQUE (L'illusion de la fumée)
  const filter = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) {
      // Le flou augmente exponentiellement pour détruire les contours de l'image
      const blurValue = Math.min(Math.pow(Math.abs(depth) * 6, 2), 40); 
      return `blur(${blurValue}px) grayscale(${Math.min(Math.abs(depth) * 100, 100)}%)`;
    }
    return "blur(0px) grayscale(0%)";
  });

  // Assombrissement pour simuler la profondeur de champ
  const depthShadow = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth <= 0) return 0; 
    return Math.min(depth * 0.5, 0.85); 
  });
  
  return (
    <motion.div 
      style={{ x, y, scale, rotateZ, opacity, filter, zIndex: total - index }} 
      className="absolute inset-0 origin-center w-full h-full will-change-transform"
    >
      {/* CADRE ACRYLIQUE PREMIUM */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#020202] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-end group">
        
        {/* Image de fond avec effet de Parallax interne */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={src} 
            alt={`Trap House Archive ${index}`} 
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80" 
          />
        </div>

        {/* CALQUE D'OMBRE DE PROFONDEUR */}
        <motion.div 
          style={{ opacity: depthShadow }} 
          className="absolute inset-0 bg-[#020202] pointer-events-none z-30"
        />

        {/* OVERLAYS CINÉMATIQUES (Gradients & Lumières) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,153,255,0.05)_0%,transparent_30%)] z-10" />

        {/* TEXTE & MÉTADONNÉES */}
        <div className="relative z-20 p-8 md:p-12 w-full">
          <div className="flex justify-between items-end w-full border-b border-white/10 pb-6 mb-6">
            <div>
              <p className="font-syne font-bold tracking-[0.4em] text-[#0099FF] text-[10px] uppercase mb-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse shadow-[0_0_10px_#0099FF]" />
                {supertitle}
              </p>
              <h3 className="font-syne font-black text-white text-5xl md:text-6xl tracking-[0.1em] uppercase leading-none drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">{volume}</span>
              </h3>
            </div>
            <div className="text-right hidden md:block">
              <p className="font-syne text-white/30 text-[9px] tracking-[0.3em] uppercase mb-1">Status</p>
              <p className="font-syne text-[#0099FF] text-[10px] font-bold tracking-[0.2em] uppercase">{status}</p>
            </div>
          </div>
          <p className="font-manrope text-white/50 text-sm max-w-[90%] md:max-w-[80%] leading-relaxed">
            {description}
          </p>
        </div>

        {/* ÉCLAIRAGE DE TRANCHE */}
        <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none z-40" />
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0099FF]/60 to-transparent z-40 opacity-50" />
      </div>
    </motion.div>
  );
};


export default function Home() {
  // ─────────────────────────────────────────────────
  // SMOOTH SCROLL GLOBAL (Lenis)
  // ─────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,            // durée de l'inertie (en secondes)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,        // inertie sur molette souris
      touchMultiplier: 1.5,     // légèrement accentué sur touch
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const springConfig = { stiffness: 60, damping: 20, mass: 0.5 }; // Inertie lourde de base

  // 1. PROGRESS SCROLL GLOBAL
  const { scrollYProgress: globalScroll } = useScroll();
  const smoothGlobalScroll = useSpring(globalScroll, springConfig);

  const backgroundBlurOpacity = useTransform(smoothGlobalScroll, [0, 1], [0, 0.8]);

  // ==========================================================================
  // SECTION 1 : STORYTELLING & 3D
  // ==========================================================================
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const smoothHeroScroll = useSpring(heroScroll, springConfig);

  const logoOpacity = useTransform(smoothHeroScroll, [0, 0.2], [1, 0]);
  const text1Opacity = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [0, 1, 0]);
  const text1Y = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [40, 0, -40]);
  const text2Opacity = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [0, 1, 0]);
  const text2Y = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [40, 0, -40]);
  const text3Opacity = useTransform(smoothHeroScroll, [0.75, 0.95], [0, 1]);
  const text3Y = useTransform(smoothHeroScroll, [0.75, 0.95], [40, 0]);

  // ==========================================================================
  // SECTION 2 : VITRINE (DECK OF CARDS AVEC PHYSIQUE LOURDE)
  // ==========================================================================
  const vitrineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: vitrineScroll } = useScroll({
    target: vitrineRef,
    offset: ["start start", "end end"],
  });

  // Inertie très spécifique pour la vitrine : Lourd et précis
  const smoothVitrineScroll = useSpring(vitrineScroll, { stiffness: 70, damping: 25, mass: 0.8, restDelta: 0.0001 });

  const vitrineOpacity = useTransform(smoothVitrineScroll, [0.9, 1], [1, 0]);
  const vitrineScale = useTransform(smoothVitrineScroll, [0.9, 1], [1, 0.95]);

  return (
    <div className="w-full relative bg-[#010101]">
      <CustomCursor />
      
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-[#00F2FF] z-[999] origin-left shadow-[0_0_20px_#00F2FF]"
        style={{ scaleX: smoothGlobalScroll, width: "100%" }}
      />

      {/* 🌪️ FUMÉE / NEURAL NETWORK WEBGL */}
      <SmokeBackground />

      {/* 🔥 CALQUE DE FLOU DYNAMIQUE */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-[60px] bg-[#010101]/20"
        style={{ opacity: backgroundBlurOpacity }}
      />

      <main className="relative z-10 w-full flex flex-col selection:bg-[#00F2FF] selection:text-black">
        
        {/* NAVBAR */}
        <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="fixed top-0 left-0 w-full z-[100] flex justify-center py-8 px-4 pointer-events-none">
          <div className="pointer-events-auto flex gap-6 md:gap-12 px-8 md:px-12 py-4 rounded-full border border-white/5 bg-[#020202]/50 backdrop-blur-2xl shadow-2xl">
            {NAV_LINKS.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="interactive-element relative text-[9px] md:text-xs font-syne font-bold tracking-[0.3em] text-white/50 hover:text-[#00F2FF] transition-colors uppercase"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* SECTION 1 : SCROLL-BASED STORYTELLING & LOGO 3D */}
        <section id="vision" ref={heroRef} className="relative w-full h-[350vh]">
          <div className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6">
            
            <motion.div style={{ opacity: logoOpacity }} className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
                  <Suspense fallback={null}>
                    <group position={[0, -1, 0]} scale={0.85}>
                      <Logo3D />
                    </group>
                  </Suspense>
                </Canvas>
              </div>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50 flex flex-col items-center pointer-events-none">
                <span className="font-syne text-[8px] tracking-[0.4em] mb-2 uppercase text-[#00F2FF]">Swipe Down</span>
                <ChevronDown className="text-[#00F2FF]" size={16} />
              </motion.div>
            </motion.div>

            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute max-w-3xl text-center pointer-events-none z-30">
              <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre I</p>
              <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight drop-shadow-md">
                Oubliez les standards <br /> <span className="text-white/30">de la nuit.</span>
              </h2>
            </motion.div>

            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute max-w-4xl text-center pointer-events-none z-30">
              <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre II</p>
              <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight drop-shadow-md">
                L'énergie de l'underground. <br /> <span className="text-[#00F2FF] text-glow">L'exigence du premium.</span>
              </h2>
            </motion.div>

            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none z-30">
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#00F2FF] to-transparent mb-8" />
              <p className="font-manrope text-white/70 text-lg md:text-xl leading-relaxed font-light drop-shadow-xl bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5">
                Nous créons plus que des soirées : nous concevons des moments d'exclusivité où la lumière fend l'obscurité, et où l'accès est un privilège absolu.
              </p>
            </motion.div>

          </div>
        </section>

        {/* =========================================================
            SECTION 2 : LA VITRINE (DECK OF CARDS SCROLL)
        ========================================================= */}
        <section 
          id="vitrine" 
          ref={vitrineRef} 
          className="relative w-full bg-transparent z-20"
          // La hauteur définit la durée du scroll. On donne 120vh par carte pour avoir le temps de les admirer.
          style={{ height: `${VITRINE_DATA.length * 120}vh` }} 
        >
          <motion.div 
            style={{ opacity: vitrineOpacity, scale: vitrineScale }}
            className="sticky top-0 w-full h-[100dvh] flex flex-col xl:flex-row items-center justify-center xl:justify-between px-6 md:px-[10vw] overflow-hidden"
          >
            
            {/* PARTIE GAUCHE : TEXTE */}
            <div className="w-full xl:w-1/3 flex flex-col justify-center mb-16 xl:mb-0 z-30 pointer-events-none text-center xl:text-left mt-20 xl:mt-0">
              <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase drop-shadow-[0_0_10px_#00F2FF]">Exploration</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne uppercase tracking-widest text-white leading-none mb-6">
                La <br className="hidden xl:block"/><span className="text-[#00F2FF] text-glow">Vitrine</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#00F2FF] mb-6 shadow-[0_0_10px_#00F2FF] mx-auto xl:mx-0" />
              <p className="font-manrope text-white/50 text-base md:text-lg max-w-md mx-auto xl:mx-0 drop-shadow-md">
                Glissez à travers l'obscurité pour découvrir les archives classées de nos événements légendaires. Seuls les initiés savent.
              </p>
            </div>

            {/* PARTIE DROITE : LE PAQUET DE CARTES EMPILÉES */}
            <div className="w-full md:w-[60vw] xl:w-[35vw] h-[60vh] xl:h-[75vh] relative perspective-1000 z-10 pointer-events-none">
              {VITRINE_DATA.map((card, i) => (
                <StackedCard 
                  key={i} 
                  {...card}
                  index={i} 
                  total={VITRINE_DATA.length} 
                  progress={smoothVitrineScroll} 
                />
              ))}
            </div>

          </motion.div>
        </section>

        {/* =========================================================
            SECTION 3 : RÉSEAUX SOCIAUX (AMÉLIORÉE & ÉPURÉE)
        ========================================================= */}
        <section id="reseaux" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-transparent py-32 z-20">
          
          {/* Lueur d'ambiance globale (TRÈS SUBTILE) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#00F2FF]/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

          {/* TEXTES DÉFILANTS */}
          <div className="absolute top-1/3 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-30 -rotate-3 scale-110 z-0">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }} className="flex gap-12">
              {Array(6).fill("TRAP HOUSE EVENT — ").map((text, i) => (
                <span key={`t1-${i}`} className="text-[6rem] md:text-[10rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>{text}</span>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-1/3 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-30 -rotate-3 scale-110 z-0">
            <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 50 }} className="flex gap-12">
              {Array(6).fill("REJOIGNEZ LE CERCLE — ").map((text, i) => (
                <span key={`t2-${i}`} className="text-[6rem] md:text-[10rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(0,242,255,0.4)' }}>{text}</span>
              ))}
            </motion.div>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col items-center mb-20 text-center">
              <span className="font-syne text-[#00F2FF] text-[10px] md:text-xs tracking-[0.5em] font-bold mb-6 uppercase drop-shadow-[0_0_15px_rgba(0,242,255,0.8)] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#00F2FF]" />
                Connectivité
                <span className="w-8 h-[1px] bg-[#00F2FF]" />
              </span>
              <h2 className="text-4xl md:text-7xl font-black font-syne uppercase tracking-widest text-white drop-shadow-2xl">
                Rejoignez le <span className="text-[#00F2FF] text-glow italic">Cercle</span>
              </h2>
            </motion.div>
            
            {/* RÉSEAU (UNIQUEMENT INSTAGRAM) */}
            <div className="flex justify-center w-full max-w-2xl mx-auto">
              <motion.a 
                href="#" 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                className="group relative w-full h-40 flex items-center justify-between px-6 md:px-10 rounded-[2rem] border border-white/10 bg-[#020202]/80 backdrop-blur-2xl overflow-hidden interactive-element transition-all duration-500 hover:border-[#00F2FF]/60 hover:shadow-[0_0_50px_rgba(0,242,255,0.15)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/0 via-[#00F2FF]/5 to-[#00F2FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative flex items-center gap-6 z-10">
                  <div className="p-5 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#00F2FF]/10 group-hover:border-[#00F2FF]/30 transition-all duration-500 group-hover:scale-110">
                    <Instagram size={32} className="text-white group-hover:text-[#00F2FF] transition-colors duration-500 drop-shadow-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-syne font-black text-2xl md:text-3xl tracking-[0.2em] text-white group-hover:text-[#00F2FF] transition-colors duration-500 uppercase">
                      Instagram
                    </span>
                    <span className="font-manrope text-white/40 text-xs tracking-widest uppercase mt-1 group-hover:text-white/70 transition-colors">
                      Le Visuel
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00F2FF]/50 group-hover:bg-[#00F2FF]/10 transition-all duration-500 -rotate-45 group-hover:rotate-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#00F2FF] transition-colors">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
            </div>
          </div>
        </section>
        
        {/* =========================================================
            SECTION 4 : VIP & SHOP (AMÉLIORÉE & SANS BACKGROUND)
        ========================================================= */}
        <section id="vip" className="relative w-full min-h-screen py-32 md:py-48 px-6  z-20 overflow-hidden">
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-center flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-2 border-[#00F2FF] rounded-full animate-ping opacity-20" />
                <div className="absolute inset-2 border border-[#00F2FF]/50 rounded-full animate-[spin_4s_linear_infinite]" />
                <Lock className="w-8 h-8 text-[#00F2FF] drop-shadow-[0_0_15px_#00F2FF]" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-syne uppercase tracking-widest text-white mb-6 drop-shadow-2xl">
                Zone <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10">Privilège</span>
              </h2>
              <p className="font-manrope text-white/40 text-sm md:text-base max-w-lg mx-auto uppercase tracking-widest">
                L'accès est restreint. Le contenu est exclusif.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              
              {/* CARTE SHOP */}
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: 5 }} 
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.3 }} 
                className="interactive-element relative h-[550px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/10 transition-colors duration-500"
              >
                {/* FOND ATMOSPHÉRIQUE : Texture bruit + nappes de lumière */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noise-shop">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise-shop)" />
                </svg>
                {/* Nappes de lumière ambiantes */}
                <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[#00F2FF]/[0.04] blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white/[0.02] blur-[60px] rounded-full pointer-events-none" />
                {/* Vitre acrylique intérieure subtile */}
                <div className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                {/* Effet Spotlight Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
                  <ShoppingBag className="w-12 h-12 text-white/20 mb-8 group-hover:text-[#00F2FF] group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(0,242,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider md:tracking-widest mb-6 leading-tight w-full break-words">
                    TRAP HOUSE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 group-hover:text-[#00F2FF] transition-colors duration-500">SHOP</span>
                  </h3>
                  
                  <p className="font-manrope text-white/40 text-sm mb-12 max-w-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    Merchandising exclusif. Des pièces limitées forgées dans l'esthétique de la nuit. Réservé à l'élite.
                  </p>
                  
                  <div className="relative px-10 py-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500 cursor-pointer">
                    <div className="absolute inset-0 bg-[#00F2FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <p className="relative z-10 text-white/50 group-hover:text-black font-syne text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">
                      Coming Soon
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-8 left-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute top-8 left-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute bottom-8 right-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute bottom-8 right-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
              </motion.div>

              {/* CARTE VIP RÉSERVATIONS */}
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: 5 }} 
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.3 }} 
                className="interactive-element relative h-[550px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/10 transition-colors duration-500"
              >
                {/* FOND ATMOSPHÉRIQUE : Texture bruit + nappes de lumière */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noise-vip">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise-vip)" />
                </svg>
                {/* Nappes de lumière ambiantes — légèrement différentes de la carte Shop */}
                <div className="absolute -top-1/4 right-1/4 w-[50%] h-[50%] bg-[#00F2FF]/[0.05] blur-[90px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[45%] h-[40%] bg-white/[0.02] blur-[60px] rounded-full pointer-events-none" />
                {/* Vitre acrylique intérieure subtile */}
                <div className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                {/* Effet Spotlight Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
                  <Crown className="w-12 h-12 text-white/20 mb-8 group-hover:text-[#00F2FF] group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(0,242,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider mb-6 leading-tight">
                    RÉSERVATIONS <span className="text-[#00F2FF] text-glow group-hover:text-white transition-colors duration-500">VIP</span>
                  </h3>
                  
                  <p className="font-manrope text-white/40 text-sm mb-12 max-w-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    Garantissez votre table, accédez aux zones privées et profitez d'un service premium. Le confort dans le chaos.
                  </p>
                  
                  <div className="relative px-10 py-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500 cursor-pointer">
                    <div className="absolute inset-0 bg-[#00F2FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <p className="relative z-10 text-white/50 group-hover:text-black font-syne text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">
                      Coming Soon
                    </p>
                  </div>
                </div>

                <div className="absolute top-8 right-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute top-8 right-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FOOTER MINIMALISTE & GLASSMORPHISME
        ========================================================= */}
        <footer className="relative w-full py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-[#020202]/30 backdrop-blur-2xl z-20">
          
          {/* GAUCHE : Marque & Discrétion */}
          <div className="flex items-center gap-3 mb-4 md:mb-0">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]" />
             <span className="font-syne font-bold tracking-[0.4em] text-[10px] text-white/80 uppercase">Trap House</span>
          </div>

          {/* CENTRE : Copyright ultra minimal */}
          <p className="font-syne text-white/30 text-[9px] tracking-[0.3em] uppercase mb-4 md:mb-0">
            © {new Date().getFullYear()} Tous droits réservés.
          </p>

          {/* DROITE : Liens essentiels & Remontée */}
          <div className="flex items-center gap-6">
            <a href="#" className="font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element">Instagram</a>
            <a href="#" className="font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element">Légal</a>
            <div className="w-[1px] h-3 bg-white/10" /> {/* Séparateur subtil */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element border-none bg-transparent cursor-pointer outline-none"
            >
              Top <ArrowUp size={10} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
          
        </footer>

      </main>
    </div>
  );
}