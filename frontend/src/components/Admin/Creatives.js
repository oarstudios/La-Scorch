import React, { useState } from "react";
import "./Creatives.css";
import img1 from "../../Images/slider1.jpg"

const initialImages = {
  desktop: [
    { id: 1, src: img1 },
    { id: 2, src: img1 },
    { id: 3, src: img1 },
  ],
  mobile: [
    { id: 4, src: img1 },
    { id: 5, src: img1 },
    { id: 6, src: img1 },
  ],
};

const Creatives = () => {
  const [images, setImages] = useState(initialImages);

  // Handle image change
  const handleImageChange = (event, category, id) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);

      setImages((prevImages) => ({
        ...prevImages,
        [category]: prevImages[category].map((img) =>
          img.id === id ? { ...img, src: newImageUrl } : img
        ),
      }));
    }
  };

  return (
    <div className="creatives-container">
      <h2>Edit Home Page Carousel Images</h2>

      {/* Desktop Images */}
      <h3>Desktop/ Tablet</h3>
      <div className="image-grid">
        {images.desktop.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.src} alt={`Desktop ${image.id}`} className="creative-image" />
            <label className="edit-btn-creatives">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "desktop", image.id)}
                className="file-input"
              />
            </label>
          </div>
        ))}
      </div>

      {/* Mobile Images */}
      {/* Mobile Images */}
<h3>Mobile</h3>
<div className="image-grid">
  {images.mobile.map((image) => (
    <div key={image.id} className="image-card">
      <img src={image.src} alt={`Mobile ${image.id}`} className="creative-image mobile-image" />
      <label className="edit-btn-creatives">
        Edit
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "mobile", image.id)}
          className="file-input"
        />
      </label>
    </div>
  ))}
</div>

    </div>
  );
};

export default Creatives;
