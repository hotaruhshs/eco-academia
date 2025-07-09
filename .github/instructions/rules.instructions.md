# Rules for Static HTML/CSS/JavaScript Admin Panel Prototype

## General

- The project must use only static HTML, CSS, and JavaScript (no backend or server-side code).
- All pages should be responsive and work well on desktop and mobile devices.
- Use semantic HTML5 elements for structure and accessibility.
- Organize files into logical folders (e.g., `css/`, `js/`, `images/`, `pages/`).
- When editing or adding styles, always update the relevant CSS file in the `css/` folder. Do not use `<style>` tags in HTML files if a CSS file exists for that page.
- **Do not use inline CSS (`style` attributes) in HTML files. All styles must be placed in the appropriate CSS file.**
- When editing or adding scripts, always update the relevant JavaScript file in the `js/` folder. Do not use `<script>` tags in HTML files if a JS file exists for that page.
- Use consistent naming conventions for files, classes, and IDs.
- Comment code where necessary for clarity.

## Pages

- **Login:**
  - Simple login form (username and password fields, login button).
  - No real authentication; simulate login with JavaScript.
  - Redirect to dashboard on successful (simulated) login.
- **Dashboard:**
  - Overview of key metrics (e.g., student count, quizzes, recent activity).
  - Use cards, charts, or tables for data visualization (static or with sample data).
- **Student Tracking:**
  - List of students with basic info (name, status, progress).
  - Ability to filter/search students (client-side only).
  - Option to view more details in a modal or separate page.
- **Quiz Manager:**
  - List of quizzes with title, status, and actions (edit, view).
  - Form to add/edit quizzes (fields: title, description, questions, etc.).
  - All data is static or stored in browser memory (e.g., localStorage).
  - **Users Score:**
  - Display user rankings and scores for all minigames and quizzes.
  - Show individual user profiles with their scores across different activities.
  - Include columns for username, minigame scores, quiz scores, and total points.
  - Ability to sort by different criteria (total score, individual game performance, username).
  - Filter options to view specific minigame or quiz leaderboards.
  - Use tables or card layouts to display score data clearly.
  - All score data should be static or sample data stored in memory/localStorage.
- **Admin Profile:**
  - Form for updating profile info, password, and preferences.
  - No real persistence; changes are not saved beyond the session.

## UI/UX

- Use a modern, clean, and intuitive design.
- Navigation should be clear and consistent across all pages.
- Use a sidebar or top navigation bar for main sections.
- Provide feedback for user actions (e.g., button clicks, form submissions).
- Use modals or toasts for notifications and confirmations.

## JavaScript

- Use vanilla JavaScript (no frameworks like React, Vue, or Angular).
- Organize scripts by page or feature.
- Use event listeners for interactivity (e.g., form validation, navigation, filtering).
- Store temporary data in memory or localStorage if needed.

## Assets

- Use royalty-free or open-source icons and images.
- Optimize images for web use.

## Documentation

- Include a `README.md` with instructions for running and navigating the prototype.
- Document any assumptions or limitations.

---

These rules ensure a maintainable, user-friendly, and realistic admin panel prototype using only static web technologies.
