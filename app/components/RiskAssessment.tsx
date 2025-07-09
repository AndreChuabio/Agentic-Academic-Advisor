'use client';

import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  currentCredits: number;
  totalCreditsNeeded: number;
  currentGPA: number;
  semestersPassed: number;
  expectedGraduation: string;
}

interface RiskAssessment {
  level: 'Green' | 'Yellow' | 'Red';
  score: number;
  factors: string[];
  recommendations: string[];
}

interface Props {
  students: Student[];
}

export default function RiskAssessment({ students }: Props) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [riskData, setRiskData] = useState<RiskAssessment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAssessRisk = async () => {
    if (!selectedStudent) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/risk-assessment?studentId=${selectedStudent}`);
      const data = await response.json();
      setRiskData(data);
    } catch (error) {
      console.error('Error fetching risk assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Green': return 'text-green-600 bg-green-100';
      case 'Yellow': return 'text-yellow-600 bg-yellow-100';
      case 'Red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Graduation Risk Assessment
        </h2>
        <p className="text-gray-600 mb-6">
          Select a student to assess their graduation risk and receive actionable recommendations.
        </p>

        <div className="space-y-4">
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

          {selectedStudentData && (
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Student Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Credits:</span>
                  <span className="ml-1 font-medium">
                    {selectedStudentData.currentCredits}/{selectedStudentData.totalCreditsNeeded}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">GPA:</span>
                  <span className="ml-1 font-medium">{selectedStudentData.currentGPA}</span>
                </div>
                <div>
                  <span className="text-gray-500">Semesters:</span>
                  <span className="ml-1 font-medium">{selectedStudentData.semestersPassed}</span>
                </div>
                <div>
                  <span className="text-gray-500">Expected Graduation:</span>
                  <span className="ml-1 font-medium">{selectedStudentData.expectedGraduation}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleAssessRisk}
            disabled={!selectedStudent || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Assessing...' : 'Assess Graduation Risk'}
          </button>
        </div>
      </div>

      {riskData && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Results</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskData.level)}`}>
              {riskData.level} Risk
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Risk Score</h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {riskData.score}/100
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${riskData.score}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      riskData.level === 'Green' ? 'bg-green-500' :
                      riskData.level === 'Yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
              <ul className="space-y-1">
                {riskData.factors.map((factor, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {riskData.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
