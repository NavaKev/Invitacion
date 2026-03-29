document.addEventListener("DOMContentLoaded", function() {
    
    const openBtn = document.getElementById('open-btn');
    const envelope = document.getElementById('envelope-overlay');

    openBtn.addEventListener('click', function() {
        // 1. Añadimos la clase que sube y oculta el sobre
        envelope.classList.add('open');
        
        // 2. Esperamos a que la transición termine para ocultar el sobre y permitir el scroll
        envelope.addEventListener('transitionend', function handler() {
            envelope.style.display = 'none';
            // Quitamos la clase que bloqueaba el scroll del body
            document.body.classList.remove('no-scroll');
            // Eliminamos el listener para que no se ejecute múltiples veces
            envelope.removeEventListener('transitionend', handler);
        });
        
    });

    // --- Lógica del Contador Regresivo ---
    const weddingCountdownElement = document.getElementById('wedding-countdown');
    // Establece la fecha de la boda (Año, Mes-1, Día, Hora, Minuto, Segundo)
    // Noviembre es el mes 11, pero en JavaScript los meses van de 0 a 11, así que es 10.
    const weddingDate = new Date("Nov 28, 2026 16:00:00").getTime(); // 4 PM

    function updateWeddingCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Muestra el resultado en el elemento con id="wedding-countdown"
        if (weddingCountdownElement) {
            if (distance > 0) {
                weddingCountdownElement.innerHTML = `
                    <div>${days}<span>Días</span></div>
                    <div>${hours}<span>Horas</span></div>
                    <div>${minutes}<span>Minutos</span></div>
                    <div>${seconds}<span>Segundos</span></div>
                `;
            } else {
                weddingCountdownElement.innerHTML = "¡Ya es el gran día!";
                clearInterval(weddingCountdownInterval);
            }
        }
    }

    // Actualiza el contador cada 1 segundo
    const weddingCountdownInterval = setInterval(updateWeddingCountdown, 1000);
    updateWeddingCountdown(); // Llama a la función una vez inmediatamente para evitar un retraso inicial

    // --- Lógica para el reproductor de música ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    const weddingSong = document.getElementById('wedding-song');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');

    if (playPauseBtn && weddingSong) {
        playPauseBtn.addEventListener('click', () => {
            // Comprobar si la canción está pausada
            if (weddingSong.paused) {
                weddingSong.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                weddingSong.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        });

        // Opcional: Si la canción termina y no está en loop, volver a mostrar el ícono de play
        weddingSong.addEventListener('ended', () => {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
    }

    // --- Lógica para Agregar a Google Calendar ---
    const addToCalendarBtn = document.getElementById('add-to-calendar-btn');
    if (addToCalendarBtn) {
        const eventTitle = encodeURIComponent("Boda de Itzel y Miguel");
        const eventDetails = encodeURIComponent("¡Acompáñanos a celebrar el amor de Itzel y Miguel!");
        const eventLocation = encodeURIComponent("Iglesia de San Miguel Arcángel, Calle Principal #123, Centro");

        // Formato de fecha y hora para Google Calendar (YYYYMMDDTHHMMSS)
        // La fecha de la boda es 28 de Noviembre de 2026, 16:00 hrs. Asumimos que la ceremonia dura 2 horas.
        const startDate = "20261128T160000";
        const endDate = "20261128T180000"; 

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;
        
        addToCalendarBtn.href = googleCalendarUrl;
        addToCalendarBtn.target = "_blank"; // Abre en una nueva pestaña
    }

    // --- Lógica para el carrusel de Galería (Swiper) ---
    const swiper = new Swiper('.gallery-swiper', {
        // Parámetros opcionales
        effect: 'coverflow', // Un efecto visual atractivo
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true, // Para que el carrusel sea infinito
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        
        // Paginación
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navegación con flechas
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});