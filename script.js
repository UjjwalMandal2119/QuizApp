// Subject-wise Questions (Complete 10 questions per subject)
const quizData = {
    web: [
        { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], ans: 2, icon: "🌐" },
        { q: "Which HTML tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], ans: 1, icon: "🔗" },
        { q: "JavaScript file extension?", options: [".js", ".css", ".html", ".php"], ans: 0, icon: "💻" },
        { q: "Which is a CSS framework?", options: ["React", "Bootstrap", "Node.js", "MongoDB"], ans: 1, icon: "🎨" },
        { q: "Flexbox is for?", options: ["2D Layout", "1D Layout", "Images", "Animations"], ans: 1, icon: "📐" },
        { q: "React uses?", options: ["Classes", "Functions", "Components", "All"], ans: 2, icon: "⚛️" },
        { q: "CSS Grid is for?", options: ["1D Layout", "2D Layout", "Lists", "Tables"], ans: 1, icon: "📊" },
        { q: "localStorage stores?", options: ["Images", "Strings", "Objects", "Functions"], ans: 1, icon: "💾" },
        { q: "Media queries for?", options: ["Responsive", "Animations", "Colors", "Fonts"], ans: 0, icon: "📱" },
        { q: "DOM stands for?", options: ["Data Object Model", "Document Object Model", "Dynamic Object Model", "Display Object Model"], ans: 1, icon: "🌳" }
    ],
    dsa: [
        { q: "Binary search time complexity?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], ans: 1, icon: "⚡" },
        { q: "Array stores elements?", options: ["Randomly", "Contiguously", "Linked", "Scattered"], ans: 1, icon: "📦" },
        { q: "Stack follows?", options: ["FIFO", "LIFO", "Random", "Sorted"], ans: 1, icon: "📚" },
        { q: "Queue follows?", options: ["LIFO", "FIFO", "Random", "Circular"], ans: 1, icon: "⏳" },
        { q: "Tree has?", options: ["Cycles", "No cycles", "Single path", "Multiple roots"], ans: 1, icon: "🌳" },
        { q: "Hash table average case?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], ans: 1, icon: "🔑" },
        { q: "Bubble sort is?", options: ["Stable", "Unstable", "Optimal", "Divide"], ans: 0, icon: "🫧" },
        { q: "Graph can have?", options: ["Cycles", "No edges", "Single node", "All"], ans: 3, icon: "📈" },
        { q: "Linked list insertion?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], ans: 1, icon: "🔗" },
        { q: "BFS uses?", options: ["Stack", "Queue", "Heap", "Tree"], ans: 1, icon: "🔍" }
    ],
    cloud: [
        { q: "AWS EC2 stands for?", options: ["Elastic Compute Cloud", "Every Cloud Compute", "Easy Cloud Computing", "External Cloud"], ans: 0, icon: "☁️" },
        { q: "Nginx default port?", options: ["8080", "3000", "80", "443"], ans: 2, icon: "🌐" },
        { q: "Static files served by?", options: ["Database", "Nginx", "React", "Python"], ans: 1, icon: "📁" },
        { q: "AWS free tier instance?", options: ["t3.micro", "t2.micro", "m5.large", "c5.xlarge"], ans: 1, icon: "💰" },
        { q: "Security group controls?", options: ["CPU", "RAM", "Ports", "Storage"], ans: 2, icon: "🔒" },
        { q: "Ubuntu package manager?", options: ["yum", "apt", "pip", "npm"], ans: 1, icon: "📦" },
        { q: "Port 22 is for?", options: ["HTTP", "HTTPS", "SSH", "FTP"], ans: 2, icon: "🔐" },
        { q: "Nginx config file?", options: ["/etc/nginx/nginx.conf", "/var/log/nginx.conf", "/usr/nginx.conf", "/home/nginx.conf"], ans: 0, icon: "⚙️" },
        { q: "chmod 755 means?", options: ["Read only", "Owner rwx, others rx", "All read", "Execute only"], ans: 1, icon: "🔧" },
        { q: "www-data is?", options: ["Root user", "Nginx user", "Database user", "App user"], ans: 1, icon: "👤" }
    ],
    system: [
        { q: "TCP/IP has layers?", options: ["4", "5", "7", "3"], ans: 2, icon: "🔌" },
        { q: "Process vs Thread?", options: ["Same", "Thread lighter", "Process lighter", "No difference"], ans: 1, icon: "⚙️" },
        { q: "Linux fork() creates?", options: ["Thread", "Process", "File", "Socket"], ans: 1, icon: "🔄" },
        { q: "Virtual memory uses?", options: ["RAM only", "Disk + RAM", "CPU cache", "GPU"], ans: 1, icon: "💾" },
        { q: "HTTP is?", options: ["TCP", "UDP", "Stateless", "Both"], ans: 2, icon: "🌐" },
        { q: "DNS resolves?", options: ["IP to name", "Name to IP", "Port to service", "MAC to IP"], ans: 1, icon: "🔍" },
        { q: "Semaphore is for?", options: ["Memory", "Synchronization", "File I/O", "Network"], ans: 1, icon: "🚦" },
        { q: "Deadlock needs?", options: ["2 conditions", "4 conditions", "1 condition", "6 conditions"], ans: 1, icon: "⛓️" },
        { q: "Page fault causes?", options: ["Page in memory", "Page not in memory", "Cache hit", "Buffer full"], ans: 1, icon: "📄" },
        { q: "Signals in Linux?", options: ["Hardware interrupts", "Software interrupts", "Both", "Neither"], ans: 2, icon: "📡" }
    ]
};

let currentSubject = '';
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
let answered = false; // CRITICAL FIX

// DOM Elements
const screens = {
    subject: document.getElementById('subjectScreen'),
    quiz: document.getElementById('quizScreen'),
    result: document.getElementById('resultScreen')
};
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const questionNumEl = document.getElementById('questionNum');
const timeEl = document.getElementById('time');
const progressFill = document.getElementById('progressFill');
const finalScoreEl = document.getElementById('finalScore');
const resultMessageEl = document.getElementById('resultMessage');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Subject selection
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            currentSubject = this.dataset.subject;
            showScreen('quiz');
            resetQuiz();
            loadQuestion();
        });
    });

    // Event listeners
    nextBtn.addEventListener('click', nextQuestion); // FIXED: Direct addEventListener
    document.querySelector('.back-btn').addEventListener('click', () => showScreen('subject'));
    document.querySelector('.leaderboard-btn').addEventListener('click', showLeaderboard);
});

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    clearInterval(timer);
}

function loadQuestion() {
    const qData = quizData[currentSubject][currentQuestion];
    document.querySelector('.question-icon').textContent = qData.icon;
    questionEl.innerHTML = `<strong>${currentQuestion + 1}.</strong> ${qData.q}`;
    
    // Clear previous options
    optionsEl.innerHTML = '';
    qData.options.forEach((option, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.addEventListener('click', () => selectOption(i)); // FIXED: Fresh event listeners
        optionsEl.appendChild(div);
    });
    
    // Reset button and timer
    nextBtn.disabled = true;
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next';
    startTimer();
    updateStats();
}

function selectOption(selected) {
    if (answered) return; // Prevent multiple clicks
    
    answered = true;
    clearInterval(timer);
    const correct = quizData[currentSubject][currentQuestion].ans;
    
    // Visual feedback
    document.querySelectorAll('.option').forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === correct) {
            opt.classList.add('correct');
        } else if (i === selected && i !== correct) {
            opt.classList.add('wrong');
        }
        if (i === selected) {
            opt.classList.add('selected');
        }
    });
    
    // Score calculation
    if (selected === correct) score++;
    
    // Enable next button
    nextBtn.disabled = false;
    nextBtn.innerHTML = currentQuestion === 9 ? '<i class="fas fa-trophy"></i> Finish' : '<i class="fas fa-arrow-right"></i> Next';
}

function nextQuestion() {
    currentQuestion++;
    answered = false;
    
    if (currentQuestion < 10) {
        loadQuestion();
    } else {
        saveScore();
        showResult();
    }
}

function startTimer() {
    timeLeft = 30;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 5) timeEl.style.color = '#dc3545';
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.disabled = false;
            nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next';
        }
    }, 1000);
}

function updateStats() {
    scoreEl.textContent = score;
    questionNumEl.textContent = currentQuestion + 1;
    progressFill.style.width = `${((currentQuestion + 1) / 10) * 100}%`;
}

function showResult() {
    finalScoreEl.textContent = `${score}/10`;
    const percentage = (score / 10) * 100;
    if (percentage >= 80) {
        resultMessageEl.innerHTML = '🎉 <strong>CS Pro Level!</strong> Perfect score!';
    } else if (percentage >= 60) {
        resultMessageEl.innerHTML = '🚀 <strong>Excellent!</strong> Keep mastering!';
    } else if (percentage >= 40) {
        resultMessageEl.innerHTML = '👍 <strong>Good job!</strong> Practice more!';
    } else {
        resultMessageEl.innerHTML = '📚 <strong>Keep learning!</strong> You got this!';
    }
    showScreen('result');
}

function saveScore() {
    const newScore = { 
        subject: currentSubject.toUpperCase(), 
        score, 
        date: new Date().toLocaleDateString('en-IN') 
    };
    leaderboard.unshift(newScore);
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
}

function restartQuiz() {
    showScreen('subject');
}

function showLeaderboard() {
    const list = document.getElementById('leaderboardList');
    if (leaderboard.length === 0) {
        list.innerHTML = '<div>No scores yet! Take a quiz!</div>';
    } else {
        list.innerHTML = leaderboard.map((entry, i) => 
            `<div class="leaderboard-item"><span>${i+1}.</span> <strong>${entry.subject}</strong>: ${entry.score}/10 <small>${entry.date}</small></div>`
        ).join('');
    }
    document.getElementById('leaderboardModal').style.display = 'block';
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').style.display = 'none';
}

// Global event listeners
document.querySelector('.restart-btn').addEventListener('click', restartQuiz);
document.querySelector('.close-modal').addEventListener('click', closeLeaderboard);
