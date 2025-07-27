import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';
import './EditAdminProducts.css';

const EditAdminProduct = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Egg');
  const [images, setImages] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - images.length);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({ name: file.name + Date.now(), url: event.target.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
    });
  };

  const removeImage = (name) => {
    setImages((prev) => prev.filter((img) => img.name !== name));
  };

  return (
    <div className="ep-container">
      <p className="ep-back-text" onClick={() => navigate(-1)}>← Back</p>
      <h2 className="ep-heading">Edit Product</h2>

      <div className="ep-actions">
        <button className="ep-btn best-seller">Best Seller</button>
        <button className="ep-btn archive">Archive Now</button>
        <button className="ep-btn update">Update Product</button>
      </div>

      <div className="ep-form">
        <div className="ep-image-upload">
          <label htmlFor="imageInput" className="ep-main-image">
            {images.length === 0 ? (
              <FaImage className="ep-img-icon" />
            ) : (
              <img src={images[0].url} alt="Uploaded Preview" className="ep-preview-image" />
            )}
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <div className="ep-thumbnail-row">
            {images.map((img, index) => (
              <div className="ep-thumbnail" key={index}>
                <img src={img.url} alt={`thumb-${index}`} className="ep-thumb-img" />
                <FaTimes className="ep-remove-icon" onClick={() => removeImage(img.name)} />
              </div>
            ))}
          </div>
        </div>

        <div className="ep-input-fields">
          <div className="ep-section">
            <p className="ep-label">Type of Cake</p>
            <div className="ep-radio-group">
              {['Egg', 'Eggless'].map((type) => (
                <label key={type} className={`ep-radio-option ${selectedType === type ? 'active' : ''}`}>
                  <input
                    type="radio"
                    checked={selectedType === type}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <input type="text" className="ep-input" placeholder="Flavor" />
          <input type="text" className="ep-input" placeholder="Name Of The Product" />
          <textarea className="ep-textarea" placeholder="Description" />

          <p className="ep-label">Choose Size</p>
          <div className="ep-size-group">
            {['Grande', 'Petit', 'Individual'].map((size, i) => (
              <div className="ep-size-row" key={i}>
                <label className="ep-size-option">
                  <input type="checkbox" />
                  <span>{size}</span>
                  <small>
                    {size === 'Grande' && '8 inches (8–9 serves)'}
                    {size === 'Petit' && '6 inches (4–5 serves)'}
                    {size === 'Individual' && '3 inches (1 serves)'}
                  </small>
                </label>
                <input type="text" className="ep-price-input" placeholder="Enter Price" />
              </div>
            ))}
          </div>

          <input type="text" className="ep-input" placeholder="Estimated Preparation Time" />
          <textarea className="ep-textarea" placeholder="Storage And Care Instructions" />
        </div>
      </div>
    </div>
  );
};

export default EditAdminProduct;
