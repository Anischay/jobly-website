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