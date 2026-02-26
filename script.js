// ============================================
// PORTFOLIO MAIN SCRIPT
// ============================================

// Content data (will be loaded from localStorage or content.json)
let portfolioData = null;

// Storage key for admin panel
const PORTFOLIO_STORAGE_KEY = 'portfolio_admin_data';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
  setupScrollReveal();
  setupSmoothScroll();
});

// ============================================
// LOAD CONTENT FROM LOCALSTORAGE OR JSON
// ============================================

function loadPortfolioData() {
  // First, try to load from localStorage (updated by admin panel)
  const savedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  
  if (savedData) {
    try {
      portfolioData = JSON.parse(savedData);
      console.log('📦 Loaded portfolio data from localStorage (admin edits)');
      populateContent();
      return;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }

  // Fallback: Load from content.json
  fetch('./content.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load content.json: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      portfolioData = data;
      console.log('📄 Loaded portfolio data from content.json');
      populateContent();
    })
    .catch(error => {
      console.error('❌ Error loading portfolio data:', error);
      displayErrorMessage();
    });
}

// ============================================
// POPULATE CONTENT
// ============================================

function populateContent() {
  if (!portfolioData) return;

  // Navbar and Footer
  updateElement('nav-name', portfolioData.name);
  updateElement('footer-name', portfolioData.name);

  // Hero Section
  updateElement('hero-name', portfolioData.name);
  updateElement('hero-desc', portfolioData.hero.description);

  // Floating Tags
  document.getElementById('tag1').textContent = portfolioData.hero.tags[0] || '';
  document.getElementById('tag2').textContent = portfolioData.hero.tags[1] || '';
  document.getElementById('tag3').textContent = portfolioData.hero.tags[2] || '';

  // About Section
  updateElement('about-text', portfolioData.about);

  // Skills Section
  populateSkills();

  // Projects Section
  populateProjects();

  // Blogs Section
  populateBlogs();

  // Contact Section
  populateContact();

  // Trigger scroll reveal on new content
  observeElements();
}

// ============================================
// SECTION POPULATION FUNCTIONS
// ============================================

function populateSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = '';

  if (Array.isArray(portfolioData.skills[0]?.items)) {
    // New format: array of objects with category and items
    portfolioData.skills.forEach(skillGroup => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <div class="skill-category">${escapeHtml(skillGroup.category)}</div>
        <div class="skill-items">
          ${skillGroup.items.map(item => `<span class="skill-item">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
      skillsGrid.appendChild(card);
    });
  } else {
    // Legacy format: simple array of strings
    portfolioData.skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `<div class="skill-item">${escapeHtml(skill)}</div>`;
      skillsGrid.appendChild(card);
    });
  }
}

function populateProjects() {
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';

  portfolioData.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-image">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy">
      </div>
      <div class="project-content">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-description">${escapeHtml(project.description)}</p>
        ${project.tags ? `<div class="project-tags">${project.tags.map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
      </div>
    `;
    projectsContainer.appendChild(card);
  });
}

function populateBlogs() {
  const blogsContainer = document.getElementById('blogs-container');
  blogsContainer.innerHTML = '';

  portfolioData.blogs.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      ${blog.date ? `<div class="blog-date">${escapeHtml(blog.date)}</div>` : ''}
      <h3 class="blog-title">${escapeHtml(blog.title)}</h3>
      <p class="blog-description">${escapeHtml(blog.description)}</p>
    `;
    blogsContainer.appendChild(card);
  });
}

function populateContact() {
  const contact = portfolioData.contact;

  const emailLink = document.getElementById('email');
  emailLink.href = `mailto:${contact.email}`;
  emailLink.textContent = contact.email;
  emailLink.classList.add('contact-link');

  const phoneLink = document.getElementById('phone');
  phoneLink.href = `tel:${contact.phone}`;
  phoneLink.textContent = contact.phone;
  phoneLink.classList.add('contact-link');

  const githubLink = document.getElementById('github');
  githubLink.href = contact.github;
  githubLink.textContent = 'GitHub';
  githubLink.rel = 'noopener';

  const linkedinLink = document.getElementById('linkedin');
  linkedinLink.href = contact.linkedin;
  linkedinLink.textContent = 'LinkedIn';
  linkedinLink.rel = 'noopener';
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

function setupScrollReveal() {
  observeElements();
}

function observeElements() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => observer.observe(element));
}

// ============================================
// SMOOTH SCROLL
// ============================================

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateElement(id, content) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = content;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function displayErrorMessage() {
  const mainContent = document.querySelector('main') || document.body;
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    padding: 20px;
    margin: 20px;
    color: #c33;
    text-align: center;
    font-weight: 500;
  `;
  errorDiv.textContent = '⚠️ Unable to load portfolio data. Please check that content.json is in the correct location.';
  mainContent.insertBefore(errorDiv, mainContent.firstChild);
}
