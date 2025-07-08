/**
 * Users Page JavaScript
 * Handles user management, filtering, sorting, and modal interactions
 */

// Sample user data
const usersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    status: "active",
    progress: 92,
    joinDate: "2025-01-15",
    lastLogin: "2025-07-08",
    quizzesCompleted: 8,
    totalQuizzes: 10,
    avgScore: 87.5,
    bio: "Environmental science student with a passion for sustainability.",
    phone: "+1 (555) 123-4567",
    address: "123 Green Street, Eco City, EC 12345"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    status: "active",
    progress: 78,
    joinDate: "2025-02-01",
    lastLogin: "2025-07-07",
    quizzesCompleted: 6,
    totalQuizzes: 10,
    avgScore: 82.3,
    bio: "Chemistry student interested in green technology.",
    phone: "+1 (555) 234-5678",
    address: "456 Blue Avenue, Eco City, EC 12346"
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@email.com",
    status: "active",
    progress: 45,
    joinDate: "2025-03-10",
    lastLogin: "2025-07-06",
    quizzesCompleted: 3,
    totalQuizzes: 10,
    avgScore: 65.8,
    bio: "Biology student exploring environmental conservation.",
    phone: "+1 (555) 345-6789",
    address: "789 Yellow Road, Eco City, EC 12347"
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@email.com",
    status: "inactive",
    progress: 95,
    joinDate: "2024-12-05",
    lastLogin: "2025-06-15",
    quizzesCompleted: 10,
    totalQuizzes: 10,
    avgScore: 94.2,
    bio: "Graduate student specializing in renewable energy.",
    phone: "+1 (555) 456-7890",
    address: "321 Red Lane, Eco City, EC 12348"
  },
  {
    id: 5,
    name: "Eve Wilson",
    email: "eve.wilson@email.com",
    status: "active",
    progress: 15,
    joinDate: "2025-07-01",
    lastLogin: "2025-07-02",
    quizzesCompleted: 1,
    totalQuizzes: 10,
    avgScore: 72.0,
    bio: "New student interested in environmental studies.",
    phone: "+1 (555) 567-8901",
    address: "654 Purple Court, Eco City, EC 12349"
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    status: "active",
    progress: 88,
    joinDate: "2025-01-20",
    lastLogin: "2025-07-08",
    quizzesCompleted: 9,
    totalQuizzes: 10,
    avgScore: 89.7,
    bio: "Engineering student focused on sustainable design.",
    phone: "+1 (555) 678-9012",
    address: "987 Orange Street, Eco City, EC 12350"
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@email.com",
    status: "active",
    progress: 67,
    joinDate: "2025-02-15",
    lastLogin: "2025-07-07",
    quizzesCompleted: 5,
    totalQuizzes: 10,
    avgScore: 76.4,
    bio: "Physics student researching solar energy applications.",
    phone: "+1 (555) 789-0123",
    address: "147 Pink Avenue, Eco City, EC 12351"
  },
  {
    id: 8,
    name: "Henry Davis",
    email: "henry.davis@email.com",
    status: "active",
    progress: 55,
    joinDate: "2025-03-01",
    lastLogin: "2025-07-05",
    quizzesCompleted: 4,
    totalQuizzes: 10,
    avgScore: 68.9,
    bio: "Environmental policy student with government internship.",
    phone: "+1 (555) 890-1234",
    address: "258 Brown Road, Eco City, EC 12352"
  },
  {
    id: 9,
    name: "Ivy Chen",
    email: "ivy.chen@email.com",
    status: "inactive",
    progress: 30,
    joinDate: "2025-04-01",
    lastLogin: "2025-06-20",
    quizzesCompleted: 2,
    totalQuizzes: 10,
    avgScore: 58.3,
    bio: "Computer science student interested in environmental modeling.",
    phone: "+1 (555) 901-2345",
    address: "369 Gray Lane, Eco City, EC 12353"
  },
  {
    id: 10,
    name: "Jack White",
    email: "jack.white@email.com",
    status: "active",
    progress: 8,
    joinDate: "2025-07-03",
    lastLogin: "2025-07-04",
    quizzesCompleted: 0,
    totalQuizzes: 10,
    avgScore: 0,
    bio: "Recent high school graduate interested in environmental science.",
    phone: "+1 (555) 012-3456",
    address: "741 Silver Court, Eco City, EC 12354"
  }
];

// Global variables
let filteredUsers = [...usersData];
let currentSort = { field: 'name', direction: 'asc' };
let userToDelete = null; // Track user to be deleted

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  updateStats();
  renderUsers();
});

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  document.getElementById('user-search').addEventListener('input', handleSearch);
  
  // Filter functionality
  document.getElementById('status-filter').addEventListener('change', handleFilter);
  document.getElementById('progress-filter').addEventListener('change', handleFilter);
  
  // Sort functionality
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', handleSort);
  });
  
  // Modal functionality
  document.getElementById('edit-user-btn').addEventListener('click', handleEditUser);
  
  // Delete confirmation functionality
  document.getElementById('confirm-delete-btn').addEventListener('click', confirmDeleteUser);
  
  // Add user functionality
  document.getElementById('add-user-btn').addEventListener('click', showAddUserModal);
  document.getElementById('save-new-user-btn').addEventListener('click', saveNewUser);
}

// Handle search functionality
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  
  filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.id.toString().includes(searchTerm)
  );
  
  applyFilters();
  renderUsers();
  updateStats();
}

// Handle filter functionality
function handleFilter() {
  const statusFilter = document.getElementById('status-filter').value;
  const progressFilter = document.getElementById('progress-filter').value;
  
  filteredUsers = usersData.filter(user => {
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesProgress = !progressFilter || getProgressCategory(user.progress) === progressFilter;
    return matchesStatus && matchesProgress;
  });
  
  // Apply search if there's a search term
  const searchTerm = document.getElementById('user-search').value.toLowerCase();
  if (searchTerm) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.id.toString().includes(searchTerm)
    );
  }
  
  renderUsers();
  updateStats();
}

// Apply current filters
function applyFilters() {
  const statusFilter = document.getElementById('status-filter').value;
  const progressFilter = document.getElementById('progress-filter').value;
  
  if (statusFilter) {
    filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
  }
  
  if (progressFilter) {
    filteredUsers = filteredUsers.filter(user => getProgressCategory(user.progress) === progressFilter);
  }
}

// Get progress category
function getProgressCategory(progress) {
  if (progress >= 80) return 'high';
  if (progress >= 50) return 'medium';
  return 'low';
}

// Handle sorting
function handleSort(event) {
  const field = event.target.dataset.sort;
  
  if (currentSort.field === field) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.field = field;
    currentSort.direction = 'asc';
  }
  
  // Update sort button appearance
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.remove('active', 'desc');
  });
  
  event.target.classList.add('active');
  if (currentSort.direction === 'desc') {
    event.target.classList.add('desc');
  }
  
  // Sort the data
  filteredUsers.sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    if (field === 'joinDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (currentSort.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  renderUsers();
}

// Update statistics
function updateStats() {
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(u => u.status === 'active').length;
  const avgProgress = Math.round(filteredUsers.reduce((sum, u) => sum + u.progress, 0) / totalUsers);
  const newUsers = filteredUsers.filter(u => {
    const joinDate = new Date(u.joinDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return joinDate > weekAgo;
  }).length;
  
  document.getElementById('total-users').textContent = totalUsers;
  document.getElementById('active-users').textContent = activeUsers;
  document.getElementById('avg-progress').textContent = `${avgProgress}%`;
  document.getElementById('new-users').textContent = newUsers;
}

// Render users table
function renderUsers() {
  const tbody = document.getElementById('users-tbody');
  const table = document.getElementById('users-table');
  
  // Generate user rows - show all filtered users
  let tableHTML = filteredUsers.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td><span class="status-badge ${user.status}">${user.status}</span></td>
      <td>
        <div class="progress-container">
          <div class="progress-bar-custom">
            <div class="progress-fill ${getProgressCategory(user.progress)}" style="width: ${user.progress}%"></div>
          </div>
          <span class="progress-text">${user.progress}%</span>
        </div>
      </td>
      <td>${formatDate(user.joinDate)}</td>
      <td>
        <button class="action-btn view" onclick="viewUser(${user.id})" title="View User"></button>
        <button class="action-btn edit" onclick="editUser(${user.id})" title="Edit User"></button>
        <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete User"></button>
      </td>
    </tr>
  `).join('');
  
  tbody.innerHTML = tableHTML;
  
  // Add class to table if there are few rows to enable space-filling layout
  if (filteredUsers.length <= 8) {
    table.classList.add('fill-space');
  } else {
    table.classList.remove('fill-space');
  }
  
  // Update results count
  document.getElementById('results-count').textContent = 
    `Showing ${filteredUsers.length} user${filteredUsers.length === 1 ? '' : 's'}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// View user details
function viewUser(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <div class="user-detail-card">
          <h6>Personal Information</h6>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>

        </div>
      </div>
      <div class="col-md-6">
        <div class="user-detail-card">
          <h6>Academic Status</h6>
          <p><strong>Status:</strong> <span class="status-badge ${user.status}">${user.status}</span></p>
          <p><strong>Progress:</strong> ${user.progress}%</p>
          <p><strong>Join Date:</strong> ${formatDate(user.joinDate)}</p>
          <p><strong>Last Login:</strong> ${formatDate(user.lastLogin)}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="user-detail-card">
          <h6>Quiz Performance</h6>
          <p><strong>Completed:</strong> ${user.quizzesCompleted}/${user.totalQuizzes} quizzes</p>
          <p><strong>Average Score:</strong> ${user.avgScore}%</p>
          <p><strong>Completion Rate:</strong> ${Math.round((user.quizzesCompleted / user.totalQuizzes) * 100)}%</p>
        </div>
      </div>
    </div>
  `;
  
  // Reset modal title and button
  document.getElementById('userModalLabel').textContent = 'User Details';
  document.getElementById('edit-user-btn').textContent = 'Edit User';
  document.getElementById('edit-user-btn').onclick = () => editUser(userId);
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('userModal'));
  modal.show();
}

// Edit user
function editUser(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <form id="edit-user-form">
      <div class="row">
        <div class="col-md-12">
          <div class="user-detail-card">
            <h6>Editable Information</h6>
            <div class="mb-3">
              <label for="edit-name" class="form-label">Name</label>
              <input type="text" class="form-control" id="edit-name" value="${user.name}" required>
            </div>
            <div class="mb-3">
              <label for="edit-email" class="form-label">Email</label>
              <input type="email" class="form-control" id="edit-email" value="${user.email}" required>
            </div>
            <div class="mb-3">
              <label for="edit-status" class="form-label">Status</label>
              <select class="form-select" id="edit-status">
                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="user-detail-card">
            <h6>Read-Only Information</h6>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Progress:</strong> ${user.progress}%</p>
            <p><strong>Join Date:</strong> ${formatDate(user.joinDate)}</p>
            <p><strong>Last Login:</strong> ${formatDate(user.lastLogin)}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="user-detail-card">
            <h6>Quiz Performance</h6>
            <p><strong>Completed:</strong> ${user.quizzesCompleted}/${user.totalQuizzes} quizzes</p>
            <p><strong>Average Score:</strong> ${user.avgScore}%</p>
            <p><strong>Completion Rate:</strong> ${Math.round((user.quizzesCompleted / user.totalQuizzes) * 100)}%</p>
          </div>
        </div>
      </div>
    </form>
  `;
  
  // Update modal title and button
  document.getElementById('userModalLabel').textContent = 'Edit User';
  document.getElementById('edit-user-btn').textContent = 'Save Changes';
  document.getElementById('edit-user-btn').onclick = () => saveUserChanges(userId);
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('userModal'));
  modal.show();
}

// Delete user
function deleteUser(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  
  // Store user to be deleted
  userToDelete = user;
  
  // Update delete modal content
  document.getElementById('delete-user-name').textContent = user.name;
  document.getElementById('delete-user-email').textContent = user.email;
  
  // Show delete confirmation modal
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();
}

// Confirm delete user
function confirmDeleteUser() {
  if (!userToDelete) return;
  
  // Find and remove user from data
  const index = usersData.findIndex(u => u.id === userToDelete.id);
  if (index > -1) {
    usersData.splice(index, 1);
    filteredUsers = [...usersData];
    applyFilters();
    renderUsers();
    updateStats();
    
    // Close delete modal
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
    
    // Show success message
    showSuccessMessage(`User "${userToDelete.name}" has been deleted successfully.`);
    
    // Reset user to delete
    userToDelete = null;
  }
}

// Show success message
function showSuccessMessage(message) {
  // Create and show a toast notification
  const toast = document.createElement('div');
  toast.className = 'toast-notification success';
  toast.textContent = message;
  
  // Add toast to body
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Show add user modal
function showAddUserModal() {
  // Clear form fields
  document.getElementById('add-name').value = '';
  document.getElementById('add-email').value = '';
  document.getElementById('add-status').value = 'active';
  
  // Show modal
  const addModal = new bootstrap.Modal(document.getElementById('addUserModal'));
  addModal.show();
}

// Save new user
function saveNewUser() {
  // Get form values
  const name = document.getElementById('add-name').value.trim();
  const email = document.getElementById('add-email').value.trim();
  const status = document.getElementById('add-status').value;
  
  // Validate form
  if (!name || !email) {
    alert('Please fill in all required fields (Name and Email).');
    return;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Check if email already exists
  if (usersData.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    alert('A user with this email address already exists.');
    return;
  }
  
  // Generate new user ID
  const newId = Math.max(...usersData.map(u => u.id)) + 1;
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Create new user object
  const newUser = {
    id: newId,
    name: name,
    email: email,
    status: status,
    progress: 0,
    joinDate: currentDate,
    lastLogin: currentDate,
    quizzesCompleted: 0,
    totalQuizzes: 10,
    avgScore: 0,
    bio: 'New user account.',
    phone: 'Not provided',
    address: 'Not provided'
  };
  
  // Add to users data
  usersData.push(newUser);
  filteredUsers = [...usersData];
  applyFilters();
  
  // Re-render table and update stats
  renderUsers();
  updateStats();
  
  // Close modal
  const addModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
  addModal.hide();
  
  // Show success message
  showSuccessMessage(`User "${newUser.name}" has been added successfully.`);
}

// Save user changes
function saveUserChanges(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  
  // Get form values
  const name = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const status = document.getElementById('edit-status').value;
  
  // Validate form
  if (!name || !email) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Update user data
  user.name = name;
  user.email = email;
  user.status = status;
  
  // Update filtered users if necessary
  filteredUsers = [...usersData];
  applyFilters();
  
  // Re-render table and update stats
  renderUsers();
  updateStats();
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
  modal.hide();
  
  // Show success message
  alert('User updated successfully!');
}

// Handle edit user button in modal
function handleEditUser() {
  // This function is now handled by the individual edit buttons
  alert('Edit user functionality would be implemented here.');
}
