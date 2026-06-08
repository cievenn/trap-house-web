export default function EnergyBackground() {
  return (
    <>
      {/* 
        ========================================
        DESKTOP VIDEO BACKGROUND (Hidden on mobile)
        ======================================== 
      */}
      <div className="fixed inset-0 w-full h-full z-[-99] hidden md:block overflow-hidden bg-dark">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video-bc-traphouse.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 
        ========================================
        MOBILE ENERGY BACKGROUND (Hidden on desktop)
        ======================================== 
      */}
      <div className="energy-lines-wrapper md:hidden bg-dark">
        {/* Grille technologique en fond spécifique au mobile pour un look Pro-Max */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 100% 50% at 50% 50%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 50% at 50% 50%, black 30%, transparent 80%)'
          }}
        ></div>

        {/* Ligne 1 */}
        <svg className="energy-line line-1" viewBox="0 0 2000 1000" preserveAspectRatio="none">
          <path d="M0,500 C400,200 600,800 1000,500 C1400,200 1600,800 2000,500" />
          <path d="M1000,500 C1400,200 1600,800 2000,500 C2400,200 2600,800 3000,500" />
        </svg>
        
        {/* Ligne 2 */}
        <svg className="energy-line line-2" viewBox="0 0 2000 1000" preserveAspectRatio="none">
          <path d="M0,600 C300,900 700,100 1000,600 C1300,900 1700,100 2000,600" />
          <path d="M1000,600 C1300,900 1700,100 2000,600 C2300,900 2700,100 3000,600" />
        </svg>

        {/* Ligne 3 */}
        <svg className="energy-line line-3" viewBox="0 0 2000 1000" preserveAspectRatio="none">
          <path d="M0,400 C500,100 500,900 1000,400 C1500,100 1500,900 2000,400" />
          <path d="M1000,400 C1500,100 1500,900 2000,400 C2500,100 2500,900 3000,400" />
        </svg>

        {/* Particules lumineuses flottantes pour plus de dynamisme sur mobile */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </>
  );
}
