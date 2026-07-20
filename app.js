document.addEventListener('DOMContentLoaded', () => {
    // --- Mobil Menü İşlemleri ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if(menuToggle) {
        const toggleIcon = menuToggle.querySelector('i');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-times');
            } else {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }
        });
    }

    // Navigasyon linklerine tıklandığında menüyü kapat (Mobil için)
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
                if(menuToggle) {
                    const toggleIcon = menuToggle.querySelector('i');
                    if(toggleIcon) {
                        toggleIcon.classList.remove('fa-times');
                        toggleIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Dışarıya tıklandığında menüyü kapat (Mobil için)
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    const toggleIcon = menuToggle.querySelector('i');
                    if (toggleIcon) {
                        toggleIcon.classList.remove('fa-times');
                        toggleIcon.classList.add('fa-bars');
                    }
                }
            }
        }
    });

    // --- Arka Plan Yıldız Efekti ---
    const canvas = document.getElementById('starfield-canvas');
    if(!canvas) return;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    const stars = [];
    const numStars = 200; 

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.1 + 0.05,
            twinkleSpeed: Math.random() * 0.02
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }

            star.alpha += star.twinkleSpeed;
            if (star.alpha > 1 || star.alpha < 0) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240, 230, 140, ${star.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(drawStars);
    }

    drawStars();

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const currentLangText = document.getElementById('current-lang');
    
    // Check local storage for preference, default to EN
    let currentLang = localStorage.getItem('ayasos-lang') || 'EN';
    
    function applyLanguage(lang) {
        if (lang === 'TR') {
            document.body.classList.add('show-tr');
            document.documentElement.lang = 'tr';
            if(currentLangText) currentLangText.textContent = 'TR';
        } else {
            document.body.classList.remove('show-tr');
            document.documentElement.lang = 'en';
            if(currentLangText) currentLangText.textContent = 'EN';
        }
        localStorage.setItem('ayasos-lang', lang);
    }
    
    applyLanguage(currentLang);
    
    if(langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'EN' ? 'TR' : 'EN';
            applyLanguage(currentLang);
        });
    }

});
