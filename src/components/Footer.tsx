import React from 'react';
import '../Styles/Footer.css';

import { MdEmail } from 'react-icons/md';
import { BsGithub, BsGlobe, BsLinkedin } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul>
        <IconContext.Provider value={{size:'30px'}}>
            <li><a href="https://slope-emporium.vercel.app/contact"><MdEmail/> Email</a></li>
            <li><a href="https://www.linkedin.com/in/sergiu-catalin-stefan-a5553a196/"><BsLinkedin/> LinkedIn</a></li>
            <li><a href="https://github.com/sergiusergiu1234?tab=repositories"><BsGithub/>GitHub</a></li>
            <li><a href="https://portfolio-liard-two-36.vercel.app/"><BsGlobe/> Portfolio</a></li>
        </IconContext.Provider>
        </ul>
      </div>
      <p>&copy; {new Date().getFullYear()} Slope-Emporium. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
