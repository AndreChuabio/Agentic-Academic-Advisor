'use client';

import { useState, useEffect } from 'react';

interface GraduateProgram {
  id: string;
  title: string;
  degree: 'MS' | 'PhD';
  department: string;
  description: string;
  duration: string;
  minGPA: number;
  requiredCourses: string[];
  applicationDeadline: string;
  startDate: string;
  anonymizedPartner?: string;
  eligibility?: {
    isEligible: boolean;
    missingRequirements: string[];
    admissionChance: 'High' | 'Medium' | 'Low';
    recommendations: string[];
  };
  timeline?: string[];
}

interface GraduateProgramsProps {
  students: any[];
}

export default function GraduatePrograms({ students }: GraduateProgramsProps) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [programs, setPrograms] = useState<GraduateProgram[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      fetchPrograms();
    }
  }, [selectedStudent]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/graduate-programs?studentId=${selectedStudent}`);
      if (response.ok) {
        const data = await response.json();
        setPrograms(data);
      } else {
        setPrograms([]);
      }
    } catch (error) {
      console.error('Error fetching graduate programs:', error);
      setPrograms([]);
    }
    setLoading(false);
  };

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDegreeIcon = (degree: string) => {
    return degree === 'PhD' ? '🎓' : '📚';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Graduate Programs</h2>
        <p className="text-gray-600 mb-4">
          Explore graduate school opportunities and check your eligibility for advanced degree programs.
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
            <p className="mt-2 text-gray-600">Loading graduate programs...</p>
          </div>
        )}

        {!loading && programs.length === 0 && selectedStudent && (
          <div className="text-center py-8">
            <p className="text-gray-500">No graduate programs found for this student or student not interested in graduate school.</p>
          </div>
        )}

        {!loading && programs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map(program => (
              <div key={program.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getDegreeIcon(program.degree)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{program.department}</p>
                    <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                  </div>
                </div>

                {/* Program Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Min GPA:</span>
                    <span className="font-medium">{program.minGPA}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-medium">{program.applicationDeadline}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{program.startDate}</span>
                  </div>
                </div>

                {/* Eligibility Status */}
                {program.eligibility && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Admission Chance:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChanceColor(program.eligibility.admissionChance)}`}>
                        {program.eligibility.admissionChance}
                      </span>
                    </div>
                    
                    {program.eligibility.missingRequirements.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Missing Requirements:</p>
                        <ul className="text-xs text-red-600 space-y-1">
                          {program.eligibility.missingRequirements.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {program.eligibility.recommendations.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Recommendations:</p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          {program.eligibility.recommendations.map((rec, index) => (
                            <li key={index}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Partner Information */}
                {program.anonymizedPartner && (
                  <div className="border-t pt-3 mt-4">
                    <p className="text-xs text-gray-500">
                      In partnership with {program.anonymizedPartner}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
