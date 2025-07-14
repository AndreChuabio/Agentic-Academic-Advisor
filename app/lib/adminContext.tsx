'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student } from './types';

interface AdminContextType {
  isAdminMode: boolean;
  isAuthenticated: boolean;
  students: Student[];
  setIsAdminMode: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setStudents: (students: Student[]) => void;
  authenticate: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // POC hardcoded password

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const authenticate = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
  };

  const value: AdminContextType = {
    isAdminMode,
    isAuthenticated,
    students,
    setIsAdminMode,
    setIsAuthenticated,
    setStudents,
    authenticate,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
