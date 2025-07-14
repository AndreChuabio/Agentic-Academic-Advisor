'use client';

import { useState, useEffect } from 'react';
import { Course } from '../../lib/types';
import { AdminService, ValidationResult } from '../../lib/adminService';

interface CourseTableProps {
  onImportSuccess?: () => void;
}

interface CourseFormData {
  code: string;
  title: string;
  credits: number;
  department: string;
  prerequisites: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function CourseTable({ onImportSuccess }: CourseTableProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setCourses(AdminService.getAllCourses());
  };

  const handleAddCourse = (courseData: CourseFormData) => {
    const newCourse: Course = {
      ...courseData,
      id: '', // Will be set by AdminService
      prerequisites: courseData.prerequisites.filter(p => p.trim() !== '')
    };

    const validation = AdminService.validateCourseData(newCourse);
    if (!validation.isValid) {
      alert('Validation errors:\n' + validation.errors.join('\n'));
      return;
    }

    AdminService.createCourse(newCourse);
    loadCourses();
    setShowAddForm(false);
    if (onImportSuccess) onImportSuccess();
  };

  const handleUpdateCourse = (id: string, updates: Partial<Course>) => {
    const validation = AdminService.validateCourseData({ ...editingCourse!, ...updates });
    if (!validation.isValid) {
      alert('Validation errors:\n' + validation.errors.join('\n'));
      return;
    }

    AdminService.updateCourse(id, updates);
    loadCourses();
    setEditingCourse(null);
    if (onImportSuccess) onImportSuccess();
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      AdminService.deleteCourse(id);
      loadCourses();
      if (onImportSuccess) onImportSuccess();
    }
  };

  const handleExport = () => {
    const csvData = AdminService.exportCourses();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'courses.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === '' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(courses.map(c => c.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Course Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
          >
            📤 Export CSV
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            + Add Course
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-48">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{course.code}</div>
                    <div className="text-sm text-gray-500">{course.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.credits}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    course.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : 'None'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No courses found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Course Form Modal */}
      {showAddForm && (
        <CourseFormModal
          onSubmit={handleAddCourse}
          onCancel={() => setShowAddForm(false)}
          title="Add New Course"
        />
      )}

      {/* Edit Course Form Modal */}
      {editingCourse && (
        <CourseFormModal
          course={editingCourse}
          onSubmit={(updates) => handleUpdateCourse(editingCourse.id, updates)}
          onCancel={() => setEditingCourse(null)}
          title="Edit Course"
        />
      )}
    </div>
  );
}

// Course Form Modal Component
interface CourseFormModalProps {
  course?: Course;
  onSubmit: (courseData: CourseFormData) => void;
  onCancel: () => void;
  title: string;
}

function CourseFormModal({ course, onSubmit, onCancel, title }: CourseFormModalProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    code: course?.code || '',
    title: course?.title || '',
    credits: course?.credits || 3,
    department: course?.department || '',
    prerequisites: course?.prerequisites || [],
    description: course?.description || '',
    difficulty: course?.difficulty || 'Medium'
  });

  const [prerequisiteInput, setPrerequisiteInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addPrerequisite = () => {
    if (prerequisiteInput.trim() && !formData.prerequisites.includes(prerequisiteInput.trim())) {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, prerequisiteInput.trim()]
      });
      setPrerequisiteInput('');
    }
  };

  const removePrerequisite = (prereq: string) => {
    setFormData({
      ...formData,
      prerequisites: formData.prerequisites.filter(p => p !== prereq)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={prerequisiteInput}
                onChange={(e) => setPrerequisiteInput(e.target.value)}
                placeholder="Enter prerequisite course ID"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addPrerequisite}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.prerequisites.map((prereq) => (
                <span
                  key={prereq}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                >
                  {prereq}
                  <button
                    type="button"
                    onClick={() => removePrerequisite(prereq)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
