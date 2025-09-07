import React from 'react';
import HexPanel from '../HexPanel';

interface ContactProps {
  active: boolean;
}

const Contact: React.FC<ContactProps> = ({ active }) => {
  return (
    <HexPanel id="contact" active={active}>
      <h2>contact --info</h2>
      <p>$ cat contact.json</p>
      <p>{`{`}</p>
      <p>  <a href="mailto:yahea.loulou@gmail.com" style={{ color: '#8892b0', textDecoration: 'none' }}>{`"email": "yahea.loulou@gmail.com"`}</a>,</p>
      <p>  <a href="https://www.github.com/yahealulu/" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>{`"github": "github.com/yahealulu"`}</a>,</p>
      <p>  <a href="https://www.linkedin.com/in/yahea-lulu-104597231" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>{`"linkedin": "www.linkedin.com/in/yahea-lulu"`}</a>,</p>
      <p>  <a href="https://wa.me/+963994608051" target="_blank" style={{ color: '#8892b0', textDecoration: 'none' }}>{`"whatsapp": "+963994608051"`}</a></p>
      <p>{`}`}</p>
    </HexPanel>
  );
};

export default Contact;