# AI Academic Advisor - Sprint 2 Planning Meeting Transcript

**Date:** July 22, 2025  
**Duration:** 75 minutes  
**Meeting Type:** Sprint Planning - Career Pathways & Graduation Risk Features

## Attendees

- **Dr. Sarah Chen** - Project Lead & Former Academic Dean 
- **Marcus Rodriguez** - Senior Software Engineer
- **Dr. Aisha Patel** - Educational Technology Researcher
- **James Mitchell** - Data Scientist & AI/ML Engineer
- **Lisa Wang** - UX/UI Designer
- **Rachel Green** - Product Manager
- **David Kim** - Database Architect

---

## Meeting Transcript

**Dr. Chen:** Good morning team. Excellent progress on the MVP! Our course recommendation engine is working well. Today we're tackling the obvious gap we missed - career pathway guidance and graduation risk prediction. Rachel, you had a great insight about this.

**Rachel (PM):** Exactly! We can't build an academic advisor without knowing where students want to go career-wise. It's like giving directions without knowing the destination. How do we fix this in the simplest way possible?

**Lisa (UX):** The user research confirmed this. Students kept asking "But will this help me get the job I want?" We need career aspirations as a core input, not an afterthought.

**Dr. Chen:** Let's start simple. What's the most basic way to capture career aspirations and connect them to academic planning?

**Marcus (Engineer):** I'm thinking we add a career goals section to our onboarding flow. Simple dropdown with major career categories, then let them add free text for specifics.

**Dr. Patel:** From an educational perspective, we need to map careers to academic pathways. Most students don't know that becoming a data scientist requires statistics, programming, and domain expertise in their chosen field.

**James (Data Science):** Here's the simplest approach I can think of: We create a career-to-skills mapping database. Each career has required skills, each skill maps to courses. Then we can recommend academic paths based on career goals.

**Rachel (PM):** Love it. So if someone says "I want to be a software engineer," we know they need programming, algorithms, data structures, system design, etc.

**David (Database):** The data model is straightforward:
- Careers table (Software Engineer, Data Scientist, Teacher, etc.)
- Skills table (Programming, Statistics, Communication, etc.)
- Career_Skills junction table
- Course_Skills junction table

**Dr. Chen:** Perfect. Now for graduation risk prediction - what's the simplest effective approach?

**James (Data Science):** Three basic risk factors: credit hour pace, GPA trend, and prerequisite gaps. If someone needs 120 credits to graduate and they're taking 12 credits per semester but have 60 credits left with 4 semesters remaining, that's a red flag.

**Marcus (Engineer):** So we're looking at:
1. Credits completed vs. credits needed
2. Current enrollment pace vs. required pace
3. GPA trends (improving, declining, stable)
4. Missing prerequisites for required courses

**Lisa (UX):** The interface should show a simple risk meter - green, yellow, red. Click for details on what's causing the risk and specific recommendations to fix it.

**Dr. Patel:** We should also consider external factors that affect graduation risk - financial aid status, course availability, work schedule conflicts.

**Rachel (PM):** Let's start with the core academic factors and add external factors in later iterations. What's our data source for this?

**David (Database):** We'll need:
- Student's completed courses and grades
- Current enrollment
- Degree requirements for their major
- Course schedules and availability

**Dr. Chen:** How do we handle career pathway guidance in the interface? Students need to see the connection between their career goals and their course choices.

**Lisa (UX):** I'm envisioning a career pathway visualization - like a roadmap. It shows their current position, required skills for their target career, and which courses develop those skills.

**James (Data Science):** We can calculate a "career readiness score" - percentage of required skills they've developed through completed coursework. This gives them a clear progress indicator.

**Marcus (Engineer):** For the technical implementation, I suggest:
1. Career Goals API endpoint for managing student career preferences
2. Skills Mapping service that connects careers to required skills
3. Risk Assessment engine that calculates graduation probability
4. Pathway Recommendation engine that suggests optimal course sequences

**Dr. Patel:** What about students who change their career goals? This happens frequently.

**Rachel (PM):** Great point. The system should support multiple career interests and show how different academic paths serve different goals.

**David (Database):** We can store career preferences with timestamps and confidence levels. Students can have primary and secondary career interests.

**Dr. Chen:** Let's talk about the graduation risk algorithm. What specific calculations do we need?

**James (Data Science):** Here's the simplest effective formula:
- Risk Score = (Credits Remaining / Semesters Remaining) vs Current Pace
- Plus GPA trend analysis
- Plus prerequisite gap analysis
- Weighted by course availability and scheduling conflicts

**Lisa (UX):** For career pathways, students should see:
1. Their target career(s)
2. Skills needed for that career
3. Courses that develop those skills
4. Their current progress toward skill development
5. Recommended next courses based on their goals

**Marcus (Engineer):** Implementation-wise, this is very doable. We're essentially building a recommendation engine with career goals as the primary filter.

**Dr. Patel:** We need to account for transferable skills too. A course in statistics helps with data science, psychology research, business analytics, etc.

**Rachel (PM):** What about students who are undecided about their career? We can't force everyone to pick a specific path.

**Dr. Chen:** Good point. We should support exploration mode - show them various career options based on their current coursework and interests.

**James (Data Science):** We can build a career suggestion engine. If they've taken programming and math courses, suggest tech careers. If they have psychology and communication courses, suggest counseling, HR, or social work.

**David (Database):** The schema needs to support many-to-many relationships everywhere:
- Students can have multiple career goals
- Careers require multiple skills
- Courses develop multiple skills
- Skills apply to multiple careers

**Lisa (UX):** For graduation risk, I want to show actionable recommendations, not just warnings. "You're at risk because you're 6 credits behind pace. Consider taking a summer course or increasing to 15 credits next semester."

**Marcus (Engineer):** The graduation risk calculation should run in real-time whenever a student's data changes - new grades, course registrations, schedule changes.

**Dr. Patel:** We should integrate with career services data if possible. Job placement rates for different majors, starting salaries, industry trends.

**Rachel (PM):** Let's define our MVP for these features:
1. Basic career goal selection during onboarding
2. Simple career-to-skills mapping
3. Course recommendations based on career goals
4. Basic graduation risk assessment
5. Simple career pathway visualization

**Dr. Chen:** What's the simplest way to populate our career-to-skills database initially?

**James (Data Science):** Start with major career categories and obvious skill mappings:
- Software Engineer: Programming, Algorithms, System Design
- Data Scientist: Statistics, Programming, Domain Knowledge
- Teacher: Subject Expertise, Communication, Classroom Management
- Nurse: Medical Knowledge, Patient Care, Critical Thinking

**David (Database):** We can start with 20-30 common careers and expand based on user demand. Much simpler than trying to cover every possible career path initially.

**Lisa (UX):** For the career pathway visualization, I'm thinking a simple progress bar for each required skill, showing which courses they've completed and which they still need.

**Marcus (Engineer):** Timeline estimate: 2 weeks for basic career goal integration, 2 weeks for graduation risk assessment, 1 week for career pathway visualization. So 5 weeks total for this feature set.

**Dr. Patel:** We should validate our career-to-skills mappings with actual career counselors and industry professionals before launching.

**Rachel (PM):** Agreed. Let's plan user testing with both students and career services staff.

**Dr. Chen:** What about students in interdisciplinary programs or those creating custom majors?

**James (Data Science):** The skills-based approach handles this naturally. Their course selections develop certain skills regardless of their formal major.

**David (Database):** We need to handle edge cases like:
- Double majors
- Minors that support career goals
- Graduate school preparation
- Career changes mid-program

**Lisa (UX):** The interface should let students weight different career goals. Maybe they're 70% interested in software engineering, 30% interested in product management.

**Marcus (Engineer):** For graduation risk alerts, should we integrate with the university's notification systems?

**Dr. Chen:** Yes, but start with in-app notifications. We can add email/SMS alerts later if needed.

**Rachel (PM):** What's our success metric for these features?

**Dr. Patel:** Student engagement with career pathway recommendations and improvement in graduation