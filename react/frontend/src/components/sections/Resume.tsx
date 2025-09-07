import React from 'react';
import HexPanel from '../HexPanel';

interface ResumeProps {
  active: boolean;
}

const Resume: React.FC<ResumeProps> = ({ active }) => {
  return (
    <HexPanel id="resume" active={active}>
      <h2>cat resume.txt</h2>
      
      <div className="resume-section">
        <h3>Professional Experience</h3>

        <div className="resume-item">
          <div className="resume-header">
            <h4>React Front-end Web Developer</h4>
            <span className="date">2024</span>
          </div>
          <div className="institution">Mad Solutions - Damascus, Syria</div>
          <p className="description">About 3 months of training in React web development, building projects and deploying them. Worked on responsive design and modern React practices.</p>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>backend odoo developer</h4>
            <span className="date">2022 - 2023</span>
          </div>
          <div className="institution">noptechs - Turkey</div>
          <p className="description">implementation systems and customize odoo tools to suit the client using python</p>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>IT support specialist</h4>
            <span className="date">2021 - 2022</span>
          </div>
          <div className="institution">house of colors - Syria</div>
          <p className="description">IT supporting for the web application that used in mobile application for house of colors problem solving and big experience in printers systems.</p>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>sales manger</h4>
            <span className="date">2019- 2021</span>
          </div>
          <div className="institution">Golden mobile - syria - Damascus, Syria</div>
          <p className="description">selling mobile phones and accessories for clients and for golden mobile vendors.</p>
        </div>
      </div>

      <div className="resume-section">
        <h3>Education & Certifications</h3>
        
        <div className="resume-item">
          <div className="resume-header">
            <h4>Bachelor of Information Technology Engineering</h4>
            <span className="date">2019 - Current</span>
          </div>
          <div className="institution">Syrian Virtual University (SVU)</div>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>building website using wordpress</h4>
            <span className="date">2023</span>
          </div>
          <div className="institution">mamdouh kaldas, edrak platform</div>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>front end developer certificate</h4>
            <span className="date">2022</span>
          </div>
          <div className="institution">meta, coursera platform</div>
        </div>

        <div className="resume-item">
          <div className="resume-header">
            <h4>CEH V11</h4>
            <span className="date">2022</span>
          </div>
          <div className="institution">with hani alsayes coatch.</div>
        </div>
      </div>
    </HexPanel>
  );
};

export default Resume;