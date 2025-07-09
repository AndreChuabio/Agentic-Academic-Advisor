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
