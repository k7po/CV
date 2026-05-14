/* ════════════════════════════════
   script.js  –  CV Mohammed Ahmed
   ════════════════════════════════ */

// ── THEME (Dark / Light) ───────────────────────────────
let isDark = localStorage.getItem('theme') !== 'light';

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme(isDark);
}

// Apply saved theme immediately
applyTheme(isDark);

// ── BILINGUAL ──────────────────────────────────────────
let lang = 'ar';

const placeholders = {
  ar: {
    name:    'محمد اليحيى',
    subject: 'مشروع جديد / استفسار',
    msg:     'أخبرني عن مشروعك...'
  },
  en: {
    name:    'Mohammed Alyahya',
    subject: 'New Project / Inquiry',
    msg:     'Tell me about your project...'
  }
};

function applyPlaceholders() {
  document.getElementById('inp-name').placeholder    = placeholders[lang].name;
  document.getElementById('inp-subject').placeholder = placeholders[lang].subject;
  document.getElementById('inp-msg').placeholder     = placeholders[lang].msg;
}

function toggleLang() {
  lang = lang === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langBtn').textContent = lang === 'ar' ? 'EN' : 'AR';
  applyPlaceholders();
}

// ── SCROLL REVEAL ──────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BARS ─────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        bar.style.transform = `scaleX(${bar.dataset.width / 100})`;
      }
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

// ── CONTACT FORM SEND ──────────────────────────────────
function handleSend(btn) {
  const arSpan = btn.querySelector('[data-ar]');
  const enSpan = btn.querySelector('[data-en]');

  arSpan.textContent = '✅ تم الإرسال!';
  enSpan.textContent = '✅ Sent!';
  btn.style.background = '#22c55e';

  setTimeout(() => {
    arSpan.textContent = 'إرسال الرسالة ✉️';
    enSpan.textContent = 'Send Message ✉️';
    btn.style.background = '';
  }, 3000);
}

// ── ACTIVE NAV LINK ────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.style.color =
      link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

document.querySelectorAll('.flip-card').forEach(card => {
  revealObserver.observe(card);
});

// ── INIT ───────────────────────────────────────────────
applyPlaceholders();
