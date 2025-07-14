import React from 'react';
import './FullCategoryPage.css';
import sampleImage from '../../Images/slider1.jpg'; // Replace with actual cake image

const products = Array(8).fill({
  name: 'Dark Chocolate',
  price: 1299,
  img: sampleImage,
});

const FullCategoryPage = () => {
  return (
    <div className="full-category-section">
      <p className="subtitle-allCAt">Gifts For Your Special Ones</p>
      <h2 className="title-allCAt">Explore More In Chocolates</h2>

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
