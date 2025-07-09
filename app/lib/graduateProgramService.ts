import { Student, GraduateProgram, EligibilityCheck } from './types';
import { mockStudents, mockGraduatePrograms } from './mockData';

export class GraduateProgramService {
  
  static checkEligibility(student: Student, program: GraduateProgram): EligibilityCheck {
    const missingRequirements: string[] = [];
    let admissionChance: 'High' | 'Medium' | 'Low' = 'High';
    const recommendations: string[] = [];

    // Check GPA requirement
    if (student.currentGPA < program.minGPA) {
      missingRequirements.push(`GPA requirement: ${program.minGPA} (current: ${student.currentGPA})`);
      admissionChance = 'Low';
      recommendations.push('Focus on improving GPA through remaining coursework');
    }

    // Check course requirements
    const missingCourses = program.requiredCourses.filter(
      courseId => !student.completedCourses.includes(courseId)
    );
    
    if (missingCourses.length > 0) {
      missingRequirements.push(`Missing courses: ${missingCourses.join(', ')}`);
      if (missingCourses.length > 2) {
        admissionChance = admissionChance === 'Low' ? 'Low' : 'Medium';
      }
      recommendations.push('Complete remaining prerequisite courses');
    }

    // Calculate admission chance based on GPA and requirements
    if (student.currentGPA >= program.minGPA + 0.3 && missingCourses.length === 0) {
      admissionChance = 'High';
      recommendations.push('Strong candidate - consider applying early');
    } else if (student.currentGPA >= program.minGPA && missingCourses.length <= 1) {
      admissionChance = admissionChance === 'Low' ? 'Medium' : 'High';
      recommendations.push('Good candidate - ensure strong application materials');
    }

    const isEligible = missingRequirements.length === 0;

    return {
      isEligible,
      missingRequirements,
      admissionChance,
      recommendations
    };
  }

  static calculateAdmissionChance(student: Student, program: GraduateProgram): string {
    const eligibility = this.checkEligibility(student, program);
    return eligibility.admissionChance;
  }

  static getRecommendedPrograms(studentId: string): GraduateProgram[] {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student || !student.interestedInGradSchool) {
      return [];
    }

    // Filter programs based on student's interests and performance
    return mockGraduatePrograms.filter(program => {
      const eligibility = this.checkEligibility(student, program);
      
      // Include programs where student is eligible or close to eligible
      return eligibility.isEligible || 
             (student.currentGPA >= program.minGPA - 0.2 && eligibility.missingRequirements.length <= 2);
    }).sort((a, b) => {
      // Sort by admission chance (High > Medium > Low)
      const chanceA = this.calculateAdmissionChance(student, a);
      const chanceB = this.calculateAdmissionChance(student, b);
      
      if (chanceA === chanceB) return 0;
      if (chanceA === 'High') return -1;
      if (chanceB === 'High') return 1;
      if (chanceA === 'Medium') return -1;
      return 1;
    });
  }

  static getApplicationTimeline(program: GraduateProgram): string[] {
    const timeline: string[] = [];
    
    // Generate timeline based on application deadline
    const deadline = new Date(program.applicationDeadline + ', 2025');
    const now = new Date();
    const monthsUntilDeadline = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    
    if (monthsUntilDeadline > 6) {
      timeline.push('6+ months before: Research programs and requirements');
      timeline.push('4-6 months before: Prepare for standardized tests (if required)');
      timeline.push('3-4 months before: Request transcripts and letters of recommendation');
      timeline.push('2-3 months before: Write personal statement and complete application');
      timeline.push('1 month before: Submit application and all supporting materials');
    } else if (monthsUntilDeadline > 3) {
      timeline.push('Now: Request transcripts and letters of recommendation');
      timeline.push('Next month: Write personal statement and complete application');
      timeline.push('2 months: Submit application and all supporting materials');
    } else if (monthsUntilDeadline > 0) {
      timeline.push('Immediate: Complete application and gather all materials');
      timeline.push('This month: Submit application before deadline');
    } else {
      timeline.push('Application deadline has passed - consider next cycle');
    }
    
    return timeline;
  }

  static getAllPrograms(): GraduateProgram[] {
    return mockGraduatePrograms;
  }

  static getProgramById(programId: string): GraduateProgram | undefined {
    return mockGraduatePrograms.find(p => p.id === programId);
  }
}
