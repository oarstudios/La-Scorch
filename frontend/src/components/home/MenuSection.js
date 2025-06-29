import React from 'react';
import './MenuSection.css';
import menuImage from '../../Images/menu.png';

const MenuSection = () => {
  return (
    <section className="menu-section">
      <div className="menu-left">
        <h2>Order from our variety of other options in Cakes and Pastries</h2>
        <button className="call-btn">Call Us</button>
      </div>
      <div className="menu-right">
        <img src={menuImage} alt="Menu" className="menu-img" />
      </div>
    </section>
  );
};

export default MenuSection;
