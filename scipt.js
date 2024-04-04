let timer; // Variable to hold the timer interval
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.querySelector('.start-btn').textContent = 'Pause';
  } else {
    isRunning = false;
    clearInterval(timer);
    document.querySelector('.start-btn').textContent = 'Resume';
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    document.querySelector('.start-btn').textContent = 'Resume';
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timer);
  document.querySelector('.start-btn').textContent = 'Start';
  elapsedTime = 0;
  updateDisplay();
  laps = [];
  document.querySelector('.laps').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = elapsedTime;
    laps.push(lapTime);
    const lapList = document.querySelector('.laps');
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
  }
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const totalMilliseconds = Math.floor(time);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(value) {
  return value.toString().padStart(2, '0');
}
