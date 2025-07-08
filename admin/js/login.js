// Simulate login for static prototype
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Show/hide password functionality
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
let passwordVisible = false;

function setEyeIcon(visible) {
    if (visible) {
        // Eye-off SVG (full icon)
        eyeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94C16.12 19.13 14.13 19.8 12 19.8c-7 0-11-7.8-11-7.8a21.77 21.77 0 0 1 5.06-6.06"/><path d="M1 1l22 22"/><path d="M9.5 9.5a3 3 0 0 1 4.24 4.24"/><circle cx="12" cy="12" r="3"/></svg>';
    } else {
        // Eye SVG (full icon)
        eyeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
}

if (togglePasswordBtn && passwordInput && eyeIcon) {
    setEyeIcon(false); // Ensure initial icon is correct
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
            window.location.href = 'admin/dashboard.html'; // Corrected redirect path
        }, 1200);
    } else {
        loginMessage.style.color = '#d32f2f';
        loginMessage.textContent = 'Please enter both username and password.';
    }
});
