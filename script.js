/* ════════════════════════════════════════════
   ✨ Profile Script — Cute Discord Style
   ════════════════════════════════════════════ */

// ── Configuration ────────────────────────────
const CONFIG = {
  // Thay đổi ID video YouTube ở đây (phần mã sau v=)
  youtubeId: 'aJSvAK6OCgk', // Vd: aJSvAK6OCgk
  defaultVolume: 100
};

// ── Custom Cursor (GPU-accelerated via transform) ──
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let cursorRafId = null;

// Use transform instead of left/top to avoid layout reflow
cursor.style.left = '0px';
cursor.style.top  = '0px';
trail.style.left  = '0px';
trail.style.top   = '0px';

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
}, { passive: true });

function animTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animTrail);
}
animTrail();

// Spawn mini sparkle on click
document.addEventListener('click', e => {
  const spark = document.createElement('div');
  spark.className = 'cursor-click-spark';
  spark.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    transform:translate(-50%,-50%);
    font-size:1.2rem; pointer-events:none; z-index:9999;
    animation: sparkFly 0.7s ease-out forwards;
  `;
  spark.textContent = ['✨','💫','🌸','⭐','💕'][Math.floor(Math.random()*5)];
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 700);
});

// Inject sparkFly keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes sparkFly {
    from { opacity:1; transform:translate(-50%,-50%) scale(0.5); }
    to   { opacity:0; transform:translate(-50%,-120%) scale(1.5); }
  }
`;
document.head.appendChild(styleSheet);


// ── Typing Effect ──────────────────────────
const bioEl   = document.getElementById('bioText');
const bioFull = document.querySelector('.bio-full');
const bioText = bioFull ? bioFull.textContent.trim() : '✨ dreamer & music lover 🌸';

let charIndex = 0;
function typeBio() {
  if (charIndex < bioText.length) {
    bioEl.textContent += bioText[charIndex++];
    setTimeout(typeBio, 45 + Math.random() * 40);
  } else {
    bioEl.classList.add('done');
  }
}
setTimeout(typeBio, 800);


// ── Heart / Star Particle System ──────────
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const SYMBOLS = ['♡', '✦', '✧', '⋆', '˚', '·', '🌸'];
const COLORS  = [
  'rgba(249,168,212,', // pink
  'rgba(192,132,252,', // purple
  'rgba(129,140,248,', // blue
  'rgba(167,139,250,', // violet
  'rgba(103,232,249,', // cyan
  'rgba(251,113,133,', // rose
];

class Particle {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x      = Math.random() * canvas.width;
    this.y      = init ? Math.random() * canvas.height : canvas.height + 20;
    this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.size   = 10 + Math.random() * 14;
    this.speed  = 0.4 + Math.random() * 0.8;
    this.drift  = (Math.random() - 0.5) * 0.5;
    this.alpha  = 0;
    this.alphaDir = 0.01 + Math.random() * 0.01;
    this.maxAlpha = 0.4 + Math.random() * 0.4;
    this.spin   = (Math.random() - 0.5) * 0.04;
    this.angle  = Math.random() * Math.PI * 2;
    this.sway   = 0;
    this.swaySpeed = 0.01 + Math.random() * 0.02;
  }

  update() {
    this.y     -= this.speed;
    this.sway  += this.swaySpeed;
    this.x     += Math.sin(this.sway) * 0.6 + this.drift;
    this.angle += this.spin;

    if (this.y < canvas.height * 0.7) {
      this.alpha = Math.max(0, this.alpha - this.alphaDir * 0.5);
    } else {
      this.alpha = Math.min(this.maxAlpha, this.alpha + this.alphaDir);
    }

    if (this.y < -30 || this.alpha <= 0) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.font = `${this.size}px serif`;
    ctx.fillStyle = `${this.color}${this.alpha})`;
    // For emoji we just use fillText; for symbols use fillStyle
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // shadowBlur removed — very expensive on canvas, causes lag
    ctx.fillText(this.symbol, 0, 0);
    ctx.restore();
  }
}

const PARTICLE_COUNT = 25;
const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();


// ── YouTube Video & Music Toggle ──────────
const musicBtn = document.getElementById('musicBtn');
const musicLabel = musicBtn.querySelector('.music-label');
const volumeSlider = document.getElementById('volumeSlider');
let ytPlayer;
let isMuted = true;
let hasInteracted = false;

// This function is called automatically by YouTube IFrame API
window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('ytPlayer', {
    videoId: CONFIG.youtubeId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      loop: 1,
      playlist: CONFIG.youtubeId,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      mute: 1 // Start muted to allow autoplay
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.setVolume(CONFIG.defaultVolume);
  volumeSlider.value = CONFIG.defaultVolume;
  musicLabel.textContent = 'Click để Bật Nhạc';
}

function onPlayerStateChange(event) {
  // If video ends, play again (fallback for loop)
  if (event.data === YT.PlayerState.ENDED) {
    ytPlayer.playVideo();
  }
}

function enableAudio() {
  if (!ytPlayer) return;
  ytPlayer.unMute();
  let vol = parseInt(volumeSlider.value);
  ytPlayer.setVolume(vol);
  isMuted = false;
  musicBtn.classList.add('playing');
  musicLabel.textContent = 'Đang phát ' + vol + '%';
  hasInteracted = true;
}

// Global click to unmute (browsers require interaction to play audio)
document.body.addEventListener('click', (e) => {
  if (!hasInteracted && ytPlayer && isMuted) {
    // Prevent double triggering if they clicked the music button itself
    if(!e.target.closest('#musicBtn') && !e.target.closest('#volumeSlider')) {
      enableAudio();
    }
  }
}, { once: false }); // keep listening until interaction

musicBtn.addEventListener('click', () => {
  if (!ytPlayer) return; 
  
  if (isMuted) {
    enableAudio();
  } else {
    ytPlayer.mute();
    isMuted = true;
    musicBtn.classList.remove('playing');
    musicLabel.textContent = 'Bật Nhạc';
  }
});

volumeSlider.addEventListener('input', (e) => {
  if (!ytPlayer) return;
  let vol = parseInt(e.target.value);
  ytPlayer.setVolume(vol);
  if (!isMuted) {
    musicLabel.textContent = 'Đang phát ' + vol + '%';
  }
  // Auto unmute if volume > 0 and was muted
  if (isMuted && vol > 0 && hasInteracted) {
    ytPlayer.unMute();
    isMuted = false;
    musicBtn.classList.add('playing');
  }
});


// ── Ripple on Link Click ──────────────────
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left - 40) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - 40) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});


// ── Card tilt on mouse move (RAF + lerp = no jitter) ──
const card = document.getElementById('profileCard');
let tiltTargetX = 0, tiltTargetY = 0;
let tiltCurrentX = 0, tiltCurrentY = 0;
let isHoveringDoc = true;

document.addEventListener('mousemove', e => {
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dx   = (e.clientX - cx) / (window.innerWidth  / 2);
  const dy   = (e.clientY - cy) / (window.innerHeight / 2);
  tiltTargetX = dy * -5;
  tiltTargetY = dx *  5;
  isHoveringDoc = true;
}, { passive: true });

document.addEventListener('mouseleave', () => { isHoveringDoc = false; });

function animTilt() {
  if (!card) { requestAnimationFrame(animTilt); return; }
  const lerpAmt = isHoveringDoc ? 0.08 : 0.05;
  const targetX = isHoveringDoc ? tiltTargetX : 0;
  const targetY = isHoveringDoc ? tiltTargetY : 0;
  tiltCurrentX += (targetX - tiltCurrentX) * lerpAmt;
  tiltCurrentY += (targetY - tiltCurrentY) * lerpAmt;
  card.style.transform = `perspective(900px) rotateX(${tiltCurrentX.toFixed(3)}deg) rotateY(${tiltCurrentY.toFixed(3)}deg)`;
  requestAnimationFrame(animTilt);
}
animTilt();


// ── Spawn extra hearts when hovering avatar ──
const avatarRing = document.querySelector('.avatar-ring');
if (avatarRing) {
  avatarRing.addEventListener('mouseenter', () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const rect = avatarRing.getBoundingClientRect();
        const p = new Particle();
        p.x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
        p.y = rect.top;
        p.symbol = ['♡','🌸','✨'][Math.floor(Math.random()*3)];
        p.size   = 14 + Math.random() * 10;
        p.speed  = 1 + Math.random();
        p.maxAlpha = 0.9;
        p.alpha  = 0.9;
        particles.push(p);
        if (particles.length > PARTICLE_COUNT + 20) particles.shift();
      }, i * 80);
    }
  });
}

console.log('%c✨ Profile Page Loaded ✨', 'color: #f9a8d4; font-size:16px; font-weight:bold;');
