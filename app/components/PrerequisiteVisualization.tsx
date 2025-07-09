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

interface PrerequisiteData {
  course: Course;
  prerequisites: Course[];
}

export default function PrerequisiteVisualization() {
  const [courseCode, setCourseCode] = useState('');
  const [prerequisiteData, setPrerequisiteData] = useState<PrerequisiteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const courses = [
    { id: 'CS101', code: 'CS 101', title: 'Introduction to Programming' },
    { id: 'CS201', code: 'CS 201', title: 'Data Structures' },
    { id: 'CS301', code: 'CS 301', title: 'Advanced Algorithms' },
    { id: 'CS401', code: 'CS 401', title: 'Software Engineering' },
    { id: 'MATH101', code: 'MATH 101', title: 'Calculus I' },
    { id: 'MATH201', code: 'MATH 201', title: 'Calculus II' },
    { id: 'STAT101', code: 'STAT 101', title: 'Introduction to Statistics' },
    { id: 'STAT201', code: 'STAT 201', title: 'Statistical Analysis' },
    { id: 'PHY101', code: 'PHY 101', title: 'Physics I' },
    { id: 'BUS101', code: 'BUS 101', title: 'Introduction to Business' },
    { id: 'BUS201', code: 'BUS 201', title: 'Business Analysis' },
    { id: 'EDU101', code: 'EDU 101', title: 'Introduction to Education' },
    { id: 'EDU201', code: 'EDU 201', title: 'Educational Psychology' },
    { id: 'ENG101', code: 'ENG 101', title: 'English Composition' },
    { id: 'ECON101', code: 'ECON 101', title: 'Microeconomics' }
  ];

  const handleSearchPrerequisites = async () => {
    if (!courseCode) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/prerequisites?courseId=${courseCode}`);
      if (!response.ok) {
        throw new Error('Course not found');
      }
      const data = await response.json();
      setPrerequisiteData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prerequisites');
      setPrerequisiteData(null);
    } finally {
      setLoading(false);
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🔗 Course Prerequisites Visualization
        </h2>
        <p className="text-gray-600 mb-6">
          Explore course dependencies and prerequisite chains to plan your academic path.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code}: {course.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearchPrerequisites}
            disabled={!courseCode || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Show Prerequisites'}
          </button>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
        </div>
      </div>

      {prerequisiteData && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Prerequisites for {prerequisiteData.course.code}
          </h3>

          {/* Selected Course */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Target Course</h4>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-blue-900">
                    {prerequisiteData.course.code}: {prerequisiteData.course.title}
                  </h5>
                  <p className="text-sm text-blue-700 mt-1">{prerequisiteData.course.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(prerequisiteData.course.difficulty)}`}>
                    {prerequisiteData.course.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                    {prerequisiteData.course.credits} credits
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">
                {prerequisiteData.course.department}
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Required Prerequisites</h4>
            {prerequisiteData.prerequisites.length > 0 ? (
              <div className="space-y-3">
                {prerequisiteData.prerequisites.map((prereq, index) => (
                  <div key={prereq.id} className="relative">
                    {/* Connection line */}
                    {index < prerequisiteData.prerequisites.length - 1 && (
                      <div className="absolute left-4 top-16 w-px h-8 bg-gray-300"></div>
                    )}
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-2">
                        <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                      </div>
                      
                      <div className="flex-1 bg-gray-50 border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">
                              {prereq.code}: {prereq.title}
                            </h5>
                            <p className="text-sm text-gray-600 mt-1">{prereq.description}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(prereq.difficulty)}`}>
                              {prereq.difficulty}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                              {prereq.credits} credits
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {prereq.department}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Final connection to target course */}
                <div className="flex items-center justify-center py-4">
                  <div className="text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-full">
                    ⬇️ Leads to target course
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-lg font-medium">No Prerequisites Required!</p>
                <p className="text-sm">This course can be taken without any prerequisite courses.</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Prerequisites Required:</span>
                <span className="ml-1 font-medium">{prerequisiteData.prerequisites.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Prerequisite Credits:</span>
                <span className="ml-1 font-medium">
                  {prerequisiteData.prerequisites.reduce((sum, course) => sum + course.credits, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Target Course Credits:</span>
                <span className="ml-1 font-medium">{prerequisiteData.course.credits}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
