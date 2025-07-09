'use client';

import { useState, useEffect } from 'react';
import RiskAssessment from './components/RiskAssessment';
import CourseRecommendations from './components/CourseRecommendations';
import PrerequisiteVisualization from './components/PrerequisiteVisualization';
import ProgressTracking from './components/ProgressTracking';
import GraduatePrograms from './components/GraduatePrograms';
import SpecializationTracks from './components/SpecializationTracks';
import PostGradPathways from './components/PostGradPathways';
import UniversityAdvisorChat from './components/UniversityAdvisorChat';

export default function Home() {
  const [activeTab, setActiveTab] = useState('risk');
  const [activePathwayTab, setActivePathwayTab] = useState('programs');
  const [students, setStudents] = useState([]);
  const [careers, setCareers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    // Fetch initial data
    Promise.all([
      fetch('/api/students').then(res => res.json()),
      fetch('/api/careers').then(res => res.json())
    ]).then(([studentsData, careersData]) => {
      setStudents(studentsData);
      setCareers(careersData);
    });
  }, []);

  const tabs = [
    { id: 'risk', label: 'Graduation Risk', icon: '⚠️' },
    { id: 'recommendations', label: 'Course Recommendations', icon: '📚' },
    { id: 'prerequisites', label: 'Prerequisites', icon: '🔗' },
    { id: 'progress', label: 'Progress Tracking', icon: '📊' },
    { id: 'pathways', label: 'Graduate Pathways', icon: '🎓' },
    { id: 'advisor', label: 'AI Advisor Chat', icon: '🤖' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Academic Advisor</h1>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">POC</span>
            </div>
            <div className="text-sm text-gray-500">
              Early Warning System • Personalized Guidance • Career Planning
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'risk' && <RiskAssessment students={students} />}
        {activeTab === 'recommendations' && <CourseRecommendations careers={careers} students={students} />}
        {activeTab === 'prerequisites' && <PrerequisiteVisualization />}
        {activeTab === 'progress' && <ProgressTracking students={students} careers={careers} />}
        {activeTab === 'advisor' && (
          <div className="space-y-6">
            {/* Student Selection for Advisor */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Select Student:</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a student...</option>
                  {students.map((student: any) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* AI Advisor Chat */}
            <UniversityAdvisorChat selectedStudent={selectedStudent} />
          </div>
        )}
        {activeTab === 'pathways' && (
          <div className="space-y-6">
            {/* Pathways Sub-Navigation */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActivePathwayTab('programs')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePathwayTab === 'programs'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎓 Graduate Programs
                </button>
                <button
                  onClick={() => setActivePathwayTab('specializations')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePathwayTab === 'specializations'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎯 Specializations
                </button>
                <button
                  onClick={() => setActivePathwayTab('pathways')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePathwayTab === 'pathways'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🚀 Post-Grad Options
                </button>
              </div>
            </div>
            
            {/* Pathways Content */}
            {activePathwayTab === 'programs' && <GraduatePrograms students={students} />}
            {activePathwayTab === 'specializations' && <SpecializationTracks students={students} />}
            {activePathwayTab === 'pathways' && <PostGradPathways students={students} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>AI Academic Advisor POC • Preventing Late Graduations • Personalizing Education</p>
            <p className="mt-1">Demo showcasing AI-powered academic guidance capabilities</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
