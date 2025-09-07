import React from 'react';
import HexPanel from '../HexPanel';
import mycv from '../../assets/CV.pdf'

interface AboutProps {
  active: boolean;
}

const About: React.FC<AboutProps> = ({ active }) => {
  return (
    <HexPanel id="about" active={active}>
      <h2>whoami</h2>
      <p>$ cat about.json</p>
      <p>{`{`}</p>
      <p>{`  "name": "Yahya Loulou",`}</p>
      <p>{`  "skills": ["JavaScript", "React", "Node.js", "next js"],`}</p>
      <p>{`  "passion": "Building elegant solutions to complex problems"`}</p>
      <p>{`}`}</p>
      <p>$ wget resume.pdf</p>
      <a href={mycv} target="_blank" className="download-cv" download="cv.pdf">
        <span className="download-icon">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        </span>
        Download CV
      </a>
    </HexPanel>
  );
};

export default About;