import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaTimes } from "react-icons/fa";
import "./AddNewProduct.css";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("Egg");
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cakeCategories, setCakeCategories] = useState([
    "Birthday Cakes",
    "Wedding Cakes",
    "Cupcakes",
    "Cheesecakes",
    "Photo Cakes",
    "Customized Cakes",
  ]);

  // 👉 Popup states
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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

  // 👉 Add Category Handler
  const handleAddCategory = () => {
    if (newCategory && !cakeCategories.includes(newCategory)) {
      setCakeCategories([...cakeCategories, newCategory]);
      setSelectedCategory(newCategory);
    }
    setNewCategory("");
    setShowCategoryPopup(false);
  };

  return (
    <div className="anp-container">
      <p className="anp-back-text" onClick={() => navigate(-1)}>
        ← Back
      </p>
      <h2 className="anp-heading">Add New Product</h2>

      <div className="anp-form">
        {/* Left Image Section */}
        <div className="anp-image-upload">
          <label htmlFor="imageInput" className="anp-main-image">
            {images.length === 0 ? (
              <FaImage className="anp-img-icon" />
            ) : (
              <img
                src={images[0].url}
                alt="Uploaded Preview"
                className="anp-preview-image"
              />
            )}
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          <div className="anp-thumbnail-row">
            {images.map((img, index) => (
              <div className="anp-thumbnail" key={index}>
                <img
                  src={img.url}
                  alt={`thumb-${index}`}
                  className="anp-thumb-img"
                />
                <FaTimes
                  className="anp-remove-icon"
                  onClick={() => removeImage(img.name)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Input Section */}
        <div className="anp-input-fields">
          {/* Type of Cake */}
          <div className="anp-section">
            <p className="anp-label">Type of Cake</p>
            <div className="anp-radio-group">
              {["Egg", "Eggless"].map((type) => (
                <label
                  key={type}
                  className={`anp-radio-option ${
                    selectedType === type ? "active" : ""
                  }`}
                >
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

          {/* Cake Category */}
          <div className="anp-section">
            <p className="anp-label">Cake Category</p>
            <div className="anp-category-row">
              <select
                className="anp-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {cakeCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="anp-add-category-btn"
                onClick={() => setShowCategoryPopup(true)}
              >
                + Add
              </button>
            </div>

            {/* Small Popup for Adding Category */}
            {showCategoryPopup && (
              <div className="anp-popup">
                <input
                  type="text"
                  className="anp-input"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <div className="anp-popup-actions">
                  <button
                    type="button"
                    className="anp-submit-btn"
                    onClick={handleAddCategory}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="anp-cancel-btn"
                    onClick={() => setShowCategoryPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rest Inputs */}
          <input type="text" className="anp-input" placeholder="Flavor" />
          <input
            type="text"
            className="anp-input"
            placeholder="Name Of The Product"
          />
          <textarea className="anp-textarea" placeholder="Description" />

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {[
              { label: "Grande", detail: "8 inches (8–9 serves)" },
              { label: "Petit", detail: "6 inches (4–5 serves)" },
              { label: "Individual", detail: "3 inches (1 serves)" },
            ].map((item, i) => (
              <div className="anp-size-row" key={i}>
                <label className="anp-size-option">
                  <input type="checkbox" />
                  <div className="anp-size-labels">
                    <span className="anp-size-name">{item.label}</span>
                    <span className="anp-size-detail">{item.detail}</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="anp-price-input"
                  placeholder="Enter Price"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            className="anp-input"
            placeholder="Estimated Preparation Time"
          />
          <textarea
            className="anp-textarea"
            placeholder="Storage And Care Instructions"
          />

          <button className="anp-submit-btn">Publish Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
