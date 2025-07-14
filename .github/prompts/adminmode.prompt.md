---
mode: agent
---

# Admin Mode Implementation

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


## CRITICAL: SAFETY-FIRST APPROACH
🚨 **PRESERVE EXISTING FUNCTIONALITY** - Do NOT modify any existing student-facing components or pages. This is an additive feature only.

## Objective
Implement a discrete administrative interface for university staff to manage student data while maintaining 100% compatibility with the existing student experience.

## Implementation Strategy

### Phase 1: Foundation (Start Here)
1. **Admin Service Layer** - Create `app/lib/adminService.ts`
   - CRUD operations for student data
   - Data validation functions
   - Export/import utilities
   - Use existing `Student` type from `types.ts`

2. **Admin Context** - Create React context for admin state
   - Admin mode toggle state
   - Modified student data state (runtime only)
   - Authentication state (simple password check)

3. **Admin Toggle Component** - Add discrete toggle to main layout
   - Small "Admin" button in header/footer
   - Modal for password entry (`admin123` for POC)
   - Visual indicator when in admin mode

### Phase 2: Core Admin Interface
4. **Admin Route** - Create `app/admin/page.tsx`
   - Protected route (redirect if not admin)
   - Clean, dashboard-style layout
   - Navigation between admin features

5. **Student Management Table** - Primary admin feature
   - Display all students in sortable table
   - Inline editing capabilities
   - Add/delete student actions
   - Search and filter functionality

### Phase 3: Enhanced Features
6. **Data Upload Interface** - Mock file upload
   - File drop zone (visual only)
   - JSON/CSV format validation display
   - Preview imported data before "saving"
   - Success/error feedback

## Technical Specifications

### File Structure (New Files Only)
```
app/
  admin/
    page.tsx                 # Main admin dashboard
    components/
      StudentTable.tsx       # Student data grid
      StudentForm.tsx        # Add/edit student form
      DataUploader.tsx       # Mock upload interface
  components/
    AdminToggle.tsx          # Mode toggle component
  lib/
    adminService.ts          # Admin data operations
    adminContext.tsx         # Admin state management
```

### Data Handling Rules
- **Runtime State**: Modifications exist only in memory during session
- **Base Data**: Always start from `mockStudents` array
- **No Persistence**: Changes reset on page refresh (POC limitation)
- **Type Safety**: Strict adherence to existing `Student` interface

### UI/UX Requirements
- **Admin Mode Indicator**: Clear visual distinction (e.g., orange header bar)
- **Student Mode**: Exactly as it exists now, zero changes
- **Admin Interface**: Professional, table-focused design
- **Responsive**: Desktop-first, mobile-friendly
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Specific Implementation Details

### AdminService.ts Functions
```typescript
export class AdminService {
  static getStudents(): Student[]
  static addStudent(student: Omit<Student, 'id'>): Student
  static updateStudent(id: string, updates: Partial<Student>): Student
  static deleteStudent(id: string): boolean
  static validateStudent(student: Partial<Student>): ValidationResult
  static exportStudents(format: 'json' | 'csv'): string
  static importStudents(data: string, format: 'json' | 'csv'): Student[]
}
```

### Admin Toggle Integration
- Add `<AdminToggle />` to existing `layout.tsx`
- Position: Top-right corner, small and discrete
- No impact on existing layout or styling

### Student Table Features
- Columns: Name, Email, Credits, GPA, Graduation, Actions
- Actions: Edit (inline), Delete (confirm dialog)
- Sorting: All columns clickable
- Search: Real-time filter by name/email
- Pagination: 10 students per page

## Success Metrics
1. ✅ Admin toggle appears without breaking layout
2. ✅ Password protection works (hardcoded "admin123")
3. ✅ Student table displays all mock data correctly
4. ✅ Can add new student with form validation
5. ✅ Can edit existing student inline
6. ✅ Can delete student with confirmation
7. ✅ Mock upload interface shows file validation
8. ✅ Student mode remains 100% unchanged
9. ✅ No console errors or TypeScript warnings

## Constraints & Limitations
- **No Database**: All changes are runtime-only
- **Simple Auth**: Hardcoded password for POC
- **No File Processing**: Upload is visual simulation only
- **Session-Based**: Changes lost on refresh
- **Desktop-Focused**: Admin interface optimized for staff workstations

## Risk Mitigation
- Test student mode after each admin component addition
- Use separate state management for admin features
- Implement feature flags to easily disable admin mode
- Maintain existing API contracts and component interfaces

