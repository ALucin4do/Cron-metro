const btnThemes = [
    document.getElementById('theme1'),
    document.getElementById('theme2'),
    document.getElementById('theme3'),
    document.getElementById('theme4'),
    document.getElementById('theme5'),
    document.getElementById('theme6'),
];

const root = document.documentElement;

btnThemes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        root.style.setProperty('--title-theme', `var(--title-theme${index + 1})`);
        root.style.setProperty('--Watch-border', `var(--Watch-border-theme${index + 1})`);
        root.style.setProperty('--watch-numbers', `var(--watch-numbers-theme${index + 1})`);
        root.style.setProperty('--button-bg', `var(--button-bg-theme${index + 1})`);
    });
});
