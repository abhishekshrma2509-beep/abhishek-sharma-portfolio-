// ============================================
// PORTFOLIO ADMIN PANEL - AUTHENTICATION & MANAGEMENT
// ============================================

// SECURITY NOTICE:
// This admin panel is designed for PERSONAL USE ONLY on a static site
// - Credentials hardcoded in client-side JS (NOT SECURE)
// - All data stored in browser localStorage
// - No backend authentication or encryption
// - Use only for personal portfolio on static hosts like Render
// NOT suitable for production applications with sensitive data

// ============================================
// ADMIN CREDENTIALS (Frontend Only - Not Secure)
// ============================================

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Default portfolio data structure
const DEFAULT_DATA = {
  name: 'Abhishek Sharma',
  title: 'Full-Stack Developer',
  about: 'I am a B.Sc Information Technology student with strong fundamentals in programming, web development and mobile application development. I enjoy building clean, scalable and real-world software solutions that solve actual problems. With experience in multiple tech stacks, I\'m passionate about turning ideas into reality.',
  hero: {
    description: 'Full-stack developer passionate about building modern web and mobile applications',
    tags: ['Web Dev', 'Flutter', 'Firebase']
  },
  skills: [
    { category: 'Languages', items: ['C', 'C++', 'Java', 'JavaScript', 'Dart'] },
    { category: 'Frontend', items: ['HTML', 'CSS', 'React', 'Flutter UI'] },
    { category: 'Backend', items: ['Node.js', 'Firebase', 'REST API'] },
    { category: 'Databases', items: ['MySQL', 'MongoDB', 'Firestore'] },
    { category: 'Mobile', items: ['Flutter', 'Android', 'Firebase'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma'] }
  ],
  projects: [
    {
      title: 'Smart Attendance System',
      description: 'Flutter + Firebase application using BLE & QR for secure attendance. Prevents proxy attendance and supports Excel export. Deployed to 500+ students.',
      image: 'assets/projects/attendance.png',
      tags: ['Flutter', 'Firebase', 'BLE', 'QR Code']
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with React frontend and Node.js backend. Features include product catalog, shopping cart, payment integration and admin dashboard.',
      image: 'assets/projects/ecommerce.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
    }
  ],
  blogs: [
    {
      title: 'Why Every IT Student Needs a Portfolio',
      description: 'Importance of showcasing real-world projects to recruiters and how to build a strong portfolio that stands out.',
      date: 'Feb 2026'
    },
    {
      title: 'Using BLE in Attendance Systems',
      description: 'How Bluetooth Low Energy improves automation, reduces fraud, and provides seamless user experience in modern attendance systems.',
      date: 'Jan 2026'
    }
  ],
  contact: {
    email: 'abhishek.shrma2509@gmail.com',
    phone: '+91 8355855988',
    github: 'https://github.com/abhishekshrma2509-beep',
    linkedin: 'https://linkedin.com/in/abhishek-sharma-0626183b3'
  }
};

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
  AUTH: 'portfolio_admin_auth',
  DATA: 'portfolio_admin_data'
};

// ============================================
// STATE
// ============================================

let currentData = {};
let isAuthenticated = false;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();
  initializeEventListeners();
});

// ============================================
// AUTHENTICATION
// ============================================

function checkAuthentication() {
  const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
  
  if (auth === 'true') {
    isAuthenticated = true;
    showDashboard();
  } else {
    showLoginPage();
  }
}

function showLoginPage() {
  document.getElementById('login-page').classList.add('active');
  document.getElementById('dashboard-page').classList.remove('active');
  isAuthenticated = false;
}

function showDashboard() {
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('dashboard-page').classList.add('active');
  isAuthenticated = true;
  loadDataIntoForms();
}

// ============================================
// LOGIN/LOGOUT HANDLERS
// ============================================

function initializeEventListeners() {
  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', handleNavigation);
  });

  // Save/Cancel/Reset
  document.getElementById('save-btn')?.addEventListener('click', handleSave);
  document.getElementById('cancel-btn')?.addEventListener('click', handleCancel);
  document.getElementById('reset-btn')?.addEventListener('click', handleReset);
  document.getElementById('preview-btn')?.addEventListener('click', handlePreview);

  // Add item buttons
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', handleAddItem);
  });

  // Character count for about
  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    aboutText.addEventListener('input', updateCharCount);
  }
}

function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('login-error');

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    errorDiv.classList.remove('show');
    isAuthenticated = true;
    showDashboard();
  } else {
    errorDiv.textContent = 'Invalid username or password';
    errorDiv.classList.add('show');
  }
}

function handleLogout() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  isAuthenticated = false;
  document.getElementById('login-form').reset();
  showLoginPage();
}

// ============================================
// NAVIGATION
// ============================================

function handleNavigation(e) {
  const section = e.target.getAttribute('data-section');
  
  // Update active nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');

  // Update active section
  document.querySelectorAll('.section-editor').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(`section-${section}`).classList.add('active');
}

// ============================================
// LOAD DATA INTO FORMS
// ============================================

function loadDataIntoForms() {
  // Load from localStorage or use default
  const saved = localStorage.getItem(STORAGE_KEYS.DATA);
  currentData = saved ? JSON.parse(saved) : { ...DEFAULT_DATA };

  // HERO
  document.getElementById('hero-name').value = currentData.name || '';
  document.getElementById('hero-desc').value = currentData.hero.description || '';
  document.getElementById('tag-1').value = currentData.hero.tags[0] || '';
  document.getElementById('tag-2').value = currentData.hero.tags[1] || '';
  document.getElementById('tag-3').value = currentData.hero.tags[2] || '';

  // ABOUT
  const aboutText = document.getElementById('about-text');
  aboutText.value = currentData.about || '';
  updateCharCount();

  // SKILLS
  populateSkillsForm();

  // PROJECTS
  populateProjectsForm();

  // BLOGS
  populateBlogsForm();

  // CONTACT
  document.getElementById('contact-email').value = currentData.contact.email || '';
  document.getElementById('contact-phone').value = currentData.contact.phone || '';
  document.getElementById('contact-github').value = currentData.contact.github || '';
  document.getElementById('contact-linkedin').value = currentData.contact.linkedin || '';
}

// ============================================
// SKILLS FORM
// ============================================

function populateSkillsForm() {
  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = '';

  (currentData.skills || []).forEach((skillGroup, index) => {
    const card = document.createElement('div');
    card.className = 'item-card skill-card';
    card.innerHTML = `
      <div class="item-header">
        <input 
          type="text" 
          value="${escapeHtml(skillGroup.category)}" 
          placeholder="Category name"
          class="skill-category-input"
          data-index="${index}"
        >
        <button type="button" class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
      </div>
      <div class="skill-items-container" data-index="${index}">
        ${skillGroup.items.map((item, itemIdx) => 
          `<span class="skill-item-tag">
              ${escapeHtml(item)}
              <button type="button" onclick="deleteSkillItem(${index}, ${itemIdx})" style="background:none; border:none; cursor:pointer; color:#6366f1; font-size:1rem; padding:0;">×</button>
            </span>`
        ).join('')}
        <input 
          type="text" 
          class="skill-item-input" 
          placeholder="Add skill" 
          onkeypress="if(event.key==='Enter') addSkillItem(${index}, this); event.preventDefault();"
        >
      </div>
    `;
    skillsList.appendChild(card);
  });
}

function addSkillItem(index, input) {
  const item = input.value.trim();
  if (!item) return;

  if (!currentData.skills[index].items) {
    currentData.skills[index].items = [];
  }
  currentData.skills[index].items.push(item);
  input.value = '';
  populateSkillsForm();
}

function deleteSkillItem(index, itemIdx) {
  currentData.skills[index].items.splice(itemIdx, 1);
  populateSkillsForm();
}

function deleteSkill(index) {
  if (confirm('Delete this skill category?')) {
    currentData.skills.splice(index, 1);
    populateSkillsForm();
  }
}

// ============================================
// PROJECTS FORM
// ============================================

function populateProjectsForm() {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = '';

  (currentData.projects || []).forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-header">
        <h3 style="color: #111827; margin: 0;">Project ${index + 1}</h3>
        <button type="button" class="delete-btn" onclick="deleteProject(${index})">Delete</button>
      </div>
      <div class="project-fields">
        <div class="project-field">
          <label>Title</label>
          <input 
            type="text" 
            value="${escapeHtml(project.title)}" 
            placeholder="Project title"
            onchange="updateProjectField(${index}, 'title', this.value)"
          >
        </div>
        <div class="project-field">
          <label>Description</label>
          <textarea 
            placeholder="Project description"
            onchange="updateProjectField(${index}, 'description', this.value)"
          >${escapeHtml(project.description)}</textarea>
        </div>
        <div class="project-field">
          <label>Image URL</label>
          <input 
            type="text" 
            value="${escapeHtml(project.image)}" 
            placeholder="assets/projects/image.png"
            onchange="updateProjectField(${index}, 'image', this.value)"
          >
        </div>
        <div class="project-field">
          <label>Tags</label>
          <div class="project-tags-input" id="project-tags-${index}">
            ${(project.tags || []).map((tag, tIdx) => 
              `<span class="tag-item">
                 ${escapeHtml(tag)}
                <button type="button" onclick="deleteProjectTag(${index}, ${tIdx})">×</button>
              </span>`
            ).join('')}
            <input 
              type="text" 
              class="project-tags-new" 
              placeholder="Add tag"
              onkeypress="if(event.key==='Enter') addProjectTag(${index}, this); event.preventDefault();"
            >
          </div>
        </div>
      </div>
    `;
    projectsList.appendChild(card);
  });
}

function updateProjectField(index, field, value) {
  if (!currentData.projects[index]) return;
  currentData.projects[index][field] = value;
}

function addProjectTag(index, input) {
  const tag = input.value.trim();
  if (!tag || !currentData.projects[index]) return;

  if (!currentData.projects[index].tags) {
    currentData.projects[index].tags = [];
  }
  currentData.projects[index].tags.push(tag);
  input.value = '';
  populateProjectsForm();
}

function deleteProjectTag(index, tagIdx) {
  if (currentData.projects[index] && currentData.projects[index].tags) {
    currentData.projects[index].tags.splice(tagIdx, 1);
    populateProjectsForm();
  }
}

function deleteProject(index) {
  if (confirm('Delete this project?')) {
    currentData.projects.splice(index, 1);
    populateProjectsForm();
  }
}

// ============================================
// BLOGS FORM
// ============================================

function populateBlogsForm() {
  const blogsList = document.getElementById('blogs-list');
  blogsList.innerHTML = '';

  (currentData.blogs || []).forEach((blog, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-header">
        <div style="flex: 1;">
          <input 
            type="text" 
            value="${escapeHtml(blog.title)}" 
            placeholder="Blog title"
            style="width: 100%;"
            onchange="updateBlogField(${index}, 'title', this.value)"
          >
        </div>
        <button type="button" class="delete-btn" onclick="deleteBlog(${index})">Delete</button>
      </div>
      <div class="project-fields">
        <div class="project-field">
          <label>Description</label>
          <textarea 
            placeholder="Blog description"
            rows="3"
            onchange="updateBlogField(${index}, 'description', this.value)"
          >${escapeHtml(blog.description)}</textarea>
        </div>
        <div class="project-field">
          <label>Date</label>
          <input 
            type="text" 
            value="${escapeHtml(blog.date || '')}" 
            placeholder="Feb 2026"
            onchange="updateBlogField(${index}, 'date', this.value)"
          >
        </div>
      </div>
    `;
    blogsList.appendChild(card);
  });
}

function updateBlogField(index, field, value) {
  if (!currentData.blogs[index]) return;
  currentData.blogs[index][field] = value;
}

function deleteBlog(index) {
  if (confirm('Delete this blog?')) {
    currentData.blogs.splice(index, 1);
    populateBlogsForm();
  }
}

// ============================================
// ADD ITEM HANDLERS
// ============================================

function handleAddItem(e) {
  const type = e.target.getAttribute('data-add');

  if (type === 'skill') {
    currentData.skills.push({ category: 'New Category', items: [] });
    populateSkillsForm();
  } else if (type === 'project') {
    currentData.projects.push({
      title: 'New Project',
      description: '',
      image: 'assets/projects/image.png',
      tags: []
    });
    populateProjectsForm();
  } else if (type === 'blog') {
    currentData.blogs.push({
      title: 'New Blog',
      description: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    });
    populateBlogsForm();
  }
}

// ============================================
// SAVE/CANCEL/RESET
// ============================================

function handleSave() {
  // Collect all form data
  currentData.name = document.getElementById('hero-name').value;
  currentData.hero.description = document.getElementById('hero-desc').value;
  currentData.hero.tags = [
    document.getElementById('tag-1').value,
    document.getElementById('tag-2').value,
    document.getElementById('tag-3').value
  ].filter(t => t);

  currentData.about = document.getElementById('about-text').value;
  currentData.contact.email = document.getElementById('contact-email').value;
  currentData.contact.phone = document.getElementById('contact-phone').value;
  currentData.contact.github = document.getElementById('contact-github').value;
  currentData.contact.linkedin = document.getElementById('contact-linkedin').value;

  // Save to localStorage
  localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(currentData));

  // Show success message
  const successMsg = document.getElementById('success-message');
  successMsg.classList.remove('hidden');
  setTimeout(() => {
    successMsg.classList.add('hidden');
  }, 3000);

  console.log('✓ Portfolio data saved to localStorage');
}

function handleCancel() {
  if (confirm('Discard changes?')) {
    loadDataIntoForms();
  }
}

function handleReset() {
  if (confirm('Reset all data to defaults? This will clear all your edits.')) {
    localStorage.removeItem(STORAGE_KEYS.DATA);
    currentData = { ...DEFAULT_DATA };
    loadDataIntoForms();

    const successMsg = document.getElementById('success-message');
    successMsg.textContent = '✓ Data reset to defaults!';
    successMsg.classList.remove('hidden');
    setTimeout(() => {
      successMsg.classList.add('hidden');
      successMsg.textContent = '✓ Changes saved successfully!';
    }, 3000);
  }
}

function handlePreview() {
  window.open('./', '_blank');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateCharCount() {
  const aboutText = document.getElementById('about-text');
  const count = aboutText.value.length;
  document.getElementById('about-count').textContent = count;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

console.log(`
╔════════════════════════════════════════════════════════╗
║  PORTFOLIO ADMIN PANEL LOADED                          ║
╠════════════════════════════════════════════════════════╣
║  Login with:                                           ║
║  Username: admin                                       ║
║  Password: admin123                                    ║
║                                                         ║
║  ⚠️  For PERSONAL USE ONLY                            ║
║  ⚠️  Not secure for production                         ║
╚════════════════════════════════════════════════════════╝
`);
