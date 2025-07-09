import { NextRequest, NextResponse } from 'next/server';
import { AcademicAdvisorService } from '../../lib/academicAdvisorService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const careerId = searchParams.get('careerId');

    if (!studentId || !careerId) {
      return NextResponse.json({ error: 'Student ID and Career ID are required' }, { status: 400 });
    }

    const progress = AcademicAdvisorService.trackCareerProgress(studentId, careerId);
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
