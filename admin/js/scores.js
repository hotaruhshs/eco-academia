/**
 * User Scores Page JavaScript
 * Handles tabbed score display, filtering, sorting, and modal interactions
 */

// Sample score data with 5 quizzes and 5 minigames
const scoresData = [
  {
    id: 1,
    username: "Alice Johnson",
    email: "alice.johnson@email.com",
    avatar: "AJ",
    quizzes: {
      quiz1: 95, // Ecology Basics
      quiz2: 88, // Climate Change
      quiz3: 94, // Renewable Energy
      quiz4: 92, // Water Conservation
      quiz5: 90  // Sustainable Living
    },
    minigames: {
      recycling: 95,  // Recycling Hero
      energy: 88,     // Energy Saver
      water: 92,      // Water Guardian
      builder: 89,    // Eco Builder
      carbon: 91      // Carbon Fighter
    },
    joinDate: "2025-01-15",
    lastActive: "2025-07-08",
    badges: ["Eco Champion", "Quiz Master", "Green Warrior"]
  },
  {
    id: 2,
    username: "Frank Miller",
    email: "frank.miller@email.com",
    avatar: "FM",
    quizzes: {
      quiz1: 91,
      quiz2: 85,
      quiz3: 92,
      quiz4: 88,
      quiz5: 90
    },
    minigames: {
      recycling: 92,
      energy: 94,
      water: 87,
      builder: 93,
      carbon: 89
    },
    joinDate: "2025-01-20",
    lastActive: "2025-07-08",
    badges: ["Energy Expert", "Recycling Pro"]
  },
  {
    id: 3,
    username: "Diana Prince",
    email: "diana.prince@email.com",
    avatar: "DP",
    quizzes: {
      quiz1: 96,
      quiz2: 92,
      quiz3: 95,
      quiz4: 94,
      quiz5: 93
    },
    minigames: {
      recycling: 88,
      energy: 91,
      water: 89,
      builder: 85,
      carbon: 87
    },
    joinDate: "2024-12-05",
    lastActive: "2025-06-15",
    badges: ["Quiz Legend", "Sustainability Scholar", "Top Performer"]
  },
  {
    id: 4,
    username: "Bob Smith",
    email: "bob.smith@email.com",
    avatar: "BS",
    quizzes: {
      quiz1: 85,
      quiz2: 79,
      quiz3: 84,
      quiz4: 81,
      quiz5: 83
    },
    minigames: {
      recycling: 78,
      energy: 85,
      water: 82,
      builder: 80,
      carbon: 84
    },
    joinDate: "2025-02-01",
    lastActive: "2025-07-07",
    badges: ["Consistent Learner"]
  },
  {
    id: 5,
    username: "Charlie Brown",
    email: "charlie.brown@email.com",
    avatar: "CB",
    quizzes: {
      quiz1: 68,
      quiz2: 62,
      quiz3: 67,
      quiz4: 0,
      quiz5: 0
    },
    minigames: {
      recycling: 72,
      energy: 65,
      water: 70,
      builder: 0,
      carbon: 0
    },
    joinDate: "2025-03-10",
    lastActive: "2025-07-06",
    badges: ["Newcomer"]
  },
  {
    id: 6,
    username: "Eve Wilson",
    email: "eve.wilson@email.com",
    avatar: "EW",
    quizzes: {
      quiz1: 72,
      quiz2: 0,
      quiz3: 0,
      quiz4: 0,
      quiz5: 0
    },
    minigames: {
      recycling: 75,
      energy: 0,
      water: 0,
      builder: 0,
      carbon: 0
    },
    joinDate: "2025-07-01",
    lastActive: "2025-07-02",
    badges: ["Fresh Start"]
  },
  {
    id: 7,
    username: "Grace Lee",
    email: "grace.lee@email.com",
    avatar: "GL",
    quizzes: {
      quiz1: 93,
      quiz2: 89,
      quiz3: 92,
      quiz4: 91,
      quiz5: 94
    },
    minigames: {
      recycling: 89,
      energy: 92,
      water: 94,
      builder: 91,
      carbon: 88
    },
    joinDate: "2025-02-14",
    lastActive: "2025-07-08",
    badges: ["Water Guardian", "Eco Builder Pro"]
  },
  {
    id: 8,
    username: "Henry Davis",
    email: "henry.davis@email.com",
    avatar: "HD",
    quizzes: {
      quiz1: 82,
      quiz2: 75,
      quiz3: 80,
      quiz4: 78,
      quiz5: 76
    },
    minigames: {
      recycling: 84,
      energy: 79,
      water: 77,
      builder: 82,
      carbon: 80
    },
    joinDate: "2025-02-28",
    lastActive: "2025-07-05",
    badges: ["Steady Progress"]
  },
  {
    id: 9,
    username: "Iris Chen",
    email: "iris.chen@email.com",
    avatar: "IC",
    quizzes: {
      quiz1: 89,
      quiz2: 93,
      quiz3: 87,
      quiz4: 91,
      quiz5: 88
    },
    minigames: {
      recycling: 86,
      energy: 90,
      water: 88,
      builder: 92,
      carbon: 85
    },
    joinDate: "2025-03-05",
    lastActive: "2025-07-08",
    badges: ["Climate Expert", "Eco Innovator"]
  },
  {
    id: 10,
    username: "Jack Wilson",
    email: "jack.wilson@email.com",
    avatar: "JW",
    quizzes: {
      quiz1: 77,
      quiz2: 81,
      quiz3: 79,
      quiz4: 83,
      quiz5: 80
    },
    minigames: {
      recycling: 82,
      energy: 78,
      water: 85,
      builder: 79,
      carbon: 83
    },
    joinDate: "2025-03-15",
    lastActive: "2025-07-07",
    badges: ["Balanced Performer"]
  },
  {
    id: 11,
    username: "Kate Brown",
    email: "kate.brown@email.com",
    avatar: "KB",
    quizzes: {
      quiz1: 94,
      quiz2: 97,
      quiz3: 96,
      quiz4: 95,
      quiz5: 98
    },
    minigames: {
      recycling: 97,
      energy: 95,
      water: 98,
      builder: 96,
      carbon: 94
    },
    joinDate: "2024-11-20",
    lastActive: "2025-07-08",
    badges: ["Perfect Score", "Elite Performer", "Eco Master"]
  },
  {
    id: 12,
    username: "Liam Garcia",
    email: "liam.garcia@email.com",
    avatar: "LG",
    quizzes: {
      quiz1: 73,
      quiz2: 69,
      quiz3: 75,
      quiz4: 71,
      quiz5: 74
    },
    minigames: {
      recycling: 76,
      energy: 72,
      water: 74,
      builder: 78,
      carbon: 73
    },
    joinDate: "2025-04-01",
    lastActive: "2025-07-06",
    badges: ["Improving Learner"]
  },
  {
    id: 13,
    username: "Maya Patel",
    email: "maya.patel@email.com",
    avatar: "MP",
    quizzes: {
      quiz1: 86,
      quiz2: 84,
      quiz3: 88,
      quiz4: 87,
      quiz5: 85
    },
    minigames: {
      recycling: 83,
      energy: 87,
      water: 85,
      builder: 84,
      carbon: 86
    },
    joinDate: "2025-04-10",
    lastActive: "2025-07-08",
    badges: ["Consistent Player", "Team Spirit"]
  },
  {
    id: 14,
    username: "Noah Taylor",
    email: "noah.taylor@email.com",
    avatar: "NT",
    quizzes: {
      quiz1: 90,
      quiz2: 86,
      quiz3: 89,
      quiz4: 92,
      quiz5: 87
    },
    minigames: {
      recycling: 88,
      energy: 91,
      water: 87,
      builder: 90,
      carbon: 89
    },
    joinDate: "2025-04-15",
    lastActive: "2025-07-07",
    badges: ["Rising Star", "Water Expert"]
  },
  {
    id: 15,
    username: "Olivia Martinez",
    email: "olivia.martinez@email.com",
    avatar: "OM",
    quizzes: {
      quiz1: 79,
      quiz2: 77,
      quiz3: 81,
      quiz4: 78,
      quiz5: 80
    },
    minigames: {
      recycling: 81,
      energy: 79,
      water: 83,
      builder: 77,
      carbon: 80
    },
    joinDate: "2025-04-20",
    lastActive: "2025-07-05",
    badges: ["Dedicated Student"]
  },
  {
    id: 16,
    username: "Paul Anderson",
    email: "paul.anderson@email.com",
    avatar: "PA",
    quizzes: {
      quiz1: 65,
      quiz2: 58,
      quiz3: 62,
      quiz4: 59,
      quiz5: 61
    },
    minigames: {
      recycling: 64,
      energy: 67,
      water: 62,
      builder: 65,
      carbon: 63
    },
    joinDate: "2025-05-01",
    lastActive: "2025-07-04",
    badges: ["New Explorer"]
  },
  {
    id: 17,
    username: "Quinn Robinson",
    email: "quinn.robinson@email.com",
    avatar: "QR",
    quizzes: {
      quiz1: 92,
      quiz2: 89,
      quiz3: 94,
      quiz4: 90,
      quiz5: 93
    },
    minigames: {
      recycling: 91,
      energy: 93,
      water: 89,
      builder: 94,
      carbon: 90
    },
    joinDate: "2025-05-05",
    lastActive: "2025-07-08",
    badges: ["High Achiever", "Energy Champion"]
  },
  {
    id: 18,
    username: "Ruby White",
    email: "ruby.white@email.com",
    avatar: "RW",
    quizzes: {
      quiz1: 84,
      quiz2: 81,
      quiz3: 86,
      quiz4: 83,
      quiz5: 85
    },
    minigames: {
      recycling: 87,
      energy: 84,
      water: 86,
      builder: 83,
      carbon: 85
    },
    joinDate: "2025-05-10",
    lastActive: "2025-07-07",
    badges: ["Reliable Player"]
  },
  {
    id: 19,
    username: "Sam Clark",
    email: "sam.clark@email.com",
    avatar: "SC",
    quizzes: {
      quiz1: 71,
      quiz2: 74,
      quiz3: 72,
      quiz4: 76,
      quiz5: 73
    },
    minigames: {
      recycling: 75,
      energy: 73,
      water: 77,
      builder: 74,
      carbon: 72
    },
    joinDate: "2025-05-15",
    lastActive: "2025-07-06",
    badges: ["Progress Maker"]
  },
  {
    id: 20,
    username: "Tina Lewis",
    email: "tina.lewis@email.com",
    avatar: "TL",
    quizzes: {
      quiz1: 88,
      quiz2: 85,
      quiz3: 87,
      quiz4: 89,
      quiz5: 86
    },
    minigames: {
      recycling: 89,
      energy: 87,
      water: 90,
      builder: 85,
      carbon: 88
    },
    joinDate: "2025-05-20",
    lastActive: "2025-07-08",
    badges: ["Well Rounded", "Active Learner"]
  },
  {
    id: 21,
    username: "Uma Singh",
    email: "uma.singh@email.com",
    avatar: "US",
    quizzes: {
      quiz1: 76,
      quiz2: 79,
      quiz3: 78,
      quiz4: 77,
      quiz5: 80
    },
    minigames: {
      recycling: 78,
      energy: 76,
      water: 81,
      builder: 79,
      carbon: 77
    },
    joinDate: "2025-05-25",
    lastActive: "2025-07-05",
    badges: ["Steady Climber"]
  },
  {
    id: 22,
    username: "Victor Kim",
    email: "victor.kim@email.com",
    avatar: "VK",
    quizzes: {
      quiz1: 95,
      quiz2: 91,
      quiz3: 97,
      quiz4: 93,
      quiz5: 96
    },
    minigames: {
      recycling: 94,
      energy: 96,
      water: 92,
      builder: 98,
      carbon: 95
    },
    joinDate: "2025-06-01",
    lastActive: "2025-07-08",
    badges: ["Top Scorer", "Eco Genius", "Leadership"]
  },
  {
    id: 23,
    username: "Wendy Foster",
    email: "wendy.foster@email.com",
    avatar: "WF",
    quizzes: {
      quiz1: 82,
      quiz2: 78,
      quiz3: 80,
      quiz4: 84,
      quiz5: 81
    },
    minigames: {
      recycling: 85,
      energy: 82,
      water: 84,
      builder: 80,
      carbon: 83
    },
    joinDate: "2025-06-05",
    lastActive: "2025-07-07",
    badges: ["Consistent Effort"]
  },
  {
    id: 24,
    username: "Xavier Lopez",
    email: "xavier.lopez@email.com",
    avatar: "XL",
    quizzes: {
      quiz1: 67,
      quiz2: 64,
      quiz3: 69,
      quiz4: 66,
      quiz5: 68
    },
    minigames: {
      recycling: 70,
      energy: 68,
      water: 72,
      builder: 67,
      carbon: 69
    },
    joinDate: "2025-06-10",
    lastActive: "2025-07-04",
    badges: ["Learning Journey"]
  },
  {
    id: 25,
    username: "Yara Ahmed",
    email: "yara.ahmed@email.com",
    avatar: "YA",
    quizzes: {
      quiz1: 91,
      quiz2: 88,
      quiz3: 90,
      quiz4: 92,
      quiz5: 89
    },
    minigames: {
      recycling: 93,
      energy: 89,
      water: 91,
      builder: 87,
      carbon: 90
    },
    joinDate: "2025-06-15",
    lastActive: "2025-07-08",
    badges: ["Excellence Award", "Community Leader"]
  }
];

// Quiz and game information
const quizInfo = {
  quiz1: "Ecology Basics",
  quiz2: "Climate Change", 
  quiz3: "Renewable Energy",
  quiz4: "Water Conservation",
  quiz5: "Sustainable Living"
};

const minigameInfo = {
  recycling: "Recycling Hero",
  energy: "Energy Saver",
  water: "Water Guardian", 
  builder: "Eco Builder",
  carbon: "Carbon Fighter"
};

// Global variables
let filteredData = [...scoresData];
let currentSort = { field: 'average', direction: 'desc' };
let activeTab = 'quiz';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeScoresPage();
  renderStatistics();
  renderAllTables();
  bindEventListeners();
});

function initializeScoresPage() {
  console.log('Initializing User Scores page...');
}

function renderStatistics() {
  const avgScore = calculateAverageScore();
  const completionRate = calculateCompletionRate();

  document.getElementById('avg-score').textContent = avgScore.toFixed(1);
  document.getElementById('completion-rate').textContent = completionRate + '%';
}

function calculateAverageScore() {
  let totalScores = 0;
  let totalActivities = 0;
  
  scoresData.forEach(user => {
    Object.values(user.quizzes).forEach(score => {
      if (score > 0) {
        totalScores += score;
        totalActivities++;
      }
    });
    Object.values(user.minigames).forEach(score => {
      if (score > 0) {
        totalScores += score;
        totalActivities++;
      }
    });
  });
  
  return totalActivities > 0 ? totalScores / totalActivities : 0;
}

function calculateCompletionRate() {
  const totalPossibleActivities = scoresData.length * 10; // 5 quizzes + 5 minigames per user
  let totalCompletedActivities = 0;
  
  scoresData.forEach(user => {
    Object.values(user.quizzes).forEach(score => {
      if (score > 0) totalCompletedActivities++;
    });
    Object.values(user.minigames).forEach(score => {
      if (score > 0) totalCompletedActivities++;
    });
  });
  
  return Math.round((totalCompletedActivities / totalPossibleActivities) * 100);
}

function renderAllTables() {
  renderQuizTable();
  renderMinigameTable();
  renderOverallTable();
  
  // Define the quiz and minigame info for reference in modals
  window.quizInfo = {
    quiz1: 'Ecology Basics',
    quiz2: 'Climate Change',
    quiz3: 'Renewable Energy',
    quiz4: 'Water Conservation',
    quiz5: 'Sustainable Living'
  };
  
  window.minigameInfo = {
    recycling: 'Recycling Hero',
    energy: 'Energy Saver',
    water: 'Water Guardian',
    builder: 'Eco Builder',
    carbon: 'Carbon Fighter'
  };
}

function renderQuizTable() {
  const tbody = document.getElementById('quiz-tbody');
  tbody.innerHTML = '';

  const sortedData = sortDataByQuiz(filteredData);
  
  sortedData.forEach((user, index) => {
    const rank = index + 1;
    const row = createQuizRow(user, rank);
    tbody.appendChild(row);
  });
}

function renderMinigameTable() {
  const tbody = document.getElementById('minigame-tbody');
  tbody.innerHTML = '';

  const sortedData = sortDataByMinigame(filteredData);
  
  sortedData.forEach((user, index) => {
    const rank = index + 1;
    const row = createMinigameRow(user, rank);
    tbody.appendChild(row);
  });
}

function renderOverallTable() {
  const tbody = document.getElementById('overall-tbody');
  tbody.innerHTML = '';

  const sortedData = sortDataByOverall(filteredData);
  
  sortedData.forEach((user, index) => {
    const rank = index + 1;
    const row = createOverallRow(user, rank);
    tbody.appendChild(row);
  });
}

function createScoreRow(user, rank) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <div class="rank-badge ${getRankClass(rank)}">${rank}</div>
    </td>
    <td>
      <div class="user-info">
        <div class="user-avatar">${user.avatar}</div>
        <div class="user-details">
          <div class="username">${user.username}</div>
          <div class="user-email">${user.email}</div>
        </div>
      </div>
    </td>
    <td class="score-cell">
      <span class="score-value">${user.quizAverage.toFixed(1)}</span>
      <div class="score-badge ${getScoreClass(user.quizAverage)}">${getScoreLabel(user.quizAverage)}</div>
    </td>
    <td class="score-cell">
      <span class="score-value">${user.minigames.recyclingGame || 'N/A'}</span>
      ${user.minigames.recyclingGame ? `<div class="score-badge ${getScoreClass(user.minigames.recyclingGame)}">${getScoreLabel(user.minigames.recyclingGame)}</div>` : '<span class="score-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="score-value">${user.minigames.energySaver || 'N/A'}</span>
      ${user.minigames.energySaver ? `<div class="score-badge ${getScoreClass(user.minigames.energySaver)}">${getScoreLabel(user.minigames.energySaver)}</div>` : '<span class="score-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="score-value">${user.minigames.waterGuardian || 'N/A'}</span>
      ${user.minigames.waterGuardian ? `<div class="score-badge ${getScoreClass(user.minigames.waterGuardian)}">${getScoreLabel(user.minigames.waterGuardian)}</div>` : '<span class="score-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="score-value">${user.minigames.ecoBuilder || 'N/A'}</span>
      ${user.minigames.ecoBuilder ? `<div class="score-badge ${getScoreClass(user.minigames.ecoBuilder)}">${getScoreLabel(user.minigames.ecoBuilder)}</div>` : '<span class="score-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <div class="total-score">${user.totalPoints.toLocaleString()}</div>
      <div class="score-breakdown">${user.completedActivities}/${user.totalActivities} completed</div>
    </td>
    <td>
      <button class="btn btn-sm btn-outline-primary action-btn" onclick="viewUserDetails(${user.id})">
        👁️
      </button>
    </td>
  `;
  return row;
}

function createQuizRow(user, rank) {
  const row = document.createElement('tr');
  const quizAverage = calculateQuizAverage(user);
  
  row.innerHTML = `
    <td>
      <div class="rank-badge ${getRankClass(rank)}">${rank}</div>
    </td>
    <td>
      <div class="user-info">
        <div class="user-details">
          <div class="username">${user.username}</div>
          <div class="user-email">${user.email}</div>
        </div>
      </div>
    </td>
    <td class="score-cell">
      <span class="quiz-score">${user.quizzes.quiz1 || 'N/A'}</span>
      ${user.quizzes.quiz1 ? `<div class="score-badge ${getScoreClass(user.quizzes.quiz1)}">${getScoreLabel(user.quizzes.quiz1)}</div>` : '<span class="quiz-na">Not taken</span>'}
    </td>
    <td class="score-cell">
      <span class="quiz-score">${user.quizzes.quiz2 || 'N/A'}</span>
      ${user.quizzes.quiz2 ? `<div class="score-badge ${getScoreClass(user.quizzes.quiz2)}">${getScoreLabel(user.quizzes.quiz2)}</div>` : '<span class="quiz-na">Not taken</span>'}
    </td>
    <td class="score-cell">
      <span class="quiz-score">${user.quizzes.quiz3 || 'N/A'}</span>
      ${user.quizzes.quiz3 ? `<div class="score-badge ${getScoreClass(user.quizzes.quiz3)}">${getScoreLabel(user.quizzes.quiz3)}</div>` : '<span class="quiz-na">Not taken</span>'}
    </td>
    <td class="score-cell">
      <span class="quiz-score">${user.quizzes.quiz4 || 'N/A'}</span>
      ${user.quizzes.quiz4 ? `<div class="score-badge ${getScoreClass(user.quizzes.quiz4)}">${getScoreLabel(user.quizzes.quiz4)}</div>` : '<span class="quiz-na">Not taken</span>'}
    </td>
    <td class="score-cell">
      <span class="quiz-score">${user.quizzes.quiz5 || 'N/A'}</span>
      ${user.quizzes.quiz5 ? `<div class="score-badge ${getScoreClass(user.quizzes.quiz5)}">${getScoreLabel(user.quizzes.quiz5)}</div>` : '<span class="quiz-na">Not taken</span>'}
    </td>
    <td class="score-cell">
      <div class="total-score">${quizAverage.toFixed(1)}</div>
      <div class="score-breakdown">${getQuizCount(user)}/5 completed</div>
    </td>
    <td>
      <button class="action-btn view" onclick="viewUserDetails(${user.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    </td>
  `;
  return row;
}

function createMinigameRow(user, rank) {
  const row = document.createElement('tr');
  const minigameAverage = calculateMinigameAverage(user);
  
  row.innerHTML = `
    <td>
      <div class="rank-badge ${getRankClass(rank)}">${rank}</div>
    </td>
    <td>
      <div class="user-info">
        <div class="user-details">
          <div class="username">${user.username}</div>
          <div class="user-email">${user.email}</div>
        </div>
      </div>
    </td>
    <td class="score-cell">
      <span class="minigame-score">${user.minigames.recycling || 'N/A'}</span>
      ${user.minigames.recycling ? `<div class="score-badge ${getScoreClass(user.minigames.recycling)}">${getScoreLabel(user.minigames.recycling)}</div>` : '<span class="minigame-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="minigame-score">${user.minigames.energy || 'N/A'}</span>
      ${user.minigames.energy ? `<div class="score-badge ${getScoreClass(user.minigames.energy)}">${getScoreLabel(user.minigames.energy)}</div>` : '<span class="minigame-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="minigame-score">${user.minigames.water || 'N/A'}</span>
      ${user.minigames.water ? `<div class="score-badge ${getScoreClass(user.minigames.water)}">${getScoreLabel(user.minigames.water)}</div>` : '<span class="minigame-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="minigame-score">${user.minigames.builder || 'N/A'}</span>
      ${user.minigames.builder ? `<div class="score-badge ${getScoreClass(user.minigames.builder)}">${getScoreLabel(user.minigames.builder)}</div>` : '<span class="minigame-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <span class="minigame-score">${user.minigames.carbon || 'N/A'}</span>
      ${user.minigames.carbon ? `<div class="score-badge ${getScoreClass(user.minigames.carbon)}">${getScoreLabel(user.minigames.carbon)}</div>` : '<span class="minigame-na">Not played</span>'}
    </td>
    <td class="score-cell">
      <div class="total-score">${minigameAverage.toFixed(1)}</div>
      <div class="score-breakdown">${getMinigameCount(user)}/5 completed</div>
    </td>
    <td>
      <button class="action-btn view" onclick="viewUserDetails(${user.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    </td>
  `;
  return row;
}

function createOverallRow(user, rank) {
  const row = document.createElement('tr');
  const quizTotal = calculateQuizTotal(user);
  const minigameTotal = calculateMinigameTotal(user);
  const totalPoints = quizTotal + minigameTotal;
  const completionRate = calculateUserCompletion(user);
  
  row.innerHTML = `
    <td>
      <div class="rank-badge ${getRankClass(rank)}">${rank}</div>
    </td>
    <td>
      <div class="user-info">
        <div class="user-details">
          <div class="username">${user.username}</div>
          <div class="user-email">${user.email}</div>
        </div>
      </div>
    </td>
    <td class="score-cell">
      <div class="total-quiz-score">${quizTotal}</div>
    </td>
    <td class="score-cell">
      <div class="total-minigame-score">${minigameTotal}</div>
    </td>
    <td class="score-cell">
      <div class="total-score">${totalPoints}</div>
    </td>
    <td class="score-cell">
      <div class="completion-badge ${getCompletionClass(completionRate)}">${completionRate}%</div>
    </td>
    <td>
      <button class="action-btn view" onclick="viewUserDetails(${user.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    </td>
  `;
  return row;
}

// Calculation helper functions
function calculateQuizAverage(user) {
  const scores = Object.values(user.quizzes).filter(score => score > 0);
  return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
}

function calculateMinigameAverage(user) {
  const scores = Object.values(user.minigames).filter(score => score > 0);
  return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
}

function calculateQuizTotal(user) {
  return Object.values(user.quizzes).reduce((sum, score) => sum + (score || 0), 0);
}

function calculateMinigameTotal(user) {
  return Object.values(user.minigames).reduce((sum, score) => sum + (score || 0), 0);
}

function getQuizCount(user) {
  return Object.values(user.quizzes).filter(score => score > 0).length;
}

function getMinigameCount(user) {
  return Object.values(user.minigames).filter(score => score > 0).length;
}

function calculateUserCompletion(user) {
  const totalCompleted = getQuizCount(user) + getMinigameCount(user);
  return Math.round((totalCompleted / 10) * 100); // 10 total activities
}

// Sorting functions
function sortDataByQuiz(data) {
  return [...data].sort((a, b) => {
    if (activeTab === 'quiz' && currentSort.field !== 'average') {
      // Sort by specific quiz score if selected
      if (['quiz1', 'quiz2', 'quiz3', 'quiz4', 'quiz5'].includes(currentSort.field)) {
        const aScore = a.quizzes[currentSort.field] || 0;
        const bScore = b.quizzes[currentSort.field] || 0;
        return currentSort.direction === 'asc' ? aScore - bScore : bScore - aScore;
      }
    }
    
    // Default sort by average
    const aAvg = calculateQuizAverage(a);
    const bAvg = calculateQuizAverage(b);
    return currentSort.direction === 'asc' ? aAvg - bAvg : bAvg - aAvg;
  });
}

function sortDataByMinigame(data) {
  return [...data].sort((a, b) => {
    if (activeTab === 'minigame' && currentSort.field !== 'average') {
      // Sort by specific minigame score if selected
      if (['recycling', 'energy', 'water', 'builder', 'carbon'].includes(currentSort.field)) {
        const aScore = a.minigames[currentSort.field] || 0;
        const bScore = b.minigames[currentSort.field] || 0;
        return currentSort.direction === 'asc' ? aScore - bScore : bScore - aScore;
      }
    }
    
    // Default sort by average
    const aAvg = calculateMinigameAverage(a);
    const bAvg = calculateMinigameAverage(b);
    return currentSort.direction === 'asc' ? aAvg - bAvg : bAvg - aAvg;
  });
}

function sortDataByOverall(data) {
  return [...data].sort((a, b) => {
    if (activeTab === 'overall' && currentSort.field !== 'total-points') {
      // Sort by specific fields if selected
      if (currentSort.field === 'quiz-total') {
        const aTotal = calculateQuizTotal(a);
        const bTotal = calculateQuizTotal(b);
        return currentSort.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
      } 
      else if (currentSort.field === 'minigame-total') {
        const aTotal = calculateMinigameTotal(a);
        const bTotal = calculateMinigameTotal(b);
        return currentSort.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
      }
      else if (currentSort.field === 'completion') {
        const aCompletion = calculateUserCompletion(a);
        const bCompletion = calculateUserCompletion(b);
        return currentSort.direction === 'asc' ? aCompletion - bCompletion : bCompletion - aCompletion;
      }
    }
    
    // Default sort by total points
    const aTotalPoints = calculateQuizTotal(a) + calculateMinigameTotal(a);
    const bTotalPoints = calculateQuizTotal(b) + calculateMinigameTotal(b);
    return currentSort.direction === 'asc' ? aTotalPoints - bTotalPoints : bTotalPoints - aTotalPoints;
  });
}

function getRankClass(rank) {
  if (rank === 1) return 'rank-1';
  if (rank === 2) return 'rank-2';
  if (rank === 3) return 'rank-3';
  return 'rank-other';
}

function getScoreClass(score) {
  if (score >= 90) return 'score-excellent';
  if (score >= 80) return 'score-good';
  if (score >= 70) return 'score-average';
  return 'score-poor';
}

function getScoreLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Average';
  return 'Needs Work';
}

function getCompletionClass(rate) {
  if (rate >= 80) return 'completion-excellent';
  if (rate >= 60) return 'completion-good';
  if (rate >= 40) return 'completion-average';
  return 'completion-poor';
}

// Event listeners and interaction functions
function bindEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('user-search');
  searchInput.addEventListener('input', handleSearch);

  // Control buttons
  document.getElementById('refresh-btn').addEventListener('click', refreshData);
  document.getElementById('export-btn').addEventListener('click', exportData);

  // Tab change listeners
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
    tab.addEventListener('shown.bs.tab', function (e) {
      const targetId = e.target.getAttribute('data-bs-target');
      if (targetId === '#quiz-scores') activeTab = 'quiz';
      else if (targetId === '#minigame-scores') activeTab = 'minigame';
      else if (targetId === '#overall-scores') activeTab = 'overall';
      
      // Reset sorting to default for the active tab
      if (activeTab === 'quiz') {
        currentSort = { field: 'average', direction: 'desc' };
      } else if (activeTab === 'minigame') {
        currentSort = { field: 'average', direction: 'desc' };
      } else if (activeTab === 'overall') {
        currentSort = { field: 'total-points', direction: 'desc' };
      }
      
      // Render the active tab
      renderAllTables();
    });
  });
  
  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(button => {
    button.addEventListener('click', function() {
      const field = this.getAttribute('data-sort');
      const table = this.getAttribute('data-table');
      
      // Update active tab if needed
      if (table === 'quiz') activeTab = 'quiz';
      else if (table === 'minigame') activeTab = 'minigame';
      else if (table === 'overall') activeTab = 'overall';
      
      // Toggle sort direction if same field
      if (currentSort.field === field) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.field = field;
        currentSort.direction = 'desc'; // Default to descending for new field
      }
      
      // Update sort arrows
      document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('asc', 'desc');
      });
      this.classList.add(currentSort.direction);
      
      // Update sort arrows
      document.querySelectorAll('.sort-arrow').forEach(arrow => {
        arrow.textContent = '▲';
      });
      
      if (currentSort.direction === 'desc') {
        this.querySelector('.sort-arrow').textContent = '▼';
      }
      
      renderAllTables();
    });
  });
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  
  if (searchTerm === '') {
    filteredData = [...scoresData];
  } else {
    filteredData = scoresData.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }
  
  renderAllTables();
  renderStatistics();
}

function viewUserDetails(userId) {
  const user = scoresData.find(u => u.id === userId);
  if (!user) return;
  
  const modalBody = document.getElementById('score-modal-body');
  modalBody.innerHTML = createUserDetailsHTML(user);
  
  const modal = new bootstrap.Modal(document.getElementById('userScoreModal'));
  modal.show();
}

function createUserDetailsHTML(user) {
  const quizAvg = calculateQuizAverage(user);
  const minigameAvg = calculateMinigameAverage(user);
  const totalCompletion = calculateUserCompletion(user);
  
  // Define the quiz and minigame info objects if they're not already defined
  const quizInfoDisplay = window.quizInfo || {
    quiz1: 'Ecology Basics',
    quiz2: 'Climate Change',
    quiz3: 'Renewable Energy',
    quiz4: 'Water Conservation',
    quiz5: 'Sustainable Living'
  };
  
  const minigameInfoDisplay = window.minigameInfo || {
    recycling: 'Recycling Hero',
    energy: 'Energy Saver',
    water: 'Water Guardian',
    builder: 'Eco Builder',
    carbon: 'Carbon Fighter'
  };
  
  return `
    <div class="row">
      <div class="col-md-4">
        <div class="text-center mb-4">
          <h4 class="mt-3">${user.username}</h4>
          <p class="text-muted">${user.email}</p>
          <div class="badges">
            ${user.badges.map(badge => `<span class="badge bg-success me-1">${badge}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="score-details-grid">
          <div class="score-detail-card">
            <h6>📊 Quiz Performance</h6>
            <div class="detail-row">
              <span class="detail-label">Average Score:</span>
              <span class="detail-value">${quizAvg.toFixed(1)}%</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Quizzes Completed:</span>
              <span class="detail-value">${getQuizCount(user)}/5</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Total Points:</span>
              <span class="detail-value">${calculateQuizTotal(user)}</span>
            </div>
          </div>
          
          <div class="score-detail-card">
            <h6>🎮 Minigame Performance</h6>
            <div class="detail-row">
              <span class="detail-label">Average Score:</span>
              <span class="detail-value">${minigameAvg.toFixed(1)}%</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Games Played:</span>
              <span class="detail-value">${getMinigameCount(user)}/5</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Total Points:</span>
              <span class="detail-value">${calculateMinigameTotal(user)}</span>
            </div>
          </div>
          
          <div class="score-detail-card">
            <h6>🏆 Overall Stats</h6>
            <div class="detail-row">
              <span class="detail-label">Total Points:</span>
              <span class="detail-value">${calculateQuizTotal(user) + calculateMinigameTotal(user)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Completion Rate:</span>
              <span class="detail-value">${totalCompletion}%</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Member Since:</span>
              <span class="detail-value">${formatDate(user.joinDate)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Last Active:</span>
              <span class="detail-value">${formatDate(user.lastActive)}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h6>📋 Individual Quiz Scores</h6>
          <div class="row">
            ${Object.entries(quizInfoDisplay).map(([key, name]) => `
              <div class="col-md-6 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">${name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="h5 mb-0">${user.quizzes[key] || 'Not taken'}</span>
                      ${user.quizzes[key] ? `<span class="badge ${getScoreClass(user.quizzes[key])}">${getScoreLabel(user.quizzes[key])}</span>` : ''}
                    </div>
                    ${user.quizzes[key] ? `
                      <div class="progress mt-2">
                        <div class="progress-bar bg-primary" style="width: ${user.quizzes[key]}%"></div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="mt-4">
          <h6>🎮 Individual Minigame Scores</h6>
          <div class="row">
            ${Object.entries(minigameInfoDisplay).map(([key, name]) => `
              <div class="col-md-6 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">${name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="h5 mb-0">${user.minigames[key] || 'Not played'}</span>
                      ${user.minigames[key] ? `<span class="badge ${getScoreClass(user.minigames[key])}">${getScoreLabel(user.minigames[key])}</span>` : ''}
                    </div>
                    ${user.minigames[key] ? `
                      <div class="progress mt-2">
                        <div class="progress-bar bg-success" style="width: ${user.minigames[key]}%"></div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function refreshData() {
  document.getElementById('refresh-btn').innerHTML = '🔄 Refreshing...';
  
  setTimeout(() => {
    renderStatistics();
    renderAllTables();
    document.getElementById('refresh-btn').innerHTML = '🔄 Refresh';
    showToast('Data refreshed successfully!', 'success');
  }, 1000);
}

function exportData() {
  const csvContent = generateCSV();
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `user-scores-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  
  showToast('Data exported successfully!', 'success');
}

function generateCSV() {
  const headers = ['Username', 'Email', 'Quiz Average', 'Minigame Average', 'Total Points', 'Completion Rate'];
  
  const rows = filteredData.map((user) => {
    const quizAvg = calculateQuizAverage(user);
    const minigameAvg = calculateMinigameAverage(user);
    const totalPoints = calculateQuizTotal(user) + calculateMinigameTotal(user);
    const completionRate = calculateUserCompletion(user);
    
    return [
      user.username,
      user.email,
      quizAvg.toFixed(1),
      minigameAvg.toFixed(1),
      totalPoints,
      completionRate + '%'
    ].join(',');
  });
  
  return [headers.join(','), ...rows].join('\n');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed`;
  toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  toast.innerHTML = `
    <div class="d-flex align-items-center">
      <span>${message}</span>
      <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3000);
}