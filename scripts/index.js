const navStopwatch = document.getElementById('nav-stopwatch');
const navTimer = document.getElementById('nav-timer');
const navPomodoro = document.getElementById('nav-pomodoro');

/* move a classe active pra cada elemento selecionado da navbar */
function navbarSelection(selected){
    const elements = [navStopwatch,navTimer,navPomodoro];
    elements.forEach(element => {
        element.classList.remove('active');
    });
    selected.classList.add('active');
}

navStopwatch.addEventListener('click', () => navbarSelection(navStopwatch));
navTimer.addEventListener('click', () => navbarSelection(navTimer));
navPomodoro.addEventListener('click', () => navbarSelection(navPomodoro));

/* alterna entre mostrar e esconder a sidebar */
function sidebarToggle() {
    const sidebar = document.getElementById('sidebar-theme');
    if (sidebar.style.right === '-250px' || !sidebar.style.right) {
        sidebar.style.right = '50px';  /* Mostra a sidebar*/
    } else {
        sidebar.style.right = '-250px'; /* Esconde a sidebar */
    }
}

const toggleSidebar = document.getElementById('toggle-sidebar');
toggleSidebar.addEventListener('click', sidebarToggle);

/* para que a sidebar seja fechada quando o usuário clicar fora dela */
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar-theme');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    if (!sidebar.contains(event.target) && !toggleSidebar.contains(event.target)) {
        sidebar.style.right = '-250px';
    }
});

/* seleciona qual seção da página será mostrada baseado em qual elemento da sidebar foi clicado */
const stopwatch = document.getElementById('stopwatch');
const timer = document.getElementById('timer');
const pomodoro = document.getElementById('pomodoro');

function sectionSelection(section){
    const elements = [stopwatch, timer, pomodoro];
    elements.forEach(element => {
        element.style.display = 'none';
    });
    section.style.display = 'flex';


    const existingScript = document.querySelector(`script[src="${section.id}.js"]`);
    if (existingScript) {
        return;
    }

    const sectionScript = document.createElement('script');
    sectionScript.src = `scripts/${section.id}.js`;
    document.body.appendChild(sectionScript);
}

navStopwatch.addEventListener('click', () => sectionSelection(stopwatch));
navTimer.addEventListener('click', () => sectionSelection(timer));
navPomodoro.addEventListener('click', () => sectionSelection(pomodoro));

/* define a seção stopwatch a ser a primeira a ser carregada por padrão */
function starApp(){
    sectionSelection(stopwatch);
}

starApp();




