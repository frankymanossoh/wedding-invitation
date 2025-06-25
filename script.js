// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
// URL YouTube IFrame API yang BENAR
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player; // YouTube player object

function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready!");
    player = new YT.Player('youtube-player', {
        height: '315',
        width: '560',
        videoId: 'SgSOAPwTOdc', // GANTI DENGAN ID VIDEO YOUTUBE ANDA YANG VALID (misal: 'dQw4w9WgXcQ')
        playerVars: {
            'autoplay': 0, // Jangan autoplay
            'controls': 1, // Tampilkan kontrol
            'showinfo': 0, // Jangan tampilkan info video
            'rel': 0, // Jangan tampilkan video terkait
            'modestbranding': 1 // Tampilkan logo YouTube kecil
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player is ready and loaded.");
    // event.target.playVideo(); // Jangan play otomatis saat ready
}

function onPlayerStateChange(event) {
    const playPauseButton = document.getElementById('playPauseButton');
    if (event.data == YT.PlayerState.PLAYING) {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Fungsi untuk smooth scroll ke bagian tertentu
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Countdown Timer
// TANGGAL AKAN DATANG: Untuk menguji hitung mundur, ubah ke tanggal di masa depan
const countdownDate = new Date("Sep 28, 2025 09:00:00").getTime(); // Misal: 28 September 2025, 09:00 WIB

console.log("Countdown Date set to:", new Date(countdownDate)); // Debug: tanggal target

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    console.log("Current distance:", distance); // Debug: nilai jarak waktu

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");
    const elCountdown = document.getElementById("countdown");

    if (elDays && elHours && elMinutes && elSeconds) { // Periksa semua elemen span
        if (distance > 0) { // Jika acara belum berlalu, tampilkan angka
            console.log("Countdown elements found. Updating numbers."); // Debug: elemen ditemukan
            elDays.innerHTML = String(days).padStart(2, '0');
            elHours.innerHTML = String(hours).padStart(2, '0');
            elMinutes.innerHTML = String(minutes).padStart(2, '0');
            elSeconds.innerHTML = String(seconds).padStart(2, '0');
        } else { // Jika acara sudah berlalu, tampilkan pesan
            console.log("Countdown has passed. Displaying 'Acara Sedang Berlangsung!'"); // Debug: acara sudah berlalu
            clearInterval(x);
            if (elCountdown) { // Pastikan elemen countdown ditemukan
                elCountdown.innerHTML = "<p class='text-2xl'>Acara Sedang Berlangsung!</p>";
                elCountdown.classList.remove('animate-bounce-in'); // Hapus animasi bounce-in
            } else {
                console.error("Countdown div (#countdown) not found for final message."); // Debug: div utama tidak ditemukan
            }
        }
    } else {
        console.warn("Countdown elements not found. Stopping countdown."); // Debug: elemen tidak ditemukan
        clearInterval(x);
        // Fallback jika elemen tidak ditemukan sama sekali, tapi div countdown utama ada
        if (elCountdown && distance < 0) {
            elCountdown.innerHTML = "<p class='text-2xl'>Acara Sedang Berlangsung!</p>";
            elCountdown.classList.remove('animate-bounce-in');
        }
    }
}, 1000);

// Fungsi untuk menampilkan pesan pop-up (mengganti alert)
function showMessage(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.classList.remove('error', 'success', 'show'); // Reset classes
    messageBox.classList.add(type);
    messageBox.classList.add('show'); // Trigger transition

    setTimeout(() => {
        messageBox.classList.remove('show'); // Hide with transition
        setTimeout(() => { // Completely hide after transition
            messageBox.style.display = 'none';
        }, 300); // Should match CSS transition duration
    }, 3000); // Pesan akan hilang setelah 3 detik
}

// Penanganan Submit Form RSVP
document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form reload halaman

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

// Particle Effect for Hero Section (JavaScript) - Modified for subtle floating elements
const particleContainer = document.querySelector('.particle-container');

function createFloatingElement() {
    const element = document.createElement('div');
    element.classList.add('floating-ornament'); // New class for different animation
    // Using a simple unicode character or a small SVG for a subtle design
    const ornaments = ['✦', '✧', '✨', '♥', '❀', '✿']; // Sparkle/star/heart/flower emojis
    element.innerHTML = ornaments[Math.floor(Math.random() * ornaments.length)];
    element.style.fontSize = `${Math.random() * 10 + 8}px`; // Size between 8px and 18px
    element.style.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`; // Subtle white/translucent
    element.style.left = `${Math.random() * 100}%`;
    element.style.animationDuration = `${Math.random() * 10 + 10}s`; // Slower duration
    element.style.animationDelay = `-${Math.random() * 10}s`; // Start at random points
    // Set random X translation for animation for variety
    element.style.setProperty('--random-x', `${Math.random() * 20 - 10}px`); // -10px to +10px horizontal shift
    particleContainer.appendChild(element);

    element.addEventListener('animationend', () => {
        element.remove();
    });
}

// Generate floating elements periodically
setInterval(createFloatingElement, 500); // Create a new element every 500ms

// Gallery Modal Logic with Caption (UPDATED)
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption'); // Dapatkan elemen caption

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modalImage.src = item.src;
        modalCaption.textContent = item.dataset.caption || ''; // Set caption dari data-caption
        galleryModal.classList.remove('hidden');
    });
});

function closeModal() {
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

// Music Popup Logic (BARU)
const musicToggleSide = document.getElementById('musicToggleSide');
const musicPopup = document.getElementById('musicPopup');
const closePopupButtons = document.querySelectorAll('.close-popup');
const playPauseButton = document.getElementById('playPauseButton');

musicToggleSide.addEventListener('click', () => {
    musicPopup.classList.remove('hidden');
    // Play video when popup opens
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
    }
});

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        musicPopup.classList.add('hidden');
        // Pause video when popup closes
        if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
        }
    });
});

playPauseButton.addEventListener('click', () => {
    if (player && typeof player.getPlayerState === 'function') {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
});


// Sticky Navbar with background change (NEW)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    // Menghitung tinggi area sebelum navbar menjadi solid.
    // Bisa berupa tinggi heroSection, atau nilai spesifik
    const scrollThreshold = heroSection.offsetHeight - navbar.offsetHeight - 50; // 50px buffer

    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('bg-white', 'shadow-md', 'text-text-dark'); // Tambah warna dan bayangan, teks gelap
        navbar.classList.remove('bg-transparent', 'text-white'); // Hapus transparan, teks putih
    } else {
        navbar.classList.remove('bg-white', 'shadow-md', 'text-text-dark'); // Hapus warna dan bayangan, teks gelap
        navbar.classList.add('bg-transparent', 'text-white'); // Tambah transparan, teks putih
    }
});

// Set initial state of navbar on load
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    const scrollThreshold = heroSection.offsetHeight - navbar.offsetHeight - 50;

    if (window.scrollY <= scrollThreshold) {
        navbar.classList.add('bg-transparent', 'text-white');
    }
});