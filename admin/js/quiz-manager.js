// Quiz Manager JavaScript

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
            
            if (sidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 900 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

class QuizManager {
    constructor() {
        this.quizzes = [];
        this.currentQuizId = null;
        this.questionCounter = 0;
        this.init();
    }

    init() {
        this.loadQuizzes();
        this.bindEvents();
        this.renderQuizzes();
    }

    // Load quizzes from localStorage or create sample data
    loadQuizzes() {
        const storedQuizzes = localStorage.getItem('ecoAcademiaQuizzes');
        if (storedQuizzes) {
            this.quizzes = JSON.parse(storedQuizzes);
        } else {
            this.quizzes = this.getSampleQuizzes();
            this.saveQuizzes();
        }
    }

    // Save quizzes to localStorage
    saveQuizzes() {
        localStorage.setItem('ecoAcademiaQuizzes', JSON.stringify(this.quizzes));
    }

    // Generate sample quiz data
    getSampleQuizzes() {
        return [
            {
                id: 1,
                title: "Climate Change Awareness",
                description: "Test your knowledge about climate change and global warming",
                category: "climate-change",
                difficulty: "medium",
                timeLimit: 30,
                status: "active",
                questions: [
                    {
                        id: 1,
                        text: "What is the main cause of climate change?",
                        type: "multiple-choice",
                        options: [
                            { text: "Natural climate cycles", isCorrect: false },
                            { text: "Greenhouse gas emissions", isCorrect: true },
                            { text: "Solar radiation", isCorrect: false },
                            { text: "Ocean currents", isCorrect: false }
                        ]
                    },
                    {
                        id: 2,
                        text: "Global warming is caused by human activities.",
                        type: "true-false",
                        options: [
                            { text: "True", isCorrect: true },
                            { text: "False", isCorrect: false }
                        ]
                    }
                ],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Pollution Prevention",
                description: "Learn about different types of pollution and prevention methods",
                category: "pollution",
                difficulty: "easy",
                timeLimit: 25,
                status: "active",
                questions: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 3,
                title: "Forest Conservation",
                description: "Understanding deforestation and forest protection strategies",
                category: "deforestation",
                difficulty: "medium",
                timeLimit: 35,
                status: "active",
                questions: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 4,
                title: "Sustainable Living",
                description: "Explore sustainable practices and green technologies",
                category: "sustainability",
                difficulty: "easy",
                timeLimit: 30,
                status: "active",
                questions: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    // Bind event listeners
    bindEvents() {
        // Quiz form submission
        document.getElementById('quizForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveQuiz();
        });

        // Add question button
        document.getElementById('addQuestionBtn').addEventListener('click', () => {
            this.addQuestion();
        });

        // Search functionality
        document.getElementById('quizSearch').addEventListener('input', (e) => {
            this.filterQuizzes();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterQuizzes();
        });
    }

    // Open quiz modal for editing
    openQuizModal(quizId) {
        const modal = new bootstrap.Modal(document.getElementById('quizModal'));
        const modalTitle = document.getElementById('quizModalLabel');
        const form = document.getElementById('quizForm');
        
        // Reset form
        form.reset();
        document.getElementById('questionsContainer').innerHTML = '';
        this.questionCounter = 0;
        
        // Edit mode
        this.currentQuizId = quizId;
        modalTitle.textContent = 'Edit Quiz';
        const quiz = this.quizzes.find(q => q.id === quizId);
        this.populateForm(quiz);
        
        modal.show();
    }

    // Populate form with quiz data
    populateForm(quiz) {
        document.getElementById('quizTitle').value = quiz.title;
        document.getElementById('quizDescription').value = quiz.description;
        document.getElementById('quizCategory').value = quiz.category;
        
        // Add questions
        quiz.questions.forEach(question => {
            this.addQuestion(question);
        });
    }

    // Add a new question to the form
    addQuestion(questionData = null) {
        const template = document.getElementById('questionTemplate');
        const container = document.getElementById('questionsContainer');
        const questionElement = template.cloneNode(true);
        
        questionElement.style.display = 'block';
        questionElement.id = `question-${++this.questionCounter}`;
        
        // Update question number
        const questionNumber = questionElement.querySelector('.question-number');
        questionNumber.textContent = `Question ${this.questionCounter}`;
        
        // Update radio button names to be unique
        const radioButtons = questionElement.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.name = `correct-answer-${this.questionCounter}`;
        });
        
        // Populate with existing data if provided
        if (questionData) {
            questionElement.querySelector('.question-text').value = questionData.text;
            questionElement.querySelector('.question-type').value = questionData.type;
            
            if (questionData.type === 'multiple-choice') {
                const optionInputs = questionElement.querySelectorAll('.option-text');
                questionData.options.forEach((option, index) => {
                    if (optionInputs[index]) {
                        optionInputs[index].value = option;
                    }
                });
                
                if (questionData.correctAnswer !== undefined) {
                    radioButtons[questionData.correctAnswer].checked = true;
                }
            }
        }
        
        // Add delete functionality
        const deleteBtn = questionElement.querySelector('.delete-question');
        deleteBtn.addEventListener('click', () => {
            questionElement.remove();
            this.updateQuestionNumbers();
        });
        
        // Add question type change handler
        const questionTypeSelect = questionElement.querySelector('.question-type');
        questionTypeSelect.addEventListener('change', (e) => {
            this.updateQuestionOptions(questionElement, e.target.value);
        });
        
        container.appendChild(questionElement);
        this.updateQuestionOptions(questionElement, questionData?.type || 'multiple-choice');
    }

    // Update question options based on type
    updateQuestionOptions(questionElement, type) {
        const optionsContainer = questionElement.querySelector('.options-container');
        
        if (type === 'multiple-choice') {
            optionsContainer.style.display = 'block';
            optionsContainer.innerHTML = `
                <label class="form-label">Options</label>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="0">
                    <input type="text" class="form-control option-text" placeholder="Option 1">
                </div>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="1">
                    <input type="text" class="form-control option-text" placeholder="Option 2">
                </div>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="2">
                    <input type="text" class="form-control option-text" placeholder="Option 3">
                </div>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="3">
                    <input type="text" class="form-control option-text" placeholder="Option 4">
                </div>
            `;
        } else if (type === 'true-false') {
            optionsContainer.style.display = 'block';
            optionsContainer.innerHTML = `
                <label class="form-label">Correct Answer</label>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="0">
                    <label class="form-label">True</label>
                </div>
                <div class="option-item d-flex align-items-center mb-2">
                    <input type="radio" name="correct-answer-${this.questionCounter}" class="form-check-input me-2" value="1">
                    <label class="form-label">False</label>
                </div>
            `;
        } else {
            optionsContainer.style.display = 'none';
        }
    }

    // Update question numbers after deletion
    updateQuestionNumbers() {
        const questions = document.querySelectorAll('.question-item');
        questions.forEach((question, index) => {
            const questionNumber = question.querySelector('.question-number');
            questionNumber.textContent = `Question ${index + 1}`;
        });
    }

    // Save quiz (create or update)
    saveQuiz() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        if (this.currentQuizId) {
            // Update existing quiz
            const quizIndex = this.quizzes.findIndex(q => q.id === this.currentQuizId);
            this.quizzes[quizIndex] = {
                ...this.quizzes[quizIndex],
                ...formData,
                updatedAt: new Date().toISOString()
            };
        } else {
            // No new quiz creation allowed - this shouldn't happen
            this.showAlert('Error: Cannot create new quizzes', 'danger');
            return;
        }

        this.saveQuizzes();
        this.renderQuizzes();
        this.showAlert('Quiz saved successfully!', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
        modal.hide();
    }

    // Get form data
    getFormData() {
        const title = document.getElementById('quizTitle').value;
        const description = document.getElementById('quizDescription').value;
        const category = document.getElementById('quizCategory').value;
        
        const questions = [];
        const questionElements = document.querySelectorAll('.question-item');
        
        questionElements.forEach((element, index) => {
            const questionText = element.querySelector('.question-text').value;
            const questionType = element.querySelector('.question-type').value;
            
            if (questionText.trim()) {
                const question = {
                    id: index + 1,
                    text: questionText,
                    type: questionType
                };
                
                if (questionType === 'multiple-choice') {
                    const options = [];
                    const optionInputs = element.querySelectorAll('.option-text');
                    optionInputs.forEach(input => {
                        if (input.value.trim()) {
                            options.push(input.value);
                        }
                    });
                    question.options = options;
                    
                    const checkedRadio = element.querySelector('input[type="radio"]:checked');
                    if (checkedRadio) {
                        question.correctAnswer = parseInt(checkedRadio.value);
                    }
                } else if (questionType === 'true-false') {
                    question.options = ['True', 'False'];
                    const checkedRadio = element.querySelector('input[type="radio"]:checked');
                    if (checkedRadio) {
                        question.correctAnswer = parseInt(checkedRadio.value);
                    }
                }
                
                questions.push(question);
            }
        });
        
        return {
            title,
            description,
            category,
            difficulty: 'medium', // Default difficulty
            timeLimit: 30, // Default time limit
            status: 'active', // Default status
            questions
        };
    }

    // Validate form data
    validateForm(formData) {
        if (!formData.title.trim()) {
            this.showAlert('Please enter a quiz title', 'danger');
            return false;
        }
        
        if (!formData.category) {
            this.showAlert('Please select a category', 'danger');
            return false;
        }
        
        if (formData.questions.length === 0) {
            this.showAlert('Please add at least one question', 'danger');
            return false;
        }
        
        return true;
    }

    // Filter quizzes based on search, category, and status
    filterQuizzes() {
        const searchTerm = document.getElementById('quizSearch').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        
        let filteredQuizzes = this.quizzes;
        
        if (searchTerm) {
            filteredQuizzes = filteredQuizzes.filter(quiz => 
                quiz.title.toLowerCase().includes(searchTerm) ||
                quiz.description.toLowerCase().includes(searchTerm) ||
                quiz.category.toLowerCase().includes(searchTerm)
            );
        }
        
        if (categoryFilter) {
            filteredQuizzes = filteredQuizzes.filter(quiz => quiz.category === categoryFilter);
        }
        
        this.renderQuizzes(filteredQuizzes);
    }

    // Render quiz list
    renderQuizzes(quizzesToRender = null) {
        const container = document.getElementById('quizGrid');
        const quizzes = quizzesToRender || this.quizzes;
        
        // Update total count
        document.getElementById('totalQuizzes').textContent = quizzes.length;
        
        if (quizzes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="icon">📋</div>
                    <h3>No quizzes found</h3>
                    <p>Create your first quiz to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = quizzes.map(quiz => this.renderQuizCard(quiz)).join('');
    }

    // Render individual quiz card
    renderQuizCard(quiz) {
        const createdDate = new Date(quiz.createdAt).toLocaleDateString();
        const categoryFormatted = quiz.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Category-specific icons and colors
        const categoryInfo = {
            'climate-change': { icon: '🌡️', color: 'danger' },
            'pollution': { icon: '🏭', color: 'warning' },
            'deforestation': { icon: '🌳', color: 'success' },
            'sustainability': { icon: '♻️', color: 'info' }
        };
        
        const categoryData = categoryInfo[quiz.category] || { icon: '📂', color: 'secondary' };
        
        return `
            <div class="quiz-card">
                <div class="quiz-card-header">
                    <h3 class="quiz-title">${quiz.title}</h3>
                </div>
                <p class="quiz-description">${quiz.description}</p>
                <div class="quiz-meta">
                    <div class="quiz-meta-item">
                        <span class="icon">${categoryData.icon}</span>
                        <span class="category-badge badge bg-${categoryData.color}">${categoryFormatted}</span>
                    </div>
                </div>
                <div class="quiz-stats">
                    <div class="quiz-stat">
                        <div class="quiz-stat-value">${quiz.questions.length}</div>
                        <div class="quiz-stat-label">Questions</div>
                    </div>
                    <div class="quiz-stat">
                        <div class="quiz-stat-value">${Math.floor(Math.random() * 100)}</div>
                        <div class="quiz-stat-label">Attempts</div>
                    </div>
                    <div class="quiz-stat">
                        <div class="quiz-stat-value">${Math.floor(Math.random() * 100)}%</div>
                        <div class="quiz-stat-label">Avg Score</div>
                    </div>
                </div>
                <div class="quiz-actions-buttons">
                    <button class="btn btn-outline-primary btn-sm" onclick="quizManager.openQuizModal(${quiz.id})">
                        <span class="icon">✏️</span> Edit
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="quizManager.viewQuiz(${quiz.id})">
                        <span class="icon">👁️</span> View
                    </button>
                </div>
            </div>
        `;
    }

    // View quiz details
    viewQuiz(quizId) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        if (!quiz) {
            this.showAlert('Quiz not found', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('viewQuizModal'));
        const modalTitle = document.getElementById('viewQuizModalLabel');
        const content = document.getElementById('viewQuizContent');

        modalTitle.textContent = `View Quiz: ${quiz.title}`;

        // Format category name
        const categoryFormatted = quiz.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Category-specific icons
        const categoryInfo = {
            'climate-change': '🌡️',
            'pollution': '🏭',
            'deforestation': '🌳',
            'sustainability': '♻️'
        };
        const categoryIcon = categoryInfo[quiz.category] || '📂';

        let questionsHtml = '';
        if (quiz.questions.length === 0) {
            questionsHtml = `
                <div class="alert alert-info">
                    <h6>No Questions Available</h6>
                    <p>This quiz doesn't have any questions yet. Edit the quiz to add questions.</p>
                </div>
            `;
        } else {
            questionsHtml = quiz.questions.map((question, index) => {
                let optionsHtml = '';
                if (question.options && question.options.length > 0) {
                    optionsHtml = question.options.map((option, optIndex) => {
                        const isCorrect = option.isCorrect ? ' <strong>(Correct)</strong>' : '';
                        return `<li class="list-group-item">${option.text}${isCorrect}</li>`;
                    }).join('');
                    optionsHtml = `<ul class="list-group mt-2">${optionsHtml}</ul>`;
                }

                return `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h6 class="card-title">Question ${index + 1}</h6>
                            <p class="card-text">${question.text}</p>
                            <small class="text-muted">Type: ${question.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</small>
                            ${optionsHtml}
                        </div>
                    </div>
                `;
            }).join('');
        }

        content.innerHTML = `
            <div class="row mb-4">
                <div class="col-md-8">
                    <h4>${quiz.title}</h4>
                    <p class="text-muted">${quiz.description}</p>
                </div>
                <div class="col-md-4">
                    <div class="quiz-info">
                        <div class="mb-2">
                            <strong>Category:</strong> ${categoryIcon} ${categoryFormatted}
                        </div>
                        <div class="mb-2">
                            <strong>Questions:</strong> ${quiz.questions.length}
                        </div>
                        <div class="mb-2">
                            <strong>Created:</strong> ${new Date(quiz.createdAt).toLocaleDateString()}
                        </div>
                        <div class="mb-2">
                            <strong>Updated:</strong> ${new Date(quiz.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
            <div class="questions-section">
                <h5>Questions</h5>
                ${questionsHtml}
            </div>
        `;

        modal.show();
    }

    // Show alert message
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.main-content .container-fluid');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Get quizzes by category
    getQuizzesByCategory(category) {
        return this.quizzes.filter(quiz => quiz.category === category);
    }

    // Get category statistics
    getCategoryStats() {
        const stats = {
            'climate-change': { total: 0, active: 0, draft: 0, inactive: 0 },
            'pollution': { total: 0, active: 0, draft: 0, inactive: 0 },
            'deforestation': { total: 0, active: 0, draft: 0, inactive: 0 },
            'sustainability': { total: 0, active: 0, draft: 0, inactive: 0 }
        };

        this.quizzes.forEach(quiz => {
            if (stats[quiz.category]) {
                stats[quiz.category].total++;
                stats[quiz.category][quiz.status]++;
            }
        });

        return stats;
    }
}

// Initialize quiz manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizManager = new QuizManager();
});
