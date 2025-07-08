document.addEventListener('DOMContentLoaded', function () {
  // Simulate loading statistics
  setTimeout(() => {
    document.getElementById('stats').textContent = '42 Eco Points | 5 Badges | 3 Challenges Completed';
  }, 800);

  // Simulate loading recent activity
  setTimeout(() => {
    const activity = [
      'Completed "Plastic-Free Week" challenge',
      'Earned the "Green Thumb" badge',
      'Logged in from new device',
    ];
    const list = document.getElementById('activity-list');
    list.innerHTML = '';
    activity.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  }, 1200);
});
