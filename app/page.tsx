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

export default function Home() {
  // ==========================================================================
  // INERTIE GLOBALE (La physique du site)
  // ==========================================================================
  const springConfig = { stiffness: 70, damping: 20, mass: 0.2 };

  // 1. PROGRESS SCROLL (Barre globale avec inertie)
  const { scrollYProgress: globalScroll } = useScroll();
  const smoothGlobalScroll = useSpring(globalScroll, springConfig);

  // FLOU DYNAMIQUE AU SCROLL
  const backgroundBlurOpacity = useTransform(smoothGlobalScroll, [0.75, 2], [0.75, 2]);

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
  // SECTION 2 : FAKE HORIZONTAL SCROLL
  // ==========================================================================
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });
  
  const smoothHorizontalScroll = useSpring(horizontalScroll, { stiffness: 60, damping: 20, mass: 0.1 });
  
  const xTransform = useTransform(smoothHorizontalScroll, [0, 1], ["0%", "-70%"]);
  const bgTextX = useTransform(smoothHorizontalScroll, [0, 1], ["0%", "15%"]);

  return (
    <div className="w-full relative bg-black">
      <CustomCursor />
      
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-[#00F2FF] z-[999] origin-left shadow-[0_0_15px_#00F2FF]"
        style={{ scaleX: smoothGlobalScroll, width: "100%" }}
      />

      {/* 🌪️ NOUVELLE FUMÉE 3D VOLUMÉTRIQUE */}
      <SmokeBackground />

      {/* 🔥 CALQUE DE FLOU DYNAMIQUE */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-3xl bg-black/40"
        style={{ opacity: backgroundBlurOpacity }}
      />

      {/* Tout le contenu principal est par-dessus la vidéo et le flou (z-10) */}
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
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
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
              
              {/* LE CANVAS PLEIN ÉCRAN */}
              <div className="absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing">
                {/* 💥 MODIFICATION ICI : Caméra reculée (Z=9) pour réduire la taille globale 💥 */}
                <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
                  <Suspense fallback={null}>
                    {/* 💥 MODIFICATION ICI : Position Y=-1 pour baisser le logo au centre exact de l'espace dispo et Scale=0.85 pour ajuster 💥 */}
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

            {/* TEXTES STORYTELLING */}
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

        {/* SECTION 2 : FAKE HORIZONTAL SCROLL */}
        <section id="vitrine" ref={horizontalRef} className="relative w-full h-[300vw] bg-transparent">
          <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center">
            
            <motion.div style={{ x: bgTextX }} className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-5 pointer-events-none">
              <h2 className="text-[15rem] md:text-[25rem] font-black font-syne uppercase text-white">ARCHIVES</h2>
            </motion.div>

            <motion.div style={{ x: xTransform }} className="flex h-full items-center relative z-10 px-[10vw]">
              
              <div className="w-[90vw] md:w-[60vw] flex flex-col justify-center shrink-0 pr-10 md:pr-20">
                <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase">Exploration</span>
                <h2 className="text-5xl md:text-7xl font-black font-syne uppercase tracking-widest text-white">
                  La <span className="text-[#00F2FF] text-glow">Vitrine</span>
                </h2>
                <p className="font-manrope text-white/50 mt-6 max-w-sm text-lg">
                  Glissez à travers l'obscurité pour découvrir les soirées qui ont façonné notre légende.
                </p>
              </div>

              {VITRINE_IMAGES.map((src, i) => (
                <div key={i} className="w-[75vw] md:w-[35vw] h-[55vh] shrink-0 mr-8 md:mr-16 relative group interactive-element">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm relative shadow-2xl">
                    <img src={src} alt={`Vitrine ${i}`} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-8 left-8">
                      <p className="font-syne font-bold tracking-[0.3em] text-[#00F2FF] text-[10px] uppercase mb-2">Dossier Classé</p>
                      <h3 className="font-syne font-black text-white text-3xl tracking-widest uppercase">VOL. 0{i + 1}</h3>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-[30vw] shrink-0" />
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 : RÉSEAUX SOCIAUX */}
        <section id="reseaux" className="w-full overflow-hidden bg-black/10 py-24 md:py-32 border-y border-white/5 relative z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent opacity-80" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex whitespace-nowrap gap-16 items-center relative z-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {Array(6).fill([
              <span key="1" className="text-white/30 hover:text-[#00F2FF] transition-colors">REJOIGNEZ LE CERCLE</span>, 
              <Instagram key="ig" size={30} className="text-[#00F2FF]"/>, 
              <span key="2" className="text-white/30 hover:text-[#00F2FF] transition-colors">@TRAPHOUSE_EVENT</span>, 
              <Disc key="tk" size={30} className="text-[#00F2FF]"/>, 
            ]).flat().map((item, i) => (
              <span key={i} className="interactive-element text-4xl md:text-6xl font-black font-syne uppercase tracking-[0.2em] flex items-center gap-16 cursor-pointer">
                {item}
              </span>
            ))}
          </motion.div>
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
                <div className="relative z-20 flex flex-col items-center p-8 text-center">
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
                <div className="relative z-20 flex flex-col items-center p-8 text-center">
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
        <footer className="relative w-full py-16 flex flex-col items-center bg-black/60 border-t border-white/5 z-20">
          <h2 className="font-syne font-black tracking-[0.5em] text-xl md:text-2xl text-white/30 mb-8 text-glow leading-none">TRAP HOUSE</h2>
          <p className="text-white/20 text-[8px] md:text-[10px] font-syne uppercase tracking-[0.3em] text-center px-4 drop-shadow-md">
            © {new Date().getFullYear()} TRAP HOUSE EVENT. TOUS DROITS RÉSERVÉS.
          </p>
        </footer>

      </main>
    </div>
  );
}