import React from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative bg-neon-panel border border-gray-800 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:-translate-y-2">
    {/* Image container */}
    <div className="aspect-video w-full overflow-hidden relative">
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-black/70 backdrop-blur text-xs font-mono border border-gray-600 rounded text-neon-blue uppercase">
          {project.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map(tech => (
          <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/5">
            {tech}
          </span>
        ))}
      </div>

      <a href={project.link} className="inline-flex items-center text-sm font-mono text-neon-blue hover:text-white transition-colors">
        View Case Study <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
      </a>
    </div>
  </div>
);

const Projects: React.FC = () => {
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;