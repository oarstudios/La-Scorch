import React from 'react';
import './Footer.css';

import LinkedInIcon from '../../Images/mdi_linkedin (1).png';
import XIcon from '../../Images/Group (2).png';
import FacebookIcon from '../../Images/Vector (7).png';
import InstagramIcon from '../../Images/Vector (8).png';
import LaScorchLogo from '../../Images/footer-logo.png';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-main-row">
          {/* LEFT CONTENT */}
          <div className="footer-left">
            <div className="footer-columns">
              <div className="footer-column">
                <h4>Help & Info</h4>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Refund Policy</li>
                  <li>Delivery & Pickup</li>
                  <li>Contact Us</li>
                  <li>About Us</li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Menu</h4>
                <ul>
                  <li>Gourmet Cakes</li>
                  <li>Entremet Cakes</li>
                  <li>Travel Cakes</li>
                  <li>Custom Cakes</li>
                  <li>Wedding Cakes</li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Gifting</h4>
                <ul>
                  <li>Corporate Gifting</li>
                  <li>Gift Boxes</li>
                  <li>Event Orders</li>
                </ul>
              </div>
            </div>

            {/* Bottom Left Info */}
            <div className="footer-bottom-info">
              <div className="footer-info-section">
                <h4>Address</h4>
                <p>
                  La Scorch, Shop No 123, Mount Road, Near Ram Mandir, Navi Mumbai (E) 123 345<br />
                  Landmark : Opposite Ram Mandir
                </p>
              </div>
              <div className="footer-info-section">
                <h4>Phone Number</h4>
                <p>Person 1 : 12345 12345</p>
                <p>Person 2 : 12345 12345</p>
              </div>
              <div className="footer-info-section">
                <h4>For Bulk Orders</h4>
                <p>Person 1 : 12345 12345</p>
                <p>Person 2 : 12345 12345</p>
              </div>
            </div>
          </div>

          {/* RIGHT MAP */}
          <div className="footer-map-full">
            <iframe
              title="Chembur Map"
              src="https://maps.google.com/maps?q=Chembur%2C%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="map-label">Based in Chembur, Mumbai</p>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="footer-bottom">
          <div className="social-icons">
            <img src={LinkedInIcon} alt="LinkedIn" />
            <img src={XIcon} alt="X" />
            <img src={FacebookIcon} alt="Facebook" />
            <img src={InstagramIcon} alt="Instagram" />
          </div>
          <img src={LaScorchLogo} alt="La Scorch Logo" className="footer-logo" />
          <p>LA SCORCH PATISSERIE COPYRIGHT ©2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
