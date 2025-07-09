# User Story: 02 - Graduation Risk Prediction and Early Warning System

**As a** student working toward my degree,
**I want** to receive early warnings about graduation risks with actionable recommendations,
**so that** I can stay on track and graduate on time without surprises.

## Acceptance Criteria

* System calculates graduation risk in real-time based on credit hour pace, GPA trends, and prerequisite gaps
* Risk assessment displays as intuitive visual indicator (green/yellow/red traffic light system)
* Student can click on risk indicator to see detailed breakdown of specific risk factors
* System provides specific, actionable recommendations to mitigate identified risks
* Risk calculation updates automatically when student data changes (grades, course registrations, schedule changes)
* Alerts include concrete suggestions: "Consider taking a summer course" or "Increase to 15 credits next semester"
* System tracks credit completion vs. degree requirements and enrollment pace vs. required pace
* Risk notifications appear in-app with option for email/SMS alerts in future iterations
* Monthly risk assessment reports available for student review

## Risk Calculation Algorithm

**Primary Risk Factors:**
- Credit Hour Pace: (Credits Remaining / Semesters Remaining) vs Current Enrollment Pace
- GPA Trend Analysis: Improving, declining, or stable performance over last 3 semesters
- Prerequisite Gap Analysis: Missing prerequisites for required courses in degree plan
- Course Availability Impact: Scheduling conflicts and limited course offerings

**Risk Score Formula:**
```
Risk Score = (Pace Risk * 0.4) + (GPA Trend Risk * 0.3) + (Prerequisite Gap Risk * 0.3)
```

**Risk Levels:**
- Green (Low Risk): 0-30% - On track for timely graduation
- Yellow (Medium Risk): 31-60% - Minor adjustments needed
- Red (High Risk): 61-100% - Immediate intervention required

## Technical Implementation

* Risk Assessment Engine with real-time calculation capabilities
* Integration with student information systems for grade and enrollment data
* Automated notification system for risk alerts
* Dashboard for risk visualization and historical tracking

## Data Requirements

* Student's completed courses and grades
* Current enrollment and course schedule
* Degree requirements for student's major
* Course availability and scheduling data
* Historical graduation data for model training

## Actionable Recommendations

**For High Risk Students:**
- "You're 6 credits behind pace. Consider summer coursework or 15+ credits next semester"
- "Your GPA has declined 2 semesters. Visit tutoring center or reduce course load"
- "Missing prerequisite MATH 201 blocks 3 required courses. Enroll immediately"

**For Medium Risk Students:**
- "Consider meeting with academic advisor to optimize course sequence"
- "Your current pace will delay graduation by 1 semester. Increase to 14 credits"

## Notes

* Future iterations will include external factors (financial aid, work schedule, family obligations)
* Success metrics: Improvement in graduation rates for at-risk students using the system
* Monthly disaster recovery testing due to critical nature of academic data
* Integration with university notification systems planned for Phase 2
