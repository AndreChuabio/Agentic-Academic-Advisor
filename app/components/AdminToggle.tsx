'use client';

import { useState } from 'react';
import { useAdmin } from '../lib/adminContext';

export default function AdminToggle() {
  const { isAdminMode, isAuthenticated, setIsAdminMode, authenticate, logout } = useAdmin();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggleClick = () => {
    if (isAdminMode) {
      // Exit admin mode
      setIsAdminMode(false);
    } else if (isAuthenticated) {
      // Enter admin mode (already authenticated)
      setIsAdminMode(true);
    } else {
      // Show password modal
      setShowPasswordModal(true);
      setPassword('');
      setError('');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(password)) {
      setIsAdminMode(true);
      setShowPasswordModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
          >
            Logout
          </button>
        )}
        <button
          onClick={handleToggleClick}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            isAdminMode
              ? 'bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200'
              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          {isAdminMode ? '⚙️ Admin Mode ON' : '🔧 Admin'}
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Admin Authentication</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  autoFocus
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Enter Admin Mode
                </button>
              </div>
            </form>
            <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-600">
              <strong>POC Demo:</strong> Password is "admin123"
            </div>
          </div>
        </div>
      )}
    </>
  );
}
