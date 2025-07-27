import React from 'react';
import './ContactUs.css';
import { FiPhoneCall } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contactus-page">
      <h2 className="contactus-title">Get in Touch</h2>
      <div className="contactus-options">

        <div className="contactus-card">
          <FiPhoneCall className="contactus-icon" />
          <div className="contactus-labels">
            <h3>Call Us</h3>
            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
          </div>
        </div>

        <div className="contactus-card">
          <MdEmail className="contactus-icon" />
          <div className="contactus-labels">
            <h3>Mail Us</h3>
            <p><a href="mailto:support@lascorch.in">support@lascorch.in</a></p>
          </div>
        </div>

        <div className="contactus-card">
          <FaWhatsapp className="contactus-icon" />
          <div className="contactus-labels">
            <h3>WhatsApp Us</h3>
            <p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
