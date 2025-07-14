---
mode: agent
---

# Admin Course and Graduate Program Management Extension - POC
### instructions for AI
- keep going until the job is completely solved before ending your turn
- use your tools and don't guess
- plan thoroughly before every tool call
- if you are not sure about file content or codebase structure, open them - do not hallucinate
- you MUST plan extensively before each function call, and reflect extensively on the output of the previous function call
- ALWAYS read existing files first to understand current structure before making changes
- Execute implementation phases in exact order specified
- Test each phase before moving to next
- Validate existing functionality remains intact after each change

## OBJECTIVE
Create a Proof of Concept (POC) extension to the existing admin interface that demonstrates course management and graduate program management capabilities. This POC will showcase core CRUD functionality and admin workflows while maintaining 100% compatibility with the existing student experience using a safety-first, additive approach.

## POC EXECUTION PLAN

### Phase 1: AdminService Extension (Core POC Foundation)
**File:** `app/lib/adminService.ts`

**Essential POC Methods:**
1. Course management (demonstration level):
   - `getAllCourses()`: Basic retrieval with simple filtering
   - `createCourse(course: Course)`: Add new course with basic validation
   - `updateCourse(id: string, updates: Partial<Course>)`: Simple update functionality
   - `deleteCourse(id: string)`: Remove course with basic safety checks
   - `exportCourses()`: Simple CSV export for demonstration

2. Graduate program management (demonstration level):
   - `getAllGraduatePrograms()`: Basic retrieval and filtering
   - `createGraduateProgram(program: GraduateProgram)`: Add new program
   - `updateGraduateProgram(id: string, updates: Partial<GraduateProgram>)`: Update program
   - `deleteGraduateProgram(id: string)`: Remove program with safety checks
   - `exportGraduatePrograms()`: Simple export functionality

3. Basic validation utilities:
   - `validateCourseData(course: Course)`: Essential data validation
   - `validateGraduateProgramData(program: GraduateProgram)`: Basic program validation

**POC Safety Measures:**
- Runtime-only operations (no persistence)
- Basic validation to prevent data corruption
- Simple confirmation dialogs for destructive operations

### Phase 2: Course Management Component (POC Demonstration)
**File:** `app/admin/components/CourseTable.tsx`

**POC Features (Essential Only):**
- Basic table with course code, name, credits, department
- Simple search functionality
- Add/Edit/Delete operations with modal forms
- Visual feedback for operations

**POC Actions:**
- Add new course (simple modal form)
- Edit course details (basic modal)
- Delete course (with confirmation)
- Basic export functionality

### Phase 3: Graduate Program Management Component (POC Demonstration)
**File:** `app/admin/components/GraduateProgramTable.tsx`

**POC Features (Essential Only):**
- Basic table with program name, degree type, department
- Simple search and filter
- Add/Edit/Delete operations
- Basic program requirements display

**POC Actions:**
- Add new graduate program (simplified form)
- Edit program details
- Delete program (with confirmation)
- View program requirements

### Phase 4: Simplified Data Operations (POC Level)
**File:** `app/admin/components/DataUploader.tsx` (extend existing)

**POC Features:**
- Basic CSV import for courses and programs
- Simple data preview
- Basic error reporting
- Template download for demonstration

### Phase 5: Admin Dashboard Integration (POC Integration)
**File:** `app/admin/page.tsx`

**POC Updates:**
- Add "Courses" and "Graduate Programs" tabs
- Basic summary statistics
- Simple navigation between sections
- Maintain existing admin styling patterns

### Phase 6: Type Definitions (POC Requirements)
**File:** `app/lib/types.ts`

**POC Enhancements:**
- Ensure Course and GraduateProgram types work with admin operations
- Basic admin metadata (created_date, modified_date)
- Simple validation schemas

## POC CONSTRAINTS

### POC Safety Requirements:
1. **Demo-Safe**: All operations are runtime-only for demonstration
2. **Basic Validation**: Essential data validation to prevent obvious errors
3. **Simple Confirmations**: Basic confirmation dialogs for destructive operations
4. **Quick Rollback**: Easy restoration with page refresh

### POC Compatibility Requirements:
1. **Zero Impact**: Student-facing features remain completely unchanged
2. **API Compatibility**: Existing API routes continue to work identically
3. **No Schema Changes**: Work with existing data structures
4. **Isolated Operations**: Admin operations don't affect student experience

### POC UI/UX Requirements:
1. **Consistent Styling**: Match existing admin interface patterns
2. **Basic Responsiveness**: Works on desktop (tablet optional for POC)
3. **Simple Interactions**: Clear, straightforward user flows
4. **Basic Feedback**: Loading states and simple error messages

## POC TESTING STRATEGY

### Essential Testing:
- Basic CRUD operations for courses and graduate programs
- Simple data validation
- Admin mode toggle functionality
- Student experience remains unchanged

### POC Validation:
- Verify no persistent data changes
- Confirm existing features work identically
- Test basic edge cases

## POC SUCCESS CRITERIA

1. **Demonstration of Core CRUD**: Basic create, read, update, delete for courses and graduate programs
2. **Admin Interface Integration**: Seamless addition of new tabs to existing admin dashboard
3. **Data Safety**: No impact on student experience, runtime-only operations
4. **Basic Import/Export**: Simple CSV operations for demonstration purposes
5. **UI Consistency**: New components match existing admin design patterns

## POC DELIVERABLES

1. Extended AdminService with basic course and graduate program management
2. CourseTable and GraduateProgramTable React components (simplified)
3. Basic data import/export functionality
4. Updated admin dashboard with new management tabs
5. Simple testing verification
6. Basic documentation update
7. Git commit demonstrating POC capabilities

## POC ROLLBACK PLAN

For a POC, rollback is simplified:
1. Admin toggle immediately disables new features
2. Page refresh restores original mock data state
3. Git revert available for quick code rollback
4. All changes are additive and easily reversible

## POC SCOPE LIMITATIONS

**Explicitly NOT included in this POC:**
- Advanced search and filtering
- Bulk operations beyond basic import/export
- Complex dependency management
- Advanced UI features (drag-drop, inline editing)
- Comprehensive validation rules
- Performance optimizations
- Advanced accessibility features
- Complex workflows or approval processes

**POC Focus:**
This POC demonstrates the feasibility and basic functionality of extending the admin interface to manage courses and graduate programs. It serves as a foundation for future full-featured implementation while maintaining the established safety-first approach.