import React from 'react';
import { useNavigate } from 'react-router-dom';
import './YouMayAlsoLike.css';
import sampleImage from '../../Images/slider1.jpg';

const bestSellers = [
  { name: 'Dark Chocolate', price: 1299, img: sampleImage },
  { name: 'Brun', price: 1299, img: sampleImage },
  { name: 'Beery Passion Tart', price: 1299, img: sampleImage },
  { name: 'Beery Passion Tart', price: 1299, img: sampleImage },
];

const YouMayAlsoLike = () => {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate('/product', { state: product });
  };

  return (
    <div className="best-seller-section">
      <p className="subtitleYMAL">Gifts For Your Special Ones</p>
      <h2 className="titleYMAL">Explore more Options</h2>

      <div className="products-grid">
        {bestSellers.map((product, index) => (
          <div className="product-card" key={index} onClick={() => handleClick(product)}>
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

export default YouMayAlsoLike;
