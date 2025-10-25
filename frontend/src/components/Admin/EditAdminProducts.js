import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaImage, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  updateProduct,
} from "../../features/Products/ProductSlice";
import "./AddNewProduct.css";
import { IMG_BASE_URL } from "../../features/api/api";

const EditAdminProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [form, setForm] = useState({
    type: "Egg",
    category: "",
    flavor: "",
    name: "",
    description: "",
    preparationTime: "",
    careInstructions: "",
    sizes: [
      {
        name: "Grande",
        description: "8 inches (8–9 serves)",
        price: "",
        checked: false,
      },
      {
        name: "Petit",
        description: "6 inches (4–5 serves)",
        price: "",
        checked: false,
      },
      {
        name: "Individual",
        description: "3 inches (1 serves)",
        price: "",
        checked: false,
      },
    ],
    images: [],
  });

  // Fetch product on mount
  useEffect(() => {
    if (productId) dispatch(getProduct(productId));
  }, [dispatch, productId]);

  // Merge backend data into form
  useEffect(() => {
    if (!currentProduct) return;
    const defaultSizes = [
      {
        name: "Grande",
        description: "8 inches (8–9 serves)",
        price: "",
        checked: false,
      },
      {
        name: "Petit",
        description: "6 inches (4–5 serves)",
        price: "",
        checked: false,
      },
      {
        name: "Individual",
        description: "3 inches (1 serves)",
        price: "",
        checked: false,
      },
    ];
    const backendSizesMap = (currentProduct.size || []).reduce((acc, s) => {
      acc[s.name] = s;
      return acc;
    }, {});
    const mergedSizes = defaultSizes.map((size) => {
      if (backendSizesMap[size.name]) {
        return {
          ...size,
          price: backendSizesMap[size.name].price,
          checked: true,
        };
      }
      return size;
    });
    const images = (currentProduct.images || []).map((img, idx) => ({
      name: `existing-${idx}`,
      file: `${IMG_BASE_URL}${img}`,
      rawFile: null,
      isExisting: true,
      url: img,
    }));
    setForm((prev) => ({
      ...prev,
      type: currentProduct.type || prev.type,
      category: currentProduct.category || prev.category,
      flavor: currentProduct.flavour || prev.flavor,
      name: currentProduct.name || prev.name,
      description: currentProduct.description || prev.description,
      preparationTime: currentProduct.preparationTime || prev.preparationTime,
      careInstructions: currentProduct.care || prev.careInstructions,
      sizes: mergedSizes,
      isArchived: currentProduct.isArchived || false,
      images,
    }));
    // eslint-disable-next-line
  }, [currentProduct]);

  const toggleArchive = (isa) => {
    setForm((prev) => ({ ...prev, isArchived: isa }));
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle size checkbox (with price reset if unchecked)
  const toggleSizeChecked = (index) => {
    setForm((prev) => {
      const updated = [...prev.sizes];
      updated[index] = {
        ...updated[index],
        checked: !updated[index].checked,
        price: updated[index].checked ? "" : updated[index].price, // Clear price if just unchecked
      };
      return { ...prev, sizes: updated };
    });
  };

  // Handle price field for size
  const handleSizeChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.sizes];
      updated[index].price = value;
      return { ...prev, sizes: updated };
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const allowed = 3 - form.images.length;
    const toAdd = files.slice(0, allowed);
    const newImages = toAdd.map((file) => ({
      name: file.name + "-" + Date.now(),
      file: URL.createObjectURL(file),
      rawFile: file,
      isExisting: false,
      url: null,
    }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  // Remove image from list
  const removeImage = (name) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.name !== name),
    }));
  };

  // Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only include checked sizes
    const selectedSizes = form.sizes
      .filter((s) => s.checked)
      .map((s) => ({
        name: s.name,
        description: s.description,
        price: s.price === "" ? 0 : Number(s.price),
      }));
    // Existing images
    const existingImages = form.images
      .filter((img) => img.isExisting)
      .map((img) => img.url)
      .filter(Boolean);

    const fd = new FormData();
    fd.append("type", form.type);
    fd.append("category", form.category);
    fd.append("flavor", form.flavor);
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("prepTime", form.preparationTime);
    fd.append("storage", form.careInstructions);
    fd.append("sizes", JSON.stringify(selectedSizes));
    fd.append("existingImages", JSON.stringify(existingImages));
    fd.append("isArchived", form.isArchived ? "true" : "false");

    console.log("printing isarchived", form.isArchived);
    // Add new images
    form.images
      .filter((img) => !img.isExisting && img.rawFile)
      .forEach((img) => fd.append("images", img.rawFile));
    try {
      await dispatch(updateProduct({ id: productId, formData: fd })).unwrap();
      alert("🎉 Product updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update product: " + (err?.message || err));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading product...</div>;
  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="anp-container">
      <p className="anp-back-text" onClick={() => navigate(-1)}>
        ← Back
      </p>
      <h2 className="anp-heading">Edit Product</h2>
      <form className="anp-form" onSubmit={handleSubmit}>
        {/* Image Upload */}

        <div className="anp-image-upload">
          <label htmlFor="imageInput" className="anp-main-image">
            {form.images.length === 0 ? (
              <FaImage className="anp-img-icon" />
            ) : (
              <img
                src={form.images[0].file}
                alt="Preview"
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
            {form.images.map((img, idx) => (
              <div className="anp-thumbnail" key={idx}>
                <img
                  src={img.file}
                  alt={`thumb-${idx}`}
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
        {/* Form Fields */}
        <div className="anp-input-fields">
          <div className="anp-section">
            <p className="anp-label">Type of Cake</p>
            <div className="anp-radio-group">
              {["Egg", "Eggless"].map((t) => (
                <label
                  key={t}
                  className={`anp-radio-option ${
                    form.type === t ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={form.type === t}
                    onChange={() => setForm((p) => ({ ...p, type: t }))}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="anp-section">
            <p className="anp-label">Cake Category</p>
            <input
              type="text"
              className="anp-input"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <input
            type="text"
            name="flavor"
            className="anp-input"
            placeholder="Flavor"
            value={form.flavor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            className="anp-input"
            placeholder="Name Of The Product"
            value={form.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            className="anp-textarea"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
          />

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {form.sizes.map((item, index) => (
              <div className="anp-size-row" key={index}>
                <label className="anp-size-option">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleSizeChecked(index)}
                  />
                  <div className="anp-size-labels">
                    <span className="anp-size-name">{item.name}</span>
                    <span className="anp-size-detail">{item.description}</span>
                  </div>
                </label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  className="anp-price-input"
                  value={item.price}
                  onChange={(e) => handleSizeChange(index, e.target.value)}
                  disabled={!item.checked}
                  min="0"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            name="preparationTime"
            className="anp-input"
            placeholder="Estimated Preparation Time"
            value={form.preparationTime}
            onChange={handleInputChange}
          />
          <textarea
            name="careInstructions"
            className="anp-textarea"
            placeholder="Storage And Care Instructions"
            value={form.careInstructions}
            onChange={handleInputChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button className="anp-submit-btn" type="submit">
              Update Product
            </button>
            <div className="anp-section">
              {form.isArchived ? (
                <button
                  className="anp-submit-btn"
                  onClick={toggleArchive(false)}
                  type="button"
                >
                  Archived
                </button>
              ) : (
                <button
                  className="anp-submit-btn"
                  onClick={toggleArchive(true)}
                  type="button"
                >
                  Archive
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAdminProduct;
