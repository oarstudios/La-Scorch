import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';
import './AddNewProduct.css';

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Egg');
  const [images, setImages] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

 const handleImageUpload = (e) => {
  const files = Array.from(e.target.files).slice(0, 3 - images.length); // Only accept up to 3 total
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
    <div className="anp-container">
      <p className="anp-back-text" onClick={() => navigate(-1)}>← Back</p>
      <h2 className="anp-heading">Add New Product</h2>

      <div className="anp-form">
        {/* Left Image Section */}
        <div className="anp-image-upload">
          <label htmlFor="imageInput" className="anp-main-image">
            {images.length === 0 ? (
              <FaImage className="anp-img-icon" />
            ) : (
              <img src={images[0].url} alt="Uploaded Preview" className="anp-preview-image" />
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

          <div className="anp-thumbnail-row">
            {images.map((img, index) => (
              <div className="anp-thumbnail" key={index}>
                <img src={img.url} alt={`thumb-${index}`} className="anp-thumb-img" />
                <FaTimes className="anp-remove-icon" onClick={() => removeImage(img.name)} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Input Section */}
        <div className="anp-input-fields">
          <div className="anp-section">
            <p className="anp-label">Type of Cake</p>
            <div className="anp-radio-group">
              <label className={`anp-radio-option ${selectedType === 'Egg' ? 'active' : ''}`}>
                <input type="radio" checked={selectedType === 'Egg'} onChange={() => handleTypeChange('Egg')} />
                Egg
              </label>
              <label className={`anp-radio-option ${selectedType === 'Eggless' ? 'active' : ''}`}>
                <input type="radio" checked={selectedType === 'Eggless'} onChange={() => handleTypeChange('Eggless')} />
                Eggless
              </label>
            </div>
          </div>

          <input type="text" className="anp-input" placeholder="Flavor" />
          <input type="text" className="anp-input" placeholder="Name Of The Product" />
          <textarea className="anp-textarea" placeholder="Description" />

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {['Grande', 'Petit', 'Individual'].map((size, i) => (
              <div className="anp-size-row" key={i}>
                <label className="anp-size-option">
                  <input type="checkbox" />
                  <span>{size}</span>
                  <small>
                    {size === 'Grande' && '8 inches (8–9 serves)'}
                    {size === 'Petit' && '6 inches (4–5 serves)'}
                    {size === 'Individual' && '3 inches (1 serves)'}
                  </small>
                </label>
                <input type="text" className="anp-price-input" placeholder="Enter Price" />
              </div>
            ))}
          </div>

          <input type="text" className="anp-input" placeholder="Estimated Preparation Time" />
          <textarea className="anp-textarea" placeholder="Storage And Care Instructions" />

          <button className="anp-submit-btn">Publish Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
