// Hapus baris ini yang memuat YouTube API
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api"; // URL YouTube IFrame API yang BENAR
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var backgroundMusic = null; // Variabel untuk menyimpan objek audio

// Fungsi ini akan dijalankan saat DOM sudah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic = document.getElementById('background-music');
    const playPauseButton = document.getElementById('playPauseButton');
    const musicPopup = document.getElementById('musicPopup');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const musicToggleSide = document.getElementById('musicToggleSide');

    // Music Popup Logic (Diperbarui untuk Audio)
    musicToggleSide.addEventListener('click', () => {
        musicPopup.classList.remove('hidden');
        // Play audio when popup opens, jika belum diputar
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.error("Error playing audio:", e));
        }
        updatePlayPauseButtonIcon(); // Perbarui ikon saat popup dibuka
    });

    closePopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            musicPopup.classList.add('hidden');
            // Pause audio when popup closes
            if (backgroundMusic && !backgroundMusic.paused) {
                backgroundMusic.pause();
            }
            updatePlayPauseButtonIcon(); // Perbarui ikon saat popup ditutup
        });
    });

    playPauseButton.addEventListener('click', () => {
        if (backgroundMusic) {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(e => console.error("Error playing audio:", e));
            } else {
                backgroundMusic.pause();
            }
            updatePlayPauseButtonIcon(); // Perbarui ikon setelah aksi
        }
    });

    // Fungsi pembantu untuk memperbarui ikon tombol play/pause
    function updatePlayPauseButtonIcon() {
        if (backgroundMusic && playPauseButton) {
            if (backgroundMusic.paused) {
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
    }

    // Panggil update ikon saat DOM ready untuk memastikan ikon awal benar
    updatePlayPauseButtonIcon();

    // Sisa kode yang tidak terkait musik
    // Fungsi untuk smooth scroll ke bagian tertentu
    window.scrollToSection = function(id) { // Jadikan global agar bisa diakses dari onclick di HTML
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Countdown Timer (tetap sama)
    const countdownDate = new Date("Sep 28, 2025 09:00:00").getTime(); // Misal: 28 September 2025, 09:00 WIB
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");
        const elCountdown = document.getElementById("countdown");

        if (elDays && elHours && elMinutes && elSeconds) {
            if (distance > 0) {
                elDays.innerHTML = String(days).padStart(2, '0');
                elHours.innerHTML = String(hours).padStart(2, '0');
                elMinutes.innerHTML = String(minutes).padStart(2, '0');
                elSeconds.innerHTML = String(seconds).padStart(2, '0');
            } else {
                clearInterval(x);
                if (elCountdown) {
                    elCountdown.innerHTML = "<p class='text-2xl'>Acara Sedang Berlangsung!</p>";
                    elCountdown.classList.remove('animate-bounce-in');
                }
            }
        } else {
            clearInterval(x);
            if (elCountdown && distance < 0) {
                elCountdown.innerHTML = "<p class='text-2xl'>Acara Sedang Berlangsung!</p>";
                elCountdown.classList.remove('animate-bounce-in');
            }
        }
    }, 1000);

    // Fungsi untuk menampilkan pesan pop-up (mengganti alert)
    window.showMessage = function(message, type = 'success') { // Jadikan global
        const messageBox = document.getElementById('messageBox');
        messageBox.textContent = message;
        messageBox.classList.remove('error', 'success', 'show');
        messageBox.classList.add(type);
        messageBox.classList.add('show');

        setTimeout(() => {
            messageBox.classList.remove('show');
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Penanganan Submit Form RSVP (tetap sama)
    document.getElementById('rsvpForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const attendance = document.querySelector('input[name="attendance"]:checked');

        if (!name || !guests || !attendance) {
            showMessage('Harap lengkapi semua bidang form RSVP.', 'error');
            return;
        }

        const attendanceStatus = attendance.value === 'attend' ? 'Akan Hadir' : 'Tidak Dapat Hadir';

        console.log(`RSVP Diterima: Nama - ${name}, Tamu - ${guests}, Kehadiran - ${attendanceStatus}`);
        showMessage('Konfirmasi kehadiran Anda telah diterima! Terima kasih.', 'success');

        this.reset();
    });

    // Particle Effect for Hero Section (tetap sama)
    const particleContainer = document.querySelector('.particle-container');

    function createFloatingElement() {
        const element = document.createElement('div');
        element.classList.add('floating-ornament');
        const ornaments = ['✦', '✧', '✨', '♥', '❀', '✿'];
        element.innerHTML = ornaments[Math.floor(Math.random() * ornaments.length)];
        element.style.fontSize = `${Math.random() * 10 + 8}px`;
        element.style.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 10 + 10}s`;
        element.style.animationDelay = `-${Math.random() * 10}s`;
        element.style.setProperty('--random-x', `${Math.random() * 20 - 10}px`);
        particleContainer.appendChild(element);

        element.addEventListener('animationend', () => {
            element.remove();
        });
    }

    setInterval(createFloatingElement, 500);

    // Gallery Modal Logic with Caption (tetap sama)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImage.src = item.src;
            modalCaption.textContent = item.dataset.caption || '';
            galleryModal.classList.remove('hidden');
        });
    });

    window.closeModal = function() { // Jadikan global
        galleryModal.classList.add('hidden');
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !galleryModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });

    // Sticky Navbar with background change (tetap sama)
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        const heroSection = document.getElementById('home');
        const scrollThreshold = heroSection.offsetHeight - navbar.offsetHeight - 50;

        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('bg-white', 'shadow-md', 'text-text-dark');
            navbar.classList.remove('bg-transparent', 'text-white');
        } else {
            navbar.classList.remove('bg-white', 'shadow-md', 'text-text-dark');
            navbar.classList.add('bg-transparent', 'text-white');
        }
    });

    // Set initial state of navbar on load
    // Karena sudah di dalam DOMContentLoaded, ini akan otomatis terpanggil
    const navbar = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    const scrollThreshold = heroSection.offsetHeight - navbar.offsetHeight - 50;

    if (window.scrollY <= scrollThreshold) {
        navbar.classList.add('bg-transparent', 'text-white');
    }

}); // Penutup document.addEventListener('DOMContentLoaded'
