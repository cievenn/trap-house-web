"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lock, Instagram, Twitter, Disc, ChevronDown } from "lucide-react";

import { VITRINE_IMAGES } from "@/lib/data";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  // ==========================================================================
  // INERTIE GLOBALE (La physique du site)
  // ==========================================================================
  // On configure un "ressort" qui va donner ce fameux effet de momentum (Scroll Inertia)
  const springConfig = { stiffness: 70, damping: 20, mass: 0.2 };

  // 1. PROGRESS SCROLL (Barre globale avec inertie)
  const { scrollYProgress: globalScroll } = useScroll();
  const smoothGlobalScroll = useSpring(globalScroll, springConfig);

  // ==========================================================================
  // SECTION 1 : STORYTELLING (Rapide & Dynamique)
  // ==========================================================================
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // On applique l'inertie sur le scroll du Hero
  const smoothHeroScroll = useSpring(heroScroll, springConfig);

  // TIMING DYNAMIQUE (Se chevauchent pour plus de rapidité)
  const logoOpacity = useTransform(smoothHeroScroll, [0, 0.2], [1, 0]);
  
  const text1Opacity = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [0, 1, 0]);
  const text1Y = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [40, 0, -40]);
  
  const text2Opacity = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [0, 1, 0]);
  const text2Y = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [40, 0, -40]);

  const text3Opacity = useTransform(smoothHeroScroll, [0.75, 0.95], [0, 1]);
  const text3Y = useTransform(smoothHeroScroll, [0.75, 0.95], [40, 0]);

  // ==========================================================================
  // SECTION 2 : FAKE HORIZONTAL SCROLL (Avec Inertie)
  // ==========================================================================
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });
  
  // Inertie appliquée au glissement horizontal
  const smoothHorizontalScroll = useSpring(horizontalScroll, { stiffness: 60, damping: 20, mass: 0.1 });
  
  // Déplacement horizontal plus nerveux
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

      {/* 🌪️ FUMÉE CONSTANTE EN BACKGROUND */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none z-0">
        <source src="/assets/smoke.mp4" type="video/mp4" />
      </video>

      <main className="relative z-10 w-full flex flex-col selection:bg-[#00F2FF] selection:text-black">
        
        {/* NAVBAR */}
        <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="fixed top-0 left-0 w-full z-[100] flex justify-center py-8 px-4 pointer-events-none">
          <div className="pointer-events-auto flex gap-6 md:gap-12 px-8 md:px-12 py-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-2xl shadow-2xl">
            {["Vision", "Vitrine", "Réseaux", "VIP"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="interactive-element relative text-[9px] md:text-xs font-syne font-bold tracking-[0.3em] text-white/50 hover:text-[#00F2FF] transition-colors uppercase">
                {item}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* =========================================================
            SECTION 1 : SCROLL-BASED STORYTELLING (Hauteur réduite : 250vh)
        ========================================================= */}
        <section id="vision" ref={heroRef} className="relative w-full h-[250vh]">
          {/* Le conteneur reste collé à l'écran */}
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6">
            
            {/* SCENE 1 : LE LOGO */}
            <motion.div style={{ opacity: logoOpacity }} className="absolute flex flex-col items-center">
              <img src="/assets/traphouse.png" alt="Trap House" className="w-40 md:w-64 drop-shadow-[0_0_30px_rgba(0,242,255,0.2)] mb-8" />
              <h1 className="text-5xl md:text-7xl font-black font-syne tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 text-glow text-center">
                TRAP HOUSE
              </h1>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -bottom-24 opacity-50 flex flex-col items-center">
                <span className="font-syne text-[8px] tracking-[0.4em] mb-2 uppercase text-[#00F2FF]">Swipe Down</span>
                <ChevronDown className="text-[#00F2FF]" size={16} />
              </motion.div>
            </motion.div>

            {/* SCENE 2 : L'ACCROCHE */}
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute max-w-3xl text-center pointer-events-none">
              <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre I</p>
              <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight">
                Oubliez les standards <br /> <span className="text-white/30">de la nuit.</span>
              </h2>
            </motion.div>

            {/* SCENE 3 : LA PROMESSE */}
            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute max-w-4xl text-center pointer-events-none">
              <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre II</p>
              <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight">
                L'énergie de l'underground. <br /> <span className="text-[#00F2FF] text-glow">L'exigence du premium.</span>
              </h2>
            </motion.div>

            {/* SCENE 4 : LA CONCLUSION */}
            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none">
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#00F2FF] to-transparent mb-8" />
              <p className="font-manrope text-white/70 text-lg md:text-xl leading-relaxed font-light">
                Nous créons plus que des soirées : nous concevons des moments d'exclusivité où la lumière fend l'obscurité, et où l'accès est un privilège absolu.
              </p>
            </motion.div>

          </div>
        </section>

        {/* =========================================================
            SECTION 2 : FAKE HORIZONTAL SCROLL (Hauteur réduite : 300vw)
        ========================================================= */}
        <section id="vitrine" ref={horizontalRef} className="relative w-full h-[300vw] bg-black">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
            
            {/* Grand texte en background (Parallax inverse) */}
            <motion.div style={{ x: bgTextX }} className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-5 pointer-events-none">
              <h2 className="text-[15rem] md:text-[25rem] font-black font-syne uppercase text-white">ARCHIVES</h2>
            </motion.div>

            {/* Le container qui se déplace horizontalement avec INERTIE */}
            <motion.div style={{ x: xTransform }} className="flex h-full items-center relative z-10 px-[10vw]">
              
              {/* Écran 1 : Titre de la section */}
              <div className="w-[90vw] md:w-[60vw] flex flex-col justify-center shrink-0 pr-10 md:pr-20">
                <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase">Exploration</span>
                <h2 className="text-5xl md:text-7xl font-black font-syne uppercase tracking-widest text-white">
                  La <span className="text-[#00F2FF] text-glow">Vitrine</span>
                </h2>
                <p className="font-manrope text-white/50 mt-6 max-w-sm text-lg">
                  Glissez à travers l'obscurité pour découvrir les soirées qui ont façonné notre légende.
                </p>
              </div>

              {/* Les images de la vitrine alignées horizontalement */}
              {VITRINE_IMAGES.map((src, i) => (
                <div key={i} className="w-[75vw] md:w-[35vw] h-[55vh] shrink-0 mr-8 md:mr-16 relative group interactive-element">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-md relative shadow-2xl">
                    <img src={src} alt={`Vitrine ${i}`} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-8 left-8">
                      <p className="font-syne font-bold tracking-[0.3em] text-[#00F2FF] text-[10px] uppercase mb-2">Dossier Classé</p>
                      <h3 className="font-syne font-black text-white text-3xl tracking-widest uppercase">VOL. 0{i + 1}</h3>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-[30vw] shrink-0" /> {/* Espace de fin */}
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3 : RÉSEAUX SOCIAUX
        ========================================================= */}
        <section id="réseaux" className="w-full overflow-hidden bg-[#020202] py-24 md:py-32 border-y border-white/5 relative z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex whitespace-nowrap gap-16 items-center relative z-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {Array(6).fill([
              <span key="1" className="text-white/20 hover:text-[#00F2FF] transition-colors">REJOIGNEZ LE CERCLE</span>, 
              <Instagram key="ig" size={30} className="text-[#00F2FF]"/>, 
              <span key="2" className="text-white/20 hover:text-[#00F2FF] transition-colors">@TRAPHOUSE_EVENT</span>, 
              <Disc key="tk" size={30} className="text-[#00F2FF]"/>, 
            ]).flat().map((item, i) => (
              <span key={i} className="interactive-element text-4xl md:text-6xl font-black font-syne uppercase tracking-[0.2em] flex items-center gap-16 cursor-pointer">
                {item}
              </span>
            ))}
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 4 : SHOP & RÉSERVATIONS (VIP)
        ========================================================= */}
        <section id="vip" className="relative w-full py-32 md:py-48 px-6 bg-black/80 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-center flex flex-col items-center">
              <Lock className="w-8 h-8 text-[#00F2FF] mb-6 drop-shadow-[0_0_10px_#00F2FF]" />
              <h2 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-widest text-white mb-4">
                Zone <span className="text-white/30">Privilège</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* TRAP HOUSE SHOP */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="interactive-element relative h-[500px] flex flex-col items-center justify-center rounded-3xl border border-white/5 overflow-hidden group bg-[#050505] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-20 flex flex-col items-center p-8 text-center">
                  <h3 className="text-3xl md:text-5xl font-black font-syne text-white tracking-widest mb-4">
                    TRAP HOUSE <br/><span className="text-white/20">SHOP</span>
                  </h3>
                  <p className="font-manrope text-white/40 text-sm mb-12 max-w-xs">Merchandising exclusif. Le style de la nuit, réservé à nos membres.</p>
                  <div className="px-8 py-4 rounded-full bg-black/50 border border-white/10 group-hover:border-[#00F2FF] transition-all duration-300">
                    <p className="text-white/50 group-hover:text-[#00F2FF] font-syne text-[10px] tracking-[0.4em] font-bold uppercase transition-colors">Coming Soon</p>
                  </div>
                </div>
              </motion.div>

              {/* RÉSERVATIONS VIP */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }} className="interactive-element relative h-[500px] flex flex-col items-center justify-center rounded-3xl border border-white/5 overflow-hidden group bg-[#050505] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-20 flex flex-col items-center p-8 text-center">
                  <h3 className="text-3xl md:text-5xl font-black font-syne text-white tracking-widest mb-4">
                    RÉSERVATIONS <br/><span className="text-[#00F2FF] text-glow">VIP</span>
                  </h3>
                  <p className="font-manrope text-white/40 text-sm mb-12 max-w-xs">Garantissez votre table, accédez aux zones privées et profitez d'un service premium.</p>
                  <div className="px-8 py-4 rounded-full bg-black/50 border border-white/10 group-hover:border-[#00F2FF] transition-all duration-300">
                    <p className="text-white/50 group-hover:text-[#00F2FF] font-syne text-[10px] tracking-[0.4em] font-bold uppercase transition-colors">Coming Soon</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative w-full py-16 flex flex-col items-center bg-[#020202] border-t border-white/5 z-10">
          <h2 className="font-syne font-black tracking-[0.5em] text-xl md:text-2xl text-white/30 mb-8 text-glow">TRAP HOUSE</h2>
          <p className="text-white/20 text-[8px] md:text-[10px] font-syne uppercase tracking-[0.3em] text-center px-4">
            © {new Date().getFullYear()} TRAP HOUSE EVENT. TOUS DROITS RÉSERVÉS.
          </p>
        </footer>

      </main>
    </div>
  );
}