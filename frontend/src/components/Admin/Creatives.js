import React, { useState, useEffect } from "react";
import "./Creatives.css";

const Creatives = () => {
  const [images, setImages] = useState({ desktop: [], mobile: [] });

  // Fetch existing images from backend
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/creatives");
      const json = await response.json();

      if (response.ok) {
        // Separate images based on the "tag" field
        const desktopImages = json.data.filter((img) => img.tag === "desktop");
        const mobileImages = json.data.filter((img) => img.tag === "mobile");

        // Store the full image objects in state
        setImages({
          desktop: desktopImages,
          mobile: mobileImages,
        });

        console.log("Desktop Images:", desktopImages);
        console.log("Mobile Images:", mobileImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = async (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("media", file);
    formData.append("tag", category);

    try {
      const response = await fetch("http://localhost:4001/api/creatives/", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (response.ok) {
        // Push full image object, not just image string
        setImages((prevImages) => ({
          ...prevImages,
          [category]: [...prevImages[category], json.data].slice(0, 4),
        }));
        // Refresh the full list from server to sync state
        fetchImages();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (e, creativeId) => {
    e.preventDefault(); // Prevent form reload

    try {
      const response = await fetch(
        `http://localhost:4001/api/creatives/${creativeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="creatives-container">
      <h2>Edit Home Page Carousel Images</h2>

      {/* Desktop Section */}
      <h3>Desktop/Tablet</h3>
      <form encType="multipart/form-data" className="image-box">
        {images?.desktop?.map((img, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={`http://localhost:4001/uploads/${img?.media}`} // Consistent path for desktop images
              alt={`Desktop ${index}`}
              className="creative-image"
            />
            <button onClick={(e) => handleDeleteImage(e, img._id)}>
              Delete
            </button>
          </div>
        ))}
        {images?.desktop?.length < 4 && (
          <label className="add-button" htmlFor="desktop-input">
            + Add Image
          </label>
        )}
        <input
          type="file"
          id="desktop-input"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "desktop")}
          style={{ display: "none" }}
        />
      </form>

      {/* Mobile Section */}
      <h3>Mobile</h3>
      <div className="image-box">
        {images?.mobile?.map((img, index) => (
          <div key={index} className="image-wrapper2">
            <img
              src={`http://localhost:4001/uploads/${img?.media}`} // Add /uploads/ to mobile images too
              alt={`Mobile ${index}`}
              className="creative-image mobile-image"
            />
            <button onClick={(e) => handleDeleteImage(e, img._id)}>
              Delete
            </button>
          </div>
        ))}
        {images.mobile.length < 4 && (
          <label className="add-button" htmlFor="mobile-input">
            + Add Image
          </label>
        )}
        <input
          type="file"
          id="mobile-input"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "mobile")}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Creatives;
