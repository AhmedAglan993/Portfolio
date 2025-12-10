export interface Project {
  id: string;
  title: string;
  category: 'VR' | 'AR' | 'Game Dev' | 'Tech Art';
  description: string;
  imageUrl: string;
  techStack: string[];
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string; // FontAwesome class
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}