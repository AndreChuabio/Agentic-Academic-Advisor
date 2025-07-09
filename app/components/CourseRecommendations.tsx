'use client';

import { useState } from 'react';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  prerequisites: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface CourseRecommendation {
  course: Course;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface Career {
  id: string;
  title: string;
  description: string;
  averageSalary: number;
  jobGrowth: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Props {
  careers: Career[];
  students: Student[];
}

export default function CourseRecommendations({ careers, students }: Props) {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    if (!selectedCareer) return;
    
    setLoading(true);
    try {
      const url = selectedStudent 
        ? `/api/course-recommendations?careerId=${selectedCareer}&studentId=${selectedStudent}`
        : `/api/course-recommendations?careerId=${selectedCareer}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedCareerData = careers.find(c => c.id === selectedCareer);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎓 Career-Based Course Recommendations
        </h2>
        <p className="text-gray-600 mb-6">
          Get personalized course recommendations based on your career goals and current progress.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Career Path
            </label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a career...</option>
              {careers.map(career => (
                <option key={career.id} value={career.id}>
                  {career.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Student (Optional)
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Generic recommendations...</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </option>
              ))}
            </select>
          </div>

          {selectedCareerData && (
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Career Information</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedCareerData.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Average Salary:</span>
                  <span className="ml-1 font-medium">${selectedCareerData.averageSalary.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Job Growth:</span>
                  <span className="ml-1 font-medium">{selectedCareerData.jobGrowth}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleGetRecommendations}
            disabled={!selectedCareer || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting Recommendations...' : 'Get Course Recommendations'}
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommended Courses ({recommendations.length})
          </h3>
          
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {rec.course.code}: {rec.course.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.course.description}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.course.difficulty)}`}>
                      {rec.course.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{rec.course.department} • {rec.course.credits} credits</span>
                  <span className="text-blue-600">{rec.reason}</span>
                </div>

                {rec.course.prerequisites.length > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Prerequisites: </span>
                    <span className="text-gray-700">{rec.course.prerequisites.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
