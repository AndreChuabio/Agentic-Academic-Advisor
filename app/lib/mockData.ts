import { Student, Course, Career, GraduateProgram, SpecializationTrack, PostGradPathway } from './types';

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Stewart Johnson',
    email: 'Stewart.johnson@university.edu',
    currentCredits: 85,
    totalCreditsNeeded: 120,
    currentGPA: 3.7,
    semestersPassed: 6,
    expectedGraduation: 'Spring 2026',
    completedCourses: ['CS101', 'CS201', 'MATH101', 'MATH201', 'ENG101', 'PHY101'],
    careerGoal: 'software-engineer',
    interestedInGradSchool: true,
    postGradInterest: ['graduate-school', 'research'],
    specializations: ['ai-robotics']
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
    careerGoal: 'software-engineer',
    interestedInGradSchool: false,
    postGradInterest: ['industry', 'internship'],
    specializations: []
  },
  {
    id: 'STU003',
    name: 'Kevin Davis',
    email: 'Kevin.davis@university.edu',
    currentCredits: 95,
    totalCreditsNeeded: 120,
    currentGPA: 3.9,
    semestersPassed: 7,
    expectedGraduation: 'Spring 2025',
    completedCourses: ['STAT101', 'STAT201', 'MATH101', 'MATH201', 'CS101', 'CS201', 'ENG101'],
    careerGoal: 'data-scientist',
    interestedInGradSchool: true,
    postGradInterest: ['graduate-school', 'research', 'phd'],
    specializations: ['data-analytics']
  },
  {
    id: 'STU004',
    name: 'Dave Wilson',
    email: 'dave.wilson@university.edu',
    currentCredits: 60,
    totalCreditsNeeded: 120,
    currentGPA: 3.2,
    semestersPassed: 4,
    expectedGraduation: 'Fall 2025',
    completedCourses: ['BUS101', 'BUS201', 'MATH101', 'ENG101', 'ECON101'],
    careerGoal: 'business-analyst',
    interestedInGradSchool: true,
    postGradInterest: ['graduate-school', 'mba'],
    specializations: ['business-analytics']
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
    careerGoal: 'teacher',
    interestedInGradSchool: true,
    postGradInterest: ['graduate-school', 'certification'],
    specializations: ['education-leadership']
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
    jobGrowth: '22% (Much faster than average)',
    graduatePrograms: [
      { id: 'GRAD001', title: 'Master of Science in Computer Science', degree: 'MS', department: 'Computer Science', description: 'Advanced study in algorithms, software engineering, and emerging technologies', duration: '2 years', minGPA: 3.0, requiredCourses: ['CS101', 'CS201', 'CS301', 'MATH101', 'MATH201'], applicationDeadline: 'March 1st', startDate: 'Fall Semester', anonymizedPartner: 'Advanced Computing Institute' },
      { id: 'GRAD007', title: 'Master of Science in Engineering Management', degree: 'MS', department: 'Engineering', description: 'Bridge technical expertise with business and management skills', duration: '18 months', minGPA: 3.0, requiredCourses: ['MATH101', 'PHY101', 'BUS101'], applicationDeadline: 'February 1st', startDate: 'Fall or Spring Semester', anonymizedPartner: 'Engineering Leadership Academy' }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make decisions',
    requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'MATH101', 'MATH201'],
    recommendedCourses: ['CS301', 'BUS201'],
    averageSalary: 105000,
    jobGrowth: '35% (Much faster than average)',
    graduatePrograms: [
      { id: 'GRAD002', title: 'Master of Science in Data Science', degree: 'MS', department: 'Statistics & Computer Science', description: 'Interdisciplinary program combining statistics, machine learning, and big data analytics', duration: '2 years', minGPA: 3.2, requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'MATH101', 'MATH201'], applicationDeadline: 'February 15th', startDate: 'Fall Semester', anonymizedPartner: 'Metropolitan Data Analytics Center' },
      { id: 'GRAD008', title: 'PhD in Data Science and Analytics', degree: 'PhD', department: 'Statistics & Computer Science', description: 'Research doctoral program in advanced analytics and machine learning', duration: '4-5 years', minGPA: 3.7, requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'CS301', 'MATH101', 'MATH201'], applicationDeadline: 'January 15th', startDate: 'Fall Semester', anonymizedPartner: 'International Analytics Research Center' }
    ]
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Evaluate business processes and recommend improvements',
    requiredCourses: ['BUS101', 'BUS201', 'STAT101', 'ECON101'],
    recommendedCourses: ['CS101', 'MATH101'],
    averageSalary: 75000,
    jobGrowth: '14% (Faster than average)',
    graduatePrograms: [
      { id: 'GRAD004', title: 'Master of Business Administration (MBA)', degree: 'MS', department: 'Business', description: 'Comprehensive business leadership and management program', duration: '2 years', minGPA: 3.0, requiredCourses: ['BUS101', 'BUS201', 'ECON101', 'STAT101'], applicationDeadline: 'April 1st', startDate: 'Fall or Spring Semester', anonymizedPartner: 'Global Business Institute' }
    ]
  },
  {
    id: 'teacher',
    title: 'High School Teacher',
    description: 'Educate and inspire students in secondary education',
    requiredCourses: ['EDU101', 'EDU201', 'ENG101'],
    recommendedCourses: ['MATH101', 'STAT101'],
    averageSalary: 55000,
    jobGrowth: '8% (As fast as average)',
    graduatePrograms: [
      { id: 'GRAD005', title: 'Master of Education in Educational Leadership', degree: 'MS', department: 'Education', description: 'Advanced preparation for educational administrators and policy leaders', duration: '2 years', minGPA: 2.8, requiredCourses: ['EDU101', 'EDU201', 'ENG101'], applicationDeadline: 'June 1st', startDate: 'Fall or Summer Semester', anonymizedPartner: 'National Education Excellence Center' }
    ]
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

// Mock Graduate Programs Data
export const mockGraduatePrograms: GraduateProgram[] = [
  {
    id: 'GRAD001',
    title: 'Master of Science in Computer Science',
    degree: 'MS',
    department: 'Computer Science',
    description: 'Advanced study in algorithms, software engineering, and emerging technologies',
    duration: '2 years',
    minGPA: 3.0,
    requiredCourses: ['CS101', 'CS201', 'CS301', 'MATH101', 'MATH201'],
    applicationDeadline: 'March 1st',
    startDate: 'Fall Semester',
    anonymizedPartner: 'Advanced Computing Institute'
  },
  {
    id: 'GRAD002',
    title: 'Master of Science in Data Science',
    degree: 'MS',
    department: 'Statistics & Computer Science',
    description: 'Interdisciplinary program combining statistics, machine learning, and big data analytics',
    duration: '2 years',
    minGPA: 3.2,
    requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'MATH101', 'MATH201'],
    applicationDeadline: 'February 15th',
    startDate: 'Fall Semester',
    anonymizedPartner: 'Metropolitan Data Analytics Center'
  },
  {
    id: 'GRAD003',
    title: 'PhD in Computer Science',
    degree: 'PhD',
    department: 'Computer Science',
    description: 'Research-focused doctoral program in advanced computing and artificial intelligence',
    duration: '4-6 years',
    minGPA: 3.5,
    requiredCourses: ['CS101', 'CS201', 'CS301', 'CS401', 'MATH101', 'MATH201'],
    applicationDeadline: 'December 15th',
    startDate: 'Fall Semester',
    anonymizedPartner: 'International Research Consortium'
  },
  {
    id: 'GRAD004',
    title: 'Master of Business Administration (MBA)',
    degree: 'MS',
    department: 'Business',
    description: 'Comprehensive business leadership and management program',
    duration: '2 years',
    minGPA: 3.0,
    requiredCourses: ['BUS101', 'BUS201', 'ECON101', 'STAT101'],
    applicationDeadline: 'April 1st',
    startDate: 'Fall or Spring Semester',
    anonymizedPartner: 'Global Business Institute'
  },
  {
    id: 'GRAD005',
    title: 'Master of Education in Educational Leadership',
    degree: 'MS',
    department: 'Education',
    description: 'Advanced preparation for educational administrators and policy leaders',
    duration: '2 years',
    minGPA: 2.8,
    requiredCourses: ['EDU101', 'EDU201', 'ENG101'],
    applicationDeadline: 'June 1st',
    startDate: 'Fall or Summer Semester',
    anonymizedPartner: 'National Education Excellence Center'
  },
  {
    id: 'GRAD006',
    title: 'Master of Science in Applied Statistics',
    degree: 'MS',
    department: 'Statistics',
    description: 'Applied statistical methods for industry and research applications',
    duration: '2 years',
    minGPA: 3.0,
    requiredCourses: ['STAT101', 'STAT201', 'MATH101', 'MATH201'],
    applicationDeadline: 'March 15th',
    startDate: 'Fall Semester',
    anonymizedPartner: 'Statistical Research Institute'
  },
  {
    id: 'GRAD007',
    title: 'Master of Science in Engineering Management',
    degree: 'MS',
    department: 'Engineering',
    description: 'Bridge technical expertise with business and management skills',
    duration: '18 months',
    minGPA: 3.0,
    requiredCourses: ['MATH101', 'PHY101', 'BUS101'],
    applicationDeadline: 'February 1st',
    startDate: 'Fall or Spring Semester',
    anonymizedPartner: 'Engineering Leadership Academy'
  },
  {
    id: 'GRAD008',
    title: 'PhD in Data Science and Analytics',
    degree: 'PhD',
    department: 'Statistics & Computer Science',
    description: 'Research doctoral program in advanced analytics and machine learning',
    duration: '4-5 years',
    minGPA: 3.7,
    requiredCourses: ['STAT101', 'STAT201', 'CS101', 'CS201', 'CS301', 'MATH101', 'MATH201'],
    applicationDeadline: 'January 15th',
    startDate: 'Fall Semester',
    anonymizedPartner: 'International Analytics Research Center'
  }
];

// Mock Specialization Tracks Data
export const mockSpecializationTracks: SpecializationTrack[] = [
  {
    id: 'SPEC001',
    name: 'AI and Robotics',
    department: 'Computer Science',
    additionalCourses: ['CS401', 'CS501', 'MATH301'],
    minGPA: 3.2,
    careerOutcomes: ['AI Engineer', 'Robotics Specialist', 'Machine Learning Engineer'],
    description: 'Focus on artificial intelligence, machine learning, and robotic systems'
  },
  {
    id: 'SPEC002',
    name: 'Data Analytics',
    department: 'Statistics',
    additionalCourses: ['STAT301', 'CS301', 'BUS301'],
    minGPA: 3.0,
    careerOutcomes: ['Data Analyst', 'Business Intelligence Analyst', 'Research Analyst'],
    description: 'Advanced data analysis techniques and business intelligence applications'
  },
  {
    id: 'SPEC003',
    name: 'Cybersecurity',
    department: 'Computer Science',
    additionalCourses: ['CS401', 'CS501', 'CS601'],
    minGPA: 3.0,
    careerOutcomes: ['Security Analyst', 'Cybersecurity Specialist', 'Information Security Manager'],
    description: 'Network security, cryptography, and information assurance'
  },
  {
    id: 'SPEC004',
    name: 'Business Analytics',
    department: 'Business',
    additionalCourses: ['BUS301', 'STAT201', 'CS201'],
    minGPA: 2.8,
    careerOutcomes: ['Business Analyst', 'Operations Research Analyst', 'Market Research Analyst'],
    description: 'Business intelligence, process optimization, and strategic analytics'
  },
  {
    id: 'SPEC005',
    name: 'Education Leadership',
    department: 'Education',
    additionalCourses: ['EDU301', 'EDU401', 'PSY201'],
    minGPA: 3.0,
    careerOutcomes: ['School Administrator', 'Curriculum Specialist', 'Education Policy Analyst'],
    description: 'Educational administration, curriculum development, and policy analysis'
  },
  {
    id: 'SPEC006',
    name: 'Software Engineering',
    department: 'Computer Science',
    additionalCourses: ['CS301', 'CS401', 'CS501'],
    minGPA: 3.0,
    careerOutcomes: ['Senior Software Engineer', 'Software Architect', 'Technical Lead'],
    description: 'Advanced software design, architecture, and project management'
  }
];

// Mock Post-Grad Pathways Data
export const mockPostGradPathways: PostGradPathway[] = [
  {
    id: 'PATH001',
    type: 'graduate',
    title: 'Graduate School Preparation',
    description: 'Structured pathway to prepare for advanced degree programs',
    eligibilityRequirements: ['3.0+ GPA', 'Complete prerequisite courses', 'Faculty recommendation'],
    timeline: '6-12 months preparation',
    benefits: ['Enhanced career prospects', 'Research opportunities', 'Higher earning potential']
  },
  {
    id: 'PATH002',
    type: 'exchange',
    title: 'International Engineering Exchange',
    description: 'Semester abroad at partner engineering institutions',
    eligibilityRequirements: ['3.2+ GPA', 'Completed core engineering courses', 'Language proficiency'],
    timeline: '1 semester (4-6 months)',
    benefits: ['Global perspective', 'Cultural immersion', 'International networking'],
    anonymizedPartner: 'International Engineering Consortium'
  },
  {
    id: 'PATH003',
    type: 'internship',
    title: 'Research Internship Program',
    description: 'Hands-on research experience with industry partners',
    eligibilityRequirements: ['3.0+ GPA', 'Relevant coursework', 'Faculty sponsor'],
    timeline: '3-6 months',
    benefits: ['Real-world experience', 'Industry connections', 'Potential job offers']
  },
  {
    id: 'PATH004',
    type: 'exchange',
    title: 'Business Innovation Exchange',
    description: 'International business program focusing on innovation and entrepreneurship',
    eligibilityRequirements: ['3.0+ GPA', 'Business foundation courses', 'English proficiency'],
    timeline: '1 semester (4-5 months)',
    benefits: ['Entrepreneurial skills', 'Global business network', 'Innovation experience'],
    anonymizedPartner: 'Global Innovation Institute'
  },
  {
    id: 'PATH005',
    type: 'internship',
    title: 'Education Policy Internship',
    description: 'Work with education policy organizations and government agencies',
    eligibilityRequirements: ['Education major', '2.8+ GPA', 'Policy coursework'],
    timeline: '3-4 months',
    benefits: ['Policy experience', 'Government connections', 'Social impact career path']
  },
  {
    id: 'PATH006',
    type: 'graduate',
    title: 'Accelerated Graduate Entry',
    description: 'Fast-track admission to select graduate programs for high achievers',
    eligibilityRequirements: ['3.5+ GPA', 'Outstanding recommendations', 'Research experience'],
    timeline: 'Direct admission',
    benefits: ['Reduced application stress', 'Early admission guarantee', 'Scholarship opportunities']
  }
];
