class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.shortBreak = 5 * 60; // 5 minutes in seconds
        this.longBreak = 15 * 60; // 15 minutes in seconds
        
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.isWorkSession = true;
        this.sessionCount = 1;
        this.completedSessions = 0;
        this.totalTimeSpent = 0;
        this.timer = null;
        
        this.initElements();
        this.initEventListeners();
        this.updateDisplay();
        this.updateProgress();
    }

    initElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.sessionType = document.getElementById('sessionType');
        this.sessionCountEl = document.getElementById('sessionCount');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.skipBtn = document.getElementById('skipBtn');
        this.progressCircle = document.getElementById('progressCircle');
        this.completedSessionsEl = document.getElementById('completedSessions');
        this.totalTimeEl = document.getElementById('totalTime');
        this.notification = document.getElementById('notification');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.skipBtn.addEventListener('click', () => this.skipSession());
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        this.startBtn.classList.remove('primary');
        
        this.timer = setInterval(() => {
            this.currentTime--;
            this.updateDisplay();
            this.updateProgress();
            
            if (this.currentTime <= 0) {
                this.completeSession();
            }
        }, 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        this.startBtn.textContent = 'Start';
        this.startBtn.classList.add('primary');
        clearInterval(this.timer);
    }

    resetTimer() {
        this.pauseTimer();
        this.currentTime = this.isWorkSession ? this.workTime : 
            (this.sessionCount % 4 === 0 ? this.longBreak : this.shortBreak);
        this.updateDisplay();
        this.updateProgress();
    }

    skipSession() {
        this.completeSession();
    }

    completeSession() {
        this.pauseTimer();
        
        if (this.isWorkSession) {
            this.completedSessions++;
            this.totalTimeSpent += this.workTime;
            this.showNotification('Work session completed! Time for a break.');
            
            // Switch to break
            this.isWorkSession = false;
            this.currentTime = this.sessionCount % 4 === 0 ? this.longBreak : this.shortBreak;
            this.sessionType.textContent = this.sessionCount % 4 === 0 ? 'Long Break' : 'Short Break';
        } else {
            this.showNotification('Break completed! Ready for the next session?');
            
            // Switch to work
            this.isWorkSession = true;
            this.sessionCount++;
            this.currentTime = this.workTime;
            this.sessionType.textContent = 'Focus Time';
        }
        
        this.updateDisplay();
        this.updateProgress();
        this.updateStats();
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.sessionCountEl.textContent = this.sessionCount;
    }

    updateProgress() {
        const totalTime = this.isWorkSession ? this.workTime : 
            (this.sessionCount % 4 === 0 ? this.longBreak : this.shortBreak);
        const progress = (totalTime - this.currentTime) / totalTime;
        const circumference = 2 * Math.PI * 90; // radius = 90
        const offset = circumference - (progress * circumference);
        this.progressCircle.style.strokeDashoffset = offset;
        
        // Change color based on session type
        if (this.isWorkSession) {
            this.progressCircle.style.stroke = '#00f5ff';
        } else if (this.sessionCount % 4 === 0) {
            this.progressCircle.style.stroke = '#ff6b6b';
        } else {
            this.progressCircle.style.stroke = '#4ecdc4';
        }
    }

    updateStats() {
        this.completedSessionsEl.textContent = this.completedSessions;
        const hours = Math.floor(this.totalTimeSpent / 3600);
        const minutes = Math.floor((this.totalTimeSpent % 3600) / 60);
        this.totalTimeEl.textContent = `${hours}h ${minutes}m`;
    }

    showNotification(message) {
        this.notification.textContent = message;
        this.notification.classList.add('show');
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});