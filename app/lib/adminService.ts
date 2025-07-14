import { Student } from './types';
import { mockStudents } from './mockData';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AdminService {
  private static students: Student[] = [...mockStudents];

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

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
