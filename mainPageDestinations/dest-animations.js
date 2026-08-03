/* Destination Page — Scroll & Opening Animations */
(function () {
  "use strict";

  /* ---------- Scroll-reveal via IntersectionObserver ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  function initAnimations() {
    /* Grid sections — alternate slide direction */
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid, i) => {
      grid.classList.add(i % 2 === 0 ? "anim-slide-left" : "anim-slide-right");
      observer.observe(grid);
    });

    /* Full-width panorama images */
    document.querySelectorAll(".full-image").forEach((el) => {
      el.classList.add("anim-scale-in");
      observer.observe(el);
    });

    /* Quick-facts heading */
    document.querySelectorAll(".container > h2").forEach((el) => {
      el.classList.add("anim-fade-up");
      observer.observe(el);
    });

    /* Quick-facts list — stagger children */
    document.querySelectorAll(".container > ul").forEach((el) => {
      el.classList.add("anim-stagger");
      observer.observe(el);
    });

    /* Footer */
    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);
  }

  /* Run when DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
})();


/* Destination Page — Place-Specific Atmosphere */
(function () {
  "use strict";

  if (!document.body) return;

  const slug = getPageSlug();
  if (!slug) return;

  document.body.classList.add("place-" + slug);

  const layer = document.createElement("div");
  layer.id = "place-effect-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const profiles = {
    // Sunrise glow heritage pages
    sigiriya: [{ type: "sun", count: 8 }, { type: "dust", count: 12 }],
    pidurangala: [{ type: "sun", count: 8 }, { type: "dust", count: 12 }],
    polonnaruwa: [{ type: "sun", count: 7 }, { type: "dust", count: 10 }],
    anuradhapura: [{ type: "sun", count: 7 }, { type: "dust", count: 10 }],

    // Misty hill-country pages
    ella: [{ type: "mist", count: 12 }, { type: "rain", count: 12 }],
    "nuwara-eliya": [{ type: "mist", count: 12 }, { type: "rain", count: 10 }],
    "horton-plains": [{ type: "mist", count: 13 }, { type: "rain", count: 12 }],
    "adams-peak": [{ type: "mist", count: 11 }, { type: "glow", count: 8 }],
    kitulgala: [{ type: "mist", count: 12 }, { type: "rain", count: 11 }],

    // Ocean/coastal pages
    mirissa: [{ type: "wave", count: 7 }, { type: "foam", count: 16 }],
    "arugam-bay": [{ type: "wave", count: 7 }, { type: "foam", count: 15 }],
    trincomalee: [{ type: "wave", count: 7 }, { type: "foam", count: 15 }],
    bentota: [{ type: "wave", count: 7 }, { type: "foam", count: 14 }],
    hikkaduwa: [{ type: "wave", count: 8 }, { type: "foam", count: 16 }],
    negombo: [{ type: "wave", count: 6 }, { type: "foam", count: 13 }],
    mannar: [{ type: "wave", count: 6 }, { type: "foam", count: 13 }],
    "galle-fort": [{ type: "wave", count: 6 }, { type: "foam", count: 12 }],

    // Forest / wildlife pages
    yala: [{ type: "leaf", count: 16 }, { type: "glow", count: 10 }],
    udawalawe: [{ type: "leaf", count: 16 }, { type: "glow", count: 9 }],
    sinharaja: [{ type: "leaf", count: 18 }, { type: "glow", count: 11 }],

    // Mixed fallback for remaining pages
    dambulla: [{ type: "sun", count: 6 }, { type: "dust", count: 10 }],
    jaffna: [{ type: "dust", count: 12 }, { type: "glow", count: 8 }],
    "lotus-tower": [{ type: "glow", count: 12 }, { type: "dust", count: 8 }]
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const active = profiles[slug] || [{ type: "dust", count: 10 }, { type: "glow", count: 8 }];

  active.forEach((group) => {
    createParticles(group.type, prefersReducedMotion ? Math.ceil(group.count * 0.5) : group.count);
  });

  function createParticles(type, count) {
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement("span");
      p.className = "place-particle place-" + type;

      p.style.setProperty("--left", (Math.random() * 100).toFixed(2) + "%");
      p.style.setProperty("--size", pickSize(type).toFixed(1) + "px");
      p.style.setProperty("--duration", pickDuration(type).toFixed(2) + "s");
      p.style.setProperty("--delay", (Math.random() * 9).toFixed(2) + "s");
      p.style.setProperty("--drift", (-42 + Math.random() * 84).toFixed(1) + "px");
      p.style.setProperty("--opacity", (0.22 + Math.random() * 0.42).toFixed(2));

      layer.appendChild(p);
    }
  }

  function pickSize(type) {
    if (type === "wave") return 95 + Math.random() * 120;
    if (type === "rain") return 6 + Math.random() * 4;
    return 6 + Math.random() * 15;
  }

  function pickDuration(type) {
    if (type === "wave") return 9 + Math.random() * 4;
    if (type === "rain") return 7 + Math.random() * 4;
    return 8 + Math.random() * 11;
  }

  function getPageSlug() {
    const path = window.location.pathname;
    const file = path.split("/").pop() || "";
    return file.replace(/\.html$/i, "").toLowerCase();
  }
})();
