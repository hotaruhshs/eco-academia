// dashboard.js
// Add interactivity here if needed
console.log('Dashboard loaded');

// Chart.js sample bar chart for progress
window.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburgerMenu');
  const sidebarLinks = document.getElementById('sidebarLinks');
  if (hamburger && sidebarLinks) {
    hamburger.addEventListener('click', function () {
      sidebarLinks.classList.toggle('active');
    });
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sidebarLinks.classList.toggle('active');
      }
    });
  }

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

function renderChart(ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
      datasets: [{
        label: 'Average Score',
        data: [85, 90, 78, 92],
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
