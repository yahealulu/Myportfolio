import { useEffect, useState } from 'react';

interface ProjectsProps {
  activeSection: string;
}

const Projects: React.FC<ProjectsProps> = ({ activeSection }) => {
  const [activeFramework, setActiveFramework] = useState('react');
  const [activeProject, setActiveProject] = useState<Record<string, string>>({
    react: 'react1',
    nextjs: 'next1'
  });

  useEffect(() => {
    // Initialize image carousels when the component mounts or when activeSection changes to 'projects'
    if (activeSection === 'projects') {
      initializeImageCarousels();
    }
  }, [activeSection]);

  const handleFrameworkChange = (framework: string) => {
    setActiveFramework(framework);
    // Reset scroll position when switching frameworks
    const content = document.querySelector('.hex-content');
    if (content) content.scrollTop = 0;
  };

  const handleProjectChange = (projectId: string) => {
    setActiveProject(prev => ({
      ...prev,
      [activeFramework]: projectId
    }));

    // Smooth scroll to the selected project
    setTimeout(() => {
      const selectedProject = document.getElementById(projectId);
      if (selectedProject) {
        selectedProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  const initializeImageCarousels = () => {
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
        
        const modalImage = images[currentIndex].cloneNode() as HTMLImageElement;
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
          (img as HTMLElement).style.display = index === currentIndex ? 'block' : 'none';
        });
        
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      updateCarousel();
    });
  };

  return (
    <div className="filter-container">
      <div className="framework-tabs">
        <button 
          className={`framework-tab ${activeFramework === 'react' ? 'active' : ''}`} 
          data-framework="react"
          onClick={() => handleFrameworkChange('react')}
        >
          React.js
        </button>
        <button 
          className={`framework-tab ${activeFramework === 'nextjs' ? 'active' : ''}`} 
          data-framework="nextjs"
          onClick={() => handleFrameworkChange('nextjs')}
        >
          Next.js && javascript
        </button>
      </div>
      <div className="projects-container">
        {/* React Projects */}
        <div className={`project-group ${activeFramework === 'react' ? 'active' : ''}`} data-framework="react">
          <div className="project-tabs">
            <button 
              className={`project-tab ${activeProject.react === 'react1' ? 'active' : ''}`} 
              data-project="react1"
              onClick={() => handleProjectChange('react1')}
            >
              E-Commerce
            </button>
            <button 
              className={`project-tab ${activeProject.react === 'react2' ? 'active' : ''}`} 
              data-project="react2"
              onClick={() => handleProjectChange('react2')}
            >
              ToDoApp
            </button>
            <button 
              className={`project-tab ${activeProject.react === 'react3' ? 'active' : ''}`} 
              data-project="react3"
              onClick={() => handleProjectChange('react3')}
            >
              Dashboard
            </button>
          </div>
          <div className="project-details">
            <div className={`project-detail ${activeProject.react === 'react1' ? 'active' : ''}`} id="react1">
              <div className="project-header">
                <h3>React E-Commerce Platform</h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/mobilestore" target="_blank">GitHub</a>
                  <a href="https://mobilestore-tau.vercel.app/" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/react/mobilestore/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/mobilestore/2.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/mobilestore/3.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>A full-featured e-commerce platform mobile store built with React and redux .</p>
                  <ul>
                    <li>Responsive design with styled components</li>
                    <li>Real-time cart updates and checkout process</li>
                    <li>Integration with Stripe payment gateway</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Redux</span>
                    <span className="tech-tag">Stripe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project-detail ${activeProject.react === 'react2' ? 'active' : ''}`} id="react2">
              <div className="project-header">
                <h3>To Do App</h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/Todoapp" target="_blank">GitHub</a>
                  <a href="https://todoapp-zeta-gold.vercel.app/" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/react/todoapp/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/todoapp/2.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/todoapp/3.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>A Beautiful to do app with confetti and progress data.</p>
                  <ul>
                    <li>Responsive design components</li>
                    <li>ability to set end time to the tasks to being uptodata</li>
                    <li>dark mode and light mode toggle</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">tailwind</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project-detail ${activeProject.react === 'react3' ? 'active' : ''}`} id="react3">
              <div className="project-header">
                <h3>Admin Dashboard</h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/Admin_dashboard" target="_blank">GitHub</a>
                  <a href="https://admin-dashboard-beta-beige.vercel.app" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/react/admindashboard/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/admindashboard/2.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/react/admindashboard/3.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>An admin dashboard built with React, featuring customizable charts and tables.</p>
                  <ul>
                    <li>Adding users and roles for each user</li>
                    <li>Responsive design components</li>
                    <li>Integration with Chart.js and React-Table</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Chart.js</span>
                    <span className="tech-tag">React-Table</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next.js Projects */}
        <div className={`project-group ${activeFramework === 'nextjs' ? 'active' : ''}`} data-framework="nextjs">
          <div className="project-tabs">
            <button 
              className={`project-tab ${activeProject.nextjs === 'next1' ? 'active' : ''}`} 
              data-project="next1"
              onClick={() => handleProjectChange('next1')}
            >
              landing page
            </button>
            <button 
              className={`project-tab ${activeProject.nextjs === 'next2' ? 'active' : ''}`} 
              data-project="next2"
              onClick={() => handleProjectChange('next2')}
            >
              RACE RENTALS
            </button>
            <button 
              className={`project-tab ${activeProject.nextjs === 'next3' ? 'active' : ''}`} 
              data-project="next3"
              onClick={() => handleProjectChange('next3')}
            >
              Car Game
            </button>
          </div>
          <div className="project-details">
            <div className={`project-detail ${activeProject.nextjs === 'next1' ? 'active' : ''}`} id="next1">
              <div className="project-header">
                <h3>Next.js landing page </h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/techlandingpage" target="_blank">GitHub</a>
                  <a href="https://techlandingpage1.vercel.app/" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/nextjs/landing page/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/landing page/2.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/landing page/3.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>A landing page for tech company that's represent company features.</p>
                  <ul>
                    <li>design the website to like a game</li>
                    <li>modern ui with styled component</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">react hooks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project-detail ${activeProject.nextjs === 'next2' ? 'active' : ''}`} id="next2">
              <div className="project-header">
                <h3>RACE RENTALS</h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/carrenting" target="_blank">GitHub</a>
                  <a href="https://carrenting.vercel.app/" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/nextjs/rentcars/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/rentcars/2.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/rentcars/3.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>This project is a Luxury Race Track Car Rental Platform designed to provide an immersive and interactive experience for users looking to rent high-performance supercars </p>
                  <ul>
                    <li>Interactive Car Showcase</li>
                    <li>Responsive Design</li>
                    <li>Race Track Theme</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Vanilla JavaScript</span>
                    <span className="tech-tag">SVG Graphics and Animations</span>
                    <span className="tech-tag"> CSS Media Queries</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project-detail ${activeProject.nextjs === 'next3' ? 'active' : ''}`} id="next3">
              <div className="project-header">
                <h3>Car Game</h3>
                <div className="project-links">
                  <a href="https://github.com/yahealulu/car-game" target="_blank">GitHub</a>
                  <a href="https://car-game-one-coral.vercel.app" target="_blank">Demo</a>
                </div>
              </div>
              <div className="project-preview">
                <div className="image-carousel">
                  <img src="./myprojectsdata/nextjs/cargame/1.png" alt="Project preview 1" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/cargame/2.png" alt="Project preview 2" className="carousel-image" loading="lazy" />
                  <img src="./myprojectsdata/nextjs/cargame/3.png" alt="Project preview 3" className="carousel-image" loading="lazy" />
                  <div className="carousel-nav">
                    <div className="carousel-dot active"></div>
                    <div className="carousel-dot"></div>
                    <div className="carousel-dot"></div>
                  </div>
                </div>
                <div className="project-description">
                  <p>A Car Game using one html file includes the styles and javascript codes</p>
                  <ul>
                    <li>To win the race you must reach the finish line before time runs out. </li>
                    <li>3d model for the car</li>
                    <li>open world driving</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Vanilla javascript</span>
                    <span className="tech-tag">html</span>
                    <span className="tech-tag">inline css </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;