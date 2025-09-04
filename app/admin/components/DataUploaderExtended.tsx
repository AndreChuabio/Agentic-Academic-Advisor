'use client';

import { useState } from 'react';
import { AdminService } from '../../lib/adminService';

interface DataUploaderExtendedProps {
  onImportSuccess?: () => void;
}

export default function DataUploaderExtended({ onImportSuccess }: DataUploaderExtendedProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'graduatePrograms'>('students');
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, dataType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportStatus('Processing file...');

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length < 2) {
        throw new Error('File must contain headers and at least one data row');
      }

      const headers = lines[0].split(',').map(h => h.trim());
      let successCount = 0;
      let errorCount = 0;

      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim());
          const record: any = {};
          
          headers.forEach((header, index) => {
            record[header] = values[index] || '';
          });

          // Basic data processing based on type
          if (dataType === 'students') {
            AdminService.addStudent(record);
          } else if (dataType === 'courses') {
            // Convert string arrays for prerequisites
            if (record.prerequisites) {
              record.prerequisites = record.prerequisites.split(';').filter((p: string) => p.trim() !== '');
            }
            record.credits = parseInt(record.credits) || 3;
            AdminService.createCourse(record);
          } else if (dataType === 'graduatePrograms') {
            // Convert string arrays for required courses
            if (record.requiredCourses) {
              record.requiredCourses = record.requiredCourses.split(';').filter((c: string) => c.trim() !== '');
            }
            record.minGPA = parseFloat(record.minGPA) || 3.0;
            AdminService.createGraduateProgram(record);
          }
          
          successCount++;
        } catch (error) {
          console.error(`Error processing row ${i}:`, error);
          errorCount++;
        }
      }

      setImportStatus(`Import completed: ${successCount} records imported, ${errorCount} errors`);
      if (onImportSuccess) onImportSuccess();
      
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImporting(false);
      // Clear the file input
      event.target.value = '';
      
      // Clear status after 3 seconds
      setTimeout(() => setImportStatus(''), 3000);
    }
  };

  const handleExport = (dataType: string) => {
    try {
      let csvData = '';
      let filename = '';

      switch (dataType) {
        case 'students':
          csvData = AdminService.exportStudents('csv');
          filename = 'students.csv';
          break;
        case 'courses':
          csvData = AdminService.exportCourses();
          filename = 'courses.csv';
          break;
        case 'graduatePrograms':
          csvData = AdminService.exportGraduatePrograms();
          filename = 'graduate_programs.csv';
          break;
        default:
          throw new Error('Invalid data type');
      }

      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleReset = (dataType: string) => {
    if (window.confirm(`Are you sure you want to reset all ${dataType} data to defaults? This cannot be undone.`)) {
      try {
        switch (dataType) {
          case 'students':
            AdminService.resetToMockData();
            break;
          case 'courses':
            AdminService.resetCoursesToMockData();
            break;
          case 'graduatePrograms':
            AdminService.resetGraduateProgramsToMockData();
            break;
        }
        
        if (onImportSuccess) onImportSuccess();
        alert(`${dataType} data has been reset to defaults.`);
      } catch (error) {
        console.error('Reset error:', error);
        alert('Reset failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  const downloadTemplate = (dataType: string) => {
    let csvContent = '';
    let filename = '';

    switch (dataType) {
      case 'students':
        csvContent = 'id,name,email,year,major,gpa,completedCourses\nSTU001,John Doe,john.doe@email.com,3,Computer Science,3.5,CS101;CS102';
        filename = 'student_template.csv';
        break;
      case 'courses':
        csvContent = 'code,title,credits,department,prerequisites,description,difficulty\nCS101,Introduction to Computer Science,3,Computer Science,,Basic programming concepts,Easy';
        filename = 'course_template.csv';
        break;
      case 'graduatePrograms':
        csvContent = 'title,degree,department,description,duration,minGPA,requiredCourses,applicationDeadline,startDate\nMaster of Computer Science,MS,Computer Science,Advanced CS program,2 years,3.0,CS501;CS502,2024-03-15,2024-08-15';
        filename = 'graduate_program_template.csv';
        break;
      default:
        return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'students', label: '👥 Students' },
            { key: 'courses', label: '📚 Courses' },
            { key: 'graduatePrograms', label: '🎓 Graduate Programs' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Import Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Import {activeTab === 'students' ? 'Students' : activeTab === 'courses' ? 'Courses' : 'Graduate Programs'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, activeTab)}
                disabled={importing}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
              />
            </div>

            <button
              onClick={() => downloadTemplate(activeTab)}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              📥 Download Template
            </button>

            {importing && (
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Processing...</span>
              </div>
            )}

            {importStatus && (
              <div className={`text-sm p-3 rounded-md ${
                importStatus.includes('failed') || importStatus.includes('error')
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {importStatus}
              </div>
            )}
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Export & Reset {activeTab === 'students' ? 'Students' : activeTab === 'courses' ? 'Courses' : 'Graduate Programs'}
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={() => handleExport(activeTab)}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              📤 Export to CSV
            </button>

            <button
              onClick={() => handleReset(activeTab)}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              🔄 Reset to Defaults
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p><strong>Export:</strong> Download current data as CSV</p>
            <p><strong>Reset:</strong> Restore original mock data (runtime only)</p>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">📋 Instructions</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Import:</strong> Upload CSV files to add new records. Download template for proper format.</li>
          <li><strong>Export:</strong> Download current data for backup or external processing.</li>
          <li><strong>Reset:</strong> Restore original demo data (all changes are runtime-only).</li>
          <li><strong>Format:</strong> CSV files should have headers in the first row.</li>
        </ul>
      </div>
    </div>
  );
}
