import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'VR Citadel: Mohamed Ali Mosque',
    category: 'VR',
    description: 'A photorealistic VR walkthrough of the historic Mohamed Ali Mosque in Unreal Engine. Features immersive voice-overs triggering at key hotspots to guide the user.',
    imageUrl: 'https://picsum.photos/800/600?random=15',
    videoUrl: '/videos/optimized/vr_citadel.mp4',
    techStack: ['Unreal Engine', 'Photogrammetry', '3D Audio', 'VR Interaction'],
    link: '#'
  },
  {
    id: '6',
    title: 'Jungle VR: Animal Care',
    category: 'VR',
    description: 'An educational VR game built in Unreal Engine. Players step into the role of a vet in the jungle, diagnosing and treating animals with interactive medical tools.',
    imageUrl: 'https://picsum.photos/800/600?random=16',
    videoUrl: '/videos/optimized/jungle_vr.mp4',
    techStack: ['Unreal Engine', 'VR Physics', 'Blueprints', 'Education'],
    link: '#'
  },
  {
    id: '7',
    title: 'Luxury Real Estate VR',
    category: 'VR',
    description: 'Interactive VR showcases for high-end properties. Prospective buyers can explore unbuilt architectural spaces with realistic lighting and material customization.',
    imageUrl: 'https://picsum.photos/800/600?random=17',
    videoUrl: '/videos/optimized/real_estate.mp4',
    techStack: ['Unreal/Unity', 'ArchViz', 'Real-time Raytracing', 'Oculus Quest'],
    link: '#'
  },
  {
    id: '2',
    title: 'Qat Workshop Experience',
    category: 'VR',
    description: 'A cultural VR experience created for Saudi National Day. Users engage in traditional Qat painting and pottery-making techniques in a virtual studio.',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    videoUrl: '/videos/optimized/qat_workshop.mp4',
    techStack: ['Unity', 'VR Interaction', '3D Modeling', 'Cultural Art'],
    link: '#'
  },
  {
    id: '3',
    title: 'Virtual Bowling Event',
    category: 'VR',
    description: 'An engaging VR bowling game designed specifically for a pharmaceutical product launch. focused on intuitive mechanics for quick user onboarding.',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    videoUrl: '/videos/optimized/bowling.mp4',
    techStack: ['Unity', 'Oculus VR', 'Physics', 'Event System'],
    link: '#'
  },
  {
    id: '4',
    title: 'Limitless: Falling Tablets',
    category: 'AR', // Categorizing Kinect/Motion as AR/Interactive
    description: 'Motion-controlled Kinect game for Eva Pharma. Players use whole-body movement to collect falling items, driving engagement at the launch event.',
    imageUrl: 'https://picsum.photos/800/600?random=13',
    videoUrl: '/videos/optimized/falling_tablets.mp4',
    techStack: ['Unity', 'Kinect SDK', 'Motion Capture', 'Interaction Design'],
    link: '#'
  },
  {
    id: '5',
    title: 'Interactive Fruit Ninja',
    category: 'Game Dev',
    description: 'Customized touch-screen slicing game for a corporate event. Features branded elements and high-performance particle effects.',
    imageUrl: 'https://picsum.photos/800/600?random=14',
    videoUrl: '/videos/optimized/fruit_ninja.mp4',
    techStack: ['Unity', 'Touch Interface', '2D Physics', 'Particle Systems'],
    link: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Team Leadership', level: 100, icon: 'fa-solid fa-users-gear', color: 'text-neon-blue' },
  { name: 'Project Management', level: 95, icon: 'fa-solid fa-list-check', color: 'text-neon-purple' },
  { name: 'Unity (C#)', level: 90, icon: 'fa-brands fa-unity', color: 'text-white' },
  { name: 'Unreal (Blueprints)', level: 90, icon: 'fa-gamepad', color: 'text-blue-400' },
  { name: 'C# Programming', level: 90, icon: 'fa-code', color: 'text-green-400' },
  { name: 'Full Cycle Dev', level: 100, icon: 'fa-solid fa-infinity', color: 'text-yellow-400' },
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];