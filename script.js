// Función para detectar elementos visibles en el viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Seleccionar todos los elementos que tendrán animación
const elementsToAnimate = document.querySelectorAll('.fade-in');

// Añadir el observer a cada elemento
elementsToAnimate.forEach(el => observer.observe(el));

const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
const body = document.body;

// Crear contenedor de estrellas
const starsContainer = document.createElement('div');
starsContainer.classList.add('stars');
body.appendChild(starsContainer);

// Función para generar estrellas
function createStars() {
    const totalStars = 100; // Número de estrellas
    starsContainer.innerHTML = ''; // Limpiar estrellas previas

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + '%'; // Posición aleatoria
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
        starsContainer.appendChild(star);
    }
}

// Función para alternar el modo noche
function toggleDarkMode() {
    const isDarkMode = body.classList.toggle('dark-mode');
    toggleDarkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    if (isDarkMode) {
        createStars();
    }
}

// Inicializar el estado de modo noche
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        toggleDarkModeBtn.textContent = '☀️';
        createStars();
    } else {
        body.classList.remove('dark-mode');
        toggleDarkModeBtn.textContent = '🌙';
    }
}

// Inicializar el estado del modo noche al cargar la página
initializeDarkMode();

// Agregar evento al botón para alternar el modo noche
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
window.addEventListener('storage', (event) => {
    if (event.key === 'darkMode') {
        initializeDarkMode();
    }
});
