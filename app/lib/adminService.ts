import { Student, Course, GraduateProgram } from './types';
import { mockStudents, mockCourses, mockGraduatePrograms } from './mockData';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AdminService {
  private static students: Student[] = [...mockStudents];
  private static courses: Course[] = [...mockCourses];
  private static graduatePrograms: GraduateProgram[] = [...mockGraduatePrograms];

  static getStudents(): Student[] {
    return [...this.students];
  }

  static addStudent(studentData: Omit<Student, 'id'>): Student {
    const newStudent: Student = {
      ...studentData,
      id: `STU${(this.students.length + 1).toString().padStart(3, '0')}`
    };
    
    this.students.push(newStudent);
    return newStudent;
  }

  static updateStudent(id: string, updates: Partial<Student>): Student | null {
    const index = this.students.findIndex(student => student.id === id);
    if (index === -1) return null;

    this.students[index] = { ...this.students[index], ...updates };
    return this.students[index];
  }

  static deleteStudent(id: string): boolean {
    const index = this.students.findIndex(student => student.id === id);
    if (index === -1) return false;

    this.students.splice(index, 1);
    return true;
  }

  static validateStudent(student: Partial<Student>): ValidationResult {
    const errors: string[] = [];

    if (!student.name || student.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!student.email || !this.isValidEmail(student.email)) {
      errors.push('Valid email address is required');
    }

    if (student.currentCredits !== undefined && (student.currentCredits < 0 || student.currentCredits > 200)) {
      errors.push('Current credits must be between 0 and 200');
    }

    if (student.totalCreditsNeeded !== undefined && (student.totalCreditsNeeded < 60 || student.totalCreditsNeeded > 200)) {
      errors.push('Total credits needed must be between 60 and 200');
    }

    if (student.currentGPA !== undefined && (student.currentGPA < 0 || student.currentGPA > 4.0)) {
      errors.push('GPA must be between 0.0 and 4.0');
    }

    if (student.semestersPassed !== undefined && (student.semestersPassed < 0 || student.semestersPassed > 20)) {
      errors.push('Semesters passed must be between 0 and 20');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static exportStudents(format: 'json' | 'csv'): string {
    if (format === 'json') {
      return JSON.stringify(this.students, null, 2);
    } else {
      // CSV export
      const headers = ['ID', 'Name', 'Email', 'Current Credits', 'Total Credits', 'GPA', 'Semesters', 'Expected Graduation'];
      const rows = this.students.map(student => [
        student.id,
        student.name,
        student.email,
        student.currentCredits.toString(),
        student.totalCreditsNeeded.toString(),
        student.currentGPA.toString(),
        student.semestersPassed.toString(),
        student.expectedGraduation
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  }

  static importStudents(data: string, format: 'json' | 'csv'): Student[] {
    try {
      if (format === 'json') {
        const importedStudents = JSON.parse(data) as Student[];
        // Validate each student
        for (const student of importedStudents) {
          const validation = this.validateStudent(student);
          if (!validation.isValid) {
            throw new Error(`Invalid student data for ${student.name}: ${validation.errors.join(', ')}`);
          }
        }
        this.students = importedStudents;
        return this.students;
      } else {
        // CSV import (basic implementation)
        const lines = data.trim().split('\n');
        if (lines.length < 2) throw new Error('CSV must have headers and at least one data row');
        
        const headers = lines[0].split(',');
        const students: Student[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length !== headers.length) continue;
          
          const student: Student = {
            id: values[0],
            name: values[1],
            email: values[2],
            currentCredits: parseInt(values[3]) || 0,
            totalCreditsNeeded: parseInt(values[4]) || 120,
            currentGPA: parseFloat(values[5]) || 0,
            semestersPassed: parseInt(values[6]) || 0,
            expectedGraduation: values[7] || '',
            completedCourses: [],
            careerGoal: '',
            specializations: [],
            postGradInterest: [],
            interestedInGradSchool: false
          };
          
          const validation = this.validateStudent(student);
          if (validation.isValid) {
            students.push(student);
          }
        }
        
        this.students = students;
        return this.students;
      }
    } catch (error) {
      throw new Error(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static resetToMockData(): void {
    this.students = [...mockStudents];
  }

  // Course Management Methods (POC Level)
  static getAllCourses(): Course[] {
    return [...this.courses];
  }

  static createCourse(course: Course): Course {
    const newCourse: Course = {
      ...course,
      id: `CS${(this.courses.length + 1).toString().padStart(3, '0')}`
    };
    
    this.courses.push(newCourse);
    return newCourse;
  }

  static updateCourse(id: string, updates: Partial<Course>): Course | null {
    const index = this.courses.findIndex(course => course.id === id);
    if (index === -1) return null;

    this.courses[index] = { ...this.courses[index], ...updates };
    return this.courses[index];
  }

  static deleteCourse(id: string): boolean {
    const index = this.courses.findIndex(course => course.id === id);
    if (index === -1) return false;

    this.courses.splice(index, 1);
    return true;
  }

  static exportCourses(): string {
    // Simple CSV export for POC
    const headers = ['ID', 'Code', 'Title', 'Credits', 'Department', 'Prerequisites', 'Description', 'Difficulty'];
    const rows = this.courses.map(course => [
      course.id,
      course.code,
      course.title,
      course.credits.toString(),
      course.department,
      course.prerequisites.join(';'),
      course.description,
      course.difficulty
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // Graduate Program Management Methods (POC Level)
  static getAllGraduatePrograms(): GraduateProgram[] {
    return [...this.graduatePrograms];
  }

  static createGraduateProgram(program: GraduateProgram): GraduateProgram {
    const newProgram: GraduateProgram = {
      ...program,
      id: `GRAD${(this.graduatePrograms.length + 1).toString().padStart(3, '0')}`
    };
    
    this.graduatePrograms.push(newProgram);
    return newProgram;
  }

  static updateGraduateProgram(id: string, updates: Partial<GraduateProgram>): GraduateProgram | null {
    const index = this.graduatePrograms.findIndex(program => program.id === id);
    if (index === -1) return null;

    this.graduatePrograms[index] = { ...this.graduatePrograms[index], ...updates };
    return this.graduatePrograms[index];
  }

  static deleteGraduateProgram(id: string): boolean {
    const index = this.graduatePrograms.findIndex(program => program.id === id);
    if (index === -1) return false;

    this.graduatePrograms.splice(index, 1);
    return true;
  }

  static exportGraduatePrograms(): string {
    // Simple CSV export for POC
    const headers = ['ID', 'Title', 'Degree', 'Department', 'Description', 'Duration', 'Min GPA', 'Required Courses', 'Application Deadline', 'Start Date'];
    const rows = this.graduatePrograms.map(program => [
      program.id,
      program.title,
      program.degree,
      program.department,
      program.description,
      program.duration,
      program.minGPA.toString(),
      program.requiredCourses.join(';'),
      program.applicationDeadline,
      program.startDate
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // Basic Validation Utilities (POC Level)
  static validateCourseData(course: Course): ValidationResult {
    const errors: string[] = [];

    if (!course.code || course.code.trim().length < 2) {
      errors.push('Course code must be at least 2 characters long');
    }

    if (!course.title || course.title.trim().length < 3) {
      errors.push('Course title must be at least 3 characters long');
    }

    if (!course.credits || course.credits < 1 || course.credits > 6) {
      errors.push('Course credits must be between 1 and 6');
    }

    if (!course.department || course.department.trim().length < 2) {
      errors.push('Department must be specified');
    }

    if (!['Easy', 'Medium', 'Hard'].includes(course.difficulty)) {
      errors.push('Difficulty must be Easy, Medium, or Hard');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateGraduateProgramData(program: GraduateProgram): ValidationResult {
    const errors: string[] = [];

    if (!program.title || program.title.trim().length < 3) {
      errors.push('Program title must be at least 3 characters long');
    }

    if (!['MS', 'PhD'].includes(program.degree)) {
      errors.push('Degree must be MS or PhD');
    }

    if (!program.department || program.department.trim().length < 2) {
      errors.push('Department must be specified');
    }

    if (!program.minGPA || program.minGPA < 2.0 || program.minGPA > 4.0) {
      errors.push('Minimum GPA must be between 2.0 and 4.0');
    }

    if (!program.duration || program.duration.trim().length < 3) {
      errors.push('Duration must be specified');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Reset Methods for POC Testing
  static resetCoursesToMockData(): void {
    this.courses = [...mockCourses];
  }

  static resetGraduateProgramsToMockData(): void {
    this.graduatePrograms = [...mockGraduatePrograms];
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
