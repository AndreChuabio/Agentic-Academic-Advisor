'use client';

import { useState, useEffect } from 'react';

interface PostGradPathway {
  id: string;
  type: 'graduate' | 'exchange' | 'internship';
  title: string;
  description: string;
  eligibilityRequirements: string[];
  timeline: string;
  benefits: string[];
  anonymizedPartner?: string;
  eligibilityStatus?: {
    isEligible: boolean;
    gpaRequirement: number;
    completedCourses: number;
    recommendation: string;
  };
}

interface PostGradPathwaysProps {
  students: any[];
}

export default function PostGradPathways({ students }: PostGradPathwaysProps) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [pathways, setPathways] = useState<PostGradPathway[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (selectedStudent) {
      fetchPathways();
    }
  }, [selectedStudent]);

  const fetchPathways = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pathways?studentId=${selectedStudent}`);
      if (response.ok) {
        const data = await response.json();
        setPathways(data);
      } else {
        setPathways([]);
      }
    } catch (error) {
      console.error('Error fetching pathways:', error);
      setPathways([]);
    }
    setLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'graduate': return '🎓';
      case 'exchange': return '🌍';
      case 'internship': return '💼';
      default: return '🚀';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'graduate': return 'bg-purple-100 text-purple-800';
      case 'exchange': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPathways = pathways.filter(pathway => 
    activeFilter === 'all' || pathway.type === activeFilter
  );

  const filters = [
    { id: 'all', label: 'All Pathways', icon: '🚀' },
    { id: 'graduate', label: 'Graduate School', icon: '🎓' },
    { id: 'exchange', label: 'Exchange Programs', icon: '🌍' },
    { id: 'internship', label: 'Internships', icon: '💼' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post-Graduation Pathways</h2>
        <p className="text-gray-600 mb-4">
          Explore different opportunities available after graduation, including graduate school, international programs, and professional experiences.
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

        {/* Filter Tabs */}
        {selectedStudent && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading pathways...</p>
          </div>
        )}

        {!loading && filteredPathways.length === 0 && selectedStudent && (
          <div className="text-center py-8">
            <p className="text-gray-500">No pathways found for the selected filter.</p>
          </div>
        )}

        {!loading && filteredPathways.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPathways.map(pathway => (
              <div key={pathway.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(pathway.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{pathway.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(pathway.type)}`}>
                          {pathway.type.charAt(0).toUpperCase() + pathway.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{pathway.description}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline:</h4>
                  <p className="text-sm text-gray-600">{pathway.timeline}</p>
                </div>

                {/* Eligibility Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Eligibility Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pathway.eligibilityRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pathway.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility Status */}
                {pathway.eligibilityStatus && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Eligibility Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pathway.eligibilityStatus.isEligible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pathway.eligibilityStatus.isEligible ? 'Eligible' : 'Needs Improvement'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {pathway.eligibilityStatus.recommendation}
                    </p>
                  </div>
                )}

                {/* Partner Information */}
                {pathway.anonymizedPartner && (
                  <div className="border-t pt-3 mt-4">
                    <p className="text-xs text-gray-500">
                      In partnership with {pathway.anonymizedPartner}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!selectedStudent && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Your Future Pathways</h3>
            <p className="text-gray-600">Select a student to see personalized post-graduation opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
