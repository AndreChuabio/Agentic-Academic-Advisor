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
    
    // Add graduate preparation courses if student is interested in grad school
    if (studentId) {
      const student = require('../../lib/mockData').mockStudents.find((s: any) => s.id === studentId);
      if (student && student.interestedInGradSchool) {
        // Add graduate prep courses based on career
        const gradPrepCourses = recommendations.filter(rec => 
          rec.course.code.includes('301') || rec.course.code.includes('401')
        );
        
        gradPrepCourses.forEach(rec => {
          rec.reason += ' (Recommended for graduate school preparation)';
          if (rec.priority === 'Medium') rec.priority = 'High';
        });
      }
    }
    
    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
