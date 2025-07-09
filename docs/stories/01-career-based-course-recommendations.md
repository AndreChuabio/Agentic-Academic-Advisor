# User Story: 01 - Career-Based Course Recommendations

**As a** student with specific career aspirations,
**I want** to receive personalized course recommendations aligned with my career goals,
**so that** I can build the skills and knowledge needed for my target profession.

## Acceptance Criteria

* Student can select primary career goals during onboarding from dropdown of major career categories (Software Engineer, Data Scientist, Teacher, Nurse, etc.)
* Student can add free text for specific career details beyond the dropdown options
* System displays course recommendations filtered by selected career goals with clear explanations
* System shows the connection between recommended courses and required career skills
* Student can update career goals and see recommendations adjust in real-time
* System supports multiple career interests with confidence weighting (e.g., 70% Software Engineer, 30% Product Manager)
* Course recommendations include explanation of how each course develops career-relevant skills
* System handles transferable skills that apply to multiple career paths (e.g., Statistics for Data Science, Psychology, Business)
* Support for exploration mode for undecided students showing career options based on current coursework

## Technical Implementation

* Career Goals API endpoint for managing student career preferences
* Career-to-skills mapping database with junction tables
* Skills Mapping service connecting careers to required competencies
* Real-time recommendation engine with career goals as primary filter

## Database Schema

* Careers table (id, name, description)
* Skills table (id, name, category, description)
* Career_Skills junction table (career_id, skill_id, importance_level)
* Course_Skills junction table (course_id, skill_id, proficiency_gained)
* Student_Career_Goals table (student_id, career_id, confidence_level, created_at)

## Initial Data

Start with 25-30 common careers including:
- Software Engineer: Programming, Algorithms, System Design, Problem Solving
- Data Scientist: Statistics, Programming, Domain Knowledge, Data Visualization
- Teacher: Subject Expertise, Communication, Classroom Management, Assessment
- Nurse: Medical Knowledge, Patient Care, Critical Thinking, Empathy

## Notes

* Career-skills mappings will be validated with career counselors and industry professionals
* System designed to expand career database based on user demand
* Integration planned with career services data (job placement rates, starting salaries)
