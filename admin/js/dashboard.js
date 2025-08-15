// dashboard.js
// Dashboard functionality for Firebase integration
console.log('Dashboard loaded');

// Chart.js sample bar chart for progress
window.addEventListener('DOMContentLoaded', function () {
  // Mobile hamburger menu functionality
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active');
      
      // Add/remove body scroll lock when mobile menu is open
      if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && 
          !sidebar.contains(e.target) && 
          !mobileMenuToggle.contains(e.target) &&
          sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        sidebar.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Keyboard support for hamburger menu
    mobileMenuToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
      }
    });
  }

  // Initialize dashboard data from Firebase
  initializeDashboardData();

  // Quiz progress bar animation
  const quizProgressBar = document.querySelector('.quiz-progress-fill');
  if (quizProgressBar) {
    const progressValue = quizProgressBar.getAttribute('data-progress');
    setTimeout(() => {
      quizProgressBar.style.width = progressValue + '%';
    }, 500);
  }

  // Quiz performance donut chart animation and interactions
  const donutSegments = document.querySelectorAll('.donut-segment');
  const legendItems = document.querySelectorAll('.legend-item');
  
  if (donutSegments.length > 0) {
    // Add hover interactions between segments and legend
    donutSegments.forEach((segment, index) => {
      const label = segment.getAttribute('data-label');
      const value = segment.getAttribute('data-value');
      
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'chart-tooltip';
      tooltip.textContent = `${label}: ${value}`;
      tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 4px 8px;
        font-size: 8px;
        border-radius: 0;
        border: 1px solid #334155;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        transform: translate(-50%, -100%);
        margin-top: -8px;
      `;
      
      document.body.appendChild(tooltip);
      
      segment.addEventListener('mouseenter', (e) => {
        const rect = segment.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top + 'px';
        tooltip.style.opacity = '1';
        
        // Highlight corresponding legend item
        if (legendItems[index]) {
          legendItems[index].style.background = '#e2e8f0';
        }
      });
      
      segment.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        
        // Remove legend highlight
        if (legendItems[index]) {
          legendItems[index].style.background = '';
        }
      });
    });
    
    // Add legend hover interactions
    legendItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        if (donutSegments[index]) {
          donutSegments[index].style.strokeWidth = '25';
          donutSegments[index].style.filter = 'brightness(1.1)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (donutSegments[index]) {
          donutSegments[index].style.strokeWidth = '';
          donutSegments[index].style.filter = '';
        }
      });
    });
  }

  // Enhanced keyboard navigation for chart segments
  const chartSegments = document.querySelectorAll('.donut-segment');
  chartSegments.forEach((segment, index) => {
    segment.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Trigger hover effect programmatically
        segment.dispatchEvent(new Event('mouseenter'));
        setTimeout(() => {
          segment.dispatchEvent(new Event('mouseleave'));
        }, 2000);
      }
    });
  });

  // Sidebar navigation keyboard support
  const navLinks = document.querySelectorAll('.sidebar-content a');
  navLinks.forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Remove active class from all links
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        // Add active class to current link
        link.parentElement.classList.add('active');
        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 100);
      }
    });
  });
});

// Initialize dashboard data from Firebase
function initializeDashboardData() {
  // TODO: Replace with Firebase data fetching
  // Example structure:
  // firebase.firestore().collection('dashboard-stats').doc('overview').get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       const data = doc.data();
  //       updateDashboardStats(data);
  //       renderChart(data.quizPerformance);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching dashboard data:", error);
  //   });

  // Placeholder for now
  console.log('Dashboard data initialization - Firebase integration pending');
  
  // Initialize chart with placeholder data
  if (document.getElementById('progressChart')) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    // Load Chart.js from CDN if not present
    if (typeof Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => renderChart(ctx);
      document.head.appendChild(script);
    } else {
      renderChart(ctx);
    }
  }
}

// Update dashboard statistics
function updateDashboardStats(data) {
  // TODO: Update dashboard statistics with Firebase data
  // Example:
  // document.getElementById('total-users').textContent = data.totalUsers;
  // document.getElementById('active-quizzes').textContent = data.activeQuizzes;
  // document.getElementById('avg-score').textContent = data.averageScore + '%';
  // document.getElementById('completion-rate').textContent = data.completionRate + '%';
}

function renderChart(ctx) {
  // TODO: Replace with dynamic data from Firebase
  // For now, render empty chart structure
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
      datasets: [{
        label: 'Average Score',
        data: [0, 0, 0, 0], // Placeholder data
        backgroundColor: '#a8e063',
        borderColor: '#388e3c',
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Quiz Performance' }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}
