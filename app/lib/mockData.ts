import { Student, Course, Career } from './types';

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    currentCredits: 85,
    totalCreditsNeeded: 120,
    currentGPA: 3.7,
    semestersPassed: 6,
    expectedGraduation: 'Spring 2026',
    completedCourses: ['CS101', 'CS201', 'MATH101', 'MATH201', 'ENG101', 'PHY101'],
    careerGoal: 'software-engineer'
  },
  {
    id: 'STU002',
    name: 'Bob Smith',
    email: 'bob.smith@university.edu',
    currentCredits: 45,
    totalCreditsNeeded: 120,
    currentGPA: 2.1,
    semestersPassed: 5,
    expectedGraduation: 'Fall 2026',
    completedCourses: ['CS101', 'MATH101', 'ENG101'],
    careerGoal: 'software-engineer'
  },
  {
    id: 'STU003',
    name: 'Carol Davis',
    email: 'carol.davis@university.edu',
    currentCredits: 95,
    totalCreditsNeeded: 120,
    currentGPA: 3.9,
    semestersPassed: 7,
    expectedGraduation: 'Spring 2025',
    completedCourses: ['STAT101', 'STAT201', 'MATH101', 'MATH201', 'CS101', 'CS201', 'ENG101'],
    careerGoal: 'data-scientist'
  },
  {
    id: 'STU004',
    name: 'David Wilson',
    email: 'david.wilson@university.edu',
    currentCredits: 60,
    totalCreditsNeeded: 120,
    currentGPA: 3.2,
    semestersPassed: 4,
    expectedGraduation: 'Fall 2025',
    completedCourses: ['BUS101', 'BUS201', 'MATH101', 'ENG101', 'ECON101'],
    careerGoal: 'business-analyst'
  },
  {
    id: 'STU005',
    name: 'Emma Brown',
    email: 'emma.brown@university.edu',
    currentCredits: 30,
    totalCreditsNeeded: 120,
    currentGPA: 2.8,
    semestersPassed: 6,
    expectedGraduation: 'Spring 2027',
    completedCourses: ['EDU101', 'ENG101', 'MATH101'],
    careerGoal: 'teacher'
  }
];

// Mock Courses Data
export const mockCourses: Course[] = [
  // Computer Science
  {
    id: 'CS101',
    code: 'CS 101',
    title: 'Introduction to Programming',
    credits: 3,
    department: 'Computer Science',
    prerequisites: [],
    description: 'Basic programming concepts using Python',
    difficulty: 'Easy'
  },
  {
    id: 'CS201',
    code: 'CS 201',
    title: 'Data Structures',
    credits: 3,
    department: 'Computer Science',
    prerequisites: ['CS101'],
    description: 'Arrays, linked lists, trees, and algorithms',
    difficulty: 'Medium'
  },
  {
    id: 'CS301',
    code: 'CS 301',
    title: 'Advanced Algorithms',
    credits: 3,
    department: 'Computer Science',
    prerequisites: ['CS201'],
    description: 'Complex algorithms and optimization',
    difficulty: 'Hard'
  },
  {
    id: 'CS401',
    code: 'CS 401',
    title: 'Software Engineering',
    credits: 3,
    department: 'Computer Science',
    prerequisites: ['CS201'],
    description: 'Software development lifecycle and project management',
    difficulty: 'Medium'
  },
  
  // Mathematics
  {
    id: 'MATH101',
    code: 'MATH 101',
    title: 'Calculus I',
    credits: 4,
    department: 'Mathematics',
    prerequisites: [],
    description: 'Limits, derivatives, and basic integration',
    difficulty: 'Medium'
  },
  {
    id: 'MATH201',
    code: 'MATH 201',
    title: 'Calculus II',
    credits: 4,
    department: 'Mathematics',
    prerequisites: ['MATH101'],
    description: 'Advanced integration and series',
    difficulty: 'Medium'
  },
  
  // Statistics
  {
    id: 'STAT101',
    code: 'STAT 101',
    title: 'Introduction to Statistics',
    credits: 3,
    department: 'Statistics',
    prerequisites: ['MATH101'],
    description: 'Descriptive and inferential statistics',
    difficulty: 'Easy'
  },
  {
    id: 'STAT201',
    code: 'STAT 201',
    title: 'Statistical Analysis',
    credits: 3,
    department: 'Statistics',
    prerequisites: ['STAT101'],
    description: 'Advanced statistical methods and data analysis',
    difficulty: 'Medium'
  },
  
  // Business
  {
    id: 'BUS101',
    code: 'BUS 101',
    title: 'Introduction to Business',
    credits: 3,
    department: 'Business',
    prerequisites: [],
    description: 'Fundamentals of business operations',
    difficulty: 'Easy'
  },
  {
    id: 'BUS201',
    code: 'BUS 201',
    title: 'Business Analysis',
    credits: 3,
    department: 'Business',
    prerequisites: ['BUS101'],
    description: 'Data-driven business decision making',
    difficulty: 'Medium'
  },
  
  // Education
  {
    id: 'EDU101',
    code: 'EDU 101',
    title: 'Introduction to Education',
    credits: 3,
    department: 'Education',
    prerequisites: [],
    description: 'Teaching principles and classroom management',
    difficulty: 'Easy'
  },
  {
    id: 'EDU201',
    code: 'EDU 201',
    title: 'Educational Psychology',
    credits: 3,
    department: 'Education',
    prerequisites: ['EDU101'],
    description: 'Learning theories and student development',
    difficulty: 'Medium'
  },
  
  // General Education
  {
    id: 'ENG101',
    code: 'ENG 101',
    title: 'English Composition',
    credits: 3,
    department: 'English',
    prerequisites: [],
    description: 'Writing and communication skills',
    difficulty: 'Easy'
  },
  {
    id: 'PHY101',
    code: 'PHY 101',
    title: 'Physics I',
    credits: 4,
    department: 'Physics',
    prerequisites: ['MATH101'],
    description: 'Mechanics and thermodynamics',
    difficulty: 'Medium'
  },
  {
    id: 'ECON101',
    code: 'ECON 101',
    title: 'Microeconomics',
    credits: 3,
    department: 'Economics',
    prerequisites: [],
    description: 'Supply, demand, and market economics',
    difficulty: 'Easy'
  }
];

// Mock Careers Data
export const mockCareers: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications',
    requiredCourses: ['CS101', 'CS201', 'CS301', 'CS401', 'MATH101'],
    recommendedCourses: ['MATH201', 'STAT101', 'PHY101'],
    averageSalary: 95000,
    jobGrowth: '22% (Much faster than average)'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make decisions',
    requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'MATH101', 'MATH201'],
    recommendedCourses: ['CS301', 'BUS201'],
    averageSalary: 105000,
    jobGrowth: '35% (Much faster than average)'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Evaluate business processes and recommend improvements',
    requiredCourses: ['BUS101', 'BUS201', 'STAT101', 'ECON101'],
    recommendedCourses: ['CS101', 'MATH101'],
    averageSalary: 75000,
    jobGrowth: '14% (Faster than average)'
  },
  {
    id: 'teacher',
    title: 'High School Teacher',
    description: 'Educate and inspire students in secondary education',
    requiredCourses: ['EDU101', 'EDU201', 'ENG101'],
    recommendedCourses: ['MATH101', 'STAT101'],
    averageSalary: 55000,
    jobGrowth: '8% (As fast as average)'
  },
  {
    id: 'nurse',
    title: 'Registered Nurse',
    description: 'Provide healthcare and support to patients',
    requiredCourses: ['BIO101', 'CHEM101', 'NURS101', 'NURS201'],
    recommendedCourses: ['STAT101', 'PSY101'],
    averageSalary: 70000,
    jobGrowth: '9% (Faster than average)'
  }
];
