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

---

## General Overview

### Q: What is the AI Academic Advisor POC?
**A:** This is a Proof of Concept (POC) demonstrating how artificial intelligence can help university students navigate their academic journey, prevent late graduations, and plan for post-graduation opportunities. It provides personalized guidance based on student performance, career goals, and academic progress.

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
4. **API Endpoints**: RESTful services for data retrieval

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
- Chatbot advisor interface
- Parent/advisor dashboards

### Q: How would this scale for a real university?
**A:** Production implementation would require:
- Integration with Student Information Systems
- Real course catalog and scheduling data
- Faculty advisor workflow integration
- Compliance with academic regulations
- Performance monitoring and analytics
- Privacy and security measures
- Multi-campus support

---

*This FAQ covers the core functionality of the AI Academic Advisor POC. For technical questions or additional details, please refer to the codebase documentation or contact the development team.*
