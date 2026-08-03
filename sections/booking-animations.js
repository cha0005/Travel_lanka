// booking-animations.js
// Enhanced smooth animations with staggered effects

document.addEventListener('DOMContentLoaded', function () {
  // Page opening fade-in animation (slower, smoother)
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  // Hero section with scale animation
  const heroSection = document.querySelector('.hero-booking');
  if (heroSection) {
    heroSection.style.opacity = 0;
    heroSection.style.transform = 'scale(0.95) translateY(20px)';
    heroSection.style.transition = 'opacity 1s cubic-bezier(0.25,0.46,0.45,0.94), transform 1s cubic-bezier(0.25,0.46,0.45,0.94)';
    setTimeout(() => {
      heroSection.style.opacity = 1;
      heroSection.style.transform = 'scale(1) translateY(0)';
    }, 100);
  }

  // Staggered animations for place cards
  const placeCards = document.querySelectorAll('.place-card');
  placeCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
  });

  // Filter buttons animation
  const filterButtons = document.querySelector('.place-filters');
  if (filterButtons) {
    filterButtons.style.opacity = 0;
    filterButtons.style.transform = 'translateY(15px)';
    filterButtons.style.transition = 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
    setTimeout(() => {
      filterButtons.style.opacity = 1;
      filterButtons.style.transform = 'translateY(0)';
    }, 300);
  }

  // Search card animation
  const searchCard = document.querySelector('.booking-search-card');
  if (searchCard) {
    searchCard.style.opacity = 0;
    // Only apply a small vertical entrance. Horizontal centering is handled
    // by the wrapper CSS, so do not set translateX here.
    searchCard.style.transform = 'translateY(12px)';
    searchCard.style.transition = 'opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)';
    setTimeout(() => {
      searchCard.style.opacity = 1;
      searchCard.style.transform = 'translateY(0)';
    }, 500);
  }

  // Smooth scroll animations for cards
  function animateOnScroll() {
    placeCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 80;
      
      if (isVisible && card.style.opacity !== '1') {
        setTimeout(() => {
          card.style.opacity = 1;
          card.style.transform = 'translateY(0)';
        }, index * 80); // Stagger each card by 80ms
      }
    });
  }

  // Initial animation on page load
  setTimeout(() => {
    animateOnScroll();
  }, 700);

  // Scroll event with debounce for performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateOnScroll, 100);
  }, { passive: true });
});
