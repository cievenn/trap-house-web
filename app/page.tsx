"use client";

import React, { useRef, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lock, Instagram, Twitter, Disc, ChevronDown } from "lucide-react";
import { Canvas } from "@react-three/fiber";

import { VITRINE_IMAGES } from "@/lib/data";
import { CustomCursor } from "@/components/CustomCursor";
import { Logo3D } from "@/components/Logo3D";
import { SmokeBackground } from "@/components/SmokeBackground";

// NAVIGATION PROPRE
const NAV_LINKS = [
  { name: "Vision", id: "vision" },
  { name: "Vitrine", id: "vitrine" },
  { name: "Réseaux", id: "reseaux" },
  { name: "VIP", id: "vip" }
];

// ==========================================================================
// COMPOSANT : CARTE VITRINE EMPILÉE
// ==========================================================================
const StackedCard = ({ src, index, total, progress }: { src: string, index: number, total: number, progress: any }) => {
  const step = 1 / total;
  const enterIndex = index * step;
  const exitIndex = (index + 1) * step;
  const isLast = index === total - 1;

  // DÉCALAGE VISUEL
  const xOffset = index * 40; 
  const yOffset = index * 20; 
  const scaleOffset = index * 0.05;

  let inputRanges, xValues, yValues, scaleValues, rotateValues, opacityRanges, opacityValues;

  if (index === 0) {
    inputRanges = [0, exitIndex];
    xValues = ["0px", "-120%"];
    yValues = ["0px", "0px"];
    scaleValues = [1, 1];
    rotateValues = ["0deg", "-15deg"];
    
    opacityRanges = [0, exitIndex];
    opacityValues = [1, 0];
  } else {
    inputRanges = [0, enterIndex, exitIndex];
    xValues = [`${xOffset}px`, "0px", isLast ? "0px" : "-120%"];
    yValues = [`${yOffset}px`, "0px", "0px"];
    scaleValues = [1 - scaleOffset, 1, 1];
    rotateValues = ["0deg", "0deg", isLast ? "0deg" : "-15deg"];
    
    opacityRanges = [0, enterIndex, exitIndex];
    opacityValues = [1, 1, isLast ? 1 : 0];
  }

  const x = useTransform(progress, inputRanges, xValues);
  const y = useTransform(progress, inputRanges, yValues);
  const scale = useTransform(progress, inputRanges, scaleValues);
  const rotate = useTransform(progress, inputRanges, rotateValues);
  const opacity = useTransform(progress, opacityRanges, opacityValues);

  return (
    <motion.div 
      style={{ x, y, rotate, scale, opacity, zIndex: total - index }} 
      className="absolute inset-0 origin-bottom-left w-full h-full p-[2px] rounded-[2rem]"
    >
      {/* 1. L'AURA PLASMA (CORRECTION DÉFINITIVE DU CUTOFF) */}
      {/* On utilise un maskImage radial pour s'assurer que la lumière meurt en douceur sans jamais toucher les bords rectangulaires */}
      <div 
        className="absolute -inset-[100px] opacity-80 blur-[80px] pointer-events-none z-0"
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)' 
        }}
      >
        {/* On remplace le overflow-hidden par des ronds parfaits (rounded-full) */}
        <div 
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,242,255,0.8)_20%,transparent_50%,rgba(138,43,226,0.8)_70%,transparent_100%)] animate-spin rounded-full"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(138,43,226,0.8)_20%,transparent_50%,rgba(0,242,255,0.8)_70%,transparent_100%)] animate-spin rounded-full"
          style={{ animationDuration: '7s', animationDirection: 'reverse' }}
        />
      </div>

      {/* 2. LE CORPS DE LA CARTE */}
      <div className="relative w-full h-full bg-[#020202] rounded-[2rem] overflow-hidden border border-white/10 shadow-[inset_0_0_60px_rgba(0,0,0,1)] flex flex-col justify-end z-10">
        
        {/* L'image de la soirée */}
        <img 
          src={src} 
          alt={`Archive Trap House ${index}`} 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105" 
        />
        
        {/* LA FUMÉE INTERNE PROFONDE */}
        <motion.div 
          animate={{ y: ["0%", "-15%"], x: ["-5%", "5%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear", repeatType: "reverse" }}
          className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none z-0"
          style={{ backgroundImage: "url('/assets/smoke.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

        {/* TEXTE */}
        <div className="relative z-20 p-8 md:p-10 pointer-events-none">
          <p className="font-syne font-bold tracking-[0.4em] text-[#00F2FF] text-[10px] uppercase mb-3 drop-shadow-[0_0_10px_rgba(0,242,255,0.8)] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF] animate-pulse" />
            Dossier Classé
          </p>
          <h3 className="font-syne font-black text-white text-4xl md:text-5xl tracking-[0.2em] uppercase drop-shadow-2xl">
            VOL. 0{index + 1}
          </h3>
        </div>

        {/* 💥 LA FUMÉE SUR LA CARTE EN BAS 💥 */}
        <motion.div 
          animate={{ y: ["10%", "-10%"], opacity: [0.4, 0.8] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", repeatType: "reverse" }}
          className="absolute -bottom-10 -left-10 -right-10 h-[60%] mix-blend-screen pointer-events-none z-30"
          style={{ backgroundImage: "url('/assets/smoke.png')", backgroundSize: "cover", backgroundPosition: "top" }}
        />
      </div>
    </motion.div>
  );
};


export default function Home() {
  const springConfig = { stiffness: 70, damping: 20, mass: 0.2 };

  // 1. PROGRESS SCROLL GLOBAL
  const { scrollYProgress: globalScroll } = useScroll();
  const smoothGlobalScroll = useSpring(globalScroll, springConfig);

  // Correction flou fond
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
  // SECTION 2 : VITRINE (DECK OF CARDS AVEC FORTE INERTIE)
  // ==========================================================================
  const vitrineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: vitrineScroll } = useScroll({
    target: vitrineRef,
    offset: ["start start", "end end"],
  });

  const smoothVitrineScroll = useSpring(vitrineScroll, { stiffness: 80, damping: 25, mass: 0.6, restDelta: 0.001 });

  // ANIMATION DE FIN CINÉMATIQUE
  const vitrineOpacity = useTransform(smoothVitrineScroll, [0.85, 1], [1, 0]);
  const vitrineScale = useTransform(smoothVitrineScroll, [0.85, 1], [1, 0.9]);

  return (
    <div className="w-full relative bg-black">
      <CustomCursor />
      
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-[#00F2FF] z-[999] origin-left shadow-[0_0_15px_#00F2FF]"
        style={{ scaleX: smoothGlobalScroll, width: "100%" }}
      />

      {/* 🌪️ FUMÉE 3D VOLUMÉTRIQUE */}
      <SmokeBackground />

      {/* 🔥 CALQUE DE FLOU DYNAMIQUE */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-3xl bg-black/40"
        style={{ opacity: backgroundBlurOpacity }}
      />

      <main className="relative z-10 w-full flex flex-col selection:bg-[#00F2FF] selection:text-black">
        
        {/* NAVBAR */}
        <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="fixed top-0 left-0 w-full z-[100] flex justify-center py-8 px-4 pointer-events-none">
          <div className="pointer-events-auto flex gap-6 md:gap-12 px-8 md:px-12 py-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-2xl shadow-2xl">
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
        <section id="vision" ref={heroRef} className="relative w-full h-[250vh]">
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
              <p className="font-manrope text-white/70 text-lg md:text-xl leading-relaxed font-light drop-shadow-xl bg-black/20 backdrop-blur-md p-6 rounded-2xl">
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
          style={{ height: `${VITRINE_IMAGES.length * 100}vh` }}
        >
          <motion.div 
            style={{ opacity: vitrineOpacity, scale: vitrineScale }}
            className="sticky top-0 w-full h-[100dvh] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-[10vw] overflow-hidden"
          >
            
            {/* PARTIE GAUCHE : TEXTE */}
            <div className="w-full md:w-1/3 flex flex-col justify-center mb-10 md:mb-0 z-30 pointer-events-none">
              <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase drop-shadow-[0_0_10px_#00F2FF]">Exploration</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne uppercase tracking-widest text-white leading-none mb-6">
                La <br/><span className="text-[#00F2FF] text-glow">Vitrine</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#00F2FF] mb-6 shadow-[0_0_10px_#00F2FF]" />
              <p className="font-manrope text-white/60 text-lg max-w-xs drop-shadow-md">
                Glissez à travers l'obscurité pour découvrir les archives classées de nos soirées légendaires.
              </p>
            </div>

            {/* PARTIE DROITE : LE PAQUET DE CARTES EMPILÉES */}
            <div className="w-full md:w-[40vw] h-[55vh] md:h-[70vh] relative perspective-1000 z-10 pointer-events-none">
              {VITRINE_IMAGES.map((src, i) => (
                <StackedCard 
                  key={i} 
                  src={src} 
                  index={i} 
                  total={VITRINE_IMAGES.length} 
                  progress={smoothVitrineScroll} 
                />
              ))}
            </div>

          </motion.div>
        </section>

        {/* =========================================================
            SECTION 3 : RÉSEAUX SOCIAUX (KINETIC TYPOGRAPHY)
        ========================================================= */}
        <section id="reseaux" className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-transparent py-32 z-20">
          
          {/* Lueur de fond subtile pour faire ressortir la zone au milieu de la fumée */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#00F2FF]/5 blur-[120px] rounded-full pointer-events-none z-0" />

          {/* 1. TEXTE GÉANT EN ARRIÈRE-PLAN (Défilement vers la gauche) */}
          <div className="absolute top-1/4 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-20 -rotate-2 scale-110 z-0">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-8"
            >
              {Array(4).fill("TRAP HOUSE EVENT — ").map((text, i) => (
                <span key={i} className="text-[8rem] md:text-[12rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* 2. TEXTE GÉANT EN ARRIÈRE-PLAN (Défilement vers la droite) */}
          <div className="absolute bottom-1/4 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-20 -rotate-2 scale-110 z-0">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              className="flex gap-8"
            >
              {Array(4).fill("REJOIGNEZ LE CERCLE — ").map((text, i) => (
                <span key={i} className="text-[8rem] md:text-[12rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '2px #00F2FF' }}>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* 3. BOUTONS INTERACTIFS (Premier plan) */}
          <div className="relative z-10 flex flex-col items-center">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center mb-16">
              <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase drop-shadow-[0_0_10px_#00F2FF]">
                Connectivité
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-widest text-white drop-shadow-lg text-center">
                Rejoignez le <span className="text-[#00F2FF] text-glow">Cercle</span>
              </h2>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              
              {/* Carte Instagram (Seule pour l'instant) */}
              <motion.a 
                href="#" 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative w-[80vw] md:w-96 h-32 flex items-center justify-center rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden interactive-element transition-all duration-500 hover:border-[#00F2FF]/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:scale-105"
              >
                {/* Lueur interne au survol */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-6 z-10">
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
                    <Instagram size={32} className="text-white group-hover:text-[#00F2FF] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                  </div>
                  <span className="font-syne font-black text-2xl tracking-[0.2em] text-white group-hover:text-[#00F2FF] transition-colors duration-300 uppercase drop-shadow-lg">
                    Instagram
                  </span>
                </div>

                {/* Barre de chargement stylisée en bas */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
              </motion.a>

            </div>
          </div>
        </section>
        
        {/* SECTION 4 : VIP */}
        <section id="vip" className="relative w-full py-32 md:py-48 px-6 bg-transparent z-20">
          <div className="max-w-7xl mx-auto">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-center flex flex-col items-center">
              <Lock className="w-8 h-8 text-[#00F2FF] mb-6 drop-shadow-[0_0_10px_#00F2FF]" />
              <h2 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-widest text-white mb-4 drop-shadow-lg">
                Zone <span className="text-white/50">Privilège</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="interactive-element relative h-[500px] flex flex-col items-center justify-center rounded-3xl border border-white/5 overflow-hidden group bg-black/40 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-20 flex flex-col items-center p-8 text-center pointer-events-none">
                  <h3 className="text-3xl md:text-5xl font-black font-syne text-white tracking-widest mb-4">
                    TRAP HOUSE <br/><span className="text-white/20">SHOP</span>
                  </h3>
                  <p className="font-manrope text-white/50 text-sm mb-12 max-w-xs">Merchandising exclusif. Le style de la nuit, réservé à nos membres.</p>
                  <div className="px-8 py-4 rounded-full bg-black/50 border border-white/10 group-hover:border-[#00F2FF] transition-all duration-300 shadow-[0_0_30px_rgba(0,242,255,0)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <p className="text-white/50 group-hover:text-[#00F2FF] font-syne text-[10px] tracking-[0.4em] font-bold uppercase transition-colors">Coming Soon</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }} className="interactive-element relative h-[500px] flex flex-col items-center justify-center rounded-3xl border border-white/5 overflow-hidden group bg-black/40 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-20 flex flex-col items-center p-8 text-center pointer-events-none">
                  <h3 className="text-3xl md:text-5xl font-black font-syne text-white tracking-widest mb-4">
                    RÉSERVATIONS <br/><span className="text-[#00F2FF] text-glow">VIP</span>
                  </h3>
                  <p className="font-manrope text-white/50 text-sm mb-12 max-w-xs">Garantissez votre table, accédez aux zones privées et profitez d'un service premium.</p>
                  <div className="px-8 py-4 rounded-full bg-black/50 border border-white/10 group-hover:border-[#00F2FF] transition-all duration-300 shadow-[0_0_30px_rgba(0,242,255,0)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <p className="text-white/50 group-hover:text-[#00F2FF] font-syne text-[10px] tracking-[0.4em] font-bold uppercase transition-colors">Coming Soon</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative w-full py-16 flex flex-col items-center bg-black/30 border-t border-white/5 z-20">
          <h2 className="font-syne font-black tracking-[0.5em] text-xl md:text-2xl text-white/30 mb-8 text-glow leading-none">TRAP HOUSE</h2>
          <p className="text-white/20 text-[8px] md:text-[10px] font-syne uppercase tracking-[0.3em] text-center px-4 drop-shadow-md">
            © {new Date().getFullYear()} TRAP HOUSE EVENT. TOUS DROITS RÉSERVÉS.
          </p>
        </footer>

      </main>
    </div>
  );
}