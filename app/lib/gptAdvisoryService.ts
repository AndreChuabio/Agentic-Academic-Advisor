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

// Improved GPT-4 System Prompt
const ADVISOR_SYSTEM_PROMPT = `
You are Dr. Sarah Chen, a senior academic advisor at Metropolitan University with 15 years of experience. You're having an ongoing conversation with a student.

PERSONALITY & STYLE:
- Warm, supportive, but direct and practical
- Use the student's name naturally, not at the start of every response
- Avoid repetitive greetings unless it's the first interaction
- Keep responses conversational and concise (3-4 paragraphs MAXIMUM)
- Be encouraging but realistic about challenges
- Reference specific courses and university policies

INSTITUTIONAL CONTEXT:
- Metropolitan University, Fall 2025 semester
- 120 credits needed to graduate, minimum 2.0 GPA
- Available courses: ${mockCourses.map(c => c.code).join(', ')}
- Career paths: ${mockCareers.map(c => c.title).join(', ')}

CONVERSATION GUIDELINES:
- If it's a continuation, jump straight into addressing their question
- Reference previous context when relevant
- Give actionable, specific advice with course codes
- Be concise but thorough
- Show empathy for student struggles
- End with a forward-looking suggestion or question
`;

export class GPTAdvisoryService {
  
  static async provideAcademicAdvice(
    studentId: string, 
    question: string, 
    conversationHistory: Array<{ role: 'student' | 'advisor'; content: string }> = []
  ): Promise<string> {
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

    // Build student context
    const studentContext = {
      name: student.name,
      currentCredits: student.currentCredits,
      totalCreditsNeeded: student.totalCreditsNeeded,
      currentGPA: student.currentGPA,
      completedCourses: student.completedCourses,
      careerGoal: student.careerGoal,
      interestedInGradSchool: student.interestedInGradSchool,
      riskLevel: riskAssessment.level,
      riskFactors: riskAssessment.factors,
      remainingCredits: student.totalCreditsNeeded - student.currentCredits,
      expectedGraduation: student.expectedGraduation
    };

    // Determine if this is the first message
    const isFirstMessage = conversationHistory.length === 0;
    
    // Build conversation context
    const conversationContext = conversationHistory.length > 0 
      ? `\nCONVERSATION HISTORY:\n${conversationHistory.map(msg => 
          `${msg.role.toUpperCase()}: ${msg.content}`
        ).join('\n')}\n`
      : '';

    // Construct the prompt
    const prompt = `${ADVISOR_SYSTEM_PROMPT}

STUDENT: ${studentContext.name}
- ${studentContext.currentCredits}/${studentContext.totalCreditsNeeded} credits (${studentContext.remainingCredits} remaining)
- GPA: ${studentContext.currentGPA}
- Expected graduation: ${studentContext.expectedGraduation}
- Career goal: ${studentContext.careerGoal || 'Not specified'}
- Graduate school interest: ${studentContext.interestedInGradSchool ? 'Yes' : 'No'}
- Risk level: ${studentContext.riskLevel}
- Completed: ${studentContext.completedCourses.join(', ')}

${conversationContext}

CURRENT QUESTION: ${question}

${isFirstMessage ? 
  'This is your first interaction with this student. Introduce yourself warmly and address their question.' : 
  'Continue the conversation naturally. No need for greetings - jump straight into helping with their question.'
}

Respond as Dr. Sarah Chen:`;

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
          max_tokens: 800,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('GPT Advisory Service Error:', error);
      
      // Improved fallback response
      return isFirstMessage 
        ? `Hello ${student.name}! I'm Dr. Sarah Chen, your academic advisor at Metropolitan University. I'd be happy to help you with your question: "${question}"

I can see you have ${studentContext.currentCredits} credits completed with a ${studentContext.currentGPA} GPA. ${studentContext.riskLevel === 'Red' ? 'I notice some concerns with your current trajectory, but we can definitely work together to get you back on track.' : studentContext.riskLevel === 'Yellow' ? 'You\'re making progress, and with some adjustments we can optimize your path to graduation.' : 'You\'re doing well academically!'}

I'm experiencing some technical difficulties right now, but I encourage you to visit during my office hours so we can discuss your academic plan in detail.`
        : `I understand your concern about "${question}". Based on your current standing (${studentContext.currentCredits} credits, ${studentContext.currentGPA} GPA), there are definitely steps we can take to address this.

I'm having some technical issues at the moment, but please don't hesitate to stop by my office so we can create a concrete action plan together.`;
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
