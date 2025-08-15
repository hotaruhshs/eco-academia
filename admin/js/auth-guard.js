// Authentication guard to protect admin pages
// This script should be included in all admin HTML pages

// Check authentication state when the page loads
firebase.auth().onAuthStateChanged((user) => {
	if (!user) {
		// User is not authenticated, redirect to login page
		console.log('User not authenticated, redirecting to login...');
		window.location.href = '../index.html';
		return;
	}

	// Verify admin access before allowing entry
	verifyAdminAccess(user)
		.then((isAdmin) => {
			if (!isAdmin) {
				console.warn('Authenticated user is not an admin. Access denied.');
				alert('Access denied: Your account does not have admin permissions.');
				firebase.auth().signOut().finally(() => {
					window.location.href = '../index.html';
				});
				return;
			}

			console.log('Admin authenticated:', user.email);
			// Optional: Update user info in the sidebar if elements exist
			updateUserInfo(user);
		})
		.catch((error) => {
			console.error('Error verifying admin access:', error);
			alert('Unable to verify admin permissions. Please try again later.');
			firebase.auth().signOut().finally(() => {
				window.location.href = '../index.html';
			});
		});
});

// Determine whether the current user has admin access
function verifyAdminAccess(user) {
	const db = firebase.database();
	const uid = user.uid;

	// Strategy 1 (preferred): admins/{uid} === true
	const adminsRef = db.ref('admins/' + uid);
	// Strategy 2: users/{uid}/role === 'admin'
	const roleRef = db.ref('users/' + uid + '/role');
	// Strategy 3 (legacy/compat): users/admin/email matches current user email
	const legacyEmailRef = db.ref('users/admin/email');

	return adminsRef.once('value').then((snap) => {
		if (snap.exists() && snap.val() === true) {
			return true;
		}
		return roleRef.once('value').then((roleSnap) => {
			if (
				roleSnap.exists() &&
				(String(roleSnap.val() || '').toLowerCase() === 'admin')
			) {
				return true;
			}
			return legacyEmailRef.once('value').then((emailSnap) => {
				const legacyEmail = String(emailSnap.val() || '').toLowerCase();
				return (
					legacyEmail && legacyEmail === String(user.email || '').toLowerCase()
				);
			});
		});
	});
}

// Function to update user information in the sidebar
function updateUserInfo(user) {
	const profileName = document.querySelector('.sidebar-profile-name');
	const profileEmail = document.querySelector('.sidebar-profile-email');
	
	if (profileName && user.displayName) {
		profileName.textContent = user.displayName;
	}
	
	if (profileEmail && user.email) {
		profileEmail.textContent = user.email;
	}
}

// Function to handle logout (to be called by logout buttons)
function handleLogout() {
	firebase.auth().signOut().then(() => {
		console.log('User signed out successfully');
		window.location.href = '../index.html';
	}).catch((error) => {
		console.error('Error signing out:', error);
		alert('Error signing out. Please try again.');
	});
}

// Make logout function globally available
window.handleLogout = handleLogout;
