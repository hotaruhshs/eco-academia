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
