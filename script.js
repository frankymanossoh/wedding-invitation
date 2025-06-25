var backgroundMusic = null; // Variabel untuk menyimpan objek audio

document.addEventListener('DOMContentLoaded', () => {
    console.log("script.js loaded successfully!"); // Debug log ini harus muncul
    console.log("DOM Content Loaded. Initializing music player."); // Log ini harus muncul

    backgroundMusic = document.getElementById('background-music');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const albumArt = document.getElementById('albumArt');

    const musicPopup = document.getElementById('musicPopup');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const musicToggleSide = document.getElementById('musicToggleSide');

    // Elemen lirik
    const lyricsButton = document.getElementById('lyricsButton');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsText = document.getElementById('lyricsText');


    // Informasi Lagu
    const currentSong = {
        title: "THANK GOD I FOUND YOU",
        artist: "BUDAKHEL X KAT",
        albumArt: "fotoalbum.jpg" // PASTIKAN NAMA FILE INI PERSIS SESUAI DENGAN YANG ADA DI FOLDER ANDA
    };

    // Update informasi lagu di UI (hanya jika elemen ditemukan)
    if (songTitle) songTitle.textContent = currentSong.title;
    if (artistName) artistName.textContent = currentSong.artist;
    if (albumArt) {
        albumArt.src = currentSong.albumArt;
        albumArt.classList.remove('hidden');
    }

    // Debug log untuk elemen yang dicari (Pastikan semua ini BUKAN NULL)
    console.log("Element Check: musicToggleSide =", musicToggleSide);
    console.log("Element Check: musicPopup =", musicPopup);
    console.log("Element Check: playButton =", playButton);
    console.log("Element Check: pauseButton =", pauseButton);
    console.log("Element Check: backgroundMusic =", backgroundMusic);
    console.log("Element Check: albumArt =", albumArt);
    console.log("Element Check: lyricsButton =", lyricsButton);
    console.log("Element Check: lyricsContainer =", lyricsContainer);
    console.log("Element Check: lyricsText =", lyricsText);


    // Music Popup Logic
    if (musicToggleSide) { // Pastikan tombol sidebar ditemukan
        musicToggleSide.addEventListener('click', () => {
            console.log(">>> Music toggle button clicked! Attempting to show popup."); // Log ini harus muncul saat diklik
            if (musicPopup) { // Pastikan popup element ditemukan
                musicPopup.classList.remove('hidden'); // Menghapus kelas 'hidden'
                console.log("Popup hidden class removed."); // Log ini harus muncul jika berhasil
            } else {
                console.error("Error: musicPopup element is null when click event fires!");
            }

            // Atur tampilan tombol Play/Pause saat popup terbuka
            if (backgroundMusic) {
                if (backgroundMusic.paused) {
                    if (playButton) playButton.classList.remove('hidden');
                    if (pauseButton) pauseButton.classList.add('hidden');
                } else {
                    if (playButton) playButton.classList.add('hidden');
                    if (pauseButton) pauseButton.classList.remove('hidden');
                }
            }
        });
    } else {
        console.error("Critical Error: musicToggleSide element not found! Cannot attach click listener.");
    }


    closePopupButtons.forEach(button => {
        if (button) { // Pastikan setiap tombol ditemukan
            button.addEventListener('click', () => {
                console.log("Close popup button clicked!"); // Debug log
                if (musicPopup) {
                    musicPopup.classList.add('hidden'); // Menambahkan kelas 'hidden' kembali
                    musicPopup.classList.remove('lyrics-active'); // Pastikan kelas lirik juga dihapus saat ditutup
                }
                if (backgroundMusic && !backgroundMusic.paused) {
                    backgroundMusic.pause();
                }
                if (playButton) playButton.classList.remove('hidden');
                if (pauseButton) pauseButton.classList.add('hidden');
            });
        }
    });

    if (playButton) { // Pastikan tombol ditemukan
        playButton.addEventListener('click', () => {
            console.log("Play button clicked!"); // Debug log
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.error("Error playing audio:", e));
                playButton.classList.add('hidden');
                pauseButton.classList.remove('hidden');
            }
        });
    } else {
        console.error("Error: playButton element not found (after DOMContentLoaded)!");
    }

    if (pauseButton) { // Pastikan tombol ditemukan
        pauseButton.addEventListener('click', () => {
            console.log("Pause button clicked!"); // Debug log
            if (backgroundMusic) {
                backgroundMusic.pause();
                playButton.classList.remove('hidden');
                pauseButton.classList.add('hidden');
            }
        });
    } else {
        console.error("Error: pauseButton element not found (after DOMContentLoaded)!");
    }

    // LOGIKA UNTUK TOMBOL LIRIK
    if (lyricsButton && lyricsContainer && lyricsText && musicPopup) { // Tambahkan musicPopup di pengecekan
        lyricsButton.addEventListener('click', () => {
            console.log("Lyrics button clicked!"); // Debug log
            musicPopup.classList.toggle('lyrics-active'); // Mengganti kelas pada OVERLAY untuk mengubah lebar popup
            lyricsContainer.classList.toggle('hidden'); // Mengganti kelas 'hidden' pada kontainer lirik
            
            if (!lyricsContainer.classList.contains('hidden')) {
                // Contoh lirik (GANTI DENGAN LIRIK SEBENARNYA DARI LAGU ANDA)
                const lyrics = `(Verse 1)
I was lost in the dark,
Searching for a guiding light.
Then you appeared like a spark,
And made everything so bright.

(Chorus)
Oh, thank God I found you, my love,
A treasure sent from up above.
Every moment spent with you,
Is a dream come truly true.

(Verse 2)
Through every storm and every rain,
Your love was always there for me.
Washing away all the pain,
Setting my burdened spirit free.

(Chorus)
Oh, thank God I found you, my love,
A treasure sent from up above.
Every moment spent with you,
Is a dream come truly true.

(Bridge)
I never knew a love so deep,
A promise I would always keep.
With every breath, with every beat,
My heart is yours, forever sweet.

(Chorus)
Oh, thank God I found you, my love,
A treasure sent from up above.
Every moment spent with you,
Is a dream come truly true.

(Outro)
Thank God I found you...
My love, my life, my everything.
Thank God I found you...
Forever by your side, my darling.`;
                lyricsText.textContent = lyrics;
            }
        });
    } else {
        console.error("Error: lyricsButton, lyricsContainer, lyricsText or musicPopup element not found for lyrics logic!");
    }


    // Event Listener untuk update bilah progres dan waktu
    if (backgroundMusic && progressBar && currentTimeSpan && totalTimeSpan) {
        backgroundMusic.addEventListener('timeupdate', () => {
            if (backgroundMusic.duration) {
                progressBar.value = backgroundMusic.currentTime;
                currentTimeSpan.textContent = formatTime(backgroundMusic.currentTime);
            }
        });

        backgroundMusic.addEventListener('loadedmetadata', () => {
            totalTimeSpan.textContent = formatTime(backgroundMusic.duration);
            progressBar.max = backgroundMusic.duration;
        });

        progressBar.addEventListener('input', () => {
            if (backgroundMusic.duration) {
                backgroundMusic.currentTime = progressBar.value;
            }
        });
    } else {
        console.error("Error: Audio or progress bar elements not fully found for listeners!");
    }

    // Fungsi pembantu untuk memformat waktu (detik ke MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    // Inisialisasi tampilan tombol saat halaman dimuat
    if (backgroundMusic && playButton && pauseButton) {
        if (backgroundMusic.paused) {
            playButton.classList.remove('hidden');
            pauseButton.classList.add('hidden');
        } else {
            playButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        }
    }


    // Fungsi untuk smooth scroll ke bagian tertentu
    window.scrollToSection = function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Countdown Timer
    const countdownDate = new Date("Sep 28, 2025 09:00:00").getTime();
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

    // Fungsi untuk menampilkan pesan pop-up
    window.showMessage = function(message, type = 'success') {
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

    // Penanganan Submit Form RSVP
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

    // Particle Effect for Hero Section
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
        element.style.setProperty('--random-x', `${Math.random() * 20 - 10}px`);
        particleContainer.appendChild(element);

        element.addEventListener('animationend', () => {
            element.remove();
        });
    }

    setInterval(createFloatingElement, 500);

    // Gallery Modal Logic with Caption
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

    window.closeModal = function() {
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

    // Sticky Navbar with background change
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
    const navbar = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    const scrollThreshold = heroSection.offsetHeight - navbar.offsetHeight - 50;

    if (window.scrollY <= scrollThreshold) {
        navbar.classList.add('bg-transparent', 'text-white');
    }

}); // Penutup document.addEventListener('DOMContentLoaded'