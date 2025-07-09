# Eco Academia Admin Panel

A static HTML/CSS/JavaScript admin panel prototype for managing an educational environmental platform.

## Features

### 🏠 Dashboard
- Overview of key metrics (student count, quizzes, recent activity)
- Interactive cards displaying system statistics
- Quick navigation to all admin sections

### 👤 User Management
- Complete user list with search and filtering capabilities
- User details modal with comprehensive information
- Add, edit, and delete user functionality
- Status tracking and progress monitoring

### 📋 Quiz Manager
- Create and manage educational quizzes
- Quiz listing with status indicators
- Form-based quiz creation with multiple question types
- Static data storage using localStorage

### 🏆 User Scores (NEW)
- **Comprehensive scoring system** displaying user rankings across all activities
- **Individual user profiles** with detailed score breakdowns
- **Minigame scores** for:
  - Recycling Game
  - Energy Saver
  - Water Guardian
  - Eco Builder
- **Quiz performance tracking** with averages and completion rates
- **Sorting and filtering** by different criteria:
  - Total score
  - Quiz performance
  - Individual minigame scores
  - Username
  - Recent activity
- **Detailed score analytics** including:
  - User rankings with medal indicators
  - Score classifications (Excellent, Good, Average, Needs Work)
  - Progress tracking and completion rates
  - Individual activity breakdowns
- **Export functionality** for score data
- **Responsive design** for mobile and desktop viewing

### 📈 Reports (Placeholder)
- Reports section ready for implementation
- Designed for future data visualization features

### ⚙️ Settings (Placeholder)
- Settings section ready for implementation
- Admin profile management capabilities

## File Structure

```
eco-academia/
├── index.html                  # Login page
├── admin/
│   ├── dashboard.html         # Main dashboard
│   ├── users.html            # User management
│   ├── quiz-manager.html     # Quiz management
│   ├── scores.html           # User scores & rankings (NEW)
│   ├── css/
│   │   ├── dashboard.css     # Dashboard styles
│   │   ├── login.css        # Login page styles
│   │   ├── quiz-manager.css # Quiz manager styles
│   │   ├── users.css        # User management styles
│   │   └── scores.css       # User scores styles (NEW)
│   ├── js/
│   │   ├── dashboard.js     # Dashboard functionality
│   │   ├── login.js         # Login functionality
│   │   ├── quiz-manager.js  # Quiz management functionality
│   │   ├── users.js         # User management functionality
│   │   └── scores.js        # User scores functionality (NEW)
│   └── images/
│       └── leaf.svg         # Logo
```

## Getting Started

1. **Open the project**: Simply open `index.html` in a web browser
2. **Login**: Use any username/password combination (authentication is simulated)
3. **Navigate**: Use the sidebar to access different admin sections
4. **Explore scores**: Visit the "User Scores" page to see the comprehensive scoring system

## User Scores Feature Details

The new User Scores section provides a complete view of user performance across all platform activities:

### Key Features:
- **Leaderboard view** with user rankings
- **Multi-criteria sorting** (total score, quiz average, minigame performance, username)
- **Advanced filtering** (all activities, quizzes only, minigames only)
- **Detailed user profiles** accessible via modal dialogs
- **Performance indicators** with color-coded badges
- **Export capabilities** for data analysis
- **Real-time search** functionality

### Score Categories:
- **Quiz Scores**: Average performance across all quizzes taken
- **Minigame Scores**: Individual scores for each environmental game
- **Total Points**: Comprehensive point system combining all activities
- **Completion Rates**: Progress tracking across all available activities

### Sample Data:
The system includes realistic sample data showcasing various user performance levels, from high achievers to newcomers, demonstrating the full range of the scoring system's capabilities.

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with Bootstrap 5.3.0 integration
- **Vanilla JavaScript**: No frameworks, pure JavaScript functionality
- **Bootstrap**: Responsive grid system and UI components
- **Google Fonts**: Press Start 2P for retro gaming aesthetic

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- All data is static or stored in browser localStorage
- No backend or server-side code required
- Fully responsive design for mobile and desktop
- Follows accessibility best practices
- Modular CSS and JavaScript organization

## Future Enhancements

- Real-time data integration
- Advanced analytics and reporting
- User communication features
- Extended gamification elements
- Progressive Web App (PWA) capabilities

---

Built with ❤️ for environmental education
