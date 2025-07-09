import { Student, SpecializationTrack } from './types';
import { mockStudents, mockSpecializationTracks } from './mockData';

export class SpecializationService {

  static getAvailableSpecializations(studentMajor: string): SpecializationTrack[] {
    // Map student majors to relevant specializations
    const majorSpecializationMap: { [key: string]: string[] } = {
      'Computer Science': ['AI and Robotics', 'Cybersecurity', 'Software Engineering'],
      'Statistics': ['Data Analytics'],
      'Business': ['Business Analytics'],
      'Education': ['Education Leadership'],
      'Engineering': ['Software Engineering']
    };

    // For demo purposes, we'll infer major from career goal or courses
    const relevantSpecializations = majorSpecializationMap[studentMajor] || [];
    
    return mockSpecializationTracks.filter(track => 
      relevantSpecializations.includes(track.name)
    );
  }

  static getAvailableSpecializationsByStudent(studentId: string): SpecializationTrack[] {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      return [];
    }

    // Infer student's major from completed courses and career goal
    let inferredMajor = '';
    
    if (student.completedCourses.some(course => course.startsWith('CS'))) {
      inferredMajor = 'Computer Science';
    } else if (student.completedCourses.some(course => course.startsWith('STAT'))) {
      inferredMajor = 'Statistics';
    } else if (student.completedCourses.some(course => course.startsWith('BUS'))) {
      inferredMajor = 'Business';
    } else if (student.completedCourses.some(course => course.startsWith('EDU'))) {
      inferredMajor = 'Education';
    }

    return this.getAvailableSpecializations(inferredMajor);
  }

  static checkSpecializationEligibility(student: Student, track: SpecializationTrack): boolean {
    // Check GPA requirement
    if (student.currentGPA < track.minGPA) {
      return false;
    }

    // Check if student has prerequisite foundation
    const hasFoundation = track.additionalCourses.some(courseId => {
      // Check if student has related foundation courses
      const coursePrefix = courseId.substring(0, courseId.length - 3);
      return student.completedCourses.some(completed => completed.startsWith(coursePrefix));
    });

    return hasFoundation;
  }

  static getSpecializationProgress(student: Student, trackId: string): number {
    const track = mockSpecializationTracks.find(t => t.id === trackId);
    if (!track) {
      return 0;
    }

    const completedAdditionalCourses = track.additionalCourses.filter(courseId => 
      student.completedCourses.includes(courseId)
    );

    return Math.round((completedAdditionalCourses.length / track.additionalCourses.length) * 100);
  }

  static getRecommendedSpecializations(studentId: string): SpecializationTrack[] {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      return [];
    }

    const availableSpecializations = this.getAvailableSpecializationsByStudent(studentId);
    
    return availableSpecializations.filter(track => 
      this.checkSpecializationEligibility(student, track)
    ).sort((a, b) => {
      // Sort by GPA compatibility (closer to student's GPA = better fit)
      const gpaFitA = Math.abs(student.currentGPA - a.minGPA);
      const gpaFitB = Math.abs(student.currentGPA - b.minGPA);
      return gpaFitA - gpaFitB;
    });
  }

  static getSpecializationsByDepartment(department: string): SpecializationTrack[] {
    return mockSpecializationTracks.filter(track => track.department === department);
  }

  static getAllSpecializations(): SpecializationTrack[] {
    return mockSpecializationTracks;
  }

  static getSpecializationById(trackId: string): SpecializationTrack | undefined {
    return mockSpecializationTracks.find(t => t.id === trackId);
  }

  static getCareerOutcomesForStudent(studentId: string): string[] {
    const recommendedSpecs = this.getRecommendedSpecializations(studentId);
    const allOutcomes: string[] = [];
    
    recommendedSpecs.forEach(spec => {
      allOutcomes.push(...spec.careerOutcomes);
    });

    // Remove duplicates and return
    return [...new Set(allOutcomes)];
  }
}
