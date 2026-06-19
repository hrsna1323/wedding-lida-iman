/* ============================================
   UNDANGAN DIGITAL - Arianti & Riduan
   Script.js - Exact match to reference theme
   ============================================ */

const CONFIG = {
    weddingDate: new Date('2026-06-28T10:00:00+08:00'),
    storageKey: 'wedding_arianti_riduan_rsvp',
    accountNumber: '1799993954',
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    parseGuestName();

    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });

    updateCountdown();
    setInterval(updateCountdown, 1000);

    loadMessages();
    createPetals();
    initScrollReveal();
});

// ============================================
// SCROLL REVEAL (matching reference: revealin, revealatas, etc.)
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.revealin, .revealatas, .revealkiri, .revealkanan, .reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// GUEST NAME FROM URL
// ============================================
function parseGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('to') || params.get('nama') || params.get('guest');
    if (guestName) {
        const decodedName = decodeURIComponent(guestName).replace(/\+/g, ' ');
        document.getElementById('guestName').textContent = decodedName;
        const rsvpNameField = document.getElementById('rsvpName');
        if (rsvpNameField) rsvpNameField.value = decodedName;
    }
}

// ============================================
// OPEN INVITATION
// ============================================
function openInvitation() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const musicToggle = document.getElementById('musicToggle');

    cover.classList.add('opened');
    document.body.classList.remove('no-scroll');

    setTimeout(() => {
        mainContent.classList.add('visible');
        cover.style.display = 'none';
        // Re-initialize scroll reveal for newly visible elements
        initScrollReveal();
    }, 500);

    setTimeout(() => {
        musicToggle.classList.add('active');
    }, 1000);

    tryPlayMusic();

    setTimeout(() => AOS.refresh(), 600);
}

// ============================================
// BACKGROUND MUSIC
// ============================================
let isMusicPlaying = false;

function tryPlayMusic() {
    const audio = document.getElementById('bgMusic');
    if (audio && audio.querySelector('source')) {
        audio.play().then(() => {
            isMusicPlaying = true;
            updateMusicIcon();
        }).catch(() => {
            isMusicPlaying = false;
            updateMusicIcon();
        });
    }
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
    } else {
        audio.play().then(() => { isMusicPlaying = true; }).catch(() => {});
    }
    updateMusicIcon();
}

function updateMusicIcon() {
    const iconOn = document.getElementById('iconMusicOn');
    const iconOff = document.getElementById('iconMusicOff');
    const toggle = document.getElementById('musicToggle');
    if (isMusicPlaying) {
        iconOn.style.display = 'block';
        iconOff.style.display = 'none';
        toggle.classList.add('playing');
    } else {
        iconOn.style.display = 'none';
        iconOff.style.display = 'block';
        toggle.classList.remove('playing');
    }
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date().getTime();
    const target = CONFIG.weddingDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
        ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(id => {
            document.getElementById(id).textContent = '00';
        });
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdownValue('cd-days', days);
    setCountdownValue('cd-hours', hours);
    setCountdownValue('cd-minutes', minutes);
    setCountdownValue('cd-seconds', seconds);
}

function setCountdownValue(id, value) {
    const el = document.getElementById(id);
    const formatted = String(value).padStart(2, '0');
    if (el.textContent !== formatted) {
        el.textContent = formatted;
    }
}

// ============================================
// COPY ACCOUNT NUMBER
// ============================================
function copyAccount() {
    const btn = document.getElementById('btnCopy');

    navigator.clipboard.writeText(CONFIG.accountNumber).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        showToast('Nomor rekening berhasil disalin!');

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Salin No. Rekening`;
        }, 3000);
    }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = CONFIG.accountNumber;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Nomor rekening berhasil disalin!');
    });
}

// ============================================
// RSVP / UCAPAN
// ============================================
function submitRSVP(event) {
    event.preventDefault();

    const name = document.getElementById('rsvpName').value.trim();
    const status = document.getElementById('rsvpStatus').value;
    const message = document.getElementById('rsvpMessage').value.trim();

    if (!name || !status || !message) {
        showToast('Mohon lengkapi semua field');
        return;
    }

    const newMsg = {
        id: Date.now(),
        name, status, message,
        timestamp: new Date().toISOString(),
    };

    const messages = getMessages();
    messages.unshift(newMsg);
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(messages));

    document.getElementById('rsvpName').value = '';
    document.getElementById('rsvpStatus').selectedIndex = 0;
    document.getElementById('rsvpMessage').value = '';

    loadMessages();
    showToast('Terima kasih atas ucapan Anda! ❤️');
}

function getMessages() {
    try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || []; }
    catch { return []; }
}

function loadMessages() {
    const messages = getMessages();
    const container = document.getElementById('messagesList');

    const hadir = messages.filter(m => m.status === 'hadir').length;
    const tidak = messages.filter(m => m.status === 'tidak-hadir').length;
    const ragu = messages.filter(m => m.status === 'ragu').length;

    document.getElementById('countHadir').textContent = hadir;
    document.getElementById('countTidak').textContent = tidak;
    document.getElementById('countRagu').textContent = ragu;

    if (messages.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:2rem;opacity:0.5;font-size:13px;color:var(--text-muted);">Belum ada ucapan. Jadilah yang pertama! 💌</p>';
        return;
    }

    container.innerHTML = messages.map(msg => {
        const initials = msg.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        const statusLabel = msg.status === 'hadir' ? 'Hadir' : msg.status === 'tidak-hadir' ? 'Tidak Hadir' : 'Ragu';
        const timeAgo = getTimeAgo(msg.timestamp);

        return `
            <div class="message-item">
                <div class="message-header">
                    <div class="message-avatar">${initials}</div>
                    <div>
                        <div class="message-name">${escapeHtml(msg.name)}</div>
                        <div class="message-time">${timeAgo}</div>
                    </div>
                    <span class="message-status ${msg.status}">${statusLabel}</span>
                </div>
                <p class="message-text">${escapeHtml(msg.message)}</p>
            </div>`;
    }).join('');
}

function getTimeAgo(timestamp) {
    const diff = new Date() - new Date(timestamp);
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Baru saja';
    if (mins < 60) return `${mins} menit lalu`;
    if (hrs < 24) return `${hrs} jam lalu`;
    if (days < 30) return `${days} hari lalu`;
    return new Date(timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// FALLING PETALS
// ============================================
function createPetals() {
    const container = document.getElementById('petalOverlay');
    if (!container) return;

    const colors = [
        'rgba(255, 255, 255, 0.15)',
        'rgba(200, 210, 230, 0.12)',
        'rgba(180, 195, 220, 0.1)',
        'rgba(220, 225, 240, 0.12)',
    ];

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const size = 4 + Math.random() * 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.borderRadius = '50%';
        petal.style.animationDuration = (10 + Math.random() * 15) + 's';
        petal.style.animationDelay = Math.random() * 20 + 's';
        petal.style.opacity = 0.15 + Math.random() * 0.2;
        container.appendChild(petal);
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById(this.getAttribute('href').slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
