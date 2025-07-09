'use client';

import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Career {
  id: string;
  title: string;
  description: string;
}

interface ProgressTracking {
  careerTitle: string;
  completionPercentage: number;
  completedRequirements: string[];
  remainingRequirements: string[];
  nextRecommendedCourse: string;
  estimatedCompletionSemesters: number;
}

interface Props {
  students: Student[];
  careers: Career[];
}

export default function ProgressTracking({ students, careers }: Props) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [progressData, setProgressData] = useState<ProgressTracking | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrackProgress = async () => {
    if (!selectedStudent || !selectedCareer) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/progress-tracking?studentId=${selectedStudent}&careerId=${selectedCareer}`);
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error('Error fetching progress tracking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📊 Career Progress Tracking
        </h2>
        <p className="text-gray-600 mb-6">
          Track student progress toward their career goals and see completion percentages.
        </p>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Career Goal
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
          </div>

          <button
            onClick={handleTrackProgress}
            disabled={!selectedStudent || !selectedCareer || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing Progress...' : 'Track Career Progress'}
          </button>
        </div>
      </div>

      {progressData && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Progress toward {progressData.careerTitle}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(progressData.completionPercentage)}`}>
              {progressData.completionPercentage}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Career Readiness</span>
              <span className="text-sm text-gray-500">{progressData.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(progressData.completionPercentage)}`}
                style={{ width: `${progressData.completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Completed Requirements */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Completed Requirements ({progressData.completedRequirements.length})
              </h4>
              {progressData.completedRequirements.length > 0 ? (
                <ul className="space-y-2">
                  {progressData.completedRequirements.map((course, index) => (
                    <li key={index} className="text-sm text-gray-700 bg-green-50 p-2 rounded border-l-4 border-green-500">
                      ✅ {course}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No requirements completed yet</p>
              )}
            </div>

            {/* Remaining Requirements */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Remaining Requirements ({progressData.remainingRequirements.length})
              </h4>
              {progressData.remainingRequirements.length > 0 ? (
                <ul className="space-y-2">
                  {progressData.remainingRequirements.map((course, index) => (
                    <li key={index} className="text-sm text-gray-700 bg-red-50 p-2 rounded border-l-4 border-red-500">
                      ⏳ {course}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600 font-medium">🎉 All requirements completed!</p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium text-blue-900 mb-2">📚 Next Steps</h4>
            <div className="space-y-2 text-sm">
              {progressData.nextRecommendedCourse && (
                <p className="text-blue-800">
                  <strong>Next Recommended Course:</strong> {progressData.nextRecommendedCourse}
                </p>
              )}
              <p className="text-blue-800">
                <strong>Estimated Time to Complete:</strong> {progressData.estimatedCompletionSemesters} semester{progressData.estimatedCompletionSemesters !== 1 ? 's' : ''}
              </p>
              {progressData.completionPercentage < 50 && (
                <p className="text-blue-800">
                  💡 <strong>Tip:</strong> Consider meeting with an academic advisor to create an accelerated plan.
                </p>
              )}
              {progressData.completionPercentage >= 80 && (
                <p className="text-blue-800">
                  🌟 <strong>Great Progress!</strong> You're well on your way to achieving your career goal!
                </p>
              )}
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Career Preparation Timeline</h4>
            <div className="relative">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Starting Point</span>
                <span>Current Progress</span>
                <span>Career Ready</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 relative">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(progressData.completionPercentage)}`}
                  style={{ width: `${progressData.completionPercentage}%` }}
                ></div>
                <div
                  className="absolute top-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white transform -translate-y-0.5"
                  style={{ left: `${Math.max(0, progressData.completionPercentage - 1)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>{progressData.completionPercentage}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
