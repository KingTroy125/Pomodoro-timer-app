class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.isWorkSession = true;
        this.sessionsCompleted = 0;
        this.timer = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.sessionType = document.getElementById('sessionType');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.sessionsCount = document.getElementById('sessionsCount');
        this.progressFill = document.getElementById('progressFill');
        this.timerDisplay = document.getElementById('timerDisplay');
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.workTimeInput.addEventListener('change', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            if (!this.isRunning && this.isWorkSession) {
                this.currentTime = this.workTime;
                this.updateDisplay();
            }
        });
        
        this.breakTimeInput.addEventListener('change', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
            if (!this.isRunning && !this.isWorkSession) {
                this.currentTime = this.breakTime;
                this.updateDisplay();
            }
        });
    }
    
    start() {
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        this.timer = setInterval(() => {
            this.currentTime--;
            this.updateDisplay();
            
            if (this.currentTime <= 0) {
                this.complete();
            }
        }, 1000);
    }
    
    pause() {
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        clearInterval(this.timer);
    }
    
    reset() {
        this.pause();
        this.currentTime = this.isWorkSession ? this.workTime : this.breakTime;
        this.updateDisplay();
        this.timerDisplay.classList.remove('timer-complete');
    }
    
    complete() {
        this.pause();
        this.timerDisplay.classList.add('timer-complete');
        
        if (this.isWorkSession) {
            this.sessionsCompleted++;
            this.sessionsCount.textContent = this.sessionsCompleted;
            this.isWorkSession = false;
            this.currentTime = this.breakTime;
            this.sessionType.textContent = 'Break Time';
        } else {
            this.isWorkSession = true;
            this.currentTime = this.workTime;
            this.sessionType.textContent = 'Work Session';
        }
        
        this.updateDisplay();
        
        setTimeout(() => {
            this.timerDisplay.classList.remove('timer-complete');
        }, 2400);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const totalTime = this.isWorkSession ? this.workTime : this.breakTime;
        const progress = ((totalTime - this.currentTime) / totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});