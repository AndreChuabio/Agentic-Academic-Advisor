'use client';

import { useState, useEffect } from 'react';

interface SpecializationTrack {
  id: string;
  name: string;
  department: string;
  additionalCourses: string[];
  minGPA: number;
  careerOutcomes: string[];
  description: string;
  progress?: number;
  isEligible?: boolean;
}

interface SpecializationTracksProps {
  students: any[];
}

export default function SpecializationTracks({ students }: SpecializationTracksProps) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [specializations, setSpecializations] = useState<SpecializationTrack[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      fetchSpecializations();
    }
  }, [selectedStudent]);

  const fetchSpecializations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/specializations?studentId=${selectedStudent}`);
      if (response.ok) {
        const data = await response.json();
        setSpecializations(data);
      } else {
        setSpecializations([]);
      }
    } catch (error) {
      console.error('Error fetching specializations:', error);
      setSpecializations([]);
    }
    setLoading(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEligibilityStatus = (isEligible?: boolean) => {
    if (isEligible === undefined) return null;
    return isEligible ? 
      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Eligible</span> :
      <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Not Eligible</span>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialization Tracks</h2>
        <p className="text-gray-600 mb-4">
          Explore specialized academic tracks that can enhance your career prospects and provide focused expertise.
        </p>

        {/* Student Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Student
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a student...</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} (GPA: {student.currentGPA})
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading specializations...</p>
          </div>
        )}

        {!loading && specializations.length === 0 && selectedStudent && (
          <div className="text-center py-8">
            <p className="text-gray-500">No specialization tracks found for this student's major.</p>
          </div>
        )}

        {!loading && specializations.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {specializations.map(spec => (
              <div key={spec.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎯</span>
                      <h3 className="text-lg font-semibold text-gray-900">{spec.name}</h3>
                      {getEligibilityStatus(spec.isEligible)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{spec.department} Department</p>
                    <p className="text-sm text-gray-700 mb-3">{spec.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {spec.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{spec.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(spec.progress)}`}
                        style={{ width: `${spec.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Courses Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {spec.additionalCourses.map(course => (
                      <span key={course} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum GPA:</span>
                    <span className="font-medium">{spec.minGPA}</span>
                  </div>
                </div>

                {/* Career Outcomes */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Career Outcomes:</h4>
                  <div className="space-y-1">
                    {spec.careerOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">•</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!selectedStudent && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Your Specialization Path</h3>
            <p className="text-gray-600">Select a student to see available specialization tracks and progress.</p>
          </div>
        )}
      </div>
    </div>
  );
}
