# Screenshot Guide for UI/UX Documentation

## 📸 How to Take and Add Screenshots to README

### Step 1: Run Your Application
```bash
npm run dev
# or
docker-compose up --build
```
Navigate to `http://localhost:3000`

### Step 2: Take Screenshots

Take screenshots of these key interfaces and save them in the `screenshots/` folder:

#### Required Screenshots:

1. **main-dashboard.png**
   - Navigate to the home page
   - Show the main dashboard with all feature cards
   - Make sure it looks clean and professional

2. **risk-assessment.png**
   - Test with student ID: `STU002` (Bob Smith - High Risk) or `STU001` (Alice Johnson - Low Risk)
   - Capture the risk assessment results with colored indicators
   - Show the recommendations section

3. **course-recommendations.png**
   - Select a career (e.g., "Software Engineer")
   - Optionally add a student ID
   - Capture the recommended courses with explanations

4. **prerequisite-visualization.png**
   - Enter a course ID like `CS301` or `CS401`
   - Capture the prerequisite tree/chain visualization
   - Make sure the course relationships are clear

5. **career-progress.png**
   - Use student ID `STU003` (Carol Davis) with "Data Scientist" career
   - Show the progress tracking with percentage completion
   - Include the completed/remaining courses section

6. **admin-interface.png**
   - Navigate to `/admin`
   - Show the admin dashboard with course/student management
   - Capture the data tables and admin controls

7. **graduate-programs.png**
   - Test the graduate programs feature
   - Show the program recommendations and pathways
   - Include any specialization tracks

### Step 3: Optimize Screenshots

#### Best Practices:
- **Resolution**: Take screenshots at 1440px width or higher
- **Browser**: Use Chrome or Safari for consistent rendering
- **Zoom**: Use 100% browser zoom for accurate representation
- **File Format**: Save as PNG for best quality
- **File Size**: Keep under 2MB each (compress if needed)

#### Screenshot Settings:
- Full page screenshots for dashboard views
- Focused screenshots for specific features
- Include some browser chrome for context (optional)
- Ensure text is readable and UI elements are clear

### Step 4: Naming Convention

Save files with these exact names in the `screenshots/` folder:
```
screenshots/
├── main-dashboard.png
├── risk-assessment.png
├── course-recommendations.png
├── prerequisite-visualization.png
├── career-progress.png
├── admin-interface.png
└── graduate-programs.png
```

### Step 5: Verify in README

After adding screenshots, check that they display correctly:
1. Push changes to GitHub
2. View your repository README on GitHub
3. Ensure all images load properly
4. Check that images are appropriately sized

## 🛠 Tools for Taking Screenshots

### macOS:
- **Cmd + Shift + 4**: Select area to screenshot
- **Cmd + Shift + 3**: Full screen screenshot
- **Preview**: For editing and resizing images

### Built-in Browser Tools:
- **Chrome DevTools**: F12 → Device toolbar → Responsive design
- **Firefox Screenshot**: Right-click → "Take Screenshot"

### Third-party Tools:
- **CleanShot X** (macOS) - Professional screenshot tool
- **Lightshot** - Cross-platform screenshot tool
- **Snagit** - Advanced screenshot and editing tool

## 📝 Alternative: Using GitHub for Image Hosting

If you prefer not to store images in your repository:

1. Create a new GitHub issue in your repository
2. Drag and drop your screenshots into the issue comment
3. GitHub will generate URLs like: `https://github.com/user/repo/assets/...`
4. Copy these URLs and replace the local paths in your README:

```markdown
![Main Dashboard](https://github.com/AchuabioPALO/AI-Academic-Advisor/assets/123456789/abc123def456.png)
```

## ✅ Checklist

- [ ] Application is running locally
- [ ] All 7 screenshots are taken
- [ ] Images are saved in `screenshots/` folder with correct names
- [ ] Images are properly sized and readable
- [ ] README has been updated (already done)
- [ ] Changes are committed and pushed to GitHub
- [ ] README displays correctly on GitHub

## 🎯 Pro Tips

1. **Consistent Styling**: Make sure your UI looks polished in all screenshots
2. **Data Variety**: Use different test scenarios to show various states
3. **Mobile Responsive**: Consider taking mobile screenshots too
4. **Error States**: Maybe include one screenshot showing error handling
5. **Dark Mode**: If you have dark mode, consider showing both themes

Remember: Great screenshots can significantly increase interest in your project and help users understand your UI/UX at a glance!
