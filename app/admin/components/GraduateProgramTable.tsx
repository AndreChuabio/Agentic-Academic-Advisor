'use client';

import { useState, useEffect } from 'react';
import { GraduateProgram } from '../../lib/types';
import { AdminService, ValidationResult } from '../../lib/adminService';

interface GraduateProgramTableProps {
  onImportSuccess?: () => void;
}

interface GraduateProgramFormData {
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
}

export default function GraduateProgramTable({ onImportSuccess }: GraduateProgramTableProps) {
  const [programs, setPrograms] = useState<GraduateProgram[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<GraduateProgram | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    setPrograms(AdminService.getAllGraduatePrograms());
  };

  const handleAddProgram = (programData: GraduateProgramFormData) => {
    const newProgram: GraduateProgram = {
      ...programData,
      id: '', // Will be set by AdminService
      requiredCourses: programData.requiredCourses.filter(c => c.trim() !== '')
    };

    const validation = AdminService.validateGraduateProgramData(newProgram);
    if (!validation.isValid) {
      alert('Validation errors:\n' + validation.errors.join('\n'));
      return;
    }

    AdminService.createGraduateProgram(newProgram);
    loadPrograms();
    setShowAddForm(false);
    if (onImportSuccess) onImportSuccess();
  };

  const handleUpdateProgram = (id: string, updates: Partial<GraduateProgram>) => {
    const validation = AdminService.validateGraduateProgramData({ ...editingProgram!, ...updates });
    if (!validation.isValid) {
      alert('Validation errors:\n' + validation.errors.join('\n'));
      return;
    }

    AdminService.updateGraduateProgram(id, updates);
    loadPrograms();
    setEditingProgram(null);
    if (onImportSuccess) onImportSuccess();
  };

  const handleDeleteProgram = (id: string) => {
    if (window.confirm('Are you sure you want to delete this graduate program? This action cannot be undone.')) {
      AdminService.deleteGraduateProgram(id);
      loadPrograms();
      if (onImportSuccess) onImportSuccess();
    }
  };

  const handleExport = () => {
    const csvData = AdminService.exportGraduatePrograms();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'graduate-programs.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDegree = degreeFilter === '' || program.degree === degreeFilter;
    const matchesDepartment = departmentFilter === '' || program.department === departmentFilter;
    return matchesSearch && matchesDegree && matchesDepartment;
  });

  const departments = [...new Set(programs.map(p => p.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Graduate Program Management</h2>
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
            + Add Program
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-32">
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Degrees</option>
            <option value="MS">MS</option>
            <option value="PhD">PhD</option>
          </select>
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

      {/* Program Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{program.degree === 'PhD' ? '🎓' : '📚'}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{program.department}</p>
                <p className="text-sm text-gray-700 mb-3">{program.description}</p>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Degree:</span>
                <span className="font-medium">{program.degree}</span>
              </div>
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

            {/* Required Courses */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Required Courses:</p>
              <div className="flex flex-wrap gap-1">
                {program.requiredCourses.slice(0, 4).map((course) => (
                  <span key={course} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {course}
                  </span>
                ))}
                {program.requiredCourses.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{program.requiredCourses.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Partner Information */}
            {program.anonymizedPartner && (
              <div className="border-t pt-3 mb-4">
                <p className="text-xs text-gray-500">
                  In partnership with {program.anonymizedPartner}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setEditingProgram(program)}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProgram(program.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
        
      {filteredPrograms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No graduate programs found matching your criteria.</p>
        </div>
      )}

      {/* Add Program Form Modal */}
      {showAddForm && (
        <GraduateProgramFormModal
          onSubmit={handleAddProgram}
          onCancel={() => setShowAddForm(false)}
          title="Add New Graduate Program"
        />
      )}

      {/* Edit Program Form Modal */}
      {editingProgram && (
        <GraduateProgramFormModal
          program={editingProgram}
          onSubmit={(updates) => handleUpdateProgram(editingProgram.id, updates)}
          onCancel={() => setEditingProgram(null)}
          title="Edit Graduate Program"
        />
      )}
    </div>
  );
}

// Graduate Program Form Modal Component
interface GraduateProgramFormModalProps {
  program?: GraduateProgram;
  onSubmit: (programData: GraduateProgramFormData) => void;
  onCancel: () => void;
  title: string;
}

function GraduateProgramFormModal({ program, onSubmit, onCancel, title }: GraduateProgramFormModalProps) {
  const [formData, setFormData] = useState<GraduateProgramFormData>({
    title: program?.title || '',
    degree: program?.degree || 'MS',
    department: program?.department || '',
    description: program?.description || '',
    duration: program?.duration || '',
    minGPA: program?.minGPA || 3.0,
    requiredCourses: program?.requiredCourses || [],
    applicationDeadline: program?.applicationDeadline || '',
    startDate: program?.startDate || '',
    anonymizedPartner: program?.anonymizedPartner || ''
  });

  const [courseInput, setCourseInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addCourse = () => {
    if (courseInput.trim() && !formData.requiredCourses.includes(courseInput.trim())) {
      setFormData({
        ...formData,
        requiredCourses: [...formData.requiredCourses, courseInput.trim()]
      });
      setCourseInput('');
    }
  };

  const removeCourse = (course: string) => {
    setFormData({
      ...formData,
      requiredCourses: formData.requiredCourses.filter(c => c !== course)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type</label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value as 'MS' | 'PhD' })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="MS">MS</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Min GPA</label>
              <input
                type="number"
                min="2.0"
                max="4.0"
                step="0.1"
                value={formData.minGPA}
                onChange={(e) => setFormData({ ...formData, minGPA: parseFloat(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2 years"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input
                type="text"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                placeholder="e.g., March 1st"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="e.g., Fall Semester"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Institution (Optional)</label>
            <input
              type="text"
              value={formData.anonymizedPartner}
              onChange={(e) => setFormData({ ...formData, anonymizedPartner: e.target.value })}
              placeholder="e.g., International Research Institute"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Courses</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                placeholder="Enter course ID (e.g., CS101)"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addCourse}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requiredCourses.map((course) => (
                <span
                  key={course}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                >
                  {course}
                  <button
                    type="button"
                    onClick={() => removeCourse(course)}
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
              {program ? 'Update Program' : 'Add Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
