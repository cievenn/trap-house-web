"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Instagram, Twitter, Disc, ChevronDown } from "lucide-react";

// Imports décomposés
import { NEWS_DATA, VITRINE_IMAGES, NewsType } from "@/lib/data";
import { CustomCursor } from "@/components/CustomCursor";
import { TiltCard } from "@/components/TiltCard";
import { NewsModal } from "@/components/NewsModal";

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="w-full relative min-h-screen">
      <CustomCursor />
      
      <main className="relative w-full flex flex-col items-center overflow-x-hidden selection:bg-[#00F2FF] selection:text-black">
        
        {/* --- NAVBAR --- */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="fixed top-0 left-0 w-full z-[100] flex justify-center py-6 px-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex gap-8 md:gap-14 px-10 py-5 rounded-sm border border-white/5 bg-[#050505]/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {["Accueil", "Actualités", "Vitrine", "Elite"].map((item) => (
              <a 
                key={item} href={`#${item.toLowerCase()}`}
                className="interactive-element relative text-[10px] md:text-xs font-syne font-bold tracking-[0.3em] text-white/50 hover:text-[#00F2FF] transition-colors uppercase group"
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#00F2FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.nav>

        {/* --- MODAL --- */}
        <NewsModal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} data={selectedNews} />

        {/* --- HERO SECTION --- */}
        <section id="accueil" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
          <div className="ethereal-glow-1" />
          <div className="ethereal-glow-2" />
          <div className="absolute inset-0 cyber-grid z-0" />
          <div className="absolute inset-0 noise-bg opacity-[0.15] mix-blend-overlay pointer-events-none z-10" />

          <motion.div 
            style={{ y: yHeroText, opacity: opacityHeroText }}
            className="z-20 flex flex-col items-center relative"
          >
            <motion.div 
              initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative mb-12"
            >
              <div className="w-40 h-40 md:w-56 md:h-56 relative rounded-full p-1 bg-gradient-to-b from-[#00F2FF]/30 to-transparent shadow-[0_0_80px_rgba(0,242,255,0.15)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
                  <div className="absolute inset-0 noise-bg opacity-40 mix-blend-overlay z-10" />
                  <img 
                    src="/assets/traphouse.jpg" 
                    alt="Trap House" 
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.2)_0%,transparent_60%)] z-20" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="relative">
              <h1 
                data-text="TRAP HOUSE"
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-black font-syne tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 text-center text-glow leading-none glitch-text select-none"
              >
                TRAP HOUSE
              </h1>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-12 flex items-center gap-4 bg-[#050505]/80 backdrop-blur-md px-6 py-2 border border-[#00F2FF]/20 rounded-full">
              <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-pulse shadow-[0_0_10px_#00F2FF]" />
              <p className="text-[#00F2FF] font-syne tracking-[0.4em] text-[10px] md:text-xs font-bold uppercase">
                System Initialized // Elite Access
              </p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            <span className="font-syne text-[9px] tracking-[0.4em] text-white mb-4 uppercase">Scroll to enter</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown className="text-[#00F2FF]" size={20} />
            </motion.div>
          </motion.div>
        </section>

        {/* --- SECTION ACTUALITÉS --- */}
        <section id="actualités" className="relative w-full bg-[#020202] py-32 md:py-48 px-6 z-10 border-t border-white/5">
          <div className="absolute inset-0 cyber-grid opacity-30 z-0" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-[1px] bg-[#00F2FF]" />
                  <span className="font-syne text-[#00F2FF] text-xs tracking-[0.3em] font-bold">DATABASE // 01</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-tight text-white">
                  Dernières <br/><span className="text-white/20">Missions</span>
                </h2>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="font-manrope text-white/40 max-w-sm text-sm md:text-base border-l border-white/10 pl-6">
                Accédez aux dossiers confidentiels des événements passés et à venir. Seuls les membres accrédités peuvent consulter les détails complets.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-[1500px]">
              {NEWS_DATA.map((news, i) => (
                <motion.div key={news.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}>
                  <TiltCard data={news} onClick={() => setSelectedNews(news)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION VITRINE --- */}
        <section id="vitrine" className="relative w-full bg-[#000000] py-32 md:py-48 px-6 z-10">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020202] to-transparent z-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center mb-24 text-center">
              <span className="font-syne text-[#00F2FF] text-xs tracking-[0.3em] font-bold mb-4">GALLERY // 02</span>
              <h2 className="text-4xl md:text-6xl font-black font-syne uppercase tracking-tight text-white mb-6">
                L'Élite <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FF] to-blue-800 text-glow">en Images</span>
              </h2>
            </motion.div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {VITRINE_IMAGES.map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.1 }} className="interactive-element relative overflow-hidden rounded-sm group break-inside-avoid cursor-crosshair border border-white/5 bg-[#050505]">
                  <img src={src} alt={`Archive Trap House ${i}`} className="w-full h-auto object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#00F2FF]/0 group-hover:bg-[#00F2FF]/10 mix-blend-screen transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-md">
                    <div className="flex flex-col items-center border border-[#00F2FF]/30 p-4">
                      <Lock size={16} className="text-[#00F2FF] mb-2" />
                      <span className="font-syne font-bold tracking-[0.3em] text-[#00F2FF] text-[10px]">ARCHIVE_{i+1}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/30 group-hover:border-[#00F2FF] transition-colors" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/30 group-hover:border-[#00F2FF] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CARROUSEL RÉSEAUX SOCIAUX --- */}
        <section className="w-full overflow-hidden bg-[#050505] border-y border-white/10 py-10 relative z-20">
          <div className="absolute inset-0 noise-bg opacity-20 mix-blend-overlay pointer-events-none" />
          <motion.div className="flex whitespace-nowrap gap-16 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }}>
            {Array(8).fill([
              <span key="1" className="text-white/50 hover:text-[#00F2FF] transition-colors">INSTAGRAM</span>, 
              <Instagram key="ig" size={20} className="text-[#00F2FF]"/>, 
              <span key="2" className="text-white/50 hover:text-[#00F2FF] transition-colors">TIKTOK</span>, 
              <Disc key="tk" size={20} className="text-[#00F2FF]"/>, 
              <span key="3" className="text-white/50 hover:text-[#00F2FF] transition-colors">TWITTER</span>, 
              <Twitter key="tw" size={20} className="text-[#00F2FF]"/>
            ]).flat().map((item, i) => (
              <span key={i} className="interactive-element text-xl md:text-3xl font-black font-syne uppercase tracking-[0.2em] flex items-center gap-16 cursor-pointer">
                {item}
              </span>
            ))}
          </motion.div>
        </section>

        {/* --- SECTION VIP / COMING SOON --- */}
        <section id="elite" className="relative w-full bg-[#020202] py-32 md:py-48 px-6 z-10">
          <div className="ethereal-glow-2 opacity-50" />
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-tight text-white mb-4">
                RESTRICTED <span className="text-white/20">AREA</span>
              </h2>
              <p className="font-manrope text-white/40 text-sm md:text-base">Niveau d'accréditation insuffisant. Veuillez patienter.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div whileHover={{ scale: 1.02 }} className="interactive-element relative h-[450px] flex flex-col items-center justify-center rounded-sm bg-[#050505] border border-white/5 overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000')] bg-cover bg-center opacity-10 grayscale group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 to-[#020202]" />
                <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay" />
                <div className="absolute inset-10 border border-white/5 group-hover:border-[#00F2FF]/20 transition-colors pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-black/50 backdrop-blur-md group-hover:border-red-500/50 transition-colors">
                    <Lock className="w-8 h-8 text-white/30 group-hover:text-red-500 transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black font-syne text-white/80 tracking-widest text-center px-4 mb-2">
                    TRAP HOUSE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white/30 to-white/10">SHOP</span>
                  </h3>
                  <div className="mt-8 px-8 py-3 bg-[#050505] border border-red-500/30 group-hover:border-red-500/80 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors" />
                    <p className="relative z-10 text-red-500 font-syne text-[10px] tracking-[0.4em] font-bold">ACCESS DENIED_</p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] shadow-[0_0_20px_red]" />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="interactive-element relative h-[450px] flex flex-col items-center justify-center rounded-sm bg-[#050505] border border-white/5 overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000')] bg-cover bg-center opacity-10 grayscale group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 to-[#020202]" />
                <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay" />
                <div className="absolute inset-10 border border-white/5 group-hover:border-[#00F2FF]/20 transition-colors pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-black/50 backdrop-blur-md group-hover:border-[#00F2FF]/50 transition-colors shadow-[0_0_0_rgba(0,242,255,0)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <Lock className="w-8 h-8 text-white/30 group-hover:text-[#00F2FF] transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black font-syne text-white/80 tracking-widest text-center px-4 mb-2">
                    RÉSERVATIONS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FF]/50 to-blue-900/50">VIP</span>
                  </h3>
                  <div className="mt-8 px-8 py-3 bg-[#050505] border border-[#00F2FF]/30 group-hover:border-[#00F2FF] transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00F2FF]/5 group-hover:bg-[#00F2FF]/20 transition-colors" />
                    <p className="relative z-10 text-[#00F2FF] font-syne text-[10px] tracking-[0.4em] font-bold">DECRYPTING...</p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00F2FF]/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_3s_linear_infinite] shadow-[0_0_20px_#00F2FF]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative w-full py-16 flex flex-col items-center bg-[#000000] border-t border-white/10 z-10 overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          <h2 className="font-syne font-black tracking-[0.5em] text-2xl md:text-3xl text-white/30 mb-8 relative z-10 text-glow">TRAP HOUSE</h2>
          <div className="flex gap-8 mb-12 relative z-10">
            <a href="#" className="interactive-element text-white/30 hover:text-[#00F2FF] transition-colors group"><Instagram size={24} className="group-hover:scale-110 transition-transform"/></a>
            <a href="#" className="interactive-element text-white/30 hover:text-[#00F2FF] transition-colors group"><Twitter size={24} className="group-hover:scale-110 transition-transform"/></a>
          </div>
          <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          <p className="text-white/20 text-[9px] md:text-[10px] font-syne uppercase tracking-[0.3em] text-center px-4 relative z-10">
            © {new Date().getFullYear()} TRAP HOUSE EVENT. L'ÉLITE DE LA NUIT. TOUS DROITS RÉSERVÉS.
          </p>
        </footer>
      </main>
    </div>
  );
}