// Change theme

const themeBtn = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');

function SetLightTheme() {
    document.body.classList.add('light');
    themeIcon.src = 'assets/icons/moon.svg';
    localStorage.theme = 'light';
}

function SetDarkTheme() {
    document.body.classList.remove('light');
    themeIcon.src = 'assets/icons/sun.svg';
    localStorage.theme = 'dark';
}

themeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light')) {
        SetDarkTheme()
    } else {
        SetLightTheme()
    }
})

if (localStorage.theme === 'light') {
    SetLightTheme()
}