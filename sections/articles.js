// ARTICLES PAGE FUNCTIONALITY

(function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const contentCards = document.querySelectorAll('.content-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter cards
      contentCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (filter === 'all' || cardType === filter) {
          card.style.display = 'block';
          card.style.animation = 'slideUp 0.6s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      contentCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const category = card.querySelector('.card-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm) || searchTerm === '') {
          card.style.display = 'block';
          card.style.animation = 'slideUp 0.6s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Tags filtering
  const tags = document.querySelectorAll('.tag');
  
  tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      const tagText = tag.textContent.toLowerCase();
      
      contentCards.forEach(card => {
        const cardContent = card.textContent.toLowerCase();
        if (cardContent.includes(tagText)) {
          card.style.display = 'block';
          card.style.animation = 'slideUp 0.6s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
})();
