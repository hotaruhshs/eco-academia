// Admin Profile JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Profile form submission with password change option
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      // Check if password fields are filled - only process password change if all fields are filled
      if (newPassword || confirmPassword) {
        // Password validation
        if (!currentPassword) {
          showNotification('Current password is required to change password', 'error');
          return;
        }
        
        if (newPassword !== confirmPassword) {
          showNotification('New passwords do not match', 'error');
          return;
        }
        
        // In a real app, this would validate the current password against stored value
        // and then update the password securely
        localStorage.setItem('adminPassword', newPassword);
        showNotification('Password updated successfully!');
        
        // Clear password fields after successful update
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
      }
      
      // Simulate saving profile data to localStorage
      const profileData = {
        fullName,
        email,
        phone,
        role: 'Administrator'
      };
      
      localStorage.setItem('adminProfileData', JSON.stringify(profileData));
      
      // Show success message
      showNotification('Profile information updated successfully!');
    });
  }
  
  // Preferences form submission
  const preferencesForm = document.getElementById('preferences-form');
  if (preferencesForm) {
    preferencesForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const emailNotifications = document.getElementById('emailNotifications').checked;
      const newUserAlert = document.getElementById('newUserAlert').checked;
      const quizCompletionAlert = document.getElementById('quizCompletionAlert').checked;
      
      // Save preferences to localStorage
      const preferences = {
        emailNotifications,
        newUserAlert,
        quizCompletionAlert
      };
      
      localStorage.setItem('adminPreferences', JSON.stringify(preferences));
      
      // Show success message
      showNotification('Preferences saved successfully!');
    });
  }
  
  // Profile picture upload
  const profileUpload = document.getElementById('profile-upload');
  const profilePicture = document.querySelector('.profile-picture');
  
  if (profileUpload && profilePicture) {
    profileUpload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          // Replace the letter with the uploaded image
          profilePicture.innerHTML = '';
          profilePicture.style.backgroundImage = `url(${e.target.result})`;
          profilePicture.style.backgroundSize = 'cover';
          profilePicture.style.backgroundPosition = 'center';
          
          // Store in localStorage (in a real app, this would be uploaded to a server)
          localStorage.setItem('adminProfilePicture', e.target.result);
          
          // Show success message
          showNotification('Profile picture updated successfully!');
        };
        reader.readAsDataURL(file);
      } else {
        showNotification('Please select a valid image file', 'error');
      }
    });
  }
  
  // Load saved profile data if exists
  loadSavedProfileData();
});

// Function to show notification toast
function showNotification(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `notification-toast ${type}`;
  toast.textContent = message;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Function to load saved profile data from localStorage
function loadSavedProfileData() {
  // Load profile data
  const savedProfileData = localStorage.getItem('adminProfileData');
  if (savedProfileData) {
    const profileData = JSON.parse(savedProfileData);
    
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (fullNameInput) fullNameInput.value = profileData.fullName || '';
    if (emailInput) emailInput.value = profileData.email || '';
    if (phoneInput) phoneInput.value = profileData.phone || '';
  }
  
  // Load preferences
  const savedPreferences = localStorage.getItem('adminPreferences');
  if (savedPreferences) {
    const preferences = JSON.parse(savedPreferences);
    
    const emailNotificationsCheckbox = document.getElementById('emailNotifications');
    const newUserAlertCheckbox = document.getElementById('newUserAlert');
    const quizCompletionAlertCheckbox = document.getElementById('quizCompletionAlert');
    
    if (emailNotificationsCheckbox) emailNotificationsCheckbox.checked = preferences.emailNotifications;
    if (newUserAlertCheckbox) newUserAlertCheckbox.checked = preferences.newUserAlert;
    if (quizCompletionAlertCheckbox) quizCompletionAlertCheckbox.checked = preferences.quizCompletionAlert;
  }
  
  // Load profile picture
  const savedProfilePicture = localStorage.getItem('adminProfilePicture');
  const profilePicture = document.querySelector('.profile-picture');
  
  if (savedProfilePicture && profilePicture) {
    profilePicture.innerHTML = '';
    profilePicture.style.backgroundImage = `url(${savedProfilePicture})`;
    profilePicture.style.backgroundSize = 'cover';
    profilePicture.style.backgroundPosition = 'center';
  }
}
