import React, { useState, useEffect } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-navy-dark/90 border-white/10 shadow-lg' 
          : 'bg-white/90 border-gray-200 shadow-lg'
        : darkMode 
          ? 'bg-navy-dark/50 border-white/10' 
          : 'bg-white/50 border-gray-200'
    } backdrop-blur-xl`}>
      <div className="flex items-center gap-8">
        <span className={`font-bold text-lg ${darkMode ? 'text-slate-light' : 'text-gray-900'}`}>
          Mamadou Ba
        </span>
        
        <div className="hidden md:flex items-center gap-6 text-sm">
          <button 
            onClick={() => scrollToSection('projects')} 
            className={`${darkMode ? 'text-slate hover:text-cyan' : 'text-gray-600 hover:text-navy'} transition-colors`}
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className={`${darkMode ? 'text-slate hover:text-cyan' : 'text-gray-600 hover:text-navy'} transition-colors`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={`${darkMode ? 'text-slate hover:text-cyan' : 'text-gray-600 hover:text-navy'} transition-colors`}
          >
            Blog
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10 text-cyan' : 'hover:bg-gray-200 text-navy'} transition-colors`}
            aria-label="Toggle theme"
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <a 
            href="mailto:Mamadou.Ba@CIX.CSI.CUNY.EDU?subject=Let's Talk AI"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
              darkMode 
                ? 'border-cyan text-cyan hover:bg-cyan/10' 
                : 'border-navy text-navy hover:bg-navy/10'
            }`}
          >
            Let's Talk AI
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
