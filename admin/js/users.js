// Users Management functionality for Firebase Realtime Database
class UsersManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUsers();
        this.updateStats();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('user-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterUsers(e.target.value));
        }

        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.filterUsers());
        }

        // Progress filter
        const progressFilter = document.getElementById('progress-filter');
        if (progressFilter) {
            progressFilter.addEventListener('change', (e) => this.filterUsers());
        }

        // Add user button
        const addUserBtn = document.getElementById('add-user-btn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.showAddUserModal());
        }

        // Save new user button
        const saveNewUserBtn = document.getElementById('save-new-user-btn');
        if (saveNewUserBtn) {
            console.log('Save new user button found, adding event listener'); // Debug log
            saveNewUserBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                console.log('Save new user button clicked'); // Debug log
                this.saveNewUser();
            });
        } else {
            console.error('Save new user button not found!'); // Debug log
        }

        // Prevent form submission on Enter key (but don't call saveNewUser to avoid double execution)
        const addUserForm = document.getElementById('add-user-form');
        if (addUserForm) {
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent form submission
                console.log('Form submit prevented'); // Debug log
            });
        }

        // Sort buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sort-btn')) {
                const sortBy = e.target.dataset.sort;
                this.sortUsers(sortBy);
            }
        });

        // Pagination
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                const page = parseInt(e.target.dataset.page);
                this.goToPage(page);
            }
        });
    }

    loadUsers() {
        const usersRef = firebase.database().ref('users');
        
        usersRef.on('value', (snapshot) => {
            this.users = [];
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const rawUser = childSnapshot.val();
                    const user = {
                        id: childSnapshot.key,
                        ...this.mapUserData(rawUser) // Map data to expected format
                    };
                    
                    // Filter out admin users from the display
                    if (!this.isAdminUser(user)) {
                        this.users.push(user);
                    }
                });
            }
            this.renderUsers();
            this.updateStats();
        }, (error) => {
            console.error('Error loading users:', error);
            this.showNotification('Error loading users', 'error');
        });
    }

    // Check if a user is an admin
    isAdminUser(user) {
        // Check various admin indicators
        const credentials = user.originalData?.Credentials || '';
        const email = user.email || user.originalData?.EmailData || '';
        
        // Admin by credentials
        if (credentials.toLowerCase() === 'admin') {
            return true;
        }
        
        // Admin by email (legacy check)
        if (email.toLowerCase() === 'admin@ecoacademia.com') {
            return true;
        }
        
        // Admin by user ID (check if exists in admins node)
        // This would require an additional Firebase call, so we'll skip it for performance
        // but you could implement it if needed
        
        return false;
    }

    // Map user data from various formats to expected admin panel format
    mapUserData(rawUser) {
        return {
            // Handle both naming conventions
            name: rawUser.name || rawUser.UsernameData || 'Unknown User',
            email: rawUser.email || rawUser.EmailData || 'No Email',
            
            // Map status values
            status: this.mapStatus(rawUser.status || rawUser.Status),
            
            // Set defaults for missing fields
            progress: rawUser.progress || 0,
            joinDate: rawUser.joinDate || rawUser.createdAt || new Date().toISOString(),
            
            // Preserve original data for compatibility
            originalData: rawUser
        };
    }

    // Map status values to admin panel expectations
    mapStatus(status) {
        if (!status) return 'inactive';
        
        const statusMap = {
            'logged out': 'inactive',
            'logged in': 'active',
            'active': 'active',
            'inactive': 'inactive'
        };
        
        return statusMap[status.toLowerCase()] || 'inactive';
    }

    renderUsers() {
        const tbody = document.getElementById('users-tbody');
        if (!tbody) return;

        const filteredUsers = this.getFilteredUsers();
        const resultsCount = document.getElementById('results-count');
        
        if (resultsCount) {
            resultsCount.textContent = `Showing ${filteredUsers.length} users`;
        }

        tbody.innerHTML = '';

        if (filteredUsers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        No users found matching your criteria
                    </td>
                </tr>
            `;
            return;
        }

        filteredUsers.forEach(user => {
            const row = this.createUserRow(user);
            tbody.appendChild(row);
        });
    }

    createUserRow(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>
                <span class="status-badge ${user.status || 'inactive'}">
                    ${user.status || 'Inactive'}
                </span>
            </td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${user.progress || 0}%"></div>
                    <span class="progress-text">${user.progress || 0}%</span>
                </div>
            </td>
            <td>${this.formatDate(user.joinDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary view-user-btn" data-user-id="${user.id}">
                        <span class="icon">👁️</span>
                    </button>
                    <button class="btn btn-sm btn-outline-warning edit-user-btn" data-user-id="${user.id}">
                        <span class="icon">✏️</span>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-user-btn" data-user-id="${user.id}">
                        <span class="icon">🗑️</span>
                    </button>
                </div>
            </td>
        `;

        // Add event listeners to action buttons
        row.querySelector('.view-user-btn').addEventListener('click', () => this.viewUser(user.id));
        row.querySelector('.edit-user-btn').addEventListener('click', () => this.editUser(user.id));
        row.querySelector('.delete-user-btn').addEventListener('click', () => this.deleteUser(user.id));

        return row;
    }

    getFilteredUsers() {
        let filtered = [...this.users];

        // Search filter
        const searchTerm = document.getElementById('user-search')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(user => 
                (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                (user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.id && user.id.toLowerCase().includes(searchTerm))
            );
        }

        // Status filter
        const statusFilter = document.getElementById('status-filter')?.value;
        if (statusFilter) {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // Progress filter
        const progressFilter = document.getElementById('progress-filter')?.value;
        if (progressFilter) {
            filtered = filtered.filter(user => {
                const progress = user.progress || 0;
                switch (progressFilter) {
                    case 'high': return progress >= 80;
                    case 'medium': return progress >= 50 && progress < 80;
                    case 'low': return progress < 50;
                    default: return true;
                }
            });
        }

        return filtered;
    }

    filterUsers() {
        this.renderUsers();
    }

    sortUsers(sortBy) {
        const filteredUsers = this.getFilteredUsers();
        
        filteredUsers.sort((a, b) => {
            let aVal = a[sortBy] || '';
            let bVal = b[sortBy] || '';

            if (sortBy === 'joinDate') {
                aVal = new Date(aVal || 0);
                bVal = new Date(bVal || 0);
            } else if (sortBy === 'progress') {
                aVal = parseFloat(aVal) || 0;
                bVal = parseFloat(bVal) || 0;
            } else {
                aVal = aVal.toString().toLowerCase();
                bVal = bVal.toString().toLowerCase();
            }

            if (aVal < bVal) return -1;
            if (aVal > bVal) return 1;
            return 0;
        });

        this.renderUsers();
    }

    showAddUserModal() {
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        modal.show();
    }

    saveNewUser() {
        console.log('saveNewUser function called'); // Debug log
        
        const username = document.getElementById('add-username').value.trim();
        const email = document.getElementById('add-email').value.trim();
        const credentials = document.getElementById('add-credentials').value;
        const status = document.getElementById('add-status').value;
        const password = document.getElementById('add-password').value.trim();

        console.log('Form values:', { username, email, credentials, status, password }); // Debug log

        if (!username || !email || !password) {
            console.log('Validation failed: missing required fields'); // Debug log
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            console.log('Validation failed: invalid email'); // Debug log
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        console.log('Validation passed, creating user...'); // Debug log

        // Test Firebase connection first
        const testRef = firebase.database().ref('.info/connected');
        testRef.once('value')
            .then((snapshot) => {
                const isConnected = snapshot.val();
                console.log('Firebase connection status:', isConnected); // Debug log
                
                if (!isConnected) {
                    console.log('Firebase not connected, attempting to save anyway...'); // Debug log
                }
                
                // Save in the format that matches your groupmate's structure
                const newUser = {
                    UsernameData: username,
                    EmailData: email,
                    Credentials: credentials,
                    Status: status,
                    PasswordData: password, // Note: This should be removed in production
                    progress: 0,
                    joinDate: new Date().toISOString(),
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                };

                console.log('User object to save:', newUser); // Debug log

                const usersRef = firebase.database().ref('users');
                console.log('Attempting to save to Firebase...'); // Debug log
                
                usersRef.push(newUser)
                    .then((snapshot) => {
                        console.log('User saved successfully with key:', snapshot.key); // Debug log
                        this.showNotification('User added successfully', 'success');
                        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
                        modal.hide();
                        this.clearAddUserForm();
                    })
                    .catch((error) => {
                        console.error('Firebase Error Details:', {
                            code: error.code,
                            message: error.message,
                            details: error
                        });
                        
                        let errorMessage = 'Error adding user';
                        if (error.code === 'PERMISSION_DENIED') {
                            errorMessage = 'Permission denied. Check Firebase database rules.';
                        } else if (error.code === 'UNAVAILABLE') {
                            errorMessage = 'Firebase is unavailable. Check your internet connection.';
                        } else {
                            errorMessage = 'Error adding user: ' + error.message;
                        }
                        
                        this.showNotification(errorMessage, 'error');
                    });
            })
            .catch((error) => {
                console.error('Firebase connection test failed:', error);
                this.showNotification('Cannot connect to Firebase. Check your internet connection.', 'error');
            });
    }

    clearAddUserForm() {
        document.getElementById('add-username').value = '';
        document.getElementById('add-email').value = '';
        document.getElementById('add-credentials').value = 'Independent';
        document.getElementById('add-status').value = 'Logged Out';
        document.getElementById('add-password').value = '';
    }

    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="user-details">
                <div class="row">
                    <div class="col-md-6">
                        <h6>User Information</h6>
                        <p><strong>Username:</strong> ${user.name || user.originalData?.UsernameData || 'N/A'}</p>
                        <p><strong>Email:</strong> ${user.email || user.originalData?.EmailData || 'N/A'}</p>
                        <p><strong>Credentials:</strong> ${user.originalData?.Credentials || 'N/A'}</p>
                        <p><strong>Status:</strong> 
                            <span class="status-badge ${user.status || 'inactive'}">
                                ${user.status || user.originalData?.Status || 'Inactive'}
                            </span>
                        </p>
                        <p><strong>Join Date:</strong> ${this.formatDate(user.joinDate)}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Progress Information</h6>
                        <p><strong>Overall Progress:</strong> ${user.progress || 0}%</p>
                        <div class="progress mb-3">
                            <div class="progress-bar" style="width: ${user.progress || 0}%"></div>
                        </div>
                        <p><strong>Last Activity:</strong> ${this.formatDate(user.lastActivity) || 'N/A'}</p>
                    </div>
                </div>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('userModal'));
        modal.show();
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        // For now, we'll show the view modal with edit option
        // In a full implementation, you'd have a separate edit modal
        this.viewUser(userId);
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        // Populate delete confirmation modal
        document.getElementById('delete-user-name').textContent = user.name || 'N/A';
        document.getElementById('delete-user-email').textContent = user.email || 'N/A';

        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();

        // Set up confirm delete button
        const confirmBtn = document.getElementById('confirm-delete-btn');
        confirmBtn.onclick = () => {
            this.performDelete(userId);
            modal.hide();
        };
    }

    performDelete(userId) {
        const userRef = firebase.database().ref(`users/${userId}`);
        userRef.remove()
            .then(() => {
                this.showNotification('User deleted successfully', 'success');
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                this.showNotification('Error deleting user', 'error');
            });
    }

    updateStats() {
        // Users are already filtered to exclude admins in loadUsers()
        const totalUsers = this.users.length;
        const activeUsers = this.users.filter(user => user.status === 'active').length;
        const avgProgress = this.users.length > 0 
            ? Math.round(this.users.reduce((sum, user) => sum + (user.progress || 0), 0) / this.users.length)
            : 0;
        
        // Calculate new users (joined in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = this.users.filter(user => {
            const joinDate = new Date(user.joinDate || 0);
            return joinDate > thirtyDaysAgo;
        }).length;

        // Update stats display
        const totalUsersEl = document.getElementById('total-users');
        const activeUsersEl = document.getElementById('active-users');
        const avgProgressEl = document.getElementById('avg-progress');
        const newUsersEl = document.getElementById('new-users');

        if (totalUsersEl) totalUsersEl.textContent = totalUsers;
        if (activeUsersEl) activeUsersEl.textContent = activeUsers;
        if (avgProgressEl) avgProgressEl.textContent = `${avgProgress}%`;
        if (newUsersEl) newUsersEl.textContent = newUsers;
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize users manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UsersManager();
});
