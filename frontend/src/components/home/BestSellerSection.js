// src/pages/home/BestSellerSection.js

import React from 'react';
import './BestSellerSection.css';
import sampleImage from '../../Images/slider1.jpg'; // replace with real product images

const bestSellers = [
  { name: 'Dark Chocolate', price: 1299, img: sampleImage },
  { name: 'Brun', price: 1299, img: sampleImage },
  { name: 'Beery Passion Tart', price: 1299, img: sampleImage },
  { name: 'Beery Passion Tart', price: 1299, img: sampleImage },
];

const BestSellerSection = () => {
  return (
    <div className="best-seller-section">
      <p className="subtitle">Gifts For Your Special Ones</p>
      <h2 className="title">Best Selling Varieties</h2>

      <div className="products-grid">
        {bestSellers.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.img} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Starting From {product.price}/-</p>
              <button className="add-btn">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellerSection;
