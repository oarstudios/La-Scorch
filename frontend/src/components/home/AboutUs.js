import React, { useState, useEffect } from 'react';
import desktopImage from '../../Images/ChatGPT Image May 14, 2025, 01_40_31 PM 2 (1).png';
import mobileImage from '../../Images/Frame 633032.png'; // <-- Add your mobile image here

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <img
        src={isMobile ? mobileImage : desktopImage}
        alt="About Us"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default AboutUs;
