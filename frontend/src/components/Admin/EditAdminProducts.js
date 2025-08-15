import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';
import './EditAdminProducts.css';
import sampleImage from '../../Images/slider1.jpg'; // replace with your actual image path

const EditAdminProduct = () => {
  const navigate = useNavigate();

  // Pre-filled data from backend (mocked here)
  const [selectedType, setSelectedType] = useState('Egg');
  const [images, setImages] = useState([{ name: 'cake1', file: sampleImage }]);
  const [formData, setFormData] = useState({
    flavor: 'Chocolate',
    name: 'Truffle Cake',
    description: 'Rich chocolate truffle with layers of ganache and fudge.',
    sizes: {
      Grande: '1299',
      Petit: '899',
      Individual: '299',
    },
    preparationTime: '2 Days',
    careInstructions: 'Keep refrigerated. Consume within 48 hours.',
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - images.length);
    const newImages = files.map((file) => ({
      name: file.name + Date.now(),
      file: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (name) => {
    setImages((prev) => prev.filter((img) => img.name !== name));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (e, size) => {
    setFormData({
      ...formData,
      sizes: { ...formData.sizes, [size]: e.target.value },
    });
  };

  return (
    <div className="anp-container">
      <p className="anp-back-text" onClick={() => navigate(-1)}>← Back</p>
      <h2 className="anp-heading">Edit Product</h2>

      <div className="anp-form">
        {/* Left Image Section */}
        <div className="anp-image-upload">
          <label htmlFor="imageInput" className="anp-main-image">
            {images.length === 0 ? (
              <FaImage className="anp-img-icon" />
            ) : (
              <img src={images[0].file} alt="Uploaded Preview" className="anp-preview-image" />
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
                <img src={img.file} alt={`thumb-${index}`} className="anp-thumb-img" />
                <FaTimes className="anp-remove-icon" onClick={() => removeImage(img.name)} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="anp-input-fields">
          <div className="anp-section">
            <p className="anp-label">Type of Cake</p>
            <div className="anp-radio-group">
              {['Egg', 'Eggless'].map((type) => (
                <label key={type} className={`anp-radio-option ${selectedType === type ? 'active' : ''}`}>
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

          <input
            type="text"
            className="anp-input"
            name="flavor"
            value={formData.flavor}
            onChange={handleInputChange}
            placeholder="Flavor"
          />
          <input
            type="text"
            className="anp-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name Of The Product"
          />
          <textarea
            className="anp-textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {[
              { label: 'Grande', detail: '8 inches (8–9 serves)' },
              { label: 'Petit', detail: '6 inches (4–5 serves)' },
              { label: 'Individual', detail: '3 inches (1 serves)' },
            ].map((item, i) => (
              <div className="anp-size-row" key={i}>
                <label className="anp-size-option">
                  <input type="checkbox" defaultChecked />
                  <div className="anp-size-labels">
                    <span className="anp-size-name">{item.label}</span>
                    <span className="anp-size-detail">{item.detail}</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="anp-price-input"
                  value={formData.sizes[item.label]}
                  onChange={(e) => handleSizeChange(e, item.label)}
                  placeholder="Enter Price"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            className="anp-input"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleInputChange}
            placeholder="Estimated Preparation Time"
          />
          <textarea
            className="anp-textarea"
            name="careInstructions"
            value={formData.careInstructions}
            onChange={handleInputChange}
            placeholder="Storage And Care Instructions"
          />

          {/* Action Buttons at Bottom */}
          <div className="anp-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="anp-submit-btn" style={{ backgroundColor: '#c39735' }}>Best Seller</button>
            <button className="anp-submit-btn" style={{ backgroundColor: '#8d6c55' }}>Archive Now</button>
            <button className="anp-submit-btn">Update Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdminProduct;
