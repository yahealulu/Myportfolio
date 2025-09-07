import { useEffect, useState } from 'react';
import './App.css';

// Import the original CSS
import './styles.css';

// Import components
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // Handle intro animation similar to the original handleIntroAnimation function
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 2500); // Wait for 2.5 seconds before transitioning

    return () => clearTimeout(timer);
  }, []);

  // Create particles background with programming icons
  useEffect(() => {
    if (introComplete) {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;
      
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
  }, [introComplete]);

  // Function to show a section
  const showSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* Intro Overlay */}
      <div className={`intro-overlay ${introComplete ? 'fade-out' : ''}`}>
        <div className="intro-content">
          <div className="intro-name">Yahya Loulou</div>
          <div className="intro-title">Web Developer</div>
        </div>
      </div>
      
      {/* Portfolio Space */}
      <div className={`portfolio-space ${introComplete ? 'visible' : ''}`}>
        <div className="particles"></div>
        <div className="hex-container">
          {/* About Panel */}
          <div className={`hex-panel ${activeSection === 'about' ? 'active' : ''}`} id="about">
            <div className="terminal-buttons">
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
            </div>
            <div className="hex-content">
              <h2>whoami</h2>
              <p>$ cat about.json</p>
              <p>{'{'}</p>
              <p>  "name": "Yahya Loulou",</p>
              <p>  "skills": ["JavaScript", "React", "Node.js", "next js"],</p>
              <p>  "passion": "Building elegant solutions to complex problems"</p>
              <p>{'}'}</p>
              <p>$ wget resume.pdf</p>
              <a href="./assets/CV.pdf" target="_blank" className="download-cv" download="cv.pdf">
                <span className="download-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                </span>
                Download CV
              </a>
            </div>
          </div>
          
          {/* Projects Panel */}
          <div className={`hex-panel ${activeSection === 'projects' ? 'active' : ''}`} id="projects">
            <div className="terminal-buttons">
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
            </div>
            <div className="hex-content">
              <h2>ls ./projects</h2>
              <Projects activeSection={activeSection} />
            </div>
          </div>
          
          {/* Contact Panel */}
          <div className={`hex-panel ${activeSection === 'contact' ? 'active' : ''}`} id="contact">
            <div className="terminal-buttons">
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
            </div>
            <div className="hex-content">
              <h2>contact --info</h2>
              <p>$ cat contact.json</p>
              <p>{'{'}</p>
              <p>  <a href="mailto:yahea.loulou@gmail.com" style={{ color: '#8892b0', textDecoration: 'none' }}>"email": "yahea.loulou@gmail.com"</a>,</p>
              <p>  <a href="https:/www.github.com/yahealulu/" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>"github": "github.com/yahealulu"</a>,</p>
              <p>  <a href="https:/www.linkedin.com/in/yahea-lulu-104597231" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>"linkedin": "www.linkedin.com/in/yahea-lulu"</a>,</p>
              <p>  <a href="https://wa.me/+963994608051" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>"whatsapp": "+963994608051"</a></p>
              <p>{'}'}</p>
            </div>
          </div>
          
          {/* Resume Panel */}
          <div className={`hex-panel ${activeSection === 'resume' ? 'active' : ''}`} id="resume">
            <div className="terminal-buttons">
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
            </div>
            <div className="hex-content">
              <h2>cat resume.txt</h2>
              <Resume activeSection={activeSection} />
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button 
            className={`nav-button ${activeSection === 'about' ? 'active' : ''}`} 
            data-section="about"
            onClick={() => showSection('about')}
          >
            About
          </button>
          <button 
            className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`} 
            data-section="projects"
            onClick={() => showSection('projects')}
          >
            Projects
          </button>
          <button 
            className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`} 
            data-section="contact"
            onClick={() => showSection('contact')}
          >
            Contact
          </button>
          <button 
            className={`nav-button ${activeSection === 'resume' ? 'active' : ''}`} 
            data-section="resume"
            onClick={() => showSection('resume')}
          >
            Resume
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
