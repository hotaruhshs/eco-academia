// Simulate login for static prototype
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Show/hide password functionality
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
let passwordVisible = false;

if (togglePasswordBtn && passwordInput && eyeIcon) {
    function setEyeIcon(visible) {
        if (visible) {
            // Eye-off SVG
            eyeIcon.innerHTML = '<line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/><path d="M17.94 17.94C16.12 19.13 14.13 19.8 12 19.8c-7 0-11-7.8-11-7.8a21.77 21.77 0 0 1 5.06-6.06M9.5 9.5a3 3 0 0 1 4.24 4.24" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>';
        } else {
            // Eye SVG
            eyeIcon.innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>';
        }
    }

    togglePasswordBtn.addEventListener('click', function () {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? 'text' : 'password';
        setEyeIcon(passwordVisible);
        togglePasswordBtn.setAttribute('aria-label', passwordVisible ? 'Hide password' : 'Show password');
    });

    togglePasswordBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePasswordBtn.click();
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
