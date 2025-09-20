class ExamApp {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.timer = null;
        this.isReviewMode = false;
        this.examCompleted = false;
        this.selectedChapter = null;
        this.selectedMode = 'exam';
        this.studyTopic = null;
        this.chapterData = {
            chapter_9: {
                file: 'data/exam_questions.json',
                title: 'Chapter 9: Immunity & Inflammation',
                questionCount: 42
            },
            chapter_28: {
                file: 'data/chapter_28_questions.json',
                title: 'Chapter 28: Hematologic System',
                questionCount: 38
            },
            chapter_29: {
                file: 'data/chapter_29_questions.json',
                title: 'Chapter 29: Alterations of Erythrocytes',
                questionCount: 38
            },
            chapter_30: {
                file: 'data/chapter_30_questions.json',
                title: 'Chapter 30: Alterations of Leukocyte Function',
                questionCount: 30
            },
            chapter_32: {
                file: 'data/chapter_32_questions.json',
                title: 'Chapter 32: Cardiovascular & Lymphatic Systems',
                questionCount: 41
            },
            chapter_34: {
                file: 'data/chapter_34_questions.json',
                title: 'Chapter 34: Cardiovascular Alterations in Children',
                questionCount: 22
            },
            chapter_35: {
                file: 'data/chapter_35_questions.json',
                title: 'Chapter 35: Structure & Function of Pulmonary System',
                questionCount: 31
            },
            chapter_37: {
                file: 'data/chapter_37_questions.json',
                title: 'Chapter 37: Alterations of Pulmonary Function',
                questionCount: 18
            },
            chapter_38: {
                file: 'data/chapter_38_questions.json',
                title: 'Chapter 38: Structure & Function of Renal System',
                questionCount: 30
            }
        };

        this.studyTopicData = {
            immunity: {
                file: 'data/study_immunity_questions.json',
                title: 'Immunity & Inflammation Study'
            },
            hematology: {
                file: 'data/study_hematology_questions.json',
                title: 'Hematological Pathologies Study'
            },
            cardiovascular: {
                file: 'data/study_cardiovascular_questions.json',
                title: 'Cardiovascular Pathologies Study'
            },
            pulmonary: {
                file: 'data/study_pulmonary_questions.json',
                title: 'Pulmonary Pathologies Study'
            },
            urinary: {
                file: 'data/study_urinary_questions.json',
                title: 'Urinary System Pathologies Study'
            }
        };

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            examScreen: document.getElementById('exam-screen'),
            reviewScreen: document.getElementById('review-screen'),
            resultsScreen: document.getElementById('results-screen'),

            startBtn: document.getElementById('start-exam-btn'),
            backToMaterialsBtn: document.getElementById('back-to-materials-btn'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            submitBtn: document.getElementById('submit-btn'),

            questionCounter: document.getElementById('question-counter'),
            timer: document.getElementById('timer'),
            questionText: document.getElementById('question-text'),
            questionOptions: document.getElementById('question-options'),
            progressFill: document.getElementById('progress-fill'),
            rationaleDisplay: document.getElementById('rationale-display'),
            rationaleText: document.getElementById('rationale-text'),

            // Navigation bar elements
            questionNavBar: document.getElementById('question-nav-bar'),
            toggleNavBar: document.getElementById('toggle-nav-bar'),
            navBarContent: document.getElementById('nav-bar-content'),
            questionNavGrid: document.getElementById('question-nav-grid'),

            reviewContent: document.getElementById('review-content'),
            backToExamBtn: document.getElementById('back-to-exam-btn'),
            finalSubmitBtn: document.getElementById('final-submit-btn'),

            resultsContent: document.getElementById('results-content'),
            scorePercentage: document.getElementById('score-percentage'),
            scoreFraction: document.getElementById('score-fraction'),
            retakeBtn: document.getElementById('retake-btn'),
            reviewAnswersBtn: document.getElementById('review-answers-btn'),

            modal: document.getElementById('rationale-modal'),
            modalQuestionTitle: document.getElementById('modal-question-title'),
            modalYourAnswer: document.getElementById('modal-your-answer'),
            modalCorrectAnswer: document.getElementById('modal-correct-answer'),
            modalRationale: document.getElementById('modal-rationale'),
            modalPrevBtn: document.getElementById('modal-prev-btn'),
            modalNextBtn: document.getElementById('modal-next-btn'),
            modalCloseBtn: document.getElementById('modal-close-btn'),
            closeBtn: document.querySelector('.close-btn')
        };
    }

    bindEvents() {
        // Main navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Materials navigation
        document.querySelectorAll('.material-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMaterial(e.target.closest('.material-btn').dataset.material));
        });

        // Study topic cards
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const topic = e.target.closest('.section-card').dataset.topic;
                // Debug: console.log('Section card clicked, topic:', topic);
                this.startTopicStudy(topic);
            });
        });

        // Mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectMode(e.target.closest('.mode-btn').dataset.mode));
        });

        // Chapter selection
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectChapter(e.target.closest('.chapter-btn').dataset.chapter));
        });

        this.elements.startBtn.addEventListener('click', () => this.startExam());
        this.elements.backToMaterialsBtn.addEventListener('click', () => this.backToMaterials());

        // Week study buttons
        const week1StudyBtn = document.getElementById('start-week1-study');
        const week2StudyBtn = document.getElementById('start-week2-study');
        const week3StudyBtn = document.getElementById('start-week3-study');
        if (week1StudyBtn) {
            week1StudyBtn.addEventListener('click', () => this.startWeekStudy('week1'));
        }
        if (week2StudyBtn) {
            week2StudyBtn.addEventListener('click', () => this.startWeekStudy('week2'));
        }
        if (week3StudyBtn) {
            week3StudyBtn.addEventListener('click', () => this.startWeekStudy('week3'));
        }
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.submitBtn.addEventListener('click', () => this.showReview());

        // Navigation bar toggle
        this.elements.toggleNavBar.addEventListener('click', () => this.toggleNavigationBar());

        this.elements.backToExamBtn.addEventListener('click', () => this.backToExam());
        this.elements.finalSubmitBtn.addEventListener('click', () => this.submitExam());

        this.elements.retakeBtn.addEventListener('click', () => this.retakeExam());
        this.elements.reviewAnswersBtn.addEventListener('click', () => this.showDetailedResults());

        this.elements.modalPrevBtn.addEventListener('click', () => this.showPreviousRationale());
        this.elements.modalNextBtn.addEventListener('click', () => this.showNextRationale());
        this.elements.modalCloseBtn.addEventListener('click', () => this.closeModal());
        this.elements.closeBtn.addEventListener('click', () => this.closeModal());

        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) this.closeModal();
        });
    }

    switchSection(section) {
        // Handle home button - reset to start screen
        if (section === 'home') {
            this.resetToHome();
            return;
        }

        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Switch main sections
        document.querySelectorAll('.main-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Update header title and exam info visibility
        if (section === 'materials') {
            document.querySelector('header h1').textContent = 'NR507 Class Materials & Study Tools';
            this.elements.questionCounter.style.display = 'none';
            this.elements.timer.style.display = 'none';
            this.hideNavigationBar();
        } else {
            document.querySelector('header h1').textContent = 'NR507 Advanced Pathophysiology AGACNP';
            this.elements.questionCounter.style.display = 'inline';
            this.elements.timer.style.display = 'inline';
        }
    }

    switchMaterial(material) {
        // Update material navigation buttons
        document.querySelectorAll('.material-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-material="${material}"]`).classList.add('active');

        // Switch material content
        document.querySelectorAll('.material-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${material}-content`).classList.add('active');
    }

    async startTopicStudy(topic) {
        // Debug: console.log('Starting topic study for:', topic);
        this.studyTopic = topic;
        this.selectedMode = 'study'; // Force study mode for topic questions

        // Load questions for the selected topic
        if (!this.studyTopicData[topic]) {
            alert(`Topic questions not available for ${topic}.`);
            console.error('Topic not found in studyTopicData:', topic);
            return;
        }

        try {
            // First try to use embedded data if available
            if (typeof EMBEDDED_STUDY_DATA !== 'undefined' && EMBEDDED_STUDY_DATA[topic]) {
                // Debug: console.log('Using embedded study data for:', topic);
                this.questions = EMBEDDED_STUDY_DATA[topic];
            } else {
                // Fallback to fetching from files
                // Debug: console.log('Fetching questions from:', this.studyTopicData[topic].file);
                const response = await fetch(this.studyTopicData[topic].file);
                if (!response.ok) {
                    throw new Error(`Failed to load topic questions: ${response.status} ${response.statusText}`);
                }
                this.questions = await response.json();
            }

            // Process questions to determine their type
            this.questions.forEach(question => {
                // Check if it's a "Select all that apply" question
                if (question.text.toLowerCase().includes('select all that apply') ||
                    (Array.isArray(question.correct) && question.correct.length > 1)) {
                    question.type = 'multiple_select';
                } else {
                    question.type = 'multiple_choice';
                }
            });

            // Reset question state
            this.currentQuestion = 0;
            this.userAnswers = {};

            // Switch to exam interface but in study mode
            this.switchSection('exam');
            this.showScreen('exam-screen');

            // Update header
            document.querySelector('header h1').textContent = this.studyTopicData[topic].title;
            this.elements.questionCounter.textContent = `Question 1 of ${this.questions.length}`;
            this.elements.timer.style.display = 'none'; // Hide timer in study mode

            // Show back to materials button
            this.elements.backToMaterialsBtn.style.display = 'inline-block';

            // Initialize navigation bar
            this.initializeNavigationBar();

            this.displayQuestion();

        } catch (error) {
            console.error('Error loading topic questions:', error);
            alert(`Failed to load ${topic} study questions. Error: ${error.message}\n\nNote: If you're seeing this error, the embedded study data should still work. Please refresh the page and try again.`);
        }
    }

    backToMaterials() {
        // Reset state
        this.studyTopic = null;
        this.questions = [];
        this.currentQuestion = 0;
        this.userAnswers = {};

        // Hide back to materials button
        this.elements.backToMaterialsBtn.style.display = 'none';

        // Hide navigation bar
        this.hideNavigationBar();

        // Switch back to materials section
        this.switchSection('materials');
    }

    async startWeekStudy(week) {
        // Debug: console.log('Starting week study for:', week);
        this.studyTopic = week;
        this.selectedMode = 'study'; // Force study mode for week questions

        try {
            // Use embedded data for week studies
            if (typeof EMBEDDED_STUDY_DATA !== 'undefined' && EMBEDDED_STUDY_DATA[week]) {
                // Debug: console.log('Using embedded week study data for:', week);
                this.questions = EMBEDDED_STUDY_DATA[week];
            } else {
                alert(`Week study data not available for ${week}.`);
                return;
            }

            // Process questions to determine their type
            this.questions.forEach(question => {
                // Check if it's a "Select all that apply" question
                if (question.text.toLowerCase().includes('select all that apply') ||
                    (Array.isArray(question.correct) && question.correct.length > 1)) {
                    question.type = 'multiple_select';
                } else {
                    question.type = 'multiple_choice';
                }
            });

            // Reset question state
            this.currentQuestion = 0;
            this.userAnswers = {};

            // Switch to exam interface but in study mode
            this.switchSection('exam');
            this.showScreen('exam-screen');

            // Update header
            const weekTitle = week === 'week1' ? 'Week 1: Clinical Reasoning - Hypersensitivity' :
                              week === 'week2' ? 'Week 2: Clinical Reasoning - Anemias, CAD, Heart Failure' :
                              'Week 3: Pulmonary Pathologies Webinar';
            document.querySelector('header h1').textContent = weekTitle;
            this.elements.questionCounter.textContent = `Question 1 of ${this.questions.length}`;
            this.elements.timer.style.display = 'none'; // Hide timer in study mode

            // Show back to materials button
            this.elements.backToMaterialsBtn.style.display = 'inline-block';

            // Initialize navigation bar
            this.initializeNavigationBar();

            this.displayQuestion();

        } catch (error) {
            console.error('Error loading week study questions:', error);
            alert(`Failed to load ${week} study questions. Error: ${error.message}`);
        }
    }

    // Navigation Bar Methods
    initializeNavigationBar() {
        this.elements.questionNavGrid.innerHTML = '';

        for (let i = 0; i < this.questions.length; i++) {
            const btn = document.createElement('button');
            btn.className = 'nav-question-btn';
            btn.textContent = i + 1;
            btn.setAttribute('data-question', i);
            btn.addEventListener('click', () => this.navigateToQuestion(i));
            this.elements.questionNavGrid.appendChild(btn);
        }

        this.updateNavigationBar();
        this.elements.questionNavBar.style.display = 'block';
    }

    updateNavigationBar() {
        const navButtons = this.elements.questionNavGrid.querySelectorAll('.nav-question-btn');

        navButtons.forEach((btn, index) => {
            btn.classList.remove('current', 'answered');

            // Mark current question
            if (index === this.currentQuestion) {
                btn.classList.add('current');
            }

            // Mark answered questions
            if (this.userAnswers[index] && this.userAnswers[index].length > 0) {
                btn.classList.add('answered');
            }
        });
    }

    navigateToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.currentQuestion = questionIndex;
            this.displayQuestion();
            this.updateNavigationBar();
        }
    }

    toggleNavigationBar() {
        const content = this.elements.navBarContent;
        const toggle = this.elements.toggleNavBar;

        if (content.classList.contains('collapsed')) {
            content.classList.remove('collapsed');
            toggle.textContent = '▼';
        } else {
            content.classList.add('collapsed');
            toggle.textContent = '▶';
        }
    }

    hideNavigationBar() {
        this.elements.questionNavBar.style.display = 'none';
    }

    selectMode(mode) {
        this.selectedMode = mode;

        // Update UI to show selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('selected');

        // Update instructions based on mode
        const instructionsList = document.getElementById('instruction-list');
        if (mode === 'study') {
            instructionsList.innerHTML = `
                <li>Select a chapter above to begin</li>
                <li>Read each question carefully</li>
                <li>Select the best answer(s) for each question</li>
                <li>View immediate feedback and rationales</li>
                <li>Navigate through questions at your own pace</li>
                <li>No time limit or final scoring</li>
            `;
            this.elements.startBtn.textContent = 'Start Study Session';
        } else {
            instructionsList.innerHTML = `
                <li>Select a chapter above to begin</li>
                <li>Read each question carefully</li>
                <li>Select the best answer(s) for each question</li>
                <li>Some questions may have multiple correct answers</li>
                <li>You can review your answers before final submission</li>
                <li>Rationales will be shown after submission</li>
            `;
            this.elements.startBtn.textContent = 'Start Exam';
        }
    }

    selectChapter(chapterKey) {
        this.selectedChapter = chapterKey;

        // Update UI to show selection
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-chapter="${chapterKey}"]`).classList.add('selected');

        // Enable start button
        this.elements.startBtn.disabled = false;

        // Update header with chapter info
        const chapterInfo = this.chapterData[chapterKey];
        document.querySelector('header h1').textContent = chapterInfo.title;
    }

    async loadQuestions() {
        if (!this.selectedChapter) {
            alert('Please select a chapter first.');
            return false;
        }

        try {
            const chapterInfo = this.chapterData[this.selectedChapter];
            const response = await fetch(chapterInfo.file);
            if (!response.ok) {
                throw new Error('Failed to load questions');
            }
            this.questions = await response.json();

            // Process questions to determine their type
            this.questions.forEach(question => {
                // Check if it's a "Select all that apply" question
                if (question.text.toLowerCase().includes('select all that apply') ||
                    (Array.isArray(question.correct) && question.correct.length > 1)) {
                    question.type = 'multiple_select';
                } else {
                    question.type = 'multiple_choice';
                }
            });

            this.elements.questionCounter.textContent = `Question 1 of ${this.questions.length}`;
            return true;
        } catch (error) {
            console.error('Error loading questions:', error);
            alert(`Failed to load ${this.selectedChapter} questions. Please make sure the data file exists.`);
            return false;
        }
    }

    async startExam() {
        const loaded = await this.loadQuestions();
        if (!loaded || this.questions.length === 0) {
            return;
        }

        this.showScreen('exam-screen');

        if (this.selectedMode === 'exam') {
            this.startTime = new Date();
            this.startTimer();
        } else {
            // Study mode - hide timer
            this.elements.timer.style.display = 'none';
        }

        // Hide back to materials button for regular chapter exams
        this.elements.backToMaterialsBtn.style.display = 'none';

        // Initialize navigation bar
        this.initializeNavigationBar();

        this.displayQuestion();
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = new Date() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.timer.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        if (!question) return;

        this.elements.questionText.innerHTML = `<strong>Question ${this.currentQuestion + 1}:</strong> ${question.text}`;
        this.elements.questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;

        this.updateProgress();
        this.renderOptions(question);
        this.updateNavigationButtons();

        // Hide rationale in study mode initially
        if (this.selectedMode === 'study') {
            this.elements.rationaleDisplay.style.display = 'none';
        }
    }

    renderOptions(question) {
        this.elements.questionOptions.innerHTML = '';
        const inputType = question.type === 'multiple_choice' ? 'radio' : 'checkbox';
        const inputName = `question_${this.currentQuestion}`;

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';

            const input = document.createElement('input');
            input.type = inputType;
            input.name = inputName;
            input.value = index;
            input.id = `option_${this.currentQuestion}_${index}`;

            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.className = 'option-text';
            label.textContent = option;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);

            optionDiv.addEventListener('click', (e) => {
                if (e.target.type !== inputType) {
                    input.click();
                }
            });

            input.addEventListener('change', () => {
                this.saveAnswer();
                this.updateOptionStyles();

                // Show rationale in study mode
                if (this.selectedMode === 'study') {
                    this.showStudyModeRationale();
                }
            });

            this.elements.questionOptions.appendChild(optionDiv);
        });

        this.restoreAnswer();
    }

    showStudyModeRationale() {
        const question = this.questions[this.currentQuestion];
        const userAnswer = this.userAnswers[this.currentQuestion] || [];

        if (userAnswer.length > 0) {
            // Show correct/incorrect styling
            this.showStudyModeAnswerFeedback();

            // Display rationale
            this.elements.rationaleText.innerHTML = question.rationale || 'No rationale provided.';
            this.elements.rationaleDisplay.style.display = 'block';
        }
    }

    showStudyModeAnswerFeedback() {
        const question = this.questions[this.currentQuestion];
        const userAnswer = this.userAnswers[this.currentQuestion] || [];
        const correctAnswers = question.correct;

        const options = this.elements.questionOptions.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.remove('correct', 'incorrect');

            // Show correct answers in green
            if (correctAnswers.includes(index)) {
                option.classList.add('correct');
            }

            // Show incorrect user selections in red
            if (userAnswer.includes(index) && !correctAnswers.includes(index)) {
                option.classList.add('incorrect');
            }
        });
    }

    saveAnswer() {
        const question = this.questions[this.currentQuestion];
        const inputs = this.elements.questionOptions.querySelectorAll('input:checked');

        if (question.type === 'multiple_choice') {
            this.userAnswers[this.currentQuestion] = inputs.length > 0 ? [parseInt(inputs[0].value)] : [];
        } else {
            this.userAnswers[this.currentQuestion] = Array.from(inputs).map(input => parseInt(input.value));
        }

        // Update navigation bar
        this.updateNavigationBar();
    }

    restoreAnswer() {
        if (this.userAnswers[this.currentQuestion]) {
            const savedAnswers = this.userAnswers[this.currentQuestion];
            savedAnswers.forEach(answerIndex => {
                const input = document.getElementById(`option_${this.currentQuestion}_${answerIndex}`);
                if (input) input.checked = true;
            });
            this.updateOptionStyles();

            // Show rationale if in study mode and answer was already selected
            if (this.selectedMode === 'study') {
                this.showStudyModeRationale();
            }
        }
    }

    updateOptionStyles() {
        const options = this.elements.questionOptions.querySelectorAll('.option');
        options.forEach(option => {
            const input = option.querySelector('input');
            option.classList.toggle('selected', input.checked);
        });
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        this.elements.prevBtn.disabled = this.currentQuestion === 0;

        if (this.selectedMode === 'study') {
            // Study mode - always show next/prev, no submit
            this.elements.nextBtn.style.display = 'inline-block';
            this.elements.submitBtn.style.display = 'none';
            this.elements.nextBtn.disabled = this.currentQuestion === this.questions.length - 1;
        } else {
            // Exam mode - normal behavior
            if (this.currentQuestion === this.questions.length - 1) {
                this.elements.nextBtn.style.display = 'none';
                this.elements.submitBtn.style.display = 'inline-block';
            } else {
                this.elements.nextBtn.style.display = 'inline-block';
                this.elements.submitBtn.style.display = 'none';
            }
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
            this.updateNavigationBar();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
            this.updateNavigationBar();
        }
    }

    showReview() {
        this.showScreen('review-screen');
        this.populateReview();
    }

    populateReview() {
        this.elements.reviewContent.innerHTML = '';

        this.questions.forEach((question, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-question';

            const questionTitle = document.createElement('h4');
            questionTitle.textContent = `Question ${index + 1}: ${question.text}`;

            const answerDiv = document.createElement('div');
            answerDiv.className = 'review-answer';

            const userAnswer = this.userAnswers[index] || [];
            if (userAnswer.length === 0) {
                answerDiv.innerHTML = '<em>No answer selected</em>';
            } else {
                const answerTexts = userAnswer.map(answerIndex => question.options[answerIndex]);
                answerDiv.innerHTML = `<strong>Your answer:</strong> ${answerTexts.join(', ')}`;
            }

            reviewDiv.appendChild(questionTitle);
            reviewDiv.appendChild(answerDiv);
            this.elements.reviewContent.appendChild(reviewDiv);
        });
    }

    backToExam() {
        this.showScreen('exam-screen');
    }

    submitExam() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.examCompleted = true;
        this.calculateScore();
        this.showScreen('results-screen');
        this.showRationaleModal(0);
    }

    calculateScore() {
        let correct = 0;

        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index] || [];
            const correctAnswers = question.correct;

            const isCorrect = userAnswer.length === correctAnswers.length &&
                            userAnswer.every(answer => correctAnswers.includes(answer)) &&
                            correctAnswers.every(answer => userAnswer.includes(answer));

            if (isCorrect) correct++;
        });

        const percentage = Math.round((correct / this.questions.length) * 100);

        this.elements.scorePercentage.textContent = `${percentage}%`;
        this.elements.scoreFraction.textContent = `${correct} out of ${this.questions.length} correct`;

        this.populateResults();
    }

    populateResults() {
        this.elements.resultsContent.innerHTML = '';

        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index] || [];
            const correctAnswers = question.correct;

            const isCorrect = userAnswer.length === correctAnswers.length &&
                            userAnswer.every(answer => correctAnswers.includes(answer)) &&
                            correctAnswers.every(answer => userAnswer.includes(answer));

            const resultDiv = document.createElement('div');
            resultDiv.className = `result-question ${isCorrect ? 'correct' : 'incorrect'}`;
            resultDiv.style.cursor = 'pointer';

            const questionTitle = document.createElement('h4');
            questionTitle.innerHTML = `Question ${index + 1}: ${question.text} `;

            const status = document.createElement('span');
            status.className = `result-status ${isCorrect ? 'correct' : 'incorrect'}`;
            status.textContent = isCorrect ? 'Correct' : 'Incorrect';

            questionTitle.appendChild(status);
            resultDiv.appendChild(questionTitle);

            resultDiv.addEventListener('click', () => this.showRationaleModal(index));

            this.elements.resultsContent.appendChild(resultDiv);
        });
    }

    showRationaleModal(questionIndex) {
        const question = this.questions[questionIndex];
        const userAnswer = this.userAnswers[questionIndex] || [];
        const correctAnswers = question.correct;

        this.elements.modalQuestionTitle.textContent = `Question ${questionIndex + 1}`;

        this.elements.modalYourAnswer.innerHTML = `
            <h4>Your Answer:</h4>
            ${userAnswer.length === 0 ?
                '<em>No answer selected</em>' :
                userAnswer.map(index => question.options[index]).join(', ')
            }
        `;

        this.elements.modalCorrectAnswer.innerHTML = `
            <h4>Correct Answer:</h4>
            ${correctAnswers.map(index => question.options[index]).join(', ')}
        `;

        this.elements.modalRationale.innerHTML = `
            <h4>Rationale:</h4>
            ${question.rationale || 'No rationale provided.'}
        `;

        this.currentModalQuestion = questionIndex;
        this.updateModalNavigation();
        this.elements.modal.classList.add('active');
    }

    updateModalNavigation() {
        this.elements.modalPrevBtn.disabled = this.currentModalQuestion === 0;
        this.elements.modalNextBtn.disabled = this.currentModalQuestion === this.questions.length - 1;
    }

    showPreviousRationale() {
        if (this.currentModalQuestion > 0) {
            this.showRationaleModal(this.currentModalQuestion - 1);
        }
    }

    showNextRationale() {
        if (this.currentModalQuestion < this.questions.length - 1) {
            this.showRationaleModal(this.currentModalQuestion + 1);
        }
    }

    closeModal() {
        this.elements.modal.classList.remove('active');
    }

    showDetailedResults() {
        this.showRationaleModal(0);
    }

    retakeExam() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.examCompleted = false;
        this.selectedChapter = null;
        this.selectedMode = 'exam';
        this.questions = [];

        if (this.timer) {
            clearInterval(this.timer);
        }

        // Reset UI elements
        this.elements.timer.textContent = 'Time: 00:00';
        this.elements.timer.style.display = 'inline';
        this.elements.startBtn.disabled = true;
        this.elements.startBtn.textContent = 'Start Exam';
        this.elements.rationaleDisplay.style.display = 'none';

        document.querySelector('header h1').textContent = 'NR507 Advanced Pathophysiology AGACNP';
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector('[data-mode="exam"]').classList.add('selected');

        // Reset instructions
        document.getElementById('instruction-list').innerHTML = `
            <li>Select a chapter above to begin</li>
            <li>Read each question carefully</li>
            <li>Select the best answer(s) for each question</li>
            <li>Some questions may have multiple correct answers</li>
            <li>You can review your answers before final submission</li>
            <li>Rationales will be shown after submission</li>
        `;

        this.showScreen('start-screen');
    }

    resetToHome() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.examCompleted = false;
        this.selectedChapter = null;
        this.selectedMode = 'exam';
        this.questions = [];

        if (this.timer) {
            clearInterval(this.timer);
        }

        // Reset UI elements
        this.elements.timer.textContent = 'Time: 00:00';
        this.elements.timer.style.display = 'inline';
        this.elements.startBtn.disabled = true;
        this.elements.startBtn.textContent = 'Start Exam';
        this.elements.rationaleDisplay.style.display = 'none';

        // Reset navigation to exam section
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-section="exam"]').classList.add('active');

        // Hide navigation bar
        this.hideNavigationBar();

        // Show exam section
        document.querySelectorAll('.main-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById('exam-section').classList.add('active');

        // Reset header
        document.querySelector('header h1').textContent = 'NR507 Advanced Pathophysiology AGACNP';

        // Reset selections
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector('[data-mode="exam"]').classList.add('selected');

        // Reset instructions
        document.getElementById('instruction-list').innerHTML = `
            <li>Select a chapter above to begin</li>
            <li>Read each question carefully</li>
            <li>Select the best answer(s) for each question</li>
            <li>Some questions may have multiple correct answers</li>
            <li>You can review your answers before final submission</li>
            <li>Rationales will be shown after submission</li>
        `;

        // Show the start screen
        this.showScreen('start-screen');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExamApp();
});