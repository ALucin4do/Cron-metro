
const displayTime = document.querySelector('#stopwatch .circle span');
const btnPlay = document.querySelector('#stopwatch .play');
const btnReset = document.querySelector('#stopwatch .reset');
const btnFlag = document.querySelector('#stopwatch .flag');
const timeFlag = document.getElementById('time-flag');

let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval; /* vai armazenar ID gerado pelo setInterval */
let isRunning = false;

/* formata o tempo para que seja exibido de forma correta no display
    mesmo se for menor que 10 */
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

/* atualiza o display do relógio */
function updateDisplay() {
    const formattedMiliseconds = formatTime(miliSeconds);
    const formattedSeconds = formatTime(seconds);
    const formattedMinutes = formatTime(minutes);
    const formattedHours = formatTime(hours);
    displayTime.textContent= `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMiliseconds}`;
}

/* faz uma iteração a cada 10 milissegundos */
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            miliSeconds++;
            if (miliSeconds >= 100) {
                miliSeconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            } 
            updateDisplay();
        } ,10);
    }
}

/* para a iteração */
function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
    }
}

/* reseta o relógio para 0 */
function resetStopwatch() {
    /* reseta o botão play/pause */
    const iconBtn = document.getElementById('toggle-play');
    if (isRunning) {
        iconBtn.src = 'src/assets/play.svg';
    }
    
    /* reseta o contador do cronometro */
    stopStopwatch();
    miliSeconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();

    /* reseta o histórico de marcações de tempo */
    timeFlag.style.display = 'none';
    timeFlag.innerHTML = '';
}

/* marca um tempo para deixar no historico de tempos marcados */
function flagStopwatch(){
    const lapTime = document.createElement('p');
    const formattedMiliseconds = formatTime(miliSeconds);
    const formattedSeconds = formatTime(seconds);
    const formattedMinutes = formatTime(minutes);
    const formattedHours = formatTime(hours);
    lapTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMiliseconds}`;
    timeFlag.appendChild(lapTime);

    if (timeFlag.style.display === 'flex'){
        return
    }

    timeFlag.style.display = 'flex';
}

/* Funcionamento dos botões */
btnPlay.addEventListener('click', () => {
    const iconBtn = document.getElementById('toggle-play');
    if (isRunning) {
        iconBtn.src = 'src/assets/play.svg';
        stopStopwatch();
    } else {
        iconBtn.src = 'src/assets/pause.svg';
        startStopwatch();
    }
});

btnReset.addEventListener('click', resetStopwatch);
btnFlag.addEventListener('click', flagStopwatch);
