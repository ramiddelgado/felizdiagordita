document.addEventListener('DOMContentLoaded', () => {
    // Actualizar hora y fecha
    function updateDateTime() {
        const now = new Date();
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        
        // Formato de hora
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
        
        // Formato de fecha
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const dateStr = now.toLocaleDateString('es-ES', options);
        dateElement.textContent = dateStr;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Manejo del código de acceso
    const correctPassword = "2025";
    let currentInput = "";
    const dots = document.querySelectorAll('.dot');
    
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput.length < 4) {
                currentInput += button.textContent;
                dots[currentInput.length - 1].classList.add('filled');
                
                if (currentInput.length === 4) {
                    setTimeout(() => {
                        if (currentInput === correctPassword) {
                            unlockPhone();
                        } else {
                            alert('Código incorrecto. Intenta de nuevo.');
                            currentInput = "";
                            dots.forEach(dot => dot.classList.remove('filled'));
                        }
                    }, 200);
                }
            }
        });
    });

    // Función para desbloquear el teléfono
    function unlockPhone() {
        const lockScreen = document.querySelector('.lock-screen');
        const googleScreen = document.querySelector('.google-screen');
        
        lockScreen.classList.add('fade-out');
        
        setTimeout(() => {
            lockScreen.classList.add('hidden');
            googleScreen.classList.remove('hidden');
            googleScreen.classList.add('fade-in');
            setupGoogleSearch();
        }, 500);
    }

    // Configurar la búsqueda de Google
    function setupGoogleSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchSuggestion = document.querySelector('.search-suggestion');
        const frequentSearches = document.querySelector('.frequent-searches');
        const googleScreen = document.querySelector('.google-screen');
        const loveScreen = document.querySelector('.love-screen');

        searchInput.addEventListener('click', () => {
            searchSuggestion.classList.remove('hidden');
            frequentSearches.classList.add('hidden');
        });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && 
                !searchSuggestion.contains(e.target)) {
                searchSuggestion.classList.add('hidden');
                frequentSearches.classList.remove('hidden');
            }
        });

        // Manejar clic en búsquedas frecuentes
        document.querySelectorAll('.frequent-search-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.textContent.trim();
                frequentSearches.classList.add('hidden');
            });
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.toLowerCase().trim() === 'quien es el amor de mi vida') {
                googleScreen.classList.add('fade-out');
                setTimeout(() => {
                    googleScreen.classList.add('hidden');
                    loveScreen.classList.remove('hidden');
                    loveScreen.classList.add('fade-in');
                }, 500);
            }
        });

        // Configurar el botón de la foto
        const photoButton = document.querySelector('.photo-button');
        const photoOverlay = document.querySelector('.photo-overlay');
        const closeButton = document.querySelector('.close-button');

        photoButton.addEventListener('click', () => {
            photoOverlay.classList.remove('hidden');
        });

        const extraMessage = document.querySelector('.extra-message');

        closeButton.addEventListener('click', () => {
            photoOverlay.classList.add('hidden');
            extraMessage.classList.remove('hidden');
            setTimeout(() => {
                extraMessage.classList.add('show');
                setTimeout(() => {
                    const continueMessage = document.querySelector('.continue-message');
                    continueMessage.classList.remove('hidden');
                    continueMessage.classList.add('show');
                }, 1000);
            }, 100);
        });

        photoOverlay.addEventListener('click', (e) => {
            if (e.target === photoOverlay) {
                photoOverlay.classList.add('hidden');
                extraMessage.classList.remove('hidden');
                setTimeout(() => {
                    extraMessage.classList.add('show');
                    setTimeout(() => {
                        const continueMessage = document.querySelector('.continue-message');
                        continueMessage.classList.remove('hidden');
                        continueMessage.classList.add('show');
                    }, 1000);
                }, 100);
            }
        });
    }
});
