'use client';

import { useState } from 'react';
import { AdminService } from '../../lib/adminService';
import { Student, Course, GraduateProgram } from '../../lib/types';

interface DataUploaderProps {
  onImportSuccess: () => void;
  students: Student[];
  courses?: Course[];
  graduatePrograms?: GraduateProgram[];
  dataType?: 'students' | 'courses' | 'graduatePrograms';
}

export default function DataUploader({ 
  onImportSuccess, 
  students, 
  courses = [], 
  graduatePrograms = [], 
  dataType = 'students' 
}: DataUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [importData, setImportData] = useState('');
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImportData(event.target.result as string);
          // Auto-detect format based on file extension
          if (file.name.endsWith('.csv')) {
            setImportFormat('csv');
          } else {
            setImportFormat('json');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImportData(event.target.result as string);
          // Auto-detect format based on file extension
          if (file.name.endsWith('.csv')) {
            setImportFormat('csv');
          } else {
            setImportFormat('json');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePreviewImport = () => {
    try {
      setImportError('');
      // For POC, just validate the format without actually importing
      if (importFormat === 'json') {
        const data = JSON.parse(importData);
        if (Array.isArray(data)) {
          setPreviewData(data.slice(0, 5)); // Show first 5 records
          setShowPreview(true);
        } else {
          throw new Error('JSON must be an array of student objects');
        }
      } else {
        // CSV validation
        const lines = importData.trim().split('\n');
        if (lines.length < 2) {
          throw new Error('CSV must have headers and at least one data row');
        }
        setPreviewData([]); // CSV preview would be more complex
        setShowPreview(true);
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Invalid data format');
    }
  };

  const handleConfirmImport = () => {
    try {
      setImportError('');
      AdminService.importStudents(importData, importFormat);
      setImportSuccess(`Successfully imported data in ${importFormat.toUpperCase()} format`);
      setImportData('');
      setShowPreview(false);
      onImportSuccess();
      setTimeout(() => setImportSuccess(''), 3000);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Import failed');
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    try {
      let data: string;
      let filename: string;

      if (dataType === 'courses') {
        data = format === 'json' ? JSON.stringify(courses, null, 2) : AdminService.exportCourses();
        filename = `courses.${format}`;
      } else if (dataType === 'graduatePrograms') {
        data = format === 'json' ? JSON.stringify(graduatePrograms, null, 2) : AdminService.exportGraduatePrograms();
        filename = `graduate-programs.${format}`;
      } else {
        data = AdminService.exportStudents(format);
        filename = `students.${format}`;
      }

      const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  const handleResetData = () => {
    const dataTypeLabel = dataType === 'courses' ? 'course' : 
                          dataType === 'graduatePrograms' ? 'graduate program' : 'student';
    
    if (window.confirm(`Are you sure you want to reset all ${dataTypeLabel} data to the original mock data? This cannot be undone.`)) {
      if (dataType === 'courses') {
        AdminService.resetCoursesToMockData();
      } else if (dataType === 'graduatePrograms') {
        AdminService.resetGraduateProgramsToMockData();
      } else {
        AdminService.resetToMockData();
      }
      onImportSuccess();
      setImportSuccess(`${dataTypeLabel.charAt(0).toUpperCase() + dataTypeLabel.slice(1)} data reset to original mock data`);
      setTimeout(() => setImportSuccess(''), 3000);
    }
  };

  const getDataTypeLabel = () => {
    switch (dataType) {
      case 'courses': return 'Course';
      case 'graduatePrograms': return 'Graduate Program';
      default: return 'Student';
    }
  };

  const getDataTypeLabelPlural = () => {
    switch (dataType) {
      case 'courses': return 'Courses';
      case 'graduatePrograms': return 'Graduate Programs';
      default: return 'Students';
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Export {getDataTypeLabel()} Data</h3>
        <p className="text-gray-600 mb-4">Download current student data in JSON or CSV format.</p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('json')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            📄 Export JSON ({students.length} students)
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
          >
            📊 Export CSV ({students.length} students)
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Import Student Data</h3>
        
        {/* File Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl">📤</div>
            <div>
              <p className="text-lg font-medium">Drop files here or click to browse</p>
              <p className="text-gray-500">Supports JSON and CSV files</p>
            </div>
            <input
              type="file"
              onChange={handleFileInput}
              accept=".json,.csv"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Choose File
            </label>
          </div>
        </div>

        {/* Manual Data Input */}
        <div className="mt-6">
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="format" className="text-sm font-medium text-gray-700">Format:</label>
            <select
              id="format"
              value={importFormat}
              onChange={(e) => setImportFormat(e.target.value as 'json' | 'csv')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder={importFormat === 'json' 
              ? 'Paste JSON data here...\n[\n  {\n    "name": "John Doe",\n    "email": "john@university.edu",\n    ...\n  }\n]'
              : 'Paste CSV data here...\nID,Name,Email,Current Credits,Total Credits,GPA,Semesters,Expected Graduation\nSTU001,John Doe,john@university.edu,85,120,3.7,6,Spring 2025'
            }
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        {/* Import Actions */}
        <div className="mt-4 flex space-x-3">
          <button
            onClick={handlePreviewImport}
            disabled={!importData.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            👀 Preview Import
          </button>
          {showPreview && (
            <button
              onClick={handleConfirmImport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
            >
              ✅ Confirm Import
            </button>
          )}
        </div>

        {/* Messages */}
        {importError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{importError}</p>
          </div>
        )}

        {importSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">{importSuccess}</p>
          </div>
        )}

        {/* Preview */}
        {showPreview && previewData.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h4 className="font-medium mb-2">Preview (first 5 records):</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1">Name</th>
                    <th className="text-left py-1">Email</th>
                    <th className="text-left py-1">Credits</th>
                    <th className="text-left py-1">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((student, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-1">{student.name}</td>
                      <td className="py-1">{student.email}</td>
                      <td className="py-1">{student.currentCredits}/{student.totalCreditsNeeded}</td>
                      <td className="py-1">{student.currentGPA}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Reset Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Reset to Mock Data</h3>
        <p className="text-yellow-700 mb-4">
          Reset all student data back to the original mock dataset. This will permanently delete any changes made during this session.
        </p>
        <button
          onClick={handleResetData}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm font-medium"
        >
          🔄 Reset to Original Data
        </button>
      </div>

      {/* POC Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">POC Demo Notes:</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>File uploads are simulated - data is parsed but not permanently stored</li>
          <li>All changes are lost on page refresh (no database persistence)</li>
          <li>Import validation checks data format and structure</li>
          <li>Export generates downloadable files with current session data</li>
        </ul>
      </div>
    </div>
  );
}
