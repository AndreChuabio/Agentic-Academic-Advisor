'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AdvisorMessage {
  role: 'student' | 'advisor';
  content: string;
  timestamp: Date;
}

interface UniversityAdvisorChatProps {
  selectedStudent: string;
}

export default function UniversityAdvisorChat({ selectedStudent }: UniversityAdvisorChatProps) {
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset chat when student changes
    if (selectedStudent && typeof window !== 'undefined') {
      setMessages([{
        role: 'advisor',
        content: `Hello! I'm Dr. Sarah Chen, your academic advisor at Metropolitan University. I'm here to help you with course planning, graduation requirements, career guidance, and any other academic questions you might have. How can I assist you today?`,
        timestamp: new Date()
      }]);
      
      // Load suggested questions for this student
      loadSuggestedQuestions();
    }
  }, [selectedStudent]);

  const loadSuggestedQuestions = async () => {
    if (!selectedStudent || typeof window === 'undefined') return;
    
    try {
      const response = await fetch('/api/gpt-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          studentId: selectedStudent, 
          question: 'What are some suggested questions I could ask?' 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestedQuestions(data.suggestedQuestions || []);
      }
    } catch (error) {
      console.error('Error loading suggested questions:', error);
      // Set default questions if API fails
      setSuggestedQuestions([
        "What courses should I take next semester?",
        "Am I on track to graduate on time?",
        "What career opportunities are available with my major?",
        "How can I improve my GPA?",
        "What are the prerequisites for advanced courses in my field?"
      ]);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || !selectedStudent || typeof window === 'undefined') return;

    // Add student message
    const studentMessage: AdvisorMessage = {
      role: 'student',
      content: message,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, studentMessage];
    setMessages(updatedMessages);
    setCurrentMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Prepare conversation history (exclude system messages)
      const conversationHistory = updatedMessages
        .filter(msg => msg.role === 'student' || msg.role === 'advisor')
        .slice(-6) // Last 6 messages for context (3 exchanges)
        .map(msg => ({
          role: msg.role as 'student' | 'advisor',
          content: msg.content
        }));

      const response = await fetch('/api/gpt-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          studentId: selectedStudent, 
          question: message,
          conversationHistory: conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const advisorMessage: AdvisorMessage = {
          role: 'advisor',
          content: data.advice || 'I apologize, but I encountered an issue processing your question. Please try again or contact me during office hours.',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, advisorMessage]);
        setSuggestedQuestions(data.suggestedQuestions || []);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: AdvisorMessage = {
        role: 'advisor',
        content: 'I apologize, but I\'m experiencing technical difficulties right now. Please try again in a moment, or feel free to visit my office during regular hours for in-person assistance.',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(currentMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  if (!selectedStudent) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <div className="text-gray-500">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI Academic Advisor</h3>
          <p>Please select a student to start a conversation with Dr. Sarah Chen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            SC
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Dr. Sarah Chen</h3>
            <p className="text-sm text-gray-500">Academic Advisor • Metropolitan University</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
          AI-Powered
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'student'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.role === 'student' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && !isLoading && (
        <div className="px-4 py-2 border-t bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Ask Dr. Chen about courses, graduation, careers..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !currentMessage.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
