import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Horizon: Cyberpunk VR',
    category: 'VR',
    description: 'A fully immersive open-world VR RPG built in Unreal Engine 5. Features physics-based combat and realistic climbing mechanics.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    techStack: ['Unreal Engine 5', 'C++', 'OpenXR', 'Blender'],
    link: '#'
  },
  {
    id: '2',
    title: 'Echoes of Mars AR',
    category: 'AR',
    description: 'Educational AR application for museums. Users point their phones at exhibits to see animated historical reconstructions.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    techStack: ['Unity', 'AR Foundation', 'C#', 'Shader Graph'],
    link: '#'
  },
  {
    id: '3',
    title: 'Voxel Tactics',
    category: 'Game Dev',
    description: 'A turn-based strategy game with destructible voxel environments. Custom pathfinding algorithms and procedural generation.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    techStack: ['Unity', 'C#', 'MagicaVoxel', 'Steamworks API'],
    link: '#'
  },
  {
    id: '4',
    title: 'Industrial Training Sim',
    category: 'VR',
    description: 'Enterprise VR solution for training heavy machinery operators. Focused on safety compliance and realistic control inputs.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    techStack: ['Unity', 'VR Interaction Toolkit', 'Oculus Quest 2'],
    link: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Unity (C#)', level: 95, icon: 'fa-brands fa-unity', color: 'text-white' },
  { name: 'Unreal Engine (C++)', level: 85, icon: 'fa-gamepad', color: 'text-blue-400' },
  { name: 'AR Development', level: 90, icon: 'fa-mobile-screen', color: 'text-green-400' },
  { name: '3D Math & Physics', level: 80, icon: 'fa-calculator', color: 'text-yellow-400' },
  { name: 'Shader Programming', level: 75, icon: 'fa-wand-magic-sparkles', color: 'text-purple-400' },
  { name: 'React & WebGL', level: 70, icon: 'fa-brands fa-react', color: 'text-cyan-400' },
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];