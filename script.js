document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let lastScrollY = window.scrollY;

    // Mobile menu toggle
    window.addEventListener('scroll', () => {
        if (nav && window.scrollY > 100) { // Tambahkan pengecekan 'nav'
            nav.classList.add('scrolled');
        } else if (nav) { // Tambahkan pengecekan 'nav'
            nav.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });

    
    // ----- BAGIAN INI UNTUK SMOOTH SCROLL -----
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Pastikan 'nav' sudah ada sebelum mencoba mengakses offsetHeight
                const offset = nav ? nav.offsetHeight : 0; // Jika nav tidak ada, offset 0
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            // Tambahan: Tutup mobile menu setelah klik jika terbuka
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Open invitation button
    const openInvitationBtn = document.querySelector('#cover button');
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', () => {
            const coupleSection = document.querySelector('#couple');
            if (coupleSection) {
                // Pastikan 'nav' sudah ada sebelum mencoba mengakses offsetHeight
                const offset = nav ? nav.offsetHeight : 0; // Jika nav tidak ada, offset 0
                const targetPosition = coupleSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    // Inisialisasi Swiper untuk galeri (per slide menampilkan 1 baris grid)
    var gallerySwiper = new Swiper(".gallerySwiper", {
        slidesPerView: 1, // Penting: Setiap swipe akan menampilkan 1 "grup" atau "halaman" foto
        spaceBetween: 0, // Tidak perlu space antara slide (karena space ada di dalam grid)
        loop: false, // Sesuaikan apakah Anda ingin loop atau tidak
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Anda bisa menambahkan breakpoints di sini jika ingin mengubah slidesPerView
        // atau konfigurasi lain berdasarkan ukuran layar, tapi untuk kasus ini
        // dengan grid di dalam slide, slidesPerView: 1 mungkin sudah cukup.
    });

    // ... (sisa kode JavaScript Anda) ...
    
    // Pastikan kode Lightbox Anda menargetkan gambar di dalam .swiper-slide
    // Contoh:
    const createLightbox = () => {
        const lightboxTemplate = `
            <div id="lightbox" class="fixed inset-0 bg-black/95 z-50 hidden items-center justify-center">
                <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors duration-300">×</button>
                <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300 prev-btn"><</button>
                <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300 next-btn">></button>
                <img class="max-h-[90vh] max-w-[90vw] object-contain" src="" alt="Gallery image">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxTemplate);
    };

    // Panggil ini sekali
    if (!document.getElementById('lightbox')) {
        createLightbox();
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.prev-btn') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.next-btn') : null;
    let currentImageIndex = 0;
    
    // Perbarui ini untuk menargetkan semua gambar di dalam swiper-slide
    const galleryImages = document.querySelectorAll('.gallerySwiper .swiper-slide img');

    function showImage(index) {
        currentImageIndex = index;
        if (galleryImages[index]) {
            const imgSrc = galleryImages[index].src;
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    if (galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => showImage(index));
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentImageIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(currentImageIndex);
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('button')) {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
    // ... (Keyboard navigation untuk lightbox juga perlu dipastikan menargetkan galleryImages yang baru)
});
    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = window.scrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('animate-fadeIn')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .animate-fadeIn').forEach(el => {
        observer.observe(el);
    });

    // Countdown Timer
    function updateCountdown() {
        const weddingDate = new Date('2025-11-06T00:00:00');
        const now = new Date();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.querySelector('[data-countdown="days"]').textContent = String(days).padStart(2, '0');
            document.querySelector('[data-countdown="hours"]').textContent = String(hours).padStart(2, '0');
            document.querySelector('[data-countdown="minutes"]').textContent = String(minutes).padStart(2, '0');
            document.querySelector('[data-countdown="seconds"]').textContent = String(seconds).padStart(2, '0');
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Open invitation button
    const openInvitationBtn = document.querySelector('#cover button');
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', () => {
            const coupleSection = document.querySelector('#couple');
            if (coupleSection) {
                const offset = nav.offsetHeight;
                const targetPosition = coupleSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Gallery lightbox
    const createLightbox = () => {
        const lightboxTemplate = `
            <div id="lightbox" class="fixed inset-0 bg-black/95 z-50 hidden items-center justify-center">
                <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors duration-300">&times;</button>
                <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300 prev-btn"><</button>
                <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300 next-btn">></button>
                <img class="max-h-[90vh] max-w-[90vw] object-contain" src="" alt="Gallery image">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxTemplate);
    };

    createLightbox();

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('#galleries img');

    function showImage(index) {
        currentImageIndex = index;
        const imgSrc = galleryImages[index].src;
        lightboxImg.src = imgSrc;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => showImage(index));
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('button')) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });

    // Image loading animation
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }

        img.addEventListener('error', function() {
            if (!this.src.includes('placeholder.com')) {
                this.src = 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Image+Not+Found';
            }
            this.classList.add('loaded');
        });
    });

    // RSVP form handling
    const rsvpForm = document.querySelector('#rsvp form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const attendance = formData.get('attendance');
            
            // Show confirmation message
            const message = attendance === 'yes' ? 
                'Thank you for confirming your attendance!' : 
                'Thank you for letting us know!';
            
            alert(message);
            rsvpForm.reset();
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    // Parallax effect for cover section
    const coverSection = document.querySelector('#cover');
    window.addEventListener('scroll', () => {
        if (coverSection) {
            const scrolled = window.pageYOffset;
            coverSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
;
