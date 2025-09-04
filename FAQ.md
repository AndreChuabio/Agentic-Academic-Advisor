# AI Academic Advisor POC - Frequently Asked Questions

## Table of Contents
1. [General Overview](#general-overview)
2. [Student Risk Assessment](#student-risk-assessment)
3. [Course Recommendations](#course-recommendations)
4. [Graduate Programs](#graduate-programs)
5. [Specialization Tracks](#specialization-tracks)
6. [Post-Graduation Pathways](#post-graduation-pathways)
7. [Student-Specific Examples](#student-specific-examples)
8. [Technical Implementation](#technical-implementation)
9. [**NEW: Admin Management System**](#admin-management-system) 🆕
10. [**NEW: AI Academic Advisor Chat**](#ai-academic-advisor-chat) 🆕
11. [**NEW: Azure Deployment & Configuration**](#azure-deployment--configuration) 🆕
12. [**NEW: Data Import/Export Features**](#data-importexport-features) 🆕

---

## General Overview

### Q: What is the AI Academic Advisor POC?
**A:** This is a Proof of Concept (POC) demonstrating how artificial intelligence can help university students navigate their academic journey, prevent late graduations, and plan for post-graduation opportunities. It provides personalized guidance based on student performance, career goals, and academic progress.

**🆕 NEW: Admin Extension** - The POC now includes a comprehensive administrative interface for managing courses and graduate programs, plus an AI-powered chat advisor.

### Q: What data does the system use?
**A:** The POC uses mock data for 5 fictional students with realistic academic profiles:
- Stewart Johnson (High achiever, 3.7 GPA, Computer Science)
- Bob Smith (Struggling student, 2.1 GPA, Computer Science)
- Kevin Davis (Excellent student, 3.9 GPA, Data Science)
- Dave Wilson (Average student, 3.2 GPA, Business)
- Emma Brown (Below average, 2.8 GPA, Education)

---

## Student Risk Assessment

### Q: How is graduation risk calculated?
**A:** The risk assessment uses a weighted scoring system (0-100, lower is better) based on three main factors:

1. **Credit Progress Assessment (up to 40 points risk)**
   - Compares actual credits earned vs. expected progress based on semesters passed
   - Expected progress = (semesters passed / 8 semesters) × total credits needed
   - Behind by >10%: +40 risk points
   - Behind by <10%: +20 risk points

2. **GPA Assessment (up to 50 points risk)**
   - Below 2.0 GPA: +50 risk points (critical)
   - 2.0-2.5 GPA: +30 risk points (high risk)
   - 2.5-3.0 GPA: +10 risk points (moderate risk)

3. **Late Progress Penalty (up to 30 points risk)**
   - Students past 6 semesters with <60% credit completion: +30 risk points

**Risk Levels:**
- Green (0-30): Low risk, on track
- Yellow (31-60): Moderate risk, needs attention
- Red (61+): High risk, requires immediate intervention

### Q: Why does Bob Smith have a "Red" risk level?
**A:** Bob's risk calculation:
- Credit progress: 45/120 credits in 5 semesters = 37.5% vs expected 62.5% → +40 points
- GPA of 2.1 → +30 points
- **Total: 70 points = Red risk level**

---

## Course Recommendations

### Q: How does the system recommend courses?
**A:** Course recommendations are based on multiple factors:

1. **Career Goal Alignment**: Matches required/recommended courses for student's career goal
2. **Prerequisite Analysis**: Ensures student has completed prerequisites
3. **Academic Standing**: Adjusts difficulty based on GPA
4. **Graduate Preparation**: Includes prep courses for graduate school-interested students

### Q: Why does Stewart get different recommendations than Bob?
**A:** 
- **Stewart (3.7 GPA)**: Gets advanced courses like "Advanced Algorithms" because she meets prerequisites and can handle difficulty
- **Bob (2.1 GPA)**: Gets foundational courses and remedial support because he needs to strengthen basics first

---

## Graduate Programs

### Q: How are graduate program recommendations determined?
**A:** The system evaluates eligibility based on:

1. **GPA Requirements**: Each program has minimum GPA thresholds
2. **Prerequisite Courses**: Must complete required undergraduate courses
3. **Career Alignment**: Programs match student's career goals
4. **Academic Performance Trajectory**: Considers improvement trends

### Q: What graduate programs are available in the POC?
**A:** The system includes 8 graduate programs:
- MS in Computer Science (3.0 GPA required)
- MS in Data Science (3.2 GPA required)
- PhD in Computer Science (3.5 GPA required)
- MBA (3.0 GPA required)
- MS in Educational Leadership (2.8 GPA required)
- MS in Applied Statistics (3.0 GPA required)
- MS in Engineering Management (3.0 GPA required)
- PhD in Data Science and Analytics (3.7 GPA required)

### Q: How is admission chance calculated?
**A:** Admission chance uses a tiered system:

**High Chance:**
- GPA ≥ program minimum + 0.5
- All prerequisites completed
- Strong academic trajectory

**Medium Chance:**
- GPA meets minimum but < minimum + 0.3
- Most prerequisites completed
- Stable academic performance

**Low Chance:**
- GPA below minimum or just meets it
- Missing prerequisites
- Declining academic performance

---

## Specialization Tracks

### Q: How are specialization tracks determined?
**A:** Specializations are matched based on:

1. **Student's Major**: Inferred from completed courses
2. **GPA Eligibility**: Each track has minimum GPA requirements
3. **Foundation Courses**: Student must have related coursework
4. **Career Goals**: Alignment with desired career outcomes

### Q: What specializations are available?
**A:**
- AI and Robotics (CS, 3.2 GPA)
- Data Analytics (Stats, 3.0 GPA)
- Cybersecurity (CS, 3.0 GPA)
- Business Analytics (Business, 2.8 GPA)
- Education Leadership (Education, 3.0 GPA)
- Software Engineering (CS, 3.0 GPA)

---

## Post-Graduation Pathways

### Q: How does the system suggest post-graduation pathways?
**A:** Pathways are filtered and ranked based on:

1. **Eligibility Requirements**: GPA, completed courses, prerequisites
2. **Student Interests**: Declared post-graduation interests
3. **Academic Performance**: Better students get research/graduate options
4. **Career Alignment**: Pathways that support career goals

### Q: Why does Bob Smith specifically get internship suggestions?
**A:** Bob gets internship suggestions because:

1. **Low GPA (2.1)**: Below most graduate program requirements
2. **Post-grad interests**: His profile includes 'industry' and 'internship'
3. **Practical experience need**: Internships help build skills and confidence
4. **Eligibility match**: Research internship requires 3.0+ GPA (he doesn't qualify), but other internships may have lower requirements or focus on improvement

**Specific internship suggestions for Bob:**
- **Research Internship Program**: Shown but marked as "Needs Improvement" because his GPA is below the 3.0 requirement
- **Education Policy Internship**: May be suggested as it has lower GPA requirements (2.8+) and provides alternative career path exploration

### Q: What types of pathways are available?
**A:**
1. **Graduate Programs**: Direct admission to advanced degrees
2. **Exchange Programs**: International study opportunities
3. **Internships**: Hands-on professional experience
4. **Specialized Certifications**: Professional development programs

---

## Student-Specific Examples

### Q: How does the system work for each demo student?

**Stewart Johnson (High Achiever)**
- Risk: Green (low risk)
- Recommendations: Advanced courses, graduate school prep
- Graduate Programs: Eligible for MS/PhD in Computer Science
- Pathways: Research opportunities, accelerated graduate entry

**Bob Smith (Struggling Student)**
- Risk: Red (high risk)
- Recommendations: Foundational courses, tutoring support
- Graduate Programs: Currently ineligible, needs GPA improvement
- Pathways: Internships for practical experience, skill building

**Kevin Davis (Excellent Student)**
- Risk: Green (excellent progress)
- Recommendations: Advanced analytics courses
- Graduate Programs: Eligible for PhD programs
- Pathways: Research internships, accelerated programs

**Dave Wilson (Business Student)**
- Risk: Yellow (moderate)
- Recommendations: Business analytics courses
- Graduate Programs: MBA eligible
- Pathways: Business internships, exchange programs

**Emma Brown (Education Major)**
- Risk: Yellow (behind on credits)
- Recommendations: Core education courses
- Graduate Programs: Educational leadership programs
- Pathways: Policy internships, certification programs

---

## Technical Implementation

### Q: How are the calculations performed?
**A:** The system uses several TypeScript services:

1. **AcademicAdvisorService**: Core risk assessment and recommendations
2. **GraduateProgramService**: Graduate program eligibility and matching
3. **SpecializationService**: Specialization track recommendations
4. **GPTAdvisoryService**: AI-powered academic advice **NEW**
5. **AdminService**: Administrative data management **NEW**
6. **API Endpoints**: RESTful services for data retrieval

### Q: How real-time is the data?
**A:** This is a POC with static mock data. In a production system, data would be:
- Real-time student records
- Live course catalogs
- Current program requirements
- Dynamic eligibility calculations

### Q: How does the system ensure privacy?
**A:** The POC uses:
- Anonymized university names ("International Tech University")
- Fictional student data
- Generic partner institution names
- No real personal information

### Q: Can the system handle different academic calendars?
**A:** The current POC assumes:
- 8-semester undergraduate program
- 120 total credits for graduation
- Semester-based system
- Spring/Fall graduation cycles

Production versions would support various academic structures.

---

## 🆕 Admin Management System

### Q: What is the Admin Management System?
**A:** A comprehensive administrative interface added in the latest update that allows university staff to manage institutional data through a secure, user-friendly interface.

### Q: How do I access Admin Mode?
**A:** 
1. Click the "Admin" toggle button in the top navigation
2. Enter the admin password (`admin123` for POC)
3. The interface will switch to admin mode with an orange header bar

### Q: What can I do in Admin Mode?
**A:** The admin interface provides four main sections:

**👥 Students Management:**
- View all student records in a sortable table
- Add new students with comprehensive form validation
- Edit existing student information inline
- Delete student records (with confirmation)
- Export student data to CSV/JSON

**📚 Course Management:**
- View and manage course catalog
- Add new courses with prerequisite tracking
- Edit course information and requirements
- Delete courses from catalog
- Manage course difficulty levels and credit hours

**🎓 Graduate Program Management:**
- Manage MS and PhD programs
- Set admission requirements and GPA thresholds
- Configure required courses for each program
- Track application deadlines and start dates
- Manage program descriptions and durations

**📤 Data Import/Export:**
- Bulk import data via CSV files
- Download CSV templates for proper formatting
- Export current data for backup
- Reset to original mock data

### Q: Is admin mode data persistent?
**A:** No, the admin mode operates on runtime-only data for POC purposes. All changes are lost when the application restarts. This is a safety feature to prevent data corruption during demos.

### Q: What validation is performed on admin data?
**A:** Comprehensive validation includes:
- **Student data**: Name, email format, GPA ranges (0-4.0), credit limits
- **Course data**: Course codes, credit hours (1-6), difficulty levels
- **Graduate programs**: GPA requirements (2.0-4.0), valid degree types (MS/PhD)
- **File imports**: CSV format validation, data integrity checks

---

## 🆕 AI Academic Advisor Chat

### Q: What is the AI Academic Advisor Chat feature?
**A:** An interactive chat interface where students can have natural conversations with "Dr. Sarah Chen," an AI-powered academic advisor that provides personalized guidance.

### Q: How does the AI advisor work?
**A:** The AI advisor:
- Uses Azure OpenAI (GPT-4) for natural language processing
- Maintains conversation context across multiple exchanges
- Provides personalized advice based on student academic profiles
- Suggests relevant follow-up questions
- Integrates with risk assessment and recommendation systems

### Q: What kind of questions can I ask the AI advisor?
**A:** Students can ask about:
- Course selection and planning
- Graduation timeline concerns
- Career guidance and preparation
- Graduate school readiness
- Academic improvement strategies
- Prerequisite planning
- GPA improvement advice

### Q: How does the AI advisor know about student information?
**A:** The AI advisor accesses:
- Student academic records (GPA, completed courses, credits)
- Risk assessment data
- Career goals and interests
- Graduate school aspirations
- Current semester progress

### Q: What happens if the AI service is unavailable?
**A:** The system provides graceful fallbacks:
- Displays friendly error messages
- Suggests contacting the advisor during office hours
- Provides default suggested questions
- Maintains conversation history when service resumes

### Q: Is the AI advisor available 24/7?
**A:** In the POC, the AI advisor is available whenever the application is running and Azure OpenAI API is accessible. Production systems would have monitoring and availability guarantees.

---

## 🆕 Azure Deployment & Configuration

### Q: Is the system deployed to Azure?
**A:** Yes, the POC has been configured for Azure App Service deployment with integrated Azure OpenAI services.

### Q: What Azure services are used?
**A:** The current configuration includes:
- **Azure App Service**: Web application hosting
- **Azure OpenAI**: AI-powered chat advisor functionality
- **Azure Key Vault**: Secure configuration management (environment variables)

### Q: How is the Azure OpenAI integration configured?
**A:** The integration uses:
- Azure OpenAI endpoint: `https://palo-sg-presales.openai.azure.com`
- GPT-4.1-mini deployment for chat responses
- API version 2024-02-01
- Environment variable configuration for security

### Q: What environment variables are required for deployment?
**A:** Key environment variables:
```
OPENAI_API_KEY or AZURE_OPENAI_KEY
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_DEPLOYMENT_NAME
AZURE_OPENAI_API_VERSION
```

### Q: How does the system handle Azure API failures?
**A:** The system includes:
- Graceful error handling for API timeouts
- Fallback responses when Azure OpenAI is unavailable
- User-friendly error messages
- Automatic retry mechanisms for transient failures

### Q: What are the deployment requirements?
**A:** For Azure deployment:
- Node.js 18+ runtime
- Next.js 15 framework support
- Environment variable configuration
- Azure OpenAI service access
- App Service with appropriate pricing tier

---

## 🆕 Data Import/Export Features

### Q: What data import/export capabilities are available?
**A:** The enhanced data management system supports:

**Import Features:**
- CSV file upload for students, courses, and graduate programs
- Template download for proper formatting
- Real-time validation during import
- Error reporting with detailed feedback
- Batch processing with success/error counts

**Export Features:**
- CSV export of all data types
- JSON export for student data
- Downloadable templates for import formatting
- Data backup capabilities

### Q: What CSV format is required for imports?
**A:** Each data type has specific formats:

**Students CSV:**
```
id,name,email,year,major,gpa,completedCourses
STU001,John Doe,john.doe@email.com,3,Computer Science,3.5,CS101;CS102
```

**Courses CSV:**
```
code,title,credits,department,prerequisites,description,difficulty
CS101,Introduction to Computer Science,3,Computer Science,,Basic programming,Easy
```

**Graduate Programs CSV:**
```
title,degree,department,description,duration,minGPA,requiredCourses,applicationDeadline,startDate
Master of Computer Science,MS,Computer Science,Advanced CS program,2 years,3.0,CS501;CS502,2024-03-15,2024-08-15
```

### Q: How does the template download feature work?
**A:** Templates provide:
- Proper CSV headers for each data type
- Example data rows for reference
- Correct formatting for array fields (semicolon-separated)
- Validation-ready formats

### Q: What happens during data import validation?
**A:** The system validates:
- CSV format and structure
- Required fields presence
- Data type correctness (numbers, emails, dates)
- Value ranges (GPA 0-4.0, credits 1-6)
- Array field formatting (prerequisites, completed courses)

### Q: Can I reset data to original state?
**A:** Yes, the reset functionality:
- Restores original mock data for any data type
- Provides confirmation dialogs for safety
- Works independently for students, courses, and graduate programs
- Takes effect immediately (runtime only)

---

## Algorithmic Details

### Q: How does prerequisite checking work?
**A:** The system:
1. Maps course dependencies
2. Validates completed prerequisites
3. Suggests prerequisite courses when missing
4. Prevents advanced course recommendations without foundations

### Q: How does the GPA trend analysis work?
**A:** While not fully implemented in this POC, the system could:
1. Track semester-by-semester GPA changes
2. Identify improvement or decline patterns
3. Adjust recommendations based on trends
4. Provide early warnings for declining performance

### Q: How are career outcomes predicted?
**A:** The system matches:
1. Student's completed and planned courses
2. Career requirements and recommendations
3. Industry demand and growth statistics
4. Salary and advancement potential data

### Q: How does the AI conversation system work?
**A:** The AI advisor system:
1. Maintains conversation context across multiple exchanges
2. Uses student academic profile for personalized responses
3. Integrates risk assessment and recommendation data
4. Provides contextually relevant suggested questions
5. Handles conversation flow naturally without repetitive greetings

---

## Future Enhancements

### Q: What features could be added?
**A:** Potential enhancements include:
- Real-time grade integration
- Machine learning-based predictions
- Peer comparison analytics
- Industry partnership integration
- Alumni outcome tracking
- Mobile application
- **Advanced AI features** (voice interaction, multilingual support) 🆕
- **Real-time collaboration** (shared planning sessions) 🆕
- **Integration APIs** (SIS, LMS, career services) 🆕

### Q: How would this scale for a real university?
**A:** Production implementation would require:
- Integration with Student Information Systems
- Real course catalog and scheduling data
- Faculty advisor workflow integration
- Compliance with academic regulations
- Performance monitoring and analytics
- Privacy and security measures
- Multi-campus support
- **Azure enterprise-grade infrastructure** 🆕
- **Advanced AI model training** on institutional data 🆕
- **Real-time data synchronization** across systems 🆕

### Q: What are the next development priorities?
**A:** Based on the current POC success:

**Phase 1 (Immediate):**
- Database persistence layer
- User authentication system
- Enhanced AI conversation capabilities
- Real-time data integration

**Phase 2 (Short-term):**
- Mobile application development
- Advanced analytics dashboard
- Machine learning model implementation
- External system integrations

**Phase 3 (Long-term):**
- Multi-university platform
- Advanced AI features
- Predictive analytics at scale
- Enterprise security compliance

---

## Security & Compliance

### Q: How is data security handled in the POC?
**A:** Current security measures:
- Admin mode password protection
- Runtime-only data storage (no persistence)
- Environment variable configuration for API keys
- Input validation and sanitization
- Error handling without data exposure

### Q: What would production security include?
**A:** Production security would add:
- Multi-factor authentication
- Role-based access control
- Data encryption at rest and in transit
- FERPA compliance measures
- Audit logging and monitoring
- Regular security assessments
- Azure security center integration

---

## Performance & Monitoring

### Q: How does the system perform with multiple users?
**A:** The POC is designed for demo purposes with:
- Client-side state management
- API rate limiting awareness
- Graceful error handling
- Responsive UI design

### Q: What monitoring is available?
**A:** Current monitoring includes:
- Console logging for debugging
- Error reporting in the UI
- API response status tracking

### Q: What would production monitoring include?
**A:** Production monitoring would add:
- Azure Application Insights integration
- Real-time performance metrics
- User engagement analytics
- System health dashboards
- Automated alerting
- Usage pattern analysis

---

*This FAQ covers the complete functionality of the AI Academic Advisor POC including all recent updates. For technical questions or additional details about new features, please refer to the codebase documentation, admin interface help text, or contact the development team.*

**Latest Update:** January 2025 - Added Admin Management System, AI Academic Advisor Chat, Azure Deployment Configuration, and Enhanced Data Import/Export Features.
