// Simulate login for static prototype
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simulate login: accept any non-empty username/password
    if (username && password) {
        loginMessage.style.color = '#388e3c';
        loginMessage.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
            window.location.href = '../dashboard/index.html'; // Placeholder redirect
        }, 1200);
    } else {
        loginMessage.style.color = '#d32f2f';
        loginMessage.textContent = 'Please enter both username and password.';
    }
});
