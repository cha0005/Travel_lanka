/* ================================
   SMOOTH PAGE TRANSITIONS
================================ */

// Add transition overlay to body
const transitionOverlay = document.createElement('div');
transitionOverlay.className = 'page-transition';
document.body.appendChild(transitionOverlay);

// Smooth navigation function
function smoothNavigate(url) {
  transitionOverlay.classList.add('active');
  
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

// Intercept all navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Handle all anchor links for smooth transitions
  document.querySelectorAll('a[href]:not([href^="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && !link.target) {
        e.preventDefault();
        smoothNavigate(href);
      }
    });
  });

  // Scroll the Contact nav link to the footer section on the current page.
  document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.textContent.trim().toLowerCase() !== 'contact') return;

    link.addEventListener('click', (e) => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      e.preventDefault();
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sectionFrames = document.querySelectorAll('.section-image-frame');

  // Intersection Observer for section images
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe each section image
  sectionFrames.forEach(frame => {
    frame.style.opacity = '0';
    frame.style.transform = 'translateY(50px)';
    frame.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(frame);
  });

  /* ================================
     BUTTON NAVIGATION
  ================================ */
  const enterButton = document.getElementById('enterSite');
  if (enterButton) {
    enterButton.addEventListener('click', (e) => {
      e.preventDefault();
      smoothNavigate('sections/destinations.html');
    });
  }
});


/* ================================
   PARALLAX CLOUD CURTAIN EFFECT
================================ */
(function() {
  const intro = document.getElementById('parallaxIntro');
  if (!intro) return;

  const activeMonth = new Date().getMonth();
  const coastalCloudBoost = (activeMonth === 5 || activeMonth === 6) ? 1.45 : 1;

  // Layers
  const sky        = document.getElementById('sky-layer');
  const mtnBack    = document.getElementById('mountain-back-layer');
  const mtnFront   = document.getElementById('mountain-front-layer');
  const cloud1     = document.getElementById('cloud1');
  const cloud2     = document.getElementById('cloud2');
  const cloud3     = document.getElementById('cloud3');
  const cloud4     = document.getElementById('cloud4');
  const cloud5     = document.getElementById('cloud5');
  const hill1      = document.getElementById('hill1-layer');
  const hill2      = document.getElementById('hill2-layer');
  const cliffL     = document.getElementById('cliff-left-layer');
  const cliffR     = document.getElementById('cliff-right-layer');
  const people     = document.getElementById('people-layer');
  const textLayer  = document.getElementById('text-layer');
  const scrollHint = document.getElementById('parallax-scroll-hint');
  const navbar     = document.querySelector('.navbar');

  // Hide navbar initially
  if (navbar) navbar.classList.add('parallax-hidden');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    // Progress 0..1 over the first viewport height
    const progress = Math.min(scrollY / vh, 1);

    // Sky: slight zoom
    if (sky) {
      sky.style.transform = 'scale(' + (1 + progress * 0.1) + ')';
    }

    // Far mountains: slow rise
    if (mtnBack) {
      mtnBack.style.transform = 'translateY(' + (progress * -30) + 'px) scale(' + (1 + progress * 0.05) + ')';
    }

    // Near mountains: faster rise
    if (mtnFront) {
      mtnFront.style.transform = 'translateY(' + (progress * -60) + 'px) scale(' + (1 + progress * 0.08) + ')';
    }

    // Hills: medium parallax
    if (hill1) {
      hill1.style.transform = 'translateY(' + (progress * -40) + 'px)';
    }
    if (hill2) {
      hill2.style.transform = 'translateY(' + (progress * -20) + 'px)';
    }

    // Cliffs: slide outward like side curtains
    if (cliffL) {
      cliffL.style.transform = 'translateX(' + (progress * -200) + 'px) translateY(' + (progress * -30) + 'px)';
    }
    if (cliffR) {
      cliffR.style.transform = 'translateX(' + (progress * 200) + 'px) translateY(' + (progress * -30) + 'px)';
    }

    // People: slight upward shift
    if (people) {
      people.style.transform = 'translateY(' + (progress * -80) + 'px)';
      people.style.opacity = String(Math.max(0, 1 - progress * 1.5));
    }

    // CLOUDS — the main curtain effect!
    // Cloud1 + Cloud3: slide LEFT
    if (cloud1) {
      cloud1.style.transform = 'translateX(' + (progress * -120 * coastalCloudBoost) + '%) translateY(' + (progress * -40 * coastalCloudBoost) + 'px)';
      cloud1.style.opacity = String(Math.max(0, 1 - progress * 1.2));
    }
    if (cloud3) {
      cloud3.style.transform = 'translateX(' + (progress * -80 * coastalCloudBoost) + '%) translateY(' + (progress * -20 * coastalCloudBoost) + 'px)';
      cloud3.style.opacity = String(Math.max(0, 1 - progress * 1.4));
    }

    // Cloud2 + Cloud4: slide RIGHT
    if (cloud2) {
      cloud2.style.transform = 'scaleX(-1) translateX(' + (progress * -120 * coastalCloudBoost) + '%) translateY(' + (progress * -40 * coastalCloudBoost) + 'px)';
      cloud2.style.opacity = String(Math.max(0, 1 - progress * 1.2));
    }
    if (cloud4) {
      cloud4.style.transform = 'scaleX(-1) translateX(' + (progress * -80 * coastalCloudBoost) + '%) translateY(' + (progress * -20 * coastalCloudBoost) + 'px)';
      cloud4.style.opacity = String(Math.max(0, 1 - progress * 1.4));
    }

    // Cloud5: rise upward and fade (center cloud)
    if (cloud5) {
      cloud5.style.transform = 'translateY(' + (progress * -150) + '%) scale(' + (1 + progress * 0.3) + ')';
      cloud5.style.opacity = String(Math.max(0, 0.9 - progress * 1.5));
    }

    // Text: subtle rise and fade
    if (textLayer) {
      textLayer.style.transform = 'translateY(' + (progress * -100) + 'px)';
      textLayer.style.opacity = String(Math.max(0, 1 - progress * 2));
    }

    // Scroll hint: fade out quickly
    if (scrollHint) {
      scrollHint.style.opacity = String(Math.max(0, 1 - progress * 4));
    }

    // Show navbar after scrolling past the intro
    if (navbar) {
      if (progress > 0.7) {
        navbar.classList.remove('parallax-hidden');
        navbar.classList.add('parallax-visible');
      } else {
        navbar.classList.remove('parallax-visible');
        navbar.classList.add('parallax-hidden');
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Initial call
  updateParallax();
})();


/* ================================
   MONTH-BASED BACKGROUND EFFECTS
================================ */
(function() {
  if (!document.body) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const monthIndex = resolveMonthIndex();
  const monthNames = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];

  const monthKey = monthNames[monthIndex];
  document.body.classList.add('month-' + monthKey);

  const effectLayer = document.createElement('div');
  effectLayer.id = 'month-effect-layer';
  effectLayer.className = 'month-layer-' + monthKey;
  effectLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(effectLayer);

  if (prefersReducedMotion) {
    initStaticMood();
    return;
  }

  const monthConfig = {
    // January: calm + fresh start
    jan: { particles: [{ type: 'fog', count: 9 }, { type: 'dust', count: 10 }], burst: true },
    // February: romantic vibe
    feb: { particles: [{ type: 'heart', count: 16 }] },
    // March: growth + nature
    mar: { particles: [{ type: 'petal', count: 18 }] },
    // April-May: summer build-up
    apr: { particles: [{ type: 'sunflare', count: 6 }, { type: 'dust', count: 16 }] },
    may: { particles: [{ type: 'sunflare', count: 7 }, { type: 'dust', count: 18 }] },
    // June-July: coastal vibe
    jun: { particles: [{ type: 'wave', count: 5 }, { type: 'foam', count: 12 }] },
    jul: { particles: [{ type: 'wave', count: 6 }, { type: 'foam', count: 14 }] },
    // August-September: warm tones
    aug: { particles: [{ type: 'leaf', count: 18 }] },
    sep: { particles: [{ type: 'leaf', count: 16 }] },
    // October: dark/spooky
    oct: { particles: [{ type: 'fog', count: 12 }, { type: 'flicker', count: 10 }] },
    // November-December: festive/winter
    nov: { particles: [{ type: 'snow', count: 28 }, { type: 'twinkle', count: 12 }] },
    dec: { particles: [{ type: 'snow', count: 42 }, { type: 'twinkle', count: 16 }], snowCaps: true }
  };

  const active = monthConfig[monthKey] || monthConfig.jan;
  if (active.snowCaps) addSnowCaps();

  (active.particles || []).forEach(group => {
    createParticles(group.type, group.count);
  });
  if (active.burst) initJanuaryFireworks();

  function initJanuaryFireworks() {
    const burst = () => {
      const firework = document.createElement('span');
      firework.className = 'month-firework';

      firework.style.setProperty('--x', (10 + Math.random() * 80) + '%');
      firework.style.setProperty('--y', (8 + Math.random() * 42) + '%');
      firework.style.setProperty('--size', (88 + Math.random() * 70) + 'px');
      firework.style.setProperty('--hue', String(Math.floor(Math.random() * 360)));
      firework.style.setProperty('--duration', (1 + Math.random() * 0.8).toFixed(2) + 's');

      effectLayer.appendChild(firework);
      window.setTimeout(() => firework.remove(), 2200);
    };

    burst();
    window.setTimeout(burst, 650);
    window.setTimeout(burst, 1200);
    window.setInterval(burst, 1800);
  }

  function createParticles(type, count) {
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'month-particle month-' + type;

      particle.style.setProperty('--left', (Math.random() * 100) + '%');
      particle.style.setProperty('--top', prefersReducedMotion ? (8 + Math.random() * 84) + '%' : '-12%');
      const baseSize = (type === 'wave') ? (90 + Math.random() * 120) : (type === 'snow' ? (4 + Math.random() * 7) : (6 + Math.random() * 14));
      particle.style.setProperty('--size', baseSize + 'px');
      particle.style.setProperty('--duration', (type === 'wave' ? (9 + Math.random() * 4) : (8 + Math.random() * 12)) + 's');
      particle.style.setProperty('--delay', (Math.random() * 10) + 's');
      particle.style.setProperty('--drift', (-45 + Math.random() * 90) + 'px');
      particle.style.setProperty('--opacity', (0.28 + Math.random() * 0.42).toFixed(2));

      effectLayer.appendChild(particle);
    }
  }

  function initStaticMood() {
    createParticles('fog', 10);
    createParticles('dust', 10);
  }

  function resolveMonthIndex() {
    const urlMonth = new URLSearchParams(window.location.search).get('month');
    if (!urlMonth) return new Date().getMonth();

    const byNumber = Number(urlMonth);
    if (Number.isInteger(byNumber) && byNumber >= 1 && byNumber <= 12) {
      return byNumber - 1;
    }

    const normalized = String(urlMonth).trim().toLowerCase().slice(0, 3);
    const idx = monthNames.indexOf(normalized);
    return idx >= 0 ? idx : new Date().getMonth();
  }

  function addSnowCaps() {
    document.querySelectorAll('.glass-container').forEach(card => {
      card.classList.add('snow-capped');
    });
  }
})();

