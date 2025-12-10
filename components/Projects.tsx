import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl bg-neon-panel border border-neon-blue/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-black/50">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{project.title}</h3>
            {project.company && (
              <span className="text-neon-purple text-xs font-mono uppercase tracking-wider">{project.company}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black w-full">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-50" />
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded text-xs font-mono uppercase">
              {project.category}
            </span>
            {project.techStack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded text-xs font-mono uppercase">
                {tech}
              </span>
            ))}
          </div>

          <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
          <p className="text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex gap-4">
            {/* If there was a real link, we would show it here. For now, it's just the case study view. */}
            <button className="px-6 py-2 bg-neon-blue text-black font-bold rounded hover:bg-white transition-colors" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact for specific details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onSelect: (p: Project) => void }> = ({ project, onSelect }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleMouseEnter = () => {
    if (project.videoUrl && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(e => console.log("Video play failed:", e));
    }
  };

  const handleMouseLeave = () => {
    if (project.videoUrl && videoRef.current) {
      setIsPlaying(false);
      videoRef.current.pause();
      // We don't reset currentTime for smoother preview pause/resume feeling, or reset to 0 if desired.
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative bg-neon-panel border border-gray-800 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Media container */}
      <div className="aspect-video w-full overflow-hidden relative bg-black">
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} // Hide image when video plays
        />

        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-black/70 backdrop-blur text-xs font-mono border border-gray-600 rounded text-neon-blue uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>

        {project.company && (
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-building text-neon-purple text-xs"></i>
            <span className="text-neon-purple text-xs font-mono tracking-wide uppercase">{project.company}</span>
          </div>
        )}

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/5">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/5">+{project.techStack.length - 3}</span>
          )}
        </div>

        <button className="inline-flex items-center text-sm font-mono text-neon-blue hover:text-white transition-colors mt-auto">
          View Case Study <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Projects</h2>
            <div className="h-1 w-20 bg-neon-blue rounded"></div>
          </div>
          <p className="text-gray-400 font-mono mt-4 md:mt-0">
            // SELECTED WORKS 2023-2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;