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

// Alternar modo noche con animación
toggleDarkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Generar estrellas si entra en modo noche
    if (body.classList.contains('dark-mode')) {
        createStars();
        toggleDarkModeBtn.textContent = '☀️';
    } else {
        toggleDarkModeBtn.textContent = '🌙';
    }
});
