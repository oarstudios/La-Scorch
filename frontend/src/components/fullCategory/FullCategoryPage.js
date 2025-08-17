import React from 'react';
import './FullCategoryPage.css';
import sampleImage from '../../Images/slider1.jpg';
import searchIcon from '../../Images/Search.png'; // Replace with your magnifying glass icon

const products = Array(8).fill({
  name: 'Dark Chocolate',
  price: 1299,
  img: sampleImage,
});

const FullCategoryPage = () => {
  return (
    <div className="full-category-section">
      <div className="full-category-header">
        <div>
          <p className="subtitle-allCAt">Gifts For Your Special Ones</p>
          <h2 className="title-allCAt">Explore More In Chocolates</h2>
        </div>
        <div className="search-bar-user">
          <img src={searchIcon} alt="Search Icon" />
          <input type="text" placeholder="Search For Chocolates" />
        </div>
      </div>

      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.img} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Starting from {product.price}/-</p>
              <button className="add-btn">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullCategoryPage;
