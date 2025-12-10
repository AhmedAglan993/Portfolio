import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-blue/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-neon-blue/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Initialize Uplink</h2>
              <p className="text-gray-400 mb-8">
                Ready to bring virtual concepts to reality? Whether you have a game idea, a VR training module, or need an AR consultant, my inbox is open.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-all">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-mono">Email</div>
                    <div className="text-white font-medium">ahmedaglan993@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-black transition-all">
                    <i className="fa-brands fa-linkedin"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-mono">LinkedIn</div>
                    <div className="text-white font-medium">linkedin.com/in/ahmad-m-aglan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">IDENTIFIER (NAME)</label>
                <input type="text" className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">TRANSMISSION (EMAIL)</label>
                <input type="email" className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">DATA PACKET (MESSAGE)</label>
                <textarea rows={4} className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="w-full py-3 bg-white/5 border border-neon-blue/50 text-neon-blue hover:bg-neon-blue hover:text-black font-bold uppercase tracking-wider rounded transition-all duration-300">
                Send Message
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;