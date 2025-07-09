# POC Feature: Simple Career Course Recommendations Demo

## Status: 🟡 POC/DEMO VERSION

## User Story (SIMPLIFIED)
**As a** student,
**I want** to select my career goal and see relevant course recommendations,
**so that** I can plan my coursework for my target career.

## POC Scope (BARE MINIMUM)
- **Input**: Career selection from dropdown
- **Output**: List of recommended courses with simple explanations
- **Demo Goal**: Show career-to-course mapping works

## Simplified Technical Requirements

### Basic Package Structure (MINIMAL)
```
src/main/java/com/academicadvisor/
├── controller/
│   └── CareerController.java           # Single REST controller 🟡
├── service/
│   └── CareerService.java              # Basic recommendation logic 🟡
├── model/
│   ├── Career.java                     # Simple career entity 🟡
│   ├── Course.java                     # Course entity 🟡
│   └── Recommendation.java             # Recommendation result 🟡
└── dto/
    └── RecommendationResponse.java     # API response 🟡
```

## POC Implementation Tasks (SUPER SIMPLE)

### 1. Basic API (1-2 hours work)
- [ ] GET `/api/careers` - list of available careers
- [ ] GET `/api/recommendations/{careerId}` - get course recommendations
- [ ] Return JSON with courses and basic explanations
- [ ] No authentication (demo only)

### 2. Simple Career-Course Mapping (2 hours work)
- [ ] Hardcoded career data (Software Engineer, Data Scientist, Teacher)
- [ ] Hardcoded course recommendations for each career
- [ ] Simple explanation text for why each course is recommended
- [ ] No complex algorithms, just static mappings

### 3. Mock Data (30 minutes work)
```java
// Software Engineer → [CS101, CS201, CS301, MATH201]
// Data Scientist → [STAT201, CS101, MATH301, STAT301] 
// Teacher → [EDUC101, COMM201, PSYC101]
```

### 4. Basic Frontend (2-3 hours work)
- [ ] Dropdown to select career
- [ ] Display recommended courses in a simple list
- [ ] Show explanation for each recommendation
- [ ] Basic styling (Bootstrap or similar)

## Sample API Response (MINIMAL)
```json
{
  "careerName": "Software Engineer",
  "recommendations": [
    {
      "courseId": "CS101",
      "courseName": "Introduction to Programming",
      "credits": 3,
      "explanation": "Essential foundation for all software development",
      "priority": "HIGH"
    },
    {
      "courseId": "CS201", 
      "courseName": "Data Structures",
      "credits": 3,
      "explanation": "Critical for technical interviews and algorithm design",
      "priority": "HIGH"
    },
    {
      "courseId": "MATH201",
      "courseName": "Discrete Mathematics", 
      "credits": 3,
      "explanation": "Mathematical foundation for computer science",
      "priority": "MEDIUM"
    }
  ],
  "totalRecommendedCredits": 9
}
```

## POC Demo Script (5 minutes)
1. **Show Problem**: "Students don't know which courses help their career"
2. **Show Solution**: Select "Software Engineer" → Get relevant courses
3. **Show Different Careers**: Switch to "Data Scientist" → Different recommendations
4. **Show Value**: "Clear connection between courses and career goals"

## Time Estimate: 1-2 days total

---

# POC Feature: Simple Prerequisite Visualization Demo  

## POC Scope (BARE MINIMUM)
- **Input**: Course ID
- **Output**: Simple tree showing prerequisites
- **Demo Goal**: Show prerequisite relationships visually

## Sample Response
```json
{
  "courseId": "CS301",
  "courseName": "Advanced Programming",
  "prerequisites": [
    {
      "courseId": "CS201",
      "courseName": "Data Structures", 
      "prerequisites": [
        {
          "courseId": "CS101",
          "courseName": "Intro Programming",
          "prerequisites": []
        }
      ]
    }
  ]
}
```

## Simple Frontend: Basic tree view or nested list

---

# POC Feature: Basic Career Progress Demo

## POC Scope (BARE MINIMUM) 
- **Input**: Student ID + Career Goal
- **Output**: Progress percentage + next recommended course
- **Demo Goal**: Show career readiness tracking

## Sample Response
```json
{
  "studentName": "John Doe",
  "careerGoal": "Software Engineer", 
  "progressPercentage": 65,
  "completedCourses": ["CS101", "CS201"],
  "nextRecommendedCourse": {
    "courseId": "CS301",
    "courseName": "Algorithms",
    "reason": "Fills critical skill gap in algorithm design"
  },
  "skillsNeeded": ["Advanced Programming", "System Design", "Database Design"]
}
```

---

**TOTAL POC TIME ESTIMATE: 3-5 days for all 4 basic features**

This gets you a working demo that shows the core value proposition without building a rocket ship! 🚀➡️🛩️
