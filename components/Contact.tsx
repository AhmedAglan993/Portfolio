import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
    // Sign up at https://www.emailjs.com/
    const SERVICE_ID = 'service_m58f2w1';
    const TEMPLATE_ID = 'template_omofbst';
    const PUBLIC_KEY = '8rCZ_cSY2cdkfLzWx';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        if (form.current) form.current.reset();
      }, (error) => {
        console.log(error.text);
        setStatus('error');
      });
  };

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
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">IDENTIFIER (NAME)</label>
                <input type="text" name="user_name" className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">TRANSMISSION (EMAIL)</label>
                <input type="email" name="user_email" className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="john@company.com" required />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">DATA PACKET (MESSAGE)</label>
                <textarea name="message" rows={4} className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="Tell me about your project..." required></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-3 border font-bold uppercase tracking-wider rounded transition-all duration-300 ${status === 'success'
                  ? 'bg-green-500/20 border-green-500 text-green-500'
                  : status === 'error'
                    ? 'bg-red-500/20 border-red-500 text-red-500'
                    : 'bg-white/5 border-neon-blue/50 text-neon-blue hover:bg-neon-blue hover:text-black'
                  }`}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && 'Transmitting...'}
                {status === 'success' && 'Transmission Complete'}
                {status === 'error' && 'Transmission Failed'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;