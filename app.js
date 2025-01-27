// Add this at the beginning of the file
function handleIntroAnimation() {
  setTimeout(() => {
    const overlay = document.querySelector('.intro-overlay');
    const portfolio = document.querySelector('.portfolio-space');
    
    overlay.classList.add('fade-out');
    portfolio.classList.add('visible');
  }, 2500); // Wait for 2.5 seconds before transitioning
}

// Create particles background with programming icons
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 30;
  
  const icons = [
    '<svg viewBox="0 0 24 24" class="tech-icon"><path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
    '<svg viewBox="0 0 24 24" class="tech-icon"><path fill="currentColor" d="M11.977 22.001l-3.83-2.153-2.126 1.202v-2.405l-3.867-2.17V5.522L6.02 3.352v2.405l3.83 2.153 2.127-1.202v2.405l3.867 2.17v10.953l-3.867 2.17v-2.405zm0-7.339l-3.83-2.153v4.308l3.83 2.153v-4.308z"/></svg>',
    '<svg viewBox="0 0 24 24" class="tech-icon"><path fill="currentColor" d="M12 18.178l-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.217l-.624 6.778L12 18.178zM3 2h18l-1.623 18L12 22l-7.377-2L3 2zm2.188 2L6.49 18.434 12 19.928l5.51-1.494L18.812 4H5.188z"/></svg>',
    '<svg viewBox="0 0 24 24" class="tech-icon"><path fill="currentColor" d="M12 2c5.522 0 10 4.478 10 10 0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10C2 6.478 6.477 2 12 2zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333zm2.504 12.765c.097.152.161.332.161.527 0 .541-.439.98-.98.98-.346 0-.654-.183-.827-.458l-2.325-3.503-2.322 3.503a.975.975 0 01-.827.458.981.981 0 01-.98-.98c0-.195.063-.375.16-.527h.001l2.946-4.432-2.946-4.432a.98.98 0 01-.161-.527c0-.541.44-.98.98-.98.346 0 .654.183.827.458l2.322 3.503 2.325-3.503a.975.975 0 01.827-.458c.541 0 .98.439.98.98 0 .195-.064.375-.161.527L12.157 12l2.347 4.432z"/></svg>'
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomly select an icon
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    particle.innerHTML = randomIcon;
    
    // Random positioning
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Randomize animation properties
    const duration = 15 + Math.random() * 15;
    const delay = Math.random() * -20;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
    
    particlesContainer.appendChild(particle);
  }
}

function initializePortfolio() {
  const panels = document.querySelectorAll('.hex-panel');
  const buttons = document.querySelectorAll('.nav-button');
  
  function showSection(section) {
    // Apply exit animation to current active panel
    const currentActive = document.querySelector('.hex-panel.active');
    if (currentActive) {
      currentActive.style.opacity = '0';
      currentActive.querySelector('.hex-content').style.transform = 'translateY(-100%)';
      
      setTimeout(() => {
        currentActive.classList.remove('active');
        
        // Show selected panel with entrance animation
        const activePanel = document.getElementById(section);
        activePanel.classList.add('active');
        activePanel.style.opacity = '1';
        
        // Trigger content animations
        setTimeout(() => {
          activePanel.querySelector('.hex-content').style.transform = 'translateY(0)';
        }, 50);
      }, 400);
    } else {
      // Initial load or if no panel is active
      const activePanel = document.getElementById(section);
      activePanel.classList.add('active');
      activePanel.style.opacity = '1';
      activePanel.querySelector('.hex-content').style.transform = 'translateY(0)';
    }
    
    // Update button states
    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-section') === section) {
        button.classList.add('active');
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');
      showSection(section);
    });
  });

  // Show initial section
  showSection('about');
}

function initializeProjects() {
  const frameworkTabs = document.querySelectorAll('.framework-tab');
  const projectTabs = document.querySelectorAll('.project-tab');
  
  // Framework tabs handling
  frameworkTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const framework = tab.getAttribute('data-framework');
      
      // Update framework tabs
      frameworkTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Reset scroll position when switching frameworks
      const content = document.querySelector('.hex-content');
      content.scrollTop = 0;
      
      // Update project groups
      document.querySelectorAll('.project-group').forEach(group => {
        if (group.getAttribute('data-framework') === framework) {
          group.classList.add('active');
          // Show first project in new framework
          const firstProjectTab = group.querySelector('.project-tab');
          const firstProjectId = firstProjectTab.getAttribute('data-project');
          firstProjectTab.classList.add('active');
          
          group.querySelectorAll('.project-detail').forEach(detail => {
            detail.classList.toggle('active', detail.id === firstProjectId);
          });
        } else {
          group.classList.remove('active');
        }
      });
    });
  });
  
  // Project tabs handling
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const projectId = tab.getAttribute('data-project');
      const group = tab.closest('.project-group');
      
      // Update tabs
      group.querySelectorAll('.project-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update project details
      group.querySelectorAll('.project-detail').forEach(detail => {
        detail.classList.toggle('active', detail.id === projectId);
      });
      
      // Smooth scroll to the selected project
      const selectedProject = document.getElementById(projectId);
      selectedProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function initializeImageCarousels() {
  const carousels = document.querySelectorAll('.image-carousel');
  
  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    
    // Set up dots click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Set up image click handler for modal
    carousel.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      
      const modalImage = images[currentIndex].cloneNode();
      modalImage.className = 'modal-image';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'close-modal';
      closeButton.innerHTML = '×';
      closeButton.onclick = () => modal.remove();
      
      modal.appendChild(modalImage);
      modal.appendChild(closeButton);
      document.body.appendChild(modal);
      
      setTimeout(() => modal.classList.add('active'), 10);
    });
    
    function updateCarousel() {
      images.forEach((img, index) => {
        img.style.display = index === currentIndex ? 'block' : 'none';
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    updateCarousel();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  handleIntroAnimation();
  createParticles();
  initializePortfolio();
  initializeProjects();
  initializeImageCarousels();
});