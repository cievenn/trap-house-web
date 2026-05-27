export default function EnergyBackground() {
  return (
    <div className="energy-lines-wrapper">
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
    </div>
  );
}
