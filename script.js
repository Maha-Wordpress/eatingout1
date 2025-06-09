// Main JavaScript functionality for the interactive webpage
class EatingOutApp {
    constructor() {
        this.currentSection = 'vocabulary';
        this.currentCategory = null;
        this.currentScenario = 0;
        this.scenarioAnswered = false;
        this.orderItems = [];
        this.currentGame = null;
        this.progress = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection('vocabulary');
        this.updateProgress();
        this.generateSpeechAudio();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });

        // Vocabulary categories
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.target.closest('.category-card').dataset.category;
                this.showVocabularyCategory(category);
            });
        });

        // Scenario controls
        document.getElementById('nextScenario')?.addEventListener('click', () => {
            this.nextScenario();
        });

        document.getElementById('prevScenario')?.addEventListener('click', () => {
            this.prevScenario();
        });

        // Menu planning
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const menuItem = e.target.closest('.menu-item');
                this.addToOrder(menuItem);
            });
        });

        document.getElementById('clearOrder')?.addEventListener('click', () => {
            this.clearOrder();
        });

        // Games
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const game = e.target.closest('.game-card').dataset.game;
                this.startGame(game);
            });
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Initialize section-specific content
        if (sectionName === 'scenarios') {
            this.loadScenario(this.currentScenario);
        }
    }

    showVocabularyCategory(category) {
        this.currentCategory = category;
        const container = document.getElementById('vocabularyCards');
        const words = vocabularyData[category] || [];

        container.innerHTML = '';
        
        words.forEach(wordData => {
            const card = this.createVocabularyCard(wordData);
            container.appendChild(card);
        });

        // Scroll to vocabulary cards
        container.scrollIntoView({ behavior: 'smooth' });
    }

    createVocabularyCard(wordData) {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        
        card.innerHTML = `
            <div class="vocab-header">
                <div class="vocab-word">${wordData.word}</div>
                <button class="audio-btn" onclick="this.playAudio('${wordData.audioFile}')">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="vocab-definition">${wordData.definition}</div>
            <div class="vocab-example">"${wordData.example}"</div>
        `;

        // Add audio functionality
        const audioBtn = card.querySelector('.audio-btn');
        audioBtn.addEventListener('click', () => {
            this.playAudio(wordData.word);
        });

        return card;
    }

    playAudio(text) {
        // Use Web Speech API for text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            // Try to use a clear English voice
            const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en') && voice.name.includes('Google')
            ) || voices.find(voice => voice.lang.startsWith('en'));
            
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            
            speechSynthesis.speak(utterance);
        } else {
            console.log('Speech synthesis not supported');
        }
    }

    loadScenario(index) {
        if (index < 0 || index >= scenariosData.length) return;

        const scenario = scenariosData[index];
        this.scenarioAnswered = false;

        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioDescription').textContent = scenario.description;
        document.getElementById('scenarioCounter').textContent = `${index + 1} / ${scenariosData.length}`;

        // Update cues
        const cuesContainer = document.getElementById('scenarioCues');
        cuesContainer.innerHTML = `<strong>Key vocabulary:</strong> ${scenario.cues.join(', ')}`;

        // Create options
        const optionsContainer = document.getElementById('scenarioOptions');
        optionsContainer.innerHTML = '';

        scenario.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => {
                this.selectOption(optionIndex, scenario.correct, scenario.explanation);
            });
            optionsContainer.appendChild(button);
        });

        // Hide feedback
        const feedback = document.getElementById('scenarioFeedback');
        feedback.classList.remove('show', 'correct', 'incorrect');
    }

    selectOption(selectedIndex, correctIndex, explanation) {
        if (this.scenarioAnswered) return;

        this.scenarioAnswered = true;
        const isCorrect = selectedIndex === correctIndex;

        // Update option buttons
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            if (index === correctIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
            btn.style.pointerEvents = 'none';
        });

        // Show feedback
        const feedback = document.getElementById('scenarioFeedback');
        feedback.textContent = explanation;
        feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        // Update progress
        if (isCorrect) {
            this.progress += (100 / scenariosData.length) / 4; // Scenarios are 1/4 of total progress
            this.updateProgress();
        }
    }

    nextScenario() {
        if (this.currentScenario < scenariosData.length - 1) {
            this.currentScenario++;
            this.loadScenario(this.currentScenario);
        }
    }

    prevScenario() {
        if (this.currentScenario > 0) {
            this.currentScenario--;
            this.loadScenario(this.currentScenario);
        }
    }

    addToOrder(menuItem) {
        const name = menuItem.querySelector('.item-name').textContent;
        const price = parseFloat(menuItem.dataset.price);
        const category = menuItem.dataset.category;

        const orderItem = {
            name,
            price,
            category,
            id: Date.now() + Math.random()
        };

        this.orderItems.push(orderItem);
        this.updateOrderDisplay();
        this.updateProgress();
    }

    updateOrderDisplay() {
        const container = document.getElementById('orderItems');
        
        if (this.orderItems.length === 0) {
            container.innerHTML = '<p class="empty-order">No items selected</p>';
        } else {
            container.innerHTML = this.orderItems.map(item => `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <button onclick="app.removeFromOrder('${item.id}')" style="background: #e74c3c; color: white; border: none; border-radius: 3px; padding: 2px 6px; cursor: pointer;">×</button>
                </div>
            `).join('');
        }

        // Update totals
        const subtotal = this.orderItems.reduce((sum, item) => sum + item.price, 0);
        const tip = subtotal * 0.18;
        const total = subtotal + tip;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tip').textContent = `$${tip.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    removeFromOrder(itemId) {
        this.orderItems = this.orderItems.filter(item => item.id !== itemId);
        this.updateOrderDisplay();
    }

    clearOrder() {
        this.orderItems = [];
        this.updateOrderDisplay();
    }

    startGame(gameType) {
        this.currentGame = gameType;
        const gameContent = document.getElementById('gameContent');
        gameContent.classList.add('active');

        switch (gameType) {
            case 'matching':
                this.loadMatchingGame();
                break;
            case 'quiz':
                this.loadQuizGame();
                break;
            case 'listening':
                this.loadListeningGame();
                break;
        }

        gameContent.scrollIntoView({ behavior: 'smooth' });
    }

    loadMatchingGame() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <h3>🎯 Vocabulary Matching Game</h3>
            <p>Match the vocabulary words with their correct definitions!</p>
            <div class="matching-game">
                <div class="words-column">
                    <h4>Words</h4>
                    <div id="wordsContainer"></div>
                </div>
                <div class="definitions-column">
                    <h4>Definitions</h4>
                    <div id="definitionsContainer"></div>
                </div>
            </div>
            <div class="game-score">Score: <span id="matchingScore">0</span></div>
            <button class="btn btn-secondary" onclick="app.resetMatchingGame()">Reset Game</button>
        `;

        this.initMatchingGame();
    }

    initMatchingGame() {
        // Get random vocabulary items
        const allWords = Object.values(vocabularyData).flat();
        const gameWords = this.shuffleArray(allWords).slice(0, 6);

        const wordsContainer = document.getElementById('wordsContainer');
        const definitionsContainer = document.getElementById('definitionsContainer');

        // Create word buttons
        gameWords.forEach((word, index) => {
            const wordBtn = document.createElement('button');
            wordBtn.className = 'match-word';
            wordBtn.textContent = word.word;
            wordBtn.dataset.index = index;
            wordBtn.addEventListener('click', () => this.selectMatchWord(wordBtn));
            wordsContainer.appendChild(wordBtn);
        });

        // Create definition buttons (shuffled)
        const shuffledDefinitions = this.shuffleArray([...gameWords]);
        shuffledDefinitions.forEach((word, index) => {
            const defBtn = document.createElement('button');
            defBtn.className = 'match-definition';
            defBtn.textContent = word.definition;
            defBtn.dataset.correctIndex = gameWords.indexOf(word);
            defBtn.addEventListener('click', () => this.selectMatchDefinition(defBtn));
            definitionsContainer.appendChild(defBtn);
        });

        // Add CSS for matching game
        const style = document.createElement('style');
        style.textContent = `
            .matching-game { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; }
            .match-word, .match-definition { 
                display: block; width: 100%; margin: 0.5rem 0; padding: 1rem; 
                border: 2px solid #e0e0e0; background: white; border-radius: 8px; 
                cursor: pointer; transition: all 0.3s ease; text-align: left;
            }
            .match-word:hover, .match-definition:hover { border-color: #e67e22; }
            .match-word.selected { border-color: #3498db; background: #e8f4fd; }
            .match-word.correct, .match-definition.correct { border-color: #27ae60; background: #d5f4e6; }
            .match-word.incorrect, .match-definition.incorrect { border-color: #e74c3c; background: #fdf2f2; }
            .game-score { font-size: 1.2rem; font-weight: bold; margin: 1rem 0; }
        `;
        document.head.appendChild(style);

        this.matchingGameState = {
            selectedWord: null,
            score: 0,
            matches: 0
        };
    }

    selectMatchWord(wordBtn) {
        // Clear previous selections
        document.querySelectorAll('.match-word').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        wordBtn.classList.add('selected');
        this.matchingGameState.selectedWord = wordBtn;
    }

    selectMatchDefinition(defBtn) {
        if (!this.matchingGameState.selectedWord) return;

        const wordIndex = this.matchingGameState.selectedWord.dataset.index;
        const correctIndex = defBtn.dataset.correctIndex;

        if (wordIndex === correctIndex) {
            // Correct match
            this.matchingGameState.selectedWord.classList.add('correct');
            defBtn.classList.add('correct');
            this.matchingGameState.score += 10;
            this.matchingGameState.matches++;
            
            // Disable matched items
            this.matchingGameState.selectedWord.style.pointerEvents = 'none';
            defBtn.style.pointerEvents = 'none';
        } else {
            // Incorrect match
            this.matchingGameState.selectedWord.classList.add('incorrect');
            defBtn.classList.add('incorrect');
            
            // Reset after a delay
            setTimeout(() => {
                this.matchingGameState.selectedWord.classList.remove('incorrect', 'selected');
                defBtn.classList.remove('incorrect');
            }, 1000);
        }

        document.getElementById('matchingScore').textContent = this.matchingGameState.score;
        this.matchingGameState.selectedWord = null;

        // Check if game is complete
        if (this.matchingGameState.matches === 6) {
            setTimeout(() => {
                alert('Congratulations! You matched all words correctly!');
                this.progress += 25; // Games contribute 25% to progress
                this.updateProgress();
            }, 500);
        }
    }

    resetMatchingGame() {
        this.initMatchingGame();
    }

    loadQuizGame() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <h3>⚡ Quick Quiz</h3>
            <p>Answer as many questions as you can in 60 seconds!</p>
            <div class="quiz-timer">Time: <span id="quizTimer">60</span>s</div>
            <div class="quiz-question" id="quizQuestion"></div>
            <div class="quiz-options" id="quizOptions"></div>
            <div class="quiz-score">Score: <span id="quizScore">0</span></div>
            <button class="btn btn-primary" id="startQuiz">Start Quiz</button>
        `;

        document.getElementById('startQuiz').addEventListener('click', () => {
            this.startQuizGame();
        });
    }

    startQuizGame() {
        this.quizState = {
            score: 0,
            timeLeft: 60,
            currentQuestion: 0,
            questions: this.generateQuizQuestions()
        };

        document.getElementById('startQuiz').style.display = 'none';
        this.showQuizQuestion();
        this.startQuizTimer();
    }

    generateQuizQuestions() {
        const questions = [];
        const allWords = Object.values(vocabularyData).flat();
        
        // Generate 20 random questions
        for (let i = 0; i < 20; i++) {
            const word = allWords[Math.floor(Math.random() * allWords.length)];
            const wrongAnswers = allWords
                .filter(w => w !== word)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            
            const options = this.shuffleArray([word, ...wrongAnswers]);
            
            questions.push({
                question: `What does "${word.word}" mean?`,
                options: options.map(w => w.definition),
                correct: options.indexOf(word)
            });
        }
        
        return questions;
    }

    showQuizQuestion() {
        if (this.quizState.currentQuestion >= this.quizState.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.quizState.questions[this.quizState.currentQuestion];
        document.getElementById('quizQuestion').innerHTML = `
            <h4>Question ${this.quizState.currentQuestion + 1}</h4>
            <p>${question.question}</p>
        `;

        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.answerQuizQuestion(index));
            optionsContainer.appendChild(btn);
        });
    }

    answerQuizQuestion(selectedIndex) {
        const question = this.quizState.questions[this.quizState.currentQuestion];
        
        if (selectedIndex === question.correct) {
            this.quizState.score += 5;
            document.getElementById('quizScore').textContent = this.quizState.score;
        }

        this.quizState.currentQuestion++;
        setTimeout(() => this.showQuizQuestion(), 500);
    }

    startQuizTimer() {
        this.quizTimer = setInterval(() => {
            this.quizState.timeLeft--;
            document.getElementById('quizTimer').textContent = this.quizState.timeLeft;
            
            if (this.quizState.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    endQuiz() {
        clearInterval(this.quizTimer);
        document.getElementById('quizQuestion').innerHTML = `
            <h4>Quiz Complete!</h4>
            <p>Final Score: ${this.quizState.score} points</p>
            <p>You answered ${Math.floor(this.quizState.score / 5)} questions correctly!</p>
        `;
        document.getElementById('quizOptions').innerHTML = '';
        document.getElementById('startQuiz').style.display = 'block';
        document.getElementById('startQuiz').textContent = 'Play Again';
        
        this.progress += 25; // Quiz contributes to progress
        this.updateProgress();
    }

    loadListeningGame() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <h3>🎧 Listening Practice</h3>
            <p>Listen to the word and select the correct definition!</p>
            <div class="listening-controls">
                <button class="btn btn-primary" id="playWord">🔊 Play Word</button>
                <button class="btn btn-secondary" id="playAgain" style="display: none;">🔄 Play Again</button>
            </div>
            <div class="listening-options" id="listeningOptions"></div>
            <div class="listening-score">Score: <span id="listeningScore">0</span></div>
            <button class="btn btn-secondary" onclick="app.nextListeningQuestion()">Next Question</button>
        `;

        this.listeningState = {
            score: 0,
            currentWord: null,
            questionCount: 0
        };

        this.nextListeningQuestion();
    }

    nextListeningQuestion() {
        if (this.listeningState.questionCount >= 10) {
            document.getElementById('listeningOptions').innerHTML = `
                <h4>Listening Practice Complete!</h4>
                <p>Final Score: ${this.listeningState.score}/10</p>
            `;
            this.progress += 25; // Listening contributes to progress
            this.updateProgress();
            return;
        }

        const allWords = Object.values(vocabularyData).flat();
        const word = allWords[Math.floor(Math.random() * allWords.length)];
        this.listeningState.currentWord = word;
        this.listeningState.questionCount++;

        // Create options
        const wrongAnswers = allWords
            .filter(w => w !== word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        
        const options = this.shuffleArray([word, ...wrongAnswers]);

        const optionsContainer = document.getElementById('listeningOptions');
        optionsContainer.innerHTML = `<h4>Question ${this.listeningState.questionCount}/10</h4>`;

        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.definition;
            btn.addEventListener('click', () => this.answerListeningQuestion(option === word));
            optionsContainer.appendChild(btn);
        });

        // Set up play button
        document.getElementById('playWord').onclick = () => {
            this.playAudio(word.word);
            document.getElementById('playAgain').style.display = 'inline-block';
        };

        document.getElementById('playAgain').onclick = () => {
            this.playAudio(word.word);
        };

        document.getElementById('playAgain').style.display = 'none';
    }

    answerListeningQuestion(isCorrect) {
        if (isCorrect) {
            this.listeningState.score++;
            document.getElementById('listeningScore').textContent = this.listeningState.score;
        }

        // Disable options
        document.querySelectorAll('#listeningOptions .option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            if (btn.textContent === this.listeningState.currentWord.definition) {
                btn.classList.add('correct');
            } else if (isCorrect === false && btn.style.pointerEvents === 'none') {
                // This was the clicked wrong answer
                btn.classList.add('incorrect');
            }
        });
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${Math.min(this.progress, 100)}%`;
    }

    generateSpeechAudio() {
        // Ensure voices are loaded
        if ('speechSynthesis' in window) {
            speechSynthesis.onvoiceschanged = () => {
                // Voices are now loaded
                console.log('Speech synthesis voices loaded');
            };
        }
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EatingOutApp();
});

// Make app globally accessible for onclick handlers
window.app = app;

