const displayPomodoro = document.querySelector('#pomodoro .circle span');
const btnPlayPomodoro = document.querySelector('#pomodoro .play');
const btnResetPomodoro = document.querySelector('#pomodoro .reset');
const btnFlagPomodoro = document.querySelector('#pomodoro .flag');
const timeFlagPomodoro = document.getElementById('time-flag');

let secondsPomodoro = 0;
let minutesPomodoro = 1;
let intervalPomodoro; /* vai armazenar o ID do setInterval */
let isRunningPomodoro = false;
let isBreakTime = false;


/* formata o tempo para que seja exibido de forma correta no display
    mesmo se for menor que 10 */
function formatTimePomodoro(time) {
    return time.toString().padStart(2, '0');
}

/* atualiza o display do relógio */
function updateDisplayPomodoro() {
    const formattedSeconds = formatTimePomodoro(secondsPomodoro);
    const formattedMinutes = formatTimePomodoro(minutesPomodoro);
    displayPomodoro.textContent= `${formattedMinutes}:${formattedSeconds}`;
}

/* faz uma iteração a cada 1000 milisegundos */
function startPomodoro() {
    if (!isRunningPomodoro) {
        isRunningPomodoro = true;
        intervalPomodoro = setInterval(() => {
            
            if (secondsPomodoro > 0){
                secondsPomodoro--
            }
            else{
                if(minutesPomodoro > 0){
                    secondsPomodoro = 59;
                    minutesPomodoro--;
                }
                else{
                    if(!isBreakTime){
                        isBreakTime = true;
                        secondsPomodoro = 0;
                        minutesPomodoro = 5;
                        alert('Hora de descansar!');
                        startPomodoro();
                    }
                    else{
                        isBreakTime = false;
                        secondsPomodoro = 0;
                        minutesPomodoro = 25;
                        alert('Hora de estudar novamente!');
                        startPomodoro();
                    }
                }
            }
            updateDisplayPomodoro();
        } ,1000);
    }
}

/* para a iteração */
function stopPomodoro() {
    if (isRunningPomodoro) {
        isRunningPomodoro = false;
        clearInterval(intervalPomodoro);
    }
}

/* reseta o relógio para 25:00 */
function resetPomodoro() {
    /* reseta o botão play/pause */
    const iconBtn = document.getElementById('toggle-play-pomodoro');
    if (isRunningPomodoro) {
        iconBtn.src = 'src/assets/play.svg';
    }
    
    /* reseta o contador do cronometro */
    stopPomodoro();
    secondsPomodoro = 0;
    minutesPomodoro = 25;
    updateDisplayPomodoro();

    /* reseta o histórico de marcações de tempo */
    timeFlagPomodoro.style.display = 'none';
    timeFlagPomodoro.innerHTML = '';
}

/* marca um tempo para deixar no historico de tempos marcados */
function flagPomodoro(){
    const lapTime = document.createElement('p');
    const formattedSeconds = formatTime(secondsPomodoro);
    const formattedMinutes = formatTime(minutesPomodoro);
    lapTime.textContent = `${formattedMinutes}:${formattedSeconds}`;
    timeFlagPomodoro.appendChild(lapTime);

    if (timeFlagPomodoro.style.display === 'flex'){
        return
    }

    timeFlagPomodoro.style.display = 'flex';
}

/* funcionamento dos botões */
btnPlayPomodoro.addEventListener('click', () => {
    const iconBtn = document.getElementById('toggle-play-pomodoro');
    if (isRunningPomodoro) {
        iconBtn.src = 'src/assets/play.svg';
        stopPomodoro();
    } else {
        iconBtn.src = 'src/assets/pause.svg';
        startPomodoro();
    }
});

btnResetPomodoro.addEventListener('click', resetPomodoro);
btnFlagPomodoro.addEventListener('click', flagPomodoro);
