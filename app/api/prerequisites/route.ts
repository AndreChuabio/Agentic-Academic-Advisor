import { NextRequest, NextResponse } from 'next/server';
import { AcademicAdvisorService } from '../../lib/academicAdvisorService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const prerequisites = AcademicAdvisorService.getCoursePrerequisites(courseId);
    return NextResponse.json(prerequisites);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
