import { Student, Course, Career, RiskAssessment, CourseRecommendation, ProgressTracking } from './types';
import { mockStudents, mockCourses, mockCareers } from './mockData';

export class AcademicAdvisorService {
  
  // Feature 1: Graduation Risk Assessment
  static assessGraduationRisk(studentId: string): RiskAssessment {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const creditProgress = student.currentCredits / student.totalCreditsNeeded;
    const expectedProgress = student.semestersPassed / 8; // Assuming 8 semesters to graduate
    const gpaFactor = student.currentGPA / 4.0;
    
    // Calculate risk score (0-100, lower is better)
    let riskScore = 0;
    const factors: string[] = [];
    const recommendations: string[] = [];

    // Credit progress assessment
    if (creditProgress < expectedProgress - 0.1) {
      riskScore += 40;
      factors.push('Behind on credit requirements');
      recommendations.push('Consider taking additional courses or summer classes');
    } else if (creditProgress < expectedProgress) {
      riskScore += 20;
      factors.push('Slightly behind on credits');
      recommendations.push('Monitor course load and consider accelerated options');
    }

    // GPA assessment
    if (student.currentGPA < 2.0) {
      riskScore += 50;
      factors.push('GPA below graduation minimum');
      recommendations.push('Seek tutoring and academic support services immediately');
    } else if (student.currentGPA < 2.5) {
      riskScore += 30;
      factors.push('Low GPA may affect graduation');
      recommendations.push('Focus on improving study habits and seek academic support');
    } else if (student.currentGPA < 3.0) {
      riskScore += 10;
      factors.push('GPA could be improved');
      recommendations.push('Consider study groups and office hours');
    }

    // Semester progress assessment
    if (student.semestersPassed > 6 && creditProgress < 0.6) {
      riskScore += 30;
      factors.push('Extended time without proportional progress');
      recommendations.push('Meet with academic advisor to create catch-up plan');
    }

    // Determine risk level
    let level: 'Green' | 'Yellow' | 'Red';
    if (riskScore >= 60) {
      level = 'Red';
      recommendations.push('Schedule immediate meeting with academic advisor');
    } else if (riskScore >= 25) {
      level = 'Yellow';
      recommendations.push('Regular check-ins with academic advisor recommended');
    } else {
      level = 'Green';
      recommendations.push('Continue current pace and maintain good performance');
    }

    if (factors.length === 0) {
      factors.push('On track for timely graduation');
    }

    return {
      level,
      score: Math.max(0, 100 - riskScore),
      factors,
      recommendations
    };
  }

  // Feature 2: Career-Based Course Recommendations
  static getCareerRecommendations(careerId: string, studentId?: string): CourseRecommendation[] {
    const career = mockCareers.find(c => c.id === careerId);
    if (!career) {
      throw new Error('Career not found');
    }

    let completedCourses: string[] = [];
    if (studentId) {
      const student = mockStudents.find(s => s.id === studentId);
      completedCourses = student?.completedCourses || [];
    }

    const recommendations: CourseRecommendation[] = [];

    // Add required courses not yet completed
    career.requiredCourses.forEach(courseId => {
      if (!completedCourses.includes(courseId)) {
        const course = mockCourses.find(c => c.id === courseId);
        if (course) {
          recommendations.push({
            course,
            reason: `Required for ${career.title} career path`,
            priority: 'High'
          });
        }
      }
    });

    // Add recommended courses not yet completed
    career.recommendedCourses.forEach(courseId => {
      if (!completedCourses.includes(courseId)) {
        const course = mockCourses.find(c => c.id === courseId);
        if (course) {
          recommendations.push({
            course,
            reason: `Recommended to enhance ${career.title} skills`,
            priority: 'Medium'
          });
        }
      }
    });

    // Sort by priority and prerequisites
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Prioritize courses with fewer prerequisites
      return a.course.prerequisites.length - b.course.prerequisites.length;
    });
  }

  // Feature 3: Prerequisite Visualization
  static getCoursePrerequisites(courseId: string): { course: Course; prerequisites: Course[] } {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const prerequisites = course.prerequisites.map(prereqId => {
      const prereq = mockCourses.find(c => c.id === prereqId);
      if (!prereq) {
        throw new Error(`Prerequisite course ${prereqId} not found`);
      }
      return prereq;
    });

    return { course, prerequisites };
  }

  // Feature 4: Career Progress Tracking
  static trackCareerProgress(studentId: string, careerId: string): ProgressTracking {
    const student = mockStudents.find(s => s.id === studentId);
    const career = mockCareers.find(c => c.id === careerId);
    
    if (!student) throw new Error('Student not found');
    if (!career) throw new Error('Career not found');

    const totalRequiredCourses = career.requiredCourses.length;
    const completedRequired = career.requiredCourses.filter(courseId => 
      student.completedCourses.includes(courseId)
    );
    
    const completionPercentage = Math.round((completedRequired.length / totalRequiredCourses) * 100);
    
    const remainingCourses = career.requiredCourses.filter(courseId => 
      !student.completedCourses.includes(courseId)
    );

    // Find next recommended course (one with fewest unmet prerequisites)
    let nextRecommendedCourse = '';
    let minPrereqsNeeded = Infinity;
    
    remainingCourses.forEach(courseId => {
      const course = mockCourses.find(c => c.id === courseId);
      if (course) {
        const unmetPrereqs = course.prerequisites.filter(prereq => 
          !student.completedCourses.includes(prereq)
        ).length;
        
        if (unmetPrereqs < minPrereqsNeeded) {
          minPrereqsNeeded = unmetPrereqs;
          nextRecommendedCourse = course.code;
        }
      }
    });

    const estimatedCompletionSemesters = Math.ceil(remainingCourses.length / 4); // Assuming 4 courses per semester

    return {
      careerTitle: career.title,
      completionPercentage,
      completedRequirements: completedRequired.map(courseId => {
        const course = mockCourses.find(c => c.id === courseId);
        return course ? course.code : courseId;
      }),
      remainingRequirements: remainingCourses.map(courseId => {
        const course = mockCourses.find(c => c.id === courseId);
        return course ? course.code : courseId;
      }),
      nextRecommendedCourse,
      estimatedCompletionSemesters
    };
  }

  // Feature 5: Graduate Pathway Recommendations
  static getGraduatePathwayRecommendations(studentId: string): {
    graduatePrograms: any[];
    specializations: any[];
    postGradPathways: any[];
    overallRecommendation: string;
  } {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Import services dynamically to avoid circular dependencies
    const { GraduateProgramService } = require('./graduateProgramService');
    const { SpecializationService } = require('./specializationService');
    const { mockPostGradPathways } = require('./mockData');

    const graduatePrograms = GraduateProgramService.getRecommendedPrograms(studentId);
    const specializations = SpecializationService.getRecommendedSpecializations(studentId);
    
    // Filter relevant post-grad pathways
    const postGradPathways = mockPostGradPathways.filter((pathway: any) => {
      if (student.interestedInGradSchool && pathway.type === 'graduate') return true;
      if (student.currentGPA >= 3.2 && pathway.type === 'exchange') return true;
      if (pathway.type === 'internship') return true;
      return false;
    });

    // Generate overall recommendation
    let overallRecommendation = '';
    if (student.currentGPA >= 3.5) {
      overallRecommendation = 'Excellent academic performance - consider graduate school and research opportunities';
    } else if (student.currentGPA >= 3.0) {
      overallRecommendation = 'Good academic standing - explore specializations and graduate preparation';
    } else if (student.currentGPA >= 2.5) {
      overallRecommendation = 'Focus on improving GPA while exploring practical pathways and internships';
    } else {
      overallRecommendation = 'Prioritize academic improvement and consider alternative pathways';
    }

    return {
      graduatePrograms,
      specializations,
      postGradPathways,
      overallRecommendation
    };
  }

  // Helper methods
  static getAllStudents(): Student[] {
    return mockStudents;
  }

  static getAllCourses(): Course[] {
    return mockCourses;
  }

  static getAllCareers(): Career[] {
    return mockCareers;
  }

  static getStudentById(id: string): Student | undefined {
    return mockStudents.find(s => s.id === id);
  }

  static getCourseById(id: string): Course | undefined {
    return mockCourses.find(c => c.id === id);
  }

  static getCareerById(id: string): Career | undefined {
    return mockCareers.find(c => c.id === id);
  }
}
