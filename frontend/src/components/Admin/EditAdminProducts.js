import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaImage, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  updateProduct,
} from "../../features/Products/ProductSlice";
import {
  fetchCategories,
  createCategoryThunk,
} from "../../features/Categories/CategorySlice";
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

  const { categories = [], loading: catLoading } = useSelector(
    (state) => state.category || {}
  );

  const [form, setForm] = useState({
    type: "Egg",
    category: "",
    flavor: "",
    name: "",
    description: "",
    preparationTime: "",
    careInstructions: "",
    bestseller: false,
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
    isArchived: false,
  });

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Fetch product and categories
  useEffect(() => {
    if (productId) dispatch(getProduct(productId));
    dispatch(fetchCategories());
  }, [dispatch, productId]);

  // Merge backend data into form
  useEffect(() => {
    if (!currentProduct) return;

    const defaultSizes = [
      { name: "Grande", description: "8 inches (8–9 serves)", price: "", checked: false },
      { name: "Petit", description: "6 inches (4–5 serves)", price: "", checked: false },
      { name: "Individual", description: "3 inches (1 serves)", price: "", checked: false },
    ];

    const backendSizesMap = (currentProduct.size || []).reduce((acc, s) => {
      acc[s.name] = s;
      return acc;
    }, {});

    const mergedSizes = defaultSizes.map((size) => {
      if (backendSizesMap[size.name]) {
        return { ...size, price: backendSizesMap[size.name].price, checked: true };
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
      bestseller: currentProduct.bestseller || false, // Load bestseller from backend
      sizes: mergedSizes,
      isArchived: currentProduct.isArchived || false,
      images,
    }));
  }, [currentProduct]);

  useEffect(() => {
    if (categories.length && !form.category) {
      setForm((prev) => ({ ...prev, category: categories[0]._id }));
    }
  }, [categories, form.category]);

  // Handlers
  const toggleArchive = (isa) => {
    setForm((prev) => ({ ...prev, isArchived: isa }));
  };

  const toggleSizeChecked = (index) => {
    setForm((prev) => {
      const updated = [...prev.sizes];
      updated[index] = {
        ...updated[index],
        checked: !updated[index].checked,
        price: updated[index].checked ? "" : updated[index].price,
      };
      return { ...prev, sizes: updated };
    });
  };

  const handleSizeChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.sizes];
      updated[index].price = value;
      return { ...prev, sizes: updated };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({ ...prev, type }));
  };

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

  const removeImage = (name) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.name !== name),
    }));
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setNewCategory("");
      setShowCategoryPopup(false);
      return;
    }
    try {
      const result = await dispatch(createCategoryThunk({ name: trimmed })).unwrap();
      setForm((prev) => ({ ...prev, category: result._id }));
    } catch (err) {
      alert("Failed to add category: " + (err?.message || err));
    }
    setNewCategory("");
    setShowCategoryPopup(false);
  };

  // Toggle bestseller checkbox
  const toggleBestseller = () => {
    setForm((prev) => ({ ...prev, bestseller: !prev.bestseller }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSizes = form.sizes
      .filter((s) => s.checked)
      .map((s) => ({
        name: s.name,
        description: s.description,
        price: s.price === "" ? 0 : Number(s.price),
      }));

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
    fd.append("bestseller", form.bestseller ? "true" : "false"); // submit bestseller

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
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

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

        {/* Input Fields */}
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
            <div className="anp-category-row">
              <select
                className="anp-input"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                disabled={catLoading}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
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

            {!categories.length && !catLoading && (
              <div className="anp-no-category">
                <span>No categories found. Please add a category.</span>
                <button
                  type="button"
                  className="anp-add-category-btn"
                  onClick={() => setShowCategoryPopup(false)}
                >
                  + Add Category
                </button>
              </div>
            )}

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

          {/* Bestseller Toggle */}
          <div className="anp-section">
            <label className="anp-size-option" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={form.bestseller} onChange={toggleBestseller} />
              <span className="anp-label" style={{ marginLeft: "8px" }}>Mark as Bestseller</span>
            </label>
          </div>

          <p className="anp-label">Choose Size</p>
          <div className="anp-size-group">
            {form.sizes.map((item, index) => (
              <div className="anp-size-row" key={index}>
                <label className="anp-size-option">
                  <input type="checkbox" checked={item.checked} onChange={() => toggleSizeChecked(index)} />
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="anp-submit-btn" type="submit">
              Update Product
            </button>
            <div className="anp-section">
              {form.isArchived ? (
                <button className="anp-submit-btn" onClick={() => toggleArchive(false)} type="button">
                  Archived
                </button>
              ) : (
                <button className="anp-submit-btn" onClick={() => toggleArchive(true)} type="button">
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
