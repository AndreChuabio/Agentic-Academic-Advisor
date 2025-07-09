import { NextRequest, NextResponse } from 'next/server';
import { AcademicAdvisorService } from '../../lib/academicAdvisorService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const careerId = searchParams.get('careerId');
    const studentId = searchParams.get('studentId');

    if (!careerId) {
      return NextResponse.json({ error: 'Career ID is required' }, { status: 400 });
    }

    const recommendations = AcademicAdvisorService.getCareerRecommendations(careerId, studentId || undefined);
    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
