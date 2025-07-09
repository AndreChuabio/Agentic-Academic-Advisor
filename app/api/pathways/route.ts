import { NextRequest, NextResponse } from 'next/server';
import { mockPostGradPathways } from '../../lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const type = searchParams.get('type');

    let filteredPathways = mockPostGradPathways;

    // Filter by type if specified
    if (type) {
      filteredPathways = filteredPathways.filter(pathway => pathway.type === type);
    }

    // Filter by student eligibility if student ID specified
    if (studentId) {
      const student = require('../../lib/mockData').mockStudents.find((s: any) => s.id === studentId);
      
      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' }, 
          { status: 404 }
        );
      }

      // Filter pathways based on student's profile and interests
      filteredPathways = filteredPathways.filter(pathway => {
        // Graduate pathways - for students interested in grad school
        if (pathway.type === 'graduate') {
          return student.interestedInGradSchool === true;
        }
        
        // Exchange programs - for students with good academic standing
        if (pathway.type === 'exchange') {
          return student.currentGPA >= 3.0;
        }
        
        // Internships - available for all students
        if (pathway.type === 'internship') {
          return true;
        }
        
        return true;
      });

      // Add eligibility details for each pathway
      const pathwaysWithEligibility = filteredPathways.map(pathway => {
        const isEligible = pathway.eligibilityRequirements.every(req => {
          if (req.includes('GPA')) {
            const gpaMatch = req.match(/(\d+\.\d+)/);
            if (gpaMatch) {
              const requiredGPA = parseFloat(gpaMatch[1]);
              return student.currentGPA >= requiredGPA;
            }
          }
          return true; // Assume other requirements are met for demo
        });

        const eligibilityStatus = {
          isEligible,
          gpaRequirement: student.currentGPA,
          completedCourses: student.completedCourses.length,
          recommendation: isEligible ? 
            'You meet the requirements for this pathway' : 
            'Work on improving GPA and completing prerequisite courses'
        };

        return {
          ...pathway,
          eligibilityStatus
        };
      });

      return NextResponse.json(pathwaysWithEligibility);
    }

    // Return all pathways if no student specified
    return NextResponse.json(filteredPathways);
  } catch (error) {
    console.error('Error in pathways API:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
