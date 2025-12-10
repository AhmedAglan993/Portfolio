import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-black/40 border-y border-white/5 relative">
      <div className="container mx-auto px-6">
         <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Mastering the pipeline from concept to compiled executable.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="p-6 bg-neon-panel border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-3xl ${skill.color}`}>
                  <i className={skill.icon}></i>
                </div>
                <h3 className="text-lg font-bold text-white">{skill.name}</h3>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Badge Grid for smaller tools */}
        <div className="mt-12 pt-12 border-t border-white/5">
          <h4 className="text-center text-sm font-mono text-gray-500 mb-6 uppercase tracking-widest">Other Tools & Software</h4>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-3xl opacity-60">
             <i className="fa-brands fa-git-alt hover:text-red-500 transition-colors" title="Git"></i>
             <i className="fa-brands fa-jira hover:text-blue-500 transition-colors" title="Jira"></i>
             <i className="fa-brands fa-figma hover:text-pink-500 transition-colors" title="Figma"></i>
             <i className="fa-brands fa-python hover:text-yellow-500 transition-colors" title="Python"></i>
             <i className="fa-brands fa-docker hover:text-blue-400 transition-colors" title="Docker"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;