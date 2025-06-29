import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';
import sampleImage from '../../Images/slider1.jpg'; // replace with your image

const allProducts = {
  Chocolateries: [
    { name: 'Dark Chocolate', price: 1299, img: sampleImage },
    { name: 'Beery Passion Tart', price: 1299, img: sampleImage },
    { name: 'Fudge Delight', price: 1399, img: sampleImage },
    { name: 'Raspberry Rush', price: 1499, img: sampleImage },
    { name: 'Truffle Bomb', price: 1599, img: sampleImage },
  ],
  Pastries: [
    { name: 'Brun', price: 1099, img: sampleImage },
    { name: 'Vanilla Cream Tart', price: 1199, img: sampleImage },
    { name: 'Fruit Blast', price: 1299, img: sampleImage },
    { name: 'Red Velvet', price: 1399, img: sampleImage },
  ],
  Staples: [
    { name: 'Classic Butter Cake', price: 999, img: sampleImage },
    { name: 'Mini Tarts Pack', price: 1199, img: sampleImage },
    { name: 'Everyday Muffin', price: 899, img: sampleImage },
  ],
};

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState('Chocolateries');
  const navigate = useNavigate();

  const products = allProducts[activeCategory] || [];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleViewMore = () => {
    navigate(`/category?type=${encodeURIComponent(activeCategory)}`);
  };

  return (
    <div className="category-section">
      <p className="subtitle">Gifts For Your Special Ones</p>
      <h2 className="title">Explore Other Categories</h2>

      <div className="tabs">
        {Object.keys(allProducts).map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'tab active' : 'tab'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.slice(0, 4).map((product, index) => (
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

      <div className="view-more-container">
        <button className="view-more-btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
