import { NextRequest, NextResponse } from 'next/server';
import { GraduateProgramService } from '../../lib/graduateProgramService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      // Return all graduate programs if no student specified
      const allPrograms = GraduateProgramService.getAllPrograms();
      return NextResponse.json(allPrograms);
    }

    // Get recommended programs for specific student
    const recommendedPrograms = GraduateProgramService.getRecommendedPrograms(studentId);
    
    if (recommendedPrograms.length === 0) {
      return NextResponse.json(
        { error: 'No graduate programs found for student or student not interested in graduate school' }, 
        { status: 404 }
      );
    }

    // Add eligibility information for each program
    const programsWithEligibility = recommendedPrograms.map(program => {
      const student = require('../../lib/mockData').mockStudents.find((s: any) => s.id === studentId);
      if (student) {
        const eligibility = GraduateProgramService.checkEligibility(student, program);
        const timeline = GraduateProgramService.getApplicationTimeline(program);
        return {
          ...program,
          eligibility,
          timeline
        };
      }
      return program;
    });

    return NextResponse.json(programsWithEligibility);
  } catch (error) {
    console.error('Error in graduate programs API:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
