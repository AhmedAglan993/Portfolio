import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative text-center">
        <div className="inline-block mb-4 px-4 py-1 border border-neon-blue/50 rounded-full bg-neon-blue/5 backdrop-blur-sm">
          <span className="text-neon-blue font-mono text-sm tracking-widest">AVAILABLE FOR HIRE</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
          BUILDING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-glow">
            DIGITAL REALITIES
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Hi, I'm <strong className="text-white">Alex Void</strong>. 
          I engineer immersive VR/AR experiences and high-performance game mechanics using Unity and Unreal Engine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            className="px-8 py-3 bg-neon-blue text-black font-bold rounded hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
          >
            VIEW PROJECTS
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 border border-gray-500 hover:border-white text-gray-300 hover:text-white rounded transition-all duration-300 backdrop-blur-sm bg-white/5"
          >
            CONTACT ME
          </a>
        </div>

        {/* Floating Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-70">
          <div className="p-4 border-l-2 border-neon-purple/50 bg-black/30">
            <div className="text-2xl font-mono font-bold text-white">5+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Years Exp</div>
          </div>
          <div className="p-4 border-l-2 border-neon-blue/50 bg-black/30">
            <div className="text-2xl font-mono font-bold text-white">12</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Shipped Titles</div>
          </div>
          <div className="p-4 border-l-2 border-neon-green/50 bg-black/30">
            <div className="text-2xl font-mono font-bold text-white">3</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Platforms</div>
          </div>
          <div className="p-4 border-l-2 border-white/50 bg-black/30">
            <div className="text-2xl font-mono font-bold text-white">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Passion</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;