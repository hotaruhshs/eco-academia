// Simulate login for static prototype
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Show/hide password functionality
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.textContent = '\u{1F441}\u{FE0E}\u{200D}\u{1F5E8}'; // eye with speech bubble for 'show'
            togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            passwordInput.type = 'password';
            eyeIcon.textContent = '\u{1F441}'; // plain eye for 'hide'
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
