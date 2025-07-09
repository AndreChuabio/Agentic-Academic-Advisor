import { NextRequest, NextResponse } from 'next/server';
import { GPTAdvisoryService } from '../../lib/gptAdvisoryService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, question } = body;

    // Validate required fields
    if (!studentId || !question) {
      return NextResponse.json(
        { error: 'Missing required fields: studentId and question' },
        { status: 400 }
      );
    }

    // Check if Azure OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_KEY) {
      return NextResponse.json(
        { 
          error: 'AI advisor temporarily unavailable',
          message: 'Azure OpenAI API key not configured. Please contact system administrator.'
        },
        { status: 503 }
      );
    }

    // Get AI advice
    const advice = await GPTAdvisoryService.provideAcademicAdvice(studentId, question);
    const suggestedQuestions = GPTAdvisoryService.getSuggestedQuestions(studentId);

    return NextResponse.json({
      advice,
      suggestedQuestions,
      timestamp: new Date().toISOString(),
      advisor: 'Dr. Sarah Chen',
      university: 'Metropolitan University'
    });

  } catch (error) {
    console.error('GPT Advisor API Error:', error);
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message === 'Student not found') {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An error occurred while processing your request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return service information for debugging/health check
  return NextResponse.json({
    service: 'GPT Academic Advisor',
    version: '1.0.0',
    status: 'active',
    advisor: 'Dr. Sarah Chen',
    university: 'Metropolitan University',
    methods: ['POST'],
    requiredFields: ['studentId', 'question']
  });
}
