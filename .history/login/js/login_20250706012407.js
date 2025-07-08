// Simulate login for static prototype
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Show/hide password functionality
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
if (togglePasswordBtn && passwordInput && eyeOpen && eyeClosed) {
    togglePasswordBtn.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'inline';
            togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            passwordInput.type = 'password';
            eyeOpen.style.display = 'inline';
            eyeClosed.style.display = 'none';
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }
    });
}

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
