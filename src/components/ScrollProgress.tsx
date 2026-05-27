import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setWidth(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[3px] bg-cyan-400 z-[999999] shadow-[0_0_15px_#00f0ff,0_0_8px_#00f0ff] rounded-r-full transition-all duration-100 ease-out" 
      style={{ width: `${width}%` }} 
    />
  );
}
