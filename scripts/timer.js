const timerHours = document.getElementById('timer-hours');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');

const btnPlayTimer = document.querySelector('#timer .play');
const btnResetTimer = document.querySelector('#timer .reset');
const btnFlagTimer = document.querySelector('#timer .flag');
const timeFlagTimer = document.getElementById('time-flag');

let intervalTimer;
let isRunningTimer = false;

function startTimer() {
    if (!isRunningTimer) {
        isRunningTimer = true;
        intervalTimer = setInterval(() => {
            let hours = parseInt(timerHours.value);
            let minutes = parseInt(timerMinutes.value);
            let seconds = parseInt(timerSeconds.value);

            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        stopTimer();
                        return;
                    }
                }
            }

            timerHours.value = hours.toString().padStart(2, '0');
            timerMinutes.value = minutes.toString().padStart(2, '0');
            timerSeconds.value = seconds.toString().padStart(2, '0');
        }, 1000);
    }
}

function stopTimer() {
    if (isRunningTimer) {
        isRunningTimer = false;
        clearInterval(intervalTimer);
    }
}

function resetTimer() {
    stopTimer();
    timerHours.value = '00';
    timerMinutes.value = '00';
    timerSeconds.value = '00';
    timeFlagTimer.style.display = 'none';
    timeFlagTimer.innerHTML = '';
}

function flagTimer() {
    const lapTime = document.createElement('p');
    const formattedHours = timerHours.value.padStart(2, '0');
    const formattedMinutes = timerMinutes.value.padStart(2, '0');
    const formattedSeconds = timerSeconds.value.padStart(2, '0');
    lapTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    timeFlagTimer.appendChild(lapTime);

    if (timeFlagTimer.children.length > 0) {
        timeFlagTimer.style.display = 'block';
    }
}

btnPlayTimer.addEventListener('click', startTimer);
btnResetTimer.addEventListener('click', resetTimer);
btnFlagTimer.addEventListener('click', flagTimer);