// Types for the AI Academic Advisor POC

export interface Student {
  id: string;
  name: string;
  email: string;
  currentCredits: number;
  totalCreditsNeeded: number;
  currentGPA: number;
  semestersPassed: number;
  expectedGraduation: string;
  completedCourses: string[];
  careerGoal?: string;
  specializations?: string[];
  postGradInterest?: string[];
  interestedInGradSchool?: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  prerequisites: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Career {
  id: string;
  title: string;
  description: string;
  requiredCourses: string[];
  recommendedCourses: string[];
  averageSalary: number;
  jobGrowth: string;
  graduatePrograms?: GraduateProgram[];
}

export interface RiskAssessment {
  level: 'Green' | 'Yellow' | 'Red';
  score: number;
  factors: string[];
  recommendations: string[];
}

export interface CourseRecommendation {
  course: Course;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ProgressTracking {
  careerTitle: string;
  completionPercentage: number;
  completedRequirements: string[];
  remainingRequirements: string[];
  nextRecommendedCourse: string;
  estimatedCompletionSemesters: number;
}

export interface GraduateProgram {
  id: string;
  title: string;
  degree: 'MS' | 'PhD';
  department: string;
  description: string;
  duration: string;
  minGPA: number;
  requiredCourses: string[];
  applicationDeadline: string;
  startDate: string;
  anonymizedPartner?: string; // Generic partner names
}

export interface SpecializationTrack {
  id: string;
  name: string;
  department: string;
  additionalCourses: string[];
  minGPA: number;
  careerOutcomes: string[];
  description: string;
}

export interface PostGradPathway {
  id: string;
  type: 'graduate' | 'exchange' | 'internship';
  title: string;
  description: string;
  eligibilityRequirements: string[];
  timeline: string;
  benefits: string[];
  anonymizedPartner?: string;
}

export interface EligibilityCheck {
  isEligible: boolean;
  missingRequirements: string[];
  admissionChance: 'High' | 'Medium' | 'Low';
  recommendations: string[];
}
