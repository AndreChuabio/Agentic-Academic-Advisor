# POC Feature: Simple Graduation Risk Prediction Demo

## Status: 🟡 POC/DEMO VERSION

## User Story (SIMPLIFIED)
**As a** student,
**I want** to see a basic graduation risk assessment,
**so that** I know if I'm on track to graduate on time.

## POC Scope (BARE MINIMUM)
- **Input**: Student ID, current credits, GPA, expected graduation semester
- **Output**: Risk level (Green/Yellow/Red) + simple recommendation
- **Demo Goal**: Show the concept works, not production-ready

## Simplified Technical Requirements

### Basic Package Structure (MINIMAL)
```
src/main/java/com/academicadvisor/
├── controller/
│   └── RiskController.java             # Single REST controller 🟡
├── service/
│   └── RiskService.java                # Basic risk calculation 🟡
├── model/
│   ├── Student.java                    # Simple student entity 🟡
│   └── RiskAssessment.java             # Risk result 🟡
└── dto/
    └── RiskResponse.java               # API response 🟡
```

## POC Implementation Tasks (SUPER SIMPLE)

### 1. Basic API (1-2 hours work)
- [ ] Single GET endpoint: `/api/risk/{studentId}`
- [ ] Return JSON with risk level and basic message
- [ ] No authentication (demo only)
- [ ] Basic error handling

### 2. Simple Risk Calculation (2-3 hours work)
- [ ] Calculate credits per semester pace
- [ ] Check if GPA is declining
- [ ] Return risk level based on simple rules
- [ ] No machine learning, just basic math

### 3. Mock Data (30 minutes work)
- [ ] Hardcoded student data (no database)
- [ ] 5-10 sample students with different risk levels
- [ ] Static course requirements (120 credits to graduate)

### 4. Basic Frontend (2-3 hours work)
- [ ] Simple HTML page with student selector
- [ ] Show risk level with color coding
- [ ] Display basic recommendation text
- [ ] No fancy charts or visualizations

## POC Risk Algorithm (SUPER SIMPLE)
```java
public String calculateRisk(Student student) {
    // Simple rules-based approach
    int creditsNeeded = 120 - student.getCurrentCredits();
    int semestersLeft = student.getSemestersUntilGraduation();
    double creditsPerSemester = creditsNeeded / (double) semestersLeft;
    
    // Risk factors
    boolean behindPace = creditsPerSemester > 15; // Normal is 12-15 credits
    boolean lowGPA = student.getGpa() < 2.5;
    
    if (behindPace && lowGPA) return "HIGH";
    if (behindPace || lowGPA) return "MEDIUM";
    return "LOW";
}
```

## Sample API Response (MINIMAL)
```json
{
  "studentId": "12345",
  "studentName": "John Doe",
  "riskLevel": "MEDIUM",
  "riskColor": "yellow",
  "message": "You need 18 credits per semester to graduate on time. Consider summer courses.",
  "currentCredits": 60,
  "creditsNeeded": 60,
  "gpa": 3.2,
  "recommendedAction": "Meet with academic advisor to plan course load"
}
```

## POC Demo Script (5 minutes)
1. **Show Problem**: "Students don't know they're at risk until it's too late"
2. **Show Solution**: Enter student ID → Get instant risk assessment
3. **Show Different Cases**: 
   - Low risk student (green)
   - Medium risk student (yellow) 
   - High risk student (red)
4. **Show Value**: "Early warning + actionable advice"

## What's NOT in the POC
- ❌ No database (hardcoded data)
- ❌ No authentication
- ❌ No real-time updates
- ❌ No machine learning
- ❌ No Azure integration
- ❌ No complex algorithms
- ❌ No fancy UI
- ❌ No notifications
- ❌ No historical tracking

## Time Estimate for POC
- **Backend**: 4-6 hours
- **Frontend**: 2-3 hours  
- **Testing**: 1 hour
- **Total**: 1-2 days of focused work

## POC Success Criteria
✅ Can enter student ID and get risk assessment
✅ Shows different risk levels with colors
✅ Provides basic recommendations
✅ Demonstrates the core concept
✅ Runs without errors during demo

---

**Bottom Line**: This POC proves the concept works and gets you funding/approval to build the real thing! Much better than trying to build NASA on day one! 😄

Want me to create this simplified version instead?
