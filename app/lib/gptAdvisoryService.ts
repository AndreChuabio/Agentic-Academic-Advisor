import { Student, Course, Career, RiskAssessment, CourseRecommendation } from './types';
import { mockStudents, mockCourses, mockCareers } from './mockData';
import { AcademicAdvisorService } from './academicAdvisorService';

// University Context Constants
const UNIVERSITY_CONTEXT = {
  institutionName: "Metropolitan University",
  departments: ["Computer Science", "Statistics", "Business", "Education", "Mathematics", "Physics", "English", "Economics"],
  graduationRequirement: 120,
  minimumGPA: 2.0,
  maxCreditsPerSemester: 18,
  currentSemester: "Fall 2025"
};

// GPT-4 System Prompt
const ADVISOR_SYSTEM_PROMPT = `
You are Dr. Sarah Chen, a senior academic advisor at Metropolitan University with 15 years of experience.

INSTITUTIONAL CONTEXT:
- Work at Metropolitan University
- Students need 120 credits to graduate
- Minimum GPA requirement: 2.0
- Current semester: Fall 2025

AVAILABLE COURSES: ${mockCourses.map(c => c.code).join(', ')}
CAREER PATHS: ${mockCareers.map(c => c.title).join(', ')}

YOUR ROLE:
- Provide personalized academic guidance
- Reference specific course codes and prerequisites
- Give actionable advice based on university policies
- Maintain professional but approachable tone

STUDENT CONTEXT WILL BE PROVIDED with each request including:
- Current GPA and credits
- Completed courses
- Career goals
- Risk assessment results
- Graduate school interest
`;

export class GPTAdvisoryService {
  
  static async provideAcademicAdvice(studentId: string, question: string): Promise<string> {
    // Get student context
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Get risk assessment
    const riskAssessment = AcademicAdvisorService.assessGraduationRisk(studentId);
    
    // Get career recommendations if student has career goal
    let careerRecommendations: CourseRecommendation[] = [];
    if (student.careerGoal) {
      careerRecommendations = AcademicAdvisorService.getCareerRecommendations(student.careerGoal, studentId);
    }

    // Build comprehensive student context
    const studentContext = {
      name: student.name,
      currentCredits: student.currentCredits,
      totalCreditsNeeded: student.totalCreditsNeeded,
      currentGPA: student.currentGPA,
      semestersPassed: student.semestersPassed,
      expectedGraduation: student.expectedGraduation,
      completedCourses: student.completedCourses,
      careerGoal: student.careerGoal,
      interestedInGradSchool: student.interestedInGradSchool,
      riskAssessment: riskAssessment,
      careerRecommendations: careerRecommendations.slice(0, 3), // Top 3 recommendations
      remainingCredits: student.totalCreditsNeeded - student.currentCredits
    };

    // Construct the prompt
    const prompt = `${ADVISOR_SYSTEM_PROMPT}

CURRENT STUDENT CONTEXT:
Name: ${studentContext.name}
Credits: ${studentContext.currentCredits}/${studentContext.totalCreditsNeeded} (${studentContext.remainingCredits} remaining)
GPA: ${studentContext.currentGPA}
Semesters Passed: ${studentContext.semestersPassed}
Expected Graduation: ${studentContext.expectedGraduation}
Completed Courses: ${studentContext.completedCourses.join(', ')}
Career Goal: ${studentContext.careerGoal || 'Not specified'}
Graduate School Interest: ${studentContext.interestedInGradSchool ? 'Yes' : 'No'}

RISK ASSESSMENT:
Level: ${studentContext.riskAssessment.level}
Score: ${studentContext.riskAssessment.score}/100
Factors: ${studentContext.riskAssessment.factors.join(', ')}
Recommendations: ${studentContext.riskAssessment.recommendations.join(', ')}

CAREER RECOMMENDATIONS:
${studentContext.careerRecommendations.map(rec => `- ${rec.course.code} (${rec.course.title}) - ${rec.reason}`).join('\n')}

STUDENT QUESTION: ${question}

Please respond as Dr. Sarah Chen, providing specific, actionable advice that references our university policies and course catalog.`;

    try {
      // Azure OpenAI configuration
      const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://palo-sg-presales.openai.azure.com';
      const azureApiKey = process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_KEY;
      const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4-1106-preview';
      const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-01';
      
      if (!azureApiKey) {
        throw new Error('Azure OpenAI API key not found');
      }
      
      const response = await fetch(`${azureEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureApiKey
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: ADVISOR_SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('GPT Advisory Service Error:', error);
      
      // Fallback response if OpenAI API fails
      return `Hello ${student.name}! I'm Dr. Sarah Chen, your academic advisor at Metropolitan University. 
      
I'd be happy to help you with your question: "${question}"

Based on your current academic standing:
- You have ${studentContext.currentCredits} credits out of ${studentContext.totalCreditsNeeded} needed for graduation
- Your current GPA is ${studentContext.currentGPA}
- Risk assessment: ${studentContext.riskAssessment.level} level

${studentContext.riskAssessment.recommendations.length > 0 ? 
  `My immediate recommendations: ${studentContext.riskAssessment.recommendations.join(', ')}` : ''}

Please note: I'm currently experiencing technical difficulties with my AI system. For detailed guidance, please visit my office hours or contact me directly. In the meantime, I recommend checking our course catalog for prerequisite information and speaking with your department advisor.`;
    }
  }

  static createStudentProfileFromFreeForm(input: string): Partial<Student> {
    // Basic parsing logic for demo purposes
    // In a real system, this would use more sophisticated NLP
    const profile: Partial<Student> = {};
    
    // Extract potential career goals
    const careerKeywords = {
      'software': 'software-engineer',
      'data science': 'data-scientist',
      'data scientist': 'data-scientist',
      'business': 'business-analyst',
      'teach': 'teacher',
      'education': 'teacher'
    };
    
    const inputLower = input.toLowerCase();
    for (const [keyword, career] of Object.entries(careerKeywords)) {
      if (inputLower.includes(keyword)) {
        profile.careerGoal = career;
        break;
      }
    }
    
    // Extract graduation interest
    if (inputLower.includes('grad school') || inputLower.includes('graduate') || inputLower.includes('masters') || inputLower.includes('phd')) {
      profile.interestedInGradSchool = true;
    }
    
    return profile;
  }

  static getUniversityContext() {
    return UNIVERSITY_CONTEXT;
  }

  static getSuggestedQuestions(studentId: string): string[] {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) return [];

    const questions = [
      "What courses should I take next semester?",
      "Am I on track to graduate on time?",
      "What career opportunities are available with my major?",
      "How can I improve my GPA?",
      "What are the prerequisites for advanced courses in my field?"
    ];

    // Add personalized questions based on student context
    if (student.interestedInGradSchool) {
      questions.push("What should I do to prepare for graduate school?");
      questions.push("What GPA do I need for graduate programs?");
    }

    if (student.careerGoal) {
      const career = mockCareers.find(c => c.id === student.careerGoal);
      if (career) {
        questions.push(`What courses are most important for a ${career.title}?`);
      }
    }

    // Add risk-specific questions
    const riskAssessment = AcademicAdvisorService.assessGraduationRisk(studentId);
    if (riskAssessment.level === 'Red') {
      questions.push("What can I do to get back on track for graduation?");
    } else if (riskAssessment.level === 'Yellow') {
      questions.push("How can I improve my graduation timeline?");
    }

    return questions.slice(0, 6); // Return top 6 questions
  }
}
