import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Tool {
  name: string;
  category: string;
  icon: LucideIcon;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  number: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  tags: string[];
}