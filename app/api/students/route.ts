import { NextResponse } from 'next/server';
import { AcademicAdvisorService } from '../../lib/academicAdvisorService';

export async function GET() {
  try {
    const students = AcademicAdvisorService.getAllStudents();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
