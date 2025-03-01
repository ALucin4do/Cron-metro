const stopwatch = document.getElementById('stopwatch');
const timer = document.getElementById('timer');
const pomodoro = document.getElementById('pomodoro');

function navbarSelection(selected){
    const elements = [stopwatch, timer, pomodoro];
    elements.forEach(element => {
        element.classList.remove('active');
    });
    selected.classList.add('active');
}

stopwatch.addEventListener('click', () => navbarSelection(stopwatch));
timer.addEventListener('click', () => navbarSelection(timer));
pomodoro.addEventListener('click', () => navbarSelection(pomodoro));


function sidebarToggle() {
    const sidebar = document.getElementById('sidebar-theme');
    // Verifica se a posição atual é '-250px' (escondida) ou se é vazio (inicialmente)
    if (sidebar.style.right === '-250px' || !sidebar.style.right) {
        sidebar.style.right = '50px'; // Mostra a barra lateral
    } else {
        sidebar.style.right = '-250px'; // Esconde a barra lateral
    }
}

const toggleSidebar = document.getElementById('toggle-sidebar');
// Passa a função como referência, sem chamá-la imediatamente
toggleSidebar.addEventListener('click', sidebarToggle);
