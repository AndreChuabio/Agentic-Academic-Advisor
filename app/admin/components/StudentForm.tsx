'use client';

import { useState, useEffect } from 'react';
import { Student } from '../../lib/types';
import { AdminService } from '../../lib/adminService';

interface StudentFormProps {
  student?: Student | null;
  onSubmit: (studentData: Omit<Student, 'id'> | Partial<Student>) => void;
  onCancel: () => void;
  title: string;
}

export default function StudentForm({ student, onSubmit, onCancel, title }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentCredits: 0,
    totalCreditsNeeded: 120,
    currentGPA: 0.0,
    semestersPassed: 0,
    expectedGraduation: '',
    completedCourses: [] as string[],
    careerGoal: '',
    specializations: [] as string[],
    postGradInterest: [] as string[],
    interestedInGradSchool: false
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [completedCoursesText, setCompletedCoursesText] = useState('');
  const [specializationsText, setSpecializationsText] = useState('');
  const [postGradInterestText, setPostGradInterestText] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        currentCredits: student.currentCredits,
        totalCreditsNeeded: student.totalCreditsNeeded,
        currentGPA: student.currentGPA,
        semestersPassed: student.semestersPassed,
        expectedGraduation: student.expectedGraduation,
        completedCourses: student.completedCourses || [],
        careerGoal: student.careerGoal || '',
        specializations: student.specializations || [],
        postGradInterest: student.postGradInterest || [],
        interestedInGradSchool: student.interestedInGradSchool || false
      });
      setCompletedCoursesText((student.completedCourses || []).join(', '));
      setSpecializationsText((student.specializations || []).join(', '));
      setPostGradInterestText((student.postGradInterest || []).join(', '));
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse arrays from text inputs
    const processedData = {
      ...formData,
      completedCourses: completedCoursesText.split(',').map(s => s.trim()).filter(s => s.length > 0),
      specializations: specializationsText.split(',').map(s => s.trim()).filter(s => s.length > 0),
      postGradInterest: postGradInterestText.split(',').map(s => s.trim()).filter(s => s.length > 0)
    };

    // Validate
    const validation = AdminService.validateStudent(processedData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    onSubmit(processedData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
          <ul className="text-sm text-red-700 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="currentCredits" className="block text-sm font-medium text-gray-700 mb-1">
              Current Credits
            </label>
            <input
              type="number"
              id="currentCredits"
              value={formData.currentCredits}
              onChange={(e) => handleInputChange('currentCredits', parseInt(e.target.value) || 0)}
              min="0"
              max="200"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="totalCreditsNeeded" className="block text-sm font-medium text-gray-700 mb-1">
              Total Credits Needed
            </label>
            <input
              type="number"
              id="totalCreditsNeeded"
              value={formData.totalCreditsNeeded}
              onChange={(e) => handleInputChange('totalCreditsNeeded', parseInt(e.target.value) || 120)}
              min="60"
              max="200"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="currentGPA" className="block text-sm font-medium text-gray-700 mb-1">
              Current GPA
            </label>
            <input
              type="number"
              id="currentGPA"
              value={formData.currentGPA}
              onChange={(e) => handleInputChange('currentGPA', parseFloat(e.target.value) || 0)}
              min="0"
              max="4"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="semestersPassed" className="block text-sm font-medium text-gray-700 mb-1">
              Semesters Passed
            </label>
            <input
              type="number"
              id="semestersPassed"
              value={formData.semestersPassed}
              onChange={(e) => handleInputChange('semestersPassed', parseInt(e.target.value) || 0)}
              min="0"
              max="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="expectedGraduation" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Graduation
            </label>
            <input
              type="text"
              id="expectedGraduation"
              value={formData.expectedGraduation}
              onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
              placeholder="e.g., Spring 2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="careerGoal" className="block text-sm font-medium text-gray-700 mb-1">
              Career Goal
            </label>
            <input
              type="text"
              id="careerGoal"
              value={formData.careerGoal}
              onChange={(e) => handleInputChange('careerGoal', e.target.value)}
              placeholder="e.g., software-engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Arrays as text inputs */}
        <div>
          <label htmlFor="completedCourses" className="block text-sm font-medium text-gray-700 mb-1">
            Completed Courses (comma-separated)
          </label>
          <input
            type="text"
            id="completedCourses"
            value={completedCoursesText}
            onChange={(e) => setCompletedCoursesText(e.target.value)}
            placeholder="e.g., CS101, MATH101, ENG101"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="specializations" className="block text-sm font-medium text-gray-700 mb-1">
            Specializations (comma-separated)
          </label>
          <input
            type="text"
            id="specializations"
            value={specializationsText}
            onChange={(e) => setSpecializationsText(e.target.value)}
            placeholder="e.g., ai-robotics, data-analytics"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="postGradInterest" className="block text-sm font-medium text-gray-700 mb-1">
            Post-Graduation Interests (comma-separated)
          </label>
          <input
            type="text"
            id="postGradInterest"
            value={postGradInterestText}
            onChange={(e) => setPostGradInterestText(e.target.value)}
            placeholder="e.g., graduate-school, industry, research"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.interestedInGradSchool}
              onChange={(e) => handleInputChange('interestedInGradSchool', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Interested in Graduate School</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {student ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
}
