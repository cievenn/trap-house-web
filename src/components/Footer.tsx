import { useState } from 'react';
import { X } from 'lucide-react';

export default function Footer() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <footer className="relative z-10 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto py-8 lg:py-10 px-6 relative flex flex-col items-center justify-center gap-6">
          
          <div className="flex flex-col items-center gap-3">
            <div className="font-syne font-bold text-lg tracking-widest text-white/90 text-center">
              TRAP HOUSE
            </div>
            
            <div className="font-manrope text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 uppercase text-center">
              <span>© 2026 Tous droits réservés</span>
              <span className="hidden sm:inline text-gray-800">|</span>
              <button 
                onClick={() => setShowLegal(true)}
                className="hover:text-cyan-400 transition-colors duration-300 uppercase whitespace-nowrap"
              >
                Mentions Légales & Confidentialité
              </button>
            </div>
          </div>

          <div className="lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 mt-4 lg:mt-0 flex justify-center">
            <a 
              href="https://www.srw-studio.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center"
            >
              <img 
                src="/srwstudio.webp" 
                alt="SRW Studio" 
                className="h-8 sm:h-10 w-auto opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(0,195,255,0.8)] transition-all duration-500"
              />
              <span className="absolute top-full mt-2 text-[8px] sm:text-[10px] font-manrope tracking-widest text-cyan-400 uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 whitespace-nowrap pointer-events-none">
                Réalisé par SRW STUDIO
              </span>
            </a>
          </div>

        </div>
      </footer>

      {showLegal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowLegal(false)}
        >
          <div 
            className="bg-gray-950 border border-gray-800 p-6 sm:p-10 max-w-3xl w-full rounded-2xl relative my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowLegal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="font-manrope text-sm text-gray-300 space-y-8 mt-2">
              <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-8">MENTIONS LÉGALES ET POLITIQUE DE CONFIDENTIALITÉ</h2>
              
              <section>
                <h3 className="text-white font-bold mb-2">1. Éditeur du site</h3>
                <p className="leading-relaxed">Le site Trap House est édité par :<br/>
                Anthony Moreira<br/>
                Statut : Micro-Entreprise<br/>
                Adresse : 28 Rue Du Bourg, 21000 Dijon<br/>
                Contact : a.moreira1503@gmail.com</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">2. Directeur de la publication</h3>
                <p className="leading-relaxed">Anthony Moreira</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">3. Hébergement</h3>
                <p className="leading-relaxed">Le site est hébergé par :<br/>
                Vercel Inc.<br/>
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">4. Création du site</h3>
                <p className="leading-relaxed">Site conçu et développé par : SRW Studio</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">5. Données personnelles (RGPD)</h3>
                <p className="leading-relaxed">Le site Trap House n'utilise pas de cookies de traçage publicitaire. Si vous nous contactez par e-mail, vos coordonnées ne seront utilisées que pour vous répondre et ne seront jamais revendues. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à a.moreira1503@gmail.com.</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
