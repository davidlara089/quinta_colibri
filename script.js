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

// Crear contenedor de estrellas, cometas y luna
const starsContainer = document.createElement('div');
const cometsContainer = document.createElement('div');
const moon = document.createElement('div');

starsContainer.classList.add('stars');
cometsContainer.classList.add('comets');
moon.classList.add('moon');

document.body.appendChild(starsContainer);
document.body.appendChild(cometsContainer);
document.body.appendChild(moon);

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

// Función para generar cometas
function createComets() {
    const totalComets = 10; // Número de cometas
    cometsContainer.innerHTML = ''; // Limpiar cometas previos

    for (let i = 0; i < totalComets; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        comet.style.top = Math.random() * 100 + '%'; // Posición aleatoria
        comet.style.left = Math.random() * 100 + '%';
        comet.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio
        comet.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria
        cometsContainer.appendChild(comet);
    }
}

// Función para mostrar la luna
function createMoon() {
    moon.innerHTML = ''; // Limpiar luna previa
    const moonElement = document.createElement('div');
    moonElement.classList.add('moon-element');
    moon.appendChild(moonElement);
}

// Ejecutar funciones
createStars();
createComets();
createMoon();

// Estilos CSS
const style = document.createElement('style');
style.innerHTML = `
    .stars, .comets, .moon {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
    }
    .star {
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        animation: twinkling 2s infinite ease-in-out;
    }
    @keyframes twinkling {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.3; }
    }
    .comet {
        position: absolute;
        width: 3px;
        height: 3px;
        background: white;
        border-radius: 50%;
        animation: movingComet 5s infinite linear;
    }
    @keyframes movingComet {
        0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
        100% { transform: translateX(-100vw) translateY(100vh) scale(0.5); opacity: 0; }
    }
    .moon-element {
        position: absolute;
        width: 50px;
        height: 50px;
        background: lightgrey;
        border-radius: 50%;
        top: 10%;
        right: 10%;
    }
`;
document.head.appendChild(style);


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
