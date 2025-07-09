import { NextRequest, NextResponse } from 'next/server';
import { SpecializationService } from '../../lib/specializationService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const major = searchParams.get('major');

    if (!studentId && !major) {
      // Return all specializations if no parameters specified
      const allSpecializations = SpecializationService.getAllSpecializations();
      return NextResponse.json(allSpecializations);
    }

    let specializations;
    
    if (studentId) {
      // Get recommended specializations for specific student
      specializations = SpecializationService.getRecommendedSpecializations(studentId);
      
      // Add progress information for each specialization
      const specializationsWithProgress = specializations.map(spec => {
        const student = require('../../lib/mockData').mockStudents.find((s: any) => s.id === studentId);
        if (student) {
          const progress = SpecializationService.getSpecializationProgress(student, spec.id);
          const isEligible = SpecializationService.checkSpecializationEligibility(student, spec);
          return {
            ...spec,
            progress,
            isEligible
          };
        }
        return spec;
      });
      
      return NextResponse.json(specializationsWithProgress);
    } else if (major) {
      // Get specializations by major
      specializations = SpecializationService.getAvailableSpecializations(major);
      return NextResponse.json(specializations);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Error in specializations API:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
