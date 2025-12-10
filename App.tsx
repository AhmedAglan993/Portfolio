import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AIChatBot from './components/AIChatBot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-900">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm font-mono">
            © {new Date().getFullYear()} Ahmed Aglan. All rights reserved.
          </p>
        </div>
      </footer >

      {/* The Digital Twin Assistant */}
      < AIChatBot />
    </div >
  );
};

export default App;