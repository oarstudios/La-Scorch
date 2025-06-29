

import React from 'react';
import aboutUsImage from '../../Images/ChatGPT Image May 14, 2025, 01_40_31 PM 2 (1).png'; // Adjust the path as needed

const AboutUs = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <img
        src={aboutUsImage}
        alt="About Us"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default AboutUs;
