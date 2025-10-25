import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaTimes } from "react-icons/fa";
import "./AddNewProduct.css";
import { createProductAPI } from "../../features/Products/ProductAPI";

const AddNewProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "Egg",
    category: "",
    flavor: "",
    name: "",
    description: "",
    prepTime: "",
    storage: "",
    sizes: [
      { label: "Grande", detail: "8 inches (8–9 serves)", price: "", checked: false },
      { label: "Petit", detail: "6 inches (4–5 serves)", price: "", checked: false },
      { label: "Individual", detail: "3 inches (1 serves)", price: "", checked: false },
    ],
    images: [],
  });

  const [cakeCategories, setCakeCategories] = useState([
    { id: "64f7e6d2e8f1c6a1b2c3d4e5", name: "Birthday Cakes" },
    { id: "64f7e6d2e8f1c6a1b2c3d4e6", name: "Wedding Cakes" },
    { id: "64f7e6d2e8f1c6a1b2c3d4e7", name: "Cupcakes" },
    { id: "64f7e6d2e8f1c6a1b2c3d4e8", name: "Cheesecakes" },
    { id: "64f7e6d2e8f1c6a1b2c3d4e9", name: "Photo Cakes" },
    { id: "64f7e6d2e8f1c6a1b2c3d4ea", name: "Customized Cakes" },
  ]);

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // handle input fields
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSizeChange = (index, key, value) => {
    setForm((prev) => {
      const updated = [...prev.sizes];
      updated[index][key] = value;
      return { ...prev, sizes: updated };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 3 - form.images.length);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve({ file, url: event.target.result });
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((newImages) =>
      setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    );
  };

  const removeImage = (file) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img.file !== file) }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !cakeCategories.some((c) => c.name === newCategory)) {
      const id = Date.now().toString(); // temporary id, backend will assign real ID
      setCakeCategories((prev) => [...prev, { id, name: newCategory }]);
      setForm((prev) => ({ ...prev, category: id }));
    }
    setNewCategory("");
    setShowCategoryPopup(false);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.category) {
    alert("Please select a category");
    return;
  }

  const fd = new FormData();
  fd.append("type", form.type);
  fd.append("category", form.category); // dynamic category ID
  fd.append("flavor", form.flavor);
  fd.append("name", form.name);
  fd.append("description", form.description);
  fd.append("prepTime", form.prepTime);
  fd.append("storage", form.storage);

  // Convert sizes array to JSON string
  const selectedSizes = form.sizes
    .filter((size) => size.checked && size.price)
    .map((size) => ({
      name: size.label,
      description: size.detail,
      price: Number(size.price),
    }));

  fd.append("sizes", JSON.stringify(selectedSizes));

  // Append images
  form.images.forEach((img) => fd.append("images", img.file));

  try {
    await createProductAPI(fd);
    alert("🎉 Product created successfully!");
    navigate("/admin");
  } catch (err) {
    console.error("Error creating product:", err);
    alert(
      "❌ Failed to create product: " +
        (err?.response?.data?.message || err.message)
    );
  }
};



  return (
    <div className="anp-container">
      <p className="anp-back-text" onClick={() => navigate(-1)}>← Back</p>
      <h2 className="anp-heading">Add New Product</h2>

      <form className="anp-form" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="anp-image-upload">
          <label htmlFor="imageInput" className="anp-main-image">
            {form.images.length === 0 ? (
              <FaImage className="anp-img-icon" />
            ) : (
              <img src={form.images[0].url} alt="Preview" className="anp-preview-image" />
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
            {form.images.map((img, index) => (
              <div className="anp-thumbnail" key={index}>
                <img src={img.url} alt={`thumb-${index}`} className="anp-thumb-img" />
                <FaTimes className="anp-remove-icon" onClick={() => removeImage(img.file)} />
              </div>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="anp-input-fields">
          <div className="anp-section">
            <p className="anp-label">Type of Cake</p>
            <div className="anp-radio-group">
              {["Egg", "Eggless"].map((type) => (
                <label key={type} className={`anp-radio-option ${form.type === type ? "active" : ""}`}>
                  <input
                    type="radio"
                    checked={form.type === type}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="anp-section">
            <p className="anp-label">Cake Category</p>
            <div className="anp-category-row">
              <select
                className="anp-input"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="">-- Select Category --</option>
                {cakeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                type="button"
                className="anp-add-category-btn"
                onClick={() => setShowCategoryPopup(true)}
              >+ Add</button>
            </div>

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
                  <button type="button" className="anp-submit-btn" onClick={handleAddCategory}>Save</button>
                  <button type="button" className="anp-cancel-btn" onClick={() => setShowCategoryPopup(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          <input type="text" name="flavor" className="anp-input" placeholder="Flavor" value={form.flavor} onChange={handleInputs} />
          <input type="text" name="name" className="anp-input" placeholder="Name Of The Product" value={form.name} onChange={handleInputs} />
          <textarea name="description" className="anp-textarea" placeholder="Description" value={form.description} onChange={handleInputs} />

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {form.sizes.map((item, index) => (
              <div className="anp-size-row" key={index}>
                <label className="anp-size-option">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => handleSizeChange(index, "checked", e.target.checked)}
                  />
                  <div className="anp-size-labels">
                    <span className="anp-size-name">{item.label}</span>
                    <span className="anp-size-detail">{item.detail}</span>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  className="anp-price-input"
                  value={item.price}
                  onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                />
              </div>
            ))}
          </div>

          <input type="text" name="prepTime" className="anp-input" placeholder="Estimated Preparation Time" value={form.prepTime} onChange={handleInputs} />
          <textarea name="storage" className="anp-textarea" placeholder="Storage And Care Instructions" value={form.storage} onChange={handleInputs} />

          <button className="anp-submit-btn" type="submit">Publish Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
