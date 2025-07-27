import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import './ProductDetails.css';
import vegIcon from '../../Images/veg.png';
import noteIcon from '../../Images/notes.png';



const ProductDetails = () => {
  const { state: product } = useLocation();
  const [selectedSize, setSelectedSize] = useState('Petit');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [note, setNote] = useState('');

  const sizes = [
    { name: 'Grande', desc: '8 inches (8–9 serves)' },
    { name: 'Petit', desc: '6 inches (4–5 serves)' },
    { name: 'Individual', desc: '3 inches (1 serves)' },
  ];

  const images = product?.images || [product?.img, product?.img, product?.img];

  const navigate = useNavigate();

const handleAddToCart = () => {
  // Logic to add product to cart goes here (optional, like storing in state/localStorage)
  navigate('/cart'); // Redirects to cart page
};


  return (
    <div className="product-page">
      <div className="product-image">
        <img src={images[activeIndex]} alt={product?.name} />
        <div className="dot-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? 'active-dot' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <div className="title-row">
          <div>
            <p className="category">Berry Rasp</p>
            <h1 className="product-name">{product?.name}</h1>
            <p className="product-desc">
              Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery
              Vanilla Almond Crust In Our Latest Drop
            </p>
          </div>
          <img src={vegIcon} alt="veg-icon" className="veg-icon" />
        </div>

        <h4 className="section-title">Choose Size</h4>
        <div className="size-options">
          {sizes.map((size) => {
            const isSelected = selectedSize === size.name;
            return (
              <div
                key={size.name}
                className={`size-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size.name)}
              >
                <div className="size-card-top">
                  <div className="radio-circle">
                    <div className={`inner-circle ${isSelected ? 'checked' : ''}`}></div>
                  </div>
                  <div className="size-info">
                    <p className="size-title">{size.name}</p>
                    <p className="size-desc">{size.desc}</p>
                  </div>
                </div>
                <div className={`price-strip ${isSelected ? 'selected-strip' : ''}`}>
                  Rs. 1299 + Charges.
                </div>
              </div>
            );
          })}
        </div>

        <p className="prep-time">Estimated Preparation Time : 1 Day</p>

        <h4 className="section-title">Storage & Care</h4>
        <p className="storage-text">
          Product needs to be refrigerated upon receipt and consumed within 2 days. Ideally this needs to be taken out of the fridge 20 minutes prior to service and consumed at room temperature. With time, this product might have some water loss around the circumference due to osmosis occuring within the fresh fruit. This is a natural process with fresh fruit desserts and does not need to be worried about.
        </p>

        <div className="note-section" onClick={() => setShowNotePopup(true)}>
          <span className="note-label">
            <img src={noteIcon} alt="note" style={{ width: '16px', marginRight: '8px', verticalAlign: 'middle' }} />
            Add Personalize Note
          </span>
          <span className="note-action">{note ? 'Edit Note' : 'Click To Add'}</span>
        </div>

        <div className="button-group">
         <button className="add-cart full-width" onClick={handleAddToCart}>
  Add to cart
</button>
        </div>
      </div>

      {/* Personal Note Popup */}
{showNotePopup && (
  <div className="popup-overlay">
    <div className="popup modern-popup">
        <button className="popup-close" onClick={() => setShowNotePopup(false)}>×</button>

      <h2 className="popup-heading">Personalize Note</h2>
      <label className="note-input-label">Add Personalize Note</label>
      <textarea
        className="modern-textarea"
        placeholder="Add personalized note Eg. Happy Birthday"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="save-button" onClick={() => setShowNotePopup(false)}>
        Save
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default ProductDetails;
