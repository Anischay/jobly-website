export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  requirements: string[];
  companyLogo: string;
  matchPercentage: number;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  bio: string;
  education: string;
  avatar: string;
  matchPercentage: number;
}

export type SwipeDirection = 'left' | 'right' | null;

export interface MatchStats {
  totalMatches: number;
  todaySwipes: number;
  matchRate: number;
}

export interface VideoIntro {
  url: string;
  thumbnail: string;
}

export interface Resume {
  url: string;
  preview: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface CandidateProfile {
  name: string;
  title: string;
  avatar: string;
  location: string;
  bio: string;
  skills: string[];
  videoIntro?: VideoIntro;
  resume?: Resume;
  projects?: Project[];
  workExperience?: WorkExperience[];
  socialLinks?: SocialLinks;
}

export interface CompanyCulture {
  worklife: string;
  values: string[];
  benefits: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface CompanyProfile {
  name: string;
  logo: string;
  location: string;
  industry: string;
  description: string;
  techStack: string[];
  matchPercentage: number;
  culture: CompanyCulture;
  teamHighlights?: TeamMember[];
  socialLinks?: SocialLinks;
} 