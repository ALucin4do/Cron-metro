/* pega cada input como uma variável diferente */
const timerHours = document.getElementById('timer-hours');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');

const btnPlayTimer = document.querySelector('#timer .play');
const btnResetTimer = document.querySelector('#timer .reset');
const btnFlagTimer = document.querySelector('#timer .flag');
const timeFlagTimer = document.getElementById('time-flag');

let intervalTimer; /* vai armazenar ID gerado pelo setInterval */ 
let isRunningTimer = false;

/* atualiza o valor dos inputs diminuindo 1 valor a cada 1000 milisegungos */
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
            /* formata para HH:MM:SS e passa pro input como string */
            timerHours.value = hours.toString().padStart(2, '0');
            timerMinutes.value = minutes.toString().padStart(2, '0');
            timerSeconds.value = seconds.toString().padStart(2, '0');
        }, 1000);
    }
}

/* para a atualização dos inputs */
function stopTimer() {
    if (isRunningTimer) {
        isRunningTimer = false;
        clearInterval(intervalTimer);
    }
}

/* reseta o timer para 0 */
function resetTimer() {
    stopTimer();
    timerHours.value = '00';
    timerMinutes.value = '00';
    timerSeconds.value = '00';
    timeFlagTimer.style.display = 'none';
    timeFlagTimer.innerHTML = '';
}

/* marca um tempo para deixar no historico de tempos marcados */
function flagTimer() {
    const lapTime = document.createElement('p');
    const formattedHours = timerHours.value.padStart(2, '0');
    const formattedMinutes = timerMinutes.value.padStart(2, '0');
    const formattedSeconds = timerSeconds.value.padStart(2, '0');
    lapTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    timeFlagTimer.appendChild(lapTime);

    if (timeFlagTimer.style.display === 'flex'){
        return
    }

    timeFlagTimer.style.display = 'flex';
}

/* funcionamento dos botões */
btnPlayTimer.addEventListener('click', startTimer);
btnResetTimer.addEventListener('click', resetTimer);
btnFlagTimer.addEventListener('click', flagTimer);