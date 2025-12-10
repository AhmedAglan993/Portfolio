import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-neon-dark/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-mono tracking-tighter text-white">
          AHMED<span className="text-neon-blue">.AGLAN</span>
        </a>

        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="md:hidden text-white text-xl">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;