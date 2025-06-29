

import React from 'react';
import './CupcakeBoxSection.css';
import boxImage from '../../Images/Group 1.png'; // use your actual image path

const CupcakeBoxSection = () => {
  return (
    <div className="cupcake-box-section">
      <div className="cupcake-box-left">
        <h2 className="title">The box of Four Cupcakes</h2>
        <p className="description">
          At La Scorch Patisserie, we believe that every cake tells a story one of craftsmanship, passion, and indulgence
        </p>
        <p className="description">
          Born from a love for timeless French techniques and bold contemporary flavors, our patisserie brings an elevated dessert experience to every celebration, big or small
        </p>
        <button className="add-to-cart-btn">Add To Cart</button>
      </div>

      <div className="cupcake-box-right">
        <img src={boxImage} alt="Cupcake Box" className="cupcake-box-img" />
      </div>
    </div>
  );
};

export default CupcakeBoxSection;
