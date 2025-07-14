'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../lib/adminContext';
import { AdminService } from '../lib/adminService';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import DataUploader from './components/DataUploader';
import CourseTable from './components/CourseTable';
import GraduateProgramTable from './components/GraduateProgramTable';
import DataUploaderExtended from './components/DataUploaderExtended';
import { Student, Course, GraduateProgram } from '../lib/types';

export default function AdminPage() {
  const { isAdminMode, isAuthenticated, setIsAdminMode } = useAdmin();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeSection, setActiveSection] = useState<'students' | 'courses' | 'graduatePrograms' | 'upload'>('students');
  const router = useRouter();

  // Redirect if not in admin mode
  useEffect(() => {
    if (!isAuthenticated || !isAdminMode) {
      router.push('/');
    }
  }, [isAuthenticated, isAdminMode, router]);

  // Load data
  useEffect(() => {
    if (isAuthenticated && isAdminMode) {
      setStudents(AdminService.getStudents());
      setCourses(AdminService.getAllCourses());
      setGraduatePrograms(AdminService.getAllGraduatePrograms());
    }
  }, [isAuthenticated, isAdminMode]);

  if (!isAuthenticated || !isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need to be authenticated to access the admin panel.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent = AdminService.addStudent(studentData);
    setStudents(AdminService.getStudents());
    setShowAddForm(false);
  };

  const handleUpdateStudent = (id: string, updates: Partial<Student>) => {
    AdminService.updateStudent(id, updates);
    setStudents(AdminService.getStudents());
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      AdminService.deleteStudent(id);
      setStudents(AdminService.getStudents());
    }
  };

  const handleImportSuccess = () => {
    setStudents(AdminService.getStudents());
    setCourses(AdminService.getAllCourses());
    setGraduatePrograms(AdminService.getAllGraduatePrograms());
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm font-medium">
        🔧 ADMINISTRATOR MODE - Course & Graduate Program Management System
      </div>
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="ml-4 flex space-x-2">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {students.length} Students
                </span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {courses.length} Courses
                </span>
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  {graduatePrograms.length} Programs
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExitAdmin}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Exit Admin Mode
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSection('students')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'students'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Students
            </button>
            <button
              onClick={() => setActiveSection('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'courses'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📚 Courses
            </button>
            <button
              onClick={() => setActiveSection('graduatePrograms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'graduatePrograms'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🎓 Graduate Programs
            </button>
            <button
              onClick={() => setActiveSection('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'upload'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📤 Data Import/Export
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'students' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Student Records</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                + Add New Student
              </button>
            </div>

            {/* Student Table */}
            <StudentTable
              students={students}
              onEdit={setEditingStudent}
              onDelete={handleDeleteStudent}
            />

            {/* Add Student Form Modal */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                  <StudentForm
                    onSubmit={handleAddStudent}
                    onCancel={() => setShowAddForm(false)}
                    title="Add New Student"
                  />
                </div>
              </div>
            )}

            {/* Edit Student Form Modal */}
            {editingStudent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                  <StudentForm
                    student={editingStudent}
                    onSubmit={(updates: Partial<Student>) => handleUpdateStudent(editingStudent.id, updates)}
                    onCancel={() => setEditingStudent(null)}
                    title="Edit Student"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Course Management</h2>
            <CourseTable
              onImportSuccess={() => {
                setCourses(AdminService.getAllCourses());
                handleImportSuccess();
              }}
            />
          </div>
        )}

        {activeSection === 'graduatePrograms' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Graduate Program Management</h2>
            <GraduateProgramTable
              onImportSuccess={() => {
                setGraduatePrograms(AdminService.getAllGraduatePrograms());
                handleImportSuccess();
              }}
            />
          </div>
        )}

        {activeSection === 'upload' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Data Import/Export</h2>
            <DataUploaderExtended onImportSuccess={handleImportSuccess} />
          </div>
        )}
      </main>
    </div>
  );
}
