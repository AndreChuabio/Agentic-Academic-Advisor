import { NextRequest, NextResponse } from 'next/server';
import { AcademicAdvisorService } from '../../lib/academicAdvisorService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const riskAssessment = AcademicAdvisorService.assessGraduationRisk(studentId);
    return NextResponse.json(riskAssessment);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
