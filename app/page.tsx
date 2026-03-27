import { ClientShell } from "@/components/ClientShell";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VitrineSection } from "@/components/VitrineSection";
import { ReseauxSection } from "@/components/ReseauxSection";
import { VIPSection } from "@/components/VIPSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <ClientShell>
      <main className="relative z-10 w-full flex flex-col selection:bg-[#00F2FF] selection:text-black">
        <Navbar />
        <HeroSection />
        <VitrineSection />
        <ReseauxSection />
        <VIPSection />
        <Footer />
      </main>
    </ClientShell>
  );
}